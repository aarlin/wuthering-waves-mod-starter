"use strict";
var CharacterUnifiedStateComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, a, i) {
			var o,
				n = arguments.length,
				r =
					n < 3
						? e
						: null === i
							? (i = Object.getOwnPropertyDescriptor(e, a))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(t, e, a, i);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(o = t[s]) &&
						(r = (n < 3 ? o(r) : 3 < n ? o(e, a, r) : o(e, a)) || r);
			return 3 < n && r && Object.defineProperty(e, a, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterUnifiedStateComponent = exports.outGameRoleTags = void 0);
const cpp_1 = require("cpp"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../../Core/Common/Stats"),
	GameplayCueById_1 = require("../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../../../../Module/Abilities/FormationDataController"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	BaseUnifiedStateComponent_1 = require("../../../../Common/Component/BaseUnifiedStateComponent"),
	CharacterHitComponent_1 = require("../CharacterHitComponent"),
	CustomMovementDefine_1 = require("../Move/CustomMovementDefine"),
	CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
exports.outGameRoleTags = [1963731483, -208062360];
let CharacterUnifiedStateComponent =
	(CharacterUnifiedStateComponent_1 = class extends (
		BaseUnifiedStateComponent_1.BaseUnifiedStateComponent
	) {
		constructor() {
			super(...arguments),
				(this.n2r = void 0),
				(this.s2r = void 0),
				(this.ActorComponent = void 0),
				(this.a2r = void 0),
				(this.s3o = void 0),
				(this.h2r = (t, e, a) => {
					FormationDataController_1.FormationDataController.MarkAggroDirty();
					var i,
						o = t.CheckGetComponent(158);
					if (((this.l2r = o.l2r), 0 !== e || a))
						CharacterUnifiedStateTypes_1.legalMoveStates
							.get(this.PositionState)
							.has(o.MoveState)
							? this.SetMoveState(o.MoveState)
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Movement",
									6,
									"Error Inherit MoveState.",
									["PositionState", this.PositionState],
									["MoveState", o.MoveState],
									["otherPositionState", o.PositionState],
									["MovementMode", this.s3o?.CharacterMovement?.MovementMode],
									[
										"CustomMovementMode",
										this.s3o?.CharacterMovement?.CustomMovementMode,
									],
									["OtherMovement", o.s3o?.CharacterMovement?.MovementMode],
									[
										"CustomMovementMode",
										o.s3o?.CharacterMovement?.CustomMovementMode,
									],
								);
					else if ((this.SetPositionState(o.PositionState), this.a2r))
						switch (o.MoveState) {
							case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
								this.a2r.EnableRoleGaitState(1)
									? this.SetMoveState(o.MoveState)
									: (i = this.a2r.FindEnableCharMoveState()) &&
										this.SetMoveState(i);
								break;
							case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
								this.a2r.EnableRoleGaitState(2)
									? this.SetMoveState(o.MoveState)
									: (i = this.a2r.FindEnableCharMoveState()) &&
										this.SetMoveState(i);
								break;
							case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
								this.a2r.EnableRoleGaitState(3)
									? this.SetMoveState(o.MoveState)
									: (i = this.a2r.FindEnableCharMoveState()) &&
										this.SetMoveState(i);
								break;
							case CharacterUnifiedStateTypes_1.ECharMoveState.Flying:
								break;
							default:
								this.SetMoveState(o.MoveState);
						}
					(t = o.DirectionState) !==
					CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
						? this.SetDirectionState(t)
						: this.SetDirectionState(
								CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
							),
						o.TagComponent.HasTag(388142570) &&
							this.TagComponent.AddTag(792724096);
				}),
				(this.mGr = (t, e, a, i, o) => {
					switch (
						(this.ActorComponent?.IsRoleAndCtrlByMe &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Movement",
								6,
								"Role MovementMode Changed",
								["CharId", t],
								["prevMovementMode", e],
								["newMovementMode", a],
								["prevCustomMode", i],
								["newCustomMode", o],
							),
						a)
					) {
						case 0:
							this.SetPositionState(
								CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
							),
								this.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Other,
								);
							break;
						case 1:
						case 2:
							this.SetPositionState(
								CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
							);
							break;
						case 3:
							this.SetPositionState(
								CharacterUnifiedStateTypes_1.ECharPositionState.Air,
							),
								this.MoveState !==
									CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
									this.MoveState !==
										CharacterUnifiedStateTypes_1.ECharMoveState.Captured &&
									this.SetMoveState(
										CharacterUnifiedStateTypes_1.ECharMoveState.Other,
									);
							break;
						case 5:
							this.SetPositionState(
								CharacterUnifiedStateTypes_1.ECharPositionState.Air,
							),
								this.MoveState !==
									CharacterUnifiedStateTypes_1.ECharMoveState.Captured &&
									this.SetMoveState(
										CharacterUnifiedStateTypes_1.ECharMoveState.Flying,
									);
							break;
						case 6:
							switch (o) {
								case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Climb,
									),
										this.TagComponent.HasTag(388142570) &&
											this.SwitchFastClimb(!0);
									break;
								case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Water,
									);
									break;
								case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Air,
									),
										this.SetMoveState(
											CharacterUnifiedStateTypes_1.ECharMoveState.Glide,
										);
									break;
								case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Air,
									);
									break;
								case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
									);
									break;
								case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Air,
									);
									break;
								case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Air,
									),
										this.SetMoveState(
											CharacterUnifiedStateTypes_1.ECharMoveState.Soar,
										);
									break;
								case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Ski,
									);
									break;
								default:
									this.SetPositionState(
										CharacterUnifiedStateTypes_1.ECharPositionState.Air,
									);
							}
					}
				}),
				(this.CachedPositionState =
					CharacterUnifiedStateTypes_1.ECharPositionState.Ground),
				(this.CachedMoveState =
					CharacterUnifiedStateTypes_1.ECharMoveState.Stand),
				(this.CachedDirectionState =
					CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection),
				(this.u2r = (t, e) => {
					t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection &&
						(this.TagComponent.RemoveTag(525585922),
						this.TagComponent.RemoveTag(-217225976));
				}),
				(this.CachedPositionSubState =
					CharacterUnifiedStateTypes_1.ECharPositionSubState.None),
				(this.InFightCueHandle = void 0),
				(this.WHe = new Set()),
				(this.OnAggroChanged = (t, e) => {
					(e = e.CharActorComp.Entity.Id),
						t ? this.WHe.add(e) : this.WHe.delete(e),
						(t =
							this.Entity.Id ===
							ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
								?.Id) &&
							FormationDataController_1.FormationDataController.MarkAggroDirty();
				}),
				(this.OnInFight = (t) => {
					this.c2r(this.Entity, t),
						this.Entity.GetComponent(160)?.SetAnimParamsInFight(t);
				}),
				(this.OnUpdateSceneTeam = () => {
					var t = this.Entity.GetComponent(0);
					t?.IsRole() &&
						ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
							t.GetPlayerId() &&
						FormationDataController_1.FormationDataController.GlobalIsInFight &&
						(this.RefreshFightState(!0), this.OnInFight(!0));
				}),
				(this.l2r = !1);
		}
		static get Dependencies() {
			return [3, 17];
		}
		OnInit() {
			return CharacterUnifiedStateComponent_1.Load(), !0;
		}
		OnStart() {
			return (
				(this.ActorComponent = this.Entity.GetComponent(3)),
				(this.s2r = this.Entity.GetComponent(19)),
				(this.n2r = this.Entity.CheckGetComponent(17)),
				(this.TagComponent = this.Entity.CheckGetComponent(185)),
				(this.s3o = this.Entity.CheckGetComponent(161)),
				(this.a2r = this.Entity.GetComponent(82)),
				(this.IsInGameInternal = !1),
				this.InitCharState(),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.RoleOnStateInherit,
					this.h2r,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharMovementModeChanged,
					this.mGr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnDirectionStateChanged,
					this.u2r,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.AiHateAddOrRemove,
					this.OnAggroChanged,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.AiInFight,
					this.OnInFight,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnUpdateSceneTeam,
					this.OnUpdateSceneTeam,
				),
				!0
			);
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.RoleOnStateInherit,
					this.h2r,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharMovementModeChanged,
					this.mGr,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnDirectionStateChanged,
					this.u2r,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.AiHateAddOrRemove,
					this.OnAggroChanged,
				),
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.Entity,
					EventDefine_1.EEventName.AiInFight,
					this.OnInFight,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnUpdateSceneTeam,
					this.OnUpdateSceneTeam,
				),
				this.Entity.GetComponent(0)?.GetEntityType() ===
					Protocol_1.Aki.Protocol.wks.Proto_Player &&
					FormationDataController_1.FormationDataController.MarkAggroDirty(),
				!0
			);
		}
		OnEnable() {
			return super.OnEnable(), this.PreprocessChangeRole(!0), !0;
		}
		OnDisable() {
			return super.OnDisable(), this.PreprocessChangeRole(!1), !0;
		}
		SetPositionState(t) {
			var e = this.PositionState;
			this.m2r(t) &&
				(this.OnPositionStateChange(e, t),
				this.ActorComponent.IsMoveAutonomousProxy ||
					CombatDebugController_1.CombatDebugController.CombatWarn(
						"UnifiedState",
						this.Entity,
						"非主控端尝试修改位置状态",
						["old", CharacterUnifiedStateTypes_1.ECharPositionState[e]],
						["new", CharacterUnifiedStateTypes_1.ECharPositionState[t]],
					));
		}
		SetPositionStateHandle(t) {
			this.ActorComponent.IsMoveAutonomousProxy || this.m2r(t);
		}
		m2r(t) {
			var e = this.PositionState;
			return (
				e !== t &&
				(this.TagComponent.RemoveTag(1700920381),
				this.TagComponent.AddTag(
					CharacterUnifiedStateComponent_1.PositionEnumToTag.get(t),
				),
				(this.CachedPositionState = t),
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"UnifiedState",
					this.Entity,
					"设置位置状态",
					["old", CharacterUnifiedStateTypes_1.ECharPositionState[e]],
					["new", CharacterUnifiedStateTypes_1.ECharPositionState[t]],
				),
				!0)
			);
		}
		get PositionState() {
			return this.CachedPositionState;
		}
		OnLand() {
			var t =
				GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-2132334323);
			this.n2r.SendGameplayEventToActor(t),
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnLand,
				),
				this.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp
					? this.SetMoveState(
							CharacterUnifiedStateTypes_1.ECharMoveState.StandUp,
						)
					: this.TagComponent.HasTag(-1503953470) ||
						this.SetMoveState(
							CharacterUnifiedStateTypes_1.ECharMoveState.Other,
						);
		}
		OnPositionStateChange(t, e) {
			switch (
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Character",
						6,
						"UnifiedState PositionStateChange",
						["EntityId", this.Entity.Id],
						["Name", this.ActorComponent?.Owner?.GetName()],
						["From", CharacterUnifiedStateTypes_1.ECharPositionState[t]],
						["To", CharacterUnifiedStateTypes_1.ECharPositionState[e]],
					),
				e)
			) {
				case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
					this.OnLand();
				case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
				case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
				case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
			}
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnPositionStateChanged,
				t,
				e,
			);
		}
		SetMoveState(t) {
			this.ActorComponent.IsMoveAutonomousProxy
				? this.g2r(t)
				: CombatDebugController_1.CombatDebugController.CombatWarn(
						"UnifiedState",
						this.Entity,
						"非主控端尝试修改移动状态",
						[
							"old",
							CharacterUnifiedStateTypes_1.ECharMoveState[this.MoveState],
						],
						["new", CharacterUnifiedStateTypes_1.ECharMoveState[t]],
					);
		}
		SetMoveStateHandle(t) {
			this.ActorComponent.IsMoveAutonomousProxy || this.g2r(t);
		}
		g2r(t) {
			var e = this.MoveState;
			return (
				e !== t &&
				(this.ActorComponent.IsRoleAndCtrlByMe &&
				!CharacterUnifiedStateTypes_1.legalMoveStates
					.get(this.PositionState)
					.has(t)
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Movement",
								6,
								"Error Move State",
								["PositionState", this.PositionState],
								["MoveState", t],
							),
						!1)
					: (CombatDebugController_1.CombatDebugController.CombatInfo(
							"UnifiedState",
							this.Entity,
							"修改移动状态",
							[
								"position",
								CharacterUnifiedStateTypes_1.ECharPositionState[
									this.PositionState
								],
							],
							["state", CharacterUnifiedStateTypes_1.ECharMoveState[t]],
						),
						this.TagComponent.RemoveTag(-5899402),
						this.TagComponent.AddTag(
							CharacterUnifiedStateComponent_1.MoveEnumToTag.get(t),
						),
						(this.CachedMoveState = t),
						EventSystem_1.EventSystem.EmitWithTarget(
							this.Entity,
							EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
							e,
							t,
						),
						!0))
			);
		}
		get MoveState() {
			return this.CachedMoveState;
		}
		EnterAimStatus(t) {
			switch (
				(this.TagComponent.AddTag(1118638468),
				this.TagComponent.AddTag(-100527303),
				t)
			) {
				case 0:
					this.TagComponent.AddTag(-1289344370);
					break;
				case 1:
					this.TagComponent.AddTag(1502858015);
			}
			(this.ActorComponent.UseControllerRotation.Yaw = 1),
				this.SetDirectionState(
					CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection,
				),
				this.Entity.GetComponent(53)?.OnEnterAimShoot();
		}
		ExitAimStatus() {
			this.TagComponent.RemoveTag(1118638468),
				(this.ActorComponent.UseControllerRotation.Yaw = 0),
				this.DirectionState ===
					CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection &&
					this.SetDirectionState(
						CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
					),
				this.Entity.GetComponent(53)?.OnExitAimShoot();
		}
		SetDirectionState(t) {
			var e;
			this.ActorComponent.IsAutonomousProxy &&
				((e = this.DirectionState), this.f2r(t)) &&
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnDirectionStateChanged,
					e,
					t,
				);
		}
		SetDirectionStateHandle(t) {
			this.f2r(t);
		}
		f2r(t) {
			var e = this.DirectionState;
			return e !== t && (this.UpdateDirectionTag(e, t), !0);
		}
		get DirectionState() {
			return this.CachedDirectionState;
		}
		UpdateDirectionTag(t, e) {
			this.ClearDirectionTag(t),
				this.AddDirectionTag(e),
				(this.CachedDirectionState = e);
		}
		ClearDirectionTag(t) {
			t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection &&
				this.ExitAnimState(),
				this.TagComponent.RemoveTag(-742468192);
		}
		AddDirectionTag(t) {
			t === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection &&
				this.EnterAnimState(),
				this.TagComponent.AddTag(
					CharacterUnifiedStateComponent_1.DirectionEnumToTag.get(t),
				);
		}
		EnterAnimState() {
			this.TagComponent.HasTag(-100527303) ||
				this.TagComponent.HasTag(-1761987351) ||
				this.TagComponent.HasTag(-1664105924) ||
				this.TagComponent.AddTag(-1664105924);
		}
		ExitAnimState() {
			this.TagComponent.RemoveTag(-1664105924),
				this.TagComponent.RemoveTag(-100527303),
				this.TagComponent.RemoveTag(1432398233);
		}
		InitCharState() {
			this.TagComponent.AddTag(
				CharacterUnifiedStateComponent_1.PositionEnumToTag.get(
					CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
				),
			),
				this.TagComponent.AddTag(
					CharacterUnifiedStateComponent_1.MoveEnumToTag.get(
						CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
					),
				),
				this.TagComponent.AddTag(
					CharacterUnifiedStateComponent_1.DirectionEnumToTag.get(
						CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
					),
				);
		}
		ResetCharState() {
			this.SetPositionSubState(
				CharacterUnifiedStateTypes_1.ECharPositionSubState.None,
			);
		}
		p2r(t, e) {
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharOnPositionSubStateChanged,
				t,
				e,
			);
		}
		v2r(t, e) {
			this.M2r(t), this.S2r(e), (this.CachedPositionSubState = e);
		}
		M2r(t) {
			this.TagComponent.RemoveTag(-1532754767);
		}
		S2r(t) {
			this.TagComponent.AddTag(
				CharacterUnifiedStateComponent_1.PositionSubStateEnumToTag.get(t),
			);
		}
		SetPositionSubStateHandle(t) {
			this.SetPositionSubStateInternal(t);
		}
		SetPositionSubStateInternal(t) {
			var e = this.PositionSubState;
			return e !== t && (this.v2r(e, t), !0);
		}
		SetPositionSubState(t) {
			var e;
			this.ActorComponent.IsAutonomousProxy &&
				((e = this.PositionSubState), this.SetPositionSubStateInternal(t)) &&
				this.p2r(e, t);
		}
		get PositionSubState() {
			return this.CachedPositionSubState;
		}
		E2r() {
			this.TagComponent.HasTag(792724096) ||
				this.TagComponent.AddTag(792724096);
		}
		y2r() {
			this.TagComponent.RemoveTag(792724096);
		}
		SprintPress() {
			this.a2r?.EnableRoleGaitState(3) && this.E2r();
		}
		SprintRelease() {
			this.y2r();
		}
		WalkPress() {
			this.I2r();
		}
		SwingPress() {
			this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Swing);
		}
		SwingRelease() {
			this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
		}
		SwitchFastSwim(t) {
			this.SetMoveState(
				t
					? CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
					: CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim,
			),
				t && this.E2r();
		}
		SwitchFastClimb(t, e = !1) {
			(t = t && !this.TagComponent.HasTag(1098729489)),
				(e ||
					(this.MoveState !==
						CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb &&
						this.MoveState !==
							CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb)) &&
					this.SetMoveState(
						t
							? CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb
							: CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb,
					),
				t && this.E2r();
		}
		ExitHitState(t = "") {
			this.TagComponent.HasTag(-1503953470) &&
				this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other),
				this.Entity.GetComponent(51).DeActiveStiff(t),
				ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					(this.Entity.GetComponent(57).CollectSampleAndSend(),
					this.ActorComponent.IsMoveAutonomousProxy) &&
					CharacterHitComponent_1.CharacterHitComponent.HitEndRequest(
						this.Entity,
					),
				!(t = this.Entity.GetComponent(46)) ||
					(2 !== t.CurrentState && 4 !== t.CurrentState) ||
					(this.Entity.GetComponent(46).ResetState(),
					this.ActorComponent.ResetMoveControlled("退出受击"));
		}
		I2r() {
			this.s3o?.CanWalkPress &&
				this.T2r(!this.l2r) &&
				this.L2r(this.IsWalkMode);
		}
		CustomSetWalkOrRun(t) {
			let e = !1;
			return (
				!(e = t
					? this.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk
					: this.MoveState !==
						CharacterUnifiedStateTypes_1.ECharMoveState.Run) ||
				(!!this.s3o?.CanWalkPress && (this.T2r(t) && this.L2r(t), !0))
			);
		}
		T2r(t) {
			var e;
			return (
				t !== this.l2r &&
					((e = this.l2r),
					(this.l2r = t),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnChangeWalkOrRun,
						e,
						t,
					)),
				!1
			);
		}
		L2r(t) {
			this.PositionState ===
				CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
				(t
					? this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk)
					: this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run));
		}
		IsInFightState() {
			return this.TagComponent.HasTag(1996802261);
		}
		RefreshFightState(t) {
			var e = ModelManager_1.ModelManager.PlayerInfoModel?.GetId() ?? 0;
			ModelManager_1.ModelManager.SceneTeamModel.GetAllGroupEntities(e).some(
				(t) => t.Id === this.Entity.Id,
			) && (t ?? 0 < this.WHe.size ? this.R2r() : this.TryClearInFightTags());
		}
		R2r() {
			return (
				this.TagComponent?.AddTag(1996802261),
				(this.InFightCueHandle =
					this.InFightCueHandle ??
					this.s2r?.CreateGameplayCue(
						GameplayCueById_1.configGameplayCueById.GetConfig(1101005001n),
					)),
				!0
			);
		}
		TryClearInFightTags() {
			return (
				this.TagComponent?.RemoveTag(1996802261),
				this.InFightCueHandle?.Destroy(),
				!(this.InFightCueHandle = void 0)
			);
		}
		static OnPlayerBattleStateChangeNotify(t, e) {
			for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetAllGroupEntities(
				e.aFn,
			)) {
				var a = t.Entity?.GetComponent(158);
				a?.RefreshFightState(e.g9n), a?.OnInFight(e.g9n);
			}
			e.aFn === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
				FormationDataController_1.FormationDataController.NotifyInFight(e.g9n);
		}
		c2r(t, e) {
			(this.IsInFighting = e),
				t &&
					t.GameBudgetManagedToken &&
					cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
						t.GameBudgetConfig.GroupName,
						t.GameBudgetManagedToken,
						e,
					);
		}
		get WalkModeLocked() {
			return !this.a2r.EnableRoleGaitState(2);
		}
		get IsWalkBaseMode() {
			return this.l2r;
		}
		get IsWalkMode() {
			return this.WalkModeLocked || this.l2r;
		}
		static Load() {
			if (this.U2r) {
				(this.PositionTagList = [
					-1898186757, 504239013, 40422668, 855966206, 1888918118,
				]),
					(this.MoveTagList = [
						-1867662364, 248240472, 498191540, -1625986130, 874657114,
						316338736, 1781274524, -1756660346, 1453491643, -1515012024,
						-846247571, -1989694637, -1654460638, 2060652336, 2111364199,
						756800494, 262865373, 31862857, -1973127492, -1504358738,
						-652371212, -648310348, 457513750, -1220068999, 84868970,
						1785019708, 1502279607, 389944200, -2027866845,
					]),
					(this.DirectionTagList = [
						-1150819426, 428837378, -1462404775, 1260125908,
					]),
					(this.PositionSubStateTagList = [-1162654169, 1950824539]),
					(this.PositionEnumToTag = new Map()),
					(this.PositionEnumToTagInverse = new Map());
				for (const t of CharacterUnifiedStateComponent_1.PositionEnumKeys)
					this.PositionEnumToTag.set(t, this.PositionTagList[t]),
						this.PositionEnumToTagInverse.set(this.PositionTagList[t], t);
				(this.MoveEnumToTag = new Map()),
					(this.MoveEnumToTagInverse = new Map());
				for (const t of CharacterUnifiedStateComponent_1.MoveEnumKeys)
					this.MoveEnumToTag.set(t, this.MoveTagList[t]),
						this.MoveEnumToTagInverse.set(this.MoveTagList[t], t);
				(this.DirectionEnumToTag = new Map()),
					(this.DirectionEnumToTagInverse = new Map());
				for (const t of CharacterUnifiedStateComponent_1.DirectionEnumKeys)
					this.DirectionEnumToTag.set(t, this.DirectionTagList[t]),
						this.DirectionEnumToTagInverse.set(this.DirectionTagList[t], t);
				this.PositionSubStateEnumToTag = new Map();
				for (const t of CharacterUnifiedStateComponent_1.PositionSubStateEnumKeys)
					this.PositionSubStateEnumToTag.set(
						t,
						this.PositionSubStateTagList[t],
					);
				this.U2r = !1;
			}
		}
		PreprocessChangeRole(t) {
			for (const e of exports.outGameRoleTags)
				t
					? this.TagComponent?.RemoveTag(e)
					: this.TagComponent?.HasTag(e) || this.TagComponent?.AddTag(e);
		}
		GetAggroSet() {
			return this.WHe;
		}
	});
(CharacterUnifiedStateComponent.A2r = void 0),
	(CharacterUnifiedStateComponent.D2r = void 0),
	(CharacterUnifiedStateComponent.PositionEnumKeys = Object.values(
		CharacterUnifiedStateTypes_1.ECharPositionState,
	).filter((t) => "number" == typeof t)),
	(CharacterUnifiedStateComponent.MoveEnumKeys = Object.values(
		CharacterUnifiedStateTypes_1.ECharMoveState,
	).filter((t) => "number" == typeof t)),
	(CharacterUnifiedStateComponent.DirectionEnumKeys = Object.values(
		CharacterUnifiedStateTypes_1.ECharDirectionState,
	).filter((t) => "number" == typeof t)),
	(CharacterUnifiedStateComponent.PositionSubStateEnumKeys = Object.values(
		CharacterUnifiedStateTypes_1.ECharPositionSubState,
	).filter((t) => "number" == typeof t)),
	(CharacterUnifiedStateComponent.U2r = !0),
	__decorate(
		[CombatMessage_1.CombatNet.Listen("N2n", !1)],
		CharacterUnifiedStateComponent,
		"OnPlayerBattleStateChangeNotify",
		null,
	),
	(CharacterUnifiedStateComponent = CharacterUnifiedStateComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(158)],
			CharacterUnifiedStateComponent,
		)),
	(exports.CharacterUnifiedStateComponent = CharacterUnifiedStateComponent);
