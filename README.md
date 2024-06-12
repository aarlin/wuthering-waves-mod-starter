# Wuthering Waves QoL Mods

## Reverse Engineering Process

1. Open `C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game\Client\Content\Paks` using [Fmodel](https://fmodel.app/download)

2. Under Directory > AES, add AES key: `0xE0D4C0AA387A268B29C397E3C0CAD934522EFC96BE5526D6288EA26351CDACC9`

3. Load `pakchunk11-WindowsNoEditor.pak` in Archives menu

4. Under Folders menu, right-click Client folder and choose `Export Folder's Packages Raw Data (.uasset)`

5. Open exported folder with VS Code

6. Explore code

## How to Develop Own Mods

1. `npm install`

2. Create folder structure similar to the existing examples in `development` folder

3. Drag and drop `.js` files from exported pakchunk11 to be modified

4. Format minified `.js` files with one of the following:

    i. <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> then select `Format Document` and choose Biome

    ii. <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> inside VS Code

    iii. Run `npx @biomejs/biome format --write .`

> [!NOTE]
> Formatting with biome requires recommended extensions

![](./assets/extension-recommendations.png)

5. Modify files

6. Repack modified code using one of the following:

    i. `npm run convertToPak`, which will take all folders under `development` and convert each folder into a `.pak` file under `~mods`

    ii. Drag and drop folder, e.g. `WutheringWaves-QuickSwapTeam` into `UnrealPak-Without-Compression.bat`

## How to Install Mods

1. Copy `~mods` folder over to `\Wuthering Waves\Wuthering Waves Game\Client\Content\Paks\`

2. Find `Wuthering Waves\Wuthering Waves Game\Client\Binaries\Win64\Client-Win64-Shipping.exe`

3. Right-click and create shortcut

4. Right-click new shortcut and choose Properties

5. Change target to be `"C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game\Client\Binaries\Win64\Client-Win64-Shipping.exe" -fileopenlog`

5. Open the game with either:

    i. New shortcut

    ii. [wuwa_modloader](https://github.com/Sehyn/wuwa_modloader)
