# Giải Thích File docker-compose.yml

## Docker và Docker Compose là gì?

### Docker
Docker là một công cụ cho phép bạn đóng gói ứng dụng và các phụ thuộc của nó vào một "container". Container giống như một máy ảo nhẹ, chạy độc lập và có thể chạy ở bất kỳ đâu có Docker.

### Docker Compose
Docker Compose là công cụ giúp bạn định nghĩa và chạy nhiều container Docker cùng lúc thông qua một file cấu hình duy nhất (docker-compose.yml). Thay vì phải chạy từng lệnh docker riêng lẻ, bạn chỉ cần một lệnh để khởi động tất cả các service.

---

## Phân Tích File docker-compose.yml

Hãy cùng xem từng phần của file:

### 1. Version (Dòng 1)
```yaml
version: "3.9"
```
- **Mục đích**: Chỉ định phiên bản của Docker Compose file format
- **Giải thích**: "3.9" là một trong những phiên bản phổ biến và ổn định. Phiên bản này quyết định các tính năng và cú pháp bạn có thể sử dụng.

### 2. Services (Dòng 3-26)
```yaml
services:
```
- **Mục đích**: Định nghĩa các container/services mà bạn muốn chạy
- **Giải thích**: Mỗi service là một container riêng biệt. Trong file này có 2 services: `db` (database) và `adminer` (công cụ quản lý database).

---

## Service 1: Database (MySQL)

```yaml
db:
  image: mysql:8.0
  container_name: myapp-mysql
  restart: always
  environment:
    MYSQL_ROOT_PASSWORD: rootpassword
    MYSQL_DATABASE: myapp
    MYSQL_USER: myuser
    MYSQL_PASSWORD: mypassword
  ports:
    - "3306:3306"
  volumes:
    - db-data:/var/lib/mysql
  command: --default-authentication-plugin=mysql_native_password
```

### Giải thích từng thuộc tính:

#### `image: mysql:8.0`
- **Mục đích**: Chỉ định image Docker nào sẽ được sử dụng
- **Giải thích**: 
  - `mysql` là tên image (có sẵn trên Docker Hub)
  - `8.0` là phiên bản/tag của MySQL
  - Docker sẽ tự động tải image này nếu chưa có trên máy

#### `container_name: myapp-mysql`
- **Mục đích**: Đặt tên cho container
- **Giải thích**: Thay vì tên ngẫu nhiên, container sẽ có tên cố định là "myapp-mysql". Giúp dễ dàng quản lý và tham chiếu đến container này.

#### `restart: always`
- **Mục đích**: Chính sách khởi động lại container
- **Giải thích**: 
  - `always`: Container sẽ tự động khởi động lại nếu bị dừng (kể cả khi máy tính khởi động lại)
  - Các giá trị khác: `no` (không tự động), `on-failure` (chỉ khi lỗi), `unless-stopped` (trừ khi bị dừng thủ công)

#### `environment:`
- **Mục đích**: Định nghĩa các biến môi trường cho container
- **Giải thích**: MySQL image sử dụng các biến môi trường này để cấu hình:
  - `MYSQL_ROOT_PASSWORD`: Mật khẩu cho user root (quản trị viên)
  - `MYSQL_DATABASE`: Tên database sẽ được tạo tự động khi container khởi động
  - `MYSQL_USER`: Tên user sẽ được tạo
  - `MYSQL_PASSWORD`: Mật khẩu cho user đó

#### `ports: - "3306:3306"`
- **Mục đích**: Ánh xạ cổng giữa container và máy host
- **Giải thích**: 
  - Cú pháp: `"HOST_PORT:CONTAINER_PORT"`
  - `3306:3306` nghĩa là: cổng 3306 trên máy của bạn → cổng 3306 trong container
  - Bạn có thể kết nối đến MySQL từ máy host qua `localhost:3306`
  - Ví dụ khác: `"3307:3306"` sẽ cho phép truy cập MySQL qua `localhost:3307` trên máy host

#### `volumes: - db-data:/var/lib/mysql`
- **Mục đích**: Lưu trữ dữ liệu database bền vững
- **Giải thích**: 
  - `db-data` là tên volume (được định nghĩa ở cuối file)
  - `/var/lib/mysql` là đường dẫn trong container nơi MySQL lưu dữ liệu
  - **Quan trọng**: Nếu không có volume, dữ liệu sẽ mất khi container bị xóa!
  - Volume cho phép dữ liệu tồn tại ngay cả khi container bị dừng hoặc xóa

#### `command: --default-authentication-plugin=mysql_native_password`
- **Mục đích**: Thêm tham số dòng lệnh khi khởi động MySQL
- **Giải thích**: 
  - MySQL 8.0 mặc định sử dụng `caching_sha2_password` (có thể gây vấn đề với một số client cũ)
  - Dòng này buộc MySQL sử dụng `mysql_native_password` để tương thích tốt hơn

---

## Service 2: Adminer

```yaml
adminer:
  image: adminer
  container_name: myapp-adminer
  restart: always
  ports:
    - "8080:8080"
  depends_on:
    - db
```

### Giải thích từng thuộc tính:

#### `image: adminer`
- **Mục đích**: Sử dụng image Adminer
- **Giải thích**: Adminer là một công cụ web-based để quản lý database (giống phpMyAdmin nhưng nhẹ hơn)

#### `container_name: myapp-adminer`
- **Mục đích**: Đặt tên container là "myapp-adminer"

#### `restart: always`
- **Mục đích**: Tự động khởi động lại nếu bị dừng

#### `ports: - "8080:8080"`
- **Mục đích**: Ánh xạ cổng 8080
- **Giải thích**: Bạn có thể truy cập Adminer qua trình duyệt tại `http://localhost:8080`

#### `depends_on: - db`
- **Mục đích**: Đảm bảo thứ tự khởi động
- **Giải thích**: 
  - Container `adminer` sẽ đợi container `db` khởi động xong trước
  - Điều này quan trọng vì Adminer cần kết nối đến MySQL
  - **Lưu ý**: `depends_on` chỉ đợi container khởi động, không đợi MySQL sẵn sàng nhận kết nối (có thể cần thêm vài giây)

---

## Volumes (Dòng 28-29)

```yaml
volumes:
  db-data:
```

- **Mục đích**: Định nghĩa named volume
- **Giải thích**: 
  - `db-data` là tên volume được tạo
  - Volume này được sử dụng trong service `db` để lưu trữ dữ liệu
  - Docker sẽ tự động quản lý volume này (thường lưu trong `/var/lib/docker/volumes/`)
  - Dữ liệu sẽ tồn tại ngay cả khi container bị xóa

---

## Cách Sử Dụng

### 1. Khởi động tất cả services
```bash
docker-compose up
```
- Khởi động tất cả services được định nghĩa trong file
- Chạy ở foreground (terminal sẽ hiển thị logs)

### 2. Khởi động ở chế độ background (detached)
```bash
docker-compose up -d
```
- Chạy ở background, không chiếm terminal

### 3. Dừng tất cả services
```bash
docker-compose down
```
- Dừng và xóa containers
- **Lưu ý**: Dữ liệu trong volumes vẫn được giữ lại

### 4. Dừng và xóa volumes
```bash
docker-compose down -v
```
- Dừng containers và xóa cả volumes (dữ liệu sẽ bị mất!)

### 5. Xem logs
```bash
docker-compose logs
```
- Xem logs của tất cả services
- Hoặc xem logs của một service cụ thể: `docker-compose logs db`

### 6. Xem trạng thái
```bash
docker-compose ps
```
- Liệt kê tất cả containers đang chạy

---

## Kết Nối Đến Database

### Từ máy host (máy tính của bạn):
- **Host**: `localhost` hoặc `127.0.0.1`
- **Port**: `3306`
- **Database**: `myapp`
- **Username**: `myuser`
- **Password**: `mypassword`

### Từ Adminer (Web Interface):
1. Mở trình duyệt: `http://localhost:8080`
2. Điền thông tin:
   - **System**: MySQL
   - **Server**: `db` (tên service, không phải localhost!)
   - **Username**: `myuser`
   - **Password**: `mypassword`
   - **Database**: `myapp`

**Lưu ý**: Khi kết nối từ Adminer (chạy trong container), bạn dùng tên service `db` làm hostname, không phải `localhost`. Docker Compose tự động tạo network nội bộ giữa các containers.

---

## Các Khái Niệm Quan Trọng

### Container vs Image
- **Image**: Template/bản thiết kế (như file ISO)
- **Container**: Instance đang chạy của image (như máy ảo đang chạy)

### Volume
- Lưu trữ dữ liệu bền vững
- Tồn tại độc lập với container lifecycle
- Có thể được chia sẻ giữa nhiều containers

### Network
- Docker Compose tự động tạo một network cho các services
- Các services có thể giao tiếp với nhau qua tên service
- Ví dụ: từ container `adminer`, bạn có thể kết nối đến `db:3306`

### Port Mapping
- Cho phép truy cập container từ máy host
- Cú pháp: `"HOST:CONTAINER"`
- Nếu không map port, chỉ có thể truy cập từ các container khác trong cùng network

---

## Lưu Ý Bảo Mật

⚠️ **Quan trọng**: File này chứa mật khẩu dạng plain text. Trong môi trường production:

1. **Sử dụng file `.env`**:
   ```yaml
   environment:
     MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
     MYSQL_PASSWORD: ${MYSQL_PASSWORD}
   ```
   Và tạo file `.env`:
   ```
   MYSQL_ROOT_PASSWORD=your_secure_password
   MYSQL_PASSWORD=your_secure_password
   ```

2. **Thêm `.env` vào `.gitignore`** để không commit mật khẩu lên Git

3. **Sử dụng Docker Secrets** cho môi trường production

---

## Tổng Kết

File `docker-compose.yml` này tạo ra:
- ✅ 1 container MySQL 8.0 với database `myapp`
- ✅ 1 container Adminer để quản lý database qua web
- ✅ Volume để lưu trữ dữ liệu bền vững
- ✅ Network tự động để các containers giao tiếp với nhau
- ✅ Port mapping để truy cập từ máy host

Đây là setup cơ bản và phù hợp cho môi trường development. Cho production, bạn cần thêm các cấu hình về bảo mật, backup, và monitoring.
