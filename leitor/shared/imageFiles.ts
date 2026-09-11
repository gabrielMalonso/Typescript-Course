export const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export function imageMime(
  bytes: Uint8Array,
): 'image/png' | 'image/jpeg' | null {
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => bytes[i] === b))
    return 'image/png'
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return 'image/jpeg'
  return null
}
export async function imageKey(data: ArrayBuffer) {
  return Array.from(
    new Uint8Array(await crypto.subtle.digest('SHA-256', data)),
    (b) => b.toString(16).padStart(2, '0'),
  ).join('')
}
