import globals from "globals";
import eslintPluginJs from "@eslint/js";

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
