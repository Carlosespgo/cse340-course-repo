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

export { getAllProjects, getProjectsByOrganizationId };