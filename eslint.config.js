// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "no-restricted-syntax": ["error", "IfStatement > ExpressionStatement"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["enumMember", "typeLike"],
          format: ["PascalCase"],
          custom: {
            regex: "(My|my)(?=[A-Z]\\w*)",
            match: false,
          },
        },
        {
          selector: ["parameter"],
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: [
            "variable",
            "function",
            "method",
            "classProperty",
            "typeProperty",
          ],
          format: ["camelCase"],
          custom: {
            regex: "(My|my)(?=[A-Z]\\w*)",
            match: false,
          },
        },
        {
          selector: ["variable"],
          format: ["UPPER_CASE", "camelCase"],
          modifiers: ["global"],
          custom: {
            regex: "(My|my)(?=[A-Z]\\w*)",
            match: false,
          },
        },
        {
          selector: ["variable"],
          types: ["function"],
          format: ["camelCase"],
        },
        {
          selector: "interface",
          custom: {
            regex: "[Ii](?=[A-Z]\\w*)",
            match: false,
          },
          format: ["PascalCase"],
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
        },
      ],
      complexity: ["error", 5],
      "max-classes-per-file": ["error", 1],
      eqeqeq: ["error", "always"],
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);