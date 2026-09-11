import type {
  AnnotationEvent,
  PdfAnnotationObject,
} from '@embedpdf/react-pdf-viewer'

/** EmbedPDF update events carry the old object and a separate patch. */
export function encodeAnnotation(
  event: Exclude<AnnotationEvent, { type: 'loaded' }>,
  imageKey?: string,
): string | null {
  if (event.type === 'delete') return null
  return JSON.stringify({
    ...event.annotation,
    ...(event.type === 'update' ? event.patch : {}),
    ...(imageKey ? { _imageKey: imageKey } : {}),
  })
}

// The serialized object comes from EmbedPDF; validate its envelope at this boundary.
export function decodeAnnotation(payload: string): PdfAnnotationObject {
  const value: unknown = JSON.parse(payload)
  if (
    !value ||
    typeof value !== 'object' ||
    !('id' in value) ||
    typeof value.id !== 'string' ||
    !('type' in value) ||
    typeof value.type !== 'number' ||
    !('pageIndex' in value) ||
    !Number.isInteger(value.pageIndex) ||
    !('rect' in value)
  )
    throw new Error('Invalid annotation')
  const { _imageKey: _key, ...annotation } = value as PdfAnnotationObject & {
    _imageKey?: string
  }
  return annotation
}
