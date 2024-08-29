import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    // Connect to the database
    await db.connect();

    // Execute the query to fetch drivers
    const { rows } = await db.query(`SELECT * FROM drivers`);

    // Close the database connection
    await db.end();

    // Return the fetched data
    return new Response(JSON.stringify({ data: rows }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching drivers:", error);

    // Ensure the connection is closed if an error occurs
    try {
      await db.end();
    } catch (closeError) {
      console.error("Error closing database connection:", closeError);
    }

    // Return an error response
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
