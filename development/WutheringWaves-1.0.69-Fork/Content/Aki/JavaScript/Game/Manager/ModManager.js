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
	CharacterController_1 = require("../NewWorld/Character/CharacterController"),
	UidView_1 = require("../Module/UidShow/UidView"),
	LguiUtil_1 = require("../Module/Util/LguiUtil"),
	UiManager_1 = require("../../Ui/UiManager"),
	WeatherController_1 = require("../Module/Weather/WeatherController"),
	WorldDebugModel_1 = require("../World/Model/WorldDebugModel"),
	ModUtils_1 = require("./ModFuncs/ModUtils"),
	ModDebuger_1 = require("./ModFuncs/ModDebuger"),
	ModCustomTp_1 = require("./ModFuncs/ModCustomTp");
class ModManager {
	static Settings = {
		GodMode: !0,
		HitMultiplier: !1,
		hitCount: 15,
		AutoPickTreasure: !1,
		AutoAbsorb: !1,
		NoCD: !1,
		InfiniteStamina: !1,
		killAura: !1,
		infAura: !1,
		PerceptionRange: !1,
		perceptionRangeValue: 100,
		Weather: !1,
		WeatherType: 1,
		MarkTp: !1,
		CustomTp: !1,
		playerSpeedValue: 3,
		PlayerSpeed: !1,
		ShowMenu: !1,
		shopCount: 1,
		AutoLoot: !1,
		AutoDestroy: !1,
		UIDChanger: !1,
		HideDamage: !1,
		Uid: "000000001",
		freeCheetos: 0,
	};
	static AddModkeys() {
		0 === this.Settings.freeCheetos &&
			(this.FreeCheetos(), ++this.Settings.freeCheetos),
			ModDebuger_1.ModDebuger.TestMethod(),
			this.AddKey("ShowMenu", "Home"),
			this.AddToggle("GodMode", "F5"),
			this.AddToggle("HitMultiplier", "F6"),
			this.AddToggle("AutoPickTreasure", "F7"),
			this.AddToggle("AutoAbsorb", "F8"),
			this.AddToggle("killAura", "F9"),
			this.AddToggle("infAura", "End"),
			this.AddToggle("PerceptionRange", "F10"),
			this.AddToggle("NoCD", "F11"),
			this.AddToggle("PlayerSpeed", "F12"),
			this.AddToggle("CustomTp", "Insert"),
			this.AddKey("ShopMultiplier", "NumPadZero"),
			this.AddToggle("UIDChanger", "NumPadTwo"),
			this.AddToggle("AutoLoot", "NumPadThree"),
			this.AddToggle("AutoDestroy", "NumPadFour"),
			this.AddToggle("HideDamage", "NumPadFive");
	}
	static listenModsToggle() {
		this.listenKey("ShowMenu", "Home") && this.ShowMenu(),
			this.listenMod("GodMode", "F5"),
			this.listenMod("AutoPickTreasure", "F7"),
			this.listenMod("AutoAbsorb", "F8"),
			this.listenMod("killAura", "F9"),
			this.listenMod("infAura", "End"),
			this.listenMod("NoCD", "F11"),
			this.listenMod("AutoLoot", "NumPadThree"),
			this.listenMod("HideDamage", "NumPadFive"),
			this.listenMod("AutoDestroy", "NumPadFour"),
			this.listenMod("HitMultiplier", "F6") &&
				this.Settings.HitMultiplier &&
				ModUtils_1.ModUtils.KuroSingleInputBox({
					title: "Hit Multiplier Value | Current: " + this.Settings.hitCount,
					customFunc: async (t) => {
						var e = ModUtils_1.ModUtils.StringToInt(t);
						"error" !== e &&
							(this.ShowTip("Set HitMultiplier to " + e),
							(this.Settings.hitCount = e));
					},
					inputText: this.Settings.hitCount.toString(),
					defaultText: "Enter a number...",
					isCheckNone: !1,
					needFunctionButton: !1,
				}),
			this.listenMod("PerceptionRange", "F10") &&
				this.Settings.PerceptionRange &&
				ModUtils_1.ModUtils.KuroSingleInputBox({
					title:
						"Perception Range Value | Current: " +
						this.Settings.perceptionRangeValue,
					customFunc: async (t) => {
						var e = ModUtils_1.ModUtils.StringToInt(t);
						"error" !== e &&
							(this.ShowTip("Set PerceptionRange to " + e),
							(this.Settings.perceptionRangeValue = e));
					},
					inputText: this.Settings.perceptionRangeValue.toString(),
					defaultText: "Enter a number...",
					isCheckNone: !1,
					needFunctionButton: !1,
				}),
			this.listenKey("ShopMultiplier", "NumPadZero") &&
				ModUtils_1.ModUtils.KuroSingleInputBox({
					title: "Shop Multiplier Value | Current: " + this.Settings.shopCount,
					customFunc: async (t) => {
						var e = ModUtils_1.ModUtils.StringToInt(t);
						"error" !== e &&
							(this.ShowTip("Set ShopMultiplier to " + e),
							(this.Settings.shopCount = e));
					},
					inputText: this.Settings.shopCount.toString(),
					defaultText: "Enter a number...",
					isCheckNone: !1,
					needFunctionButton: !1,
				}),
			this.listenKey("UIDChanger", "NumPadTwo") &&
				((this.Settings.UIDChanger = !0),
				this.Settings.UIDChanger && this.ChangeUid()),
			this.listenMod("PlayerSpeed", "F12") &&
				(this.Settings.PlayerSpeed
					? ModUtils_1.ModUtils.KuroSingleInputBox({
							title:
								"Player Speed Value | Current: " +
								this.Settings.playerSpeedValue,
							customFunc: async (t) => {
								var e = ModUtils_1.ModUtils.StringToInt(t);
								"error" !== e &&
									(this.ShowTip("Set PlayerSpeed to " + e),
									(this.Settings.playerSpeedValue = e),
									this.SetPlayerSpeed(this.Settings.playerSpeedValue));
							},
							inputText: this.Settings.playerSpeedValue.toString(),
							defaultText: "Enter a number...",
							isCheckNone: !1,
							needFunctionButton: !1,
						})
					: this.SetPlayerSpeed(1)),
			this.listenMod("CustomTp", "Insert") &&
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
	static Toggle(t) {
		this.Settings.hasOwnProperty(t) && (this.Settings[t] = !this.Settings[t]);
	}
	static listenMod(t, e) {
		return (
			!!InputController_1.InputController.IsMyKeyUp(e) &&
			(this.Settings.hasOwnProperty(t) &&
				((this.Settings[t] = !this.Settings[t]),
				this.ShowTip(
					"Toggle " + t + " : " + (this.Settings[t] ? "ON" : "OFF"),
				)),
			!0)
		);
	}
	static listenKey(t, e) {
		return InputController_1.InputController.IsMyKeyUp(e);
	}
	static TpNoloadingTo(t, e, o) {
		TeleportController_1.TeleportController.TeleportToPositionNoLoading(
			new UE.Vector(t, e, o),
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
			? e + " : <color=green>ON</color> | "
			: e + " : <color=red>OFF</color> | ";
	}
	static ShowMenu() {
		var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50),
			e =
				this.FuncState(this.Settings.GodMode, "GodMode[F5]") +
				this.FuncState(this.Settings.HitMultiplier, "HitMultiplier[F6]") +
				this.FuncState(this.Settings.AutoPickTreasure, "AutoPickTreasure[F7]") +
				this.FuncState(this.Settings.AutoAbsorb, "AutoAbsorb[F8]") +
				this.FuncState(this.Settings.killAura, "killAura[F9]") +
				this.FuncState(this.Settings.infAura, "infAura[End]") +
				this.FuncState(this.Settings.PerceptionRange, "PerceptionRange[F10]") +
				this.FuncState(this.Settings.NoCD, "NoCD[F11]") +
				this.FuncState(this.Settings.PlayerSpeed, "PlayerSpeed[F12]") +
				this.FuncState(this.Settings.CustomTp, "CustomTp[Ins]") +
				this.FuncState(this.Settings.AutoLoot, "AutoLoot[Num3]") +
				this.FuncState(this.Settings.AutoDestroy, "AutoDestroy[Num4]") +
				this.FuncState(this.Settings.HideDamage, "HideDamage[Num5]") +
				"ShopMultiplier[Num0] | UIDChanger[Num2]";
		t.SetTextArgs(e),
			t.SetTitle(
				"WuWa Mod 0.36 [Gktwo] DisableAntiCheat : <color=green>ON</color> ",
			),
			ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
	}
	static GetEntityList() {
		return ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
	}
	static SpawnEntity() {}
	static Logs(t) {
		var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50);
		e.SetTextArgs(t),
			e.SetTitle("Logs"),
			ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
	}
	static SetPlayerSpeed(t) {
		CharacterController_1.CharacterController.SetTimeDilation(t);
	}
	static FreeCheetos() {
		var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50);
		t.SetTextArgs(
			"This cheat was <color=red>FREE TO USE</color> \nClick <color=green>Home</color> to open the menu \n\n<i><color=blue>discord.gg/PgDJhpXXDf</color></i>",
		),
			t.SetTitle("<i>WuWa Mod Goes BRRrr!!</i>"),
			ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
	}
	static ChangeUid() {
		UiManager_1.UiManager.OpenView("CommonSingleInputView", {
			Title: "UID Changer",
			CustomFunc: async (t) => {
				(this.Settings.Uid = t),
					this.ShowTip("UID Changed to " + t),
					UiManager_1.UiManager.CloseView("UidView"),
					UiManager_1.UiManager.OpenView("UidView");
			},
			InputText: this.Settings.Uid,
			DefaultText: "UID",
			IsCheckNone: !0,
			NeedFunctionButton: !1,
		});
	}
}
exports.ModManager = ModManager;
//# sourceMappingURL=ModManager.js.map
