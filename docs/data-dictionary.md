# Data Dictionary

**ระบบปักหมุดแจ้งเหตุฉุกเฉินเรียลไทม์ในมหาวิทยาลัยขอนแก่น**
*(Real-time Emergency Pin-Alert Web Application for Khon Kaen University)*

> จัดทำจาก ER Diagram และ Requirements Specification — ทั้งหมด 14 ตาราง

---

## 1. reporters (ผู้แจ้งเหตุ)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสบัญชีผู้แจ้งเหตุ | 1 |
| email | VARCHAR(100) | Unique, Not Null | อีเมลที่ใช้เข้าสู่ระบบ | "user@kkumail.com" |
| full_name | VARCHAR(100) | Not Null | ชื่อ-นามสกุล | "สมชาย ใจดี" |
| phone | VARCHAR(20) | Not Null | เบอร์โทรศัพท์ | "0812345678" |
| password_hash | VARCHAR(255) | Not Null | รหัสผ่านที่เข้ารหัสแล้ว | "$2a$10$..." |
| is_blocked | BOOLEAN | Default false | สถานะการถูกระงับบัญชี | false |
| created_at | TIMESTAMP | Not Null | วันเวลาที่สร้างบัญชี | "2026-03-12 10:00:00" |
| updated_at | TIMESTAMP | Not Null | วันเวลาที่แก้ไขข้อมูลล่าสุด | "2026-03-12 10:00:00" |

---

## 2. staff (พนักงาน/อาสา)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสพนักงาน/อาสา | 1 |
| email | VARCHAR(100) | Unique, Not Null | อีเมลพนักงาน | "staff@kku.ac.th" |
| full_name | VARCHAR(100) | Not Null | ชื่อ-นามสกุล | "สมศรี พิทักษ์" |
| phone | VARCHAR(20) | Not Null | เบอร์โทรศัพท์ | "0898765432" |
| role | VARCHAR(50) | Not Null | บทบาท (อาสา / เจ้าหน้าที่) | "อาสา" |
| password_hash | VARCHAR(255) | Not Null | รหัสผ่านที่เข้ารหัสแล้ว | "$2a$10$..." |
| is_blocked | BOOLEAN | Default false | สถานะการถูกระงับบัญชี | false |
| created_at | TIMESTAMP | Not Null | วันเวลาที่สร้างบัญชี | "2026-03-12 10:00:00" |
| updated_at | TIMESTAMP | Not Null | วันเวลาที่แก้ไขข้อมูลล่าสุด | "2026-03-12 10:00:00" |

---

## 3. admins (ผู้ดูแลระบบ)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสผู้ดูแลระบบ | 1 |
| email | VARCHAR(100) | Unique, Not Null | อีเมลแอดมิน | "admin@kku.ac.th" |
| full_name | VARCHAR(100) | Not Null | ชื่อ-นามสกุล | "สมศักดิ์ ดูแลดี" |
| password_hash | VARCHAR(255) | Not Null | รหัสผ่านที่เข้ารหัสแล้ว | "$2a$10$..." |
| created_at | TIMESTAMP | Not Null | วันเวลาที่สร้างบัญชี | "2026-03-12 10:00:00" |

---

## 4. teams (ทีมพนักงาน)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสทีม | 1 |
| name | VARCHAR(100) | Not Null | ชื่อทีม | "ทีมกู้ภัย A" |
| status | VARCHAR(50) | Not Null | สถานะทีม (AVAILABLE / ON_MISSION) | "AVAILABLE" |
| created_at | TIMESTAMP | Not Null | วันเวลาที่สร้างทีม | "2026-03-12 10:00:00" |
| updated_at | TIMESTAMP | Not Null | วันเวลาที่แก้ไขทีมล่าสุด | "2026-03-12 10:00:00" |

---

## 5. team_members (สมาชิกในทีม)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสรายการสมาชิกในทีม | 1 |
| team_id | BIGINT | Foreign key → teams(id) | รหัสทีมที่สังกัด | 1 |
| staff_id | BIGINT | Foreign key → staff(id) | รหัสพนักงานที่อยู่ในทีม | 1 |
| joined_at | TIMESTAMP | Not Null | วันเวลาที่เข้าร่วมทีม | "2026-03-12 10:00:00" |
| left_at | TIMESTAMP | Nullable | วันเวลาที่ออกจากทีม (NULL = ยังอยู่) | NULL |

---

## 6. incident_types (ประเภทเหตุฉุกเฉิน)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสประเภทเหตุการณ์ | 1 |
| name | VARCHAR(100) | Not Null | ชื่อประเภทเหตุฉุกเฉิน | "ไฟไหม้" |
| priority_level | INT | Not Null | ลำดับความสำคัญ (1 = สูงสุด) | 1 |
| is_active | BOOLEAN | Default true | เปิดใช้งานให้เลือกแจ้งเหตุหรือไม่ | true |
| created_at | TIMESTAMP | Not Null | วันเวลาที่สร้างข้อมูล | "2026-03-12 10:00:00" |

---

## 7. incidents (รายการแจ้งเหตุ)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสรายการแจ้งเหตุ | 1 |
| reporter_id | BIGINT | Foreign key → reporters(id) | รหัสผู้แจ้งเหตุ | 1 |
| incident_type_id | BIGINT | Foreign key → incident_types(id) | รหัสประเภทเหตุฉุกเฉิน | 1 |
| description | TEXT | Nullable | รายละเอียดเหตุการณ์เพิ่มเติม | "ไฟไหม้ที่ตึกเรียนรวม" |
| contact_phone | VARCHAR(20) | Not Null | เบอร์ติดต่อสำหรับเหตุนี้ | "0812345678" |
| latitude | DECIMAL(10,8) | Not Null | ละติจูดพิกัดที่เกิดเหตุ | 16.43221000 |
| longitude | DECIMAL(11,8) | Not Null | ลองจิจูดพิกัดที่เกิดเหตุ | 102.82361000 |
| status | VARCHAR(50) | Not Null | สถานะรายการแจ้งเหตุ | "REPORTED" |
| max_teams | INT | Default 1 | จำนวนทีมสูงสุดที่ต้องการให้มาช่วย | 1 |
| created_at | TIMESTAMP | Not Null | วันเวลาที่แจ้งเหตุ | "2026-03-12 10:30:00" |
| updated_at | TIMESTAMP | Not Null | วันเวลาที่อัปเดตสถานะล่าสุด | "2026-03-12 10:35:00" |

**ค่าที่เป็นไปได้ของ status:**

| Status | คำอธิบาย |
|:---|:---|
| REPORTED | รายการแจ้งเหตุถูกสร้าง รอทีมรับงาน |
| IN_PROGRESS | มีทีมรับงานแล้ว กำลังดำเนินการ |
| NEED_MORE_TEAMS | ทีมไม่เพียงพอ ร้องขอทีมเพิ่ม |
| COMPLETED | ช่วยเหลือสำเร็จ |
| CANCELLED | ยกเลิกรายการ |

---

## 8. incident_assignments (มอบหมายทีมช่วยเหลือ)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสการมอบหมายงาน | 1 |
| incident_id | BIGINT | Foreign key → incidents(id) | รหัสรายการแจ้งเหตุ | 1 |
| team_id | BIGINT | Foreign key → teams(id) | รหัสทีมที่รับงาน | 1 |
| status | VARCHAR(50) | Not Null | สถานะการรับงาน | "ACCEPTED" |
| assigned_at | TIMESTAMP | Not Null | วันเวลาที่ทีมกดรับงาน | "2026-03-12 10:35:00" |
| completed_at | TIMESTAMP | Nullable | วันเวลาที่ทีมช่วยเสร็จภารกิจ | NULL |

**ค่าที่เป็นไปได้ของ status:**

| Status | คำอธิบาย |
|:---|:---|
| ACCEPTED | ทีมรับงานแล้ว กำลังดำเนินการ |
| COMPLETED | ทีมทำภารกิจเสร็จ |
| CANCELLED | ทีมยกเลิกงาน |

---

## 9. incident_assignment_members (บันทึกผู้เข้าร่วมภารกิจ — Snapshot)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัส snapshot สมาชิกปฏิบัติงาน | 1 |
| assignment_id | BIGINT | Foreign key → incident_assignments(id) | รหัสการมอบหมายงาน | 1 |
| staff_id | BIGINT | Foreign key → staff(id) | รหัสพนักงานที่ไปทำภารกิจ | 1 |
| role_at_time | VARCHAR(50) | Not Null | บทบาทพนักงานในตอนที่รับงาน | "อาสา" |
| recorded_at | TIMESTAMP | Not Null | วันเวลาที่ snapshot สมาชิกเข้างาน | "2026-03-12 10:35:00" |

---

## 10. incident_evidence (หลักฐานแจ้งเหตุ)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสไฟล์หลักฐาน | 1 |
| incident_id | BIGINT | Foreign key → incidents(id) | รหัสรายการแจ้งเหตุ | 1 |
| file_type | VARCHAR(20) | Not Null | ประเภทไฟล์ (IMAGE / VIDEO / AUDIO) | "IMAGE" |
| imagekit_file_id | VARCHAR(100) | Not Null | รหัสอ้างอิงไฟล์ใน ImageKit | "file_1234abc" |
| file_url | VARCHAR(255) | Not Null | ลิงก์ CDN URL รูปภาพหรือวิดีโอ | "https://ik.imagekit.io/..." |
| file_name | VARCHAR(255) | Nullable | ชื่อไฟล์ดั้งเดิม | "photo1.jpg" |
| file_size | BIGINT | Nullable | ขนาดไฟล์ (bytes) | 1024000 |
| created_at | TIMESTAMP | Not Null | วันเวลาที่อัปโหลดหลักฐาน | "2026-03-12 10:30:00" |

---

## 11. chat_messages (ข้อความแชท)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสข้อความ | 1 |
| incident_id | BIGINT | Foreign key → incidents(id) | รหัสรายการแจ้งเหตุ (ห้องแชท) | 1 |
| sender_type | VARCHAR(20) | Not Null | ประเภทผู้ส่ง (REPORTER / STAFF) | "STAFF" |
| sender_id | BIGINT | Not Null | รหัสผู้ส่ง (PK ของ reporters หรือ staff) | 1 |
| message | TEXT | Nullable | เนื้อหาข้อความ (ว่างได้ถ้าส่งแค่ไฟล์) | "กำลังเดินทางไปครับ" |
| sent_at | TIMESTAMP | Not Null | วันเวลาที่ส่งข้อความ | "2026-03-12 10:36:00" |

---

## 12. chat_attachments (ไฟล์แนบในแชท)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสไฟล์แนบ | 1 |
| message_id | BIGINT | Foreign key → chat_messages(id) | รหัสข้อความแชท | 1 |
| file_type | VARCHAR(20) | Not Null | ประเภทไฟล์ (IMAGE / VIDEO / AUDIO) | "IMAGE" |
| imagekit_file_id | VARCHAR(100) | Not Null | รหัสอ้างอิงไฟล์ใน ImageKit | "file_987xyz" |
| file_url | VARCHAR(255) | Not Null | ลิงก์ CDN URL ไฟล์ | "https://ik.imagekit.io/..." |
| file_name | VARCHAR(255) | Nullable | ชื่อไฟล์ดั้งเดิม | "evidence.png" |
| file_size | BIGINT | Nullable | ขนาดไฟล์ (bytes) | 512000 |
| created_at | TIMESTAMP | Not Null | วันเวลาที่อัปโหลดไฟล์ | "2026-03-12 10:36:00" |

---

## 13. block_history (ประวัติการระงับบัญชี)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสประวัติการ Block | 1 |
| target_type | VARCHAR(20) | Not Null | ประเภทผู้ที่ถูกกระทำ (REPORTER / STAFF) | "REPORTER" |
| target_id | BIGINT | Not Null | รหัสบัญชีผู้ที่ถูกกระทำ | 1 |
| admin_id | BIGINT | Foreign key → admins(id) | รหัสแอดมินผู้กระทำ | 1 |
| action | VARCHAR(20) | Not Null | การกระทำ (BLOCK / UNBLOCK) | "BLOCK" |
| reason | TEXT | Not Null | เหตุผลประกอบการกระทำ | "แจ้งเหตุเท็จบ่อยครั้ง" |
| created_at | TIMESTAMP | Not Null | วันเวลาที่กระทำ | "2026-03-13 09:00:00" |

---

## 14. user_reports (การรายงานผู้ใช้งาน)

| Column | Data type | Constraint | Description | Example |
|:---|:---|:---|:---|:---|
| id | BIGINT | Primary key | รหัสการ Report | 1 |
| reporter_type | VARCHAR(20) | Not Null | ประเภทผู้แจ้ง Report (REPORTER / STAFF) | "STAFF" |
| reporter_id | BIGINT | Not Null | รหัสผู้ที่ทำการแจ้ง Report | 1 |
| reported_type | VARCHAR(20) | Not Null | ประเภทผู้ถูก Report (REPORTER / STAFF) | "REPORTER" |
| reported_id | BIGINT | Not Null | รหัสผู้ที่ถูก Report | 1 |
| incident_id | BIGINT | Foreign key → incidents(id), Nullable | รหัสเหตุการณ์ที่เกี่ยวข้อง (ถ้ามี) | 1 |
| reason | TEXT | Not Null | สาเหตุการ Report | "พฤติกรรมไม่เหมาะสม" |
| status | VARCHAR(50) | Not Null | สถานะการตรวจสอบ | "PENDING" |
| admin_note | TEXT | Nullable | บันทึกของแอดมินหลังตรวจข้อมูล | NULL |
| reviewed_by | BIGINT | Foreign key → admins(id), Nullable | รหัสแอดมินที่ตรวจ Report | NULL |
| created_at | TIMESTAMP | Not Null | วันเวลาที่สร้าง Report | "2026-03-13 10:00:00" |
| reviewed_at | TIMESTAMP | Nullable | วันเวลาที่แอดมินตรวจ Report | NULL |

**ค่าที่เป็นไปได้ของ status:**

| Status | คำอธิบาย |
|:---|:---|
| PENDING | รอผู้ดูแลระบบตรวจสอบ |
| REVIEWED | ผู้ดูแลระบบตรวจสอบแล้ว (อาจนำไปสู่การ Block) |
| DISMISSED | ผู้ดูแลระบบปัดตก |

---

*เอกสารนี้จัดทำจาก ER Diagram และ Requirements Specification ของโปรเจค ณ วันที่ 26 มีนาคม 2569*
