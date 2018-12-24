'use strict'

const FT = require('folktale')

exports.logicFind = (repoQuery, ResponseClass, conditions, projection) => {
    return repoQuery(conditions, projection).map(maybe => maybe.map(objects => ResponseClass.from(objects)))
}

exports.logicFindById = (repoQuery, ResponseClass, id) => {
    return exports.logicFindOne(repoQuery, ResponseClass, { id })
}

exports.logicCreate = (repoInsert, ResponseClass, target) => {
    return repoInsert(target).map(obj => FT.result.Ok(ResponseClass.from(obj)))
}

exports.logicPatch = (repoPatch, ResponseClass, target) => {
    const { id, rest } = target
    return repoPatch(id, rest).map(rowCount => FT.result.Ok(ResponseClass.from(rowCount)))
}

exports.logicUpdate = (repoUpdate, ResponseClass, target) => {
    const { id, rest } = target
    return repoUpdate(id, rest).map(rowCount => FT.result.Ok(ResponseClass.from(rowCount)))
}

exports.logicDelete = (repoDelete, id) => {
    return repoDelete(id).map(rowCount => FT.result.Ok(rowCount))
}

exports.logicValidateObject = (RequestClass, target) => {
    const { error, value } = RequestClass.objectSchema.validate(target)
    return error ? FT.result.Error(error) : FT.result.Ok(value)
}

exports.logicValidateId = (RequestClass, target) => {
    const { error, value } = RequestClass.idSchema.validate(target)
    return error ? FT.result.Error(error) : FT.result.Ok(value)
}
