const express = require('express');
const router = express.Router();

//Import funtionalities from permission Controller
const {
    addTeam,
    listTeam,
    updateTeam,
    deleteTeam,
    
    
   
} = require('../controllers/teamController')



router.route('/team/add').post(addTeam);
router.route('/team/list').get(listTeam);
router.route('/team/update/:id').put(updateTeam);
router.route('/team/delete/:id').delete(deleteTeam);


module.exports = router;