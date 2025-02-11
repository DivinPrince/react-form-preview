import { useCallback, useEffect, useState } from "react"
import type { UseFormReturn, WatchObserver } from "react-hook-form"
import { debounce } from "lodash-es"

/**
 * Options for the useFormPreview hook
 */
export type UseFormPreviewOptions = {
  /** Whether to use debounce for preview updates */
  useDebounce?: boolean
  /** Delay in milliseconds for debounced updates */
  debounceDelay?: number
}

/**
 * A hook that provides real-time preview functionality for react-hook-form
 * @template T The type of the form data
 * @param {UseFormReturn<T>} form The form instance from react-hook-form
 * @param {UseFormPreviewOptions} options Configuration options
 * @returns {{ previewData: T }} The current preview data
 * 
 * @example
 * ```tsx
 * const form = useForm<FormData>();
 * const { previewData } = useFormPreview(form, { debounceDelay: 500 });
 * 
 * // Use previewData to render your preview
 * return <Preview data={previewData} />;
 * ```
 */
export function useFormPreview<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  options: UseFormPreviewOptions = {},
) {
  const { useDebounce = true, debounceDelay = 300 } = options
  const [previewData, setPreviewData] = useState<T>(form.getValues())

  const updatePreviewData = useCallback((data: T) => {
    setPreviewData(data)
  }, [])

  const debouncedUpdatePreviewData = useCallback(
    debounce(updatePreviewData, debounceDelay),
    [updatePreviewData],
  )

  useEffect(() => {
    const callback: WatchObserver<T> = (value) => {
      if (useDebounce) {
        debouncedUpdatePreviewData(value as T)
      } else {
        updatePreviewData(value as T)
      }
    }

    const subscription = form.watch(callback)
    return () => subscription.unsubscribe()
  }, [form, useDebounce, debouncedUpdatePreviewData, updatePreviewData])

  return { previewData }
} 