'use client';

import { useState, useCallback, useRef, ChangeEvent } from 'react';
import { FileText, UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileWithPreview = File & {
  preview: string;
};

interface ResumeUploadBoxProps {
  onFileUpload: (file: File) => Promise<void>;
}

export function ResumeUploadBox({ onFileUpload }: ResumeUploadBoxProps) {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = async (selectedFile: File) => {
    if (!isValidFileType(selectedFile)) {
      alert('Please upload a valid file type (.pdf, .docx, .txt)');
      return;
    }

    try {
      await onFileUpload(selectedFile);
      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile)
      });
      setFile(fileWithPreview);
    } catch (error) {
      console.error('Error processing file:', error);
      // Error handling (e.g., show toast notification)
    }
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    return validTypes.includes(file.type);
  };

  const removeFile = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={cn(
          'relative p-8 border-2 border-dashed rounded-xl transition-all duration-300',
          'hover:border-primary/50 hover:shadow-lg',
          isDragging ? 'border-primary/70 bg-primary/5' : 'border-gray-300 dark:border-gray-700',
          'group cursor-pointer',
          'bg-gradient-to-br from-background to-muted/30',
          'animate-pulse-slow'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">
            {file ? 'File Uploaded' : 'Drag & drop your resume here'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {file ? file.name : 'or click to browse files (PDF, DOCX, TXT)'}
          </p>
          {!file && (
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Select File
            </span>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            onChange={handleFileChange}
          />
        </div>
        
        {/* Glow effect */}
        <div className={cn(
          'absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10',
          'blur-sm'
        )} />
      </div>

      {/* File Preview */}
      {file && (
        <div className="mt-6 p-4 border rounded-lg bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB • {file.type.split('/').pop()?.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}

export default ResumeUploadBox;
