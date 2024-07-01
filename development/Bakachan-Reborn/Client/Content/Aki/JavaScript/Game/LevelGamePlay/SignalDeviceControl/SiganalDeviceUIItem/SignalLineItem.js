"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LinkingLineItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LinkingLineItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.LineType = 3),
			(this.SprBg = void 0),
			(this.SprLine = void 0),
			(this.SprLineHalf = void 0),
			(this.SprSpot = void 0),
			(this.SprRay = void 0),
			(this.SprRayHalf = void 0),
			(this.LineType = e);
	}
	static Create(e) {
		return new LinkingLineItem(e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UISprite],
		];
	}
	OnStart() {
		(this.SprBg = this.GetSprite(0)),
			(this.SprLine = this.GetSprite(1)),
			(this.SprLineHalf = this.GetSprite(2)),
			(this.SprSpot = this.GetSprite(3)),
			(this.SprRay = this.GetSprite(4)),
			(this.SprRayHalf = this.GetSprite(5)),
			this.SprBg.SetUIActive(!1),
			this.SprLine.SetUIActive(!1),
			this.SprLineHalf.SetUIActive(!1),
			this.SprSpot.SetUIActive(!1),
			this.SprRay.SetUIActive(!1),
			this.SprRayHalf.SetUIActive(!1);
	}
	InitIcon(e, t = !1) {
		var i = ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor,
			o = LinkingLineItem.ColorSpotIconMap.get(i);
		(o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o)),
			this.SetSpriteByPath(o, this.SprSpot, !1),
			(o = LinkingLineItem.ColorRayIconMap.get(i)),
			(o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o)),
			this.SetSpriteByPath(o, this.SprRay, !1),
			this.SetSpriteByPath(o, this.SprRayHalf, !1),
			(o = LinkingLineItem.ColorMap.get(i)),
			this.SprBg.SetColor(UE.Color.FromHex(o)),
			this.SprLine.SetColor(UE.Color.FromHex(o)),
			this.SprLineHalf.SetColor(UE.Color.FromHex(o)),
			this.RotateLine(e),
			(i = 3 === this.LineType || 4 === this.LineType);
		this.SprBg.SetUIActive(!0),
			this.SprLine.SetUIActive(!t),
			this.SprLineHalf.SetUIActive(t),
			this.SprRay.SetUIActive(!t),
			this.SprRayHalf.SetUIActive(t || !i),
			this.SprSpot.SetUIActive(!0);
	}
	RotateLine(e) {
		e = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(e);
		var t = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator;
		(t.Yaw = e),
			this.GetRootItem().SetUIRelativeRotation(t.ToUeRotator()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Temp", 36, "RotateLine", ["angle", e]);
	}
	SetLineHalf(e) {
		this.SprLine.SetUIActive(!1),
			this.SprLineHalf.SetUIActive(!0),
			this.SprRay.SetUIActive(!1),
			this.SprRayHalf.SetUIActive(!0);
		var t = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator;
		e = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(e);
		(t.Yaw = e), this.GetRootItem().SetUIRelativeRotation(t.ToUeRotator());
	}
}
((exports.LinkingLineItem = LinkingLineItem).ColorSpotIconMap = new Map([
	[IAction_1.EPieceColorType.Blue, "SP_SpotBlue"],
	[IAction_1.EPieceColorType.Green, "SP_SpotGreen"],
	[IAction_1.EPieceColorType.Red, "SP_SpotRed"],
	[IAction_1.EPieceColorType.Yellow, "SP_SpotYellow"],
])),
	(LinkingLineItem.ColorRayIconMap = new Map([
		[IAction_1.EPieceColorType.Blue, "SP_LineBlue"],
		[IAction_1.EPieceColorType.Green, "SP_LineGreen"],
		[IAction_1.EPieceColorType.Red, "SP_LineRed"],
		[IAction_1.EPieceColorType.Yellow, "SP_LineYellow"],
	])),
	(LinkingLineItem.ColorMap = new Map([
		[IAction_1.EPieceColorType.Blue, "3B82B9FF"],
		[IAction_1.EPieceColorType.Green, "64945FFF"],
		[IAction_1.EPieceColorType.Red, "B93B3CFF"],
		[IAction_1.EPieceColorType.Yellow, "B9823BFF"],
	]));
