"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModCustomTp = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	ModManager_1 = require("../ModManager"),
	TeleportController_1 = require("../../Module/Teleport/TeleportController"),
	ModUtils_1 = require("./ModUtils"),
	InputController_1 = require("../../Input/InputController"),
	InputSettings_1 = require("../../InputSettings/InputSettings"),
	ModTpFile = require("./ModTpFile").ModTpFile,
	ModLanguage_1 = require("./ModLanguage"),
	ModTr = ModLanguage_1.ModLanguage.ModTr;
class ModCustomTp {
	static Settings = {
		CurrFile: "None",
		PrevFile: "None",
		NextFile: "None",
		PrevPos: "None",
		CurrPos: "None",
		NextPos: "None",
		TotalNum: 0,
		CurreNum: -1,
		TotalFileNum: 0,
		CurreFileNum: 0,
		AutoMode: !1,
		Delay: 15e3,
	};
	static ShowCtpState() {
		this.GetTpInfo();
		var t = ModManager_1.ModManager.Settings.CustomTp,
			e =
				ModTr("CustomTp State [Insert]:") +
				ModTr(t ? "ON" : "OFF") +
				ModTr("Shows[Delete]") +
				" (" +
				(this.Settings.CurreNum + 1).toString() +
				"/" +
				(this.Settings.TotalNum + 1).toString() +
				")" +
				this.Settings.CurrPos,
			i =
				ModTr("CurrentFile:") +
				this.Settings.CurrFile +
				ModTr("| PreviousFile[PageUp]: ") +
				this.Settings.PrevFile +
				ModTr(" | NextFile[PageDown]: ") +
				this.Settings.NextFile +
				ModTr(" | PreviousPos[Up]: ") +
				this.Settings.PrevPos +
				ModTr(" | NextPos[Down]: ") +
				this.Settings.NextPos +
				ModTr(" | AutoMode[End]: ") +
				(this.Settings.AutoMode ? ModTr("ON") : ModTr("OFF")) +
				ModTr(" | SetDelay[Left]: ") +
				(this.Settings.Delay / 1e3).toString() +
				ModTr(" | Select[Right]: ");
		ModManager_1.ModManager.ShowConfirmBox(e, i, 50);
	}
	static CustomTpEnable() {
		ModManager_1.ModManager.AddKey("PreviousFile", "PageUp"),
			ModManager_1.ModManager.AddKey("NextFile", "PageDown"),
			ModManager_1.ModManager.AddKey("PreviousPos", "Up"),
			ModManager_1.ModManager.AddKey("NextPos", "Down"),
			ModManager_1.ModManager.AddKey("ShowTpState", "Delete"),
			ModManager_1.ModManager.AddToggle("AutoMode", "End"),
			ModManager_1.ModManager.AddKey("SetDelay", "Left"),
			ModManager_1.ModManager.AddKey("Select", "Right"),
			this.GetTpInfoFirst(),
			this.ShowCtpState();
	}
	static CustomTpDisable() {
		ModManager_1.ModManager.RemoveKey("PreviousFile", "PageUp"),
			ModManager_1.ModManager.RemoveKey("NextFile", "PageDown"),
			ModManager_1.ModManager.RemoveKey("Previous", "Up"),
			ModManager_1.ModManager.RemoveKey("Next", "Down"),
			ModManager_1.ModManager.RemoveKey("ShowTpState", "Delete"),
			ModManager_1.ModManager.RemoveToggle("AutoMode", "End"),
			ModManager_1.ModManager.RemoveKey("SetDelay", "Left"),
			ModManager_1.ModManager.RemoveKey("Select", "Right"),
			(this.Settings.CurrFile = "None"),
			(this.Settings.PrevFile = "None"),
			(this.Settings.NextFile = "None"),
			(this.Settings.PrevPos = "None"),
			(this.Settings.CurrPos = "None"),
			(this.Settings.NextPos = "None"),
			(this.Settings.TotalNum = 0),
			(this.Settings.CurreNum = -1),
			(this.Settings.TotalFileNum = 0),
			(this.Settings.CurreFileNum = 0),
			(this.Settings.AutoMode = !1);
	}
	static GetTpInfo() {
		(this.Settings.TotalNum =
			ModTpFile.CustomTpList[this.Settings.CurreFileNum].length - 1),
			(this.Settings.TotalFileNum = ModTpFile.CustomTpList.length - 1),
			(this.Settings.CurrFile =
				ModTpFile.CustomTpList[this.Settings.CurreFileNum][0].filename);
		try {
			this.Settings.PrevFile =
				ModTpFile.CustomTpList[this.Settings.CurreFileNum - 1][0].filename;
		} catch (t) {
			this.Settings.PrevFile = "None";
		}
		try {
			this.Settings.NextFile =
				ModTpFile.CustomTpList[this.Settings.CurreFileNum + 1][0].filename;
		} catch (t) {
			this.Settings.NextFile = "None";
		}
		try {
			this.Settings.CurrPos = this.GetPosInfo(
				this.Settings.CurreFileNum,
				this.Settings.CurreNum,
			);
		} catch {
			this.Settings.CurrPos = "None";
		}
		try {
			this.Settings.PrevPos = this.GetPosInfo(
				this.Settings.CurreFileNum,
				this.Settings.CurreNum - 1,
			);
		} catch (t) {
			this.Settings.PrevPos = "None";
		}
		try {
			this.Settings.NextPos = this.GetPosInfo(
				this.Settings.CurreFileNum,
				this.Settings.CurreNum + 1,
			);
		} catch (t) {
			this.Settings.NextPos = "None";
		}
	}
	static GetTpInfoFirst() {
		(this.Settings.CurrFile = "None"),
			(this.Settings.PrevFile = "None"),
			(this.Settings.NextFile = "None"),
			(this.Settings.PrevPos = "None"),
			(this.Settings.CurrPos = "None"),
			(this.Settings.NextPos = "None"),
			(this.Settings.TotalNum = 0),
			(this.Settings.CurreNum = -1),
			(this.Settings.TotalFileNum = 0),
			(this.Settings.CurreFileNum = 0),
			(this.Settings.AutoMode = !1),
			this.GetTpInfo();
	}
	static GetPosInfo(t, e) {
		var i = ModTpFile.CustomTpList[t][e].x,
			o = ModTpFile.CustomTpList[t][e].y,
			s = ModTpFile.CustomTpList[t][e].z;
		return (
			"(" +
			Math.floor(i / 100).toString() +
			"," +
			Math.floor(o / 100).toString() +
			"," +
			Math.floor(s / 100).toString() +
			")"
		);
	}
	static AddFile() {
		this.Settings.CurreFileNum < this.Settings.TotalFileNum
			? ((this.Settings.CurreFileNum = this.Settings.CurreFileNum + 1),
				(this.Settings.CurreNum = 0),
				ModManager_1.ModManager.ShowTip(
					"Switch to" +
						ModTpFile.CustomTpList[this.Settings.CurreFileNum][1].filename,
				))
			: ModManager_1.ModManager.ShowTip(ModTr("is the last file")),
			(this.Settings.CurreNum = -1),
			this.GetTpInfo();
	}
	static SubFile() {
		this.Settings.CurreFileNum > 0
			? ((this.Settings.CurreFileNum = this.Settings.CurreFileNum - 1),
				ModManager_1.ModManager.ShowTip(
					"Switch to" +
						ModTpFile.CustomTpList[this.Settings.CurreFileNum][1].filename,
				))
			: ModManager_1.ModManager.ShowTip(ModTr("is the first file")),
			(this.Settings.CurreNum = -1),
			this.GetTpInfo();
	}
	static AddPos() {
		this.Settings.CurreNum < this.Settings.TotalNum
			? this.Settings.CurreNum++
			: ModManager_1.ModManager.ShowTip(ModTr("is the last pos")),
			this.GetTpInfo();
	}
	static SubPos() {
		this.Settings.CurreNum > 0
			? this.Settings.CurreNum--
			: ModManager_1.ModManager.ShowTip(ModTr("is the first pos")),
			this.GetTpInfo();
	}
	static GoTp() {
		var t =
				ModTpFile.CustomTpList[this.Settings.CurreFileNum][
					this.Settings.CurreNum
				].x,
			e =
				ModTpFile.CustomTpList[this.Settings.CurreFileNum][
					this.Settings.CurreNum
				].y,
			i =
				ModTpFile.CustomTpList[this.Settings.CurreFileNum][
					this.Settings.CurreNum
				].z,
			o = this.GetPosInfo(this.Settings.CurreFileNum, this.Settings.CurreNum);
		ModManager_1.ModManager.ShowTip(
			"go to" +
				ModTpFile.CustomTpList[this.Settings.CurreFileNum][
					this.Settings.CurreNum
				].name +
				o,
		),
			TeleportController_1.TeleportController.TeleportToPositionNoLoading(
				new UE.Vector(t, e, i),
				new UE.Rotator(0, 0, 0),
				"comment/message",
			);
	}
	static setDelay() {
		ModUtils_1.ModUtils.KuroSingleInputBox({
			title: ModTr("CustomTp:AutoMode:Set Delay"),
			customFunc: async (t) => {
				var e = ModUtils_1.ModUtils.StringToInt(t);
				"error" !== e && (this.Settings.Delay = 1e3 * e);
			},
			inputText: (this.Settings.Delay / 1e3).toString(),
			defaultText: ModTr("Please enter Delay(s)"),
			isCheckNone: !0,
			needFunctionButton: !1,
		});
	}
	static async timer() {
		for (this.isTimerRunning = !0; this.Settings.AutoMode; ) {
			for (; ModUtils_1.ModUtils.IsTping(); )
				await ModUtils_1.ModUtils.Sleep(1e3);
			this.isCountdownActive = !0;
			for (
				let t = this.Settings.Delay / 1e3;
				t > 0 && this.isCountdownActive;
				t--
			)
				ModManager_1.ModManager.ShowTip(
					1 === t
						? ModTr("Go")
						: `${ModTr("Remaining time")}: ${t} ${ModTr("seconds")}`,
				),
					await ModUtils_1.ModUtils.Sleep(1e3);
			ModUtils_1.ModUtils.IsTping() ||
				((this.isCountdownActive = !1),
				this.AddPos(),
				this.GoTp(),
				this.Settings.TotalNum == this.Settings.CurreNum &&
					(this.Settings.AutoMode = !1));
		}
		this.isTimerRunning = !1;
	}
	static listenAuto() {
		if (InputController_1.InputController.IsMyKeyUp("End")) {
			this.Settings.AutoMode = !this.Settings.AutoMode;
			var t = "Unknown",
				e = ModTr("AutoMode");
			this.Settings.AutoMode
				? ((t = e + " | " + ModTr("ON")), ModManager_1.ModManager.ShowTip(t))
				: ((t = e + " | " + ModTr("OFF")), ModManager_1.ModManager.ShowTip(t)),
				this.isTimerRunning || this.timer();
		}
	}
	static listenDelay() {
		ModManager_1.ModManager.listenKey("SetDelay", "Left") && this.setDelay();
	}
	static listenSelect() {
		ModManager_1.ModManager.listenKey("Select", "Right") && this.Select();
	}
	static Select() {
		ModUtils_1.ModUtils.KuroSingleInputBox({
			title: ModTr("CustomTp:CurrPos:Select"),
			customFunc: async (t) => {
				var e = ModUtils_1.ModUtils.StringToInt(t);
				"error" !== e && (this.Settings.CurreNum = e - 1);
			},
			inputText: (this.Settings.CurreNum + 1).toString(),
			defaultText: "Please enter CurreNum",
			isCheckNone: !0,
			needFunctionButton: !1,
		});
	}
}
exports.ModCustomTp = ModCustomTp;
