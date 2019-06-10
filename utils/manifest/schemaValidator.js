const Joi = require('@hapi/joi');

const manifestSchema = Joi.object().keys({
  rootDir: Joi.string().required(),
  transpiler: Joi.any().valid(['vue']).required(),
  projectToken: Joi.string(),
  components: Joi.array(),
})

function schemaValidator(data) {
  return Joi.validate(data, manifestSchema)
}

module.exports = schemaValidator
