class ObjectionAdapter {
  build = (Model, props) => Object.assign(new Model(), props)

  save = async (model, Model) => Model.query().insertAndFetch(model)

  destroy = async (model, Model) => Model.query().deleteById(model.id)

  get = (model, attr) => model[attr]

  set = (props, model) => Object.assign(model, props)
}

export default ObjectionAdapter
