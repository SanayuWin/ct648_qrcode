-- init.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS employee (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    nameTH VARCHAR(255) NULL,
    nameEN VARCHAR(255) NULL,
    studentID VARCHAR(50) NULL,
);

CREATE TABLE access_code_log (
    row_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    access_code VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    token_before TEXT NULL,
    token_after TEXT NULL,
    token_update_at TIMESTAMP 
);

CREATE TABLE token_log (
    row_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employee_id UUID REFERENCES employee(uuid) ON DELETE CASCADE,
    jwt_token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    login_type VARCHAR(6) NOT NULL,
    access_code_id UUID REFERENCES access_code_log(row_id) ON DELETE CASCADE DEFAULT NULL  
);