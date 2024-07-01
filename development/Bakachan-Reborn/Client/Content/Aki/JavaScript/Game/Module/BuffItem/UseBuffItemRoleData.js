"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UseBuffItemRoleData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const TEN_THOUSANDTH_RATIO = 1e4;
class UseBuffItemRoleData {
	constructor(t, e, r, o, i, n, a, s) {
		(this.qgt = 0),
			(this.RoleName = t),
			(this.Position = e),
			(this.RoleConfigId = r),
			(this.RoleLevel = o),
			(this.CurrentAttribute = i),
			(this.MaxAttribute = n),
			(this.UseItemConfigId = a),
			(this.Entity = s);
	}
	SetCurrentAttribute(t) {
		this.CurrentAttribute = t;
	}
	SetUseItemCount(t) {
		this.qgt = t;
	}
	AddUseItemCount() {
		ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
			this.UseItemConfigId,
		) <= this.qgt || this.qgt++;
	}
	ReduceUseItemCount() {
		this.qgt <= 1 || this.qgt--;
	}
	get UseItemCount() {
		return this.qgt;
	}
	GetUseItemMaxCount() {
		var t,
			e = (t =
				ModelManager_1.ModelManager.InventoryModel).GetItemCountByConfigId(
				this.UseItemConfigId,
			);
		return 0 <
			(t = t
				.GetItemDataBaseByConfigId(this.UseItemConfigId)[0]
				.GetUseCountLimit())
			? Math.min(e, t)
			: e;
	}
	IsMaxItemCount() {
		return this.qgt >= this.GetUseItemMaxCount();
	}
	IsMinItemCount() {
		return this.qgt <= 1;
	}
	GetPreviewAttribute() {
		var t = this.GetAddAttribute();
		return Math.min(t + this.CurrentAttribute, this.MaxAttribute);
	}
	GetPreviewAttributeNoLimit() {
		return this.GetAddAttribute() + this.CurrentAttribute;
	}
	GetAddAttribute() {
		var t = this.Ggt(this.UseItemConfigId, this.Entity) * this.qgt;
		return Math.floor(t);
	}
	GetEntityId() {
		return this.Entity ? this.Entity.Id : -1;
	}
	Ggt(t, e) {
		if (
			(t =
				ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemBuffConfig(t))
		) {
			let r = 0;
			for (const o of t) r += this.Ngt(o, e);
			return r;
		}
	}
	Ngt(t, e) {
		let r = 0;
		var o = ConfigManager_1.ConfigManager.BuffItemConfig,
			i = t.ExtraEffectParameters;
		if (0 === (g = t.ExtraEffectID))
			for (const i of t.RoutineExpirationEffects) {
				var n = o.GetBuffConfig(e.Id, i);
				r += this.Ngt(n, e);
			}
		else if (4 === g)
			for (const n of i) {
				var a,
					s,
					u = BigInt(n),
					f = o.GetDamageConfig(e.Id, u);
				f
					? ((a = this.Ogt(e, f.RelatedProperty)),
						void 0 === (s = f.CureBaseValue[0])
							? Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"BuffItem",
									8,
									"计算Buff道具治疗生命数值时，结算表对应行的CureBaseValue为空",
									["Buff配置", t],
								)
							: (f = f.RateLv[0])
								? (r += s + a * (f /= 1e4))
								: (r += s))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"BuffItem",
							8,
							"计算Buff道具治疗生命数值时，找不到结算表对应配置",
							["结算表Id", u],
							["Buff配置", t],
						);
			}
		else if (101 === g) {
			if (i.length < 2) return r;
			var g = e.GetComponent(156);
			r +=
				(Number(i[0]) / 1e4) * (g = g.GetCurrentValue(EAttributeId.Tkn)) +
				Number(i[1]);
		}
		return r;
	}
	Ogt(t, e) {
		return t.GetComponent(156).GetCurrentValue(e);
	}
}
exports.UseBuffItemRoleData = UseBuffItemRoleData;
