"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, o) {
		var i,
			r = arguments.length,
			a =
				r < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(t, e, n, o);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(i = t[s]) && (a = (r < 3 ? i(a) : 3 < r ? i(e, n, a) : i(e, n)) || a);
		return 3 < r && a && Object.defineProperty(e, n, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleDeathComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
	CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
	SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController"),
	TeleportController_1 = require("../../../../Module/Teleport/TeleportController"),
	BaseDeathComponent_1 = require("../../Common/Component/Abilities/BaseDeathComponent"),
	CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes"),
	CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
	CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
let RoleDeathComponent = class extends BaseDeathComponent_1.BaseDeathComponent {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.zht = void 0),
			(this.Xte = void 0),
			(this.rDr = void 0),
			(this.elt = void 0),
			(this.mbr = void 0),
			(this.eon = void 0),
			(this.ton = !1),
			(this.Bhr = []),
			(this.OnDeathEnded = () => {
				var t,
					e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
				if (this.elt && this.elt.HasBuffAuthority()) {
					this.elt.TriggerEvents(14, this.elt, {});
					for (const n of e.values())
						this.Entity.Id !== n.Id &&
							n.Valid &&
							((t = n.Entity.GetComponent(172)).IsDead() ||
								t.elt?.TriggerEvents(15, this.elt, {}));
				}
				this.IsDead() &&
					SceneTeamController_1.SceneTeamController.RoleDeathEnded(
						this.Entity.Id,
					);
			}),
			(this.ion = () => {
				this.IsDead() || this.RemoveMaterials();
			}),
			(this.DrowningPunishment = () => {
				this.elt.AddBuff(CharacterBuffIds_1.buffId.AfterDrownRecoverStrength, {
					InstigatorId: this.elt.CreatureDataId,
					Reason: "溺水蒙太奇后添加",
				}),
					this.Xte.RemoveTag(191377386),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.CharOnRoleDrown,
						!1,
					),
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.CharOnRoleDrown,
						!1,
					),
					ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
						(ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
							? ((this.ton = !0),
								CombatMessage_1.CombatNet.Call(14128, this.Entity, {}))
							: (t =
									ModelManager_1.ModelManager.FormationDataModel.GetLastPositionOnLand()) &&
								TeleportController_1.TeleportController.TeleportToPositionNoLoading(
									t.ToUeVector(),
									void 0,
									"DrowningPunishment",
								).finally(this.ion)),
					this.mbr.ResetCharState();
				var t = this.Entity.CheckGetComponent(172);
				t.IsDead() && t.OnDeathEnded();
			});
	}
	OnInitData() {
		return (
			(this.nXt = this.Entity.GetComponent(3)),
			(this.zht = this.Entity.CheckGetComponent(0)),
			(this.Xte = this.Entity.GetComponent(185)),
			(this.rDr = this.Entity.GetComponent(33)),
			(this.elt = this.Entity.GetComponent(157)),
			(this.mbr = this.Entity.GetComponent(158)),
			(this.eon = this.Entity.GetComponent(22)),
			!0
		);
	}
	OnStart() {
		return (
			this.zht.GetLivingStatus() === Protocol_1.Aki.Protocol.Rvs.Proto_Dead &&
				this.ExecuteDeath(),
			!0
		);
	}
	OnClear() {
		return this.Bhr.splice(0, this.Bhr.length), !(this.ton = !1);
	}
	ExecuteDeath() {
		if (!super.ExecuteDeath()) return !1;
		if (
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnCharDeathLogicBegin,
				this.Entity.Id,
			),
			this.elt?.RemoveBuffByEffectType(36, "实体死亡移除冰冻buff"),
			this.Xte?.AddTag(1008164187),
			this.rDr?.StopAllSkills("RoleDeathComponent.ExecuteDeath"),
			this.mbr?.Valid && this.Entity.IsInit)
		) {
			switch ((this.mbr.ResetCharState(), this.mbr.PositionState)) {
				case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
					var t = this.mbr.MoveState;
					t === CharacterUnifiedStateTypes_1.ECharMoveState.Glide
						? this.Entity.GetComponent(50)?.ExitGlideState()
						: t === CharacterUnifiedStateTypes_1.ECharMoveState.Soar &&
							this.Entity.GetComponent(50)?.ExitSoarState();
					break;
				case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
					this.Entity.GetComponent(161)?.CharacterMovement.SetMovementMode(
						3,
						0,
					);
			}
			this.mbr.ExitHitState("角色死亡");
		}
		return (
			this.elt?.RemoveAllDurationBuffs("实体死亡清理持续型buff"),
			this.PlayDeathAnimation(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharOnRoleDead,
				this.Entity.Id,
			),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
			),
			!0
		);
	}
	PlayDeathAnimation() {
		this.Xte?.HasTag(191377386) ||
			(!ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim &&
			!this.Xte?.HasTag(-1943786195) &&
			this.eon?.Valid &&
			this.Entity.IsInit &&
			this.Entity.Active
				? this.mbr.PositionState ===
					CharacterUnifiedStateTypes_1.ECharPositionState.Water
					? this.eon.PlayMontageWithCallBack(1, this.OnDeathEnded)
					: this.eon.PlayMontageWithCallBack(0, this.OnDeathEnded)
				: this.OnDeathEnded());
	}
	ExecuteReviveRemote() {
		this.nXt.IsAutonomousProxy ||
			(this.IsDeadInternal
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Battle",
							20,
							"[DeathComponent]执行角色复活逻辑",
							["Entity", this.Entity.toString()],
							["PbDataId", this.Entity?.GetComponent(0)?.GetPbDataId()],
						),
					(this.IsDeadInternal = !1),
					this.Xte?.RemoveTag(1008164187),
					this.RemoveMaterials(),
					ControllerHolder_1.ControllerHolder.DeadReviveController.RoleReviveEnded(
						this.Entity.Id,
					))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Character", 20, "实体重复复活", [
						"entityId",
						this.Entity.Id,
					]));
	}
	ExecuteReviveLocal() {
		this.nXt?.IsAutonomousProxy &&
			this.IsDeadInternal &&
			((this.IsDeadInternal = !1),
			this.Xte?.RemoveTag(1008164187),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRevive,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRevive,
				this.Entity,
			),
			this.mbr.TryClearInFightTags(),
			this.mbr.RefreshFightState(
				FormationDataController_1.FormationDataController.GlobalIsInFight,
			),
			this.RemoveMaterials(),
			ControllerHolder_1.ControllerHolder.DeadReviveController.RoleReviveEnded(
				this.Entity.Id,
			));
	}
	AddMaterialHandle(t) {
		this.Bhr.push(t);
	}
	RemoveMaterials() {
		var t = this.nXt?.Actor.CharRenderingComponent;
		if (t) for (const e of this.Bhr) t.RemoveMaterialControllerData(e);
	}
	static DrownNotify(t, e) {
		(t = t?.CheckGetComponent(172)),
			t &&
				(t.eon.PlayMontageWithCallBack(1), t.elt?.HasBuffAuthority()) &&
				t.elt.RemoveBuffByEffectType(36, "溺水移除冰冻buff");
	}
	Drowning() {
		var t, e;
		this.IsDrowning() ||
			(this.Entity.CheckGetComponent(185).AddTag(191377386),
			(t = (e = this.Entity.CheckGetComponent(156)).GetCurrentValue(
				CharacterAttributeTypes_1.EAttributeId.Proto_Life,
			)),
			this.elt.AddBuff(CharacterBuffIds_1.buffId.DrownPunishment, {
				InstigatorId: this.elt.CreatureDataId,
				Reason: "溺水流程添加",
			}),
			(e = e.GetCurrentValue(
				CharacterAttributeTypes_1.EAttributeId.Proto_Life,
			)),
			this.eon.PlayMontageWithCallBack(1, this.DrowningPunishment),
			this.elt?.HasBuffAuthority() &&
				this.elt.RemoveBuffByEffectType(36, "溺水移除冰冻buff"),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnRoleDrownInjure,
				0 < t && e <= 0,
			)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CharOnRoleDrown,
				!0,
			),
			CombatMessage_1.CombatNet.Call(8946, this.Entity, {});
	}
	IsDrowning() {
		return this.Xte?.HasTag(191377386) ?? !1;
	}
	ResetDrowning() {
		this.ton && (this.ion(), (this.ton = !1));
	}
};
__decorate(
	[CombatMessage_1.CombatNet.Listen("o2n", !0)],
	RoleDeathComponent,
	"DrownNotify",
	null,
),
	(RoleDeathComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(172)],
		RoleDeathComponent,
	)),
	(exports.RoleDeathComponent = RoleDeathComponent);
