"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeatherModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	WeatherActor_1 = require("./WeatherActor");
class WeatherModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Heo = 0);
	}
	get CurrentWeatherId() {
		return this.Heo;
	}
	GetCurrentWeatherType() {
		return ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherType(
			this.Heo,
		);
	}
	SetCurrentWeatherId(e) {
		this.Heo = e;
	}
	static GetWorldWeatherActor() {
		return this.zOo;
	}
}
(exports.WeatherModel = WeatherModel).zOo = new WeatherActor_1.WeatherActor();
