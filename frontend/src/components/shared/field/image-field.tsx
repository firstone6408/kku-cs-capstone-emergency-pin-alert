import { Input } from "@/components/ui/input";
import { LabeledControl } from "./labeled-control";
import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ErrorActionType } from "@/types/actions/action";
import { image as imageLib } from "@/lib/image";

interface ImageFieldProps {
  label: string;
  name?: string;
  errorMessage?: React.ReactNode | ErrorActionType;
  required?: boolean;
  optional?: boolean;
  hiddenIcon?: boolean;
  multiple?: boolean;
  className?: string;
  onImageChange?: (images: File[], deletedIds?: string[]) => void;
  existingImages: {
    id: string;
    url: string;
    isMain: boolean;
  }[];
  disabled?: boolean;
}

export function ImageField({
  label,
  name,
  required = false,
  multiple = false,
  onImageChange,
  existingImages,
  className,
  optional,
  hiddenIcon,
  errorMessage,
  disabled,
  ...props
}: ImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // preview
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [existingImagesState, setExistingImagesState] =
    useState(existingImages);

  const notifyToParent = useCallback(() => {
    if (onImageChange) {
      onImageChange(selectedFiles, deletedImageIds);
    }
  }, [selectedFiles, deletedImageIds, onImageChange]);

  useEffect(() => {
    notifyToParent();
  }, [notifyToParent]);

  const triggerFileInput = () => {
    // เช็คว่ามีการทำกับ fileInputRef ไหม
    if (fileInputRef.current) {
      fileInputRef.current.click(); // ถ้ามี ให้ click
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    // filter only image files
    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/"),
    );
    // create preview urls (สร้าง URL ชั่วคราว)
    const newPreviewUrls = imageFiles.map((file) =>
      URL.createObjectURL(file),
    );
    // มีการเก็บค่าเก่า
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    setSelectedFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleRemoveImage = (
    index: number,
    isExisting: boolean = false,
  ) => {
    if (isExisting) {
      const imageToRemove = existingImagesState[index];
      // console.log(imageToRemove);
      setDeletedImageIds((prev) => [...prev, imageToRemove.id]);
      setExistingImagesState(
        existingImagesState.filter((_, i) => i !== index),
      );
    } else {
      URL.revokeObjectURL(imagePreviewUrls[index]);
      setImagePreviewUrls(imagePreviewUrls.filter((_, i) => i !== index));
      setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    }
  };

  const previewImage = (
    url: string,
    index: number = 0,
    isExisting: boolean = false,
  ) => {
    return (
      <div
        key={index}
        className={cn(
          "relative aspect-square group border rounded-md overflow-hidden",
        )}
      >
        <Image
          src={url}
          fill
          sizes="24"
          className="object-cover"
          alt={`image-preview-${url}`}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-1 end-1 space-x-1">
          {!disabled && (
            <Button
              type="button"
              size={"icon"}
              variant={"destructive"}
              className="cursor-pointer size-6 sm:size-8 rounded-full"
              onClick={() => handleRemoveImage(index, isExisting)}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <LabeledControl
        label={label}
        name={name}
        required={required}
        errorMessage={errorMessage}
        optional={optional}
        hiddenIcon={hiddenIcon}
      >
        <div className={cn("rounded-md", className)}>
          {/* Preview Image area */}
          {!multiple ? (
            <>
              {imagePreviewUrls.length === 1 &&
                previewImage(imagePreviewUrls[0])}
              {existingImagesState.length === 1 &&
                previewImage(
                  imageLib.getUrl(existingImagesState[0].url),
                  0,
                  true,
                )}
            </>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* Exists image */}
              {existingImagesState.length > 0 &&
                existingImagesState.map((image, index) =>
                  previewImage(imageLib.getUrl(image.url), index, true),
                )}
              {imagePreviewUrls.length > 0 && (
                <>
                  {/* New Image */}
                  {imagePreviewUrls.map((url, index) =>
                    previewImage(url, index),
                  )}
                </>
              )}

              {multiple &&
                (imagePreviewUrls.length > 0 ||
                  existingImagesState.length > 0) && (
                  <div
                    className="aspect-square border rounded-md flex items-center justify-center cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => triggerFileInput()}
                  >
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <Plus size={24} />
                      <span className="text-xs">เพิ่มรูปภาพ</span>
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Add new image */}
          {imagePreviewUrls.length === 0 &&
            existingImagesState.length === 0 && (
              <div
                className={cn(
                  "border rounded-md flex items-center justify-center cursor-pointer hover:bg-muted transition-colors",
                  className,
                )}
                onClick={() => triggerFileInput()}
              >
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <Plus size={24} />
                  <span className="text-xs">เพิ่มรูปภาพ</span>
                </div>
              </div>
            )}
        </div>
        <Input
          id={name}
          name={name}
          type="file"
          multiple={multiple}
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={(event) => handleFileChange(event)}
          required={required}
          {...props}
        />
      </LabeledControl>
    </>
  );
}
