/*
 * Create and export configurations variables
 *
*/

// Container for all environments
const environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': 'staging'
};

// Production environment
environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production'
};

// Determine which enviroment was passed as a command-line
// argument
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above,
// if not default to staging
const enviromentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = enviromentToExport;