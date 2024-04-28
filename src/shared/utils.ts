/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function noop<R = void>(...args: any[]): R {
  return args as unknown as R;
}

export function logError<E = unknown>(
  error: E,
  onVisualLog?: (error: E) => void,
) {
  console.error(error);
  onVisualLog?.(error);
}

export function getFormDataStringValue(
  formData: FormData,
  key: string,
): string | undefined {
  const value = formData.get(key);

  if (typeof value === "string") {
    return value;
  }

  return undefined;
}
