# Use Case Diagram

**ระบบปักหมุดแจ้งเหตุฉุกเฉินเรียลไทม์ในมหาวิทยาลัยขอนแก่น**
*(Real-time Emergency Pin-Alert Web Application for Khon Kaen University)*

---

## 1. Use Case Diagram (ภาพรวมทั้งระบบ)

```plantuml
@startuml Use Case Diagram - Emergency Pin-Alert System

left to right direction
skinparam actorStyle awesome
skinparam packageStyle rectangle
skinparam usecase {
    BackgroundColor<<auth>> #E8F5E9
    BorderColor<<auth>> #4CAF50
    BackgroundColor<<incident>> #E3F2FD
    BorderColor<<incident>> #2196F3
    BackgroundColor<<team>> #FFF3E0
    BorderColor<<team>> #FF9800
    BackgroundColor<<chat>> #F3E5F5
    BorderColor<<chat>> #9C27B0
    BackgroundColor<<report>> #FCE4EC
    BorderColor<<report>> #E91E63
    BackgroundColor<<admin>> #FFEBEE
    BorderColor<<admin>> #F44336
}

actor "ผู้แจ้งเหตุ\n(Reporter)" as Reporter
actor "พนักงาน/อาสา\n(Staff)" as Staff
actor "ผู้ดูแลระบบ\n(Admin)" as Admin

rectangle "ระบบปักหมุดแจ้งเหตุฉุกเฉิน มข." {

    ' ==================== Authentication ====================
    package "การจัดการบัญชี" {
        usecase "UC-01: สมัครสมาชิก\n(Register)" as UC1 <<auth>>
        usecase "UC-02: เข้าสู่ระบบ\n(Login)" as UC2 <<auth>>
        usecase "UC-03: จัดการข้อมูลส่วนตัว\n(Manage Profile)" as UC3 <<auth>>
    }

    ' ==================== Incident Management ====================
    package "การแจ้งเหตุฉุกเฉิน" {
        usecase "UC-04: ปักหมุดแจ้งเหตุฉุกเฉิน\n(Create Incident Report)" as UC4 <<incident>>
        usecase "UC-05: ระบุตำแหน่งอัตโนมัติ\n(Auto GPS Location)" as UC5 <<incident>>
        usecase "UC-06: แนบหลักฐาน\n(Upload Evidence)" as UC6 <<incident>>
        usecase "UC-07: ติดตามสถานะแจ้งเหตุ\n(Track Incident Status)" as UC7 <<incident>>
    }

    ' ==================== Team & Mission ====================
    package "การจัดการทีมและภารกิจ" {
        usecase "UC-08: ดูรายการแจ้งเหตุ\n(View Incident List)" as UC8 <<team>>
        usecase "UC-09: จัดการทีม\n(Team Management)" as UC9 <<team>>
        usecase "UC-10: รับงานแจ้งเหตุ\n(Accept Incident)" as UC10 <<team>>
        usecase "UC-11: ขอทีมสนับสนุน\n(Request Backup)" as UC11 <<team>>
        usecase "UC-12: นำทางไปจุดเกิดเหตุ\n(Navigate to Incident)" as UC12 <<team>>
        usecase "UC-13: สิ้นสุดภารกิจ\n(Complete Mission)" as UC13 <<team>>
    }

    ' ==================== Communication ====================
    package "การสื่อสาร" {
        usecase "UC-14: แชทในห้องเหตุการณ์\n(Chat in Incident Room)" as UC14 <<chat>>
    }

    ' ==================== User Report ====================
    package "การรายงานปัญหา" {
        usecase "UC-15: รายงานพฤติกรรม\n(Report User)" as UC15 <<report>>
    }

    ' ==================== System Administration ====================
    package "การจัดการระบบ" {
        usecase "UC-16: จัดการประเภทเหตุฉุกเฉิน\n(Manage Incident Types)" as UC16 <<admin>>
        usecase "UC-17: จัดการผู้ใช้ Block/Unblock\n(Manage Users)" as UC17 <<admin>>
        usecase "UC-18: ตรวจสอบรายงานปัญหา\n(Review User Reports)" as UC18 <<admin>>
    }
}

' ==================== Reporter Associations ====================
Reporter --> UC1
Reporter --> UC2
Reporter --> UC3
Reporter --> UC4
Reporter --> UC7
Reporter --> UC14
Reporter --> UC15

' ==================== Staff Associations ====================
Staff --> UC2
Staff --> UC3
Staff --> UC8
Staff --> UC9
Staff --> UC10
Staff --> UC14
Staff --> UC15

' ==================== Admin Associations ====================
Admin --> UC2
Admin --> UC16
Admin --> UC17
Admin --> UC18

' ==================== Include Relationships ====================
UC4 ..> UC5 : <<include>>
UC10 ..> UC12 : <<include>>
UC10 ..> UC13 : <<include>>

' ==================== Extend Relationships ====================
UC6 ..> UC4 : <<extend>>
UC11 ..> UC10 : <<extend>>
UC17 ..> UC18 : <<extend>>

@enduml
```

---

## 2. Use Case Diagram แยกตาม Actor

### 2.1 ผู้แจ้งเหตุ (Reporter)

```plantuml
@startuml Reporter Use Cases

left to right direction
skinparam actorStyle awesome

actor "ผู้แจ้งเหตุ\n(Reporter)" as Reporter

rectangle "ระบบปักหมุดแจ้งเหตุฉุกเฉิน" {
    usecase "UC-01: สมัครสมาชิก" as UC1
    usecase "UC-02: เข้าสู่ระบบ" as UC2
    usecase "UC-03: จัดการข้อมูลส่วนตัว" as UC3
    usecase "UC-04: ปักหมุดแจ้งเหตุฉุกเฉิน" as UC4
    usecase "UC-05: ระบุตำแหน่งอัตโนมัติ" as UC5
    usecase "UC-06: แนบหลักฐาน" as UC6
    usecase "UC-07: ติดตามสถานะแจ้งเหตุ" as UC7
    usecase "UC-14: แชทในห้องเหตุการณ์" as UC14
    usecase "UC-15: รายงานพฤติกรรมพนักงาน" as UC15
}

Reporter --> UC1
Reporter --> UC2
Reporter --> UC3
Reporter --> UC4
Reporter --> UC7
Reporter --> UC14
Reporter --> UC15

UC4 ..> UC5 : <<include>>
UC6 ..> UC4 : <<extend>>

@enduml
```

### 2.2 พนักงาน/อาสา (Staff/Volunteer)

```plantuml
@startuml Staff Use Cases

left to right direction
skinparam actorStyle awesome

actor "พนักงาน/อาสา\n(Staff)" as Staff

rectangle "ระบบปักหมุดแจ้งเหตุฉุกเฉิน" {
    usecase "UC-02: เข้าสู่ระบบ" as UC2
    usecase "UC-03: จัดการข้อมูลส่วนตัว" as UC3
    usecase "UC-08: ดูรายการแจ้งเหตุ" as UC8
    usecase "UC-09: จัดการทีม" as UC9
    usecase "UC-10: รับงานแจ้งเหตุ" as UC10
    usecase "UC-11: ขอทีมสนับสนุน" as UC11
    usecase "UC-12: นำทางไปจุดเกิดเหตุ" as UC12
    usecase "UC-13: สิ้นสุดภารกิจ" as UC13
    usecase "UC-14: แชทในห้องเหตุการณ์" as UC14
    usecase "UC-15: รายงานพฤติกรรมผู้ใช้" as UC15
}

Staff --> UC2
Staff --> UC3
Staff --> UC8
Staff --> UC9
Staff --> UC10
Staff --> UC14
Staff --> UC15

UC10 ..> UC12 : <<include>>
UC10 ..> UC13 : <<include>>
UC11 ..> UC10 : <<extend>>

@enduml
```

### 2.3 ผู้ดูแลระบบ (Admin)

```plantuml
@startuml Admin Use Cases

left to right direction
skinparam actorStyle awesome

actor "ผู้ดูแลระบบ\n(Admin)" as Admin

rectangle "ระบบปักหมุดแจ้งเหตุฉุกเฉิน" {
    usecase "UC-02: เข้าสู่ระบบ" as UC2
    usecase "UC-16: จัดการประเภทเหตุฉุกเฉิน" as UC16
    usecase "UC-17: จัดการผู้ใช้ Block/Unblock" as UC17
    usecase "UC-18: ตรวจสอบรายงานปัญหา" as UC18
}

Admin --> UC2
Admin --> UC16
Admin --> UC17
Admin --> UC18

UC17 ..> UC18 : <<extend>>

@enduml
```

---

## 3. Use Case Description (รายละเอียด)

### 3.1 การจัดการบัญชี (Authentication)

| ID | Use Case | Actor(s) | คำอธิบาย | Pre-condition | Post-condition |
|:---|:---------|:---------|:---------|:-------------|:--------------|
| UC-01 | สมัครสมาชิก (Register) | Reporter | ผู้ใช้สร้างบัญชีใหม่โดยกรอก Email, ชื่อ-สกุล, เบอร์โทร, รหัสผ่าน | ยังไม่มีบัญชีในระบบ | มีบัญชีในระบบ, ได้รับ JWT Token |
| UC-02 | เข้าสู่ระบบ (Login) | Reporter, Staff, Admin | ผู้ใช้กรอก Email และ Password เพื่อเข้าสู่ระบบ | มีบัญชีอยู่ในระบบ, ไม่ถูก Block | ได้รับ JWT Token, เข้าหน้าหลักตาม Role |
| UC-03 | จัดการข้อมูลส่วนตัว (Manage Profile) | Reporter, Staff | แก้ไขข้อมูลส่วนตัว เช่น ชื่อ, เบอร์โทร, รหัสผ่าน | เข้าสู่ระบบแล้ว | ข้อมูลถูกอัปเดตในระบบ |

### 3.2 การแจ้งเหตุฉุกเฉิน (Incident Management)

| ID | Use Case | Actor(s) | คำอธิบาย | Pre-condition | Post-condition |
|:---|:---------|:---------|:---------|:-------------|:--------------|
| UC-04 | ปักหมุดแจ้งเหตุฉุกเฉิน (Create Incident Report) | Reporter | เลือกประเภทเหตุการณ์จาก dropdown, กรอกรายละเอียด (optional), กรอกเบอร์ติดต่อ ระบบจะปักหมุดตำแหน่ง GPS อัตโนมัติ | เข้าสู่ระบบแล้ว | รายการแจ้งเหตุถูกสร้าง สถานะ = REPORTED |
| UC-05 | ระบุตำแหน่งอัตโนมัติ (Auto GPS Location) | Reporter | ระบบดึงพิกัด GPS (Latitude, Longitude) ของผู้แจ้ง ณ จุดเกิดเหตุ โดยอัตโนมัติ | Browser อนุญาต Geolocation | ได้พิกัดที่แม่นยำภายใน 3 วินาที |
| UC-06 | แนบหลักฐาน (Upload Evidence) | Reporter | อัปโหลดรูปภาพ, วิดีโอ, หรือคลิปเสียงประกอบการแจ้งเหตุ | กำลังสร้างรายการแจ้งเหตุ | ไฟล์ถูกอัปโหลดขึ้น ImageKit CDN |
| UC-07 | ติดตามสถานะแจ้งเหตุ (Track Incident Status) | Reporter | ดูและติดตามสถานะแจ้งเหตุแบบเรียลไทม์ (REPORTED → IN_PROGRESS → COMPLETED) | มีรายการแจ้งเหตุ | เห็นสถานะล่าสุดของรายการ |

### 3.3 การจัดการทีมและภารกิจ (Team & Mission)

| ID | Use Case | Actor(s) | คำอธิบาย | Pre-condition | Post-condition |
|:---|:---------|:---------|:---------|:-------------|:--------------|
| UC-08 | ดูรายการแจ้งเหตุ (View Incident List) | Staff | แสดงรายการแจ้งเหตุทั้งหมด เรียงตามระดับความสำคัญ (priority_level) จากสูงไปต่ำ | เข้าสู่ระบบแล้ว (Staff) | เห็นรายการแจ้งเหตุเรียงตามความสำคัญ |
| UC-09 | จัดการทีม (Team Management) | Staff | สร้างทีม, สังกัดทีม, ย้ายทีม, ออกจากทีม | เข้าสู่ระบบแล้ว (Staff) | สมาชิกทีมถูกอัปเดต |
| UC-10 | รับงานแจ้งเหตุ (Accept Incident) | Staff | ทีมกดรับงาน ระบบเปลี่ยนสถานะทีมเป็น ON_MISSION และแจ้งเตือนผู้แจ้งเหตุ | ทีมสถานะ AVAILABLE, รายการสถานะ REPORTED หรือ NEED_MORE_TEAMS | สถานะทีม = ON_MISSION, สถานะรายการ = IN_PROGRESS |
| UC-11 | ขอทีมสนับสนุน (Request Backup) | Staff | กรณีทีมไม่เพียงพอ กดร้องขอทีมเพิ่ม ระบบจะเปิดให้ทีมอื่นเข้ามาช่วย | ทีมกำลังทำภารกิจอยู่ | สถานะรายการ = NEED_MORE_TEAMS, max_teams เพิ่มขึ้น |
| UC-12 | นำทางไปจุดเกิดเหตุ (Navigate to Incident) | Staff | แสดงพิกัดจุดเกิดเหตุบนแผนที่ พร้อมเชื่อมโยงระบบนำทาง | รับงานแล้ว | แสดงเส้นทางไปจุดเกิดเหตุ |
| UC-13 | สิ้นสุดภารกิจ (Complete Mission) | Staff | กดปุ่มเสร็จสิ้นภารกิจ ระบบเปลี่ยนสถานะทีมกลับเป็น AVAILABLE | ทีมสถานะ ON_MISSION | สถานะทีม = AVAILABLE, สถานะรายการ = COMPLETED |

### 3.4 การสื่อสาร (Communication)

| ID | Use Case | Actor(s) | คำอธิบาย | Pre-condition | Post-condition |
|:---|:---------|:---------|:---------|:-------------|:--------------|
| UC-14 | แชทในห้องเหตุการณ์ (Chat in Incident Room) | Reporter, Staff | สนทนาและส่งไฟล์ภาพภายในห้องแชทเฉพาะเหตุการณ์ (1 รายการ = 1 ห้องแชท) ทุก Staff ในทีมที่รับงาน + ผู้แจ้งเหตุสามารถส่งข้อความได้ | มีรายการแจ้งเหตุที่มีทีมรับงานแล้ว | ข้อความ/ไฟล์ถูกส่งและแสดงแบบเรียลไทม์ |

### 3.5 การรายงานปัญหา (User Report)

| ID | Use Case | Actor(s) | คำอธิบาย | Pre-condition | Post-condition |
|:---|:---------|:---------|:---------|:-------------|:--------------|
| UC-15 | รายงานพฤติกรรม (Report User) | Reporter, Staff | รายงานพฤติกรรมที่ไม่เหมาะสมของผู้ใช้อื่น เช่น แจ้งเหตุเท็จ, พฤติกรรมไม่เหมาะสม | เข้าสู่ระบบแล้ว | รายงานถูกสร้าง สถานะ = PENDING |

### 3.6 การจัดการระบบ (System Administration)

| ID | Use Case | Actor(s) | คำอธิบาย | Pre-condition | Post-condition |
|:---|:---------|:---------|:---------|:-------------|:--------------|
| UC-16 | จัดการประเภทเหตุฉุกเฉิน (Manage Incident Types) | Admin | เพิ่ม, ลบ, แก้ไขประเภทเหตุฉุกเฉิน กำหนดชื่อ, ระดับความสำคัญ, เปิด/ปิดใช้งาน | เข้าสู่ระบบแล้ว (Admin) | ประเภทเหตุฉุกเฉินถูกอัปเดตในระบบ |
| UC-17 | จัดการผู้ใช้ Block/Unblock (Manage Users) | Admin | ระงับหรือยกเลิกการระงับบัญชี Reporter หรือ Staff พร้อมระบุเหตุผล | เข้าสู่ระบบแล้ว (Admin), มีบัญชีเป้าหมาย | สถานะ is_blocked ถูกเปลี่ยน, บันทึกลง block_history |
| UC-18 | ตรวจสอบรายงานปัญหา (Review User Reports) | Admin | ดูรายการ Report ตรวจสอบ และอัปเดตสถานะ (REVIEWED / DISMISSED) พร้อมเขียนบันทึก | มี Report สถานะ PENDING | สถานะ Report ถูกอัปเดต, อาจนำไปสู่การ Block |

---

## 4. Relationships Summary

### 4.1 Include Relationships (<<include>>)

| Base Use Case | Included Use Case | คำอธิบาย |
|:-------------|:-----------------|:---------|
| UC-04 ปักหมุดแจ้งเหตุ | UC-05 ระบุตำแหน่งอัตโนมัติ | ทุกครั้งที่แจ้งเหตุ ต้องดึง GPS เสมอ |
| UC-10 รับงานแจ้งเหตุ | UC-12 นำทางไปจุดเกิดเหตุ | เมื่อรับงานแล้ว ระบบจะแสดงเส้นทางทันที |
| UC-10 รับงานแจ้งเหตุ | UC-13 สิ้นสุดภารกิจ | เมื่อรับงานแล้ว ต้องสิ้นสุดภารกิจเมื่อเสร็จ |

### 4.2 Extend Relationships (<<extend>>)

| Base Use Case | Extended Use Case | เงื่อนไข |
|:-------------|:-----------------|:---------|
| UC-04 ปักหมุดแจ้งเหตุ | UC-06 แนบหลักฐาน | ผู้ใช้เลือกแนบหลักฐานเพิ่มเติม (optional) |
| UC-10 รับงานแจ้งเหตุ | UC-11 ขอทีมสนับสนุน | ทีมไม่เพียงพอ ต้องการคนเพิ่ม |
| UC-18 ตรวจสอบ Report | UC-17 จัดการ Block/Unblock | Admin ตรวจแล้วเห็นว่าต้อง Block ผู้ใช้ |

---

## 5. Incident Status Flow

```plantuml
@startuml Incident Status Flow

[*] --> REPORTED : ผู้แจ้งเหตุปักหมุด
REPORTED --> IN_PROGRESS : ทีมกดรับงาน (UC-10)
IN_PROGRESS --> NEED_MORE_TEAMS : ทีมกดขอคนเพิ่ม (UC-11)
NEED_MORE_TEAMS --> IN_PROGRESS : ทีมเพิ่มเข้ามาช่วย
IN_PROGRESS --> COMPLETED : ทีมกดสิ้นสุดภารกิจ (UC-13)
REPORTED --> CANCELLED : ผู้แจ้งเหตุยกเลิก
IN_PROGRESS --> CANCELLED : ทีมยกเลิก
COMPLETED --> [*]
CANCELLED --> [*]

REPORTED : สถานะเริ่มต้น
REPORTED : รอทีมรับงาน
IN_PROGRESS : มีทีมรับงานแล้ว
IN_PROGRESS : กำลังดำเนินการ
NEED_MORE_TEAMS : ต้องการทีมเพิ่ม
NEED_MORE_TEAMS : เปิดให้ทีมอื่นเข้ามาช่วย
COMPLETED : ช่วยเหลือสำเร็จ
CANCELLED : ยกเลิกรายการ

@enduml
```

---

*เอกสารนี้จัดทำจาก Requirements Specification ของโปรเจค ณ วันที่ 26 มีนาคม 2569*
