-- ============================================================
-- File: init-and-seed.sql
-- Mục đích: Tạo bảng users và thêm dữ liệu mẫu cho MySQL
-- Cách chạy: mysql -u USER -p DATABASE_NAME < backend/scripts/init-and-seed.sql
-- Hoặc mở MySQL client, chọn database, rồi source file này
-- ============================================================

-- Xóa bảng cũ nếu tồn tại (cẩn thận: sẽ mất dữ liệu hiện có)
DROP TABLE IF EXISTS users;

-- Tạo bảng users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  dob DATE,
  phone VARCHAR(20),
  employee_code VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  gender ENUM('male', 'female', 'other') NOT NULL,
  job_title VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_employee_code (employee_code),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Dữ liệu mẫu
-- ============================================================
INSERT INTO users (
  last_name,
  first_name,
  dob,
  phone,
  employee_code,
  email,
  gender,
  job_title
) VALUES
  ('Nguyễn', 'An', '2000-05-12', '0901234567', 'EMP001', 'an.nguyen@example.com', 'male', 'Backend Developer'),
  ('Trần', 'Bình', '1998-08-23', '0912345678', 'EMP002', 'binh.tran@example.com', 'male', 'Frontend Developer'),
  ('Lê', 'Chi', '1995-03-15', '0923456789', 'EMP003', 'chi.le@example.com', 'female', 'UX Designer'),
  ('Phạm', 'Dũng', '1992-11-30', '0934567890', 'EMP004', 'dung.pham@example.com', 'male', 'DevOps Engineer'),
  ('Hoàng', 'Hương', '1999-07-08', '0945678901', 'EMP005', 'huong.hoang@example.com', 'female', 'QA Engineer'),
  ('Phan', 'Khoa', '1996-01-20', '0956789012', 'EMP006', 'khoa.phan@example.com', 'male', 'Full Stack Developer'),
  ('Vũ', 'Linh', '2001-09-14', '0967890123', 'EMP007', 'linh.vu@example.com', 'female', 'Data Analyst'),
  ('Đặng', 'Minh', '1994-04-25', '0978901234', 'EMP008', 'minh.dang@example.com', 'male', 'Project Manager');

-- Kiểm tra sau khi chạy: SELECT * FROM users;
