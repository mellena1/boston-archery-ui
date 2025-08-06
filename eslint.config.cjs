const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");

const {
    fixupConfigRules,
} = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const reactRefresh = require("eslint-plugin-react-refresh");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.json", "./tsconfig.app.json", "./tsconfig.node.json"],
            tsconfigRootDir: __dirname,
        },
    },

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    )),

    plugins: {
        "react-refresh": reactRefresh,
    },

    rules: {
        "react-refresh/only-export-components": ["warn", {
            allowConstantExport: true,
        }],

        "semi": 2,

        "@typescript-eslint/no-unused-vars": ["error", {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_",
        }],

        "@typescript-eslint/no-empty-function": "off",

        "react/no-unescaped-entities": ["error", {
            "forbid": [">", "}"],
        }],

        "@typescript-eslint/no-floating-promises": ["error", {
            allowForKnownSafeCalls: [
                {
                    from: 'package',
                    name: 'NavigateFunction',
                    package: 'react-router',
                }
            ] 
        }],

        "@typescript-eslint/restrict-template-expressions": ["error", {
            allowNumber: true
        }]
    },

    settings: {
        "react": {
            "version": "detect",
        },
    },
}, globalIgnores(["**/dist", "**/*.js", "**/*.cjs", "**/jest.*", "testing-library.ts", "happydom.ts", "**/*.mjs"])]);
