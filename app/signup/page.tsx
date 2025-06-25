"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase-config";

const SignupPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");       // ✅ NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signupWithEmail = async () => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // ✅ Set display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await sendEmailVerification(userCredential.user);
      alert("Verification email sent! Please check your inbox.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 const signupWithGoogle = async () => {
  setLoading(true);
  setError("");
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account", // ⬅️ Force showing account selection
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Optional: Enforce only Gmail emails
    if (!user.email?.endsWith("@gmail.com")) {
      await auth.signOut();
      setError("Only Gmail accounts are allowed.");
      return;
    }

    router.push("/");
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Create a New Account</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* ✅ Name field */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <button
          onClick={signupWithEmail}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="flex items-center justify-center">
          <button
            onClick={signupWithGoogle}
            className="bg-white border border-gray-300 px-4 py-2 rounded-md"
          >
            Sign up with Google
          </button>
        </div>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
