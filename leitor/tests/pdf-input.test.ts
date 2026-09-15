import { expect, it } from 'vitest'
import { PdfTouchNavigation } from '../src/pdf/pdfInput'

const pointer = (
  type: string,
  pointerType = 'touch',
  pointerId = 1,
  clientX = 100,
  clientY = 100,
) => ({ type, pointerType, pointerId, clientX, clientY })

it('pans with one finger and leaves two fingers to the native pinch handler', () => {
  const input = new PdfTouchNavigation()
  input.pointer(pointer('pointerdown'))
  expect(input.pointer(pointer('pointermove', 'touch', 1, 80, 60))).toEqual({
    x: 20,
    y: 40,
  })
  input.pointer(pointer('pointerdown', 'touch', 2))
  expect(
    input.pointer(pointer('pointermove', 'touch', 1, 60, 40)),
  ).toBeUndefined()
  expect(input.suppressTouchGestures).toBe(false)
  input.pointer(pointer('pointerup', 'touch', 2))
  expect(input.pointer(pointer('pointermove', 'touch', 1, 50, 30))).toEqual({
    x: 10,
    y: 10,
  })
})

it('ignores palm movement until every touch from pen contact is lifted', () => {
  const input = new PdfTouchNavigation()
  input.pointer(pointer('pointerdown', 'pen', 9))
  input.pointer(pointer('pointerdown'))
  expect(input.suppressTouchGestures).toBe(true)
  expect(
    input.pointer(pointer('pointermove', 'touch', 1, 20, 20)),
  ).toBeUndefined()
  input.pointer(pointer('pointerup', 'pen', 9))
  expect(input.suppressTouchGestures).toBe(true)
  input.pointer(pointer('pointercancel'))
  expect(input.suppressTouchGestures).toBe(false)
  input.pointer(pointer('pointerdown'))
  expect(input.pointer(pointer('pointermove', 'touch', 1, 90, 90))).toEqual({
    x: 10,
    y: 10,
  })
})

it('does not navigate for mouse or pen, and stops an existing touch when the pen lands', () => {
  const input = new PdfTouchNavigation()
  expect(input.pointer(pointer('pointermove', 'mouse'))).toBeUndefined()
  input.pointer(pointer('pointerdown'))
  input.pointer(pointer('pointerdown', 'pen', 9))
  expect(
    input.pointer(pointer('pointermove', 'touch', 1, 20, 20)),
  ).toBeUndefined()
  input.pointer(pointer('pointercancel', 'pen', 9))
  input.pointer(pointer('pointerup'))
  expect(input.suppressTouchGestures).toBe(false)
})
