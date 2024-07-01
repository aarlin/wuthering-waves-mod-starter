"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiRoleData = void 0);
const UE = require("ue"),
	RoleBattleViewInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleBattleViewInfoById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const elementAttributeIds = [
	void 0,
	EAttributeId.Proto_ElementPower1,
	EAttributeId.Proto_ElementPower2,
	EAttributeId.Proto_ElementPower3,
	EAttributeId.Proto_ElementPower4,
	EAttributeId.Proto_ElementPower5,
	EAttributeId.Proto_ElementPower6,
];
class BattleUiRoleData {
	constructor() {
		(this.IsCurEntity = !1),
			(this.EntityHandle = void 0),
			(this.AttributeComponent = void 0),
			(this.GameplayTagComponent = void 0),
			(this.RoleElementComponent = void 0),
			(this.BuffComponent = void 0),
			(this.ShieldComponent = void 0),
			(this.RoleQteComponent = void 0),
			(this.ElementType = void 0),
			(this.ElementConfig = void 0),
			(this.ElementColor = void 0),
			(this.ElementLinearColor = void 0),
			(this.UltimateSkillColor = void 0),
			(this.CreatureRoleId = void 0),
			(this.RoleConfig = void 0),
			(this.RoleBattleViewInfo = void 0),
			(this.QteCanUse = !1),
			(this.jQe = []),
			(this.WQe = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiElementEnergyChanged,
					this.EntityHandle.Id,
					e,
					t,
				);
			}),
			(this.KQe = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiElementHideTagChanged,
					this.EntityHandle.Id,
					e,
					t,
				);
			}),
			(this.QQe = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiDeadTagChanged,
					this.EntityHandle.Id,
					e,
					t,
				);
			}),
			(this.XQe = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiQteEnableTagChanged,
					this.EntityHandle.Id,
					e,
					t,
				);
			}),
			(this.$Qe = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiQteCdTagChanged,
					this.EntityHandle.Id,
					e,
					t,
				);
			}),
			(this.YQe = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiUseQteTagChanged,
					this.EntityHandle.Id,
					e,
					t,
				);
			}),
			(this.JQe = (e, t) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiConcertoEnableTagChanged,
					this.EntityHandle.Id,
					e,
					t,
				);
			}),
			(this.zQe = (e, t) => {
				this.IsCurEntity &&
					e !== t &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnAimStateChanged,
					);
			}),
			(this.ZQe = (e) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiShieldChanged,
					this.EntityHandle.Id,
				);
			}),
			(this.YKe = (e, t, i) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiHealthChanged,
					this.EntityHandle.Id,
				);
			}),
			(this.m2 = (e, t, i) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.BattleUiLevelChanged,
					this.EntityHandle.Id,
				);
			});
	}
	Init(e, t) {
		(this.EntityHandle = e),
			(this.IsCurEntity = t),
			(this.AttributeComponent = e.Entity.GetComponent(156)),
			(this.GameplayTagComponent = e.Entity.GetComponent(185)),
			(this.RoleElementComponent = e.Entity.GetComponent(79)),
			(this.BuffComponent = e.Entity.GetComponent(157)),
			(this.ShieldComponent = e.Entity.GetComponent(64)),
			(this.RoleQteComponent = e.Entity.GetComponent(86)),
			(this.ElementType = this.RoleElementComponent.RoleElementType),
			(this.ElementConfig =
				ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
					this.ElementType,
				)),
			(this.ElementColor = UE.Color.FromHex(this.ElementConfig.ElementColor)),
			(this.ElementLinearColor = new UE.LinearColor(this.ElementColor)),
			(this.UltimateSkillColor = UE.Color.FromHex(
				this.ElementConfig.UltimateSkillColor,
			)),
			(t = e.Entity.GetComponent(0)),
			(this.CreatureRoleId = t?.GetRoleId()),
			(this.RoleConfig = t?.GetRoleConfig()),
			this.RoleConfig &&
				2 === this.RoleConfig.RoleType &&
				(this.RoleBattleViewInfo =
					RoleBattleViewInfoById_1.configRoleBattleViewInfoById.GetConfig(
						this.RoleConfig.Id,
					)),
			this.eXe();
	}
	OnChangeRole(e) {
		this.IsCurEntity = e;
	}
	Clear() {
		this.tXe(),
			(this.AttributeComponent = void 0),
			(this.GameplayTagComponent = void 0),
			(this.RoleElementComponent = void 0),
			(this.BuffComponent = void 0),
			(this.ShieldComponent = void 0),
			(this.ElementType = void 0),
			(this.ElementConfig = void 0),
			(this.ElementColor = void 0),
			(this.ElementLinearColor = void 0),
			(this.UltimateSkillColor = void 0),
			(this.CreatureRoleId = void 0),
			(this.RoleConfig = void 0),
			(this.RoleBattleViewInfo = void 0);
	}
	eXe() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.EntityHandle.Entity,
			EventDefine_1.EEventName.CharOnElementEnergyChanged,
			this.WQe,
		);
		for (const e of BattleUiRoleData.HideElementTagList) this.iXe(e, this.KQe);
		this.iXe(1008164187, this.QQe),
			this.iXe(166024319, this.XQe),
			this.iXe(-1732116741, this.$Qe),
			this.iXe(1674960297, this.YQe),
			this.iXe(-426018619, this.JQe),
			EventSystem_1.EventSystem.AddWithTarget(
				this.EntityHandle.Entity,
				EventDefine_1.EEventName.CharOnDirectionStateChanged,
				this.zQe,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.EntityHandle.Entity,
				EventDefine_1.EEventName.CharShieldChange,
				this.ZQe,
			);
		var e = this.AttributeComponent;
		e.AddListener(EAttributeId.Proto_Life, this.YKe),
			e.AddListener(EAttributeId.Tkn, this.YKe),
			e.AddListener(EAttributeId.Proto_Lv, this.m2);
	}
	tXe() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.EntityHandle.Entity,
			EventDefine_1.EEventName.CharOnElementEnergyChanged,
			this.WQe,
		);
		for (const e of this.jQe) e?.EndTask();
		(this.jQe.length = 0),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.EntityHandle.Entity,
				EventDefine_1.EEventName.CharOnDirectionStateChanged,
				this.zQe,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.EntityHandle.Entity,
				EventDefine_1.EEventName.CharShieldChange,
				this.ZQe,
			);
		var e = this.AttributeComponent;
		e.RemoveListener(EAttributeId.Proto_Life, this.YKe),
			e.RemoveListener(EAttributeId.Tkn, this.YKe),
			e.RemoveListener(EAttributeId.Proto_Lv, this.m2);
	}
	iXe(e, t) {
		(e = this.GameplayTagComponent.ListenForTagAddOrRemove(e, t)) &&
			this.jQe.push(e);
	}
	GetTopButtonVisible() {
		return !this.RoleBattleViewInfo || this.RoleBattleViewInfo.TopButtonVisible;
	}
	GetElementAttributeId() {
		return elementAttributeIds[this.ElementType ?? 0];
	}
	IsPhantom() {
		return 2 === this.RoleConfig?.RoleType;
	}
}
(exports.BattleUiRoleData = BattleUiRoleData).HideElementTagList = [
	-1623647531, 666997186, -1987078323, -1751370752, 1522720219, 33752370,
];
