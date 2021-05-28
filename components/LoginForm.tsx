import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormFieldValues } from '../@types';
import { UserContext } from '../contexts/User';
import FormContainer from './FormContainer';
import FormFieldErrorMessage from './FormFieldErrorMessage';

export default function LoginForm() {
    const router = useRouter();
    const { user, login } = useContext(UserContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormFieldValues>({
        mode: "onBlur"
    });
    const [isInvalid, setIsInvalid] = useState(false);

    const onSubmit = async (values: LoginFormFieldValues) => {
        setIsSubmitting(true);
        const isLoggedIn = await login(values);
        setIsInvalid(!isLoggedIn);
        setIsSubmitting(false);
    }

    useEffect(() => {
        if (user !== null) {
            router.push("/")
        }
    }, [user])

    return (
        <FormContainer>
            {isInvalid && (
                <div className="alert alert-danger" role="alert">
                    Invalid username or password
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="mb-3 text-center">Please log in</h4>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" {...register("username", {
                        required: {
                            value: true,
                            message: "Field cannot be empty"
                        }, maxLength: {
                            value: 30,
                            message: "Value is too long"
                        }
                    })} />
                    <ErrorMessage errors={errors} name="username" as={FormFieldErrorMessage} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" {...register("password", {
                        required: {
                            value: true,
                            message: "Field cannot be empty"
                        }, maxLength: {
                            value: 255,
                            message: "Value is too long"
                        }
                    })} />
                    <ErrorMessage errors={errors} name="password" as={FormFieldErrorMessage} />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    Log in
                </button>
            </form>
        </FormContainer>
    );
}