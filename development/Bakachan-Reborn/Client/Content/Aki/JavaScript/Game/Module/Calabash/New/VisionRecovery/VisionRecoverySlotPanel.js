"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionRecoverySlotPanel = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	CalabashDefine_1 = require("../../CalabashDefine"),
	VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem");
class VisionRecoverySlotPanel extends UiPanelBase_1.UiPanelBase {
	constructor(e, t = !0) {
		super(),
			(this.Ypt = new Array(CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)),
			(this.Jpt = new Array(CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)),
			(this.zpt = void 0),
			(this.Qpt = !1),
			(this.zpt = e),
			(this.Qpt = t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		var e = new Array();
		e.push(this.Zpt(0)),
			e.push(this.Zpt(1)),
			e.push(this.Zpt(2)),
			e.push(this.Zpt(3)),
			e.push(this.Zpt(4)),
			await Promise.all(e);
	}
	async Zpt(e) {
		var t = this.GetItem(e),
			s = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
				this.zpt,
				this.Qpt,
			);
		await s.CreateThenShowByActorAsync(t.GetOwner()), (this.Jpt[e] = s);
	}
	RefreshUi(e) {
		for (let t = 0; t < this.Ypt.length; t++) {
			let s = this.Ypt[t];
			(s = t >= e.length ? void 0 : e[t]), this.Jpt[t].RefreshUi(s);
		}
	}
}
exports.VisionRecoverySlotPanel = VisionRecoverySlotPanel;
