const express = require('express');
const router = express.Router();

//Import funtionalities from permission Controller
const {
    addProduct,
    listProduct,
    updateProduct,
    deleteProduct,
    
   
} = require('../controllers/productController')



router.route('/product/add').post(addProduct);
router.route('/product/list').get(listProduct);
router.route('/product/update/:id').put(updateProduct);
router.route('/product/delete/:id').delete(deleteProduct);


module.exports = router;