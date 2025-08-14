import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ImageUploader({ user, onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file || !user) return;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${user.id}/${file.name}`, file, { upsert: true });

    if (!error) {
      onUpload();
      setFile(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}
