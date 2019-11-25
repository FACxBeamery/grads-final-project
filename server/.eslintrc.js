module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true
    },
    extends: "eslint:recommended",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        indent: ["error", 4],
        "max-len": ["error", { code: 80 }],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-multiple-empty-lines": [2, { max: 2, maxEOF: 1 }]
    }
};
