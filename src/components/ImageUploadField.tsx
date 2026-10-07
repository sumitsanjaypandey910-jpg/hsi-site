import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Loader2, 
  ExternalLink,
  Link as LinkIcon
} from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  helperText?: string;
  placeholder?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value = '',
  onChange,
  folder = 'site_images',
  helperText,
  placeholder = 'https://... or upload image'
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    uploadFile(file);
  };

  const uploadFile = (file: File) => {
    // Basic validation
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    setUploadError(null);
    setUploadSuccess(false);
    setUploading(true);
    setProgress(10);

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${folder}/${Date.now()}_${safeName}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(Math.max(15, percent));
      },
      (error) => {
        console.error('Firebase Storage upload error:', error);
        // Fallback or detailed error message
        let errMsg = 'Failed to upload to Firebase Storage.';
        if (error.code === 'storage/unauthorized') {
          errMsg = 'Unauthorized: Only logged-in admins can upload images to Firebase Storage.';
        } else if (error.code === 'storage/canceled') {
          errMsg = 'Upload was canceled.';
        } else if (error.message) {
          errMsg = `Storage error: ${error.message}`;
        }
        setUploadError(errMsg);
        setUploading(false);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          onChange(downloadUrl);
          setUploadSuccess(true);
          setProgress(100);
          setUploading(false);
          setTimeout(() => setUploadSuccess(false), 3500);
        } catch (urlErr: any) {
          console.error('Error fetching download URL:', urlErr);
          setUploadError('Upload succeeded but failed to fetch download URL.');
          setUploading(false);
        }
      }
    );
  };

  const handleClear = () => {
    onChange('');
    setUploadSuccess(false);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800 tracking-tight">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline focus:outline-none"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL field' : 'Enter URL manually'}</span>
        </button>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}

      {/* Main Upload Box & Preview */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition-colors hover:border-orange-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          
          {/* Image Thumbnail Preview */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-slate-200 bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
            {value ? (
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=200&q=80';
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 p-1 text-center">
                <ImageIcon className="w-6 h-6 stroke-[1.5]" />
                <span className="text-[9px] text-slate-400 mt-0.5">No image</span>
              </div>
            )}

            {value && (
              <button
                type="button"
                onClick={handleClear}
                title="Remove image"
                className="absolute top-1 right-1 p-0.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-xs focus:outline-none transition-transform hover:scale-110"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Action Buttons & Progress */}
          <div className="flex-1 w-full space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                className="hidden"
                id={`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
              />
              
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a192f] hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{value ? 'Replace via Storage' : 'Upload to Storage'}</span>
                  </>
                )}
              </button>

              {value && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View Original</span>
                </a>
              )}

              {value && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold shadow-2xs transition-colors"
                >
                  <X className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            {/* Upload Progress Bar */}
            {uploading && (
              <div className="w-full space-y-1">
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>Uploading to Firebase Storage...</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}

            {/* Upload Success Alert */}
            {uploadSuccess && (
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Uploaded to Firebase Storage successfully!</span>
              </div>
            )}

            {/* Upload Error Alert */}
            {uploadError && (
              <div className="flex items-start gap-1.5 text-[11px] font-medium text-red-700 bg-red-50 p-1.5 rounded-md border border-red-200">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Manual URL Input Option */}
        {showUrlInput && (
          <div className="mt-3 pt-3 border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Direct HTTPS image links or Firebase Storage URLs are accepted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
