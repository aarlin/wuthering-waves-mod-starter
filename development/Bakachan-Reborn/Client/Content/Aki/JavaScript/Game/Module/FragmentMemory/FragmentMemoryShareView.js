"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentMemoryShareView = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class FragmentMemoryShareView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.Y6i = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	OnStart() {
		this.Og();
	}
	Og() {
		(this.Y6i = this.OpenParam), this.Aqe(), this.C4e(), this.Pqe(), this.$2e();
	}
	$2e() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(2),
			"FragmentMemoryCollectTime",
			this.Y6i.GetTimeText(),
		);
	}
	Aqe() {
		this.SetTextureByPath(this.Y6i.GetBgResource(), this.GetTexture(0));
	}
	C4e() {
		this.GetText(1).ShowTextNew(this.Y6i.GetTitle());
	}
	Pqe() {
		this.GetText(3).ShowTextNew(this.Y6i.GetDesc());
	}
}
exports.FragmentMemoryShareView = FragmentMemoryShareView;
