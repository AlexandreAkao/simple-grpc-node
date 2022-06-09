require('dotenv').config();
const app = require('./app')

const PORT = process.env.PORT ?? 50051

app.start(`127.0.0.1:${PORT}`).then(() => {
  console.log(`🚀 Server running on 127.0.0.1:${PORT}`)
})
