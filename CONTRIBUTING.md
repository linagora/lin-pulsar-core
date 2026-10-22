# **CONTRIBUTING 🤝**

Thank you for contributing to **lin-pulsar-core**, the core front-end library of LinPulsar, the component catalog of the linOpenFactory platform.
This document explains the conventions, workflows, and best practices to follow when contributing.

---

# **📌 Git Conventions**

## **🌿 Branch Naming**

All branches must follow one of the following naming patterns:

| Type            | Pattern                           | Example                           |
| --------------- | --------------------------------- | --------------------------------- |
| **Main**        | `main` or `dev`                   | `main`                            |
| **Feature**     | `feature/<short-description>`     | `feature/plugin-zone-support`     |
| **Bugfix**      | `bugfix/<short-description>`      | `bugfix/fix-null-validation`      |
| **Improvement** | `improvement/<short-description>` | `improvement/refactor-core-types` |
| **Release**     | `release/<version>`               | `release/1.2.0`                   |
| **Hotfix**      | `hotfix/<short-description>`      | `hotfix/fix-critical-crash`       |

### **Rules**

- ✔ Allowed characters: lowercase letters, numbers, dashes (`-`), underscores (`_`), and dots (`.`)
- ✔ Names must be concise and descriptive
- ✔ Use English keywords and descriptions

---

## **📝 Commit Message Format (Conventional Commits)**

We follow the **Conventional Commits** specification:

```
<type>(<scope>): <short summary>
```

### **Accepted types**

* **feat** – Introduces, updates, or removes a feature in the API or UI
* **fix** – Resolves a bug in the API or UI originating from a previous feature
* **refactor** – Rewrites or restructures code without changing API or UI behavior
* **perf** – A specialized refactor focused on improving performance
* **style** – Addresses code style issues (e.g., whitespace, formatting, missing semicolons) without affecting behavior
* **test** – Adds missing tests or updates existing tests
* **docs** – Documentation-only changes
* **build** – Modifies build-related components (tooling, dependencies, versioning, CI/CD, etc.)
* **ops** – Changes to operational or infrastructure components (deployment, backup, recovery, etc.)
* **chore** – Miscellaneous maintenance tasks (e.g., updating `.gitignore`)

### **Examples**

```
feat(core): add identity validation helpers
fix(plugins): prevent crash on remote loading
docs(contributing): add commit format rules
```

---

## **🔏 Commit Signing (GPG)**

All commits **must be GPG-signed**:

```bash
git commit -S -m "feat(core): add new service"
```

Unsigned commits will be rejected.
If you need help setting up GPG signing, refer to your Git hosting provider’s documentation.

---

# **📚 Documentation Guidelines**

## **📁 Documentation Directory**

All functional or technical documentation must be placed inside:

```
/docs
```

Please keep this folder organized and up to date.

---

## **📊 Diagrams with Mermaid**

We use **Mermaid** for architecture diagrams, flowcharts, sequence diagrams, etc.

* Source files must be `.md` or `.mmd`
* They must be stored in the `docs` directory
* Generated images must be committed together with source files

### **Install Mermaid CLI**

```bash
npm install -g @mermaid-js/mermaid-cli
```

### **Generate a PNG**

```bash
mmdc -i docs/diagram.mmd -o docs/diagram.png
```

💡 Any modification to a Mermaid diagram **must include** regeneration of the corresponding PNG.

---

# **🚀 Development**

This project uses **pnpm** as the preferred package manager.
Node.js **22.19+** is recommended.

## **📦 Installation**

### ⭐ Quick Start

```sh
corepack enable
pnpm install
```

### Using pnpm (recommended)

```sh
pnpm install
```

### Using npm (legacy support and not recommended by the dev team)

```sh
npm install
```

---

## **🛠️ Build the Library**

```sh
pnpm build
# or (not recommended by the dev team)
npm run build
```

---

## **🔧 Development Mode**

```sh
pnpm dev
# or (not recommended by the dev team)
npm run dev
```

---

## **🧪 Run Tests**

```sh
pnpm test          # Runs the full test suite once
pnpm test:watch    # Runs tests in watch mode
pnpm test:coverage # Generates a coverage report

# or (not recommended by the dev team)
npm run test          # Runs the full test suite once
npm run test:watch    # Runs tests in watch mode
npm run test:coverage # Generates a coverage report
```

---

# **🧼 Code Quality**

We use **ESLint**, **Prettier**, and **TypeScript** to enforce consistent code style and reliability.

## **🔍 Lint**

```sh
pnpm lint
pnpm lint:fix
```

## **🎨 Format**

```sh
pnpm format
pnpm format:check
```

## **📘 Type Checking**

```sh
pnpm type-check
```

## **✔ Full Validation**

```sh
pnpm validate
```

## Copyright Headers

All source files located in the `src` folder must contain a copyright header at the beginning of the file. This header is based on the content of the `COPYRIGHT` file at the project root.

### Affected Files

Copyright headers are mandatory for the following files:

- TypeScript files (`.ts`)
- JavaScript files (`.js`)
- Vue files (`.vue`)

### Automatic Verification

An ESLint rule is configured via the `eslint-plugin-headers` plugin to check for the presence of these headers.

### Automatic Header Addition

If a file does not contain the required copyright header, you can add it automatically by running:

```bash
pnpm lint:fix
```

This command will analyze all files in the `src` folder and add missing headers according to the `COPYRIGHT` file.

### Manual Verification

To check compliance without modifying files, use:

```bash
pnpm lint
```

Any file without the appropriate header will be reported as a lint error.

---

# **🧪 E2E & Integration Testing**

Full E2E testing documentation is **Coming soon… ⏳**
This library will later integrate with the linOpenFactory front-end test runner.

---

# **🚀 Releases (Semantic Release)**

Releases are fully automated using **Semantic Release**.

When a merge is performed into `main`:

* The version bump is automatically calculated from commit messages
* `package.json` is updated
* A changelog entry is generated
* A Git tag is created

⚠ No manual intervention is needed.

---

# **📜 License**

This project is licensed under the **GNU Affero General Public License v3**.
See: [`LICENSE.md`](LICENSE.md)
