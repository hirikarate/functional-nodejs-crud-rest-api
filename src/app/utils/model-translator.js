const automapper = require('automapper-ts')

/**
 * (class|function) => function
 */
exports.createTranslator = (Class) => {
	automapper.createMap('any', Class)
	return (source) => automapper.map('any', Class, source)
}
