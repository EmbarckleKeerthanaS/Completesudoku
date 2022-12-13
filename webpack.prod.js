const {merge} = require('webpack-merge')
const commonconfig = require('./webpack.config')

const config = {
    mode:"production",
};

module.exports = merge(commonconfig,config);
