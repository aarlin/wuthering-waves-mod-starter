"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PowerConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	PowerDefines_1 = require("./PowerDefines");
class PowerConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.hio = new Array()), (this.lio = new Set());
	}
	get PowerItemInfoList() {
		return this.hio;
	}
	OnInit() {
		var e = this._io(),
			o = new Array();
		for (const n of e.keys()) {
			var r = ItemInfoById_1.configItemInfoById.GetConfig(n);
			r && o.push(r);
		}
		for (const r of o) {
			var n = new PowerDefines_1.PowerItemInfo(r.Id);
			(n.ItemName = r.Name),
				(n.IsHideWhenZero = Boolean(e.get(n.ItemId))),
				this.hio.push(n);
		}
		const i = Array.from(e.keys());
		return (
			this.hio.sort((e, o) => i.indexOf(e.ItemId) - i.indexOf(o.ItemId)), !0
		);
	}
	GetPowerItemInfos(e) {
		for (const o of this.hio) if (o.ItemId === e) return o;
	}
	_io() {
		var e = new Map();
		for (const n of CommonParamById_1.configCommonParamById
			.GetStringConfig("energy_sort")
			.split(",")) {
			var o = n.split(":"),
				r = Number(o[0]);
			o = Number(o[1]);
			e.set(r, o);
		}
		return e;
	}
	GetPowerNaturalLimit() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"renew_energy_limit",
			) ?? 0
		);
	}
	GetPowerChargeLimit() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"charge_energy_limit",
			) ?? 0
		);
	}
	GetPowerIncreaseSpan() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"renew_energy_timespan",
		);
	}
	GetPowerShopIds() {
		if (0 === this.lio.size)
			for (const o in PowerDefines_1.EPowerShopType) {
				var e = Number(o);
				if (isNaN(e)) break;
				this.lio.add(e);
			}
		return this.lio;
	}
}
exports.PowerConfig = PowerConfig;
