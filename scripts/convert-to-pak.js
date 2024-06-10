const { exec } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

// Path to the development directory
const developmentDir = path.join(__dirname, "../development");

// Path to the UnrealPak-Without-Compression.bat script
const batScript = path.join(
	__dirname,
  "../",
	"tools",
	"UnrealPakTool",
	"UnrealPak-Without-Compression.bat",
);

// Get all top-level directories inside the development directory
fs.readdir(developmentDir, (err, files) => {
	if (err) {
		console.error("Error reading development directory:", err);
		return;
	}

	for (const file of files) {
		const filePath = path.join(developmentDir, file);

		// Check if it's a directory and not a file
		if (fs.lstatSync(filePath).isDirectory()) {
			console.log(`Running UnrealPak-Without-Compression.bat in ${filePath}`);

			// Execute the .bat file in the directory
			exec(`"${batScript}" "${filePath}"`, (err, stdout, stderr) => {
				if (err) {
					console.error(
						`Error running UnrealPak-Without-Compression.bat in ${filePath}:`,
						err,
					);
					return;
				}

				console.log(`Output for ${filePath}:\n`, stdout);
				if (stderr) {
					console.error(`Error output for ${filePath}:\n`, stderr);
				}
			});
		}
	}
});
