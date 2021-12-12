import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { HttpError } from '../services/http/HttpError.class'

interface OptionsType {
  toastMessages?: {
    loading?: string
    success?: string
    error?: string
  }
}

export function useAsyncCall<T extends unknown[], R>(
  callback: (...params: T) => Promise<R>,
  { toastMessages }: OptionsType = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = useCallback(
    (
      ...params: T
    ): Promise<{ ok: true; body: R } | { ok: false; errorCode: string; error: HttpError }> => {
      setIsSubmitting(true)
      const toastId = toast.loading(toastMessages?.loading || 'Loading...')

      return callback(...params).then(
        (body) => {
          setIsSubmitting(false)
          toast.success(toastMessages?.success || 'Success!', { id: toastId })
          return { ok: true, body: body }
        },
        (err) => {
          setIsSubmitting(false)
          if (err instanceof HttpError) {
            const errorCode = typeof err.body?.message === 'string' ? err.body.message : err.message
            toast.error(toastMessages?.error || err.message, { id: toastId })
            return { ok: false, errorCode, error: err }
          } else {
            toast.error(toastMessages?.error || err.err.message, { id: toastId })
            return {
              ok: false,
              errorCode: err.message,
              error: new HttpError({ status: 0, statusText: err.message }),
            }
          }
        }
      )
    },
    [callback, toastMessages]
  )

  return { submit, isSubmitting }
}
