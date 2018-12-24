'use strict'

const FT = require('folktale')
const R = require('rambdax')

exports.logicFind = R.curry((repoQuery, ResponseClass, conditions, projection) => {
    return repoQuery(conditions, projection)
        .map(maybe => maybe
            .map(objects => ResponseClass.from(objects)))
})

exports.logicFindById = R.curry((repoQueryById, ResponseClass, { id }) => {
    return repoQueryById(id)
        .map(maybe => maybe
            .map(obj => ResponseClass.from(obj)))
})

exports.logicCreate = R.curry((repoInsert, ResponseClass, target) => {
    return repoInsert(target)
        .map(obj => FT.result.Ok(ResponseClass.from(obj)))
})

exports.logicPatch = R.curry((repoPatch, ResponseClass, target) => {
    const { id, ...rest } = target
    return repoPatch(id, rest)
        .map(obj => FT.result.Ok(ResponseClass.from(obj)))
})

exports.logicUpdate = R.curry((repoUpdate, ResponseClass, target) => {
    const { id, ...rest } = target
    return repoUpdate(id, rest)
        .map(obj => FT.result.Ok(ResponseClass.from(obj)))
})

exports.logicDelete = R.curry((repoDelete, id) => {
    return repoDelete(id)
        .map(rowCount => FT.result.Ok(rowCount))
})

exports.logicValidateObject = R.curry((RequestClass, target) => {
    const { error, value } = RequestClass.objectSchema.validate(target)
    return error ? FT.result.Error(error) : FT.result.Ok(value)
})

