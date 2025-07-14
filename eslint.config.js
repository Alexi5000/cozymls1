import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      boundaries: boundaries,
    },
    settings: {
      "boundaries/elements": [
        {
          type: "app",
          pattern: "src/app/**/*",
        },
        {
          type: "pages",
          pattern: "src/pages/**/*",
        },
        {
          type: "widgets",
          pattern: "src/widgets/**/*",
        },
        {
          type: "features",
          pattern: "src/features/**/*",
        },
        {
          type: "entities",
          pattern: "src/entities/**/*",
        },
        {
          type: "shared",
          pattern: "src/shared/**/*",
        },
        {
          type: "processes",
          pattern: "src/processes/**/*",
        },
      ],
      "boundaries/ignore": [
        "**/*.test.*",
        "**/*.spec.*",
        "**/__tests__/**",
        "**/__mocks__/**",
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      // FSD Layer Boundaries Rules
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            // shared → no deps (can only import from external packages)
            {
              from: "shared",
              disallow: ["app", "pages", "widgets", "features", "entities", "processes"],
            },
            // entities → can import shared
            {
              from: "entities",
              allow: ["shared"],
              disallow: ["app", "pages", "widgets", "features", "processes"],
            },
            // features → entities/shared
            {
              from: "features",
              allow: ["entities", "shared"],
              disallow: ["app", "pages", "widgets", "processes"],
            },
            // widgets → features/entities/shared
            {
              from: "widgets",
              allow: ["features", "entities", "shared"],
              disallow: ["app", "pages", "processes"],
            },
            // processes → features/entities/shared
            {
              from: "processes",
              allow: ["features", "entities", "shared"],
              disallow: ["app", "pages", "widgets"],
            },
            // pages → any layer except app
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared", "processes"],
              disallow: ["app"],
            },
            // app → any layer
            {
              from: "app",
              allow: ["pages", "widgets", "features", "entities", "shared", "processes"],
            },
          ],
        },
      ],
      "boundaries/no-private": [
        "error",
        {
          allowUncles: false,
        },
      ],
    },
  }
);
