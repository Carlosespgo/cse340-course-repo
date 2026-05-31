import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
  const query = `
      SELECT category_id, name
    FROM public.category
    WHERE category_id = $1;
  `;

  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);

  return result.rows;
}

const getCategoriesForServiceProject = async (projectId) => {
  const query = `
        SELECT c.category_id, c.name
        FROM category c
        INNER JOIN serviceproject_category spc
            ON c.category_id = spc.category_id
        WHERE spc.serviceproject_id = $1
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO serviceproject_category (category_id, serviceproject_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM serviceproject_category
        WHERE serviceproject_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

export {getAllCategories, getCategoryById, getCategoriesForServiceProject, updateCategoryAssignments};