
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Pencil, Undo, Redo, Save, Trash2, MousePointer, Eraser } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ToolbarProps {
  activeTool: 'select' | 'draw' | 'erase';
  brushSize: number;
  canUndo: boolean;
  canRedo: boolean;
  onToolChange: (tool: 'select' | 'draw' | 'erase') => void;
  onBrushSizeChange: (size: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onSaveImage: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  brushSize,
  canUndo,
  canRedo,
  onToolChange,
  onBrushSizeChange,
  onUndo,
  onRedo,
  onClear,
  onSaveImage,
}) => {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-2">
        <ToggleGroup type="single" value={activeTool}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="select" 
                onClick={() => onToolChange('select')}
                aria-label="Select tool"
              >
                <MousePointer className="h-4 w-4" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Select</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="draw" 
                onClick={() => onToolChange('draw')}
                aria-label="Draw tool"
              >
                <Pencil className="h-4 w-4" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Draw</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="erase" 
                onClick={() => onToolChange('erase')}
                aria-label="Erase tool"
              >
                <Eraser className="h-4 w-4" />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>Erase</TooltipContent>
          </Tooltip>
        </ToggleGroup>

        {(activeTool === 'draw' || activeTool === 'erase') && (
          <div className="flex items-center gap-2 border rounded-md px-3 py-2">
            <span className="text-xs font-medium">Size:</span>
            <Slider
              defaultValue={[brushSize]}
              min={1}
              max={50}
              step={1}
              className="w-24"
              onValueChange={(value) => onBrushSizeChange(value[0])}
            />
            <span className="text-xs tabular-nums">{brushSize}px</span>
          </div>
        )}
        
        <div className="ml-2 border-l pl-2 flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onUndo} 
                disabled={!canUndo}
                aria-label="Undo"
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onRedo} 
                disabled={!canRedo}
                aria-label="Redo"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
        
        <div className="ml-2 border-l pl-2 flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClear}
                aria-label="Clear canvas"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear canvas</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onSaveImage}
                aria-label="Save as image"
              >
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save as image</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
