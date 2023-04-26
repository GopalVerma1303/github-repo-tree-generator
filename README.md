# github_folder_structure_readme_generator

This project is a TypeScript file (`index.ts`) that fetches repository data from GitHub using the [GitHub REST API](https://docs.github.com/en/rest/) and generates a nested folder structure tree.

## Usage

1. Install the dependencies using npm:

```bash
npm install
```

2. Build the TypeScript file using the build script in package.json:

```bash
npm run build
```

3. Run the generated JavaScript file using the start script in package.json:

```bash
npm run start
```

4. The generated folder structure tree will be printed to the console.

## Dependencies

- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for Node.js
- [typescript](https://www.npmjs.com/package/typescript) - TypeScript language compiler and tooling for JavaScript development

## Folder Structure
```bash
├── .gitignore
├── README.md
├── README_BASH.md
├── README_LINKS.md
├── index.js
├── index.ts
├── package-lock.json
└── package.json
```
