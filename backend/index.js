require('dotenv').config()
const express = require('express')
const pool = require('./db')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'})
    }
})

app.get('/', (req,res) => {
    res.send("Toi la Phuc dep trai ne!")
})

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
