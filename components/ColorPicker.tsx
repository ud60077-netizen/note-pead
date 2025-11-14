
import React from 'react';
import { NOTE_COLORS } from '../constants';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  return (
    <div className="flex items-center gap-2">
      {NOTE_COLORS.map(color => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          aria-label={`Set note color to ${color.split('-')[1]}`}
          className={`w-6 h-6 rounded-full ${color} transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400 ${
            selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
