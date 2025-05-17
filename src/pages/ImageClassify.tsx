
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ImageDropzone } from '@/components/ImageDropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';

// Mock classification results
const mockClassifications = [
  { 
    category: 'cat', 
    confidence: 0.92,
    description: 'A domestic feline, commonly kept as a pet.'
  },
  {
    category: 'dog',
    confidence: 0.05,
    description: 'A domesticated carnivorous mammal that typically has a long snout.'
  },
  {
    category: 'bird',
    confidence: 0.02,
    description: 'A warm-blooded egg-laying vertebrate with wings, feathers, and a beak.'
  },
  {
    category: 'rabbit',
    confidence: 0.01,
    description: 'A small mammal with long ears, short tail, and powerful hind legs.'
  }
];

const ImageClassify = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationResults, setClassificationResults] = useState<typeof mockClassifications | null>(null);
  
  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    // Reset results when a new image is uploaded
    setClassificationResults(null);
  };
  
  const handleClassify = async () => {
    if (!uploadedImage) return;
    
    setIsClassifying(true);
    
    // Simulate API request delay
    setTimeout(() => {
      // In a real app, you would send the image to an API endpoint
      // and get the actual classification results
      setClassificationResults(mockClassifications);
      setIsClassifying(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Image Classification</h1>
              <p className="mt-2 text-gray-600">
                Upload an image and our AI will analyze and classify it for you.
              </p>
            </div>
            
            <ImageDropzone onImageUpload={handleImageUpload} />
            
            <Button
              onClick={handleClassify}
              disabled={!uploadedImage || isClassifying}
              className="w-full"
            >
              {isClassifying ? 'Analyzing Image...' : 'Classify Image'}
              {!isClassifying && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          
          <div className="animate-slideUp">
            {isClassifying ? (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Processing Image</h2>
                <Progress value={45} className="mb-2" />
                <p className="text-sm text-gray-500">Analyzing patterns and features...</p>
              </Card>
            ) : classificationResults ? (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Classification Results</h2>
                  <div className="space-y-4">
                    {classificationResults.map((result, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium capitalize">{result.category}</span>
                          <span className="text-sm font-mono">
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={result.confidence * 100} className="h-2" 
                          style={{
                            background: index === 0 ? 'rgba(46, 204, 113, 0.2)' : 'rgba(236, 240, 241, 0.6)',
                            color: index === 0 ? 'rgb(46, 204, 113)' : 'rgba(149, 165, 166, 0.8)'
                          }}
                        />
                        <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-gray-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700">No Results Yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Upload an image and click "Classify Image" to see the results here.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ImageClassify;
