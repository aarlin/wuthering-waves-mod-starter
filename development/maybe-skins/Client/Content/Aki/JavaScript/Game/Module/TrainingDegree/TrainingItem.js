"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrainingItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class TrainingItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UISprite],
		];
	}
	SetData(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.NameId),
			this.GetSprite(1).SetFillAmount(e.FillAmount);
		var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				e.Icon,
			),
			i =
				((t =
					(this.SetSpriteByPath(t, this.GetSprite(3), !1), this.GetText(2))),
				this.GetSprite(4)),
			r = e.TipsId,
			n = void 0 !== r && "" !== r;
		t.SetUIActive(n),
			i.SetUIActive(n),
			n &&
				(LguiUtil_1.LguiUtil.SetLocalTextNew(t, r),
				(n = UE.Color.FromHex(e.BgColor)),
				i.SetColor(n));
	}
}
exports.TrainingItem = TrainingItem;
