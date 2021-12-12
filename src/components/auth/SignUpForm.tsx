import { useForm } from 'react-hook-form'
import { TextInput } from '../shared/form/TextInput'
import { Button } from '../shared/buttons/Button'
import { Link } from '../shared/buttons/Link'
import { SmallContainer } from '../shared/containers/ContainerWithTitle'
import { InputErrorMessage } from '../shared/form/InputErrorMessage'
import { useAsyncCall } from '../../hooks/useAsyncCall'
import { apiRegister } from '../../services/api/routes/auth/register'
import { useState } from 'react'
import { useAppDispatch } from '../../redux/redux-hooks'
import { logIn } from '../../redux/slices/auth.slice'
import { useRouter } from 'next/router'

type FormData = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export const SignUpForm = () => {
  /**
   * Form State
   */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const [usernameTakenError, setUsernameTakenError] = useState(false)

  /**
   * Register Functions
   */
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { submit, isSubmitting } = useAsyncCall(apiRegister, {
    toastMessages: {
      success: 'You are now signed in.',
      error: 'Could not create your Account. Check form for errors',
    },
  })
  const handleOnSubmit = async (data: FormData) => {
    setUsernameTakenError(false)
    const response = await submit(data)
    if (!response.ok) {
      if (response.errorCode === 'USERNAME_TAKEN') {
        setUsernameTakenError(true)
      }
    } else {
      dispatch(logIn(response.body))
      router.push('/')
    }
  }

  return (
    <div>
      <SmallContainer title="Register new account">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          {/* Username */}
          <label>
            <p className="mt-3">Username</p>
            <TextInput required {...register('username')} />
            {usernameTakenError ? <p className="text-orange">Username is taken.</p> : null}
          </label>

          {/* Email */}
          <label>
            <p className="mt-3">
              Email{' '}
              <small>
                (Optional, but you won&apos;t be able to reset your password without it)
              </small>
            </p>
            <TextInput type="email" {...register('email')} />
          </label>

          {/* Password */}
          <label>
            <p className="mt-3">Password</p>
            <TextInput
              type="password"
              required
              {...register('password', {
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters long (ideally 12)',
                },
              })}
            />
            <InputErrorMessage error={errors.password} />
          </label>

          {/* Password Confirmation */}
          <label>
            <p className="mt-3">Confirm Password</p>
            <TextInput
              required
              type="password"
              {...register('passwordConfirmation', {
                validate: (value) => value === watch('password') || 'The passwords do not match',
              })}
            />
            <InputErrorMessage error={errors.passwordConfirmation} />
          </label>

          {/* Submit button */}
          <div className="text-center">
            <p className="mt-6 mb-3">
              <Button type="submit" disabled={isSubmitting}>
                Register
              </Button>
            </p>
          </div>
        </form>
      </SmallContainer>
      <p className="mt-6 text-sm text-center">
        Already have an account? <Link href="/account/sign-in">Log in instead</Link>
      </p>
    </div>
  )
}
