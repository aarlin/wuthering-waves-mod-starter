"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfigMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ConfigMarkItemView_1 = require("../MarkItemView/ConfigMarkItemView"),
	MarkItem_1 = require("./MarkItem");
class ConfigMarkItem extends MarkItem_1.MarkItem {
	constructor(e, i, a, t, n, r = 1) {
		super(a, t, n, r),
			(this.MarkConfig = void 0),
			(this.InnerMarkId = 0),
			(this.IsServerSaveShowState = !1),
			(this.ConditionShouldShow = !0),
			(this.InnerMarkId = e),
			(this.ShowPriority = i.ShowPriority),
			(this.MarkConfig = i),
			(this.IconPath = this.MarkConfig.LockMarkPic),
			(this.MapId = this.MarkConfig.MapId);
	}
	get IsFogUnlock() {
		return (
			1 === this.MarkConfig.FogShow ||
			0 === this.MarkConfig.FogHide ||
			ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(
				this.MarkConfig.FogHide,
			)
		);
	}
	get MarkId() {
		return this.InnerMarkId;
	}
	get MarkConfigId() {
		return this.MarkConfig.MarkId;
	}
	get MarkType() {
		return this.MarkConfig.ObjectType;
	}
	Initialize() {
		this.MarkConfig.Scale && this.SetConfigScale(this.MarkConfig.Scale),
			this.InitShowCondition(),
			this.InitPosition(this.MarkConfig),
			this.InitIcon();
	}
	InitPosition(e) {
		e.EntityConfigId
			? this.SetTrackData(e.EntityConfigId)
			: e.MarkVector && this.SetTrackData(Vector_1.Vector.Create(e.MarkVector)),
			this.UpdateTrackState();
	}
	InitIcon() {
		this.MarkConfig.RelativeSubType <= 0 ||
			(this.IconPath = this.MarkConfig.LockMarkPic);
	}
	IsRelativeFunctionOpen() {
		var e;
		return (
			this.MarkConfig.RelativeSubType <= 0 ||
			!(
				(e =
					ConfigManager_1.ConfigManager.MapConfig?.GetMapMarkFuncTypeConfigById(
						this.MarkConfig.RelativeSubType,
					)) && 0 < e.FunctionId
			) ||
			ModelManager_1.ModelManager.FunctionModel.IsOpen(e.FunctionId)
		);
	}
	OnCreateView() {
		this.InnerView = new ConfigMarkItemView_1.ConfigMarkItemView(this);
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
		var e, i, a, t;
		if ("number" == typeof this.TrackTarget)
			return (
				(t =
					ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
						this.MapId,
						this.TrackTarget,
					)?.AreaId ?? 0),
				(i = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(t)),
				(e = (t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t))
					? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(t.Title)
					: ""),
				(a = (i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(i))
					? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(i.Title)
					: ""),
				(t = t
					? ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
							t.CountryId,
						)
					: ""),
				0 === i?.Father ? t + "-" + e : t + `-${a}-` + e
			);
	}
	GLi(e) {
		return this.MarkConfig.ShowRange[0] < e && this.MarkConfig.ShowRange[1] > e;
	}
	get IsConditionShouldShow() {
		return this.ConditionShouldShow;
	}
	InitShowCondition() {
		var e = this.MarkConfig.ShowCondition;
		e < 0
			? (this.IsServerSaveShowState = !0)
			: 0 === e
				? (this.ConditionShouldShow = !0)
				: ((this.IsServerSaveShowState = !1),
					(this.ConditionShouldShow =
						ModelManager_1.ModelManager.MapModel.IsMarkUnlockedByServer(
							this.MarkId,
						)));
	}
	CheckCanShowView() {
		var e,
			i = this.MapType;
		return (
			!(
				(1 === this.MarkConfig.MapShow && 1 !== i) ||
				(2 === this.MarkConfig.MapShow && 1 === i) ||
				(this.InitShowCondition(), !this.ConditionShouldShow) ||
				(this.IsServerSaveShowState &&
					!ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(
						this.MarkId,
					).IsShow) ||
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
	IsLordGym() {
		return 3 === this.MarkConfig.RelativeSubType;
	}
}
exports.ConfigMarkItem = ConfigMarkItem;
