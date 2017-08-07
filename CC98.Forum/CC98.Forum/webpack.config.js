var webpack = require("webpack");
module.exports = () => {

    var config = {
        module: {
            rules: [
                { test: /\.tsx?$/, use: 'awesome-typescript-loader' }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        entry: {
            'script': './App.tsx',
            vendor: ["react-router", "react-router-dom"]
        },
        output: {
            filename: 'final.js',
            path: __dirname + '/wwwroot'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.final.js" })
        ],
        externals: {
            "react": "React",
            "react-dom":"ReactDOM"
        }
    };

    return [config];
};