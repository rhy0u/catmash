import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

class Cat extends BaseModel {
  static tableName = 'cats'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['id', 'score'],
    properties: {
      score: { type: 'number' },
    },
  })

  $beforeInsert() {
    this.score = 1000
  }

  static relationMappings = {}
}

export default Cat
