"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LinkingDotItem = void 0);
const UE = require("ue"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LinkingDotItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.wAe = void 0),
			(this.BAe = void 0),
			(this.bAe = void 0),
			(this.qAe = void 0),
			(this.GAe = void 0),
			(this.NAe = void 0),
			(this.OAe = void 0),
			(this.kAe = void 0),
			(this.FAe = (e, t, i, o, n) => {});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[6, UE.UISprite],
			[5, UE.UISprite],
			[4, UE.UIItem],
			[7, UE.UIItem],
		];
	}
	OnStart() {
		(this.wAe = this.GetSprite(0)),
			(this.BAe = this.GetSprite(1)),
			(this.bAe = this.GetSprite(2)),
			(this.qAe = this.GetSprite(3)),
			(this.GAe = this.GetSprite(6)),
			(this.NAe = this.GetSprite(5)),
			(this.OAe = this.GetItem(4)),
			(this.kAe = this.GetItem(7)),
			this.wAe.SetUIActive(!1),
			this.BAe.SetUIActive(!1),
			this.bAe.SetUIActive(!1),
			this.qAe.SetUIActive(!1),
			this.GAe.SetUIActive(!1),
			this.NAe.SetUIActive(!1),
			this.kAe.SetUIActive(!1),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSignalDeviceLinking,
				this.FAe,
			);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSignalDeviceLinking,
			this.FAe,
		);
	}
	InitIcon(e) {
		var t = LinkingDotItem.VAe.get(e),
			i = LinkingDotItem.HAe.get(e),
			o = LinkingDotItem.ColorRayIconMap.get(e),
			n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
		this.SetSpriteByPath(n, this.wAe, !1),
			(n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				t + "Light",
			)),
			this.SetSpriteByPath(n, this.BAe, !1),
			(t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i)),
			this.SetSpriteByPath(t, this.qAe, !1),
			(n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o)),
			this.SetSpriteByPath(n, this.GAe, !1),
			(i = LinkingDotItem.ColorMap.get(e)),
			this.NAe.SetColor(UE.Color.FromHex(i)),
			(t = LinkingDotItem.FxColorMap.get(e));
		this.kAe.SetColor(UE.Color.FromHex(t)), this.SetLight(!1);
	}
	ResetIcon() {
		this.SetLight(!1);
	}
	SetLight(e) {
		this.wAe.SetUIActive(!e),
			this.BAe.SetUIActive(e),
			this.bAe.SetUIActive(!e),
			this.qAe.SetUIActive(e),
			e || this.SetFxBoost(!1);
	}
	SetFxBoost(e) {
		this.kAe.SetUIActive(e);
	}
	RotateLine(e, t = 0) {
		this.GAe.SetUIActive(e),
			this.NAe.SetUIActive(e),
			(e = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(t)),
			((t = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator).Yaw =
				e + 90),
			this.OAe.SetUIRelativeRotation(t.ToUeRotator());
	}
}
((exports.LinkingDotItem = LinkingDotItem).VAe = new Map([
	[IAction_1.EPieceColorType.Blue, "SP_DotBlue"],
	[IAction_1.EPieceColorType.Green, "SP_DotGreen"],
	[IAction_1.EPieceColorType.Red, "SP_DotRed"],
	[IAction_1.EPieceColorType.Yellow, "SP_DotYellow"],
])),
	(LinkingDotItem.HAe = new Map([
		[IAction_1.EPieceColorType.Blue, "SP_CornerBlue"],
		[IAction_1.EPieceColorType.Green, "SP_CornerGreen"],
		[IAction_1.EPieceColorType.Red, "SP_CornerRed"],
		[IAction_1.EPieceColorType.Yellow, "SP_CornerYellow"],
	])),
	(LinkingDotItem.ColorRayIconMap = new Map([
		[IAction_1.EPieceColorType.Blue, "SP_LineBlue"],
		[IAction_1.EPieceColorType.Green, "SP_LineGreen"],
		[IAction_1.EPieceColorType.Red, "SP_LineRed"],
		[IAction_1.EPieceColorType.Yellow, "SP_LineYellow"],
	])),
	(LinkingDotItem.ColorMap = new Map([
		[IAction_1.EPieceColorType.Blue, "3B82B9FF"],
		[IAction_1.EPieceColorType.Green, "64945FFF"],
		[IAction_1.EPieceColorType.Red, "B93B3CFF"],
		[IAction_1.EPieceColorType.Yellow, "B9823BFF"],
	])),
	(LinkingDotItem.FxColorMap = new Map([
		[IAction_1.EPieceColorType.Blue, "41AEFBFF"],
		[IAction_1.EPieceColorType.Green, "4F8040FF"],
		[IAction_1.EPieceColorType.Red, "F0477EFF"],
		[IAction_1.EPieceColorType.Yellow, "F8E56CFF"],
	]));
