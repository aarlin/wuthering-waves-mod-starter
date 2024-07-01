"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameplayAbilityVisionControl = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	GameplayCueById_1 = require("../../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
	Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
	SceneTeamData_1 = require("../../../../../../Module/SceneTeam/SceneTeamData"),
	CharacterBuffIds_1 = require("../../Abilities/CharacterBuffIds"),
	GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase"),
	GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionControl extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
	constructor() {
		super(...arguments),
			(this.qzo = void 0),
			(this.Gzo = void 0),
			(this.mEo = (e, o, t) => {
				o < Number.EPSILON &&
					(this.GameplayTagComponent.HasTag(
						GameplayAbilityVisionMisc_1.skillTag,
					)
						? (this.TeamComponent?.SetTeamTag(1),
							this.qzo ||
								(this.qzo = this.GameplayTagComponent.ListenForTagAddOrRemove(
									GameplayAbilityVisionMisc_1.skillTag,
									(e, o) => {
										o || (this.qzo?.EndTask(), (this.qzo = void 0), this.Nzo());
									},
								)))
						: this.Nzo());
			});
	}
	OnCreate() {
		var e, o, t, i;
		this.CreatureDataComponent.SummonType ===
			Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantPhantomRole &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 29, "GameplayAbilityVisionControl.OnCreate"),
			this.Ozo(this.CreatureDataComponent.GetCreatureDataId()),
			this.AttributeComponent.AddListener(
				GameplayAbilityVisionMisc_1.controlVisionEnergy,
				this.mEo,
			),
			this.kzo(this.EntityHandle),
			(e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0),
			(t = (o = this.EntityHandle.Entity.GetComponent(0)).GetRoleId()),
			((i = new SceneTeamData_1.SceneTeamRole()).CreatureDataId =
				o.GetCreatureDataId()),
			(i.RoleId = t),
			ModelManager_1.ModelManager.SceneTeamModel.UpdateGroup({
				PlayerId: e,
				GroupType: -1,
				GroupRoleList: [i],
				CurrentRoleId: t,
			}));
	}
	OnDestroy() {
		var e;
		this.CreatureDataComponent.SummonType ===
			Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantPhantomRole &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 29, "GameplayAbilityVisionControl.OnDestroy"),
			this.Ozo(void 0),
			this.AttributeComponent.RemoveListener(
				GameplayAbilityVisionMisc_1.controlVisionEnergy,
				this.mEo,
			),
			this.Nzo(),
			(e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0),
			ModelManager_1.ModelManager.SceneTeamModel.UpdateGroup({
				PlayerId: e,
				GroupType: -1,
				GroupRoleList: [],
				CurrentRoleId: 0,
			})),
			this.qzo && (this.qzo.EndTask(), (this.qzo = void 0));
	}
	OnActivateAbility() {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					29,
					"GameplayAbilityVisionControl.OnActivateAbility",
				),
			GameplayAbilityVisionControl.VisionControlHandle)
		)
			return !1;
		var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
			this.Entity,
			Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantPhantomRole,
		);
		return (
			!!e &&
			!(
				e.Entity.GetComponent(156).GetCurrentValue(
					GameplayAbilityVisionMisc_1.controlVisionEnergy,
				) < Number.EPSILON
			) &&
			(e.Entity.CheckGetComponent(81)?.SetTeamTag(2),
			(GameplayAbilityVisionControl.VisionControlHandle = e),
			(this.Gzo = ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType),
			(e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0),
			ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(e, -1, !0),
			!0)
		);
	}
	OnEndAbility() {
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					29,
					"GameplayAbilityVisionControl.OnEndAbility",
				),
			!(
				!GameplayAbilityVisionControl.VisionControlHandle ||
				(this.Fzo(),
				this.kzo(GameplayAbilityVisionControl.VisionControlHandle),
				(GameplayAbilityVisionControl.VisionControlHandle = void 0))
			)
		);
	}
	Ozo(e) {
		var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
			this.CreatureDataComponent.GetSummonerId(),
		);
		o && (o.Entity.GetComponent(0).VisionControlCreatureDataId = e);
	}
	Nzo() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
			this.CreatureDataComponent.GetSummonerId(),
		);
		e?.Valid
			? e.Entity.GetComponent(34).EndAbilityVision(3)
			: (GameplayAbilityVisionControl.VisionControlHandle = void 0);
	}
	kzo(e) {
		e.Valid &&
			(e = e.Entity.GetComponent(157)).AddBuff(
				CharacterBuffIds_1.buffId.VisionControl,
				{ InstigatorId: e.CreatureDataId, Reason: "操控幻象回满能量" },
			);
	}
	Fzo() {
		var e =
			GameplayAbilityVisionControl.VisionControlHandle.Entity.GetComponent(19);
		e?.CreateGameplayCue(
			GameplayCueById_1.configGameplayCueById.GetConfig(
				GameplayAbilityVisionMisc_1.morphParticleCueId,
			),
			{ Sync: !0 },
		),
			e?.CreateGameplayCue(
				GameplayCueById_1.configGameplayCueById.GetConfig(
					GameplayAbilityVisionMisc_1.materialCueId,
				),
				{
					EndCallback: () => {
						this.BuffComponent.AddBuff(
							GameplayAbilityVisionMisc_1.roleAppearBuffId,
							{
								InstigatorId: this.BuffComponent.CreatureDataId,
								Reason: "幻象变身结束时角色自身的材质和粒子",
							},
						);
						var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
						ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(
							e,
							this.Gzo ?? 1,
						),
							(this.Gzo = void 0);
					},
					Sync: !0,
				},
			);
	}
}
(exports.GameplayAbilityVisionControl =
	GameplayAbilityVisionControl).VisionControlHandle = void 0;
