// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        requireConfigFile: false,
        babelOptions: { presets: ["@babel/preset-react"] },
      },
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    // 👇 add React’s recommended rule set
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      "no-unused-vars": "warn",

      "react/react-in-jsx-scope": "off", // not needed in React 17+
      "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
