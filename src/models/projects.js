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
}

export {getAllProjects}