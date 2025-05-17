
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageDropzoneProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageUpload, className }) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        setPreview(reader.result as string);
        onImageUpload(file);
      };
      
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });
  
  const clearImage = () => {
    setPreview(null);
  };
  
  return (
    <div className={`w-full ${className}`}>
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-300'
            }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            or click to browse (JPEG, PNG, GIF up to 10MB)
          </p>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-auto rounded-lg shadow-md max-h-96 object-contain mx-auto" 
          />
          <Button
            variant="secondary" 
            size="icon" 
            className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-700"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
