# 1. เลือก Base Image
FROM eclipse-temurin:21-jdk

# 2. ตั้งค่า Working directory ภายใน Image
WORKDIR /app

# 3. คัดลอกไฟล์ที่จำเป็นเข้า Image
COPY target/emergency-alert-api-0.0.1-SNAPSHOT.jar app.jar

# 4. รับคำสั่งเพื่อติดตั้ง Dependencies ภายใน Image
# RUN ...

# 5. คัดลอกโค้ดทั้งหมดของโปรเจคเข้าไปใน Image (ไม่จำเป็น เพราะมี .jar อยู่แล้ว)
# COPY . .

# 6. Port
EXPOSE 8080

# 7. คำสั่งที่จะ run container เมื่อเริ่มทำงาน
CMD ["java", "-jar", "app.jar"]

