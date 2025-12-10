const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const projectRoot = path.resolve(__dirname, "..");

function loadEnv() {
  const baseEnvPath = path.join(projectRoot, ".env");
  const localEnvPath = path.join(projectRoot, ".env.local");
  const prodEnvPath = path.join(projectRoot, ".env.production");

  [baseEnvPath, process.env.NODE_ENV === "production" ? prodEnvPath : localEnvPath]
    .filter(Boolean)
    .forEach((envPath) => {
      if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
      }
    });

  const requiredKeys = ["API_URL", "OPENID_URL", "IMAGE_UPLOAD_URL"];
  const missing = requiredKeys.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }

  return {
    apiUrl: process.env.API_URL,
    openIdUrl: process.env.OPENID_URL,
    imageUploadUrl: process.env.IMAGE_UPLOAD_URL,
    defaultTheme: Number(process.env.DEFAULT_THEME || 4),
  };
}

module.exports = { loadEnv };


