import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [refreshDesignList, setRefreshDesignList] = useState(false);
  const [loading, setLoading] = useState(true); // <--- added

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Supabase getSession error:", error);
          setUser(null);
        } else {
          setUser(data.session?.user ?? null);
        }
      } catch (err) {
        console.error("Unexpected error fetching session:", err);
        setUser(null);
      } finally {
        setLoading(false); // <--- added
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) setSelectedDesign(null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSelectedDesign(null);
  };

  if (loading) return <div>Loading...</div>; // <--- added

  return (
    <div style={{ padding: 20 }}>
      {!user ? (
        <Home onLoginSuccess={setUser} />
      ) : (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          selectedDesign={selectedDesign}
          setSelectedDesign={setSelectedDesign}
          refreshDesignList={refreshDesignList}
          setRefreshDesignList={setRefreshDesignList}
        />
      )}
    </div>
  );
}
