"use client";
import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { type FileWithPreview, useFileUpload } from "@/hooks/use-file-upload";

interface ImageUploaderProps {
   handleImageAdd: (files: FileWithPreview[]) => void;
}

export function ImageUploader({ handleImageAdd }: ImageUploaderProps) {
   const maxSizeMB = 1;
   const maxSize = maxSizeMB * 1024 * 1024;

   const [
      { files, isDragging, errors },
      {
         handleDragEnter,
         handleDragLeave,
         handleDragOver,
         handleDrop,
         openFileDialog,
         removeFile,
         getInputProps,
      },
   ] = useFileUpload({
      accept: "image/*",
      maxSize,
      multiple: false,
      onFilesAdded: handleImageAdd,
   });

   const previewUrl = files[0]?.preview || null;

   return (
      <div className="flex flex-col gap-2">
         <div className="relative">
            {/* Drop area */}
            <button
               type="button"
               onClick={openFileDialog}
               onDragEnter={handleDragEnter}
               onDragLeave={handleDragLeave}
               onDragOver={handleDragOver}
               onDrop={handleDrop}
               data-dragging={isDragging || undefined}
               className="relative flex min-h-52 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-[input:focus]:border-ring has-[img]:border-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
               aria-label="Upload image"
            >
               <input
                  {...getInputProps()}
                  className="sr-only"
                  id="thumbnail"
                  aria-label="Upload file"
               />
               {previewUrl ? (
                  <div className="absolute inset-0">
                     <Image
                        src={previewUrl}
                        alt={files[0]?.file?.name || "Uploaded image"}
                        className="size-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                     <div
                        className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                        aria-hidden="true"
                     >
                        <ImageUpIcon className="size-4 opacity-60" />
                     </div>
                     <p className="mb-1.5 font-medium text-sm">
                        Drop your image here or click to browse
                     </p>
                     <p className="text-muted-foreground text-xs">
                        Max size: {maxSizeMB}MB
                     </p>
                  </div>
               )}
            </button>
            {previewUrl && (
               <div className="absolute top-4 right-4">
                  <button
                     type="button"
                     className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                     onClick={() => removeFile(files[0]?.id)}
                     aria-label="Remove image"
                  >
                     <XIcon className="size-4" aria-hidden="true" />
                  </button>
               </div>
            )}
         </div>

         {errors.length > 0 && (
            <div
               className="flex items-center gap-1 text-destructive text-xs"
               role="alert"
            >
               <AlertCircleIcon className="size-3 shrink-0" />
               <span>{errors[0]}</span>
            </div>
         )}
      </div>
   );
}
