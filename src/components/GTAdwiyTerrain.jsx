import { useEffect, useRef, useState } from "react";

/**
 * GTAdwiyTerrain - 3D terrain visualization component
 * Renders the GTADWIY map with interactive zones and overlays
 */
const GTAdwiyTerrain = ({ zones = [], onZoneClick, emotionalState = "calm" }) => {
  const canvasRef = useRef(null);
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    // Draw terrain grid
    ctx.strokeStyle = "#2a2a2a";
    ctx.lineWidth = 1;
    
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw zones
    zones.forEach((zone, index) => {
      const x = (zone.x || index * 100) % width;
      const y = (zone.y || index * 80) % height;
      const radius = zone.radius || 30;

      // Zone circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = zone.active ? "#4a9eff" : "#2a4a6a";
      ctx.fill();
      ctx.strokeStyle = "#6abeff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Zone label
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(zone.name || `Zone ${index + 1}`, x, y + radius + 15);
    });

    // Emotional overlay effect
    if (emotionalState !== "calm") {
      ctx.fillStyle = emotionalState === "focused" ? "rgba(74, 158, 255, 0.1)" : "rgba(255, 100, 100, 0.1)";
      ctx.fillRect(0, 0, width, height);
    }
  }, [zones, emotionalState]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is within any zone
    zones.forEach((zone, index) => {
      const zoneX = (zone.x || index * 100) % canvas.width;
      const zoneY = (zone.y || index * 80) % canvas.height;
      const radius = zone.radius || 30;
      
      const distance = Math.sqrt(Math.pow(x - zoneX, 2) + Math.pow(y - zoneY, 2));
      
      if (distance <= radius) {
        setSelectedZone(zone);
        if (typeof onZoneClick === "function") {
          onZoneClick(zone);
        }
      }
    });
  };

  return (
    <div className="gtadwiy-terrain">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="terrain__canvas"
        onClick={handleCanvasClick}
      />
      {selectedZone && (
        <div className="terrain__info">
          <h3>{selectedZone.name}</h3>
          <p>{selectedZone.description || "No description available"}</p>
          <p>Status: {selectedZone.active ? "Active" : "Inactive"}</p>
        </div>
      )}
    </div>
  );
};

export default GTAdwiyTerrain;
