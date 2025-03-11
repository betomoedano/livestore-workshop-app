const { getDefaultConfig } = require("expo/metro-config");
const { addLiveStoreDevtoolsMiddleware } = require("@livestore/devtools-expo");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ["require", "default"];

// Add LiveStore Devtools middleware only in a local development environment
if (!process.env.CI && process.stdout.isTTY) {
  addLiveStoreDevtoolsMiddleware(config, { schemaPath: "./schema/index.ts" });
}

module.exports = config;
