export type EnvSchema = {
  type: "string" | "number" | "boolean";
  required?: boolean;
  default?: any;
  oneOf?: any[];
};

export function guard<T extends Record<string, EnvSchema>>(
  schema: T
): { [K in keyof T]: T[K]["type"] extends "number"
  ? number
  : T[K]["type"] extends "boolean"
    ? boolean
    : string };
