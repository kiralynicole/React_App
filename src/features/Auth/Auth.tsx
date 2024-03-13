// import { forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, ref, string } from 'yup';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthContext';

const commonSchema = {
  email: string()
    .required('Please type your email')
    .email('Please type a valid email address'),
  password: string()
    .required('Please choose a password')
    .min(6, 'The password needs to be at least 6 characters long'),
};
const loginSchema = object(commonSchema);
const registerSchema = object({
  ...commonSchema,
  retypePassword: string()
    .required('Please type your password again')
    .oneOf([ref('password')], 'The passwords do not match'),
  firstName: string().trim().required('What is your first name?'),
  lastName: string().trim().required('What is your last name?'),
});

// export const MyInput = forwardRef((props, ref) => <><input type="text" ref={ref} /></>)
// <MyInput {...register()} />
export function Auth() {
  const { pathname } = useLocation();
  let isRegister = true;
  if (pathname === '/login') {
    isRegister = false;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const { login } = useAuthContext();

  async function onSubmit(
    values: InferType<typeof registerSchema | typeof loginSchema>
  ) {
    const valuesToSend: Partial<typeof values> = structuredClone(values);
    if ('retypePassword' in valuesToSend) {
      delete valuesToSend.retypePassword;
    }

    const data = await fetch(
      `http://localhost:3000/${isRegister ? 'register' : 'login'}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(valuesToSend),
      }
    ).then(async (res) => {
      const dataPromise = res.json();

      if (!res.ok) {
        const message = await dataPromise;
        toast.error(message);
        throw new Error(message);
      }
      return dataPromise;
    });

    toast.success('You logged in successfully.');
    login(data);
  }

  return (
    <form className="brandForm" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="fullWidth">{isRegister ? 'Register' : 'Login'}</h1>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register('email')} />
      {errors.email && <p className="errorMessage">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register('password')} />
      {errors.password && (
        <p className="errorMessage">{errors.password.message}</p>
      )}

      {isRegister && (
        <>
          <label htmlFor="retypePassword">Retype Password</label>
          <input
            type="password"
            id="retypePassword"
            {...register('retypePassword')}
          />
          {errors.retypePassword && (
            <p className="errorMessage">{errors.retypePassword.message}</p>
          )}

          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" {...register('firstName')} />
          {errors.firstName && (
            <p className="errorMessage">{errors.firstName.message}</p>
          )}

          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" {...register('lastName')} />
          {errors.lastName && (
            <p className="errorMessage">{errors.lastName.message}</p>
          )}
        </>
      )}

      <button type="submit" className="btn secondColumn">
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
}
