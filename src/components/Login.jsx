import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login({ onLoginSuccess, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data.user) onLoginSuccess(data.user);
  };

  return (
    <div>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p onClick={switchToSignup} style={{ cursor: "pointer" }}>Signup</p>
    </div>
  );
}
