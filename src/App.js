import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [refreshDesignList, setRefreshDesignList] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
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
