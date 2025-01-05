import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWTSECRET;

if (!jwtSecret) {
    throw new Error('JWT Secret is not defined');
}

class JWTService {
    static sign(tokenInfo) {
        
        return jwt.sign(tokenInfo, jwtSecret, { expiresIn: '1h' });
    }

    static verify(token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            
            return decoded;
        } catch (error) {
            console.error('Token verification error:', error.message);

            if (error.name === 'TokenExpiredError') {
                throw new Error('Token has expired');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid token');
            }

            throw new Error('Token verification failed');
        }
    }
}

export default JWTService;
