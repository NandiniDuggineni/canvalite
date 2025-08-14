import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { supabase } from "../supabaseClient";
import AIControls from "./AIControls";
import UploadedImageList from "./UploadedImageList";

export default function CanvasEditor({ user, selectedDesign, onDesignSaved }) {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const c = new fabric.Canvas("canvas", { width: 800, height: 600, backgroundColor: "#fff" });
    c._undoStack = [c.toJSON()];
    c._redoStack = [];

    // Track changes
    const pushToUndo = () => {
      c._undoStack.push(c.toJSON());
      c._redoStack = [];
    };
    c.on("object:added", pushToUndo);
    c.on("object:modified", pushToUndo);
    c.on("object:removed", pushToUndo);

    setCanvas(c);

    return () => c.dispose();
  }, []);

  // Load selected design
  useEffect(() => {
    if (!selectedDesign || !canvas) return;

    const loadDesign = async () => {
      const { data } = await supabase
        .from("designs")
        .select("json")
        .eq("id", selectedDesign.id)
        .single();
      if (data?.json) canvas.loadFromJSON(data.json, () => canvas.renderAll());
    };
    loadDesign();
  }, [selectedDesign, canvas]);

  // Save design
  const saveDesign = async () => {
    if (!canvas) return;
    const json = canvas.toJSON();
    await supabase.from("designs").upsert({ id: selectedDesign?.id, user_id: user.id, json });
    onDesignSaved();
    alert("Design saved!");
  };

  // Undo/Redo
  const undo = () => {
    if (!canvas || canvas._undoStack.length <= 1) return;
    const current = canvas._undoStack.pop();
    canvas._redoStack.push(current);
    const previous = canvas._undoStack[canvas._undoStack.length - 1];
    canvas.loadFromJSON(previous, () => canvas.renderAll());
  };

  const redo = () => {
    if (!canvas || canvas._redoStack.length === 0) return;
    const next = canvas._redoStack.pop();
    canvas._undoStack.push(next);
    canvas.loadFromJSON(next, () => canvas.renderAll());
  };

  // Export as image
  const exportImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "design.png";
    link.click();
  };

  // AI handlers
  const handleAddAIImage = (url) => {
    if (!canvas) return;
    fabric.Image.fromURL(url, (img) => {
      img.set({ left: 50, top: 50, scaleX: 0.5, scaleY: 0.5 });
      canvas.add(img);
      canvas.renderAll();
    });
  };

  const handleAddAIText = (text) => {
    if (!canvas) return;
    const txt = new fabric.Textbox(text, { left: 50, top: 50, width: 300, fontSize: 20 });
    canvas.add(txt);
    canvas.renderAll();
  };

  // Drag-drop uploaded images
  const handleAddUploadedImage = (url) => {
    if (!canvas) return;
    fabric.Image.fromURL(url, (img) => {
      img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
      canvas.add(img);
      canvas.renderAll();
    });
  };

  return (
    <div>
      <AIControls onAddImage={handleAddAIImage} onAddText={handleAddAIText} />
      <UploadedImageList user={user} onSelectImage={handleAddUploadedImage} />
      
      <canvas id="canvas" ref={canvasRef} style={{ border: "1px solid #ccc", marginTop: 10 }} />

      <div style={{ marginTop: 10 }}>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={undo} style={{ marginLeft: 5 }}>Undo</button>
        <button onClick={redo} style={{ marginLeft: 5 }}>Redo</button>
        <button onClick={exportImage} style={{ marginLeft: 5 }}>Export Image</button>
      </div>
    </div>
  );
}
