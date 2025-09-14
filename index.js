import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config(); // load .env if present

/**
 * Schema type definition
 * @typedef {Object} EnvSchema
 * @property {"string"|"number"|"boolean"} type
 * @property {boolean} [required]
 * @property {any} [default]
 * @property {any[]} [oneOf]
 */

/**
 * Guard function to validate environment variables
 * @param {Record<string, EnvSchema>} schema
 * @returns {Record<string, any>}
 */
export function guard(schema) {
  const result = {};

  for (const key in schema) {
    const rules = schema[key];
    let value = process.env[key];

    try {
      // Missing check
      if (value == null || value === "") {
        if (rules.required && rules.default === undefined) {
          console.error(chalk.red(`❌ Missing required environment variable: ${key}`));
          process.exit(1);
        }
        value = rules.default;
      }

      // Type casting
      if (rules.type === "number" && value != null) {
        const num = Number(value);
        if (isNaN(num)) {
          console.error(chalk.red(`❌ Environment variable ${key} must be a number (got "${value}")`));
          process.exit(1);
        }
        value = num;
      }

      if (rules.type === "boolean" && value != null) {
        value = value === "true" || value === "1";
      }

      // oneOf validation
      if (rules.oneOf && !rules.oneOf.includes(value)) {
        console.error(
          chalk.red(`❌ Environment variable ${key} must be one of: ${rules.oneOf.join(", ")}`)
        );
        process.exit(1);
      }

      result[key] = value;

      // Success feedback
      console.log(chalk.green(`✔ ${key} loaded successfully`));

    } catch (err) {
      console.error(chalk.red(`❌ Error validating ${key}: ${err.message || err}`));
      process.exit(1);
    }
  }

  return result;
}
