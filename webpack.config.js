const pathModule = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    mode:"production",
    entry:"./src/index.js",
    output:{
        filename:"Main.js",
        path:pathModule.resolve(__dirname,"dist"),
        assetModuleFilename: 'images/[name][ext]'
    },
    module:{
        rules: [
            //css 
            //install css mini plug
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            //images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  //make style 
                  MiniCssExtractPlugin.loader, "css-loader", "sass-loader",
                ],
              },
          ],
    },
    plugins:[new HtmlWebpackPlugin(),new MiniCssExtractPlugin(),
      new CssMinimizerPlugin()
    ],
          optimization: {
            minimizer: [
                //terser
              "...",
              new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminMinify,
                  options: {
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      [ "mozjpeg",{ quality: 60}],
                      ["optipng", { optimizationLevel: 5 }],
                      // Svgo configuration here https://github.com/svg/svgo#configuration
                      [
                        "svgo",
                        {
                              name: 'preset-default',
                              params: {
                                overrides: {
                                  // customize plugin options
                                  convertShapeToPath: {
                                    convertArcs: true
                                  },
                                  // disable plugins
                                  convertPathData: false
                                }
                              }
                        }
                      ],
                    ],
                  },
                },
              }),
            ],
          }
       
}