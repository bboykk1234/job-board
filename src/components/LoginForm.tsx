import { useForm } from 'react-hook-form';
import { LoginFormFieldValues, LoginFormProps } from '../../@types';

export default function LoginForm({ onLogin }: LoginFormProps) {
    const { register, handleSubmit } = useForm<LoginFormFieldValues>();

    const onSubmit = (values: LoginFormFieldValues) => {
        onLogin(values);
    }

    return (
        <div className="align-self-center m-auto p-2" style={{maxWidth: "330px"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please log in</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="username" placeholder="Username" {...register("username", { required: true })} />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" placeholder="Password" {...register("password", { required: true })} />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
                <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
            </form>
        </div>
    );
}