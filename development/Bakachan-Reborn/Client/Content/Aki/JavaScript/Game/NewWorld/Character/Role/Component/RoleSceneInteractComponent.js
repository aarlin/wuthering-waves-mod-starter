"use strict";
var RoleSceneInteractComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, r) {
			var o,
				i = arguments.length,
				s =
					i < 3
						? e
						: null === r
							? (r = Object.getOwnPropertyDescriptor(e, n))
							: r;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				s = Reflect.decorate(t, e, n, r);
			else
				for (var a = t.length - 1; 0 <= a; a--)
					(o = t[a]) &&
						(s = (i < 3 ? o(s) : 3 < i ? o(e, n, s) : o(e, n)) || s);
			return 3 < i && s && Object.defineProperty(e, n, s), s;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSceneInteractComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
	GrapplingHookPointComponent_1 = require("../../Custom/Components/GrapplingHookPointComponent"),
	TRACE_TAG_NAME = "RoleSceneInteract",
	PROFILE_KEY = "RoleSceneInteractComponent_FindBestTarget",
	MIN_DIST = 500,
	MIN_DIST_SQUARED = 25e4,
	MIN_LEFT_RIGHT = 0.4142,
	MIN_UP_DOWN = 0.38,
	MIN_LEFT_RIGHT_SCALE = 0.33,
	MIN_UP_DOWN_SCALE = 0.28,
	LEFT_RIGHT_SCALE = 0.38 / 0.4142,
	DEFAULT_MIN_LENGTH = 100,
	HOOK_VISION_ID = 1001,
	fixHookSkillIds = new Set([100020, 100021, 100022]),
	SPHERE_TRACE_RADIUS = 5;
let RoleSceneInteractComponent = (RoleSceneInteractComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.zon = void 0),
			(this.d$e = Vector_1.Vector.Create()),
			(this.Zon = Vector_1.Vector.Create()),
			(this.ern = Vector_1.Vector.Create()),
			(this.s_e = Vector_1.Vector.Create()),
			(this.trn = []),
			(this.irn = !1),
			(this.orn = new Set()),
			(this.rrn = void 0),
			(this.nrn = (t) => {
				fixHookSkillIds.has(t) &&
					(this.srn.IsNeedResetSkill() ||
						this.arn(
							!1,
							void 0,
							"使用钩锁技能且不需要切换技能时，删除定点钩索可用标签",
						),
					(this.Die = this.hrn),
					this.Die.TryStartCd(),
					this.lrn(),
					this._rn(),
					CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraHook(),
					(this.crn = !0));
			}),
			(this.mrn = (t, e) => {
				if (fixHookSkillIds.has(e)) {
					for (const t of this.drn) this.orn.add(t);
					for (const t of this.Crn) this.orn.add(t);
					this.orn.add(this.Die),
						this.Die?.Valid && (this.Die.ChangeHookPointState(0), this.grn()),
						(this.Die = void 0),
						(this.frn = void 0),
						(this.TargetLocation = void 0),
						this.prn.clear(),
						(this.crn = !1);
				}
			}),
			(this.Die = void 0),
			(this.vrn = !1),
			(this.Mrn = !1),
			(this.hrn = void 0),
			(this.frn = void 0),
			(this.TargetLocation = void 0),
			(this.Srn = void 0),
			(this.drn = new Set()),
			(this.Crn = new Set()),
			(this.Ern = new Set()),
			(this.prn = new Set()),
			(this.Nnr = void 0),
			(this.yrn = !0),
			(this.Lie = void 0),
			(this.srn = void 0),
			(this.Irn = !1),
			(this.crn = !1),
			(this.Trn = !1),
			(this.Lrn = void 0),
			(this.D7r = () => {
				1001 === ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId
					? ((this.irn = !1),
						this.Irn &&
							this.arn(
								!0,
								this.hrn?.GetTagId(),
								"切换到钩锁技能且NeedAddTag为真时，添加定点钩索可用标签",
							))
					: ((this.irn = !0),
						this.arn(!1, void 0, "切换到非钩锁技能时，删除定点钩索可用标签"),
						this.hrn &&
							(this.hrn.ChangeHookPointState(0), (this.hrn = void 0)));
			});
	}
	static get Dependencies() {
		return [3, 17];
	}
	get NeedChangeTargetState() {
		return this.yrn;
	}
	set NeedChangeTargetState(t) {
		(this.yrn = t) &&
			void 0 !== this.hrn &&
			this.hrn.ChangeHookPointState(this.Mrn ? 1 : 2);
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.GetComponent(3)),
			(this.zon = this.Entity.GetComponent(34)),
			(this.Lie = this.Entity.GetComponent(185)),
			(this.srn = this.Entity.GetComponent(45)),
			this.Lie.ListenForTagAddOrRemove(283451623, (t, e) => {
				e && (this.Drn(this.hrn), (this.hrn = void 0));
			}),
			this.Hte.IsRoleAndCtrlByMe ||
				this.Disable("[RoleSceneInteractComponent.OnStart] 模拟端"),
			this.InitTraceInfo(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.D7r,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeforeSkillWithTarget,
				this.nrn,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSkillEnd,
				this.mrn,
			),
			!0
		);
	}
	InitTraceInfo() {
		(this.Nnr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Nnr.WorldContextObject = this.Hte.Owner),
			(this.Nnr.bIsSingle = !0),
			(this.Nnr.bIgnoreSelf = !0),
			this.Nnr.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
			),
			(this.Nnr.Radius = 5);
	}
	OnEnd() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.D7r,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharBeforeSkillWithTarget,
				this.nrn,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnSkillEnd,
				this.mrn,
			),
			!0
		);
	}
	OnTick(t) {
		Global_1.Global.BaseCharacter === this.Hte.Actor &&
			(RoleSceneInteractComponent_1.G7r
				? ModelManager_1.ModelManager.CameraModel &&
					!this.Lie.HasTag(283451623) &&
					(this.Rrn(), this.Arn())
				: (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
						1001,
					) && (RoleSceneInteractComponent_1.G7r = !0),
					(this.Srn = void 0)));
	}
	Rrn() {
		var t = ModelManager_1.ModelManager.CameraModel;
		let e = !1,
			n = !1;
		var r, o;
		this.Nnr.SetDrawDebugTrace(RoleSceneInteractComponent_1.TraceDebug ? 1 : 0),
			this.Urn(t),
			(e = this.Trn),
			(r = this.Lrn),
			e &&
				this.zon?.Valid &&
				((e = (o = this.zon.GetVisionIdList()).Contains(1001)), (n = !0)),
			(this.vrn === e && this.hrn === r && this.Mrn === n) ||
				((o = this.hrn),
				(this.hrn = r),
				(this.Mrn = n),
				o?.Valid && o !== r && o.ChangeHookPointState(0),
				r
					? (this.NeedChangeTargetState &&
							this.hrn.ChangeHookPointState(n ? 1 : 2),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RoleFindFixHook,
							!0,
							r.Location,
						))
					: this.Drn(o),
				(this.vrn = e),
				void 0 !== this.hrn && n
					? 1001 !==
						ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId
						? (this.Irn = !0)
						: e
							? this.arn(
									!0,
									this.hrn?.GetTagId(),
									"当前选中的钩锁点有效, 且不需要切换技能",
								)
							: this.srn.IsNeedResetSkill() ||
								this.arn(!1, void 0, "当前选中的钩锁点无效，且不需要切换技能")
					: ((this.Irn = !1),
						this.srn.IsNeedResetSkill() ||
							this.arn(!1, void 0, "当前未选中点，且不需要切换技能"))),
			this.Prn(t);
	}
	Drn(t) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RoleFindFixHook,
			!1,
			void 0,
		);
	}
	Arn() {
		this.CanActivateFixHook() ? (this.Srn = void 0) : (this.Srn = this.xrn());
	}
	GetSecondaryTarget() {
		return this.Srn;
	}
	IsInInteractArea(t) {
		return (t = t.Entity.Id), this.trn.includes(t);
	}
	Urn(t) {
		if (t?.CurrentCameraActor) {
			let o,
				i,
				s,
				a = 100,
				h = ((this.trn.length = 0), !1);
			if ((this.Ern.clear(), this.Nnr)) {
				let l = !0;
				for (const r of GrapplingHookPointComponent_1
					.GrapplingHookPointComponent.AllPoints)
					if (r.CheckCondition()) {
						if (
							r.WasRecentlyRenderOnScreen() &&
							!r.IsInCd &&
							r !== this.Die &&
							(void 0 === o && (o = this.Hte?.ActorLocationProxy),
							!r.Entity.GetComponent(117)?.IsInState(3))
						) {
							var e = Vector_1.Vector.DistSquared(r.Location, o);
							if (e > r.RadiusSquared) this.orn.has(r) && this.orn.delete(r);
							else if ((this.Crn.add(r), e < 25e4)) this.prn.delete(r);
							else if (
								(r.CameraGaze &&
									0 <= r.CameraGaze.LockPriority &&
									!this.drn.has(r) &&
									!this.orn.has(r) &&
									this.Ern.add(r),
								void 0 === i &&
									((i = t.CameraLocation),
									this.d$e.FromUeVector(
										t.CurrentCameraActor.GetActorForwardVector(),
									),
									this.Zon.FromUeVector(
										t.CurrentCameraActor.GetActorRightVector(),
									),
									this.ern.FromUeVector(
										t.CurrentCameraActor.GetActorUpVector(),
									)),
								r.Location.Subtraction(i, this.s_e),
								!((e = this.s_e.DotProduct(this.d$e)) <= 0))
							) {
								var n = Math.abs(this.s_e.DotProduct(this.Zon) / e);
								if (
									!(
										n > (this.irn ? 0.33 : 0.4142) ||
										(e = Math.abs(this.s_e.DotProduct(this.ern) / e)) >
											(this.irn ? 0.28 : 0.38)
									)
								) {
									if (
										(this.trn.push(r.Entity.Id),
										TraceElementCommon_1.TraceElementCommon.SetEndLocation(
											this.Nnr,
											r.Location,
										),
										(n =
											MathUtils_1.MathUtils.Square(n * LEFT_RIGHT_SCALE) +
											MathUtils_1.MathUtils.Square(e)),
										h)
									) {
										if (a <= n) continue;
										if (
											(l &&
												(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
													this.Nnr,
													this.Hte.ActorLocation,
												),
												(l = !1)),
											TraceElementCommon_1.TraceElementCommon.ShapeTrace(
												this.Hte.Actor.CapsuleComponent,
												this.Nnr,
												TRACE_TAG_NAME,
												PROFILE_KEY,
											))
										)
											continue;
									} else if (
										(l &&
											(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
												this.Nnr,
												this.Hte.ActorLocation,
											),
											(l = !1)),
										TraceElementCommon_1.TraceElementCommon.ShapeTrace(
											this.Hte.Actor.CapsuleComponent,
											this.Nnr,
											TRACE_TAG_NAME,
											PROFILE_KEY,
										))
									) {
										if (a <= n) continue;
									} else h = !0;
									(a = n), (s = r);
								}
							}
						}
					} else
						r !== this.Die ||
							this.crn ||
							(r.ChangeHookPointState(0),
							(this.Die = void 0),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.RoleFindFixHook,
								!1,
								void 0,
							));
				this.drn.clear();
				var r = this.drn;
				(this.drn = this.Crn), (this.Crn = r), (this.Trn = h), (this.Lrn = s);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Interaction", 6, "RoleInteract: Missing SphereTrace"),
					(this.Trn = !1),
					(this.Lrn = void 0);
		} else (this.Trn = !1), (this.Lrn = void 0);
	}
	xrn() {
		if (this.Nnr) {
			let e,
				n,
				r = 1 / 0,
				o = !0;
			for (const i of this.drn)
				if (
					i.Valid &&
					i.WasRecentlyRenderOnScreen() &&
					i.Entity.Id !== this.Die?.Entity?.Id &&
					i.Entity.Id !== this.hrn?.Entity?.Id
				) {
					if (i) {
						void 0 === n && (n = this.Hte.ActorLocationProxy);
						var t = Vector_1.Vector.DistSquared(i.Location, n);
						if (t > i.RadiusSquared) continue;
						if (t > r) continue;
						if ((this.Crn.add(i), t < 25e4)) continue;
						r = t;
					}
					o &&
						(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							this.Nnr,
							this.Hte.ActorLocation,
						),
						(o = !1)),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(
							this.Nnr,
							i.Location,
						),
						TraceElementCommon_1.TraceElementCommon.ShapeTrace(
							this.Hte.Actor.CapsuleComponent,
							this.Nnr,
							TRACE_TAG_NAME,
							PROFILE_KEY,
						) || (e = i);
				}
			return e;
		}
	}
	Prn(t) {
		for (const t of this.prn) this.drn.has(t) || this.prn.delete(t);
		for (const t of this.Ern) this.prn.add(t);
		if (
			(this.Ern.clear(),
			this.frn &&
				(t.FightCamera.LogicComponent.CameraGuideController.IsBlending ||
					this.prn.delete(this.frn),
				this.prn.has(this.frn) || (this.frn = void 0)),
			!(this.frn ?? 0 === this.prn.size))
		) {
			let t = -1;
			var e = void 0 !== this.Die;
			for (const n of this.prn)
				n.CameraGaze.GazeInHook && !e
					? this.prn.delete(n)
					: n.CameraGaze.LockPriority > t &&
						((this.frn = n), (t = n.CameraGaze.LockPriority));
			this.frn &&
				CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraHook(
					this.frn,
				);
		}
	}
	CanActivateFixHook() {
		return this.vrn && void 0 !== this.hrn && this.Die !== this.hrn;
	}
	GetCurrentTargetLocation() {
		return this.TargetLocation
			? this.TargetLocation.ToUeVector()
			: this.Die?.Location.ToUeVector() ?? this.Hte.ActorLocation;
	}
	GetNextTarget() {
		return this.hrn;
	}
	GetCurrentTarget() {
		return this.Die;
	}
	GetCurrentTargetActor() {
		return this.Die.Entity.GetComponent(1).Owner;
	}
	GetNextTargetLocation() {
		return this.hrn.Location.ToUeVector();
	}
	GetGuideSpare() {
		return this.prn;
	}
	GetNextTargetVector() {
		return this.hrn.Location;
	}
	GetInheritSpeed() {
		return this.Die.InheritSpeed;
	}
	GetIsClimb() {
		return this.Die.IsClimb;
	}
	GetCurrentTargetForward() {
		var t = this.Die.Entity.GetComponent(0);
		return t?.Valid
			? t.GetRotation().RotateVector(Vector_1.Vector.ForwardVector)
			: this.Hte.ActorForward;
	}
	IsLegalExceptSkill() {
		return this.Mrn;
	}
	GetTargetIsSuiGuangType() {
		var t = this.Die?.GetHookInteractType();
		return !!t && "SuiGuangHook" === t;
	}
	arn(t, e, n) {
		t
			? e &&
				!this.Lie.HasTag(e) &&
				(this.Lie.AddTag(e), (this.rrn = e), Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"Character",
					32,
					"[RoleSceneInteractComponent] 添加定点钩索可用标签",
					["reason", n],
					["EntityId", this.Entity.Id],
				)
			: this.rrn &&
				this.Lie.HasTag(this.rrn) &&
				(this.Lie.RemoveTag(this.rrn),
				(this.rrn = void 0),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"Character",
					32,
					"[RoleSceneInteractComponent] 删除定点钩索可用标签",
					["reason", n],
					["EntityId", this.Entity.Id],
				);
	}
	lrn() {
		var t;
		this.Hte.IsAutonomousProxy &&
			(((t = Protocol_1.Aki.Protocol.yNn.create()).rkn =
				MathUtils_1.MathUtils.NumberToLong(
					this.Entity.GetComponent(0).GetCreatureDataId(),
				)),
			(t.M3n = Protocol_1.Aki.Protocol.VBs.create()),
			(t.M3n.X = this.Die.Location.X),
			(t.M3n.Y = this.Die.Location.Y),
			(t.M3n.Z = this.Die.Location.Z),
			CombatMessage_1.CombatNet.Call(14412, this.Entity, t));
	}
	_rn() {
		var t;
		this.Hte.IsAutonomousProxy &&
			(((t = Protocol_1.Aki.Protocol.u_s.create()).rkn =
				MathUtils_1.MathUtils.NumberToLong(
					this.Die.Entity.GetComponent(0).GetCreatureDataId(),
				)),
			Net_1.Net.Call(4996, t, (t) => {
				switch (t.lkn) {
					case Protocol_1.Aki.Protocol.lkn.Sys:
						break;
					case Protocol_1.Aki.Protocol.lkn.Proto_ErrSceneEntityNotExist:
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Character", 32, "钩锁点不存在", [
								"EntityId",
								this.Die.Entity.GetComponent(0).GetCreatureDataId(),
							]);
						break;
					default:
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							t.lkn,
							5049,
						);
				}
			}));
	}
	grn() {
		var t;
		this.Hte.IsAutonomousProxy && this.Die?.WillBeDestroyedAfterHook
			? (((t = Protocol_1.Aki.Protocol.jds.create()).rkn =
					MathUtils_1.MathUtils.NumberToLong(
						this.Die.Entity.GetComponent(0).GetCreatureDataId(),
					)),
				Net_1.Net.Call(24445, t, (t) => {}))
			: this.Hte.IsAutonomousProxy &&
				this.Die?.WillBeHideAfterHook &&
				((t = this.Die.Entity),
				ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
					t,
					!1,
					"RoleSceneInteractComponent.SendHookDestroyRequest",
					!0,
				));
	}
});
(RoleSceneInteractComponent.G7r = !1),
	(RoleSceneInteractComponent.TraceDebug = !1),
	(RoleSceneInteractComponent.DebugLog = !1),
	(RoleSceneInteractComponent = RoleSceneInteractComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(87)],
			RoleSceneInteractComponent,
		)),
	(exports.RoleSceneInteractComponent = RoleSceneInteractComponent);
