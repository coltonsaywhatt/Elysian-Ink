import { readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

const ENV_FILES = [".env.local", ".env"];
const TOKEN_KEY = "INSTAGRAM_ACCESS_TOKEN";
const REFRESH_URL = "https://graph.instagram.com/refresh_access_token";

async function findEnvFile(cwd) {
  for (const candidate of ENV_FILES) {
    const fullPath = path.join(cwd, candidate);
    try {
      await access(fullPath);
      return fullPath;
    } catch {}
  }

  return path.join(cwd, ".env");
}

function readEnvValue(envText, key) {
  const line = envText
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${key}=`));

  if (!line) return null;
  const value = line.slice(key.length + 1).trim();
  return value || null;
}

function upsertEnvValue(envText, key, value) {
  const lines = envText.split(/\r?\n/);
  const nextLine = `${key}=${value}`;
  const index = lines.findIndex((line) => line.startsWith(`${key}=`));

  if (index >= 0) {
    lines[index] = nextLine;
    return lines.join("\n");
  }

  if (lines.length > 0 && lines[lines.length - 1] !== "") {
    lines.push(nextLine);
  } else if (lines.length > 0) {
    lines[lines.length - 1] = nextLine;
  } else {
    lines.push(nextLine);
  }

  return lines.join("\n");
}

async function main() {
  const cwd = process.cwd();
  const envPath = await findEnvFile(cwd);
  const envText = await readFile(envPath, "utf8").catch((error) => {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return "";
    }
    throw error;
  });

  const token = readEnvValue(envText, TOKEN_KEY);
  if (!token) {
    throw new Error(`${TOKEN_KEY} is missing in ${path.basename(envPath)}.`);
  }

  const endpoint = new URL(REFRESH_URL);
  endpoint.searchParams.set("grant_type", "ig_refresh_token");
  endpoint.searchParams.set("access_token", token);

  const response = await fetch(endpoint, { method: "GET" });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof payload?.error?.message === "string"
        ? payload.error.message
        : `Instagram refresh failed with status ${response.status}.`;
    throw new Error(message);
  }

  const nextToken =
    typeof payload.access_token === "string" && payload.access_token.trim()
      ? payload.access_token.trim()
      : token;

  const nextEnv = upsertEnvValue(envText, TOKEN_KEY, nextToken);
  await writeFile(envPath, `${nextEnv}\n`, "utf8");

  const expiresIn =
    typeof payload.expires_in === "number" ? `${payload.expires_in} seconds` : "an unknown duration";

  console.log(`Refreshed ${TOKEN_KEY} in ${path.basename(envPath)}. New expiry window: ${expiresIn}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
