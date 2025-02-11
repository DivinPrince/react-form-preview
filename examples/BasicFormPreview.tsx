import { useForm } from 'react-hook-form'
import { useFormPreview, FormPreviewProvider } from '../src'

type FormData = {
  name: string
  email: string
  message: string
}

function PreviewComponent({ data }: { data: FormData }) {
  return (
    <div className="preview">
      <h3>Preview</h3>
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Email:</strong> {data.email}
      </div>
      <div>
        <strong>Message:</strong> {data.message}
      </div>
    </div>
  )
}

export function BasicFormPreview() {
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const { previewData } = useFormPreview(form, {
    debounceDelay: 500
  })

  return (
    <FormPreviewProvider value={{ previewData }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <form onSubmit={form.handleSubmit(console.log)}>
          <div>
            <label>
              Name:
              <input {...form.register('name')} />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input {...form.register('email')} type="email" />
            </label>
          </div>
          <div>
            <label>
              Message:
              <textarea {...form.register('message')} />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>

        <PreviewComponent data={previewData} />
      </div>
    </FormPreviewProvider>
  )
} 