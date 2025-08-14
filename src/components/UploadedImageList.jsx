import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function UploadedImageList({ user, onSelectImage }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase.storage.from("images").list(user.id, { limit: 100, offset: 0 });
      const urls = await Promise.all(
        data.map(async (img) => {
          const { publicUrl } = supabase.storage.from("images").getPublicUrl(`${user.id}/${img.name}`);
          return { id: img.name, url: publicUrl, name: img.name };
        })
      );
      setImages(urls);
    };
    if (user) fetchImages();
  }, [user]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {images.map((img) => (
        <img
          key={img.id}
          src={img.url}
          alt={img.name}
          width={80}
          style={{ margin: 5, cursor: "grab" }}
          onClick={() => onSelectImage(img.url)}
        />
      ))}
    </div>
  );
}
