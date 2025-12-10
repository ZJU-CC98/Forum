const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const context = path.resolve(__dirname, "..");

// Shared entry points for all builds.
const entries = {
    main: "./Main.tsx",
    //冬季
    css_blue: "./Themes/wuteng_blue.scss",
    //春季（浅）
    css_green: "./Themes/forgive_green.scss",
    //春季（深）
    css_more_green: "./Themes/deep_dark_green.scss",
    //夏季
    css_summer: "./Themes/summer.scss",
    //秋季（橙）
    css_autumn_orange: "./Themes/autumn_orange.scss",
    //秋季（红）
    css_autumn_red: "./Themes/autumn_red.scss",
    //双十一
    css_singleday: "./Themes/singleday_pink.scss",
    //中秋（暗）
    css_mid_autumn_dark: "./Themes/mid_autumn_dark.scss",
    //中秋（亮）
    css_mid_autumn_light: "./Themes/mid_autumn_light.scss",
    //小雪（暗）
    css_light_snow_dark: "./Themes/light_snow_dark.scss",
    //小雪（亮）
    css_light_snow_light: "./Themes/light_snow_light.scss",
    //春节（暗）
    css_spring_festival_dark: "./Themes/spring_festival_dark.scss",
    //春节（亮）
    css_spring_festival_light: "./Themes/spring_festival_light.scss",
    //仲春
    css_zhongchun: "./Themes/zhongchun.scss",
    //端午
    css_dragon_boat_festival: "./Themes/dragon_boat_festival.scss",
    //清明
    css_qingming: "./Themes/qingming.scss",
    //秋色之空（暗）
    css_autumn_2022_dark: "./Themes/autumn_2022_dark.scss",
    //秋色之空（亮）
    css_autumn_2022_light: "./Themes/autumn_2022_light.scss",
    //冬日暖雪（暗）
    css_winter_2022_dark: "./Themes/winter_2022_dark.scss",
    //冬日暖雪（亮）
    css_winter_2022_light: "./Themes/winter_2022_light.scss",
    //春樱日和（暗）
    css_spring_2023_dark: "./Themes/spring_2023_dark.scss",
    //春樱日和（亮）
    css_spring_2023_light: "./Themes/spring_2023_light.scss",
    //重阳（暗）
    css_chongyang_dark: "./Themes/chongyang_dark.scss",
    //重阳（亮）
    css_chongyang_light: "./Themes/chongyang_light.scss",
    //金舞迎春（暗）
    css_spring_festival_2025_dark: "./Themes/spring_festival_2025_dark.scss",
    //金舞迎春（亮）
    css_spring_festival_2025_light: "./Themes/spring_festival_2025_light.scss",
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

const makeScssRule = ({ minimize = false } = {}) => ({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
            {
                loader: "css-loader",
                options: minimize ? { minimize: true } : {},
            },
            "sass-loader",
        ],
    }),
});

module.exports = {
    context,
    entries,
    resolve,
    makeTsRule,
    makeScssRule,
};

