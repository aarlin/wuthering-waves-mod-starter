"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ModManager = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../Core/Common/Info"),
	Log_1 = require("../../Core/Common/Log"),
	Protocol_1 = require("../../Core/Define/Net/Protocol"),
	InputSettings_1 = require("../InputSettings/InputSettings"),
	InputController_1 = require("../Input/InputController"),
	TeleportController_1 = require("../Module/Teleport/TeleportController"),
	CreatureController_1 = require("../World/Controller/CreatureController"),
	ConfirmBoxController_1 = require("../Module/ConfirmBox/ConfirmBoxController"),
	ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
	ScrollingTipsController_1 = require("../Module/ScrollingTips/ScrollingTipsController"),
	MapController_1 = require("../Module/Map/Controller/MapController"),
	ModelManager_1 = require("../Manager/ModelManager"),
	CharacterController_1 = require("..//NewWorld/Character/CharacterController"),
	UidView_1 = require("../Module/UidShow/UidView"),
	LguiUtil_1 = require("../Module/Util/LguiUtil"),
	UiManager_1 = require("../../Game/Ui/UiManager"),
	WeatherController_1 = require("../Module/Weather/WeatherController"),
	WorldDebugModel_1 = require("../World/Model/WorldDebugModel"),
	ModCustomTp_1 = require("./ModFuncs/ModCustomTp"),
	ModUtils_1 = require("./ModFuncs/ModUtils"),
	GlobalData_1 = require("../GlobalData"),
	CommonInputViewController_1 = require("../../Game/Module/Common/InputView/Controller/CommonInputViewController"),
	Global_1 = require("../../Game/Global"),
	ModDebuger_1 = require("./ModFuncs/ModDebuger"),
	ModLanguage_1 = require("./ModFuncs/ModLanguage"),
	ModTr = ModLanguage_1.ModLanguage.ModTr;
class ModManager {
	static PlayerEntity = null;
	static Settings = {
		ModEnabled: true,
		GodMode: false,
		HitMultiplier: false,
		Hitcount: 3,
		AutoPickTreasure: false,
		AntiDither: false,
		AutoAbsorb: false,
		AlwaysCrit: false,
		CritRate: 0,
		NoCD: false,
		InfiniteStamina: false,
		killAura: false,
		PerceptionRange: false,
		Weather: false,
		WeatherType: 1,
		MarkTp: true,
		CustomTp: false,
		playerSpeedValue: 1,
		PlayerSpeed: false,
		worldSpeedValue: 1,
		WorldSpeed: false,
		ShowMenu: false,
		AutoLoot: false,
		UnlockFPS: false,
		ShowFPS: false,
		ShowUnit: false,
		HideDmgUi: false,
		PlotSKIP: false,
		QuestTP: false,
		fovValue: 75,
		FOV: false,
		MarkX: 0,
		MarkY: 0,
		MarkZ: 0,
		Uid: "Re:Re: v1.1.1 Original by KunMod & BakaChan",
	};
	static ModStart() {
		ModDebuger_1.ModDebuger.TestMethod(),
			ModLanguage_1.ModLanguage.GetCurrLang(),
			this.AddKey("ShowMenu", "Home"),
			this.AddToggle("GodMode", "F5"),
			this.AddToggle("HitMultiplier", "F6"),
			this.AddToggle("AutoPickTreasure", "F7"),
			this.AddToggle("AutoAbsorb", "F8"),
			this.AddToggle("PerceptionRange", "F10"),
			this.AddToggle("NoCD", "F11"),
			this.AddToggle("PlayerSpeed", "F12"),
			this.AddToggle("WorldSpeed", "Backslash"),
			this.AddToggle("CustomTp", "Insert"),
			this.AddToggle("MarkTp", "Semicolon"),
			this.AddToggle("AlwaysCrit", "p"),
			this.AddToggle("UnlockFPS", "LeftBracket"),
			this.AddToggle("ShowFPS", "RightBracket"),
			this.AddToggle("ShowUnit", "i"),
			this.AddToggle("FOV", "Equals"),
			this.AddToggle("HideDmgUi", "Period"),
			this.AddToggle("PlotSKIP", "Slash"),
			this.AddToggle("QuestTP", "Comma"),
			this.AddToggle("Test", "Zero");
	}
	static listenModsToggle() {
		this.listenMod("AutoPickTreasure", "F7", "AutoPickTreasure"),
			this.listenMod("AutoAbsorb", "F8", "AutoAbsorb"),
			this.listenMod("PerceptionRange", "F10", "PerceptionRange"),
			this.listenMod("NoCD", "F11", "NoCD"),
			this.listenMod("AlwaysCrit", "p", "AlwaysCrit") &&
			this.Settings.AlwaysCrit &&
			ModUtils_1.ModUtils.KuroSingleInputBox({
				TitleTextArgs: ModTr("CritRate: Please enter crit rate"),
				ConfirmFunc: async (t) => {
					var e = ModUtils_1.ModUtils.StringToInt(t);
					"error" !== e && (this.Settings.CritRate = e);
				},
				InputText: this.Settings.CritRate.toString(),
				DefaultText: ModTr("Please enter crit rate"),
				IsCheckNone: !0,
				NeedFunctionButton: !1,
			}),
			this.listenMod("PlotSKIP", "Slash", "PlotSKIP"),
			this.listenMod("QuestTP", "Comma", "QuestTP"),
			this.listenKey("ShowMenu", "Home") && this.ShowMenu(),
			this.listenMod("UnlockFPS", "LeftBracket", "UnlockFPS") &&
			this.FPSUnlocker(this.Settings.UnlockFPS),
			this.listenMod("ShowFPS", "RightBracket", "ShowFPS") && this.ShowFPS(),
			this.listenMod("ShowUnit", "i", "ShowUnit") && this.ShowUnit(),
			this.listenMod("FOV", "Equals", "FOV") &&
			(this.Settings.FOV
				? ModUtils_1.ModUtils.KuroSingleInputBox({
					TitleTextArgs: ModTr("Fov: Select FOV"),
					ConfirmFunc: async (t) => {
						var e = ModUtils_1.ModUtils.StringToInt(t);
						"error" !== e && ((this.Settings.fovValue = e), this.SetFOV(e));
					},
					InputText: this.Settings.fovValue.toString(),
					DefaultText: ModTr("Please enter fov value"),
					IsCheckNone: !0,
					NeedFunctionButton: !1,
				})
				: this.SetFOV(75)),
			this.listenMod("HideDmgUi", "Period", "HideDmgUi"),
			this.listenMod("GodMode", "F5", "GodMode"),
			this.listenMod("HitMultiplier", "F6", "HitMultiplier") &&
			this.Settings.HitMultiplier &&
			ModUtils_1.ModUtils.KuroSingleInputBox({
				TitleTextArgs: ModTr("HitMultiplier:Please enter hit count"),
				ConfirmFunc: async (t) => {
					var e = ModUtils_1.ModUtils.StringToInt(t);
					"error" !== e && (this.Settings.Hitcount = e);
				},
				InputText: this.Settings.Hitcount.toString(),
				DefaultText: ModTr("Please enter hit count"),
				IsCheckNone: !0,
				NeedFunctionButton: !1,
			}),
			this.listenKey("MarkTp", "Semicolon") && this.MarkTp(),
			this.listenMod("PlayerSpeed", "F12", "PlayerSpeed") &&
			(this.Settings.PlayerSpeed
				? ModUtils_1.ModUtils.KuroSingleInputBox({
					TitleTextArgs: "blank",
					ConfirmFunc: async (t) => {
						var e = ModUtils_1.ModUtils.StringToInt(t);
						"error" !== e && (this.Settings.playerSpeedValue = e);
					},
					InputText: this.Settings.playerSpeedValue.toString(),
					DefaultText: ModTr("Please enter speed value"),
					IsCheckNone: !0,
					NeedFunctionButton: !1,
				})
				: (this.Settings.playerSpeedValue = 1)),
			this.SetPlayerSpeed(this.Settings.playerSpeedValue),
			this.listenMod("WorldSpeed", "Backslash", "WorldSpeed") &&
			(this.Settings.WorldSpeed
				? ModUtils_1.ModUtils.KuroSingleInputBox({
					TitleTextArgs: "blank",
					ConfirmFunc: async (t) => {
						var e = ModUtils_1.ModUtils.StringToInt(t);
						"error" !== e &&
							((this.Settings.worldSpeedValue = e),
								this.SetWorldTimeDilation(e));
					},
					InputText: this.Settings.worldSpeedValue.toString(),
					DefaultText: ModTr("Please enter world speed value"),
					IsCheckNone: !0,
					NeedFunctionButton: !1,
				})
				: this.SetWorldTimeDilation(1)),
			this.listenMod("CustomTp", "Insert", "CustomTp") &&
			(this.Settings.CustomTp
				? ModCustomTp_1.ModCustomTp.CustomTpEnable()
				: ModCustomTp_1.ModCustomTp.CustomTpDisable()),
			this.Settings.CustomTp &&
			(ModCustomTp_1.ModCustomTp.listenAuto(),
				ModCustomTp_1.ModCustomTp.listenSelect(),
				ModCustomTp_1.ModCustomTp.listenDelay(),
				this.listenKey("ShowTpState", "Delete") &&
				ModCustomTp_1.ModCustomTp.ShowCtpState(),
				this.listenKey("PreviousFile", "PageUp") &&
				ModCustomTp_1.ModCustomTp.SubFile(),
				this.listenKey("NextFile", "PageDown") &&
				ModCustomTp_1.ModCustomTp.AddFile(),
				this.listenKey("PreviousPos", "Up") &&
				(ModCustomTp_1.ModCustomTp.SubPos(),
					ModCustomTp_1.ModCustomTp.GoTp()),
				this.listenKey("NextPos", "Down") &&
				(ModCustomTp_1.ModCustomTp.AddPos(),
					ModCustomTp_1.ModCustomTp.GoTp()));
		// puerts_1.logger.warn("[BAKALOG]:TEST", "FUCK");
	}
	static AddToggle(t, e) {
		InputSettings_1.InputSettings.AddActionMapping(t, e);
	}
	static RemoveToggle(t, e) {
		InputSettings_1.InputSettings.RemoveActionMapping(t, e);
	}
	static AddKey(t, e) {
		InputSettings_1.InputSettings.AddActionMapping(t, e);
	}
	static RemoveKey(t, e) {
		InputSettings_1.InputSettings.RemoveActionMapping(t, e);
	}
	static ShowFuncStateTip(t, e) {
		e = ModTr(e);
		var o = "Unknown";
		if (this.Settings.hasOwnProperty(t)) var i = this.Settings[t];
		i
			? ((o = e + " | " + ModTr("ON")), this.ShowTip(o))
			: ((o = e + " | " + ModTr("OFF")), this.ShowTip(o));
	}
	static Toggle(t) {
		this.Settings.hasOwnProperty(t) && (this.Settings[t] = !this.Settings[t]);
	}
	static listenMod(t, e, o) {
		return (
			!!InputController_1.InputController.IsMyKeyUp(e) &&
			(this.Settings.hasOwnProperty(t) &&
				((this.Settings[t] = !this.Settings[t]), this.ShowFuncStateTip(t, o)),
				!0)
		);
	}
	static listenKey(t, e) {
		return InputController_1.InputController.IsMyKeyUp(e);
	}
	static TPtest() {
		TeleportController_1.TeleportController.TeleportToPositionNoLoading(
			new UE.Vector(0, 0, 0),
			new UE.Rotator(0, 0, 0),
			"comment/message",
		);
	}
	static TpNoloadingTo(t, e, o) {
		TeleportController_1.TeleportController.TeleportToPositionNoLoading(
			new UE.Vector(t, e, o),
			new UE.Rotator(0, 0, 0),
			"comment/message",
		);
	}
	static TpNoloadingTo2(t) {
		TeleportController_1.TeleportController.TeleportToPositionNoLoading(
			t,
			new UE.Rotator(0, 0, 0),
			"comment/message",
		);
	}
	static MonsterBoom(t, e) {
		CreatureController_1.CreatureController.MonsterBoomRequest(t, e);
	}
	static ChangWeather(t) {
		WeatherController_1.WeatherController.TestChangeWeather(t);
	}
	static ShowConfirmBox(t, e, o) {
		var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o);
		i.SetTextArgs(e),
			i.SetTitle(t),
			ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
	}
	static ShowTip(t) {
		ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
	}
	static FuncState(t, e) {
		return t
			? e + ModTr(" : <color=green>ON</color> |")
			: e + ModTr(" : <color=red>OFF</color> |");
	}
	static ShowMenu() {
		var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50),
			e =
				this.FuncState(this.Settings.GodMode, ModTr("GodMode[F5]")) +
				this.FuncState(
					this.Settings.HitMultiplier,
					ModTr("HitMultiplier[F6]"),
				) +
				this.FuncState(
					this.Settings.AutoPickTreasure,
					ModTr("AutoPickTreasure[F7]"),
				) +
				this.FuncState(this.Settings.AutoAbsorb, ModTr("AutoAbsorb[F8]")) +
				this.FuncState(
					this.Settings.PerceptionRange,
					ModTr("PerceptionRange[F10]"),
				) +
				this.FuncState(this.Settings.NoCD, ModTr("NoCD[F11]")) +
				this.FuncState(this.Settings.PlayerSpeed, ModTr("PlayerSpeed[F12]")) +
				this.FuncState(this.Settings.AlwaysCrit, ModTr("AlwaysCrit[P]")) +
				this.FuncState(
					this.Settings.WorldSpeed,
					ModTr("WorldSpeed[Backslash]"),
				) +
				this.FuncState(this.Settings.CustomTp, ModTr("CustomTp[Ins]")) +
				this.FuncState(this.Settings.UnlockFPS, "HideDMGUi[Period]") +
				this.FuncState(this.Settings.UnlockFPS, "UnlockFPS[LeftBracket]") +
				this.FuncState(this.Settings.ShowFPS, "ShowFPS[RightBracket]") +
				this.FuncState(this.Settings.ShowUnit, "ShowUnit[i]") +
				this.FuncState(this.Settings.SetFOV, "SetFov[Equals]") +
				this.FuncState(this.Settings.PlotSKIP, "PlotSKIP[Slash]") +
				this.FuncState(this.Settings.AntiDither, ModTr("AntiDither")) +
				this.FuncState(this.Settings.MarkTp, "MarkTp[Semicolon]") +
				this.FuncState(this.Settings.QuestTP, "QuestTP[Comma]") +
				this.FuncState(this.Settings.InfiniteStamina, "InfiniteStamina") +
				this.FuncState(true, "DisableAntiCheat");
		t.SetTextArgs(e),
			t.SetTitle(ModTr("KunMod & BakaChan <color=red>Re:Re: v1.1.1</color>")),
			ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
	}
	static MarkTp() {
		this.TpNoloadingTo(
			100 * this.Settings.MarkX,
			100 * this.Settings.MarkY,
			100 * this.Settings.MarkZ,
		);
	}
	static GetEntityList() {
		return ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
	}
	static SpawnEntity() { }
	static GetPlayerEntity() {
		return (
			(this.PlayerEntity =
				Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity),
			this.PlayerEntity
		);
	}
	static SetPlayerSpeed(t) {
		this.GetPlayerEntity().SetTimeDilation(t);
	}
	static SetWorldTimeDilation(t) {
		UE.GameplayStatics.SetGlobalTimeDilation(
			GlobalData_1.GlobalData.GameInstance,
			t,
		);
	}
	static ConsoleCommand(t) {
		UE.KismetSystemLibrary.ExecuteConsoleCommand(
			GlobalData_1.GlobalData.World,
			t,
		);
	}
	static FPSUnlocker(t = !1) {
		let e;
		(e = t ? "t.MaxFPS 300" : "t.MaxFPS 85"), this.ConsoleCommand(e);
	}
	static ShowFPS() {
		this.ConsoleCommand("stat fps");
	}
	static ShowUnit() {
		this.ConsoleCommand("stat Unit");
	}
	static SetFOV(t) {
		let e = t.toString();
		this.ConsoleCommand("fov " + e);
	}
}
exports.ModManager = ModManager;
