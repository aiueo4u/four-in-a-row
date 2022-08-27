const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  plugins: ["import", "react", "jsx-a11y", "jest", "react-hooks"],
  rules: {
    "no-var": ERROR, // var禁止
    "object-shorthand": [ERROR, "always"], // オブジェクト定義時にショートハンド利用
    "prefer-arrow-callback": ERROR, // コールバックにはアロー関数を利用
    "prefer-const": [ERROR, { destructuring: "all" }], // 再代入を行わない変数はconstを利用
    "import/extensions": OFF,
    "import/no-unresolved": OFF, // 絶対パスでインポートする
    "import/order": [
      ERROR,
      {
        alphabetize: { order: "asc" },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        pathGroups: [
          { pattern: "assets/**/*", group: "internal" },
          { pattern: "components/**/*", group: "internal" },
          { pattern: "helpers/**/*", group: "internal" },
          { pattern: "hooks/**/*", group: "internal" },
          { pattern: "scenes/**/*", group: "internal" },
          { pattern: "services/**/*", group: "internal" },
          { pattern: "types/**/*", group: "internal" },
          { pattern: "utils/**/*", group: "internal" },
          { pattern: "react", group: "builtin", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["builtin", "object"],
      },
    ],
    "import/prefer-default-export": OFF, // デフォルトエクスポートを優先して使用する
    "no-undef": [ERROR, { typeof: true }], // 未定義の変数は利用しない
    "no-unused-vars": [
      // 未使用の定義(変数、関数)は削除する
      ERROR,
      { argsIgnorePattern: "^_+$", ignoreRestSiblings: true },
    ],
    "operator-assignment": [ERROR, "always"], // ショートハンドが使える場合はショートハンドで記載する

    "react/no-danger": OFF, // 危険なJSXプロパティの使用を禁止する
    "react/no-string-refs": OFF, // refsに文字列を渡すことを禁止する
    "react/forbid-prop-types": OFF, // 特定のpropTypeを禁止
    "react/display-name": OFF, // 一時的にOFF functional componentには必ず関数名をつける
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],

    "react-hooks/rules-of-hooks": "ERROR",

    "jsx-a11y/label-has-for": OFF, // labelタグに対してhtmlForを設定すること
    "jsx-a11y/click-events-have-key-events": OFF, // 非対話型コンテンツにclickイベントを設定を禁止する
    "jsx-a11y/label-has-associated-control": OFF, // ラベルタグにテキストラベルと関連するコントロールがあることを強制する
    "jsx-a11y/no-static-element-interactions": OFF, // アクセシビリティレイヤー意外にインタラクティブなイベントの付与を強制する

    // airbnbでdevDependencies: falseが設定されているため上書き
    "import/no-extraneous-dependencies": [
      ERROR,
      {
        devDependencies: true, // devDependenciesのimportを許可
      },
    ],

    // XXX: パッケージの更新に対応するためにOFFにするルール
    "array-callback-return": OFF,
    "arrow-body-style": OFF,
    camelcase: OFF,
    "consistent-return": OFF,
    "default-case": OFF,
    eqeqeq: OFF,
    "dot-notation": OFF,
    "func-names": OFF,
    "global-require": OFF,
    "no-else-return": OFF,
    "no-lonely-if": OFF,
    "no-loop-func": OFF,
    "no-nested-ternary": OFF,
    "no-param-reassign": OFF,
    "no-plusplus": OFF,
    "no-restricted-syntax": OFF,
    "no-shadow": OFF,
    "no-underscore-dangle": OFF,
    "no-unneeded-ternary": OFF,
    "no-unused-expressions": OFF,
    "no-use-before-define": OFF,
    "no-useless-return": OFF,
    "one-var": OFF,
    "prefer-destructuring": OFF,
    "prefer-template": OFF,
    radix: OFF,
    "react/require-default-props": OFF,
    "spaced-comment": OFF,
  },
  settings: {
    react: { version: "16.8.1" },
    typescript: {
      project: "./tsconfig.json",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      plugins: ["@typescript-eslint", "react-hooks", "css-modules"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json",
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/promise-function-async": [
          "error",
          {
            allowedPromiseNames: [],
            checkArrowFunctions: false,
            checkFunctionDeclarations: true,
            checkFunctionExpressions: false,
            checkMethodDeclarations: false,
          },
        ],
        "@typescript-eslint/no-unused-vars": [WARNING, { args: "none" }],
        "react/function-component-definition": [
          ERROR,
          { namedComponents: "arrow-function" },
        ],
        "react/prop-types": "off",
      },
    },
  ],
};
