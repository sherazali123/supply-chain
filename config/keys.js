// key.js
// Author: Sheraz Ali
// Date: 16/09/2018
// the file to check environment and decides which configurations to pick

if(process.env.ENVIRONMENT === 'production'){
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}