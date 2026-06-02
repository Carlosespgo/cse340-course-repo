import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm, 
    processEditOrganizationForm
} from './controllers/organizations.js';
import { showProjectsPage,
    showProjectDetailsPage,
    processNewProjectForm,
    showNewProjectForm, 
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';
import { showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategory,
    processNewCategory,
    categoriesValidation,
    showEditCategoryForm,
    processEditCategory
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/test-error', testErrorPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.get('/edit-project/:id', showEditProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.get('/new-category', showNewCategory);
router.get('/edit-category/:id', showEditCategoryForm);

router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.post('/new-category', categoriesValidation, processNewCategory);
router.post('/edit-category/:id', categoriesValidation, processEditCategory);

export default router;