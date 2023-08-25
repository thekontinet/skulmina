import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ValidationError from "@/components/ValidationError";
import { login } from "@/services/Api";
import { isAxiosError } from "axios";
import { TextInput, AuthCard, Button } from "@/components";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const queryclient = useQueryClient();

    const mutation = useMutation(login, {
        onSuccess: () => {
            queryclient.invalidateQueries("user");
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response?.status === 422) {
                return setErrors(error.response.data.errors);
            }
        },
    });

    function onsubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({})
        mutation.mutate(form);
    }

    return (
        <AuthCard title="Login" info="Please enter your email and password to login">
            <form onSubmit={onsubmit} className="space-y-4">
                <div>
                    <TextInput
                        label="Email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) =>
                            setForm((form) => ({
                                ...form,
                                email: e.target.value,
                            }))
                        }
                    />
                    <ValidationError errors={errors} field="email" />
                </div>
                <div>
                    <TextInput
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Your Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm((form) => ({
                                ...form,
                                password: e.target.value,
                            }))
                        }
                    />
                    <ValidationError errors={errors} field="password" />
                </div>

                <Button loading={mutation.isLoading}>Login</Button>
            </form>
        </AuthCard>
    );
}

export default Login;
