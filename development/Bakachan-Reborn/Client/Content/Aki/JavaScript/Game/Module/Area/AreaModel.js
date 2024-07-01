"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AreaModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager");
class AreaModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.fje = void 0),
			(this.pje = ""),
			(this.vje = new Map()),
			(this.Mje = new Map()),
			(this.Sje = new Map()),
			(this.Eje = 0);
	}
	OnInit() {
		return (
			this.SetAreaInfo(1),
			(this.Eje =
				CommonParamById_1.configCommonParamById.GetIntConfig("AreaTipsShowCd")),
			!0
		);
	}
	OnClear() {
		return this.Mje.clear(), this.vje.clear(), this.Sje.clear(), !0;
	}
	get AreaName() {
		if (this.fje)
			return ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
				this.fje.Title,
			);
	}
	get AreaHintName() {
		if (this.fje) {
			if (this.pje)
				return ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
					this.pje,
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Area",
					7,
					"[区域.xlsx]当前需要显示的区域提示没有配置对应文本",
					["区域id", this.fje.AreaId],
				);
		}
	}
	get AreaInfo() {
		return this.fje;
	}
	get AllAreas() {
		return this.vje;
	}
	GetCurrentAreaId(e) {
		if (void 0 === e) return this.AreaInfo.AreaId;
		var r = ConfigManager_1.ConfigManager.AreaConfig;
		let a = this.AreaInfo.AreaId,
			t = r.GetAreaInfo(a);
		for (; t && t.Level !== e; ) (a = t.Father), (t = r.GetAreaInfo(a));
		return a;
	}
	SetAreaInfo(e) {
		0 !== e &&
			(this.fje = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e));
	}
	SetAreaName(e, r = !1) {
		var a;
		0 !== e &&
			((this.fje = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)),
			this.fje.Tips &&
				((this.pje = this.fje.Title),
				void 0 === (a = this.Sje.get(e)) ||
					r ||
					Time_1.Time.Now - a > this.Eje) &&
				(UiManager_1.UiManager.IsViewOpen("AreaView")
					? EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.UpdateAreaView,
						)
					: UiManager_1.UiManager.OpenView("AreaView"),
				this.Sje.set(e, Time_1.Time.Now)),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea));
	}
	AddArea(e, r) {
		this.vje.has(e) || this.vje.set(e, r);
	}
	RemoveArea(e) {
		this.vje.delete(e);
	}
	GetAreaState(e) {
		return this.Mje.get(e);
	}
	ToggleAreaState(e, r) {
		var a = this.vje.get(e);
		this.Mje.get(e) !== r && (this.Mje.set(e, r), a?.ToggleArea(r));
	}
	InitAreaStates(e) {
		for (const r of e) this.Mje.set(r.wFn, r.ckn);
		(e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(6)) &&
			this.SetAreaInfo(e);
	}
	GetAreaCountryId() {
		if (this.fje) {
			if (0 !== this.fje.CountryId) return this.fje.CountryId;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Area", 11, "[区域.xlsx]当前区域没有配置所属国家id", [
					"区域id",
					this.fje.AreaId,
				]);
		} else
			Log_1.Log.CheckError() && Log_1.Log.Error("Area", 11, "区域数据为空");
	}
	GetAreaDangerLevel() {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleList();
		let r = 0;
		e.forEach((e, a) => {
			r < e.GetLevelData().GetLevel() && (r = e.GetLevelData().GetLevel());
		});
		e = CommonParamById_1.configCommonParamById.GetIntConfig(
			"HighDangerLevelOffset",
		);
		var a = CommonParamById_1.configCommonParamById.GetIntConfig(
				"MidDangerLevelOffset",
			),
			t = this.fje.WorldMonsterLevelMax.get(
				ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
			);
		if (t) {
			if ((t = r - t) < a && e <= t) return 1;
			if (t < e) return 0;
		}
		return 2;
	}
	GetAreaDangerText(e) {
		switch (e) {
			case 0:
				return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"AreaHighDangerText",
				);
			case 1:
				return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"AreaHighMidText",
				);
			default:
				return "";
		}
	}
}
exports.AreaModel = AreaModel;
