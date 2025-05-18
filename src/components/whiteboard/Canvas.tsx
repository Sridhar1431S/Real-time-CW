
import { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas } from 'fabric';
import { toast } from '@/components/ui/sonner';
import { Toolbar } from './Toolbar';
import { ColorPicker } from './ColorPicker';

interface CanvasProps {
  sessionId?: string;
}

export const Canvas: React.FC<CanvasProps> = ({ sessionId = 'default-session' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [activeTool, setActiveTool] = useState<'select' | 'draw' | 'erase'>('select');
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Canvas history for undo/redo
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      // Create a fabric canvas with the correct Canvas constructor
      const canvas = new FabricCanvas(canvasRef.current, {
        isDrawingMode: false,
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
      });

      // Initialize brush
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = activeColor;
        canvas.freeDrawingBrush.width = brushSize;
      } else {
        console.error("Free drawing brush not available");
      }
      
      // Save initial state
      saveCanvasState(canvas);

      setFabricCanvas(canvas);
      
      // Handle window resize
      const handleResize = () => {
        const container = canvas.getElement().parentElement;
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        const scale = containerWidth / canvas.getWidth();
        
        const zoom = scale < 1 ? scale : 1;
        canvas.setZoom(zoom);
        canvas.setDimensions({
          width: containerWidth,
          height: canvas.getHeight() * zoom,
        });
      };

      window.addEventListener('resize', handleResize);
      handleResize();
      
      return () => {
        canvas.dispose();
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error("Error initializing canvas:", error);
      toast.error("Failed to initialize canvas");
    }
  }, []);

  // Update drawing mode and brush properties when tool changes
  useEffect(() => {
    if (!fabricCanvas) return;
    
    try {
      console.log("Active tool changed to:", activeTool);
      console.log("Active color:", activeColor);
      
      if (activeTool === 'draw') {
        fabricCanvas.isDrawingMode = true;
        if (fabricCanvas.freeDrawingBrush) {
          fabricCanvas.freeDrawingBrush.color = activeColor;
          fabricCanvas.freeDrawingBrush.width = brushSize;
          console.log("Drawing mode enabled with color:", activeColor, "and size:", brushSize);
        }
      } else if (activeTool === 'erase') {
        fabricCanvas.isDrawingMode = true;
        if (fabricCanvas.freeDrawingBrush) {
          fabricCanvas.freeDrawingBrush.color = '#ffffff';
          fabricCanvas.freeDrawingBrush.width = brushSize * 2;
          console.log("Eraser mode enabled");
        }
      } else {
        fabricCanvas.isDrawingMode = false;
        console.log("Selection mode enabled");
      }
      
      fabricCanvas.renderAll();
    } catch (error) {
      console.error("Error updating canvas tool:", error);
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  // Save canvas state to history
  const saveCanvasState = (canvas = fabricCanvas) => {
    if (!canvas) return;
    
    try {
      // Get current state as JSON
      const json = JSON.stringify(canvas.toJSON());
      
      // If we're at a point in history and making a new change, 
      // remove all future states
      if (historyIndexRef.current < historyRef.current.length - 1) {
        historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      }
      
      historyRef.current.push(json);
      historyIndexRef.current = historyRef.current.length - 1;
      
      // Update undo/redo availability
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    } catch (error) {
      console.error("Error saving canvas state:", error);
    }
  };

  // Register object modified event
  useEffect(() => {
    if (!fabricCanvas) return;
    
    try {
      const handleModified = () => {
        saveCanvasState();
      };
      
      fabricCanvas.on('object:added', handleModified);
      fabricCanvas.on('object:modified', handleModified);
      fabricCanvas.on('object:removed', handleModified);
      
      return () => {
        fabricCanvas.off('object:added', handleModified);
        fabricCanvas.off('object:modified', handleModified);
        fabricCanvas.off('object:removed', handleModified);
      };
    } catch (error) {
      console.error("Error setting up canvas event handlers:", error);
    }
  }, [fabricCanvas]);

  const handleToolChange = (tool: typeof activeTool) => {
    setActiveTool(tool);
    toast.info(`Tool changed to: ${tool}`);
  };

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    console.log("Color changed to:", color);
    if (fabricCanvas && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = color;
      console.log("Brush color updated to:", color);
    }
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
    if (fabricCanvas && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.width = size;
      console.log("Brush size updated to:", size);
    }
  };

  const handleUndo = () => {
    if (!fabricCanvas || historyIndexRef.current <= 0) {
      if (historyIndexRef.current <= 0) {
        toast.info("Nothing to undo");
      }
      return;
    }
    
    try {
      historyIndexRef.current--;
      const json = historyRef.current[historyIndexRef.current];
      fabricCanvas.loadFromJSON(json, () => {
        fabricCanvas.renderAll();
        setCanUndo(historyIndexRef.current > 0);
        setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
        toast.success("Undo successful");
      });
    } catch (error) {
      console.error("Error during undo operation:", error);
      toast.error("Failed to undo");
    }
  };

  const handleRedo = () => {
    if (!fabricCanvas || historyIndexRef.current >= historyRef.current.length - 1) {
      if (historyIndexRef.current >= historyRef.current.length - 1) {
        toast.info("Nothing to redo");
      }
      return;
    }
    
    try {
      historyIndexRef.current++;
      const json = historyRef.current[historyIndexRef.current];
      fabricCanvas.loadFromJSON(json, () => {
        fabricCanvas.renderAll();
        setCanUndo(historyIndexRef.current > 0);
        setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
        toast.success("Redo successful");
      });
    } catch (error) {
      console.error("Error during redo operation:", error);
      toast.error("Failed to redo");
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    
    try {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#ffffff';
      fabricCanvas.renderAll();
      saveCanvasState();
      toast.success("Canvas cleared");
    } catch (error) {
      console.error("Error clearing canvas:", error);
      toast.error("Failed to clear canvas");
    }
  };

  const handleSaveImage = () => {
    if (!fabricCanvas) return;
    
    try {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      });
      
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `whiteboard-${sessionId}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image');
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Toolbar 
          activeTool={activeTool} 
          onToolChange={handleToolChange}
          brushSize={brushSize}
          onBrushSizeChange={handleBrushSizeChange}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClear={handleClear}
          onSaveImage={handleSaveImage}
        />
        <ColorPicker color={activeColor} onChange={handleColorChange} />
      </div>
      <div className={`canvas-container border-2 rounded-lg shadow-lg overflow-hidden cursor-${activeTool === 'draw' ? 'crosshair' : activeTool === 'erase' ? 'cell' : 'default'}`}>
        <canvas ref={canvasRef} className="touch-none" />
      </div>
    </div>
  );
};
