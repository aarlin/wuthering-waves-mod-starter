"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StrengthUpgradeBarItem = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class StrengthUpgradeBarItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.guo = void 0),
			(this.gti = new UE.Rotator(0, 0, 0));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		(this.guo = []), this.guo.push(this.GetItem(1));
	}
	Update(t) {
		(this.Pe = t), this.Refresh();
	}
	Refresh() {
		var t, e, i;
		this.Pe &&
			((t = CommonParamById_1.configCommonParamById.GetIntConfig(
				"SingleStrengthValue",
			)),
			(e = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MaxSingleStrengthItemCount",
			)),
			(i = this.Pe.MaxStrength),
			(i = Math.min(Math.floor(i / t), e)),
			this.fuo(i),
			this.GetSprite(0).SetFillAmount(1 / i));
	}
	fuo(t) {
		if (this.guo) {
			var e = this.GetItem(1),
				i = e.GetParentAsUIItem();
			for (let o = this.guo.length; o < t; o++)
				this.guo.push(LguiUtil_1.LguiUtil.CopyItem(e, i));
			var o = 360 / t;
			let a = 0;
			for (let e = 0; e < t; e++) {
				var r = this.guo[e];
				(this.gti.Yaw = a), r.SetUIRelativeRotation(this.gti), (a += o);
			}
		}
	}
}
exports.StrengthUpgradeBarItem = StrengthUpgradeBarItem;
