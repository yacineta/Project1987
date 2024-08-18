import  express  from "express";
import { isAdmin, requireSignIn, } from "../middlewares/authmiddleware.js";
import { creatCategoryController, deleteCategoryController, getcategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";

const router = express.Router();

router.post('/create-Category',requireSignIn,isAdmin,creatCategoryController);
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);
router.get('/get-category', getcategoryController); 
router.get('/single-category/:slug',singleCategoryController);
router.delete('/delete-category/:id',requireSignIn,isAdmin,  deleteCategoryController)


export default router;