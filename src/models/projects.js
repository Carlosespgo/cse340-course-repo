import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT sp.project_id, sp.id_organization, sp.title, sp.description, sp.location, sp.project_date, o.org_name
      FROM public.serviceprojects sp
      JOIN organization o
            ON sp.id_organization = o.id_organization
        ORDER BY sp.project_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          sp.project_id,
          sp.id_organization,
          sp.title,
          sp.description,
          sp.location,
          sp.project_date
        FROM public.serviceprojects sp
        WHERE sp.id_organization = $1
        ORDER BY sp.project_date;
      `;

      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT 
          sp.project_id,
          sp.title,
          sp.description,
          sp.project_date,
          sp.location,
          sp.id_organization,
          o.org_name
        FROM public.serviceprojects sp
        JOIN organization o ON sp.id_organization = o.id_organization
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
          sp.project_id,
          sp.title,
          sp.description,
          sp.project_date,
          sp.location,
          sp.id_organization,
          o.org_name
        FROM public.serviceprojects sp
        JOIN organization o ON sp.id_organization = o.id_organization
        WHERE sp.project_id = $1
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const getServiceProjectFromCategory = async (projectId) => {
  const query = `
        SELECT sp.project_id,
               sp.title,
               sp.description,
               sp.location,
               sp.project_date
        FROM serviceprojects sp
        JOIN serviceproject_category spc
            ON sp.project_id = spc.serviceproject_id
        WHERE spc.category_id = $1
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO public.serviceprojects (title, description, location, project_date, id_organization)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, organizationId, title, description, location, date) => {
  const query = `
    UPDATE public.serviceprojects
    SET id_organization = $1, title = $2, description = $3, location = $4, project_date = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [organizationId, title, description, location, date, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', projectId);
  }

  return result.rows[0].project_id;
};

export { getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects, 
    getProjectDetails,
    getServiceProjectFromCategory,
    createProject,
    updateProject
};