const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.tsx",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // Handle both .ts and .tsx files
                use: [{
                    loader: "ts-loader",
                    options: {
                        compilerOptions: {
                            noEmit: false, // Allows TypeScript to compile but not emit files (useful for React and Babel handling the emit)
                        },
                    },
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/, // Handle .jsx and .js files
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // Use Babel to transpile .jsx files
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"], // Add the React preset
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"], // Handle CSS files
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" }, // Copy the manifest.json
            ],
        }),
        ...getHtmlPlugins(["index"]), // Dynamically generate HTML files for each entry
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"], // Resolve both .tsx and .jsx extensions
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js", // Output the compiled JS files
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map((chunk) => new HTMLPlugin({
        title: "React extension",
        filename: `${chunk}.html`,
        chunks: [chunk], // Include only the specified chunk
    }));
}
