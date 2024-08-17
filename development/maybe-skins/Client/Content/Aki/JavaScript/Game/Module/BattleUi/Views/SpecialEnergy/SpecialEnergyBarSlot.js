"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarSlot = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase"),
	SpecialEnergyBarSlotItem_1 = require("./SpecialEnergyBarSlotItem"),
	effectBasePercents = [1, 20 / 41, 13 / 41, 9 / 41, 7 / 41, 6 / 41];
class SpecialEnergyBarSlot extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
	constructor() {
		super(...arguments), (this.xmt = 0), (this.wmt = []), (this.IsMorph = !1);
	}
	OnRegisterComponent() {
		(this.xmt = this.Config.SlotNum),
			0 === this.xmt &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 18, "槽型的能量条，分段数量不能为0", [
					"id",
					this.Config.Id,
				]);
		for (let e = 0; e <= this.xmt + 1; e++)
			this.ComponentRegisterInfos.push([e, UE.UIItem]);
	}
	async OnBeforeStartAsync() {
		var e = [];
		for (let t = 0; t < this.xmt; t++)
			e.push(this.InitSlotItem(this.GetItem(t)));
		e.push(this.InitKeyItem(this.GetItem(this.xmt))), await Promise.all(e);
	}
	async InitSlotItem(e) {
		var t = new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem();
		await t.CreateThenShowByActorAsync(e.GetOwner()), this.wmt.push(t);
	}
	OnStart() {
		if (this.Config) {
			var e = effectBasePercents[this.xmt - 1];
			for (const t of this.wmt) t.SetEffectBasePercent(e);
			if (this.Config.EffectColor) {
				var t = UE.Color.FromHex(this.Config.EffectColor),
					r = new UE.LinearColor(t);
				let e = t;
				this.Config.PointColor &&
					(e = UE.Color.FromHex(this.Config.PointColor));
				for (const o of this.wmt)
					o.SetBarColor(t),
						o.SetPointColor(e),
						o.SetFullEffectColor(r, this.IsMorph);
			}
			this.GetItem(this.xmt + 1)?.SetUIActive(!this.IsMorph),
				this.RefreshBarPercent(!0);
		}
	}
	RefreshBarPercent(e = !1) {
		var t = this.PercentMachine.GetCurPercent(),
			r = this.GetKeyEnable();
		for (let e = 0; e < this.wmt.length; e++)
			this.wmt[e].UpdatePercent(t * this.xmt - e, r);
		this.KeyItem?.RefreshKeyEnable(r, e);
	}
	OnBarPercentChanged() {
		this.RefreshBarPercent();
	}
	OnKeyEnableChanged() {
		this.RefreshBarPercent();
	}
	Tick(e) {
		super.Tick(e);
		for (const t of this.wmt) t.Tick(e);
	}
}
exports.SpecialEnergyBarSlot = SpecialEnergyBarSlot;
