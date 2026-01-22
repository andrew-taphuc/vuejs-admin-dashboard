# vuejs-admin-dashboard
A project to get used to VueJS Framework

## Ghi chú các bước thực hiện

### Bước 1: Khởi tạo dự án

- Chuẩn bị node và npm

`node -v`
`npm -v`

- Khởi tạo project FE với Vite 

`npm create vite@latest frontend`

"frontend" là tên thư mục

- Tạo thư mục backend và khởi tạo, tải express

`npm init -y`
`npm install express`

- Tạo index.js và tải nodemon để auto reload

`touch index.js`
`npm install --save-dev nodemon`

- Thêm script để chạy với nodemon 
```
"scripts": {
  "dev": "nodemon index.js"
}
```

- Tạo file docker-compose.yml 

- Đọc file backend/docs/docker-compose-explanation.md để hiểu về file docker


