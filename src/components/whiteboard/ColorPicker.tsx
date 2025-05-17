
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  '#000000', // Black
  '#ffffff', // White
  '#e74c3c', // Red
  '#3498db', // Blue
  '#2ecc71', // Green
  '#f1c40f', // Yellow
  '#9b59b6', // Purple
  '#e67e22', // Orange
  '#1abc9c', // Teal
  '#34495e'  // Dark blue
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [customColor, setCustomColor] = useState(color);

  const handleColorChange = (newColor: string) => {
    setCustomColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium mr-1">Color:</span>
      <div className="flex gap-1">
        <ToggleGroup type="single" value={PRESET_COLORS.includes(color) ? color : undefined}>
          {PRESET_COLORS.slice(0, 5).map((presetColor) => (
            <ToggleGroupItem 
              key={presetColor} 
              value={presetColor}
              className="w-6 h-6 p-0 rounded-md"
              style={{ backgroundColor: presetColor, border: '1px solid #e2e8f0' }}
              onClick={() => onChange(presetColor)}
              aria-label={`Color ${presetColor}`}
            />
          ))}
        </ToggleGroup>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-6 h-6 rounded-md border overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            style={{ backgroundColor: color }}
            aria-label="Custom color picker"
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="grid grid-cols-5 gap-2">
            {PRESET_COLORS.map((presetColor) => (
              <button
                key={presetColor}
                className="w-6 h-6 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                style={{ 
                  backgroundColor: presetColor,
                  borderColor: color === presetColor ? '#3498db' : 'transparent',
                }}
                onClick={() => onChange(presetColor)}
                aria-label={`Color ${presetColor}`}
              />
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t flex items-center gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-8 h-8 p-0"
              aria-label="Custom color"
            />
            <span className="text-xs font-medium">Custom</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
