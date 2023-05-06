import crypto from 'crypto';

export default {
  async encrypt(password: string): Promise<HashedPassword | undefined> {
    try {
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = crypto
        .createHash('sha256')
        .update(salt + password)
        .digest('hex');
      return Promise.resolve({ salt, hashedPassword });
    } catch (err) {
      console.error('[PASSWORD ENCRYPTION FAILED]');
      return Promise.reject(err);
    }
  },

  validate(password: string, hashedPassword: string, salt: string) {
    try {
      const _hashedPassword = crypto
        .createHash('sha256')
        .update(salt + password)
        .digest('hex');
      return Promise.resolve(_hashedPassword === hashedPassword);
    } catch (err) {
      console.error('[PASSWORD VALIDATION FAILED]');
      return Promise.reject(err);
    }
  },
};

export interface HashedPassword {
  salt: string;
  hashedPassword: string;
}
