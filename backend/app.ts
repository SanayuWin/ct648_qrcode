const PORT: number = +(process.env.PORT || 8087);
process.env.TZ = "Asia/Bangkok";

import { login, register, loginQRCode } from "./controllers/auth";
import { generateAccessCode, verifyQRCode } from "./controllers/qrcode";
import { dataEmployee } from "./controllers/data";
import { verifyTokenAuthorized } from "./utils/jwt";

Bun.serve({
  port: PORT,
  fetch: async (req) => {
    const url = new URL(req.url);
    let response;
    switch (url.pathname) {
      case "/api/login":
        if (req.method === "POST") {
          response = await login(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/loginqr":
        if (req.method === "POST") {
          response = await loginQRCode(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/register":
        if (req.method === "POST") {
          response = await register(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/rac":
        if (req.method === "GET") {
          response = await generateAccessCode(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/verifyrac":
        if (req.method === "POST") {
          response = await verifyQRCode(req);
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      case "/api/getdata":
        if (req.method === "GET") {
          const authorization = req.headers.get('Authorization');
          const verifyToken = verifyTokenAuthorized(authorization);
          if(!verifyToken){
            return new Response(JSON.stringify({ 
              message: 'Unauthorized'
            }), {
              status: 401,
              headers: { 
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
              },

            });
          }else {
            response = await dataEmployee(req);
          }
        } else {
          response = new Response("Method Not Allowed", { status: 405 });
        }
        break;
      default:
        response = new Response("Not Found", { status: 404 });
        break;
    }
    return response;
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*"
      },
    });
  },
});
