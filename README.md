 env-guard

[![npm version](https://badge.fury.io/js/env-guard.svg)](https://badge.fury.io/js/env-guard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/dennismutuku2024/env-guard/workflows/Node.js%20CI/badge.svg)](https://github.com/dennismutuku2024/env-guard/actions)

**env-guard** is a **super lightweight Node.js package** that helps you **validate and type-check environment variables** from your `.env` file or system environment.

It ensures:
- ✅ Required variables exist
- 🔢 Values are correctly typed (string, number, boolean)
- 🎯 Allowed values can be restricted with `oneOf`
- 🛡️ Default values are set if missing
- 🌈 Errors are displayed in **red ❌**, while successful validations show up in **green ✔**

This prevents hard-to-debug runtime issues caused by missing or invalid configuration.

---

## 📖 Why env-guard?

Almost every Node.js project relies on environment variables (`.env`) for sensitive data such as database URLs, API keys, ports, and secrets.

**The problem?** 👉 Developers often forget to validate these variables.

That leads to **silent failures** or worse — production crashes due to missing or incorrectly typed values.

**env-guard** solves this by acting as a **type-safe guard** for your environment configuration. It ensures your app won't even start unless the required environment variables are valid.

---

## ✨ Features

- ✅ **Validation** – Check that required variables exist
- 🔢 **Type-checking** – Casts values to `string`, `number`, or `boolean`
- 🎯 **Restrict values** – Allow only certain values with `oneOf`
- 🛡️ **Defaults** – Provide safe fallback values
- 🌈 **Pretty messages** – Clear red ❌ error messages and green ✔ success messages
- ⚡ **Lightweight** – No heavy dependencies, just `dotenv` + `chalk`
- 🚀 **Crash-proof** – Fails fast with clear errors, so no silent bugs
- 📦 **Zero config** – Works out of the box with sensible defaults

---

## 📦 Installation

```bash
npm install env-guard
```

Or with yarn:

```bash
yarn add env-guard
```

---

## 🚀 Quick Start

### 1. Create your `.env` file

```env
PORT=3000
NODE_ENV=development
DEBUG=true
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
API_KEY=your-secret-key-here
```

### 2. Validate your environment variables

```js
import { guard } from "env-guard";

const env = guard({
  PORT: { type: "number", required: true },
  NODE_ENV: { 
    type: "string", 
    required: true, 
    oneOf: ["development", "production", "test"] 
  },
  DEBUG: { type: "boolean", default: false },
  DATABASE_URL: { type: "string", required: true },
  API_KEY: { type: "string", required: true }
});

// Now use your validated environment variables
console.log(`Server starting on port ${env.PORT}`);
console.log(`Environment: ${env.NODE_ENV}`);
console.log(`Debug mode: ${env.DEBUG}`);
```

### 3. See the magic ✨

**Successful validation:**
```
✔ PORT loaded successfully (3000)
✔ NODE_ENV loaded successfully (development)
✔ DEBUG loaded successfully (true)
✔ DATABASE_URL loaded successfully
✔ API_KEY loaded successfully
```

**When something goes wrong:**
```
❌ Missing required environment variable: DATABASE_URL
❌ Invalid value for NODE_ENV. Expected one of: development, production, test. Got: staging
❌ PORT must be a number. Got: "not-a-number"
```

---

## ⚙️ API Reference

### `guard(schema)`

Validates environment variables against the provided schema.

**Parameters:**

- `schema`: An object describing expected environment variables

**Schema Definition:**

Each key represents an environment variable name, with the following options:

| Option     | Type                                | Required | Description                                    |
|------------|-------------------------------------|----------|------------------------------------------------|
| `type`     | `"string" \| "number" \| "boolean"` | Yes      | Expected type of the variable                  |
| `required` | `boolean`                           | No       | Whether this variable must exist (default: false) |
| `default`  | `any`                               | No       | Fallback value if variable is missing          |
| `oneOf`    | `any[]`                             | No       | Restrict variable to one of these values       |

**Returns:**

An object with validated and type-cast environment variables.

**Throws:**

- `Error` if validation fails for any required variable or type mismatch

---

## 📚 Examples

### Basic Usage

```js
import { guard } from "env-guard";

const env = guard({
  APP_NAME: { type: "string", required: true },
  PORT: { type: "number", default: 3000 },
  DEBUG: { type: "boolean", default: false }
});
```

### Advanced Configuration

```js
const env = guard({
  // Database configuration
  DB_HOST: { type: "string", required: true },
  DB_PORT: { type: "number", default: 5432 },
  DB_SSL: { type: "boolean", default: false },
  
  // Application settings
  NODE_ENV: { 
    type: "string", 
    required: true,
    oneOf: ["development", "staging", "production"]
  },
  LOG_LEVEL: { 
    type: "string", 
    oneOf: ["debug", "info", "warn", "error"], 
    default: "info" 
  },
  
  // Feature flags
  ENABLE_CACHING: { type: "boolean", default: true },
  CACHE_TTL: { type: "number", default: 3600 },
  
  // External services
  REDIS_URL: { type: "string", required: true },
  JWT_SECRET: { type: "string", required: true }
});

console.log(`🚀 Starting ${env.APP_NAME || 'Application'}`);
console.log(`📊 Environment: ${env.NODE_ENV}`);
console.log(`🔧 Debug: ${env.DEBUG ? 'ON' : 'OFF'}`);
```

### With Express.js

```js
import express from 'express';
import { guard } from 'env-guard';

// Validate environment before starting server
const env = guard({
  PORT: { type: "number", default: 3000 },
  NODE_ENV: { 
    type: "string", 
    oneOf: ["development", "production"], 
    default: "development" 
  },
  JWT_SECRET: { type: "string", required: true },
  DATABASE_URL: { type: "string", required: true }
});

const app = express();

app.listen(env.PORT, () => {
  console.log(`✅ Server running on port ${env.PORT}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
});
```

---

## 🧪 Type Safety with TypeScript

env-guard comes with built-in TypeScript support:

```typescript
import { guard } from "env-guard";

interface AppConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  DEBUG: boolean;
  API_KEY: string;
}

const env = guard({
  PORT: { type: "number", required: true },
  NODE_ENV: { 
    type: "string", 
    required: true, 
    oneOf: ["development", "production", "test"] 
  },
  DEBUG: { type: "boolean", default: false },
  API_KEY: { type: "string", required: true }
}) as AppConfig;

// Full type safety!
const port: number = env.PORT;
const isProduction: boolean = env.NODE_ENV === "production";
```

---

## 🚨 Error Handling

env-guard provides clear, actionable error messages:

```js
try {
  const env = guard({
    PORT: { type: "number", required: true },
    NODE_ENV: { type: "string", oneOf: ["dev", "prod"] }
  });
} catch (error) {
  console.error("Environment validation failed:", error.message);
  process.exit(1);
}
```

Common error scenarios:

1. **Missing required variable**: Clear indication of what's missing
2. **Type mismatch**: Shows expected vs actual type
3. **Invalid oneOf value**: Lists all valid options
4. **Parse errors**: Helpful hints for boolean/number conversion

---

## 📁 Project Structure

```
env-guard/
├── package.json         # Package metadata and dependencies
├── index.js            # Main library implementation
├── index.d.ts          # TypeScript type definitions
├── README.md           # This documentation
├── LICENSE             # MIT license
└── .gitignore         # Git ignore rules
```

---

## 🔧 Development

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/dennismutuku2024/env-guard.git
cd env-guard

# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! 🚀

### How to contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/awesome-feature`)
3. **Commit** your changes (`git commit -m 'Add awesome feature'`)
4. **Push** to the branch (`git push origin feature/awesome-feature`)
5. **Open** a Pull Request

### Guidelines:

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

---

## 🐛 Issues and Support

Found a bug or have a feature request?

- 📧 **Email**: [dennismuuo.dev@gmail.com](mailto:dennismuuo.dev@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/dennismutuku2024/env-guard/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/dennismutuku2024/env-guard/discussions)

---

## 📄 License

MIT License © 2025 [Dennis Muuo](https://github.com/dennismutuku2024)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🙏 Acknowledgments

- Built with ❤️ by [Dennis Muuo](https://github.com/dennismutuku2024)
- Inspired by the need for better environment variable validation in Node.js
- Thanks to all contributors and users of this package



---

✅ **With env-guard, you'll never again forget a required `.env` variable.**  
**Make your configuration safe, predictable, and developer-friendly.**

---

*Happy coding! 🚀*
