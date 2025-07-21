"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ name: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                alert("Sign up completed successfully!");
                setFormData({ name: "", password: "" });
                setIsSignUp(!isSignUp);
            } else {
                alert("Sign up failed. Please try again.");
            }
        }
        else {
            const result = await signIn("credentials", {
                redirect: false,
                name: formData.name,
                password: formData.password,
            });

            if (result?.error) {
                alert("Login failed. Please check your credentials.");
                setFormData({ name: "", password: "" });
            }
            else {
                window.location.href = "/";
            }
        }
    };

    return (
        <div className="login-container">
            <h1 className="flex items-center py-1 px-3 h-8 text-lg font-sans font-semibold rounded-md text-sidebarNormalFont fill-current">
                {isSignUp ? "Sign Up" : "Log In"}</h1>
            <form onSubmit={handleSubmit}>
                <label className="flex w-full py-1 px-3 h-8 font-sans">
                    ID:
                    <input
                        className="flex py-1 px-3 h-8 font-sans w-full"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </label>
                <label className="flex w-full py-1 px-3 h-8 font-sans">
                    Password:
                    <input
                        className="flex py-1 px-3 h-8 font-sans"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </label>
                <button className="h-10 font-sans" type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
            </form>
            <button className="mt-8 h-10 font-sans" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
}