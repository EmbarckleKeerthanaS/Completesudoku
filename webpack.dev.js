const {merge} = require('webpack-merge')
const commonconfig = require('./webpack.config')
const config = {
    mode:"development",
}

module.exports = merge(commonconfig,config);