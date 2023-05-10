// Passport imports
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// ORM and Entities 
import getOrm from '../mikro-orm/orm';
import { User } from '../../User/entities/User.entity';
// env
import ENV from '../../constants/ENV';
import authHelper from '../../User/helpers/auth.helper';
import { Request, Response } from 'express';
import { logger } from '../winston/errorLogger';

// passport reference
export { default as passport } from 'passport';

// Create a function to generate a JWT token
export function generateJwtToken(user: User, remember?: boolean): string {
  const payload = { id: user.id };
  const secret = ENV.JWT_SECRET;
  const options: jwt.SignOptions = {
    expiresIn: remember ? '7d' : '1h', // Set the token expiration time
  };
  return jwt.sign(payload, secret, options);
}


// Beater Token Middleware
export function authMiddleware() {
  return passport.authenticate('jwt', { session: false })
}

export function login(req: Request, res: Response, calback: (err: any, user: User, info: { message: string })=>void) {
  return passport.authenticate('local', calback)(req, res);
}

export function logout(req: Request, res: Response, calback: (err: any, user: User)=>void) {
  return passport.authenticate('jwt', calback)(req, res);
}


/** JWT Authentication (Bearer Token) */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV.JWT_SECRET,
};
passport.use(new JwtStrategy(options, async (payload, done) => {
  try {
    const orm = (await getOrm()).em.fork();
    const user = await orm.findOne(
      User, 
      { id: payload.id },
      { cache: 1000*60*60 }, //Cache Auth for 1 hour
    );
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));


/** Local Authentication (Login) */
passport.use(new LocalStrategy({ 
  usernameField: 'email', 
  passwordField: 'password',
  passReqToCallback:  true, 
}, async (req, email, password, done) => {
  try {
    const orm = (await getOrm()).em.fork();
    
    const user = await orm.findOne(User, { email }, { populate: ['userInfo', 'userType'] });
    
    // Incorrect email
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
    
    
    const isMatch = await authHelper.validate(password, user.password, user.password_salt);
    // Incorrect password 
    if (!isMatch) {      
      return done(null, false, { message: 'Incorrect email or password.' });
    }
    const remember = req.body.remember;
    user.token = generateJwtToken(user, remember);
    user.tokenExpiration = new Date(Date.now() + (60 * 60 * 1000 * (remember ? (24 * 7) : 1)) );
    await orm.persistAndFlush(user);
    logger.info('Login Attempt Success', req)
    return done(null, user, { message: 'Logged in successfully.' });
  } catch (err) {
    logger.info('Login Attempt Error', req)
    logger.error('Login Attempt Error', req)
    return done(err);
  }
}));

