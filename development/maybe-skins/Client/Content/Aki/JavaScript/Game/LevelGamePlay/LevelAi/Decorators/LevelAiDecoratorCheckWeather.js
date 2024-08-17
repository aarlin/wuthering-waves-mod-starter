"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiDecoratorCheckWeather = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorCheckWeather extends LevelAiDecorator_1.LevelAiDecorator {
	constructor() {
		super(...arguments),
			(this.dIe = () => {
				var e = this.CheckCondition(1);
				this.NotifyEventBasedCondition(e);
			});
	}
	OnExecutionStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WeatherChange,
			this.dIe,
		);
	}
	OnExecutionFinish() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WeatherChange,
			this.dIe,
		);
	}
	CheckCondition(e) {
		var t,
			r = this.Params;
		return (
			!!r &&
			!!(t = ModelManager_1.ModelManager.WeatherModel) &&
			((t = t.CurrentWeatherId),
			(t = r.WeatherId === t),
			"Eq" === r.Compare ? t : !t)
		);
	}
}
exports.LevelAiDecoratorCheckWeather = LevelAiDecoratorCheckWeather;
