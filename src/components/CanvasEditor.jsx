import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { supabase } from "../supabaseClient";

export default function CanvasEditor({ user, selectedDesign, onDesignSaved }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", { width: 800, height: 600 });
    window.canvasEditorInstance = canvas;

    // Save initial state for undo
    canvas._undoStack = [canvas.toJSON()];

    // Track changes
    canvas.on("object:added", () => canvas._undoStack.push(canvas.toJSON()));
    canvas.on("object:modified", () => canvas._undoStack.push(canvas.toJSON()));

    return () => canvas.dispose();
  }, []);

  useEffect(() => {
    if (!selectedDesign) return;
    const loadDesign = async () => {
      const { data } = await supabase
        .from("designs")
        .select("json")
        .eq("id", selectedDesign.id)
        .single();
      if (data?.json) window.canvasEditorInstance.loadFromJSON(data.json, () => window.canvasEditorInstance.renderAll());
    };
    loadDesign();
  }, [selectedDesign]);

  const saveDesign = async () => {
    const json = window.canvasEditorInstance.toJSON();
    await supabase.from("designs").upsert({ id: selectedDesign?.id, user_id: user.id, json });
    onDesignSaved();
    alert("Design saved!");
  };

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} style={{ border: "1px solid #ccc" }} />
      <button onClick={saveDesign} style={{ marginTop: 10 }}>Save Design</button>
    </div>
  );
}
