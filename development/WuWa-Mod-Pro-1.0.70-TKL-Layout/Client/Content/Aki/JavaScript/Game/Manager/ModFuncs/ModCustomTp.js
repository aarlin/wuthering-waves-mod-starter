"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModCustomTp = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	ModManager_1 = require("../ModManager"),
	TeleportController_1 = require("../../Module/Teleport/TeleportController"),
	ModTpFile = require("./ModTpFile").ModTpFile;
const ModLanguage_1 = require("./ModLanguage");
const ModTranslation = ModLanguage_1.ModLanguage.ModTranslation;
let currentFile = "None";
let prevFile = "None";
let nextFile = "None";
let prevPosition = "None";
let currentPosition = "None";
let nextPosition = "None";
let totalNumber = 0;
let currentNumber = -1;
let totalFileNumber = 0;
let currentFileNumber = 0;

class ModCustomTp {
	static ShowCtpState() {
		this.GetTpInfo();
		let state = ModManager_1.ModManager.Settings.CustomTp;
		let title =
			ModTranslation("CustomTp State [Insert]:") +
			(state ? ModTranslation("ON") : ModTranslation("OFF")) +
			ModTranslation("Shows[Delete]") +
			" (" +
			(currentNumber + 1).toString() +
			"/" +
			(totalNumber + 1).toString() +
			")" +
			currentPosition;

		const teleportToggleStatus = [
			ModTranslation("CurrentFile: ") + currentFile,
			ModTranslation("PreviousFile[PageUp]: ") + prevFile,
			ModTranslation("NextFile[PageDown]: ") + nextFile,
			ModTranslation("PreviousPos[Up]: ") + prevPosition,
			ModTranslation("NextPos[Down]: ") + nextPosition,
		];

		const mergedTeleportToggleStatus = teleportToggleStatus.join(" \n");
		ModManager_1.ModManager.ShowConfirmBox(
			title,
			mergedTeleportToggleStatus,
			50,
		);
	}
	static CustomTpEnable() {
		this.GetTpInfoFirst();
		this.ShowCtpState();
	}

	static CustomTpDisable() {
    // Keep track of file even after disabling
		// currentFile = "None";
		// prevFile = "None";
		// nextFile = "None";
		// prevPosition = "None";
		// currentPosition = "None";
		// nextPosition = "None";
		// totalNumber = 0;
		// currentNumber = -1;
		// totalFileNumber = 0;
		// currentFileNumber = 0;
	}

	static GetTpInfo() {
		totalNumber = ModTpFile.CustomTpList[currentFileNumber].length - 1;
		totalFileNumber = ModTpFile.CustomTpList.length - 1;
		currentFile = ModTpFile.CustomTpList[currentFileNumber][0].filename;
		try {
			prevFile = ModTpFile.CustomTpList[currentFileNumber - 1][0].filename;
		} catch (error) {
			prevFile = "None";
		}

		try {
			nextFile = ModTpFile.CustomTpList[currentFileNumber + 1][0].filename;
		} catch (error) {
			nextFile = "None";
		}
		try {
			currentPosition = this.GetPosInfo(currentFileNumber, currentNumber);
		} catch {
			currentPosition = "None";
		}

		try {
			prevPosition = this.GetPosInfo(currentFileNumber, currentNumber - 1);
		} catch (error) {
			prevPosition = "None";
		}

		try {
			nextPosition = this.GetPosInfo(currentFileNumber, currentNumber + 1);
		} catch (error) {
			nextPosition = "None";
		}
	}

	static GetTpInfoFirst() {
		// currentFile = "None";
		// prevFile = "None";
		// nextFile = "None";
		// prevPosition = "None";
		// currentPosition = "None";
		// nextPosition = "None";
		// totalNumber = 0;
		// currentNumber = -1;
		// totalFileNumber = 0;
		// currentFileNumber = 0;
		this.GetTpInfo();
	}

	static GetPosInfo(num1, num2) {
		let x = ModTpFile.CustomTpList[num1][num2].x;
		let y = ModTpFile.CustomTpList[num1][num2].y;
		let z = ModTpFile.CustomTpList[num1][num2].z;
		let PosInfo = `(${Math.floor(x / 100).toString()},${Math.floor(y / 100).toString()},${Math.floor(z / 100).toString()})`;

		return PosInfo;
	}

	static AddFile() {
		if (currentFileNumber < totalFileNumber) {
			currentFileNumber = currentFileNumber + 1;
			currentNumber = 0;
			ModManager_1.ModManager.ShowTip(`Switch to ${ModTpFile.CustomTpList[currentFileNumber][1].filename}`);
		} else {
      ModManager_1.ModManager.ShowTip("is the last file");
    }

		currentNumber = -1;
		this.GetTpInfo();
	}
	static SubFile() {
		if (currentFileNumber > 0) {
			currentFileNumber = currentFileNumber - 1;
			ModManager_1.ModManager.ShowTip(`Switch to ${ModTpFile.CustomTpList[currentFileNumber][1].filename}`);
		} else {
      ModManager_1.ModManager.ShowTip("is the first file");
    }

		currentNumber = -1;
		this.GetTpInfo();
	}
	static AddPos() {
		if (currentNumber < totalNumber) {
			currentNumber++;
		} else {
      ModManager_1.ModManager.ShowTip("is the last pos");
    }
		this.GetTpInfo();
	}
	static SubPos() {
		if (currentNumber > 0) {
			currentNumber--;
		} else {
      ModManager_1.ModManager.ShowTip("is the first pos");
    }
		this.GetTpInfo();
	}

	static GoTp() {
		let x = ModTpFile.CustomTpList[currentFileNumber][currentNumber].x;
		let y = ModTpFile.CustomTpList[currentFileNumber][currentNumber].y;
		let z = ModTpFile.CustomTpList[currentFileNumber][currentNumber].z;
		let tips = this.GetPosInfo(currentFileNumber, currentNumber);
		ModManager_1.ModManager.ShowTip(`Teleporting to ${ModTpFile.CustomTpList[currentFileNumber][currentNumber].name + tips}`);
		TeleportController_1.TeleportController.TeleportToPositionNoLoading(
			new UE.Vector(x, y, z),
			new UE.Rotator(0, 0, 0),
			"comment/message",
		);
	}
}
exports.ModCustomTp = ModCustomTp;
