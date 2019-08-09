/* eslint-disable no-console */

import express from 'express'
import config from 'server/config'
import { connect as connectDatabase } from 'server/services/database'
import apolloServer from 'server/graphql/apolloServer'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
apolloServer.applyMiddleware({ app })

app.listen(config.get('server.port'), () => {
  connectDatabase()
  console.log(
    `🔥 server is listening on port http://localhost:${config.get(
      'server.port',
    )}`,
  )
})
