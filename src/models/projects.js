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

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getServiceProjectFromCategory };