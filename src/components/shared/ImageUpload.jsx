"use client";
import { useState } from "react";

const ImageUpload = ({ onUploadSuccess }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dahgorrlb",
        uploadPreset: "parcel_upload",
        sources: ["local", "url", "camera"],
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const url = result.info.secure_url;
          setImageUrl(url);
          onUploadSuccess(url);
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 border-2 border-dashed border-base-300 p-4 rounded-xl">
      {imageUrl ? (
        <div className="avatar">
          <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={imageUrl} alt="Uploaded profile" />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xs opacity-60 mb-2">No image selected</p>
        </div>
      )}
      <button
        type="button"
        onClick={handleUpload}
        className="btn btn-sm btn-outline btn-primary"
      >
        {imageUrl ? "Change Photo" : "Upload Profile Photo"}
      </button>
    </div>
  );
};

export default ImageUpload;
