import { getAllCategories,
    getCategoryById,
    getCategoriesForServiceProject,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';
import {getServiceProjectFromCategory, getProjectDetails} from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoriesValidation = [
    body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min:3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
];

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
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesForServiceProject(projectId);

    const title = 'Assign Categories to Project';

    console.log("PROJECT ID:", projectId);
    console.log("PROJECT DETAILS:", projectDetails);

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategory = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

const processNewCategory = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    try {
        const newCategoryId = await createCategory(name);

        req.flash('success', 'New category created successfully!');
        res.redirect(`/category/${newCategoryId}`);
    } catch (error) {
        if (error.code === '23505') {
        req.flash('error', 'That category already exists.');
        return res.redirect('/new-category');
        }
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const title = 'Edit Category';

    if (!category) {
        req.flash('error', 'Category not found.');
        return res.redirect('/categories');
    }

    res.render('edit-category', { title, category });
};

const processEditCategory = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit project form
        return res.redirect('/edit-category/' + req.params.id);
    }

    const categoryId = req.params.id;
    const { name } = req.body;

    try {
        await updateCategory(categoryId, name);
        req.flash('success', 'Category updated successfully.');
        res.redirect('/categories');
    } catch (error) {
        console.error('Error updating category:', error);
        if (error.code === '23505') {
        req.flash('error', 'That category already exists.');
        return res.redirect(`/edit-category/${categoryId}`);
        }
        req.flash('error', 'There was an error updating the category.');
        res.redirect(`/edit-category/${categoryId}`);
    }
};

export { showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategory,
    processNewCategory,
    showEditCategoryForm,
    processEditCategory,
    categoriesValidation
};