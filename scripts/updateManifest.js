const fs = require("fs");
const path = require("path");

let [, , newVersion] = process.argv;
if (!newVersion) {
	console.error("Usage: node updateManifest.js <new_version>");
	process.exit(1);
}

const cleanedVersion = newVersion.startsWith("v")
	? newVersion.slice(1)
	: newVersion;

const manifestPath = path.resolve(__dirname, "../manifest.json");

try {
	const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
	manifest.version = cleanedVersion;
	fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, "\t"));
	console.log(`Updated manifest.json version to ${cleanedVersion}`);
} catch (err) {
	console.error("Error updating manifest.json:", err.message);
	process.exit(1);
}
