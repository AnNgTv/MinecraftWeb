# Minecraft Web Recharge System

Hệ thống nạp thẻ Minecraft tích hợp Website và tự động thực thi lệnh qua MySQL Bridge.

## Thành phần hệ thống:
1. **MinecraftWeb:** Giao diện người dùng (HTML/JS/CSS).
2. **Recharge-Backend:** Server xử lý callback từ thẻ siêu tốc và ghi lệnh vào MySQL.
3. **DatabaseMySQL Plugin:** Plugin Minecraft (1.12.2+) đọc lệnh từ MySQL và thực thi trong game.

## Tải về Plugin:
Bạn có thể tải bản build sẵn của Plugin tại đây:
[Download DatabaseMySQL.jar](https://github.com/Dev-Minecraft/MinecraftWeb/releases/download/v1.0/DatabaseMySQL.jar)

## Cấu hình:
- Cập nhật thông tin MySQL trong `recharge-backend/.env`
- Cập nhật thông tin MySQL trong `plugins/DatabaseMySQL/config.yml` trên Server Minecraft.
- Tạo bảng SQL `pending_commands` trong database của bạn.

---
© 2026 Dev-Minecraft
