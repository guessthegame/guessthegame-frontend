import { SmallContainer } from '../shared/containers/SmallContainer'
import { useForm } from 'react-hook-form'
import { TextInput } from '../shared/form/TextInput'
import { Button } from '../shared/buttons/Button'
import { Link } from '../shared/buttons/Link'
import { apiCreateTokens } from '../../services/api/routes/auth/create-token'
import { useAsyncCall } from '../../hooks/useAsyncCall'
import { useDispatch } from 'react-redux'
import { logIn } from '../../redux/slices/auth.slice'

type FormData = {
  username: string
  password: string
}

export const SignInForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm<FormData>()
  const { onSubmit } = useAsyncCall(apiCreateTokens)

  const handleOnSubmit = handleSubmit(async (data) => {
    const response = await onSubmit(data)
    if (response.ok) {
      dispatch(logIn(response.body))
    }
  })

  return (
    <div>
      <SmallContainer title="Sign in">
        <form onSubmit={handleOnSubmit}>
          <label>
            <p className="mt-3">Username (or email)</p>
            <TextInput {...register('username', { required: true })} />
          </label>
          <label>
            <p className="mt-3">Password</p>
            <TextInput type="password" {...register('password', { required: true })} />
          </label>
          <div className="text-center">
            <p className="mt-6 mb-3">
              <Button type="submit">Sign in</Button>
            </p>
          </div>
        </form>
      </SmallContainer>
      <p className="mt-6 text-sm text-center">
        Don&apos;t have an account yet? <Link href="/account/sign-up">Register now</Link>
      </p>
    </div>
  )
}
