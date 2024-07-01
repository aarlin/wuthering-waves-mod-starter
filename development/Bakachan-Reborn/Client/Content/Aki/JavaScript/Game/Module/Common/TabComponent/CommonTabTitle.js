"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonTabTitle = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class CommonTabTitle extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
		];
	}
	UpdateIcon(e) {
		this.SetSpriteByPath(e, this.GetSprite(0), !1);
	}
	UpdateTitle(e) {
		var t = this.GetText(1);
		e
			? (t.SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.TextId, ...e.Args))
			: t.SetUIActive(!1);
	}
}
exports.CommonTabTitle = CommonTabTitle;
