const permissions = require('../functions/permissions');
const { _response } = require('./response');
const db = require('../../models/index');

module.exports = {
    hasAccess: (permission) => {

        return async function (req, res, next) {
            try {
                if (req.user.superAdmin === true) next();

                else if (permissions.hasOwnProperty(permission)) {

                    const user = await db.sequelize.query(
                        `SELECT User.id, User.phnNo, permission, UserRoles.roleId FROM Users AS User 
                        LEFT OUTER JOIN ( UserRoles INNER JOIN Roles AS Roles ON Roles.id = UserRoles.roleId)
                        ON User.id = UserRoles.userId WHERE User.id= `+ req.user.id + ` ` + `AND permission LIKE '[%"` + permission + `"%]'`,
                        { type: db.sequelize.QueryTypes.SELECT }
                    );
                    if (user.length > 0) next();
                    else { return res.status(401).json({ message: _response.noAccess }) };

                }

                else if (!permissions.hasOwnProperty(permission)) {
                    return res.status(401).json({ message: _response.notAvailable });
                }
            } catch (e) { return res.status(403).json({ "message":  _response.catchError }) };
        }
    }
}