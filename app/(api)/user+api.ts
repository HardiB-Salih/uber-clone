import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Connect to the database
    await db.connect();

    // Parse the request body to get user data
    const { name, email, clerkId } = await request.json();

    // Validate the input
    if (!name || !email || !clerkId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        },
      );
    }

    // Insert the new user into the database
    const response = await db.query(
      `INSERT INTO users (name, email, clerk_id) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, clerkId],
    );

    // Close the database connection
    await db.end();

    // Return a success response
    return new Response(JSON.stringify({ data: response.rows[0] }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
