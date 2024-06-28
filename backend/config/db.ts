// db.ts
// Import the PostgreSQL client (this is a hypothetical example; you need to find a real client compatible with Bun)
import { Pool } from "pg"; 

// Database connection string from environment variable
const DATABASE_URL = process.env.DATABASE_URL;

// Create and export a new Pool instance
const db = new Pool({
connectionString: DATABASE_URL,
});

export default db;