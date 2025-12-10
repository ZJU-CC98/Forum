const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const context = path.resolve(__dirname, "..");

// Keep a single main entry; themes are now lazy-loaded through the runtime.
const entries = {
    main: "./Main.tsx",
};

const resolve = {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
};

const makeTsRule = (options = {}) => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: "ts-loader",
            options,
        },
    ],
});

const makeScssRule = ({ minimize = false, extract = false } = {}) => {
    const styleLoader = extract ? MiniCssExtractPlugin.loader : "style-loader";

    const cssLoaderOptions = {
        sourceMap: !minimize,
    };

    if (minimize) {
        cssLoaderOptions.minimize = true;
    }

    return {
        test: /\.scss$/,
        use: [
            styleLoader,
            {
                loader: "css-loader",
                options: cssLoaderOptions,
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: !minimize,
                },
            },
        ],
    };
};

const getEntries = ({ includeThemes = false } = {}) =>
    includeThemes ? entries : { main: entries.main };

module.exports = {
    context,
    entries,
    resolve,
    makeTsRule,
    makeScssRule,
    getEntries,
    MiniCssExtractPlugin,
};

