import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import Form from '../../ui/Form'
import { useSignup } from './login.hook'

const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export function SignupForm() {
  const { signup, isLoading } = useSignup()
  const { register, formState, getValues, handleSubmit } = useForm({ defaultValues: { fullName: '', password: '', email: '', passwordConfirm: '' }, keepValues: false })
  const { errors } = formState

  const submitHandler = ({ fullName, email, password }) => {
    if (!email || !password || !fullName) return null
    signup({ fullName, email, password })
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName', { required: 'This field is required' })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register('email', { required: 'This field is required', pattern: { value: EMAIL_REGEX, message: 'Please provide a valid email address' } })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register('password', { required: 'This field is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} />
      </FormRow>

      <FormRow label="Repeat Password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', { required: 'This field is required', validate: (value) => value === getValues().password || 'Passwords do not match' })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Sign up
        </Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
