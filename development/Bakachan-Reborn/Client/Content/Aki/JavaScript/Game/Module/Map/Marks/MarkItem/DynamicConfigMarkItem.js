"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DynamicConfigMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	DynamicConfigMarkItemView_1 = require("../MarkItemView/DynamicConfigMarkItemView"),
	MarkItem_1 = require("./MarkItem");
class DynamicConfigMarkItem extends MarkItem_1.MarkItem {
	constructor(e, i, a, t, r, n = 1) {
		super(a, t, r, n),
			(this.MarkConfig = void 0),
			(this.OLi = 0),
			(this.ConditionShouldShow = !0),
			(this.OLi = e),
			(this.ShowPriority = i.ShowPriority),
			(this.MarkConfig = i),
			(this.IconPath = this.MarkConfig.LockMarkPic),
			(this.MapId = this.MarkConfig.MapId);
	}
	get IsFogUnlock() {
		return (
			1 === this.MarkConfig.FogShow ||
			0 === this.MarkConfig.FogHide ||
			(ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(
				this.MarkConfig.FogHide,
			) ??
				!1)
		);
	}
	get MarkId() {
		return this.OLi;
	}
	get MarkConfigId() {
		return this.MarkConfig.MarkId;
	}
	get MarkType() {
		return this.MarkConfig.ObjectType;
	}
	Initialize() {
		this.MarkConfig.Scale && this.SetConfigScale(this.MarkConfig.Scale),
			this.InitPosition(this.MarkConfig),
			this.InitShowCondition();
	}
	InitPosition(e) {
		e.EntityConfigId
			? (this.SetTrackData(e.EntityConfigId), this.UpdateTrackState())
			: e.MarkVector &&
				(this.SetTrackData(Vector_1.Vector.Create(e.MarkVector)),
				this.UpdateTrackState());
	}
	OnCreateView() {
		this.InnerView = new DynamicConfigMarkItemView_1.DynamicConfigMarkItemView(
			this,
		);
	}
	GetLocaleDesc() {
		return this.MarkConfig.MarkDesc;
	}
	GetTitleText() {
		return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
			this.MarkConfig.MarkTitle,
		);
	}
	GetAreaText() {
		var e, i, a;
		if ("number" == typeof this.TrackTarget)
			return (
				(e = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
					this.TrackTarget,
				)),
				(a = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(e)),
				(i = (e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e))
					? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(e.Title)
					: ""),
				(a = (a = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(a))
					? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(a.Title)
					: ""),
				(e
					? ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
							e.CountryId,
						)
					: "") +
					`-${a}-` +
					i
			);
	}
	GLi(e) {
		return this.MarkConfig.ShowRange[0] < e && this.MarkConfig.ShowRange[1] > e;
	}
	InitShowCondition() {
		this.ConditionShouldShow = !0;
	}
	CheckCanShowView() {
		var e,
			i = this.MapType;
		return (
			!(
				(1 === this.MarkConfig.MapShow && 1 !== i) ||
				(2 === this.MarkConfig.MapShow && 1 === i) ||
				!this.ConditionShouldShow ||
				!this.IsFogUnlock
			) &&
			((e = this.GetCurrentMapShowScale()),
			(e = this.GLi(e)),
			2 !== i ||
				(this.IsCanShowViewIntermediately !==
					(i = e || this.IsIgnoreScaleShow) &&
					(this.NeedPlayShowOrHideSeq = i ? "ShowView" : "HideView"),
				i))
		);
	}
	GetShowScale() {
		return this.MarkConfig.ShowRange[0] + this.MarkConfig.ShowRange[1] / 2;
	}
}
exports.DynamicConfigMarkItem = DynamicConfigMarkItem;
