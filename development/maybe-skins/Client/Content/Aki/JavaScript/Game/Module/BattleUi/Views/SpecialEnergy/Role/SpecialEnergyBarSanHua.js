"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarSanHua = void 0);
const UE = require("ue"),
	SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
	SpecialEnergyBarPointItem_1 = require("../SpecialEnergyBarPointItem"),
	POINT_NUM = 41,
	POINT_WIDTH = 9,
	TOTAL_WIDTH = 369,
	successTagId = 1598973985,
	buffTagId = 1278596622,
	buffId = BigInt(1102012003n);
class SpecialEnergyBarSanHua extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
	constructor() {
		super(...arguments),
			(this.Vct = void 0),
			(this.Hct = !1),
			(this.jct = 0),
			(this.Wct = 1),
			(this.Kct = 0),
			(this.Qct = (t) => {
				var e = this.GetUiNiagara(3);
				0 < t
					? (e.SetAnchorOffsetX(369 * (this.Kct - 0.5)), e.SetUIActive(!0))
					: e.SetUIActive(!1);
			}),
			(this.Xct = (t) => {
				this.$ct(), this.RefreshBarPercent();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UINiagara],
			[3, UE.UINiagara],
			[4, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		var t = [];
		t.push(this.InitPointItem(this.GetItem(0))),
			t.push(this.InitKeyItem(this.GetItem(4))),
			await Promise.all(t);
	}
	async InitPointItem(t) {
		(this.Vct = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
			this.Vct.InitPrefabInfo(41, 9),
			await this.Vct.CreateThenShowByActorAsync(t.GetOwner());
	}
	OnStart() {
		var t;
		this.Config &&
			(this.Config.EffectColor &&
				((t = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor))),
				this.Vct.SetFullEffectColor(t)),
			this.$ct(),
			this.RefreshBarPercent(!0),
			this.GetUiNiagara(3).SetUIActive(!1),
			this.KeyItem?.RefreshKeyEnable(!0, !0));
	}
	$ct() {
		var t = this.GetBuffCountByBuffId(buffId),
			e = this.AttributeComponent.GetCurrentValue(this.Config.MaxAttributeId);
		(this.jct = this.Config.ExtraFloatParams[2 * t] / e),
			(this.Wct = this.Config.ExtraFloatParams[2 * t + 1] / e);
	}
	RefreshBarPercent(t = !1) {
		var e =
			(0 < (e = this.PercentMachine.GetTargetPercent()) && (this.Kct = e),
			this.Vct.UpdateLeftRightPercent(this.jct, this.Wct),
			this.GetItem(1).SetAnchorOffsetX(369 * (e - 0.5)),
			e > this.jct && e <= this.Wct);
		(!t && e === this.Hct) ||
			((this.Hct = e), this.GetUiNiagara(2).SetUIActive(e));
	}
	OnBarPercentChanged() {
		this.RefreshBarPercent();
	}
	Tick(t) {
		super.Tick(t), this.Vct?.Tick(t);
	}
	AddEvents() {
		super.AddEvents(),
			this.ListenForTagCountChanged(1598973985, this.Qct),
			this.ListenForTagCountChanged(buffTagId, this.Xct);
	}
	RemoveEvents() {
		super.RemoveEvents();
	}
}
exports.SpecialEnergyBarSanHua = SpecialEnergyBarSanHua;
