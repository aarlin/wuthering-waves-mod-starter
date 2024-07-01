"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarChiXia = void 0);
const SpecialEnergyBarPointGraduate_1 = require("../SpecialEnergyBarPointGraduate"),
	GRADUATE_ENERGY_NUM = 30;
class SpecialEnergyBarChiXia extends SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate {
	constructor() {
		super(...arguments),
			(this.lne = (e, t) => {
				if (t) {
					t =
						this.AttributeComponent.GetCurrentValue(this.Config.AttributeId) -
						30;
					var i = this.AttributeComponent.GetCurrentValue(
						this.Config.MaxAttributeId,
					);
					let e = 0 < i ? t / i : 0;
					0 <= e
						? (this.SetGraduateItemOffset(0, e),
							this.GraduateItemList[0].SetUIActive(!0))
						: this.GraduateItemList[0].SetUIActive(!1);
				} else this.GraduateItemList[0].SetUIActive(!1);
			});
	}
	OnInitData() {
		super.OnInitData(), (this.NeedInitSlot = !1), (this.NeedInitNumItem = !0);
	}
	AddEvents() {
		super.AddEvents(),
			this.ListenForTagAddOrRemoveChanged(1280168885, this.lne);
	}
	RemoveEvents() {
		super.RemoveEvents();
	}
	OnStart() {
		super.OnStart(), this.GraduateItemList[0]?.SetUIActive(!1);
	}
	RefreshBarPercent(e = !1) {
		var t = this.PercentMachine.GetCurPercent();
		this.PointItem.UpdatePercent(t),
			this.KeyItem?.RefreshKeyEnable(t >= this.Config.DisableKeyOnPercent, e),
			(t = this.AttributeComponent.GetCurrentValue(this.Config.AttributeId));
		this.NumItem?.SetNum(t);
	}
}
exports.SpecialEnergyBarChiXia = SpecialEnergyBarChiXia;
