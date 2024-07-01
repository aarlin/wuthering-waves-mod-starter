"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRougeData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityData_1 = require("../../ActivityData");
class ActivityRougeData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments), (this.l2e = 0), (this._2e = 0), (this.a9s = !1);
	}
	set FunctionBtnRedDot(e) {
		(this.a9s = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.Id,
			);
	}
	get FunctionBtnRedDot() {
		return this.a9s;
	}
	PhraseEx(e) {
		(e = e.E0s)
			? ((this.l2e = Number(MathUtils_1.MathUtils.LongToBigInt(e.a0s))),
				(this._2e = Number(MathUtils_1.MathUtils.LongToBigInt(e.h0s))),
				(this.a9s = this.GetIfFirstOpen()))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Roguelike", 59, "ActivityRougeData无肉鸽额外数据");
	}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	get ReceiveEndOpenTime() {
		return this._2e;
	}
	get RedPointShowState() {
		return (
			2 !== this.GetRogueActivityState() &&
			(!!this.GetIfFirstOpen() ||
				(!!this.IsUnLock() && !!this.GetExDataRedPointShowState()))
		);
	}
	GetExtraConfig() {
		return ConfigManager_1.ConfigManager.ActivityRogueConfig.GetActivityUniversalConfig(
			this.Id,
		);
	}
	GetExDataRedPointShowState() {
		return (
			ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeAchievementRedDot() ||
			ModelManager_1.ModelManager.RoguelikeModel.CheckHasCanUnlockSkill() ||
			ModelManager_1.ModelManager.RoguelikeModel.CheckRoguelikeShopRedDot() ||
			this.a9s
		);
	}
	GetRogueActivityState() {
		return this.CheckIfInOpenTime()
			? 0
			: this.CheckIfInTimeInterval(this.l2e, this._2e)
				? 1
				: 2;
	}
}
exports.ActivityRougeData = ActivityRougeData;
