import db from '../config/db';

export async function dataEmployee(req: Request): Promise<Response> {
  try {
    
    // ดึงข้อมูลผู้ใช้
    const userResult = await db.query('SELECT * FROM employee');
    const data = userResult.rows;
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error('Error during login', error);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
    });
  }
}