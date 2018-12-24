const automapper = require('automapper-ts')

/**
 * (class|function) => function
 */
exportx.createTranslator = (Class) => {
	automapper.createMap('any', Class.name)
	return (source) => automapper.map('any', Class.name, source)
}