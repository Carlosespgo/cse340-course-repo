import { getAllCategories, getCategoryById} from '../models/categories.js';
import {getServiceProjectFromCategory} from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const serviceProjects = await getServiceProjectFromCategory(categoryId);
    res.render('category', { title: categoryDetails.name, category: categoryDetails, serviceProjects });
}

export { showCategoriesPage, showCategoryDetailsPage };