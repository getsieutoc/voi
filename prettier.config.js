module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],

  overrides: [
    {
      files: ["*.yaml", "*.json"],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      options: {
        printWidth: 80,
        singleQuote: true,
        trailingComma: "es5",
      },
    },
  ],
};
