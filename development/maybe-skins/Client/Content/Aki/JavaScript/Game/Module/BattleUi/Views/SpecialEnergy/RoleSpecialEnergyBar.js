"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSpecialEnergyBar = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
	SpecialEnergyBarChiXia_1 = require("./Role/SpecialEnergyBarChiXia"),
	SpecialEnergyBarJianXin_1 = require("./Role/SpecialEnergyBarJianXin"),
	SpecialEnergyBarJinXi_1 = require("./Role/SpecialEnergyBarJinXi"),
	SpecialEnergyBarSanHua_1 = require("./Role/SpecialEnergyBarSanHua"),
	SpecialEnergyBarMorph_1 = require("./SpecialEnergyBarMorph"),
	SpecialEnergyBarMorphCountDown_1 = require("./SpecialEnergyBarMorphCountDown"),
	SpecialEnergyBarPoint_1 = require("./SpecialEnergyBarPoint"),
	SpecialEnergyBarPointGraduate_1 = require("./SpecialEnergyBarPointGraduate"),
	SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot"),
	specialEnergyBarClassList = [
		SpecialEnergyBarPoint_1.SpecialEnergyBarPoint,
		SpecialEnergyBarSlot_1.SpecialEnergyBarSlot,
		SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate,
		SpecialEnergyBarMorph_1.SpecialEnergyBarMorph,
		SpecialEnergyBarMorph_1.SpecialEnergyBarMorph,
		SpecialEnergyBarMorphCountDown_1.SpecialEnergyBarMorphCountDown,
		SpecialEnergyBarJianXin_1.SpecialEnergyBarJianXin,
		SpecialEnergyBarSanHua_1.SpecialEnergyBarSanHua,
		SpecialEnergyBarChiXia_1.SpecialEnergyBarChiXia,
		SpecialEnergyBarMorphCountDown_1.SpecialEnergyBarMorphCountDown,
		SpecialEnergyBarJinXi_1.SpecialEnergyBarMorphJinXi,
	];
class RoleSpecialEnergyBar {
	constructor() {
		(this.wnt = void 0),
			(this.Yct = new Map()),
			(this.Jct = []),
			(this.lne = (e, a) => {
				this.zct(!0);
			});
	}
	async InitAsync(e, a) {
		this.wnt = a;
		var r = this.Zct(a);
		if (r) {
			var i = [];
			if ((i.push(this.emt(e, a, 0, r)), r.TagEnergyBarIdMap))
				for (var [n, t] of r.TagEnergyBarIdMap)
					this.tmt(n, this.lne),
						(t =
							ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
								t,
							)) && i.push(this.emt(e, a, n, t));
			this.zct(), await Promise.all(i);
		}
	}
	SetVisible(e) {
		for (const a of this.Yct.values()) a.SetVisible(e, 0);
	}
	Destroy() {
		this.U$e();
		for (const e of this.Yct.values()) e.Destroy();
		this.Yct.clear();
	}
	Tick(e) {
		for (const a of this.Yct.values()) a.Tick(e);
	}
	Zct(e) {
		if (
			e?.EntityHandle?.Valid &&
			(e = e.RoleConfig) &&
			0 !== (e = e.SpecialEnergyBarId)
		)
			return ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
				e,
			);
	}
	async emt(e, a, r, i) {
		var n = new specialEnergyBarClassList[i.PrefabType]();
		n.InitData(a, i),
			this.Yct.set(r, n),
			await n.InitByPathAsync(e, i.PrefabPath);
	}
	zct(e = !1) {
		if (this.Yct.size <= 1) this.Yct.get(0)?.SetVisible(!0, 1);
		else {
			var a,
				r,
				i = this.wnt?.GameplayTagComponent;
			let t = 0;
			for (const e of this.Yct.keys())
				if (0 !== e && i?.HasTag(e)) {
					t = e;
					break;
				}
			for ([a, r] of this.Yct) {
				var n = a === t;
				r.SetVisible(n, 1), e && r.OnChangeVisibleByTagChange(n);
			}
		}
	}
	tmt(e, a) {
		var r = this.wnt?.GameplayTagComponent;
		r && ((r = r.ListenForTagAddOrRemove(e, a)), this.Jct.push(r));
	}
	U$e() {
		if (this.Jct) {
			for (const e of this.Jct) e.EndTask();
			this.Jct.length = 0;
		}
	}
}
exports.RoleSpecialEnergyBar = RoleSpecialEnergyBar;
