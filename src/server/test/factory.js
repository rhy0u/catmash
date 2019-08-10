import { factory } from 'factory-girl'
import ObjectionAdapter from 'server/test/ObjectionAdapter'
import Cat from 'server/models/Cat'

factory.setAdapter(new ObjectionAdapter())

factory.define('cat', Cat, {
  id: factory.chance('word'),
  score: factory.chance('integer', { min: 0, max: 5000 }),
})

export default factory
