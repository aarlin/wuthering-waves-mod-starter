"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemExchangeModel =
		exports.ExchangeSimulation =
		exports.ExchangeInfo =
			void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ItemExchangeDefine_1 = require("./ItemExchangeDefine");
class ExchangeInfo {
	constructor() {
		(this.ConsumeCount = 0), (this.GainCount = 0);
	}
}
exports.ExchangeInfo = ExchangeInfo;
class ExchangeSimulation {
	constructor() {
		(this.ExChangeTime = 0), (this.ExChangeCount = 0), (this.ConsumeCount = 0);
	}
}
exports.ExchangeSimulation = ExchangeSimulation;
class ItemExchangeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.DCi = void 0);
	}
	OnInit() {
		return (this.DCi = new Map()), !0;
	}
	OnClear() {
		return !(this.DCi = void 0);
	}
	InitItemExchangeTimeInfo(e) {
		for (const n of e) this.DCi.set(n.G3n, n);
	}
	GetExchangeInfo(e) {
		return (
			this.DCi.get(e) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"ItemExchange",
						9,
						"前后端版本可能不一致, 当前兑换的道具并没有后端配置!",
						["itemId", e],
					)),
			this.DCi.get(e)
		);
	}
	GetExChangeTime(e) {
		return this.DCi.get(e)?.S5n ?? 0;
	}
	AddExchangeTime(e, n) {
		(e = this.DCi.get(e)) && ((e.E5n += n), (e.S5n += n));
	}
	CalculateConsume(e, n = 0, t = 0, a = !1) {
		let o = n;
		0 < t && (o = ItemExchangeDefine_1.MAX_COUNT);
		var i =
			ConfigManager_1.ConfigManager.ItemExchangeConfig.GetExChangeConfigList(e);
		if (i && !(i.length <= 0)) {
			let x = 0;
			var r = i.length - 1,
				s = this.GetExChangeTime(e) + 1;
			let c = 0;
			for (let e = r; 0 <= e; e--) {
				var g = i[e];
				if (s >= g.Times) {
					x = e;
					const n = g.Consume.keys().next()?.value;
					c =
						ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
							n,
						);
					break;
				}
			}
			var h = this.RCi(e);
			let m = 0,
				E = 0,
				f = 0;
			for (; x <= r; ) {
				var C = i[x],
					u = x < r ? i[x + 1] : void 0;
				let e = Math.ceil((o - E) / C.GainCount);
				if (
					(u && ((u = u.Times - C.Times), (e = Math.min(e, u))),
					(e = 0 < t && e + m > t ? t - m : e) + m > h && (e = h - m),
					(u = C.Consume.values().next()?.value),
					!a && f + e * u > c && (e = Math.floor((c - f) / u)),
					(f += e * u),
					(m += e),
					(E += e * C.GainCount) >= o || (0 < t && m >= t) || m >= h || f >= c)
				)
					break;
				x++;
			}
			return (
				((n = new ExchangeSimulation()).ExChangeTime = m),
				(n.ExChangeCount = E),
				(n.ConsumeCount = f),
				n
			);
		}
	}
	RCi(e) {
		var n =
			0 < (e = this.GetExchangeInfo(e)).JDs
				? e.JDs - e.E5n
				: ItemExchangeDefine_1.MAX_COUNT;
		e = 0 < e.YDs ? e.YDs - e.S5n : ItemExchangeDefine_1.MAX_COUNT;
		return Math.min(n, e);
	}
	GetCurExchangeInfo(e, n = 0) {
		var t = new ExchangeInfo(),
			a =
				ConfigManager_1.ConfigManager.ItemExchangeConfig.GetExChangeConfigList(
					e,
				);
		if (a) {
			var o = this.GetExChangeTime(e) + n + 1;
			for (const e of a) {
				if (o < e.Times) break;
				for (var [, i] of e.Consume)
					(t.ConsumeCount = i), (t.GainCount = e.GainCount);
			}
		}
		return t;
	}
	CheckIsMaxExChangeTime(e, n = 0) {
		return (
			(0 < (e = this.GetExchangeInfo(e)).JDs && e.E5n + n >= e.JDs) ||
			(0 < e.YDs && e.S5n + n >= e.YDs)
		);
	}
	GetMaxExChangeTime(e) {
		var n = this.RCi(e);
		return this.CalculateConsume(e, 0, n)?.ExChangeTime ?? 0;
	}
}
exports.ItemExchangeModel = ItemExchangeModel;
