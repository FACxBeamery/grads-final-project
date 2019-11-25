module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ["airbnb", "airbnb/hooks", "prettier"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018
    }
};
