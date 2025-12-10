const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const prodConfig = require("./prod");

module.exports = async () => {
    const base = await prodConfig();
    return merge(base, {
        plugins: [new BundleAnalyzerPlugin()],
    });
};

