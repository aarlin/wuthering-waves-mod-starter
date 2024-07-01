"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraConfigController = exports.CameraConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	RbTree_1 = require("../../../Core/Container/RbTree"),
	Macro_1 = require("../../../Core/Preprocessor/Macro"),
	CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PlatformController_1 = require("../../Module/Platform/PlatformController"),
	CameraController_1 = require("../CameraController"),
	FightCameraLogicComponent_1 = require("../FightCameraLogicComponent"),
	CameraControllerBase_1 = require("./CameraControllerBase"),
	DEFAULT_MAX_FADE_TIME = 5,
	noAimGameplayTag = -1036349300;
class CameraConfig {
	constructor(e) {
		(this.Type = 0),
			(this.Tag = void 0),
			(this.PcValid = !1),
			(this.MobileValid = !1),
			(this.Priority = 0),
			(this.EnableModifyCamera = !1),
			(this.EnableAdjustCamera = !1),
			(this.EnableAutoCamera = !1),
			(this.EnableFocusCamera = !1),
			(this.EnableSidestepCamera = !1),
			(this.EnableClimbCamera = !1),
			(this.FadeInTime = -0),
			(this.FadeOutTime = -0),
			(this.IsOpenMainLoop = !1),
			(this.IsResetDefaultConfig = !1),
			(this.IsUniqueFade = !1),
			(this.Type = e.Type),
			(this.Tag = "None" === e.Tag.TagName ? void 0 : e.Tag),
			(this.PcValid = e.PC生效),
			(this.MobileValid = e.手机生效),
			(this.Priority = e.优先级),
			(this.EnableModifyCamera = e.启用Modify镜头),
			(this.EnableAdjustCamera = e.启用技能修正镜头),
			(this.EnableAutoCamera = e.启用自动镜头),
			(this.EnableFocusCamera = e.启用锁定镜头),
			(this.EnableSidestepCamera = e.启用移动自动镜头),
			(this.EnableClimbCamera = e.启用攀爬镜头),
			(this.FadeInTime = e.淡入时间),
			(this.FadeInCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
				e.淡入曲线,
			)),
			(this.FadeOutTime = e.淡出时间),
			(this.FadeOutCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
				e.淡出曲线,
			)),
			(this.LockOnParts =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TArrayToArray(
					e.锁定点名称,
				)),
			(this.DefaultConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.基础,
				)),
			(this.DefaultCurveConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.基础曲线配置,
				)),
			(this.AdjustConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.技能修正,
				)),
			(this.CurveAdjustConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.技能修正曲线配置,
				)),
			(this.AutoConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.自动镜头,
				)),
			(this.CurveAutoConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.自动镜头曲线配置,
				)),
			(this.FocusConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.锁定镜头,
				)),
			(this.CurveFocusConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.锁定镜头曲线配置,
				)),
			(this.InputConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.镜头输入,
				)),
			(this.CurveInputConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.镜头输入曲线配置,
				)),
			(this.ModifyConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.Modify镜头,
				)),
			(this.CurveModifyConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.Modify镜头曲线配置,
				)),
			(this.GuideConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.引导镜头,
				)),
			(this.CurveGuideConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.引导镜头曲线配置,
				)),
			(this.ExploreConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.跑图镜头,
				)),
			(this.CurveExploreConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.跑图镜头曲线配置,
				)),
			(this.DialogueConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.对话镜头,
				)),
			(this.CurveDialogueConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.对话镜头曲线配置,
				)),
			(this.ClimbConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.攀爬镜头,
				)),
			(this.CurveClimbConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.攀爬镜头曲线配置,
				)),
			(this.SidestepConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
					e.移动自动镜头,
				)),
			(this.CurveSidestepConfig =
				FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
					e.移动自动镜头曲线配置,
				)),
			(this.IsOpenMainLoop = e.是否开启主镜头缓入缓出),
			(this.IsResetDefaultConfig = e.是否重置默认配置),
			(this.IsUniqueFade = e.是否独立过渡时间);
	}
}
exports.CameraConfig = CameraConfig;
class DtCameraConfig {
	constructor(e) {
		(this.DataTable = e),
			(this.ReferenceCount = 0),
			(this.SubValidKeys = new Set()),
			(this.FocusValidKeys = new Set());
	}
	SetToConfigs(e, a, t) {
		var i = CameraController_1.CameraController.GetCameraConfigList(
				this.DataTable,
			),
			o = i.Num();
		for (let C = 0; C < o; C++) {
			var r,
				s = new CameraConfig(i.Get(C));
			s[t] &&
				(s.Tag && "None" !== s.Tag.TagName
					? ((r = s.Tag.TagId),
						2 === s.Type
							? e.has(r)
								? Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Camera",
										6,
										"独有镜头配置不允许重复的Tag",
										["DT", this.DataTable.GetOuter().GetName()],
										["Tag", s.Tag.TagName],
									)
								: (e.set(r, s), this.SubValidKeys.add(r))
							: 3 === s.Type &&
								(a.has(r) ? a.get(r).add(s) : a.set(r, new Set([s])),
								this.FocusValidKeys.add(r)))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Camera", 6, "独有镜头配置不允许Tag为None", [
							"DT",
							this.DataTable.GetOuter().GetName(),
						]));
		}
	}
	RemoveFromConfigs(e, a) {
		for (const a of this.SubValidKeys) e.delete(a);
		for (const e of this.FocusValidKeys) a.delete(e);
		this.SubValidKeys.clear(), this.FocusValidKeys.clear();
	}
}
class CameraConfigController extends CameraControllerBase_1.CameraControllerBase {
	constructor(e) {
		super(e),
			(this.Rle = void 0),
			(this.Ule = void 0),
			(this.Ale = void 0),
			(this.Ple = new Map()),
			(this.xle = new Map()),
			(this.wle = new Set()),
			(this.Ble = new Set()),
			(this.ble = (e, a) => e.Priority - a.Priority),
			(this.qle = new RbTree_1.RbTree(this.ble)),
			(this.Gle = new Map()),
			(this.AdjustCameraTagMap = new Map()),
			(this.AdjustCameraEntityHandleSet = new Set()),
			(this.Nle = !1),
			(this.Ole = void 0),
			(this.kle = (e, a, t) => {
				var i;
				0 === a && 0 < t
					? this.wle.has(e)
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Camera", 6, "Got config before Tag", [
								"Tag",
								GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
							])
						: (i = this.Ple.get(e)) &&
							(this.qle.Insert(i),
							this.wle.add(e),
							this.Fle(i),
							Log_1.Log.CheckDebug()) &&
							Log_1.Log.Debug("Camera", 6, "SelfTagChanged Insert", [
								"tag",
								i.Tag.TagName,
							])
					: 0 < a &&
						0 === t &&
						(i = this.Ple.get(e)) &&
						this.wle.has(e) &&
						(this.qle.Remove(i),
						this.wle.delete(e),
						this.Vle(i),
						Log_1.Log.CheckDebug()) &&
						Log_1.Log.Debug("Camera", 6, "SelfTagChanged Remove", [
							"tag",
							i.Tag.TagName,
						]);
			}),
			(this.Hle = void 0),
			(this.jle = ""),
			(this.Wle = (e, a, t) => {
				if (0 === a && 0 < t)
					if (this.Ble.has(e))
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Camera", 6, "Got config before Tag", [
								"Tag",
								GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
							]);
					else {
						var i = this.xle.get(e);
						if (i)
							for (const a of i)
								0 === a.LockOnParts.length &&
									(this.qle.Insert(a), this.Ble.add(e), this.Fle(a));
					}
				else if (0 < a && 0 === t && (i = this.xle.get(e)) && this.Ble.has(e)) {
					for (const e of i) this.qle.Remove(e), this.Vle(e);
					this.Ble.delete(e);
				}
			}),
			(this.OnChangeRole = (e, a) => {
				if (!(this.AdjustCameraTagMap.size <= 0))
					for (var [t, i] of this.AdjustCameraTagMap)
						this.EnableHookConfig(t, i);
			}),
			(this.X6s = (e) => {
				this.SelfCharacterEntity = e;
			}),
			(this.Kle = !1),
			(this.Qle = !1),
			(this.Xle = 5),
			(this.$le = void 0),
			(this.Yle = !1),
			(this.Jle = 5),
			(this.zle = void 0),
			(this.AutoCamera = !0),
			(this.AdjustCamera = !0),
			(this.ModifyCamera = !0),
			(this.FocusCamera = !0),
			(this.SidestepCamera = !0),
			(this.ClimbCamera = !0),
			(this.Zle = !0),
			(this.e1e = void 0),
			(this.DebugSubCameraModifications = void 0),
			PlatformController_1.PlatformController.IsPc()
				? (this.e1e = "PcValid")
				: PlatformController_1.PlatformController.IsMobile()
					? (this.e1e = "MobileValid")
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Camera", 6, "Error Platform"),
			this.LoadConfig();
	}
	get SelfCharacterEntity() {
		return this.Ole;
	}
	set SelfCharacterEntity(e) {
		this.Ole !== e &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Camera",
					6,
					"CharacterChange",
					["old", this.Ole?.Id],
					["new", e?.Id],
				),
			this.Ole &&
				this.Ole?.Entity?.Valid &&
				EventSystem_1.EventSystem.HasWithTarget(
					this.Ole?.Entity,
					EventDefine_1.EEventName.OnGameplayTagChanged,
					this.kle,
				) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Ole.Entity,
					EventDefine_1.EEventName.OnGameplayTagChanged,
					this.kle,
				),
			e?.Valid &&
				!EventSystem_1.EventSystem.HasWithTarget(
					e.Entity,
					EventDefine_1.EEventName.OnGameplayTagChanged,
					this.kle,
				) &&
				EventSystem_1.EventSystem.AddWithTarget(
					e.Entity,
					EventDefine_1.EEventName.OnGameplayTagChanged,
					this.kle,
				),
			(this.Ole = e),
			this.t1e());
	}
	UpdateFocusTargetAndSocket(e, a) {
		let t = !1;
		this.Hle === e
			? this.jle !== a && (t = !0)
			: (this.Hle &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Hle,
						EventDefine_1.EEventName.OnGameplayTagChanged,
						this.Wle,
					),
				e &&
					!EventSystem_1.EventSystem.HasWithTarget(
						e,
						EventDefine_1.EEventName.OnGameplayTagChanged,
						this.Wle,
					) &&
					EventSystem_1.EventSystem.AddWithTarget(
						e,
						EventDefine_1.EEventName.OnGameplayTagChanged,
						this.Wle,
					),
				(t = !0)),
			(this.Hle = e),
			(this.jle = a),
			t && this.i1e();
	}
	Name() {
		return "ConfigController";
	}
	OnStart() {
		super.OnStart(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CameraCharacterChanged,
				this.X6s,
			);
	}
	UpdateInternal(e) {
		this.UpdateBreakModifyInfo(), this.UpdateConfig();
	}
	EnableHookConfig(e, a = void 0) {
		var t,
			i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
		for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
			!0,
		))
			e?.Valid &&
				(t = e.Entity.GetComponent(185)) &&
				(void 0 === a || t.HasTag(a) || t.AddTag(a),
				t.HasTag(i) && t.RemoveTag(i),
				t.AddTag(i),
				CameraController_1.CameraController.FightCamera.LogicComponent.CameraConfigController.AdjustCameraEntityHandleSet.add(
					e,
				));
		this.AdjustCameraTagMap.set(e, a);
	}
	DisableHookConfig(e = void 0) {
		void 0 !== e &&
			(this.o1e(IAction_1.EAdjustPlayerCamera.Basic, e),
			this.o1e(IAction_1.EAdjustPlayerCamera.Horizontal, e),
			this.o1e(IAction_1.EAdjustPlayerCamera.Dialog, e),
			this.o1e(IAction_1.EAdjustPlayerCamera.Fixed, e),
			this.o1e(IAction_1.EAdjustPlayerCamera.AxisLock, e));
		for (const e of this.AdjustCameraEntityHandleSet) {
			var a = e?.Entity?.GetComponent(185);
			a &&
				(a.RemoveTag(
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
						IAction_1.EAdjustPlayerCamera.Basic,
					),
				),
				a.RemoveTag(
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
						IAction_1.EAdjustPlayerCamera.Horizontal,
					),
				),
				a.RemoveTag(
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
						IAction_1.EAdjustPlayerCamera.Dialog,
					),
				),
				a.RemoveTag(
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
						IAction_1.EAdjustPlayerCamera.Fixed,
					),
				),
				a.RemoveTag(
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
						IAction_1.EAdjustPlayerCamera.AxisLock,
					),
				),
				a.RemoveTag(-1036349300));
		}
		this.AdjustCameraEntityHandleSet.clear(), this.AdjustCameraTagMap.clear();
	}
	DisableHookConfigByType(e) {
		for (const t of this.AdjustCameraEntityHandleSet) {
			var a = t?.Entity?.GetComponent(185);
			a && a.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
		}
	}
	GetCameraConfigByTag(e) {
		return this.Ple.get(e);
	}
	LoadConfig() {
		for (var [, e] of ((this.Rle =
			CameraController_1.CameraController.GetCameraConfigList()),
		this.Ple.clear(),
		this.xle.clear(),
		this.wle.clear(),
		this.Gle))
			e.SubValidKeys.clear(), e.FocusValidKeys.clear();
		var a,
			t = this.Rle.Num();
		for (let e = 0; e < t; e++) {
			var i = new CameraConfig(this.Rle.Get(e));
			i[this.e1e] &&
				(0 === i.Type
					? (this.Ule = i)
					: 1 === i.Type
						? (this.Ale = i)
						: 2 === i.Type
							? i.Tag && "None" !== i.Tag.TagName
								? this.Ple.set(i.Tag.TagId, i)
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Camera",
										15,
										"初始化镜头配置[DT_CameraConfigs]失败，子镜头没有正确配置Tag",
									)
							: 3 === i.Type &&
								("None" === i.Tag.TagName
									? Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Camera",
											15,
											"初始化镜头配置[DT_CameraConfigs]失败，战斗目标镜头没有正确配置Tag",
										)
									: this.xle.has(i.Tag.TagId)
										? this.xle.get(i.Tag.TagId).add(i)
										: this.xle.set(i.Tag.TagId, new Set([i]))));
		}
		for ([, a] of ((this.Ule && this.Ale) ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Camera",
					15,
					"初始化镜头配置[DT_CameraConfigs]失败，基础镜头/战斗镜头未配置",
				)),
		this.Gle))
			a.SetToConfigs(this.Ple, this.xle, this.e1e);
		(this.Nle = !1),
			this.qle.Clear(),
			this.qle.Insert(this.Ule),
			(this.Zle = !0),
			this.Fle(this.Ule),
			this.UpdateConfig();
	}
	LoadCharacterConfig(e) {
		if (e) {
			let t = this.Gle.get(e);
			if (!t) {
				if (
					((t = new DtCameraConfig(e)).SetToConfigs(
						this.Ple,
						this.xle,
						this.e1e,
					),
					this.Gle.set(e, t),
					this.SelfCharacterEntity)
				)
					for (const e of t.SubValidKeys) {
						var a;
						this.Camera.ContainsTag(e) &&
							((a = this.Ple.get(e)),
							this.qle.Insert(a),
							this.wle.add(e),
							this.Fle(a));
					}
				if (this.Hle)
					for (const e of t.FocusValidKeys)
						if (this.Camera.TargetContainsTag(e))
							for (const a of this.xle.get(e))
								this.qle.Insert(a), this.Ble.add(e), this.Fle(a);
			}
			++t.ReferenceCount;
		}
	}
	UnloadCharacterConfig(e) {
		if (e) {
			var a,
				t = this.Gle.get(e);
			if (t) {
				if ((--t.ReferenceCount, 0 === t.ReferenceCount)) {
					if (this.SelfCharacterEntity)
						for (const e of t.SubValidKeys)
							this.wle.delete(e) &&
								((a = this.Ple.get(e)), this.qle.Remove(a), this.Vle(a));
					if (this.Hle)
						for (const e of t.FocusValidKeys)
							if (this.Ble.delete(e))
								for (const a of this.xle.get(e))
									this.qle.Remove(a), this.Vle(a);
					t.RemoveFromConfigs(this.Ple, this.xle), this.Gle.delete(e);
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Camera", 6, "没有加载Camera配置表格", [
						"DT",
						e.GetOuter().GetName(),
					]);
		}
	}
	UpdateConfig() {
		if (this.Camera.Character) {
			let a = !1;
			this.r1e() && (a = !0),
				(this.SelfCharacterEntity = this.Camera.CharacterEntityHandle);
			var e = this.Camera?.TargetEntity
				? this.Camera?.TargetSocketName?.toString() ?? ""
				: "";
			this.UpdateFocusTargetAndSocket(this.Camera.TargetEntity?.Entity, e),
				(a ||= this.Zle) && this.s1e(),
				(this.Zle = !1);
		}
	}
	r1e() {
		var e,
			a,
			t = this.Camera.ContainsTag(1996802261);
		return (
			t !== this.Nle &&
			((e = this.Nle ? this.Ale : this.Ule),
			(a = t ? this.Ale : this.Ule),
			this.qle.Remove(e),
			this.qle.Insert(a),
			this.Vle(e),
			this.Fle(a),
			(this.Nle = t),
			!0)
		);
	}
	i1e() {
		for (const e of this.Ble)
			for (const a of this.xle.get(e))
				(this.Camera.TargetContainsTag(e) &&
					a.LockOnParts.includes(this.jle)) ||
					(this.qle.Remove(a), this.Ble.delete(e), this.Vle(a));
		for (var [e, a] of this.xle)
			if (this.Camera.TargetContainsTag(e))
				for (const t of a)
					(0 !== t.LockOnParts.length && !t.LockOnParts.includes(this.jle)) ||
						(this.qle.Insert(t), this.Ble.add(e), this.Fle(t));
	}
	t1e() {
		for (const a of this.wle) {
			var e = this.Ple.get(a);
			this.Camera.ContainsTag(a) ||
				(this.qle.Remove(e),
				this.wle.delete(a),
				this.Vle(e),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Camera", 6, "UpdateSelfConfig Remove", [
						"tag",
						e.Tag.TagName,
					]));
		}
		for (var [a, t] of this.Ple)
			this.wle.has(a) ||
				(this.Camera.ContainsTag(a) &&
					(this.qle.Insert(t),
					this.wle.add(a),
					this.Fle(t),
					Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug("Camera", 6, "UpdateSelfConfig Insert", [
						"tag",
						t.Tag.TagName,
					]));
	}
	Fle(e) {
		e.FadeInTime > this.Xle ||
			((this.Kle || (this.Camera.Fading && this.Camera.IsUniqueFade)) &&
				!e.IsUniqueFade) ||
			((this.Qle = !0),
			(this.Zle = !0),
			(this.Kle = e.IsUniqueFade),
			(this.Xle = e.FadeInTime),
			(this.$le = e.FadeInCurve));
	}
	Vle(e) {
		e.FadeOutTime > this.Jle ||
			((this.Kle || (this.Camera.Fading && this.Camera.IsUniqueFade)) &&
				!e.IsUniqueFade) ||
			((this.Yle = !0),
			(this.Zle = !0),
			(this.Kle = e.IsUniqueFade),
			(this.Jle = e.FadeOutTime),
			(this.zle = e.FadeOutCurve));
	}
	a1e() {
		return this.Qle && this.Yle ? this.Xle <= this.Jle : this.Qle;
	}
	s1e() {
		var e;
		this.h1e(),
			this.l1e(),
			this.qle.ForEach((e) => (this._1e(e), !0)),
			this.Camera.ApplyConfig(),
			this.Camera.Initialized &&
				((e = this.a1e()),
				this.Camera.StartFade(
					e ? this.Xle : this.Jle,
					e ? this.$le : this.zle,
					!0,
					!1,
					!1,
					!1,
					!0,
					!0,
					!0,
					this.Kle,
				)),
			(this.Kle = !1),
			(this.Qle = !1),
			(this.Yle = !1),
			(this.Xle = 5),
			(this.Jle = 5);
	}
	o1e(e, a) {
		(e = this.GetCameraConfigByTag(
			GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
		)) && (e.FadeOutTime = a);
	}
	h1e() {
		this.AutoCamera || this.Camera.CameraAutoController.Unlock(this),
			this.ModifyCamera || this.Camera.CameraModifyController.Unlock(this),
			this.AdjustCamera || this.Camera.CameraAdjustController.Unlock(this),
			this.FocusCamera || this.Camera.CameraFocusController.Unlock(this),
			this.SidestepCamera || this.Camera.CameraSidestepController.Unlock(this),
			this.ClimbCamera || this.Camera.CameraClimbController.Unlock(this),
			(this.AutoCamera = !0),
			(this.ModifyCamera = !0),
			(this.AdjustCamera = !0),
			(this.FocusCamera = !0),
			(this.SidestepCamera = !0),
			(this.ClimbCamera = !0),
			(this.Camera.CameraCollision.IsOpenBlend = !0);
	}
	_1e(e) {
		e.IsResetDefaultConfig &&
			(this.Camera.ResetDefaultConfig(),
			this.Camera.CameraFocusController.ResetDefaultConfig(),
			this.Camera.CameraInputController.ResetDefaultConfig(),
			this.Camera.CameraModifyController.ResetDefaultConfig(),
			this.Camera.CameraAdjustController.ResetDefaultConfig(),
			this.Camera.CameraSidestepController.ResetDefaultConfig(),
			this.Camera.CameraAutoController.ResetDefaultConfig(),
			this.Camera.CameraGuideController.ResetDefaultConfig(),
			this.Camera.CameraRunningController.ResetDefaultConfig(),
			this.Camera.CameraDialogueController.ResetDefaultConfig(),
			this.Camera.CameraClimbController.ResetDefaultConfig()),
			this.Camera.SetConfigs(e.DefaultConfig, e.DefaultCurveConfig),
			this.Camera.CameraFocusController.SetConfigs(
				e.FocusConfig,
				e.CurveFocusConfig,
			),
			this.Camera.CameraInputController.SetConfigs(
				e.InputConfig,
				e.CurveInputConfig,
			),
			this.Camera.CameraModifyController.SetConfigs(
				e.ModifyConfig,
				e.CurveModifyConfig,
			),
			this.Camera.CameraAdjustController.SetConfigs(
				e.AdjustConfig,
				e.CurveAdjustConfig,
			),
			this.Camera.CameraSidestepController.SetConfigs(
				e.SidestepConfig,
				e.CurveSidestepConfig,
			),
			this.Camera.CameraAutoController.SetConfigs(
				e.AutoConfig,
				e.CurveAutoConfig,
			),
			this.Camera.CameraGuideController.SetConfigs(
				e.GuideConfig,
				e.CurveGuideConfig,
			),
			this.Camera.CameraRunningController.SetConfigs(
				e.ExploreConfig,
				e.CurveExploreConfig,
			),
			this.Camera.CameraDialogueController.SetConfigs(
				e.DialogueConfig,
				e.CurveDialogueConfig,
			),
			this.Camera.CameraClimbController.SetConfigs(
				e.ClimbConfig,
				e.CurveClimbConfig,
			),
			e.EnableAutoCamera ||
				(this.Camera.CameraAutoController.Lock(this), (this.AutoCamera = !1)),
			e.EnableModifyCamera ||
				(this.Camera.CameraModifyController.Lock(this),
				(this.ModifyCamera = !1)),
			e.EnableAdjustCamera ||
				(this.Camera.CameraAdjustController.Lock(this),
				(this.AdjustCamera = !1)),
			e.EnableFocusCamera ||
				(this.Camera.CameraFocusController.Lock(this), (this.FocusCamera = !1)),
			e.EnableSidestepCamera ||
				(this.Camera.CameraSidestepController.Lock(this),
				(this.SidestepCamera = !1)),
			e.EnableClimbCamera ||
				(this.Camera.CameraClimbController.Lock(this), (this.ClimbCamera = !1)),
			(this.Camera.CameraCollision.IsOpenBlend = e.IsOpenMainLoop);
	}
	l1e() {
		this.Camera.ResetDefaultConfig(),
			this.Camera.CameraFocusController.ResetDefaultConfig(),
			this.Camera.CameraInputController.ResetDefaultConfig(),
			this.Camera.CameraModifyController.ResetDefaultConfig(),
			this.Camera.CameraAdjustController.ResetDefaultConfig(),
			this.Camera.CameraSidestepController.ResetDefaultConfig(),
			this.Camera.CameraAutoController.ResetDefaultConfig(),
			this.Camera.CameraGuideController.ResetDefaultConfig(),
			this.Camera.CameraRunningController.ResetDefaultConfig(),
			this.Camera.CameraDialogueController.ResetDefaultConfig(),
			this.Camera.CameraClimbController.ResetDefaultConfig();
	}
	CheckIfInAdjustCamera() {
		return (
			!(this.AdjustCameraTagMap.size <= 0) &&
			this.AdjustCameraTagMap.has(IAction_1.EAdjustPlayerCamera.Fixed)
		);
	}
	OnEnd() {
		super.OnEnd(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CameraCharacterChanged,
				this.X6s,
			);
	}
}
exports.CameraConfigController = CameraConfigController;
