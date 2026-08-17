import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Base JS rules (replacing your invalid plugins/extends block)
  js.configs.recommended,

  // 2. Base React rules
  pluginReact.configs.flat.recommended,

  // 3. Your custom project overrides (Must be at the bottom)
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser // Safely merges browser globals
      }
    },
    rules: {
      // Correctly turns off the rule after the plugin enables it
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    }
  },
  {
    files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.jest // Injects describe, it, expect, test, etc.
      }
    }
  }
]);
