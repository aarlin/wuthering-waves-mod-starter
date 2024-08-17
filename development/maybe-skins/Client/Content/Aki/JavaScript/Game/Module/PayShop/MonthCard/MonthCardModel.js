"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonthCardModel = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PayShopDefine_1 = require("../PayShopDefine");
class MonthCardModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.$ki = -1),
			(this.CanShowDailyRewardView = !1),
			(this.ServerOnceReward = void 0),
			(this.ServerDailyReward = void 0),
			(this.LocalOnceReward = void 0),
			(this.LocalDailyReward = void 0),
			(this.NextShowPayButtonRedDotTime = void 0),
			(this.RedDotRefreshType = 1);
	}
	OnInit() {
		var e = ConfigManager_1.ConfigManager.MonthCardConfig.GetConfig(
			PayShopDefine_1.MONTH_CARD_CONFIG_ID,
		);
		return (
			(this.LocalOnceReward = [{ IncId: 0, ItemId: e.ItemId }, e.Count]),
			(this.LocalDailyReward = [
				{
					IncId: 0,
					ItemId: CommonParamById_1.configCommonParamById.GetIntConfig(
						"MonthCardDailyItemId",
					),
				},
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MonthCardDailyItemCount",
				),
			]),
			(this.RedDotRefreshType =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MonthCardRedDotRefreshTime",
				)),
			!0
		);
	}
	GetRemainDays() {
		return this.$ki;
	}
	SetRemainDays(e) {
		this.$ki = e;
	}
	GetRemainDayText(e) {
		var t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
		if (t < 0) return "";
		if (0 === t) {
			const t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"MonthCardLeftTimeText_2",
			);
			return e
				? StringUtils_1.StringUtils.Format(t, `<color=#${e}>1</color>`)
				: StringUtils_1.StringUtils.Format(t, "1");
		}
		const o = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
			"MonthCardLeftTimeText_1",
		);
		return e
			? StringUtils_1.StringUtils.Format(
					o,
					`<color=#${e}>${t.toString()}</color>`,
				)
			: StringUtils_1.StringUtils.Format(o, t.toString());
	}
	IsRemainDayInMaxLimit() {
		var e =
			CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardMaxDays");
		return this.GetRemainDays() <= e;
	}
	CheckMonthCardIfCanBuy() {
		var e = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
		return !(
			CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardMaxDays") <
			e
		);
	}
	GetPayButtonRedDotState() {
		this.NextShowPayButtonRedDotTime ||
			(this.NextShowPayButtonRedDotTime =
				LocalStorage_1.LocalStorage.GetPlayer(
					LocalStorageDefine_1.ELocalStoragePlayerKey
						.MonthCardNextShowRedDotTime,
					void 0,
				) ?? 0);
		var e = Time_1.Time.ServerTimeStamp;
		return this.NextShowPayButtonRedDotTime < e;
	}
	RefreshNextShowPayButtonRedDotTime() {
		var e;
		1 === this.RedDotRefreshType
			? ((e = new Date(Time_1.Time.ServerTimeStamp)).setMonth(e.getMonth() + 1),
				e.setDate(1),
				e.setHours(4, 0, 0, 0),
				this.NextShowPayButtonRedDotTime !== e.getTime() &&
					((this.NextShowPayButtonRedDotTime = e.getTime()),
					LocalStorage_1.LocalStorage.SetPlayer(
						LocalStorageDefine_1.ELocalStoragePlayerKey
							.MonthCardNextShowRedDotTime,
						e.getTime(),
					)))
			: 2 === this.RedDotRefreshType &&
				((e = new Date(Time_1.Time.ServerTimeStamp)).setHours(4, 0, 0, 0),
				(e =
					e.getTime() +
					(8 - e.getDay()) *
						CommonDefine_1.SECOND_PER_DAY *
						CommonDefine_1.MILLIONSECOND_PER_SECOND),
				this.NextShowPayButtonRedDotTime !== e) &&
				((this.NextShowPayButtonRedDotTime = e),
				LocalStorage_1.LocalStorage.SetPlayer(
					LocalStorageDefine_1.ELocalStoragePlayerKey
						.MonthCardNextShowRedDotTime,
					e,
				)),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
	}
	OnClear() {
		return !(this.CanShowDailyRewardView = !1);
	}
}
exports.MonthCardModel = MonthCardModel;
