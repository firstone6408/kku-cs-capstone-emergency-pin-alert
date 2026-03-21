"use client";

import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/types/components/button";
import { Loader2, Download } from "lucide-react";
import { useState } from "react";

interface DownloadButtonProps extends ButtonProps {
  fileUrl: string;
  fileName?: string;
}

export function DownloadButton({
  fileUrl,
  fileName = "download",
  children,
  ...props
}: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("ไม่สามารถดาวน์โหลดไฟล์ได้");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button {...props} disabled={isLoading} onClick={handleDownload}>
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>กำลังโหลด...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          <span>{children}</span>
        </>
      )}
    </Button>
  );
}
