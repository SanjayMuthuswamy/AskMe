import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloudIcon, CheckCircleIcon, FileIcon, XCircleIcon } from "../components/icons";
import { useDocument } from "../contexts/DocumentContext";
import { uploadDocument } from "../services/api";

const ALLOWED_EXTENSIONS = [".pdf",".txt"];
const MAX_FILE_SIZE_MB = 10;

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { setDocumentName, setKnowledgeBaseGenerated } = useDocument();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // === Upload File ===
  const handleFileChange = async (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setUploadError(null);

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setUploadError(`File exceeds ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setStatus("uploading");
    setProgress(30);

    try {
      const result = await uploadDocument(selectedFile);
      console.log("Upload result:", result);
      setStatus("success");
      setProgress(100);
      setDocumentName(selectedFile.name);
    } catch (error) {
      console.error(error);
      setUploadError(error.message || "Upload failed");
      setStatus("idle");
    }
  };

  // === Handle Drag Drop ===
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        handleFileChange(event.dataTransfer.files[0]);
        event.dataTransfer.clearData();
      }
    },
    [setDocumentName]
  );

  const handleDragEvents = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleGenerate = () => {
    setStatus("generating");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("ready");
          setKnowledgeBaseGenerated(true);
          setTimeout(() => navigate("/ask"), 1000);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const dropzoneClassName = `relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
    uploadError
      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
      : isDragging
      ? "border-indigo-500 scale-105 bg-indigo-50 dark:bg-indigo-900/10"
      : "border-slate-300 dark:border-slate-600"
  }`;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-slate-800 dark:text-slate-200">
      <div className="w-full max-w-2xl">
        <div
          className={dropzoneClassName}
          onDrop={handleDrop}
          onDragOver={handleDragEvents}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) =>
              handleFileChange(e.target.files ? e.target.files[0] : null)
            }
            accept={ALLOWED_EXTENSIONS.join(",")}
          />

          {/* Error state */}
          {uploadError ? (
            <>
              <XCircleIcon className="mx-auto h-16 w-16 text-red-500 p-4" />
              <p className="mt-4 text-lg font-semibold text-red-600 dark:text-red-400">
                Upload Failed
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {uploadError}
              </p>
              <button
                onClick={() => {
                  setUploadError(null);
                  fileInputRef.current?.click();
                }}
                className="mt-4 font-semibold text-indigo-500 hover:underline"
              >
                Try another file
              </button>
            </>
          ) : status === "idle" ? (
            <>
              <UploadCloudIcon className="mx-auto h-16 w-16 text-slate-400 p-3" />
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Drag & drop your document here
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                or
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 font-semibold text-indigo-500 hover:underline"
              >
                Browse files
              </button>
              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                Supports: {ALLOWED_EXTENSIONS.join(", ")} (Max {MAX_FILE_SIZE_MB}
                MB)
              </p>
            </>
          ) : status === "uploading" || status === "success" ? (
            <div>
              <FileIcon className="mx-auto h-12 w-12 text-slate-400 p-3" />
              <p className="mt-2 font-medium">{file?.name}</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 my-4">
                <div
                  className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-500">
                {status === "uploading"
                  ? `Uploading... ${progress}%`
                  : "Upload complete!"}
              </p>
              {status === "success" && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleGenerate}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300"
                  >
                    Generate Knowledge Base
                  </button>
                </div>
              )}
            </div>
          ) : status === "generating" || status === "ready" ? (
            <div>
              {status === "ready" ? (
                <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 animate-bounce p-4" />
              ) : ( 
                <div className="mx-auto h-16 w-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              )}
              <p className="mt-4 text-lg">
                {status === "generating"
                  ? "Generating Knowledge Base..."
                  : "Ready to Go!"}
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 my-4">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
