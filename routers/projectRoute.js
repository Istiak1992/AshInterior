const express = require('express');
const router = express.Router();

//Import funtionalities from permission Controller
const {
    addProject,
    listProject,
    updateProject,
    deleteProject,
    
    
   
} = require('../controllers/projectController')



router.route('/project/add').post(addProject);
router.route('/project/list').get(listProject);
router.route('/project/update/:id').put(updateProject);
router.route('/project/delete/:id').delete(deleteProject);


module.exports = router;