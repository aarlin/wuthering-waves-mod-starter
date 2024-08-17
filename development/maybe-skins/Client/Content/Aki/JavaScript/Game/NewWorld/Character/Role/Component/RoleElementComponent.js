"use strict";
var RoleElementComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, o) {
			var i,
				r = arguments.length,
				s =
					r < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(e, t, n, o);
			else
				for (var a = e.length - 1; 0 <= a; a--)
					(i = e[a]) &&
						(s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
			return 3 < r && s && Object.defineProperty(t, n, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleElementComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
	PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil"),
	CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes"),
	CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let RoleElementComponent = (RoleElementComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.$te = void 0),
			(this.elt = void 0),
			(this.oon = void 0),
			(this.ron = !1),
			(this.non = !1),
			(this.WQe = (e, t, n) => {
				var o = this.RoleElementType;
				t < Number.EPSILON ? (this.son = !1) : this.aon(t),
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.CharOnElementEnergyChanged,
						o,
						t,
						n,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.CharOnElementEnergyChanged,
						o,
						t,
						n,
					);
			}),
			(this.W3r = (e) => {
				FormationDataController_1.FormationDataController.GlobalIsInFight &&
					(this.ron = !0);
			}),
			(this.Zpe = (e) => {
				(this.ron = e) || (this.son = !1);
			}),
			(this.hon = () => {
				this.ron && (this.aon(this.RoleElementEnergy), (this.ron = !1));
			}),
			(this.lon = () => {
				this.nXt?.IsAutonomousProxy && this.ClearElementEnergy(this.Entity);
			}),
			(this.OJe = () => {
				this.nXt?.IsAutonomousProxy && this.ClearElementEnergy(this.Entity);
			});
	}
	OnStart() {
		(this.nXt = this.Entity.GetComponent(3)),
			(this.$te = this.Entity.CheckGetComponent(156)),
			(this.elt = this.Entity.CheckGetComponent(157)),
			this.$te.AddListener(this.uon, this.WQe, "RoleElementComponent"),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.W3r,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.AllRevive,
				this.lon,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
				this.OJe,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharHitLocal,
				this.hon,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.hon,
			),
			(this.oon = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
				this.Entity,
				Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
			));
		var e = this.oon?.Entity;
		return (
			e &&
				!EventSystem_1.EventSystem.HasWithTarget(
					e,
					EventDefine_1.EEventName.CharHitLocal,
					this.hon,
				) &&
				EventSystem_1.EventSystem.AddWithTarget(
					e,
					EventDefine_1.EEventName.CharHitLocal,
					this.hon,
				),
			(this.ron = !0)
		);
	}
	OnEnd() {
		return (
			this.$te.RemoveListener(this.uon, this.WQe),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.RoleOnStateInherit,
				this.W3r,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.AllRevive,
				this.lon,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
				this.OJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharHitLocal,
				this.hon,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeHitLocal,
				this.hon,
			),
			this.oon?.Valid &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.oon.Entity,
					EventDefine_1.EEventName.CharHitLocal,
					this.hon,
				),
			(this.oon = void 0),
			!(this.ron = !1)
		);
	}
	set son(e) {
		this.non !== e &&
			this.nXt?.IsAutonomousProxy &&
			((this.non = e),
			(e = RoleElementComponent_1.con.get(this.RoleElementType)),
			this.non
				? (this.elt.AddBuff(
						ModelManager_1.ModelManager.GameModeModel.IsMulti
							? CharacterBuffIds_1.buffId.ActivateMultiQte
							: CharacterBuffIds_1.buffId.ActivateQte,
						{
							InstigatorId: this.elt.CreatureDataId,
							Reason: "RoleElementComponent获取激活QTE的Tag",
						},
					),
					this.elt.AddBuff(e, {
						InstigatorId: this.elt.CreatureDataId,
						Reason: "RoleElementComponent激活Buff特效",
					}))
				: (this.elt.RemoveBuff(
						CharacterBuffIds_1.buffId.ActivateQte,
						-1,
						"RoleElementComponent移除激活QTE的Tag",
					),
					this.elt.RemoveBuff(e, -1, "RoleElementComponent移除Buff特效")));
	}
	get son() {
		return this.non;
	}
	get RoleElementType() {
		return this.$te.GetCurrentValue(EAttributeId.Proto_ElementPropertyType);
	}
	get RoleElementEnergy() {
		var e = this.uon;
		return 0 < e ? this.$te.GetCurrentValue(e) : 0;
	}
	get uon() {
		return (
			CharacterAttributeTypes_1.elementEnergyAttributeIds[
				this.RoleElementType - 1
			] ?? 0
		);
	}
	aon(e) {
		e >= CharacterAttributeTypes_1.ELEMENT_POWER_MAX - Number.EPSILON &&
			((e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
				this.Entity.Id,
				{ ParamType: 1 },
			)?.IsControl()),
			!this.son) &&
			e &&
			FormationDataController_1.FormationDataController.GlobalIsInFight &&
			((this.son = !0),
			this.elt.TriggerEvents(9, this.elt, {
				ElementType: this.RoleElementType,
			}));
	}
	ActivateFusion(e) {
		e = e.CheckGetComponent(79);
		var t = { ElementType: this.RoleElementType, ElementType2: e };
		this.elt.TriggerEvents(10, e.elt, t), e.elt.TriggerEvents(13, this.elt, t);
	}
	ClearElementEnergy(e) {
		2 < ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize()
			? this.elt.AddBuff(CharacterBuffIds_1.buffId.ConsumeQte, {
					InstigatorId: e.GetComponent(0).GetCreatureDataId(),
					Reason: "RoleQteComponent消耗QTE次数",
				})
			: this.elt.AddBuff(CharacterBuffIds_1.buffId.ElementClean, {
					InstigatorId: e.GetComponent(0).GetCreatureDataId(),
					Reason: "RoleQteComponent清空元素能量",
				});
	}
});
(RoleElementComponent.con = new Map([
	[1, CharacterBuffIds_1.fillElementBuffId.Ice],
	[2, CharacterBuffIds_1.fillElementBuffId.Fire],
	[3, CharacterBuffIds_1.fillElementBuffId.Thunder],
	[4, CharacterBuffIds_1.fillElementBuffId.Wind],
	[5, CharacterBuffIds_1.fillElementBuffId.Light],
	[6, CharacterBuffIds_1.fillElementBuffId.Dark],
])),
	(RoleElementComponent = RoleElementComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(79)],
			RoleElementComponent,
		)),
	(exports.RoleElementComponent = RoleElementComponent);
