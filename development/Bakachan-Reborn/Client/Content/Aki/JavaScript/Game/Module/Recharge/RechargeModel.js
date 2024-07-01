"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RechargeModel = exports.RechargeInfo = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RechargeInfo {
	constructor() {
		(this.PayId = 0), (this.Amount = ""), (this.ProductId = "");
	}
	Init(e, o, t) {
		(this.PayId = e), (this.Amount = o), (this.ProductId = t);
	}
}
exports.RechargeInfo = RechargeInfo;
class RechargeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.tso = new Map());
	}
	SetRechargeInfo(e, o, t) {
		let r = this.tso.get(e);
		(r = r || new RechargeInfo()).Init(e, this.iso(o), t), this.tso.set(e, r);
	}
	GetPayIdAmount(e) {
		var o = this.tso.get(e);
		return o
			? o.Amount
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Shop", 28, "获取PayId的服务器价格失败", ["id", e]),
				"0");
	}
	iso(e) {
		var o,
			t = parseFloat(e);
		return isNaN(t) ||
			(-1 !== (o = (e = t.toString()).indexOf(".")) &&
				(-1 === o || e.length - o - 1 != 1))
			? e
			: t.toFixed(2);
	}
	GetPayIdProductId(e) {
		var o = this.tso.get(e);
		return o
			? o.ProductId
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Shop", 28, "获取PayId的商品名称价格失败", ["id", e]),
				"");
	}
}
exports.RechargeModel = RechargeModel;
