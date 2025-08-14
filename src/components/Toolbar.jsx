import React from "react";
import { fabric } from "fabric";

export default function Toolbar() {
  const addRectangle = () => {
    const canvas = window.canvasEditorInstance;
    if (!canvas) return;

    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      width: 100,
      height: 60,
      fill: "skyblue",
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
  };

  const addCircle = () => {
    const canvas = window.canvasEditorInstance;
    if (!canvas) return;

    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: "orange",
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
  };

  const addText = () => {
    const canvas = window.canvasEditorInstance;
    if (!canvas) return;

    const text = new fabric.Textbox("Sample Text", {
      left: 150,
      top: 150,
      fontSize: 24,
      fill: "black",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const undo = () => {
    const canvas = window.canvasEditorInstance;
    if (!canvas || !canvas._undoStack) return;
    const last = canvas._undoStack.pop();
    if (last) {
      canvas.loadFromJSON(last, canvas.renderAll.bind(canvas));
    }
  };

  const redo = () => {
    alert("Redo feature coming soon!");
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <button onClick={addRectangle}>Add Rectangle</button>
      <button onClick={addCircle}>Add Circle</button>
      <button onClick={addText}>Add Text</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}
