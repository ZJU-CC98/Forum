import webpack, { Configuration } from 'webpack';
import path from 'path';


import HtmlWebpackPlugin, { MinifyOptions } from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import fs from 'fs';
import { minify } from 'html-minifier-terser';

declare var __dirname: string;

const minifyOptions: MinifyOptions = {
  collapseWhitespace: true,
  minifyJS: true,
};

/**
 * Webpack 核心配置
 */
const config: () => Promise<Configuration> = async () => { return {

  node: {
    global: true,
    __dirname: true,
    __filename: true
  },

  // webpack 4 only
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  entry: {
    main: "./src/Main.tsx",
    //冬季
    css_blue: "./src/Themes/wuteng_blue.scss",
    //春季（浅）
    css_green: "./src/Themes/forgive_green.scss",
    //春季（深）
    css_more_green: "./src/Themes/deep_dark_green.scss",
    //夏季
    css_summer: "./src/Themes/summer.scss",
    //秋季（橙）
    css_autumn_orange: "./src/Themes/autumn_orange.scss",
    //秋季（红）
    css_autumn_red: "./src/Themes/autumn_red.scss",
    //双十一
    css_singleday: "./src/Themes/singleday_pink.scss",
    //中秋（暗）
    css_mid_autumn_dark: "./src/Themes/mid_autumn_dark.scss",
    //中秋（亮）
    css_mid_autumn_light: "./src/Themes/mid_autumn_light.scss",
    //小雪（暗）
    css_light_snow_dark: "./src/Themes/light_snow_dark.scss",
    //小雪（亮）
    css_light_snow_light: "./src/Themes/light_snow_light.scss",
    //春节（暗）
    css_spring_festival_dark: "./src/Themes/spring_festival_dark.scss",
    //春节（亮）
    css_spring_festival_light: "./src/Themes/spring_festival_light.scss",
    //仲春
    css_zhongchun: "./src/Themes/zhongchun.scss",
    //端午
    css_dragon_boat_festival: "./src/Themes/dragon_boat_festival.scss",
    //清明
    css_qingming: "./src/Themes/qingming.scss",
    //秋色之空（暗）
    css_autumn_2022_dark: "./src/Themes/autumn_2022_dark.scss",
    //秋色之空（亮）
    css_autumn_2022_light: "./src/Themes/autumn_2022_light.scss",
    //冬日暖雪（暗）
    css_winter_2022_dark: "./src/Themes/winter_2022_dark.scss",
    //冬日暖雪（亮）
    css_winter_2022_light: "./src/Themes/winter_2022_light.scss",
    //春樱日和（暗）
    css_spring_2023_dark: "./src/Themes/spring_2023_dark.scss",
    //春樱日和（亮）
    css_spring_2023_light: "./src/Themes/spring_2023_light.scss",
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "static/scripts/[name]-[chunkhash:8].js",
  },
  devtool: false,
  externals: {
    jquery: "$",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/Template.ejs",
      filename: "static/index.html",
      minify: minifyOptions,
      inject: false,
      templateParameters: {
        errorTemplate: minify((await fs.promises.readFile("./src/error.html")).toString(), minifyOptions),
        unsupportedTemplate: minify((await fs.promises.readFile("./src/unsupported.html")).toString(), minifyOptions),
      },
    }),
    // clean dist
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "dist/static/scripts", 
        "dist/static/content", 
        "dist/static/index.html", "dist/static/reset.html"
      ]}),
    new CopyPlugin( {
      patterns: [
        { from: "node_modules/jquery/dist", to: "static/scripts/lib/jquery/" },
        { from: "node_modules/moment", to: "static/scripts/lib/moment/" },
        { from: "node_modules/bootstrap/dist", to: "static/scripts/lib/bootstrap/" },
        { from: "node_modules/bootstrap-icons", to: "static/scripts/lib/bootstrap-icons/" },
        { from: "node_modules/frowser/build", to: "static/scripts/lib/frowser/" },
        { from: "node_modules/font-awesome", to: "static/content/font-awesome/" },
        { from: "node_modules/mathjax-full", to: "static/scripts/lib/mathjax-full" },
        {
          from: "node_modules/spectrum-colorpicker/spectrum.js",
          to: "static/scripts/lib/spectrum/spectrum.js",
        },
        {
          from: "node_modules/dplayer/dist/DPlayer.min.css",
          to: "static/content/DPlayer.min.css",
        },
        {
          from: "node_modules/dplayer/dist/DPlayer.min.css.map",
          to: "static/content/DPlayer.min.css.map",
        },
        {
          from: "node_modules/aplayer/dist/APlayer.min.css",
          to: "static/content/APlayer.min.css",
        },
        {
          from: "node_modules/aplayer/dist/APlayer.min.css.map",
          to: "static/content/APlayer.min.css.map",
        },
        {
          from: "node_modules/hls.js/dist/hls.min.js",
          to: "static/content/hls.min.js",
        },
        {
          from: "reset.html",
          to: "static/reset.html",
        },
      ]
    }),
    new MiniCssExtractPlugin({
      filename:"static/content/[name]-[chunkhash:8].css"
    }),
    //new WebpackChunkHash({ algorithm: "md5" }),
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/}),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
          safari10: true,
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
}};

export default config;