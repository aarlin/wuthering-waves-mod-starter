"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeatherModuleConfig = void 0);
const WeatherById_1 = require("../../../Core/Define/ConfigQuery/WeatherById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WeatherModuleConfig extends ConfigBase_1.ConfigBase {
	GetWeatherConfig(e) {
		if ((e = WeatherById_1.configWeatherById.GetConfig(e))) return e;
	}
	GetWeatherType(e) {
		return (e = WeatherById_1.configWeatherById.GetConfig(e))
			? e.WeatherType
			: 0;
	}
}
exports.WeatherModuleConfig = WeatherModuleConfig;
