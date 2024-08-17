"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckWeather = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckWeather extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, r) {
		var a;
		return (
			!!e &&
			!!(a = ModelManager_1.ModelManager.WeatherModel) &&
			((a = a.CurrentWeatherId),
			(a = e.WeatherId === a),
			"Eq" === e.Compare ? a : !a)
		);
	}
}
exports.LevelConditionCheckWeather = LevelConditionCheckWeather;
