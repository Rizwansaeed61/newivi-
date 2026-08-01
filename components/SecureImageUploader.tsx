import React, { useRef, useState } from 'react';

export interface SecureImageUploaderProps {
  onUpload: (base64String: string) => void;
  label?: string;
  accept?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export function SecureImageUploader({
  onUpload,
  label = "Upload Image",
  accept = "image/*",
  maxWidth = 1920,
  maxHeight = 1080
}: SecureImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert("File too large. Please select a file smaller than 50MB.");
        return;
    }

    setIsProcessing(true);

    // If it's a video, just use object URL or read as DataURL (Warning: large videos in localStorage will exceed 5MB quota)
    // Actually, storing videos in localStorage is a bad idea due to quota limits (5-10MB).
    // Let's pass the raw base64 or URL. But we must be careful.
    if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                onUpload(event.target.result as string);
                setIsProcessing(false);
            }
        };
        reader.readAsDataURL(file);
        return;
    }

    // Image optimization via Canvas
    try {
      const bitmap = await createImageBitmap(file);
      let width = bitmap.width;
      let height = bitmap.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");
      
      ctx.drawImage(bitmap, 0, 0, width, height);
      
      // Compress slightly to save local storage space (JPEG, 0.7 quality)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      onUpload(dataUrl);
    } catch (err) {
      console.error("Image processing failed", err);
      alert("Failed to process image.");
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] text-[#A69D92] block">{label}</label>
      <div className="relative w-full">
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
          className="w-full bg-[#231F17] border border-[#2C2419] rounded px-2 py-1.5 text-xs text-[#A69D92] file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#E59500] file:text-[#15120E] hover:file:bg-[#F1A417] cursor-pointer"
          disabled={isProcessing}
        />
        {isProcessing && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-[10px] text-[#E59500] animate-pulse">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}
