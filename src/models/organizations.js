import db from './db.js'

const getAllOrganizations = async() => {
    const query = `
        SELECT id_organization, org_name, description, contact_email, logo_filename
      FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getOrganizationDetails = async (organizationId) => {
      const query = `
      SELECT
        id_organization,
        org_name,
        description,
        contact_email,
        logo_filename
      FROM public.organization
      WHERE id_organization = $1;
    `;

      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      // Return the first row of the result set, or null if no rows are found
      return result.rows.length > 0 ? result.rows[0] : null;
};

export { getAllOrganizations, getOrganizationDetails };