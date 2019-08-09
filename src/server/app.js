import express from 'express'

const app = express()

app.listen(8000, () => {
  connectDatabase()
  archiveOrder.start()
  console.log(`🔥 server is listening on port http://localhost:8000`)
})
