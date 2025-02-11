import { createContext, useContext, type ReactNode } from "react"

/**
 * Type definition for the form preview context
 * @template T The type of the form data
 */
export type FormPreviewContextType<T> = {
  /** The current preview data */
  previewData: T
}

const FormPreviewContext = createContext<FormPreviewContextType<any> | undefined>(undefined)

/**
 * Hook to access the form preview context
 * @template T The type of the form data
 * @throws {Error} If used outside of FormPreviewProvider
 * @returns {FormPreviewContextType<T>} The form preview context
 */
export function useFormPreviewContext<T>() {
  const context = useContext(FormPreviewContext)
  if (context === undefined) {
    throw new Error("useFormPreviewContext must be used within a FormPreviewProvider")
  }
  return context as FormPreviewContextType<T>
}

/**
 * Props for the FormPreviewProvider component
 * @template T The type of the form data
 */
export type FormPreviewProviderProps<T> = {
  /** React children */
  children: ReactNode
  /** The context value */
  value: FormPreviewContextType<T>
}

/**
 * Provider component for form preview functionality
 * @template T The type of the form data
 */
export function FormPreviewProvider<T>({ children, value }: FormPreviewProviderProps<T>) {
  return <FormPreviewContext.Provider value={value}>{children}</FormPreviewContext.Provider>
} 