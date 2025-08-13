import React from "react";
import DesignList from "../components/DesignList";
import CanvasEditor from "../components/CanvasEditor";
import Toolbar from "../components/Toolbar";
import ImageUploader from "../components/ImageUploader";

export default function Dashboard({
  user,
  onLogout,
  selectedDesign,
  setSelectedDesign,
  refreshDesignList,
  setRefreshDesignList
}) {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Designs</h2>
        <DesignList
          user={user}
          onSelect={setSelectedDesign}
          refreshTrigger={refreshDesignList}
        />
        <ImageUploader user={user} onUpload={() => setRefreshDesignList(!refreshDesignList)} />
        <button onClick={onLogout} style={{ marginTop: 20 }}>Logout</button>
      </div>
      <div className="main">
        <Toolbar />
        <CanvasEditor
          user={user}
          selectedDesign={selectedDesign}
          onDesignSaved={() => setRefreshDesignList(!refreshDesignList)}
        />
      </div>
    </div>
  );
}
