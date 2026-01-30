require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// GET /api/users - Lấy danh sách tất cả users
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users ORDER BY id')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

// GET /api/users/:id - Lấy 1 user theo id
app.get('/api/users/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id])
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

// POST /api/users - Tạo user mới
app.post('/api/users', async (req, res) => {
    try {
        const { first_name, last_name, dob, phone, employee_code, email, gender, job_title } = req.body
        const [result] = await pool.query(
            'INSERT INTO users (first_name, last_name, dob, phone, employee_code, email, gender, job_title) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, dob || null, phone || null, employee_code, email, gender, job_title || null]
        )
        res.status(201).json({
            id: result.insertId,
            first_name,
            last_name,
            dob: dob || null,
            phone: phone || null,
            employee_code,
            email,
            gender,
            job_title
        })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Mã nhân viên hoặc email đã tồn tại' })
        }
        res.status(500).json({ error: 'Internal server error' })
    }
})

// PUT /api/users/:id - Cập nhật user
app.put('/api/users/:id', async (req, res) => {
    try {
        const { first_name, last_name, dob, phone, employee_code, email, gender, job_title } = req.body
        const [result] = await pool.query(
            'UPDATE users SET first_name=?, last_name=?, dob=?, phone=?, employee_code=?, email=?, gender=?, job_title=? WHERE id=?',
            [first_name, last_name, dob || null, phone || null, employee_code, email, gender, job_title || null, req.params.id]
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Mã nhân viên hoặc email đã tồn tại' })
        }
        res.status(500).json({ error: 'Internal server error' })
    }
})

// DELETE /api/users/:id - Xóa user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id])
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.get('/', (req, res) => {
    res.send('Backend API - Users CRUD')
})

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`)
})
