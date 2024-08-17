"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExchangeRewardModel = exports.POWER_DISCOUNT_HELP_ID = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ExchangeRewardData_1 = require("./ExchangeRewardData");
exports.POWER_DISCOUNT_HELP_ID = 26;
class ExchangeRewardModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.FQ = new Map()), (this.bsi = new Map());
	}
	OnInit() {
		return !0;
	}
	Phrase(e) {
		this.FQ.clear(), this.bsi.clear();
		for (const n of Object.keys(e.JRs)) {
			var a = new ExchangeRewardData_1.ExchangeShareData();
			a.Phrase(Number.parseInt(n), e.JRs[n]), this.bsi.set(a.GetId(), a);
		}
		for (const a of Object.keys(e.zRs)) {
			var n = new ExchangeRewardData_1.ExchangeRewardData();
			n.Phrase(Number.parseInt(a), e.zRs[a]), this.FQ.set(n.GetId(), n);
		}
	}
	OnExchangeRewardNotify(e) {
		let a = this.FQ.get(e.ZRs);
		a ||
			((a = new ExchangeRewardData_1.ExchangeRewardData()),
			this.FQ.set(e.ZRs, a)),
			a.Phrase(e.ZRs, e.I5n);
	}
	OnShareInfoNotify(e) {
		for (const n of Object.keys(e.eDs)) {
			var a = Number.parseInt(n);
			let r = this.bsi.get(a);
			r ||
				((r = new ExchangeRewardData_1.ExchangeShareData()),
				this.bsi.set(a, r)),
				r.Phrase(a, e.eDs[n]);
		}
	}
	GetInstanceDungeonIfCanExchange(e) {
		if (
			!(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e,
				).RewardId)
		)
			return !0;
		var a =
			ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareId(e);
		let n = 0,
			r = 0;
		return (
			(r = (
				a
					? ((n =
							ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
								a,
							)),
						this.bsi.get(a))
					: ((n =
							ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardMaxCount(
								e,
							)),
						this.FQ.get(e))
			)?.GetCount()),
			!(n && r && r >= n)
		);
	}
	GetRewardIfCanExchange(e) {
		var a =
			ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareId(e);
		let n = 0,
			r = 0;
		return (
			(r = (
				a
					? ((n =
							ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
								a,
							)),
						this.bsi.get(a))
					: ((n =
							ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardMaxCount(
								e,
							)),
						this.FQ.get(e))
			)?.GetCount()),
			!(n && r && r >= n)
		);
	}
	GetExchangeRewardShareCount(e) {
		return this.bsi.get(e)?.GetCount() ?? 0;
	}
	GetExchangeNormalConsume(e) {
		if (
			(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e,
				).RewardId)
		) {
			var a,
				n,
				r = [];
			for ([
				a,
				n,
			] of ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeCost(
				e,
			)) {
				var t = [{ IncId: 0, ItemId: a }, n];
				r.push(t);
			}
			return r;
		}
	}
	IsFinishInstance(e) {
		var a;
		return (
			!!(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(
					e,
				)) &&
			((a =
				ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardMaxCount(
					e,
				)),
			(e = this.FQ.get(e)?.GetCount()),
			!!(a && e && a <= e))
		);
	}
}
exports.ExchangeRewardModel = ExchangeRewardModel;
