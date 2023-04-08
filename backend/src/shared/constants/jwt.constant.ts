import configuration from '../../config/configuration';

export const JwtConstant = {
  SECRET: configuration().JWT_SECRET,
  signOptions: {
    expiresIn: '7d',
  },
};
