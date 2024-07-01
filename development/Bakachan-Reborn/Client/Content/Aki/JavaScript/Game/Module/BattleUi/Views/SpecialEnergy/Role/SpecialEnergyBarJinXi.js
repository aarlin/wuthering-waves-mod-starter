"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarMorphJinXi = void 0);
const SpecialEnergyBarMorph_1 = require("../SpecialEnergyBarMorph"),
	SpecialEnergyBarPointGraduate_1 = require("../SpecialEnergyBarPointGraduate");
class SpecialEnergyBarMorphJinXi extends SpecialEnergyBarMorph_1.SpecialEnergyBarMorph {
	OnInitData() {
		super.OnInitData();
	}
	OnBeforeShow() {
		super.OnBeforeShow(),
			this.NiagaraList[0] &&
				this.BarItem.ReplaceFullEffect(this.NiagaraList[0]);
	}
	OnStart() {
		super.OnStart();
		var e = this.Config.SlotNum - 1;
		for (let r = 0; r < e; r++)
			this.BarItem.SetGraduateItemOffset(
				r,
				this.Config.ExtraFloatParams[r + 1],
			);
	}
	GetSpecialEnergyBarClass() {
		return SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate;
	}
}
exports.SpecialEnergyBarMorphJinXi = SpecialEnergyBarMorphJinXi;
