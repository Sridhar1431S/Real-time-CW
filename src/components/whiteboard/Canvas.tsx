
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { toast } from '@/components/ui/sonner';
import { Toolbar } from './Toolbar';
import { ColorPicker } from './ColorPicker';

interface CanvasProps {
  sessionId?: string;
}

export const Canvas: React.FC<CanvasProps> = ({ sessionId = 'default-session' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
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

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: false,
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = brushSize;
    
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
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === 'draw';
    
    if (activeTool === 'draw') {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    } else if (activeTool === 'erase') {
      // Set up eraser behavior
      fabricCanvas.isDrawingMode = true;
      fabricCanvas.freeDrawingBrush.color = '#ffffff';
      fabricCanvas.freeDrawingBrush.width = brushSize * 2;
    }

  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  // Save canvas state to history
  const saveCanvasState = (canvas = fabricCanvas) => {
    if (!canvas) return;
    
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
  };

  // Register object modified event
  useEffect(() => {
    if (!fabricCanvas) return;
    
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
  }, [fabricCanvas]);

  const handleToolChange = (tool: typeof activeTool) => {
    setActiveTool(tool);
  };

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    if (fabricCanvas && fabricCanvas.isDrawingMode) {
      fabricCanvas.freeDrawingBrush.color = color;
    }
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
    if (fabricCanvas && fabricCanvas.isDrawingMode) {
      fabricCanvas.freeDrawingBrush.width = size;
    }
  };

  const handleUndo = () => {
    if (!fabricCanvas || historyIndexRef.current <= 0) return;
    
    historyIndexRef.current--;
    const json = historyRef.current[historyIndexRef.current];
    fabricCanvas.loadFromJSON(json, () => {
      fabricCanvas.renderAll();
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    });
  };

  const handleRedo = () => {
    if (!fabricCanvas || historyIndexRef.current >= historyRef.current.length - 1) return;
    
    historyIndexRef.current++;
    const json = historyRef.current[historyIndexRef.current];
    fabricCanvas.loadFromJSON(json, () => {
      fabricCanvas.renderAll();
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    });
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    
    fabricCanvas.clear();
    fabricCanvas.setBackgroundColor('#ffffff', () => {
      fabricCanvas.renderAll();
      saveCanvasState();
    });
  };

  const handleSaveImage = () => {
    if (!fabricCanvas) return;
    
    try {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
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
      <div className={`canvas-container border-2 rounded-lg shadow-lg overflow-hidden
        ${activeTool === 'draw' || activeTool === 'erase' ? 'drawing-active' : ''}`}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
</lov-add-dependency>fabric@latest</lov-add-dependency>
