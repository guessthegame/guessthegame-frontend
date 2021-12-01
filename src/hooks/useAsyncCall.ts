import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { HttpError } from '../services/http/HttpError.class'

interface OptionsType {
  toastMessages?: {
    loading?: string
    success?: string
    error?: string
  }
}

export function useAsyncCall<T, R>(
  callback: (params: T) => Promise<R>,
  { toastMessages }: OptionsType = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = useCallback(
    (params: T): Promise<{ ok: true; body: R } | { ok: false; error: HttpError }> => {
      setIsSubmitting(true)
      const toastId = toast.loading(toastMessages?.loading || 'Loading...')

      return callback(params).then(
        (body) => {
          setIsSubmitting(false)
          toast.success(toastMessages?.success || 'Success!', { id: toastId })
          return { ok: true, body: body }
        },
        (err) => {
          setIsSubmitting(false)
          toast.error(toastMessages?.error || err.message, { id: toastId })
          if (err instanceof HttpError) {
            return { ok: false, error: err }
          } else {
            return { ok: false, error: new HttpError({ status: 0, statusText: err.message }) }
          }
        }
      )
    },
    [callback, toastMessages]
  )

  return { onSubmit, isSubmitting }
}
