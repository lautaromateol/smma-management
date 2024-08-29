"use client"
import { useCallback, useState } from "react";

export function useAction(action, options) {
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState(null)
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(null)

  const execute = useCallback(async(fields) => {
    setIsPending(true)

    try {
      const response = await action(fields)

      if (response.error) {
        setError(response.error)
        options?.onError?.(response.error)
      }

      if (response.fieldErrors) {
        setFieldErrors(response.fieldErrors)
      }

      if (response.ok) {
        setData(response.data),
        options?.onSuccess?.(response.data)
      }
    } finally {
      setIsPending(false)
      options?.onSettled?.()
    }
  }, [action, options])

  return { execute, error, fieldErrors, data, isPending }
}