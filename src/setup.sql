CREATE TABLE organization (
    id_organization SERIAL UNIQUE PRIMARY KEY,
    org_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (org_name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

CREATE TABLE ServiceProjects (
    project_id INT PRIMARY KEY,
    id_organization INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(150),
    project_date DATE
);

ALTER TABLE ServiceProjects
ADD CONSTRAINT fk_organization
FOREIGN KEY (id_organization)
REFERENCES organization(id_organization)

INSERT INTO ServiceProjects
(project_id, id_organization, title, description, location, project_date)
VALUES
(101, 1, 'Community Park Renovation',
 'Renovation of a public park using sustainable materials.',
 'Denver, CO', '2026-01-15'),

(102, 1, 'Affordable Housing Build',
 'Construction of affordable eco-friendly housing units.',
 'Austin, TX', '2026-02-20'),

(103, 1, 'Bridge Repair Initiative',
 'Repair and reinforcement of an aging community bridge.',
 'Portland, OR', '2026-03-10'),

(104, 1, 'Solar Community Center',
 'Installation of solar-powered systems in a local center.',
 'Phoenix, AZ', '2026-04-05'),

(105, 1, 'School Playground Upgrade',
 'Building a safer and more sustainable playground.',
 'Seattle, WA', '2026-05-12');

 INSERT INTO ServiceProjects
(project_id, id_organization, title, description, location, project_date)
VALUES
(201, 2, 'Urban Garden Expansion',
 'Expanding community garden spaces in urban areas.',
 'Chicago, IL', '2026-01-25'),

(202, 2, 'Neighborhood Compost Program',
 'Teaching residents sustainable composting practices.',
 'Boston, MA', '2026-02-14'),

(203, 2, 'Youth Farming Workshop',
 'Educational farming workshops for local students.',
 'San Diego, CA', '2026-03-18'),

(204, 2, 'Rooftop Greenhouse Project',
 'Developing rooftop greenhouses for food production.',
 'New York, NY', '2026-04-22'),

(205, 2, 'Community Farmers Market',
 'Organizing a market for locally grown produce.',
 'Atlanta, GA', '2026-05-30');

 INSERT INTO ServiceProjects
(project_id, id_organization, title, description, location, project_date)
VALUES
(301, 3, 'Food Bank Support Drive',
 'Coordinating volunteers for local food bank distribution.',
 'Dallas, TX', '2026-01-08'),

(302, 3, 'Senior Assistance Program',
 'Providing volunteer support for senior citizens.',
 'Miami, FL', '2026-02-11'),

(303, 3, 'Community Cleanup Day',
 'Organizing volunteers for neighborhood cleanups.',
 'Los Angeles, CA', '2026-03-21'),

(304, 3, 'School Supply Donation Event',
 'Collecting and distributing school supplies to children.',
 'Charlotte, NC', '2026-04-17'),

(305, 3, 'Holiday Shelter Assistance',
 'Volunteer staffing for local homeless shelters during holidays.',
 'Philadelphia, PA', '2026-05-28');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE serviceproject_category (
    serviceproject_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (serviceproject_id, category_id),

    CONSTRAINT fk_serviceproject
        FOREIGN KEY (serviceproject_id)
        REFERENCES serviceprojects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

INSERT INTO category (name)
VALUES
    ('Education'),
    ('Healthcare'),
    ('Environment');

INSERT INTO serviceproject_category (serviceproject_id, category_id)
VALUES
    (101, 1),
    (101, 3),
    (201, 2),
    (301, 1);