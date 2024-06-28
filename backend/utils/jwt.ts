import jwt from 'jsonwebtoken';

const secretKey = '7f470fed3fc9e8b9cb9d9be0a18d3a1506931adadc846a4cb72986024c7b7934';

export interface JwtPayload {
  userId: number;
}

export function createToken(payload: JwtPayload): string {
  return jwt.sign(payload, secretKey, { expiresIn: '24h' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    const currentTime = Math.floor(Date.now() / 1000); 
    const isExpired = decoded.exp ? decoded.exp < currentTime : true;
    return { payload: decoded, isExpired };

  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

export function verifyTokenAuthorized(authorization: string) {
  try {
    let token = '';
    if (authorization && authorization.startsWith('Bearer ')) {
      token = authorization.slice(7); // Remove "Bearer " prefix
    }else {
      return false;
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    if(decoded === null){
      return false;
    }else {
      const currentTime = Math.floor(Date.now() / 1000); 
      const isExpired = decoded.exp ? decoded.exp < currentTime : true;
      if(isExpired){
        return false;
      }else {
        return true;
      }
    }
  } catch (error) {
    console.error('Invalid token', error);
    return false;
  }
}
