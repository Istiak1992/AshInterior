const express = require('express');
const router = express.Router();

//Import funtionalities from permission Controller
const {
    addContentHeader,
    listContentheader,
    updateContentheader,
    deleteContentheader,
    
   
} = require('../controllers/contentheaderController')



router.route('/contentheader/add').post(addContentHeader);
router.route('/contentheader/list').get(listContentheader);
router.route('/contentheader/update/:id').put(updateContentheader);
router.route('/contentheader/delete/:id').delete(deleteContentheader);



module.exports = router;