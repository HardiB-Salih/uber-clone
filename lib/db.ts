// db.ts
import { Client, QueryResult, QueryResultRow } from "pg";

// Initialize the PostgreSQL client with environment variable for database URL
export const db: Client = new Client({
  connectionString: process.env.DATABASE_URL, // Ensure DATABASE_URL is set in your .env file
});

/**
 * Generic function to execute SQL queries
 * @param sql - The SQL query string
 * @param params - The query parameters
 * @returns The query result
 */
async function executeQuery<T extends QueryResultRow>(
  sql: string,
  params: any[] = [],
): Promise<QueryResult<T>> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    await client.end();
  }
}

/**
 * Generic function to insert data into a table
 * @param table - The table name
 * @param data - An object representing the data to insert
 * @returns The inserted row(s)
 */
export async function insertIntoTable<T extends QueryResultRow>(
  table: string,
  data: Record<string, T>,
): Promise<QueryResult<T>> {
  const columns = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *;`;
  return executeQuery<T>(sql, values);
}

/**
 * Generic function to select data from a table
 * @param table - The table name
 * @param columns - An array of column names to select
 * @param conditions - A string representing SQL WHERE conditions
 * @param params - An array of parameters for the conditions
 * @returns The selected row(s)
 */
export async function selectFromTable<T extends QueryResultRow>(
  table: string,
  columns: string[] = ["*"],
  conditions: string = "",
  params: any[] = [],
): Promise<QueryResult<T>> {
  const sql = `SELECT ${columns.join(", ")} FROM ${table} ${conditions ? `WHERE ${conditions}` : ""};`;
  return executeQuery<T>(sql, params);
}

/**
 * Generic function to update data in a table
 * @param table - The table name
 * @param data - An object representing the data to update
 * @param conditions - A string representing SQL WHERE conditions
 * @param params - An array of parameters for the conditions
 * @returns The updated row(s)
 */
export async function updateTable<T extends QueryResultRow>(
  table: string,
  data: Record<string, T>,
  conditions: string,
  params: any[],
): Promise<QueryResult<T>> {
  const setClauses = Object.keys(data)
    .map((key, i) => `${key} = $${i + 1}`)
    .join(", ");
  const values = Object.values(data);
  const sql = `UPDATE ${table} SET ${setClauses} WHERE ${conditions} RETURNING *;`;

  return executeQuery<T>(sql, [...values, ...params]);
}

/**
 * Generic function to delete data from a table
 * @param table - The table name
 * @param conditions - A string representing SQL WHERE conditions
 * @param params - An array of parameters for the conditions
 * @returns The deleted row(s)
 */
export async function deleteFromTable<T extends QueryResultRow>(
  table: string,
  conditions: string,
  params: any[],
): Promise<QueryResult<T>> {
  const sql = `DELETE FROM ${table} WHERE ${conditions} RETURNING *;`;
  return executeQuery<T>(sql, params);
}
