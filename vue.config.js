const { ModuleFederationPlugin } = require('webpack').container;
const path = require("path");

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/aleasper/'
    : '/',
    configureWebpack: {
        plugins: [
            new ModuleFederationPlugin({
                name: 'app_a',
                filename: 'remoteEntry.js',
                remotes: {
                    'Remote': `Remote@http://localhost:4000/moduleEntry.js`,
                },
                exposes: {},
                shared: {}
            })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, "build"),
            },
            port: 8080,
        },
    }
}