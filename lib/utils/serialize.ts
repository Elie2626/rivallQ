/**
 * Converts a Firestore document's data to a plain serializable object.
 * Firestore Timestamps (Admin SDK) have _seconds / _nanoseconds — they are
 * not plain objects and cannot be passed to Client Components.
 * This utility recursively converts them to ISO date strings.
 */

type FirestoreTimestamp = { _seconds: number; _nanoseconds: number }
type PlainValue = string | number | boolean | null | undefined | PlainObject | PlainValue[]
interface PlainObject { [key: string]: PlainValue }

function isTimestamp(v: unknown): v is FirestoreTimestamp {
  return (
    typeof v === 'object' &&
    v !== null &&
    '_seconds' in v &&
    '_nanoseconds' in v &&
    typeof (v as FirestoreTimestamp)._seconds === 'number'
  )
}

export function serialize<T>(data: unknown): T {
  if (data === null || data === undefined) return data as T
  if (isTimestamp(data)) {
    return new Date(data._seconds * 1000).toISOString() as T
  }
  if (Array.isArray(data)) {
    return data.map((item) => serialize(item)) as T
  }
  if (typeof data === 'object') {
    const result: PlainObject = {}
    for (const [key, value] of Object.entries(data as PlainObject)) {
      result[key] = serialize(value)
    }
    return result as T
  }
  return data as T
}

/** Shorthand for a Firestore doc snapshot → plain serializable object. */
export function serializeDoc<T>(id: string, data: Record<string, unknown> | undefined): T {
  return serialize({ id, ...data }) as T
}
