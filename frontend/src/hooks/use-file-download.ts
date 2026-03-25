import { useRef } from "react";
import saveAs from "file-saver";
import html2canvas from "html2canvas-pro";
import { PDFDocument } from "pdf-lib";
import { useTheme } from "next-themes";

interface UseDownloadOption<T> {
  downloadTargetRef?: React.RefObject<T | null>;
}

export function useFileDownload<T extends HTMLElement = HTMLDivElement>(
  options: UseDownloadOption<T> = {}
) {
  const { downloadTargetRef } = options;
  const contentRef = useRef<T>(null);
  const { theme, setTheme } = useTheme();

  const downloadHtmlToPDF = async ({
    fileName = `Download-${new Date().toString()}`,
    style = "vertical",
    configStyle,
  }: {
    fileName?: string;
    style?:
      | "vertical" // แนวนอน
      | "horizontal"; // แนวตั้ง
    configStyle?: {
      width: number;
      height: number;
    };
  } = {}) => {
    const input = downloadTargetRef
      ? downloadTargetRef.current
      : contentRef.current;
    if (!input) return;

    const originalTheme = theme ?? "light";

    // เปลี่ยนธีมเป็น light ถ้าตอนนี้เป็น dark
    if (originalTheme === "dark") {
      setTheme("light");

      // รอจน DOM เปลี่ยนจริง (ใช้ polling รอ)
      await new Promise((resolve) => {
        const check = () => {
          const current = document.documentElement.classList.contains(
            "dark"
          )
            ? "dark"
            : "light";
          if (current === "light") {
            resolve(true);
          } else {
            setTimeout(check, 100);
          }
        };
        setTimeout(check, 100);
      });
    }

    // Use html2canvas to capture the component
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg"); // Adjust quality (0 to 1, where 1 is the best quality)

    // Create a new PDFDocument with A4 dimensions and landscape orientation
    const pdfDoc = await PDFDocument.create();

    const landscape = configStyle
      ? [configStyle.width, configStyle.height]
      : [841.89, 595.28];
    const pageWidth = style === "vertical" ? landscape[0] : landscape[1]; // A4 width in points for landscape (11.69 inches * 72 points)
    const pageHeight = style === "vertical" ? landscape[1] : landscape[0]; // A4 height in points for landscape (8.27 inches * 72 points)
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate aspect ratio of the canvas
    const aspectRatio = canvas.width / canvas.height;

    // Calculate dimensions to fit the image on the page
    let imgWidth = pageWidth;
    let imgHeight = pageWidth / aspectRatio;

    if (imgHeight > pageHeight) {
      imgHeight = pageHeight;
      imgWidth = pageHeight * aspectRatio;
    }

    // Calculate position to align the image to the top of the page
    const xPos = (pageWidth - imgWidth) / 2; // Center horizontally
    const yPos = pageHeight - imgHeight; // Align to top by setting yPos to pageHeight - imgHeight

    // Embed the JPEG image
    const jpgImage = await pdfDoc.embedJpg(imgData);

    // Draw the image onto the page
    page.drawImage(jpgImage, {
      x: xPos,
      y: style === "vertical" ? yPos : pageHeight - imgHeight,
      width: imgWidth,
      height: imgHeight,
    });

    // Serialize the PDFDocument to bytes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBytes = (await pdfDoc.save()) as any;

    // Create a blob from the PDFBytes and use FileSaver to save the file
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, fileName);

    // เปลี่ยนกลับหลังโหลด
    if (originalTheme === "dark") {
      setTheme("dark");
    }
  };

  return {
    downloadTargetRef: contentRef,
    downloadHtmlToPDF,
    // downloadHtmlToPDF2,
  };
}
