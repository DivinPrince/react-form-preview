# React Form Preview

A React library that provides real-time preview functionality for forms built with react-form. This library allows you to easily create live previews of form data as users type, with support for debounced updates.

## Features

- 🔄 Real-time form data preview
- ⚡ Built for react-hook-form
- 🎯 TypeScript support
- ⏱️ Configurable debouncing

## Installation

Using npm:
```bash
npm install react-form-preview
```

Using Yarn:
```bash
yarn add react-form-preview
```

Using Bun:
```bash
bun add react-form-preview
```

## Usage

### Basic Example

Here's a basic example of how to use the form preview functionality:

```tsx
import { useForm } from 'react-form'
import { useFormPreview, FormPreviewProvider } from 'react-form-preview'

type FormData = {
  name: string
  email: string
}

function PreviewComponent({ data }: { data: FormData }) {
  return (
    <div>
      <h3>Preview</h3>
      <div>Name: {data.name}</div>
      <div>Email: {data.email}</div>
    </div>
  )
}

function MyForm() {
  const form = useForm<FormData>()
  const { previewData } = useFormPreview(form, {
    debounceDelay: 500 // Optional: configure debounce delay
  })

  return (
    <FormPreviewProvider value={{ previewData }}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <input {...form.register('name')} />
        <input {...form.register('email')} type="email" />
        <button type="submit">Submit</button>
      </form>
      
      <PreviewComponent data={previewData} />
    </FormPreviewProvider>
  )
}
```

### Creating Custom Preview Components

You can create your own preview components using the `useFormPreviewContext`. This allows you to access the preview data anywhere within the `FormPreviewProvider`:

```tsx
type YourFormType = {
  name: string
  email: string
  // ... your form fields
}

function YourCustomPreview() {
  // Type the context with your form data type
  const { previewData } = useFormPreviewContext<YourFormType>()

  return (
    // Your custom UI here
    <div>
      {/* Access the preview data directly */}
      <p>{previewData.someField}</p>
    </div>
  )
}

// Use it in your form
function YourForm() {
  const form = useForm<YourFormType>()
  const { previewData } = useFormPreview(form)

  return (
    <FormPreviewProvider value={{ previewData }}>
      <div>
        {/* Your form fields */}
        <form>...</form>
        
        {/* Your custom preview component */}
        <YourCustomPreview />
      </div>
    </FormPreviewProvider>
  )
}
```

The preview component can be styled and structured however you want, and you can create multiple preview components that all access the same form data through the context.

## API Reference

### useFormPreview

```tsx
function useFormPreview<T>(
  form: UseFormReturn<T>,
  options?: UseFormPreviewOptions
): { previewData: T }
```

Options:
- `useDebounce?: boolean` - Whether to use debouncing (default: true)
- `debounceDelay?: number` - Debounce delay in milliseconds (default: 300)

### FormPreviewProvider

```tsx
function FormPreviewProvider<T>({
  children,
  value
}: {
  children: ReactNode
  value: { previewData: T }
}): JSX.Element
```

### useFormPreviewContext

```tsx
function useFormPreviewContext<T>(): { previewData: T }
```

## Development

To develop locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Start development:
   ```bash
   bun run dev
   ```

## Building with Bun

This library is compatible with Bun. To build:

```bash
bun run build
```

To test:
```bash
bun test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 