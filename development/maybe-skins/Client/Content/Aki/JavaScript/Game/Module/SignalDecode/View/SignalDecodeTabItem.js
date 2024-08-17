"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDecodeTabItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	BLACK_COLOR = "#000000FF";
class SignalDecodeTabItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, o) {
		super(),
			(this.TabIndex = e),
			(this.WaveformId = t),
			this.CreateThenShowByActor(o.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UIText],
		];
	}
	OnStart() {
		this.GetText(3).SetText(this.TabIndex.toString());
	}
	OnProcess(e) {
		e = this.TabIndex === e;
		var t = this.GetSprite(0),
			o = this.GetSprite(1);
		t.SetUIActive(!e), o.SetUIActive(e), (t = this.GetText(3));
		e
			? (t.SetColor(UE.Color.FromHex("#000000FF")), t.SetAnchorOffsetY(30))
			: t.SetAnchorOffsetY(0);
	}
	UpdateColor(e) {
		e &&
			(this.GetSprite(0).SetColor(UE.Color.FromHex(e.ActiveColor)),
			this.GetText(3).SetColor(UE.Color.FromHex(e.ActiveColor)),
			this.GetSprite(1).SetColor(UE.Color.FromHex(e.ActiveColor)),
			this.GetSprite(2).SetColor(UE.Color.FromHex(e.ActiveColor)));
	}
	SetComplete() {
		this.GetSprite(2).SetUIActive(!0);
	}
}
exports.SignalDecodeTabItem = SignalDecodeTabItem;
