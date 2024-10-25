module.exports = {
  defaultServerResponse: {
    status: 400,
    message: '',
    body: {}
  },
  default: {
    DEFAULT_PRIVATE_KEY: 'my-own-secret-key'
  },
  productMessage: {
    PRODUCT_CREATED: 'Product created successfully.',
    PRODUCT_UPDATED: 'Product updated successfully.',
    PRODUCT_FETCHED: 'Products fetched successfully.',
    PRODUCT_DELETED: 'Product deleted successfully',
    PRODUCT_NOT_FOUND: 'Product not available'
  },
  userMessage: {
    SIGNUP_SUCCESS: 'Signed up successfully',
    USER_EXISTS: 'User already exists with given email',
    USER_NOT_REGISTERED: 'User is not registered',
    INVALID_CREDENTIAL: 'Invalid email or password',
    LOGIN_SUCCESS: 'Login successful'
  },

  requestValidationMessage: {
    BAD_REQUEST: 'Invalid fields',
    TOKEN_MISSING: 'Token missing'
  },
  databaseMessage: {
    INVALID_ID: 'Invalid Id'
  }
}