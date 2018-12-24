"use strict";

const FT = require("folktale");

/**
 * (function, class, object|array<string>, array<string>) => Future<Maybe<object>>
 */
exports.repoQuery = ((dbSelect, EntityClass, conditions, projections) => {
    return dbSelect(EntityClass, conditions, projections)
        .map(rows => (rows && rows.length
        ? FT.maybe.Just(rows)
        : FT.maybe.Nothing()));
});

/**
 * (function, class, object) => Future<object>
 */
exports.repoInsert = ((dbInsert, EntityClass, target) => {
    return dbInsert(EntityClass, target);
});

/**
 * (function, class, object) => Future<object>
 */
exports.repoUpdate = ((dbUpdate, EntityClass, id, target) => {
    return dbUpdate(EntityClass, id, target);
});

exports.repoUpdateByProps = ((dbUpdateByProps, EntityClass, conditions, target) => {
    return dbUpdateByProps(EntityClass, conditions, target);
});

exports.repoDelete = ((dbDelete, EntityClass, id) => {
    return dbDelete(EntityClass, id);
});
//# sourceMappingURL=repository.js.map