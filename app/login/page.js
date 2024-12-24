'use client'
import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

const Login = () => {

    const [user, setUser] = useState({ email: '', password: '' });
    const [providers, setProviders] = useState(null);
    const [error, setError] = useState("");

    const setNewProviders = async () => {
        try {
            const response = await getProviders();
            setProviders(response);
        } catch (error) {
            console.error("Error fetching providers:", error);
        }
    };

    useEffect(() => {
        setNewProviders();
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl: "/",
            });
        } catch (err) {
            setError("Invalid email or password");
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <div>
                {providers ? Object.values(providers).map(provider => (
                    provider.id !== "credentials" && (
                        <div key={provider.name}>
                            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    )
                )) :
                    (
                        <p>Loading more login options...</p>
                    )}
            </div>
            <h2>Sign in with Email</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default Login;