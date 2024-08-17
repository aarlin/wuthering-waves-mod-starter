"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonEntityData = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	InputEnums_1 = require("../../Input/InputEnums"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	BehaviorButtonData_1 = require("./BehaviorButtonData"),
	BehaviorButtonMapping_1 = require("./BehaviorButtonMapping"),
	SkillButtonData_1 = require("./SkillButtonData"),
	SkillButtonMapping_1 = require("./SkillButtonMapping"),
	SkillButtonUiController_1 = require("./SkillButtonUiController"),
	SkillButtonUiDefine_1 = require("./SkillButtonUiDefine"),
	buttonTypeToActionNameMap = new Map([
		[101, InputEnums_1.EInputAction.瞄准],
		[102, InputEnums_1.EInputAction.锁定目标],
	]);
class SkillButtonEntityData {
	constructor() {
		(this.IsCurEntity = !1),
			(this.EntityHandle = void 0),
			(this.RoleId = 0),
			(this.RoleConfig = void 0),
			(this.AttributeComponent = void 0),
			(this.GameplayTagComponent = void 0),
			(this.SkillComponent = void 0),
			(this.CharacterSkillCdComponent = void 0),
			(this.SkillButtonConfigList = void 0),
			(this.SkillCommonButtonConfigList = void 0),
			(this.SkillButtonIndexConfig = void 0),
			(this.SkillButtonDataMap = new Map()),
			(this.BehaviorButtonDataMap = new Map()),
			(this.AttributeIdSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.AttributeIdTagSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.EnableTagSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.DisableTagSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.DisableSkillIdTagSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.HiddenTagSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.DynamicEffectTagSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.SkillIconTagSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.SkillIdTagSkillButtonMapping =
				new SkillButtonMapping_1.SkillButtonMapping()),
			(this.$So = new BehaviorButtonMapping_1.BehaviorButtonMapping()),
			(this.YSo = new BehaviorButtonMapping_1.BehaviorButtonMapping()),
			(this.JSo = new Set()),
			(this.T$e = new Map()),
			(this.SQe = void 0),
			(this.zSo = new Set()),
			(this.ZSo = new Set()),
			(this.eEo = new Set()),
			(this.tEo = new Set()),
			(this.iEo = new Set()),
			(this.oEo = new Set()),
			(this.rEo = new Set()),
			(this.smt = new Set()),
			(this.nEo = !1),
			(this.sEo = !1),
			(this.aEo = 4),
			(this.TQe = () => {
				this.SQe = void 0;
				for (const t of this.zSo)
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
						t.GetButtonType(),
						-1,
					);
				this.zSo.clear();
				for (const t of this.ZSo)
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
						t.GetButtonType(),
					);
				this.ZSo.clear();
				for (const t of this.eEo)
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
						t.GetButtonType(),
					);
				this.eEo.clear();
				for (const t of this.tEo)
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
						t.GetButtonType(),
					);
				this.tEo.clear();
				for (const t of this.iEo)
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
						t.GetButtonType(),
					);
				this.iEo.clear();
				for (const t of this.rEo)
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSkillButtonCdRefresh,
						t.GetButtonType(),
					);
				this.rEo.clear();
				for (const t of this.smt)
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
						t.GetButtonType(),
					);
				this.smt.clear();
				for (const t of this.oEo)
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
						t.ButtonType,
					);
				this.oEo.clear(),
					this.nEo &&
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
						),
						(this.nEo = !1)),
					this.sEo &&
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnSkillButtonDataRefresh,
							this.aEo,
						),
						(this.sEo = !1));
			}),
			(this.hEo = (t, i) => {
				var e,
					n = this.SkillButtonDataMap.get(7);
				n &&
					n.IsUseItem &&
					((e = n.IsEnable()), n.RefreshIsEnable(), this.IsCurEntity) &&
					(e !== n.IsEnable() && this.zSo.add(n), this.AQe());
			}),
			(this.lEo = () => {
				var t,
					i,
					e,
					n,
					o = this.SkillButtonDataMap.get(9);
				o &&
					((t = o.GetSkillId()),
					(i = o.GetSkillTexturePath()),
					o.RefreshSkillId(),
					o.RefreshSkillTexturePath(),
					(e = o.GetSkillId()),
					(n = o.GetSkillTexturePath()),
					t !== e &&
						(o.RefreshIsEnable(), this.IsCurEntity) &&
						(this.eEo.add(o), this.AQe()),
					i !== n) &&
					this.IsCurEntity &&
					(this.tEo.add(o), this.AQe());
			}),
			(this._Eo = (t, i) => {
				var e,
					n = this.SkillButtonDataMap.get(9);
				n &&
					!n.GetIsVisionEnableInAir() &&
					((e = n.IsEnable()),
					n.RefreshIsEnable(),
					this.IsCurEntity && n.IsEnable() !== e) &&
					(this.zSo.add(n), this.AQe());
			}),
			(this.uEo = (t, i) => {
				if ((t = this.AttributeIdTagSkillButtonMapping.Get(t)))
					for (const i of t) {
						var e = i.AttributeId,
							n = i.MaxAttributeId,
							o = (i.RefreshAttributeId(), i.AttributeId),
							l = i.MaxAttributeId;
						(e === o && n === l) ||
							(i.RefreshFrameSpriteColor(),
							this.AttributeIdSkillButtonMapping.RemoveSingle(e, i),
							this.AttributeIdSkillButtonMapping.RemoveSingle(n, i),
							0 < o &&
								(this.AttributeIdSkillButtonMapping.AddSingle(o, i),
								this.AttributeIdSkillButtonMapping.AddSingle(l, i),
								this.T$e.has(o) || this.cEo(o, this.mEo),
								this.T$e.has(l) || this.cEo(l, this.mEo)),
							(e = i.IsEnable()),
							i.RefreshIsEnable(),
							this.IsCurEntity &&
								(this.smt.add(i),
								e !== i.IsEnable() && this.zSo.add(i),
								this.AQe()));
					}
			}),
			(this.dEo = (t, i) => {
				if ((t = this.GetSkillButtonDataByEnableTag(t)))
					for (const n of t) {
						let t = !1;
						var e = n.IsEnable();
						(e && i) ||
							((t = i
								? (n.SetEnable(!0), !0)
								: (n.RefreshIsEnable(), n.IsEnable() !== e)),
							this.IsCurEntity && t && (this.zSo.add(n), this.AQe()));
					}
			}),
			(this.Moi = (t, i) => {
				if ((t = this.GetSkillButtonDataByDisableTag(t)))
					for (const n of t) {
						let t = !1;
						var e = n.IsEnable();
						e === i &&
							((t = i
								? (n.SetEnable(!1), !0)
								: (n.RefreshIsEnable(), n.IsEnable() !== e)),
							this.IsCurEntity && t) &&
							(this.zSo.add(n), this.AQe());
					}
			}),
			(this.CEo = (t, i) => {
				var e = this.GetSkillButtonDataByDisableSkillIdTag(t);
				if (e)
					for (const l of e) {
						let e = !1;
						var n,
							o = l.IsEnable();
						o === i &&
							(i
								? (n = l.GetSkillId()) &&
									l.GetDisableSkillIdTagIds().get(t)?.has(n) &&
									(l.SetEnable(!1), (e = !0))
								: (l.RefreshIsEnable(), (e = l.IsEnable() !== o)),
							this.IsCurEntity && e) &&
							(this.zSo.add(l), this.AQe());
					}
			}),
			(this.Oot = (t, i) => {
				if ((t = this.GetSkillButtonDataByHiddenTag(t)))
					for (const n of t) {
						let t = !1;
						var e = n.IsVisible();
						e === i &&
							((t = i
								? (n.SetVisible(!1), !0)
								: (n.RefreshIsVisible(), n.IsVisible() !== e)),
							this.IsCurEntity && t) &&
							(this.ZSo.add(n), this.AQe());
					}
			}),
			(this.gEo = (t, i) => {
				var e = this.GetSkillButtonDataBySkillIdTag(t);
				if (e)
					for (const n of e) {
						n.GetSkillId() !==
							(i ? n.RefreshSkillIdByTag(t) : n.RefreshSkillId(),
							n.GetSkillId()) &&
							(n.RefreshSkillTexturePath(),
							n.RefreshIsEnable(),
							this.IsCurEntity) &&
							(this.eEo.add(n), this.AQe());
					}
			}),
			(this.fEo = (t, i) => {
				var e = this.GetSkillButtonDataBySkillIconTag(t);
				if (e)
					for (const l of e) {
						var n,
							o = l.GetSkillTexturePath();
						i
							? ((n = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)),
								l.RefreshSkillTexturePathBySkillIconTag(n))
							: l.RefreshSkillTexturePath(),
							this.IsCurEntity &&
								o !== l.GetSkillTexturePath() &&
								(this.tEo.add(l), this.AQe());
					}
			}),
			(this.pEo = (t, i) => {
				if ((t = this.GetSkillButtonDataByDynamicEffectTag(t)))
					for (const i of t)
						i.RefreshDynamicEffect(),
							this.IsCurEntity && (this.iEo.add(i), this.AQe());
			}),
			(this.vEo = (t, i) => {
				var e, n;
				this.IsCurEntity &&
					((n = ModelManager_1.ModelManager.PlatformModel.OperationType),
					(e = ModelManager_1.ModelManager.SkillButtonUiModel),
					(n = 2 === n),
					i
						? ((i = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)),
							e.RefreshSkillButtonIndexByTag(this.SkillButtonIndexConfig, i, n))
						: e.RefreshSkillButtonIndex(
								this.SkillButtonIndexConfig,
								this.EntityHandle,
								n,
							),
					(this.nEo = !0),
					this.AQe());
			}),
			(this.MEo = (t, i) => {
				if ((t = this.YSo.Get(t)))
					for (const n of t) {
						let t = !1;
						var e = n.IsVisible;
						e === i &&
							((t = i
								? !(n.IsVisible = !1)
								: (n.RefreshIsVisible(
										this.GameplayTagComponent,
										this.RoleConfig,
									),
									n.IsVisible !== e)),
							this.IsCurEntity && t) &&
							(this.oEo.add(n), this.AQe());
					}
			}),
			(this.SEo = (t, i) => {
				if ((t = this.$So.Get(t)))
					for (const n of t) {
						let t = !1;
						var e = n.IsVisible;
						e !== i &&
							((t = i
								? (n.IsVisible = !0)
								: (n.RefreshIsVisible(
										this.GameplayTagComponent,
										this.RoleConfig,
									),
									n.IsVisible !== e)),
							this.IsCurEntity && t) &&
							(this.oEo.add(n), this.AQe());
					}
			}),
			(this.mEo = (t, i, e) => {
				if (
					(this.RefreshSkillButtonEnableByAttributeId(t),
					this.IsCurEntity && (t = this.GetSkillButtonDataByAttributeId(t)))
				) {
					for (const i of t) this.smt.add(i);
					this.AQe();
				}
			});
	}
	Init(t, i) {
		(t = (this.EntityHandle = t).Entity),
			(this.IsCurEntity = i),
			(this.RoleId =
				SkillButtonUiController_1.SkillButtonUiController.GetRoleId(t)),
			(this.RoleConfig = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
				this.RoleId,
			)),
			(this.AttributeComponent = t.GetComponent(156)),
			(this.GameplayTagComponent = t.GetComponent(185)),
			(this.SkillComponent = t.GetComponent(33)),
			(this.CharacterSkillCdComponent = t.GetComponent(186)),
			(i = ConfigManager_1.ConfigManager.SkillButtonConfig),
			(this.SkillButtonConfigList = i.GetAllSkillButtonConfig(this.RoleId)),
			(this.SkillCommonButtonConfigList = i.GetAllSkillCommonButtonConfig()),
			(2 === this.RoleConfig.RoleType &&
				((this.SkillButtonIndexConfig = i.GetSkillIndexConfig(this.RoleId)),
				this.SkillButtonIndexConfig)) ||
				(this.SkillButtonIndexConfig = i.GetSkillIndexConfig(0)),
			this.EEo(),
			this.yEo(),
			this.eXe();
	}
	OnChangeRole(t) {
		if ((this.IsCurEntity = t))
			for (const t of this.SkillButtonDataMap.values())
				t.RefreshSkillTexturePath();
		else this.DQe();
	}
	Clear() {
		this.IEo();
		for (const t of this.SkillButtonDataMap.values()) t.Reset();
		(this.SkillButtonDataMap = void 0),
			this.BehaviorButtonDataMap.clear(),
			(this.BehaviorButtonDataMap = void 0),
			(this.AttributeIdSkillButtonMapping = void 0),
			(this.AttributeIdTagSkillButtonMapping = void 0),
			(this.EnableTagSkillButtonMapping = void 0),
			(this.DisableTagSkillButtonMapping = void 0),
			(this.DisableSkillIdTagSkillButtonMapping = void 0),
			(this.HiddenTagSkillButtonMapping = void 0),
			(this.DynamicEffectTagSkillButtonMapping = void 0),
			(this.SkillIconTagSkillButtonMapping = void 0),
			(this.SkillIdTagSkillButtonMapping = void 0);
		for (const t of this.JSo) t?.EndTask();
		(this.JSo = void 0),
			(this.T$e = void 0),
			(this.$So = void 0),
			(this.YSo = void 0),
			(this.EntityHandle = void 0),
			(this.RoleId = void 0),
			(this.AttributeComponent = void 0),
			(this.GameplayTagComponent = void 0),
			(this.SkillComponent = void 0),
			(this.CharacterSkillCdComponent = void 0),
			(this.SkillButtonConfigList = void 0),
			(this.SkillCommonButtonConfigList = void 0),
			(this.SkillButtonIndexConfig = void 0);
	}
	EEo() {
		for (const i of SkillButtonUiDefine_1.skillButtonActionList) {
			var t = new SkillButtonData_1.SkillButtonData();
			this.SkillButtonDataMap.set(i, t);
		}
		if (!(this.RoleId <= 0)) {
			var i = this.SkillButtonConfigList,
				e = this.SkillCommonButtonConfigList;
			if (i)
				for (const t of i) {
					var n = t.ButtonType;
					(n = this.GetSkillButtonDataByButton(n)) && this.TEo(n, t);
				}
			if (e)
				for (const t of e) {
					var o = t.ButtonType;
					(o = this.GetSkillButtonDataByButton(o)) &&
						void 0 === o.Config &&
						this.TEo(o, t);
				}
		}
	}
	TEo(t, i) {
		t.Refresh(this.EntityHandle, i),
			this.AttributeIdSkillButtonMapping.AddSingle(t.AttributeId, t),
			this.AttributeIdSkillButtonMapping.AddSingle(t.MaxAttributeId, t);
		for (const i of t.AttributeIdTagMap.keys())
			this.AttributeIdTagSkillButtonMapping.AddSingle(i, t);
		this.EnableTagSkillButtonMapping.Add(t.GetEnableTagIds(), t),
			this.DisableTagSkillButtonMapping.Add(t.GetDisableTagIds(), t),
			this.DisableSkillIdTagSkillButtonMapping.Add(
				t.GetDisableSkillIdTagIds().keys(),
				t,
			),
			this.HiddenTagSkillButtonMapping.Add(t.GetHiddenTagIds(), t),
			this.DynamicEffectTagSkillButtonMapping.Add(
				t.DynamicEffectTagIdMap.keys(),
				t,
			),
			this.SkillIconTagSkillButtonMapping.Add(t.SkillIconTagIds, t);
		for (const i of t.SkillIdTagMap.keys())
			this.SkillIdTagSkillButtonMapping.AddSingle(i, t);
		t.GetActionType() === InputEnums_1.EInputAction.幻象2 &&
			this.SkillIdTagSkillButtonMapping.AddSingle(
				SkillButtonData_1.controlVisionTagId,
				t,
			);
	}
	yEo() {
		for (var [t, i] of buttonTypeToActionNameMap) {
			var e = new BehaviorButtonData_1.BehaviorButtonData();
			e.Refresh(t, i, this.GameplayTagComponent, this.RoleConfig),
				this.BehaviorButtonDataMap.set(t, e),
				0 < e.VisibleTagId && this.$So.AddSingle(e.VisibleTagId, e),
				this.YSo.Add(e.HiddenTagIds, e);
		}
	}
	eXe() {
		this.LEo(),
			this.DEo(),
			EventSystem_1.EventSystem.AddWithTarget(
				this.EntityHandle,
				EventDefine_1.EEventName.EntityVisionSkillChanged,
				this.lEo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
				this.hEo,
			);
	}
	LEo() {
		if (!(this.RoleId <= 0)) {
			for (const t of this.SkillButtonDataMap.values())
				if (t.GetEntityHandle()) {
					for (const i of t.AttributeIdTagMap.keys()) this.REo(i, this.uEo);
					for (const i of t.GetEnableTagIds()) this.REo(i, this.dEo);
					for (const i of t.GetDisableTagIds()) this.REo(i, this.Moi);
					for (const i of t.GetDisableSkillIdTagIds().keys())
						this.REo(i, this.CEo);
					for (const i of t.GetHiddenTagIds()) this.REo(i, this.Oot);
					for (const i of t.SkillIdTagMap.keys()) this.REo(i, this.gEo);
					for (const i of t.SkillIconTagIds) this.REo(i, this.fEo);
					for (const i of t.DynamicEffectTagIdMap.keys()) this.REo(i, this.pEo);
				}
			this.REo(40422668, this._Eo),
				this.REo(SkillButtonData_1.controlVisionTagId, this.lEo);
			for (const t of this.$So.GetAllKey()) this.REo(t, this.SEo);
			for (const t of this.YSo.GetAllKey()) this.REo(t, this.MEo);
			var t = this.SkillButtonIndexConfig;
			if (t) {
				var i = ModelManager_1.ModelManager.PlatformModel.OperationType;
				if (2 === i)
					for (const i of t.DesktopButtonTypeMap.keys()) this.REo(i, this.vEo);
				if (1 === i)
					for (const i of t.PadButtonTypeMap.keys()) this.REo(i, this.vEo);
			}
		}
	}
	DEo() {
		if (!(this.RoleId <= 0))
			for (const e of this.SkillButtonDataMap.values()) {
				var t, i;
				e.GetEntityHandle() &&
					((t = e.AttributeId),
					(i = e.MaxAttributeId),
					!t ||
						t <= 0 ||
						!i ||
						i <= 0 ||
						(this.cEo(t, this.mEo), this.cEo(i, this.mEo)));
			}
	}
	REo(t, i) {
		let e;
		(e =
			"string" == typeof t
				? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)
				: t) &&
			(t = this.GameplayTagComponent.ListenForTagAddOrRemove(e, i)) &&
			this.JSo.add(t);
	}
	cEo(t, i) {
		this.AttributeComponent.AddListener(t, i, "SkillButtonUiController"),
			this.T$e.set(t, i);
	}
	AQe() {
		this.SQe ||
			(this.SQe = TimerSystem_1.TimerSystem.Next(
				this.TQe,
				SkillButtonEntityData.xQe,
			));
	}
	DQe() {
		this.SQe ||
			(TimerSystem_1.TimerSystem.Has(this.SQe) &&
				TimerSystem_1.TimerSystem.Remove(this.SQe),
			(this.SQe = void 0),
			this.zSo.clear(),
			this.ZSo.clear(),
			this.eEo.clear(),
			this.tEo.clear(),
			this.iEo.clear(),
			this.rEo.clear(),
			this.smt.clear(),
			this.oEo.clear(),
			(this.nEo = !1));
	}
	RefreshSkillButtonData(t) {
		this.sEo
			? t < this.aEo && (this.aEo = t)
			: ((this.sEo = !0), (this.aEo = t), this.AQe());
	}
	RefreshSkillButtonEnableByAttributeId(t) {
		if ((t = this.GetSkillButtonDataByAttributeId(t)))
			for (const e of t) {
				var i = e.IsEnable();
				e.RefreshIsEnable(),
					this.IsCurEntity &&
						i !== e.IsEnable() &&
						(this.zSo.add(e), this.AQe());
			}
	}
	RefreshSkillButtonExplorePhantomSkillId(t) {
		var i;
		(t = this.GetSkillButtonDataByButton(t)) &&
			((i = t.GetSkillId()),
			t.RefreshSkillId(),
			t.RefreshSkillTexturePath(),
			t.RefreshIsEnable(),
			this.IsCurEntity
				? i !== t.GetSkillId() && (this.eEo.add(t), this.AQe())
				: t.SetExploreSkillChange(!1));
	}
	RefreshSkillCd(t) {
		for (const i of this.SkillButtonDataMap.values())
			i.GetSkillId() === t &&
				(i.RefreshIsEnable(), this.IsCurEntity) &&
				(this.rEo.add(i), this.AQe());
	}
	ExecuteMultiSkillIdChanged(t, i) {
		let e;
		if (0 !== i) {
			if (
				!(e = this.SkillButtonDataMap.get(9))?.RefreshVisionMultiSkillInfo(t, i)
			)
				return;
		} else e = this.GetSkillButtonDataBySkillId(t.FirstSkillId);
		e &&
			(e.RefreshIsEnable(), this.IsCurEntity) &&
			(this.rEo.add(e), this.tEo.add(e), this.AQe());
	}
	ExecuteMultiSkillEnable(t, i) {
		let e;
		if (0 !== i) {
			if (
				!(e = this.SkillButtonDataMap.get(9))?.RefreshVisionMultiSkillInfo(t, i)
			)
				return;
		} else e = this.GetSkillButtonDataBySkillId(t.FirstSkillId);
		e &&
			(e.RefreshIsEnable(), this.IsCurEntity) &&
			(this.rEo.add(e), this.AQe());
	}
	IEo() {
		this.EntityHandle?.Valid &&
			(EventSystem_1.EventSystem.RemoveWithTarget(
				this.EntityHandle,
				EventDefine_1.EEventName.EntityVisionSkillChanged,
				this.lEo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
				this.hEo,
			),
			this.DQe(),
			this.UEo(),
			this.AEo());
	}
	UEo() {
		for (const t of this.JSo) t?.EndTask();
		this.JSo.clear();
	}
	AEo() {
		for (var [t, i] of this.T$e) this.AttributeComponent.RemoveListener(t, i);
	}
	GetSkillButtonDataByButton(t) {
		return this.SkillButtonDataMap.get(t);
	}
	GetBehaviorButtonDataByButton(t) {
		return this.BehaviorButtonDataMap.get(t);
	}
	GetSkillButtonDataBySkillId(t) {
		for (const i of this.SkillButtonDataMap.values())
			if (i.GetSkillId() === t) return i;
	}
	GetSkillButtonDataByAttributeId(t) {
		return this.AttributeIdSkillButtonMapping.Get(t);
	}
	GetSkillButtonDataByDisableTag(t) {
		return this.DisableTagSkillButtonMapping.Get(t);
	}
	GetSkillButtonDataByDisableSkillIdTag(t) {
		return this.DisableSkillIdTagSkillButtonMapping.Get(t);
	}
	GetSkillButtonDataByEnableTag(t) {
		return this.EnableTagSkillButtonMapping.Get(t);
	}
	GetSkillButtonDataByHiddenTag(t) {
		return this.HiddenTagSkillButtonMapping.Get(t);
	}
	GetSkillButtonDataBySkillIdTag(t) {
		return this.SkillIdTagSkillButtonMapping.Get(t);
	}
	GetSkillButtonDataBySkillIconTag(t) {
		return this.SkillIconTagSkillButtonMapping.Get(t);
	}
	GetSkillButtonDataByDynamicEffectTag(t) {
		return this.DynamicEffectTagSkillButtonMapping.Get(t);
	}
}
(exports.SkillButtonEntityData = SkillButtonEntityData).xQe = void 0;
