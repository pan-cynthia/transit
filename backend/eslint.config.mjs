import globals from "globals";
import eslintPluginJs from "@eslint/js";

export default [
  eslintPluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
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
