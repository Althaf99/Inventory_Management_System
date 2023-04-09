export default class ApiTimeoutError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.stack = new Error(message).stack;
    this.name = 'ApiTimeoutError';
  }
}
