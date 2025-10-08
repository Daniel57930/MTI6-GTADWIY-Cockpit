import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * GTAdwiy Terrain Component
 * Visualizes stealth trading flows and spiritual presence across the terrain
 */
const GTAdwiyTerrain = ({ 
  width = 800, 
  height = 600, 
  gridSize = 20,
  onTerrainClick 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [terrainData, setTerrainData] = useState([]);
  const [flows, setFlows] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [activePoints, setActivePoints] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize terrain with procedural generation
  useEffect(() => {
    const initializeTerrain = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Generate terrain data
        const data = generateTerrainData(gridSize);
        setTerrainData(data);
        
        // Initialize some random flows
        const initialFlows = generateFlows(5);
        setFlows(initialFlows);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    initializeTerrain();
  }, [gridSize]);

  // Animate terrain flows
  useEffect(() => {
    if (loading || error || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameCount = 0;

    const animate = () => {
      drawTerrain(ctx, canvas.width, canvas.height, terrainData, flows, frameCount, hoveredCell, activePoints);
      frameCount++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loading, error, terrainData, flows, hoveredCell, activePoints]);

  const handleCanvasClick = useCallback((event) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cellX = Math.floor(x / (width / gridSize));
    const cellY = Math.floor(y / (height / gridSize));

    // Add active point
    const newPoint = { x: cellX, y: cellY, timestamp: Date.now() };
    setActivePoints(prev => [...prev.slice(-9), newPoint]);

    if (onTerrainClick) {
      onTerrainClick({ x: cellX, y: cellY, terrain: terrainData[cellY]?.[cellX] });
    }
  }, [width, height, gridSize, terrainData, onTerrainClick]);

  const handleCanvasHover = useCallback((event) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cellX = Math.floor(x / (width / gridSize));
    const cellY = Math.floor(y / (height / gridSize));

    setHoveredCell({ x: cellX, y: cellY });
  }, [width, height, gridSize]);

  const handleCanvasLeave = useCallback(() => {
    setHoveredCell(null);
  }, []);

  const addFlow = useCallback(() => {
    const newFlow = generateFlows(1)[0];
    setFlows(prev => [...prev, newFlow]);
  }, []);

  const clearFlows = useCallback(() => {
    setFlows([]);
  }, []);

  // Fallback loader
  if (loading) {
    return (
      <div className="gtadwiy-terrain loading" role="status" aria-live="polite">
        <div className="terrain-loader">
          <div className="loader-grid"></div>
        </div>
        <p>Rendering terrain...</p>
      </div>
    );
  }

  // Error fallback
  if (error) {
    return (
      <div className="gtadwiy-terrain error" role="alert">
        <h3>Terrain Rendering Error</h3>
        <p>{error}</p>
        <button onClick={() => setError(null)}>Retry</button>
      </div>
    );
  }

  return (
    <div className="gtadwiy-terrain-container" role="region" aria-label="GTAdwiy Terrain Visualization">
      <header className="terrain-header">
        <h2>GTAdwiy Terrain</h2>
        <div className="terrain-controls">
          <button onClick={addFlow} className="control-btn">
            Add Flow
          </button>
          <button onClick={clearFlows} className="control-btn">
            Clear Flows
          </button>
          <div className="flow-count">
            Active Flows: {flows.length}
          </div>
        </div>
      </header>

      <div className="terrain-viewport">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasHover}
          onMouseLeave={handleCanvasLeave}
          aria-label="Interactive terrain map"
        />
        
        {hoveredCell && (
          <div className="terrain-tooltip" style={{
            left: `${(hoveredCell.x / gridSize) * width}px`,
            top: `${(hoveredCell.y / gridSize) * height}px`
          }}>
            Cell: ({hoveredCell.x}, {hoveredCell.y})<br />
            Elevation: {terrainData[hoveredCell.y]?.[hoveredCell.x]?.toFixed(2) || 'N/A'}
          </div>
        )}
      </div>

      <div className="terrain-info">
        <div className="info-section">
          <span className="info-label">Grid Size:</span>
          <span className="info-value">{gridSize}x{gridSize}</span>
        </div>
        <div className="info-section">
          <span className="info-label">Active Points:</span>
          <span className="info-value">{activePoints.length}</span>
        </div>
      </div>

      <style jsx>{`
        .gtadwiy-terrain-container {
          background: #0a0e27;
          border: 2px solid #1a1f3a;
          border-radius: 8px;
          padding: 20px;
          color: #eee;
        }

        .gtadwiy-terrain.loading,
        .gtadwiy-terrain.error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          background: #0a0e27;
          border: 2px solid #1a1f3a;
          border-radius: 8px;
          padding: 20px;
          color: #eee;
        }

        .terrain-loader {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .loader-grid {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(#3282b8 2px, transparent 2px),
            linear-gradient(90deg, #3282b8 2px, transparent 2px);
          background-size: 20px 20px;
          animation: grid-shift 2s linear infinite;
        }

        @keyframes grid-shift {
          0% { background-position: 0 0; }
          100% { background-position: 20px 20px; }
        }

        .terrain-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #1a1f3a;
        }

        .terrain-header h2 {
          margin: 0;
          color: #3282b8;
        }

        .terrain-controls {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .control-btn {
          padding: 6px 12px;
          background: #1a1f3a;
          border: 1px solid #3282b8;
          border-radius: 4px;
          color: #3282b8;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: #3282b8;
          color: #0a0e27;
        }

        .flow-count {
          padding: 6px 12px;
          background: rgba(50, 130, 184, 0.2);
          border-radius: 4px;
          font-size: 12px;
          color: #3282b8;
        }

        .terrain-viewport {
          position: relative;
          margin-bottom: 20px;
          background: #000;
          border-radius: 4px;
          overflow: hidden;
        }

        canvas {
          display: block;
          cursor: crosshair;
        }

        .terrain-tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.9);
          color: #3282b8;
          padding: 8px 12px;
          border: 1px solid #3282b8;
          border-radius: 4px;
          font-size: 12px;
          pointer-events: none;
          transform: translate(-50%, -100%);
          margin-top: -10px;
          white-space: nowrap;
          z-index: 10;
        }

        .terrain-info {
          display: flex;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid #1a1f3a;
        }

        .info-section {
          display: flex;
          gap: 8px;
        }

        .info-label {
          color: #888;
        }

        .info-value {
          color: #3282b8;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

/**
 * Generate procedural terrain data
 */
function generateTerrainData(size) {
  const data = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      // Simple Perlin-like noise approximation
      const elevation = 
        Math.sin(x * 0.1) * 0.3 +
        Math.cos(y * 0.1) * 0.3 +
        Math.sin((x + y) * 0.05) * 0.2 +
        Math.random() * 0.2;
      row.push(elevation);
    }
    data.push(row);
  }
  return data;
}

/**
 * Generate random flow data
 */
function generateFlows(count) {
  const flows = [];
  for (let i = 0; i < count; i++) {
    flows.push({
      id: `flow_${Date.now()}_${i}`,
      startX: Math.random(),
      startY: Math.random(),
      angle: Math.random() * Math.PI * 2,
      speed: 0.001 + Math.random() * 0.002,
      length: 0.1 + Math.random() * 0.2,
      color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
      intensity: 0.3 + Math.random() * 0.7
    });
  }
  return flows;
}

/**
 * Draw the terrain visualization
 */
function drawTerrain(ctx, width, height, terrainData, flows, frameCount, hoveredCell, activePoints) {
  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  if (terrainData.length === 0) return;

  const size = terrainData.length;
  const cellWidth = width / size;
  const cellHeight = height / size;

  // Draw terrain grid
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const elevation = terrainData[y][x];
      const brightness = Math.floor(50 + elevation * 100);
      const isHovered = hoveredCell && hoveredCell.x === x && hoveredCell.y === y;
      
      ctx.fillStyle = isHovered 
        ? `rgb(50, 130, 184)` 
        : `rgb(${brightness * 0.3}, ${brightness * 0.5}, ${brightness})`;
      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
    }
  }

  // Draw active points
  activePoints.forEach(point => {
    const age = Date.now() - point.timestamp;
    const opacity = Math.max(0, 1 - age / 3000);
    const radius = 5 + (age / 300);
    
    ctx.beginPath();
    ctx.arc(
      point.x * cellWidth + cellWidth / 2,
      point.y * cellHeight + cellHeight / 2,
      radius,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Draw flows
  flows.forEach(flow => {
    const time = frameCount * flow.speed;
    const x = ((flow.startX + Math.cos(flow.angle) * time) % 1) * width;
    const y = ((flow.startY + Math.sin(flow.angle) * time) % 1) * height;
    const endX = x + Math.cos(flow.angle) * flow.length * width;
    const endY = y + Math.sin(flow.angle) * flow.length * height;

    const gradient = ctx.createLinearGradient(x, y, endX, endY);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, flow.color);
    gradient.addColorStop(1, 'transparent');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2 * flow.intensity;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Draw glow effect
    ctx.shadowBlur = 10 * flow.intensity;
    ctx.shadowColor = flow.color;
    ctx.stroke();
    ctx.shadowBlur = 0;
  });
}

export default GTAdwiyTerrain;
