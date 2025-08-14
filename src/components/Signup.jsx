import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Signup({ onSignupSuccess, switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (!error) onSignupSuccess();
  };

  return (
    <div>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
      <p onClick={switchToLogin} style={{ cursor: "pointer" }}>Login</p>
    </div>
  );
}
