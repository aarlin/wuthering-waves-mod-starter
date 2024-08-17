"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PowerConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	PowerDefines_1 = require("./PowerDefines");
class PowerConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.noo = new Set());
	}
	GetConfSortRule() {
		var e = new Map();
		for (const n of CommonParamById_1.configCommonParamById
			.GetStringConfig("energy_sort")
			.split(",")) {
			var r = n.split(":"),
				o = Number(r[0]),
				r = Number(r[1]);
			e.set(o, r);
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
	GetOverPowerLimit() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"store_energy_limit",
			) ?? 0
		);
	}
	GetOverPowerRecoverTimeSpan() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"store_energy_timespan",
			) ?? 0
		);
	}
	GetSingleTimeExchangePowerLimit() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"single_time_get_max",
			) ?? 0
		);
	}
	GetPowerCurrencyIds() {
		return (
			CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"PowerTipsIdArray",
			) ?? [0]
		);
	}
	GetPowerShopIds() {
		if (0 === this.noo.size)
			for (const r in PowerDefines_1.EPowerShopType) {
				var e = Number(r);
				if (isNaN(e)) break;
				this.noo.add(e);
			}
		return this.noo;
	}
}
exports.PowerConfig = PowerConfig;
//# sourceMappingURL=PowerConfig.js.map
