"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfluenceReputationModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InfluenceReputationDefine_1 = require("../InfluenceReputationDefine"),
	InfluenceInstance_1 = require("./InfluenceInstance");
class InfluenceReputationModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Xri = new Map()), (this.$ri = new Set());
	}
	SetInfluenceInfoList(e) {
		for (const t of e) {
			var n = this.Xri.get(t.w5n);
			n
				? (n.SetRelation(t.$Rs), n.SetReceiveReward(t.b5n))
				: this.Xri.set(
						t.w5n,
						new InfluenceInstance_1.InfluenceInstance(t.w5n, t.b5n, t.$Rs),
					),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RedDotInfluence,
					t.w5n,
				);
		}
	}
	UpdateInfluenceRewardIndex(e, n) {
		var t = this.Xri.get(e);
		return t
			? (t.SetReceiveReward(n), !0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"InfluenceReputation",
						11,
						"奖励获取有问题,当前客户端没有该势力数据",
						["Id", e],
					),
				!1);
	}
	GetInfluenceInstance(e) {
		return this.Xri.get(e);
	}
	GetCanReceiveReward(e) {
		if (e !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID) {
			var n =
				ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(e);
			if (
				(e =
					ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
						e,
					))
			)
				return n.ReputationReward.length === e.RewardIndex + 1
					? { IsAllReceived: !0, Reward: n.ReputationReward[e.RewardIndex] }
					: {
							IsAllReceived: !1,
							Reward: n.ReputationReward[e.RewardIndex + 1],
						};
		}
	}
	GetRewardList(e) {
		return (
			(e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)),
			Array.from(e.DropPreview)
		);
	}
	GetReputationProgress(e) {
		let n = 0,
			t = 0;
		for (const o of ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
			e,
		).ReputationItem) {
			n += o.Item2;
			var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				o.Item1,
			);
			t += MathUtils_1.MathUtils.Clamp(r, 0, o.Item2);
		}
		return { Current: t, Max: n };
	}
	SetUnLockCountry(e) {
		for (let n = 0, t = e.length; n < t; n++) this.$ri.add(e[n]);
	}
	GetUnLockCountry() {
		return Array.from(this.$ri);
	}
	IsCountryUnLock(e) {
		return this.$ri.has(e);
	}
	FilterUnLockInfluence(e, n) {
		var t = [];
		for (let i = 0, u = e.length; i < u; ++i) {
			var r,
				o,
				a = e[i];
			a !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID &&
				this.Xri.has(a) &&
				((r =
					ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceTitle(a)),
				(o = new RegExp(n, "i")),
				r.search(o) < 0 || t.push(a));
		}
		return t;
	}
	FilterUnLockInfluenceList(e, n) {
		var t,
			r = { HasResult: !1, InfluenceList: [] };
		for (const o of e)
			o !== InfluenceReputationDefine_1.RAMDOM_COUNTRY_ID &&
				((t =
					ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(o)),
				(t = this.FilterUnLockInfluence(t.Influences, n)),
				r.InfluenceList.push([o, t]),
				(r.HasResult = r.HasResult || 0 < t.length));
		return r;
	}
	RedDotInfluenceRewardCondition(e) {
		var n = this.GetCanReceiveReward(e);
		return (
			!!n &&
			!n.IsAllReceived &&
			this.GetReputationProgress(e).Current >= n.Reward.Item1
		);
	}
	HasRedDotExcludeCurrentCountry(e) {
		for (const n of this.$ri)
			if (n !== e && this.HasRedDotInCurrentCountry(n)) return !0;
		return !1;
	}
	HasRedDotInCurrentCountry(e) {
		for (const n of ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
			e,
		).Influences)
			if (this.RedDotInfluenceRewardCondition(n)) return !0;
		return !1;
	}
}
exports.InfluenceReputationModel = InfluenceReputationModel;
