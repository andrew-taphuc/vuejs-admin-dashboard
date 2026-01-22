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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (
  last_name,
  first_name,
  dob,
  phone,
  employee_code,
  email,
  gender,
  job_title
) VALUES (
  'Nguyễn',
  'An',
  '2000-05-12',
  '0901234567',
  'EMP001',
  'an.nguyen@example.com',
  'male',
  'Backend Developer'
);
