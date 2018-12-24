"use strict";

const Future = require("fluture");


exports.dbSelect = Future.encaseP3((ModelClass, conditions, projection) => {
    const query = ModelClass.query();
    if (conditions) {
        if (Array.isArray(conditions)) {
            // query.whereRaw('1 = 1');
            conditions.forEach(cond => {
                if (!Array.isArray(cond)) {
                    return;
                }
                if (cond.length == 2) {
                    const [key, value] = cond;
                    return query.andWhere(key, value);
                }
                if (cond.length == 3) {
                    const [left, operator, right] = cond;
                    return query.andWhere(left, operator, right);
                }
            });
        }
        else if (typeof conditions === 'string') {
            query.whereRaw(conditions);
        }
        else {
            query.where(conditions);
        }
    }
    if (projection && projection.length) {
        query.select(...projection);
    }
    return query;
});

exports.dbFindById = Future.encaseP2((ModelClass, id) => ModelClass.query().findById(id))

exports.dbInsert = Future.encaseP2((ModelClass, obj) => ModelClass.query().insertAndFetch(obj))

exports.dbPatch = Future.encaseP3((ModelClass, id, obj) => ModelClass.query().patch(obj).where(ModelClass.idColumn[0], id))

exports.dbUpdate = Future.encaseP3((ModelClass, id, obj) => ModelClass.query().update(obj).where(ModelClass.idColumn[0], id))

exports.dbDelete = Future.encaseP2((ModelClass, id) => ModelClass.query().deleteById(id));
