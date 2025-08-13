import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Home({ onLoginSuccess }) {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="container" style={{ flexDirection: "column", maxWidth: 400, margin: "auto" }}>
      <h1>Canva Lite</h1>
      {showSignup ? (
        <Signup
          onSignupSuccess={() => setShowSignup(false)}
          switchToLogin={() => setShowSignup(false)}
        />
      ) : (
        <Login
          onLoginSuccess={onLoginSuccess}
          switchToSignup={() => setShowSignup(true)}
        />
      )}
    </div>
  );
}
