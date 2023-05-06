export default {
  SUCCESS: {
    CODE: 200,
    MESSAGE: 'Operation completed successfully',
  },
  
  BAD_REQUEST: {
    CODE: 400,
    MESSAGE: 'Bad request',
  },
  
  UNAUTHORIZED: {
    CODE: 401,
    MESSAGE: 'Unauthorized',
  },
  
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: 'Not found',
  },
  
  SERVER_ERROR:  {
    CODE: 500,
    MESSAGE: 'Internal server error',
  },
} as const;
