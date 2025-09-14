````markdown
# 🌱 env-guard

**env-guard** is a **super lightweight Node.js package** that helps you **validate and type-check environment variables** from your `.env` file or system environment.  

It ensures:
- Required variables exist.  
- Values are correctly typed (string, number, boolean).  
- Allowed values can be restricted with `oneOf`.  
- Default values are set if missing.  
- Errors are displayed in **red ❌**, while successful validations show up in **green ✔**.  

This prevents hard-to-debug runtime issues caused by missing or invalid configuration.

---

## 📖 Introduction

Almost every Node.js project relies on environment variables (`.env`) for sensitive data such as database URLs, API keys, ports, and secrets.  

The problem?  
👉 Developers often forget to validate these variables.  

That leads to **silent failures** or worse — production crashes due to missing or incorrectly typed values.  

**env-guard** solves this by acting as a **type-safe guard** for your environment configuration.  
It ensures your app won’t even start unless the required environment variables are valid.  

---

## ✨ Features

- ✅ **Validation** – Check that required variables exist.  
- 🔢 **Type-checking** – Casts values to `string`, `number`, or `boolean`.  
- 🎯 **Restrict values** – Allow only certain values with `oneOf`.  
- 🛡️ **Defaults** – Provide safe fallback values.  
- 🌈 **Pretty messages** – Clear red ❌ error messages and green ✔ success messages.  
- ⚡ **Lightweight** – No heavy dependencies, just `dotenv` + `chalk`.  
- 🚀 **Crash-proof** – Fails fast with clear errors, so no silent bugs.  

---

## 📦 Installation

```bash
npm install env-guard
````

---

## 🚀 Quick Usage

### Example `.env`

```env
PORT=3000
NODE_ENV=development
DEBUG=true
```

### Example Code

```js
import { guard } from "env-guard";

const env = guard({
  PORT: { type: "number", required: true },
  NODE_ENV: { type: "string", required: true, oneOf: ["development", "production", "test"] },
  DEBUG: { type: "boolean", default: false }
});

console.log(env.PORT + 1);   // number
console.log(env.NODE_ENV);   // string
console.log(env.DEBUG);      // boolean
```

### Example Output

When running, you’ll see output like:

```
✔ PORT loaded successfully
✔ NODE_ENV loaded successfully
✔ DEBUG loaded successfully
```

If something is wrong (e.g., missing or invalid type), you’ll see:

```
❌ Missing required environment variable: PORT
```

---

## ⚙️ API

### `guard(schema)`

**Parameters:**

* `schema`: An object describing expected environment variables.

Each key is an environment variable, and the value is a schema definition:

| Option     | Type                                | Description                               |
| ---------- | ----------------------------------- | ----------------------------------------- |
| `type`     | `"string" \| "number" \| "boolean"` | Expected type of the variable.            |
| `required` | `boolean`                           | Whether this variable must exist.         |
| `default`  | `any`                               | Fallback value if variable is missing.    |
| `oneOf`    | `any[]`                             | Restrict variable to one of these values. |

**Returns:**

* An object with validated and type-cast environment variables.

---

## 🧑‍💻 Example: Advanced Usage

```js
const env = guard({
  APP_NAME: { type: "string", required: true },
  PORT: { type: "number", required: true },
  DEBUG: { type: "boolean", default: false },
  LOG_LEVEL: { type: "string", oneOf: ["info", "warn", "error"], default: "info" }
});

console.log(`Starting ${env.APP_NAME} on port ${env.PORT}...`);
```

---

## 📁 Project Structure

```
env-guard/
 ├─ package.json      # Package metadata
 ├─ index.js          # Main library file
 ├─ index.d.ts        # TypeScript types
 ├─ README.md         # Documentation
 └─ .gitignore        # Ignore node_modules and .env
```

---

## 🤝 Contributing

Contributions are welcome! 🚀

If you’d like to improve **env-guard**:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m "Added awesome feature"`)
4. Push to your branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📜 License

MIT License © 2025 [Dennis Muuo](https://github.com/dennismutuku2024)

---

✅ With this package, you’ll **never again forget a required `.env` variable**.
**env-guard** makes your configuration safe, predictable, and developer-friendly.

```

---

Would you like me to also **include live usage screenshots or GIFs** (showing green/red terminal outputs) in the README so it looks even more professional on GitHub and npm?
```
