
export function createSafeAction(schema, handler) {
  return async function(data) {
    const validation = schema.safeParse(data)

    if(!validation.success) {
      return { fieldErrors: validation.error.flatten().fieldErrors}
    }

    return handler(validation.data)
  }
}