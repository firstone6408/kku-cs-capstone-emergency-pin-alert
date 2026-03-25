"use client";

import { Input } from "@/components/ui/input";
import { LabeledControl } from "./labeled-control";
import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ErrorActionType } from "@/types/actions/action";
import Swal from "sweetalert2";

type MediaType = "image" | "video" | "audio";

interface ExistingMedia {
  id: string;
  url: string;
  type: MediaType;
}

type MediaItem = {
  id?: string; // cloud
  file?: File; // local
  url: string;
  type: MediaType;
};

interface MediaFieldProps {
  label?: string;
  name?: string;
  errorMessage?: React.ReactNode | ErrorActionType;
  required?: boolean;
  optional?: boolean;
  hiddenIcon?: boolean;
  multiple?: boolean;
  className?: string;
  onChange?: (files: File[], deletedIds?: string[]) => void;

  existingMedia?: ExistingMedia[]; // จาก backend
  defaultFiles?: File[]; // จาก form (ยังไม่ upload)

  disabled?: boolean;
  allowedTypes?: MediaType[];
  placeholder?: string;
}

export function MediaField({
  label,
  name,
  required = false,
  multiple = false,
  onChange,
  existingMedia = [],
  defaultFiles = [],
  className,
  optional,
  hiddenIcon,
  errorMessage,
  disabled,
  allowedTypes = ["image", "video", "audio"],
  placeholder = "เพิ่มไฟล์",
}: MediaFieldProps) {
  const acceptMap: Record<MediaType, string> = {
    image: "image/*",
    video: "video/*",
    audio: "audio/*",
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  // =========================
  // 🔄 sync existing + defaultFiles
  // =========================
  const getMediaType = (file: File): MediaType => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "audio";
  };
  const initialMedia = useMemo<MediaItem[]>(() => {
    const existingMapped: MediaItem[] = existingMedia.map((m) => ({
      id: m.id,
      url: m.url,
      type: m.type,
    }));
    const fileMapped: MediaItem[] = (defaultFiles || []).map((file) => ({
      file,
      type: getMediaType(file),
      url: URL.createObjectURL(file),
    }));

    return [...existingMapped, ...fileMapped];
  }, [existingMedia, defaultFiles]);

  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);

  // =========================
  // 🧹 cleanup
  // =========================
  useEffect(() => {
    return () => {
      mediaList.forEach((m) => {
        if (m.file) URL.revokeObjectURL(m.url);
      });
    };
  }, [mediaList]);

  // =========================
  // 📤 notify parent
  // =========================
  useEffect(() => {
    const files = mediaList
      .filter((m) => m.file)
      .map((m) => m.file!) as File[];

    onChange?.(files, deletedIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaList, deletedIds]);

  // =========================
  // 📥 handle upload
  // =========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const valid: MediaItem[] = [];
    const invalid: File[] = [];

    files.forEach((file) => {
      let type: MediaType | null = null;

      if (file.type.startsWith("image/")) type = "image";
      if (file.type.startsWith("video/")) type = "video";
      if (file.type.startsWith("audio/")) type = "audio";

      if (!type || !allowedTypes.includes(type)) {
        invalid.push(file);
        return;
      }

      valid.push({
        file,
        type,
        url: URL.createObjectURL(file),
      });
    });

    if (invalid.length > 0) {
      Swal.fire({
        icon: "error",
        title: "ไฟล์ไม่รองรับ",
        text: invalid.map((f) => f.name).join("\n"),
      });
    }

    if (valid.length === 0) {
      e.target.value = "";
      return;
    }

    if (!multiple) {
      mediaList.forEach((m) => {
        if (m.file) URL.revokeObjectURL(m.url);
      });
      setMediaList(valid.slice(0, 1));
    } else {
      setMediaList((prev) => [...prev, ...valid]);
    }

    e.target.value = "";
  };

  // =========================
  // 🗑 remove
  // =========================
  const handleRemove = (index: number) => {
    const item = mediaList[index];

    if (item.file) {
      URL.revokeObjectURL(item.url);
    }

    if (item.id) {
      setDeletedIds((prev) => [...prev, item.id!]);
    }

    setMediaList((prev) => prev.filter((_, i) => i !== index));
  };

  // =========================
  // 🎨 preview
  // =========================
  const renderPreview = (item: MediaItem, index: number) => (
    <div
      key={index}
      className="relative aspect-square border rounded-md overflow-hidden group"
    >
      {item.type === "image" && (
        <Image
          src={item.url}
          fill
          className="object-cover"
          alt="preview"
        />
      )}

      {item.type === "video" && (
        <video
          src={item.url}
          className="w-full h-full object-cover"
          controls
        />
      )}

      {item.type === "audio" && (
        <div className="flex items-center justify-center h-full p-2">
          <audio src={item.url} controls className="w-full" />
        </div>
      )}

      {!disabled && (
        <div className="absolute top-1 right-1">
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="size-7 rounded-full"
            onClick={() => handleRemove(index)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      )}
    </div>
  );

  const hasMedia = mediaList.length > 0;

  return (
    <LabeledControl
      label={label}
      name={name}
      required={required}
      errorMessage={errorMessage}
      optional={optional}
      hiddenIcon={hiddenIcon}
    >
      <div className={cn("rounded-md", className)}>
        {hasMedia ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaList.map(renderPreview)}

            {multiple && (
              <div
                className="aspect-square border rounded-md flex items-center justify-center cursor-pointer hover:bg-muted"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus />
              </div>
            )}
          </div>
        ) : (
          <div
            className="border rounded-md flex items-center justify-center h-32 cursor-pointer hover:bg-muted"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center text-muted-foreground">
              <Plus />
              <span className="text-xs">{placeholder}</span>
            </div>
          </div>
        )}
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        name={name}
        multiple={multiple}
        accept={allowedTypes.map((t) => acceptMap[t]).join(",")}
        className="hidden"
        onChange={handleChange}
      />
    </LabeledControl>
  );
}
