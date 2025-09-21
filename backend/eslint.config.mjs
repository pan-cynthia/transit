import eslintPluginJs from "@eslint/js";
import globals from "globals";

export default [
  eslintPluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    rules: {
      quotes: ["error", "double"], // enforce double quotes
      semi: ["error", "always"]
    }
  }
];
