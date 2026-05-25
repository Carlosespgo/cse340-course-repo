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

export {getAllCategories, getCategoryById, getCategoriesForServiceProject};