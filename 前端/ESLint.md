在 React 项目中添加 ESLint 检查是一个很好的实践，可以帮助保持代码的质量和一致性。以下是具体的步骤来在 React 项目中设置 ESLint：

### 1. 安装 ESLint 和相关插件

首先，你需要安装 ESLint 及其相关的插件。打开终端，进入你的项目目录，然后运行以下命令：

```bash
npm install eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --save-dev
```

如果你使用 `yarn`，可以使用以下命令：

```bash
yarn add eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --dev
```

### 2. 初始化 ESLint 配置

接下来，初始化 ESLint 配置文件。这将创建一个基本的 `.eslintrc.json` 配置文件：

```bash
npx eslint --init
```

这个命令会提示你选择一些选项，例如：

- **How would you like to use ESLint?** 选择适合你的选项，例如“To check syntax, find problems, and enforce code style”。
- **What type of modules does your project use?** 选择“JavaScript modules (import/export)”或“CommonJS (require/exports)”。
- **Which framework does your project use?** 选择“React”。
- **Does your project use TypeScript?** 选择“否”或“是”，取决于你的项目。
- **Where does your code run?** 选择“浏览器”和/或“Node”。
- **What format do you want your config file to be in?** 选择“JSON”。

根据你的选择，`.eslintrc.json` 文件会被创建并包含相关的配置。

### 3. 配置 ESLint

编辑 `.eslintrc.json` 文件以包含 React 和 React Hooks 的规则。以下是一个基本的配置示例：

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "jsx-a11y"
  ],
  "rules": {
    // 在这里添加你的自定义规则
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### 4. 添加 ESLint 脚本到 `package.json`

在 `package.json` 中添加一个脚本来运行 ESLint：

```json
"scripts": {
  "lint": "eslint src/**/*.{js,jsx}"
}
```

这样，你可以通过运行 `npm run lint` 或 `yarn lint` 来检查你的代码。

### 5. 可选：安装 Prettier 以实现代码格式化

如果你还想使用 Prettier 来自动格式化代码，可以安装 `prettier` 和相关的 ESLint 插件：

```bash
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

或者使用 `yarn`：

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
```

然后在 `.eslintrc.json` 文件中扩展 Prettier 的配置：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "plugins": [
    "react",
    "react-hooks",
    "jsx-a11y",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### 6. 可选：设置 ESLint 自动修复

你可以配置 ESLint 自动修复常见的问题，只需添加一个 `--fix` 选项到你的 lint 脚本中：

```json
"scripts": {
  "lint": "eslint src/**/*.{js,jsx} --fix"
}
```

这样，运行 `npm run lint` 或 `yarn lint` 时，ESLint 会尝试自动修复问题。

### 7. 集成到 IDE

许多现代 IDE（如 VS Code）支持 ESLint 插件。确保安装并启用 ESLint 插件，以便在开发过程中实时检查代码质量。

### 总结

通过这些步骤，你可以在 React 项目中成功设置 ESLint 来检查代码质量。这将帮助你遵循最佳实践并保持代码一致性。