import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

class Author extends BaseModel {
  static tableName = 'cats'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['id'],
    properties: {
      score: { type: 'number' },
      photoUrl: { type: 'number' },
    },
  })

  static relationMappings = {}
}

export default Author
