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


// passport reference
export { default as passport } from 'passport';

// Create a function to generate a JWT token
export function generateJwtToken(user: User): string {
  const payload = { id: user.id };
  const secret = ENV.JWT_SECRET;
  const options: jwt.SignOptions = {
    expiresIn: '1h', // Set the token expiration time
  };
  return jwt.sign(payload, secret, options);
}


/** JWT Authentication (Bearer Token) */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV.JWT_SECRET,
};
passport.use(new JwtStrategy(options, async (payload, done) => {
  try {
    const orm = await getOrm();
    const user = await orm.em.findOne(User, { id: payload.sub });
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
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
  console.log('logging in')
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

    user.token = generateJwtToken(user);
    user.tokenExpiration = new Date(Date.now() + 60 * 60 * 1000);
    console.log('HERE@@@@');
    await orm.persistAndFlush(user);
    return done(null, user, { message: 'Logged in successfully.' });
  } catch (err) {
    return done(err);
  }
}));

