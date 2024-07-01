"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarJianXin = void 0);
const SpecialEnergyBarPointGraduate_1 = require("../SpecialEnergyBarPointGraduate");
class SpecialEnergyBarJianXin extends SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate {
	constructor() {
		super(...arguments),
			(this.kct = 0),
			(this.Fct = (e) => {
				0 < e && this.SlotItem.PlayUseEffectWithPercent(this.kct);
			});
	}
	AddEvents() {
		super.AddEvents(), this.ListenForTagCountChanged(2044061337, this.Fct);
	}
	RefreshBarPercent(e = !1) {
		let t = this.PercentMachine.GetCurPercent();
		1 === this.PercentMachine.GetTargetPercent() && (t = 1),
			(this.IsKeyEnable = t >= this.Config.DisableKeyOnPercent);
		let i = !0,
			r = !1;
		if (
			(e
				? (i = t < 1)
				: t > this.LastPercent
					? ((r = 1 <= t), (i = !r))
					: t < this.LastPercent && ((r = t <= 0), (i = r)),
			this.SlotItem.UpdatePercentWithVisible(
				t,
				i,
				r,
				e,
				r && i ? 0 : this.LastPercent,
			),
			this.PointItem.UpdatePercentWithVisible(t, !i, r, e),
			r || e)
		)
			for (const e of this.GraduateItemList) e.SetUIActive(!i);
		this.KeyItem?.RefreshKeyEnable(this.IsKeyEnable, e),
			0 === t && (this.kct = this.LastPercent),
			(this.LastPercent = t);
	}
}
exports.SpecialEnergyBarJianXin = SpecialEnergyBarJianXin;
