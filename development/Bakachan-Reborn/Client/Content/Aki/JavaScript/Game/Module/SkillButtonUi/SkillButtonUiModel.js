"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonUiModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	SkillButtonTextAll_1 = require("../../../Core/Define/ConfigQuery/SkillButtonTextAll"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SkillButtonEntityData_1 = require("./SkillButtonEntityData"),
	SkillButtonUiGamepadData_1 = require("./SkillButtonUiGamepadData"),
	behaviorIconResMap = new Map([
		[101, ["SP_IconAim", "SP_IconAimPre"]],
		[102, ["SP_IconLock", "SP_IconLockPre"]],
		[104, ["SP_IconXboxIcon1"]],
	]);
class SkillButtonUiModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.BehaviorIconPathMap = new Map()),
			(this.myo = new Map()),
			(this.dyo = void 0),
			(this.Cyo = []),
			(this.IsNormalButtonTypeList = !1),
			(this.SkillButtonRotationRate = 0),
			(this.GamepadData = void 0),
			(this.gyo = void 0);
	}
	OnInit() {
		for (var [t, e] of ((this.SkillButtonRotationRate =
			CommonParamById_1.configCommonParamById.GetFloatConfig(
				"SkillButtonRotationRate",
			)),
		this.BehaviorIconPathMap.clear(),
		behaviorIconResMap)) {
			var o = [];
			for (const t of e)
				o.push(
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t),
				);
			this.BehaviorIconPathMap.set(t, o);
		}
		return (
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				((this.GamepadData =
					new SkillButtonUiGamepadData_1.SkillButtonUiGamepadData()),
				this.GamepadData.Init()),
			!0
		);
	}
	OnClear() {
		return (
			this.ClearAllSkillButtonEntityData(),
			(this.Cyo.length = 0),
			this.GamepadData?.Clear(),
			(this.GamepadData = void 0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSkillButtonDataClear,
			),
			!0
		);
	}
	OnLeaveLevel() {
		return !0;
	}
	GetSkillButtonEntityData(t) {
		return this.myo.get(t);
	}
	CreateAllSkillButtonEntityData() {
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities())
			e === t
				? (this.dyo = this.CreateSkillButtonEntityData(e, !0))
				: this.CreateSkillButtonEntityData(e, !1);
	}
	CreateSkillButtonEntityData(t, e) {
		var o = t.Entity.Id;
		let a = this.myo.get(o);
		return (
			a
				? a.IsCurEntity !== e && a.OnChangeRole(e)
				: ((a = new SkillButtonEntityData_1.SkillButtonEntityData()).Init(t, e),
					this.myo.set(o, a)),
			a
		);
	}
	ClearAllSkillButtonEntityData() {
		for (const t of this.myo.values()) t.Clear();
		this.myo.clear(), (this.dyo = void 0);
	}
	OnRemoveEntity(t) {
		var e = this.myo.get(t.Id);
		e &&
			(this.myo.delete(t.Id), e.Clear(), e === this.dyo) &&
			(this.dyo = void 0);
	}
	RefreshSkillButtonData(t, e, o) {
		if (
			(0 === o &&
				(this.ClearAllSkillButtonEntityData(),
				this.CreateAllSkillButtonEntityData()),
			1 === o)
		) {
			let e = !1;
			for (const o of this.myo.values())
				t === o.EntityHandle
					? (o.OnChangeRole(!0), (this.dyo = o), (e = !0))
					: o.OnChangeRole(!1);
			e || (this.dyo = this.CreateSkillButtonEntityData(t, !0));
		}
		this.RefreshSkillButtonIndex(this.dyo.SkillButtonIndexConfig, t, e),
			this.GamepadData?.RefreshSkillButtonData(o),
			this.dyo.RefreshSkillButtonData(o);
	}
	RefreshSkillButtonExplorePhantomSkillId(t) {
		for (const e of this.myo.values())
			e.RefreshSkillButtonExplorePhantomSkillId(t);
	}
	GetSkillButtonIndexByButton(t) {
		return this.Cyo.indexOf(t);
	}
	GetButtonTypeList() {
		return this.Cyo;
	}
	RefreshSkillButtonIndex(t, e, o) {
		if (((this.IsNormalButtonTypeList = !1), t)) {
			var a,
				i,
				n = e.Entity.GetComponent(185);
			for ([a, i] of o ? t.DesktopButtonTypeMap : t.PadButtonTypeMap)
				if (n.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a)))
					return void (this.Cyo = i.ArrayInt);
			(this.Cyo = o ? t.DesktopButtonTypeList : t.PadButtonTypeList),
				(this.IsNormalButtonTypeList = !0);
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Battle", 18, "刷新技能按钮索引时缺少配置"),
				(this.Cyo = []);
	}
	RefreshSkillButtonIndexByTag(t, e, o) {
		(this.IsNormalButtonTypeList = !1),
			t
				? (e = (o ? t.DesktopButtonTypeMap : t.PadButtonTypeMap).get(e))
					? (this.Cyo = e.ArrayInt)
					: ((this.Cyo = o ? t.DesktopButtonTypeList : t.PadButtonTypeList),
						(this.IsNormalButtonTypeList = !0))
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Battle", 18, "刷新技能按钮索引时缺少配置"),
					(this.Cyo = []));
	}
	ExecuteMultiSkillIdChanged(t, e, o) {
		this.myo.get(t)?.ExecuteMultiSkillIdChanged(e, o);
	}
	ExecuteMultiSkillEnable(t, e, o) {
		this.myo.get(t)?.ExecuteMultiSkillEnable(e, o);
	}
	OnSkillCdChanged(t) {
		for (const o of t.EntityIds) {
			var e = this.myo.get(o);
			if (e) for (const o of t.SkillCdInfoMap.keys()) e.RefreshSkillCd(o);
		}
	}
	OnAimStateChanged() {
		this.GamepadData?.RefreshAimState() && this.dyo?.RefreshSkillButtonData(3);
	}
	OnActionKeyChanged(t) {
		this.GamepadData?.OnActionKeyChanged(t);
	}
	OnOpenMenuView() {
		this.GamepadData?.OnOpenMenuView();
	}
	OnCloseMenuView() {
		this.GamepadData?.OnCloseMenuView();
	}
	GetCurSkillButtonEntityData() {
		return this.dyo;
	}
	GetSkillButtonDataByButton(t) {
		return this.dyo?.GetSkillButtonDataByButton(t);
	}
	GetBehaviorButtonDataByButton(t) {
		return this.dyo?.GetBehaviorButtonDataByButton(t);
	}
	GetCurRoleConfig() {
		return this.dyo?.RoleConfig;
	}
	GetSkillNameBySkillId(t) {
		return this.fyo(), this.gyo.get(t);
	}
	fyo() {
		if (!this.gyo) {
			this.gyo = new Map();
			var t = SkillButtonTextAll_1.configSkillButtonTextAll.GetConfigList();
			if (t) for (const e of t) this.gyo.set(e.Id, e.Name);
		}
	}
}
exports.SkillButtonUiModel = SkillButtonUiModel;
