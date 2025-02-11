import { useFormPreviewContext } from '../src'

// Example of a custom preview component using shadcn/ui components
type CustomFormData = {
  name: string
  email: string
  message: string
  subscribe: boolean
}

export function CustomPreviewComponent() {
  // Get the preview data from context
  const { previewData } = useFormPreviewContext<CustomFormData>()

  return (
    <div className="custom-preview">
      {/* You can structure and style your preview however you want */}
      <h2>Custom Preview</h2>
      <div className="preview-content">
        <div className="field">
          <label>Name:</label>
          <span>{previewData.name}</span>
        </div>
        <div className="field">
          <label>Email:</label>
          <span>{previewData.email}</span>
        </div>
        <div className="field">
          <label>Message:</label>
          <span>{previewData.message}</span>
        </div>
        <div className="field">
          <label>Subscribe:</label>
          <span>{previewData.subscribe ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  )
}

// Example usage with a form
export function FormWithCustomPreview() {
  const form = useForm<CustomFormData>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      subscribe: false
    }
  })

  const { previewData } = useFormPreview(form)

  return (
    <FormPreviewProvider value={{ previewData }}>
      <div className="form-container">
        {/* Your form component here */}
        <form>
          {/* ... form fields ... */}
        </form>
        
        {/* Your custom preview component */}
        <CustomPreviewComponent />
      </div>
    </FormPreviewProvider>
  )
} 