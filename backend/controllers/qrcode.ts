import db from '../config/db';
import { formatDateTime } from '../utils/date'; 
import { generateRandomString } from '../utils/random'; 
import { SendToLine } from '../utils/line'; 

export async function generateAccessCode(req: Request): Promise<Response> {
    try {
        const now = new Date();
        const dateNow = formatDateTime(now);
        const randomCharacter = generateRandomString(30);
        let accessCode = "CT648" + dateNow + randomCharacter;
        accessCode = accessCode.replace(/\s/g, '');
        
        // สร้าง Random access code
        await db.query('insert into access_code_log (access_code) values ($1)', [accessCode]);

        return new Response(JSON.stringify({
            msg: `Successfully`,  
            data: accessCode
        }), {
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

export async function verifyQRCode(req: Request): Promise<Response> {
    try {
        // Get the headers
        const rac = req.headers.get('RAC');

         // ตรวจสอบมีข้อมูล RAC หรือไม่
        const racResult = await db.query(`SELECT row_id, token_after FROM access_code_log WHERE access_code = $1 and COALESCE(token_after, '') != $2`, [rac, '']);
        if (racResult.rows.length === 0) {
            return new Response(JSON.stringify({ 
                message: 'No login yet'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            });
        }
        // ดึง token 
        const racArr = racResult.rows[0];
        const token = racArr.token_after;
        console.log(token);
        
        const now = new Date();
        const dateNow = formatDateTime(now);
        // ส่งแจ้งเตือนผ่านไลน์
        const message = `
        กลุ่ม: Bun/React/Postgres
        เวลาล็อคอิน: ${dateNow}
        ล็อคอินผ่าน: QRCode
        token: ${token}
        `;
        SendToLine(message);
        
        return new Response(JSON.stringify({
            msg: `Successfully`,  
            token
        }), {
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

