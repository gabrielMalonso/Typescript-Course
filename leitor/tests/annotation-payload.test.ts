import { expect, it } from 'vitest'
import type {
  AnnotationEvent,
  PdfAnnotationObject,
} from '@embedpdf/react-pdf-viewer'
import {
  encodeAnnotation,
  decodeAnnotation,
} from '../src/pdf/annotationPayload'
import { payloadImageKey } from '../src/pdf/imageAssets'

it('restores the moved and resized image from an EmbedPDF update event, retaining its binary reference', () => {
  const original: PdfAnnotationObject = {
    id: 'screenshot',
    type: 13,
    pageIndex: 0,
    rect: { origin: { x: 48, y: 234 }, size: { width: 480, height: 180 } },
  }
  const rect = { origin: { x: 120, y: 100 }, size: { width: 240, height: 90 } }
  // Captured API contract: annotation still contains the old rectangle.
  const event: AnnotationEvent = {
    type: 'update',
    documentId: 'reading',
    pageIndex: 0,
    committed: false,
    annotation: original,
    patch: { rect },
  }
  const payload = encodeAnnotation(event, 'content-hash')!
  expect(decodeAnnotation(payload)).toEqual({ ...original, rect })
  expect(payloadImageKey(payload)).toBe('content-hash')
  expect(original.rect.size.width).toBe(480)
  expect(
    encodeAnnotation({ ...event, type: 'delete' }, 'content-hash'),
  ).toBeNull()
})
