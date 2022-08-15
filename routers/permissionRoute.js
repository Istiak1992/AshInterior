const express = require('express');
const router = express.Router();

//Import funtionalities from permission Controller
const {
    addPermission,
    getPermission,
    updatePermission,
    deletePermission,
    getPermissionDetails,
    addRole,
    getRole,
    updateRole,
    getRoleDetails,
    deleteRole,
    addUserRole,
    hasPermission
} = require('../controllers/permissionController')




//--------------below permission route url-----------------//
router.route("/permission").post(addPermission);
router.route('/permission').get(getPermission);
router.route('/permission/:id')
      .get(getPermissionDetails)
      .put(updatePermission)
      .delete(deletePermission);

//---------------below Role route url----------------------//
router.route("/role").post(addRole);
router.route('/role').get(getRole);
router.route('/role/:id')
      .get(getRoleDetails)
      .put(updateRole)
      .delete(deleteRole);

//----------------------User Role Assign process-----------------//
router.route('/user/role/:id').post(addUserRole);
router.route('/user/role/permission').get(hasPermission);


module.exports = router;