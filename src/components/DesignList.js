import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function DesignList({ user, onSelect, refreshTrigger }) {
  const [designs, setDesigns] = useState([]);

  const fetchDesigns = async () => {
    const { data } = await supabase.from("designs").select("*").eq("user_id", user.id);
    setDesigns(data ?? []);
  };

  useEffect(() => { fetchDesigns(); }, [refreshTrigger]);

  const deleteDesign = async (id) => {
    await supabase.from("designs").delete().eq("id", id);
    fetchDesigns();
  };

  return (
    <div>
      {designs.map((d) => (
        <div key={d.id} style={{ marginBottom: 5 }}>
          <span onClick={() => onSelect(d)} style={{ cursor: "pointer", marginRight: 10 }}>
            {d.id}
          </span>
          <button onClick={() => deleteDesign(d.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
