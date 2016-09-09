var databaseURIs = {
  test: 'mongodb://localhost/one-test',
  development: 'mongodb://localhost/one-dev',
  production: process.env.MONGODB_URI || 'mongodb://localhost/one-prod'
}

module.exports = function(env) {
  return databaseURIs[env];
}