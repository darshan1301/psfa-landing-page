import { useState } from "react";

interface UploadState {
  isUploading: boolean;
  error: string | null;
  uploadedUrl: string | null;
}

export function useImageUpload() {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    error: null,
    uploadedUrl: null,
  });

  const uploadImage = async (file: File, folder?: string) => {
    // Client-side validation
    if (file.size > 1024 * 1024) {
      setState((prev) => ({
        ...prev,
        error: "File size must be less than 1MB",
      }));
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      setState((prev) => ({ ...prev, error: "Invalid file type" }));
      return;
    }

    setState({ isUploading: true, error: null, uploadedUrl: null });

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (folder) formData.append("folder", folder);

      const response = await fetch("/api/panel-api/imageUpload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setState({
        isUploading: false,
        error: null,
        uploadedUrl: data.url,
      });

      return data.url;
    } catch (error) {
      setState({
        isUploading: false,
        error: error instanceof Error ? error.message : "Upload failed",
        uploadedUrl: null,
      });
      throw error;
    }
  };

  // Upload from FormData (for react-hook-form integration)
  const uploadFromFormData = async (formData: FormData, folder?: string) => {
    setState({ isUploading: true, error: null, uploadedUrl: null });

    try {
      if (folder) formData.append("folder", folder);

      const response = await fetch("/api/panel-api/imageUpload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setState({
        isUploading: false,
        error: null,
        uploadedUrl: data.url,
      });

      return data.url;
    } catch (error) {
      setState({
        isUploading: false,
        error: error instanceof Error ? error.message : "Upload failed",
        uploadedUrl: null,
      });
      throw error;
    }
  };

  const reset = () => {
    setState({ isUploading: false, error: null, uploadedUrl: null });
  };

  return {
    ...state,
    uploadImage,
    uploadFromFormData,
    reset,
  };
}
