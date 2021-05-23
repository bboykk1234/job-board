import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormFieldValues } from '../../@types';
import { UserContext } from '../contexts/User';
import FormContainer from './FormContainer';

export default function LoginForm() {
    const { login } = useContext(UserContext);
    const { register, handleSubmit } = useForm<LoginFormFieldValues>();

    const onSubmit = async (values: LoginFormFieldValues) => {
        await login(values);
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="mb-3 text-center">Please log in</h4>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" {...register("username", { required: true, maxLength: 30 })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
            </form>
        </FormContainer>
    );
}