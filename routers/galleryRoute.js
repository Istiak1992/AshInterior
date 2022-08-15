
const express = require('express');
const router = express.Router();

//Import funtionalities from permission Controller
const {
    addGallery,
    listGallery,
    updateGallery,
    deleteGallery
    
    
   
} = require('../controllers/galleryController')



router.route('/gallery/add').post(addGallery);
router.route('/gallery/list').get(listGallery);
router.route('/gallery/update/:id').put(updateGallery);
router.route('/gallery/delete/:id').delete(deleteGallery);


module.exports = router;