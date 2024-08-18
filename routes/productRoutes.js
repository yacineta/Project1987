import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js'
import { creatProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController,productFiltersController, productCountController, productListController,searchtController, relatedProductController, productCategoryController } from '../controller/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

router.post('/creat-product',requireSignIn,isAdmin,formidable(),creatProductController);
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);
router.get('/get-product',getProductController);
router.get('/get-product/:slug',getSingleProductController);
router.get('/product-photo/:pid',productPhotoController);
router.get('/delete-product/:pid',deleteProductController);
router.post('/product-filters', productFiltersController);
router.get('/product-count',  productCountController);
router.get('/product-list/:page ', productListController);
router.get('/search/:keyword' , searchtController);
router.get('/related-product/:pid/:cid',relatedProductController);
router.get('/product-category/:slug',  productCategoryController)

export default router