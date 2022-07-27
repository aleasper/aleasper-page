const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {

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
        ]
    }
}