import { SmallContainer } from '../shared/containers/SmallContainer'
import { useForm } from 'react-hook-form'
import { TextInput } from '../shared/form/TextInput'
import { Button } from '../shared/buttons/Button'
import { Link } from '../shared/buttons/Link'

type FormData = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <div>
      <SmallContainer title="Register new account">
        <form onSubmit={onSubmit}>
          <label>
            <p className="mt-3">Username</p>
            <TextInput required {...register('username')} />
          </label>
          <label>
            <p className="mt-3">
              Email{' '}
              <small>
                (Optional, but you won&apos;t be able to reset your password without it)
              </small>
            </p>
            <TextInput type="email" {...register('username')} />
          </label>
          <label>
            <p className="mt-3">Password</p>
            <TextInput type="password" required {...register('password')} />
          </label>
          <label>
            <p className="mt-3">Confirm Password</p>
            <TextInput required type="password" {...register('passwordConfirmation')} />
          </label>
          <div className="text-center">
            <p className="mt-6 mb-3">
              <Button type="submit">Sign in</Button>
            </p>
          </div>
        </form>
      </SmallContainer>
      <p className="mt-6 text-sm text-center">
        Already have an account? <Link href="/account/sign-in">Sign in instead</Link>
      </p>
    </div>
  )
}
