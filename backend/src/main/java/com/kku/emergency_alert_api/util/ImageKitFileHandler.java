package com.kku.emergency_alert_api.util;

import java.io.IOException;
import java.util.Base64;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.kku.emergency_alert_api.constant.FileTypeEnum;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;

/**
 * ImageKitFileHandler — upload / delete ไฟล์บน ImageKit CDN
 *
 * รองรับ IMAGE, VIDEO, AUDIO (ไม่ resize — ส่งต้นฉบับขึ้น CDN)
 *
 * ใช้ ImageKit Java SDK ที่ config ไว้ใน ImageKitConfig
 */
@Component
public class ImageKitFileHandler {

    /**
     * ข้อมูลที่ได้หลัง upload สำเร็จ
     */
    public record UploadResult(
            String fileId,
            String fileUrl,
            String fileName,
            long fileSize,
            FileTypeEnum fileType) {
    }

    /**
     * Upload ไฟล์ไป ImageKit
     *
     * @param file   ไฟล์จาก client
     * @param folder folder บน ImageKit (เช่น "incidents/evidence")
     * @return ข้อมูลไฟล์ที่ upload แล้ว
     */
    public UploadResult uploadFile(MultipartFile file, String folder) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Invalid file provided");
        }

        try {
            // แปลงไฟล์เป็น base64
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());

            // สร้าง request
            FileCreateRequest request = new FileCreateRequest(base64, file.getOriginalFilename());
            request.setFolder(folder);

            // upload
            Result result = ImageKit.getInstance().upload(request);

            // กำหนดประเภทไฟล์จาก content type
            FileTypeEnum fileType = detectFileType(file.getContentType());

            return new UploadResult(
                    result.getFileId(),
                    result.getUrl(),
                    result.getName(),
                    file.getSize(),
                    fileType);

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to ImageKit", e);
        } catch (Exception e) {
            throw new RuntimeException("ImageKit upload error: " + e.getMessage(), e);
        }
    }

    /**
     * ลบไฟล์จาก ImageKit
     *
     * @param fileId ImageKit file ID
     */
    public void deleteFile(String fileId) {
        if (fileId == null || fileId.isBlank()) {
            return;
        }

        try {
            ImageKit.getInstance().deleteFile(fileId);
        } catch (Exception e) {
            // log warning แต่ไม่ throw — ไม่ให้ error จากการลบไฟล์ทำให้ request fail
            System.err.println("Failed to delete file from ImageKit: " + e.getMessage());
        }
    }

    /**
     * ตรวจประเภทไฟล์จาก content type
     */
    private FileTypeEnum detectFileType(String contentType) {
        if (contentType == null) {
            return FileTypeEnum.IMAGE; // default
        }

        if (contentType.startsWith("image/")) {
            return FileTypeEnum.IMAGE;
        } else if (contentType.startsWith("video/")) {
            return FileTypeEnum.VIDEO;
        } else if (contentType.startsWith("audio/")) {
            return FileTypeEnum.AUDIO;
        }

        return FileTypeEnum.IMAGE; // fallback
    }
}
