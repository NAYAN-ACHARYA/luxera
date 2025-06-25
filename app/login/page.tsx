"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase-config";

const LoginPage = () => {
  const router = useRouter();

const [email, setEmail] = useState<string>("");       // inferred
const [password, setPassword] = useState<string>(""); // inferred
const [error, setError] = useState<string>("");       // inferred
const [loading, setLoading] = useState<boolean>(false); // inferred

const loginWithEmail = async () => {
  setLoading(true);
  setError("");
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/");
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
};

const loginWithGoogle = async () => {
  setLoading(true);
  setError("");
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account", // ✅ Always show Google account chooser
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.email?.endsWith("@gmail.com")) {
      await auth.signOut();
      setError("Only Gmail accounts are allowed.");
      return;
    }

    router.push("/");
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <button
          onClick={loginWithEmail}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center justify-center">
          <button
            onClick={loginWithGoogle}
            className="bg-white border border-gray-300 px-4 py-2 rounded-md"
          >
            Login with Google
          </button>
        </div>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
