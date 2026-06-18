import db from './db.js'
import bcrypt from 'bcrypt';

const getAllUsers = async () => {
    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            r.role_name
        FROM users u
        LEFT JOIN roles r
            ON u.role_id = r.role_id
        ORDER BY u.user_id
    `;
    const result = await db.query(query);
    return result.rows;
};

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id,  u.name, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const queryParams = [email];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        return null; // User not found
    }

    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
        return null; // Invalid password
    }

    delete user.password_hash; // Remove password hash before returning user data
    return user; // Authentication successful
};

const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT sp.project_id, sp.title, sp.description, sp.location, sp.project_date
        FROM serviceprojects sp
        JOIN project_volunteers pv ON sp.project_id = pv.serviceproject_id
        WHERE pv.user_id = $1
        ORDER BY sp.project_date ASC
    `;

    const queryParams = [userId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const isVolunteerForProject = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM project_volunteers
        WHERE user_id = $1 AND serviceproject_id = $2
    `;
    const queryParams = [userId, projectId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0;
};

export { createUser, authenticateUser, getAllUsers, getVolunteerProjects, isVolunteerForProject };