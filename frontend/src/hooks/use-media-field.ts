import { useCallback, useState } from "react";
import { MediaField } from "@/components/shared/field/media-field";

export function useMediaUploadField() {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [deletedMediaIds, setDeletedMediaIds] = useState<string[]>([]);

  const handleMediaChange = useCallback(
    (files: File[], deletedIds: string[] = []) => {
      setMediaFiles(files);
      setDeletedMediaIds(deletedIds);
    },
    [],
  );

  const reset = () => {
    setMediaFiles([]);
    setDeletedMediaIds([]);
  };

  return {
    mediaFiles,
    deletedMediaIds,
    MediaField,
    handleMediaChange,
    reset,
  };
}
