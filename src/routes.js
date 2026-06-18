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
    processEditProjectForm,
    processAddVolunteer,
    processRemoveVolunteer
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
import { showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showAllUsers,
    showVolunteerProjects
} from './controllers/users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/test-error', testErrorPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.get('/new-category', requireRole('admin'), showNewCategory);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.get('/register', showUserRegistrationForm);
router.get('/login', showLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), showAllUsers);
router.get('/dashboard', requireLogin, showVolunteerProjects);


router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.post('/new-category', requireRole('admin'), categoriesValidation, processNewCategory);
router.post('/edit-category/:id', requireRole('admin'), categoriesValidation, processEditCategory);
router.post('/register', processUserRegistrationForm);
router.post('/login', processLoginForm);
router.post('/project/:id/volunteer', requireLogin, processAddVolunteer);
router.post('/project/:id/unvolunteer', requireLogin, processRemoveVolunteer);


export default router;