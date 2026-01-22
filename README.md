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

- File index.js ban đầu:
```js
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Toi la Phuc dep trai ne!")
})

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
```

- Thêm script để chạy với nodemon 
```
"scripts": {
  "dev": "nodemon index.js"
}
```

- Tạo file docker-compose.yml 

- Đọc file backend/docs/docker-compose-explanation.md để hiểu về file docker

- Tạo bảng user, thêm người dùng lấy từ db.sql

- Cài dotenv
`npm install mysql2 dotenv`

- Cấu hình dotenv

```js
const dotenv = require('dotenv')
dotenv.config()
```

### Bước 2: Tạo pool db

- Tạo db.js và khởi tạo 1 pool trong đó, cụ thể như đoạn code sau:
```js
require('dotenv').config()

const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3309,
    waitForConnections: true,
    connectionLimit: 10,
})

module.exports = pool
```

- Thêm pool đó vào trong index.js

```js
const pool = require('./db')
```

- Thêm API đầu tiên để select tất cả users
```js
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'})
    }
})
```

