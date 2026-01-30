# Scripts

## Chạy file SQL tạo bảng và dữ liệu mẫu

1. **Tạo database** (nếu chưa có):
   ```sql
   CREATE DATABASE IF NOT EXISTS ten_database_cua_ban CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE ten_database_cua_ban;
   ```

2. **Chạy file init-and-seed.sql** bằng một trong các cách:

   **Cách 1 – Từ terminal:**
   ```bash
   mysql -u USER -p TEN_DATABASE < backend/scripts/init-and-seed.sql
   ```

   **Cách 2 – Trong MySQL client (mysql, MySQL Workbench, DBeaver…):**
   - Mở file `init-and-seed.sql`
   - Chọn đúng database (USE ten_database;)
   - Chạy toàn bộ nội dung file

   **Cách 3 – Từ thư mục backend:**
   ```bash
   cd backend
   mysql -u USER -p TEN_DATABASE < scripts/init-and-seed.sql
   ```

Sau khi chạy xong, kiểm tra: `SELECT * FROM users;` — sẽ có 8 bản ghi mẫu.
