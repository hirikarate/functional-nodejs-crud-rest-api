'use strict'

const FT = require('folktale')
const R = require('rambdax')

/**
 * (function, class, object|array<string>, array<string>) => Future<Maybe<array<object>>>
 */
exports.repoQuery = R.curry((dbSelect, EntityClass, conditions, projections) => {
    return dbSelect(EntityClass, conditions, projections)
        .map(R.ifElse(
            R.compose(Boolean, R.length),
            FT.maybe.Just,
            FT.maybe.Nothing
        ))
})

/**
 * (function, class, string) => Future<Maybe<object>>
 */
exports.repoQueryById = R.curry((dbSelectById, EntityClass, id) => {
    return dbSelectById(EntityClass, id)
        .map(R.ifElse(Boolean, FT.maybe.Just, FT.maybe.Nothing))
})

/**
 * (function, class, object) => Future<object>
 */
exports.repoInsert = R.curry((dbInsert, EntityClass, target) => {
    return dbInsert(EntityClass, target)
})

/**
 * (function, class, string, object) => Future<object>
 */
exports.repoUpdate = R.curry((dbUpdate, EntityClass, id, target) => {
    return dbUpdate(EntityClass, id, target)
})


/**
 * (function, class, string, object) => Future<object>
 */
exports.repoPatch = R.curry((dbPatch, EntityClass, id, target) => {
    return dbPatch(EntityClass, id, target)
})

exports.repoDelete = R.curry((dbDelete, EntityClass, id) => {
    return dbDelete(EntityClass, id)
})
