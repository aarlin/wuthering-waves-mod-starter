const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

// Path to the development directory
const developmentDir = path.join(__dirname, "../development");

// Path to the UnrealPak-Without-Compression.bat script
const batScript = path.join(
	__dirname,
	"../tools/UnrealPakTool/UnrealPak-Without-Compression.bat",
);

// Get all top-level directories inside the development directory
fs.readdir(developmentDir, (err, files) => {
	if (err) {
		console.error("Error reading development directory:", err);
		return;
	}

	files.forEach((file) => {
		const filePath = path.join(developmentDir, file);

		// Check if it's a directory and not a file
		if (fs.lstatSync(filePath).isDirectory()) {
			console.log(`Running UnrealPak-Without-Compression.bat on ${filePath}`);

			try {
				// Execute the .bat file with the directory as an argument
				const output = execSync(`"${batScript}" "${filePath}"`, {
					stdio: "inherit",
				});
				console.log(`Pak creation successful for ${filePath}`);
			} catch (err) {
				console.error(
					`Error running UnrealPak-Without-Compression.bat on ${filePath}:`,
					err,
				);
			}
		}
	});
});
