"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"

interface ImageUploaderProps {
  value?: string
  onFileSelect: (file: File | null) => void
}

export default function ImageUploader({
  value,
  onFileSelect,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState(value || "")

  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0]
      if (!file) return

      const localPreview = URL.createObjectURL(file)
      setPreview(localPreview)

      onFileSelect(file)
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  })

  return (
    <div className="space-y-4">
      {/* Larger Preview */}
      {preview && (
        <div className="relative w-full h-80 rounded-xl overflow-hidden border shadow-sm">
          <Image src={preview} alt="Preview" fill className="object-cover" />
        </div>
      )}

      {/* Larger Dropzone */}
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-2xl cursor-pointer text-center transition 
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900"
        } hover:border-blue-400`}>
        <input {...getInputProps()} />

        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
          {isDragActive ? "Drop your image…" : "Drag & drop or click to upload"}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Supports PNG, JPG, WEBP — Max 10MB
        </p>
      </div>
    </div>
  )
}
