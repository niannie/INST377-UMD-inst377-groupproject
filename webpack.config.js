const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');  // Import the plugin

module.exports = {
    entry: './src/index.js', // Correct path to your main JS file
    output: {
        path: path.resolve(__dirname, 'dist'), // Output folder
        filename: 'bundle.js', // Output file name
    },
    mode: 'development', // Change to 'production' for optimized builds
    module: {
        rules: [
            // Rule for handling CSS files
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // These loaders will inject your CSS into the page
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // HTML template for the main page
        new HtmlWebpackPlugin({
            template: './src/index.html', // Your HTML template
            filename: 'index.html', // The name of the output file
            scriptLoading: 'defer',  // Add this to defer the script loading
        }),
        // HTML template for the join page
        new HtmlWebpackPlugin({
            template: './src/join.html',
            filename: 'join.html',
            scriptLoading: 'defer',  // Add this to defer the script loading
        }),
        // HTML template for the about page
        new HtmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html', 
            inject: 'body', 
            scriptLoading: 'defer',  // Ensure script is deferred
        }),
        // HTML template for the help page
        new HtmlWebpackPlugin({
            template: './src/help.html',
            filename: 'help.html', 
            inject: 'body', 
            scriptLoading: 'defer',  // Ensure script is deferred
        }),
        // HTML template for the login page
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html', 
            scriptLoading: 'defer',  // Add this to defer the script loading
        }),
        // HTML template for the 404 page
        new HtmlWebpackPlugin({
            template: './src/404.html', 
            filename: '404.html', 
            scriptLoading: 'defer',  // Add this to defer the script loading
        }),
        // HTML template for user profile page
        new HtmlWebpackPlugin({
            template: './src/userProfile.html', 
            filename: 'userProfile.html', 
            scriptLoading: 'defer',  // Add this to defer the script loading
        }),
        // HTML template for terms page
        new HtmlWebpackPlugin({
            template: './src/terms.html',
            filename: 'terms.html', 
            scriptLoading: 'defer',  // Add this to defer the script loading
        }),
        // HTML template for privacy page
        new HtmlWebpackPlugin({
            template: './src/privacy.html', 
            filename: 'privacy.html', 
            scriptLoading: 'defer',  // Add this to defer the script loading
        }),
        // Copy header and footer HTML files to dist folder
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/header.html', to: 'header.html' },  // Copy header.html
                { from: 'src/footer.html', to: 'footer.html' },  // Copy footer.html
            ],
        }),
    ],
    devtool: 'source-map', // For debugging
    devServer: {
        static: path.resolve(__dirname, 'dist'),  // Serve files from the 'dist' folder
        open: true, // Automatically open the browser
        port: 8000, // Specify the port (you can change it)
    },
}; 
