const path = require('path');

module.exports = {
    mode:"development",
    entry: {
        injection:"./src/injection.js"
    },
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename: "[name].js"
    },
    devtool: "source-map",

}