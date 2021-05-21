import React, { ChangeEvent, FormEvent, useState } from 'react';
import { LoginFormProps, UserLogin } from '../../@types';

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [formState, setFormState] = useState<UserLogin>({
        username: "",
        password: ""
    });

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            username: e.currentTarget.value,
        });
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            password: e.currentTarget.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        onLogin(formState);
    }

    const { username, password } = formState;

    return (
        <>
            <form action="POST" onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} />
                <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </>
    );
}