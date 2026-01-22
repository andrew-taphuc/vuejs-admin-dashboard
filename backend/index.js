// require('dotenv').config()
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

console.log(process.env.PORT)

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Toi la Phuc dep trai ne!")
})

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
