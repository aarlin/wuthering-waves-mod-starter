"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventMoveWithSpline = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	Net_1 = require("../../../Core/Net/Net"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent"),
	LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventMoveWithSpline extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.Jie = void 0),
			(this.sDe = void 0),
			(this.E0 = 0),
			(this.gLe = void 0),
			(this.YLe = !1),
			(this.xDe = void 0),
			(this.wDe = 0),
			(this.BDe = () => {
				var e = this.sDe.Entity.GetComponent(113);
				e?.Valid &&
					this.xDe &&
					(e.RemoveStopMoveCallback(this.BDe),
					e.StartPatrol(this.xDe.Spline, this.xDe.Speeds, !1, !1, !1, this.bDe),
					e.AddStopMoveCallback(this.qDe));
			}),
			(this.qDe = () => {
				var e = this.sDe.Entity.GetComponent(113);
				e.RemoveStopMoveCallback(this.qDe), e.StopPatrol();
			}),
			(this.zpe = (e, t) => {
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"LevelEvent",
						43,
						"[LevelEventMoveWithSpline]检测到移动实体被销毁，直接设置节点执行成功",
						["PbDataId", this.wDe],
					),
					this.FinishExecute(!0);
			}),
			(this.GDe = (e) => {
				var t, o;
				this.sDe?.Valid &&
					((o =
						this.sDe.Entity.GetComponent(
							3,
						))?.Actor.CapsuleComponent.SetCollisionResponseToChannel(
						QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
						2,
					),
					this.IsAsync ||
						(GlobalData_1.GlobalData.IsPlayInEditor &&
							ObjectUtils_1.ObjectUtils.IsValid(this.Jie) &&
							ActorSystem_1.ActorSystem.Put(this.Jie),
						o?.ClearInput(),
						this.YLe &&
							((o = this.sDe.Entity.GetComponent(36)) &&
								(o.StopMove(!1),
								(t = this.sDe.Entity.GetComponent(158)?.MoveState),
								o.ResetMaxSpeed(t)),
							(o = this.sDe.Entity.GetComponent(52))?.ClearMoveVectorCache(),
							o?.SetActive(!0)),
						(this.sDe.Entity.GetComponent(36).IsSpecialMove = !1),
						this.FinishExecute(1 === e)));
			}),
			(this.bDe = () => {
				this.IsAsync ||
					(GlobalData_1.GlobalData.IsPlayInEditor &&
						ObjectUtils_1.ObjectUtils.IsValid(this.Jie) &&
						ActorSystem_1.ActorSystem.Put(this.Jie),
					this.sDe?.Valid &&
						(this.sDe.Entity.GetComponent(113).RemoveStopMoveCallback(this.bDe),
						this.FinishExecute(!0)));
			});
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, t) {
		if (e) {
			switch (((this.gLe = e), this.gLe.MoveTarget.Type)) {
				case "Entity":
					(this.YLe = !1), (this.E0 = this.gLe.MoveTarget.EntityId);
					break;
				case "Player":
					return (this.YLe = !0), void this.ExecuteWhenEntitiesReady();
			}
			this.E0
				? this.CreateWaitEntityTask(this.E0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelEvent",
							7,
							"[MoveWithSpline]配置的目标Id无效",
							["PbDataId", this.E0],
						),
					this.FinishExecute(!1));
		} else this.FinishExecute(!1);
	}
	ExecuteWhenEntitiesReady() {
		var e, t, o, i, n;
		this.YLe
			? (this.sDe = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
			: (this.sDe =
					ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
						this.E0,
					)),
			this.sDe &&
				!EventSystem_1.EventSystem.HasWithTarget(
					this.sDe,
					EventDefine_1.EEventName.RemoveEntity,
					this.zpe,
				) &&
				EventSystem_1.EventSystem.AddWithTarget(
					this.sDe,
					EventDefine_1.EEventName.RemoveEntity,
					this.zpe,
				),
			this.sDe?.IsInit
				? ((e = this.sDe.Entity.GetComponent(38)),
					(o = this.sDe.Entity.GetComponent(1)),
					e?.IsAiDriver
						? (Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"LevelEvent",
									7,
									"当前实体正在由行为树AI驱动，请检查需求设计是否合理（沿着样条移动）",
									["PbDataId", this.E0],
									["Name", o.Owner.GetName()],
								),
							this.FinishExecute(!1))
						: ((e = this.gLe.SplineEntityId),
							(o =
								ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
									e,
								))
								? (t = (0, IComponent_1.getComponent)(
										o.ComponentsData,
										"SplineComponent",
									))
									? ((o = Vector_1.Vector.Create(
											o.Transform?.Pos.X ?? 0,
											o.Transform?.Pos.Y ?? 0,
											o.Transform?.Pos.Z ?? 0,
										)),
										t.Option.Type !== IComponent_1.ESplineType.Patrol
											? (Log_1.Log.CheckError() &&
													Log_1.Log.Error(
														"Level",
														32,
														"[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] SplineComponent配置类型不是patrol",
														["SplineEntityId", e],
													),
												this.FinishExecute(!1))
											: ((this.wDe =
													this.sDe.Entity.GetComponent(0).GetPbDataId()),
												(i =
													ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
														e,
														this.wDe,
													)),
												(n =
													ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
														e,
													))?.IsValid()
													? (n.K2_SetActorLocation(
															o.ToUeVector(),
															!1,
															void 0,
															!1,
														),
														this.NDe(i, t.Option))
													: (Log_1.Log.CheckError() &&
															Log_1.Log.Error(
																"Level",
																32,
																"[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 获取的spline actor非法",
																["SplineEntityId", e],
															),
														this.FinishExecute(!1))))
									: (Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn(
												"Level",
												32,
												"[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 无法找到SplineComponent配置",
												["SplineEntityId", e],
											),
										this.FinishExecute(!1))
								: (Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"Level",
											32,
											"[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 无法找到Spline Entity",
											["SplineEntityId", e],
										),
									this.FinishExecute(!1))))
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("LevelEvent", 7, "[MoveWithSpline]实体无效", [
							"PbDataId",
							this.E0,
						]),
					this.FinishExecute(!1));
	}
	NDe(e, t) {
		var o = new Array(),
			i = e.GetNumberOfSplinePoints(),
			n = LevelGeneralContextDefine_1.EntityContext.Create(this.sDe.Id);
		const s = this.gLe.StartPointIndex
				? MathUtils_1.MathUtils.Clamp(this.gLe.StartPointIndex, 0, i - 1)
				: 0,
			r = this.gLe.EndPointIndex
				? MathUtils_1.MathUtils.Clamp(this.gLe.EndPointIndex, 0, i - 1)
				: i - 1;
		var a,
			l = [];
		for (let t = s; t <= r; ++t)
			l.push(Vector_1.Vector.Create(e.GetWorldLocationAtSplinePoint(t)));
		this.gLe.IsForceToFirstPoint &&
			((i = l[0]),
			(a = e.GetRotationAtSplinePoint(s, 1)),
			(i = {
				TelePortConfig: {
					TargetPos: { X: i.X, Y: i.Y, Z: i.Z, A: a.Yaw },
					Type: IAction_1.ETeleportType.FixedPos,
				},
			}),
			((a = new LevelGameplayActionsDefine_1.CommonActionInfo()).Name =
				"SetPlayerPos"),
			(a.Params = i),
			o.push(a)),
			this.YLe &&
				(this.sDe.Entity.GetComponent(3).ClearInput(),
				(i = this.sDe.Entity.GetComponent(52)).ClearMoveVectorCache(),
				i.SetActive(!1),
				(a = this.sDe.Entity.GetComponent(33))) &&
				a.EndOwnerAndFollowSkills(),
			0 < o.length
				? ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
						o,
						n,
						() => {
							this.ODe(e, t, s, r);
						},
					)
				: this.ODe(e, t, s, r),
			!GlobalData_1.GlobalData.IsPlayInEditor &&
				ObjectUtils_1.ObjectUtils.IsValid(this.Jie) &&
				ActorSystem_1.ActorSystem.Put(this.Jie),
			this.IsAsync && this.FinishExecute(!0);
	}
	ODe(e, t, o, i) {
		this.sDe.Entity.GetComponent(0).GetEntityType() ===
		Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
			? this.kDe(e, t)
			: this.FDe(e, t, o, i);
	}
	FDe(e, t, o, i) {
		var n = t && t?.Points.length,
			s = [];
		for (let t = o; t <= i; ++t)
			s.push(Vector_1.Vector.Create(e.GetWorldLocationAtSplinePoint(t)));
		var r = [];
		for (let e = o; e <= i; ++e) {
			var a,
				l = { Index: (l = e - o), Position: s[l] };
			n &&
				((a = t.Points[e])?.MoveSpeed && (l.MoveSpeed = a.MoveSpeed),
				a?.MoveState) &&
				(l.MoveState = a.MoveState),
				r.push(l);
		}
		var h = {
				Points: r,
				Navigation: t?.IsNavigation ?? !1,
				IsFly: this.gLe.IsFollowStrictly ?? t?.IsFloating ?? !1,
				DebugMode: !0,
				Loop: !1,
				UseNearestPoint: !0,
				Callback: this.GDe,
				ReturnFalseWhenNavigationFailed: !1,
			},
			v =
				(t?.CycleOption &&
					t.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop &&
					((h.Loop = !0), (h.CircleMove = t.CycleOption.IsCircle)),
				t?.TurnSpeed && (h.TurnSpeed = t.TurnSpeed),
				this.sDe.Entity.GetComponent(36));
		v.IsMovingToLocation() && v.MoveToLocationEnd(1),
			this.sDe.Entity.GetComponent(
				3,
			)?.Actor.CapsuleComponent.SetCollisionResponseToChannel(
				QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
				0,
			),
			v.MoveAlongPath(h);
	}
	kDe(e, t) {
		var o = this.sDe.Entity.GetComponent(113);
		if (o?.Valid) {
			var i = UE.NewArray(UE.BuiltinFloat);
			for (const e of t.Points) i.Add(e.MoveSpeed);
			this.xDe = { Spline: e, Speeds: i };
			e = Vector_1.Vector.Create(e.GetWorldLocationAtSplinePoint(0));
			var n = Vector_1.Vector.Create(
				this.sDe.Entity.GetComponent(1).ActorLocationProxy,
			);
			n = Vector_1.Vector.Dist(e, n);
			o.AddMoveTarget(
				new SceneItemMoveComponent_1.MoveTarget(e, n / t.Points[0].MoveSpeed),
			),
				o.AddStopMoveCallback(this.BDe);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					32,
					"SceneItem没有SceneItemMoveComponent",
					["PbDataId", this.wDe],
				),
				this.FinishExecute(!1);
	}
	OnReset() {
		this.gLe &&
			(ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
				this.gLe.SplineEntityId,
				this.wDe,
			),
			(this.gLe = void 0));
	}
	OnFinish() {
		this.sDe &&
			EventSystem_1.EventSystem.HasWithTarget(
				this.sDe,
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.sDe,
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			);
		var e,
			t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataIdByPbDataId(
				this.E0,
			);
		!this.YLe &&
			t &&
			(((e = Protocol_1.Aki.Protocol.mss.create()).rkn =
				MathUtils_1.MathUtils.NumberToLong(t)),
			Net_1.Net.Call(8266, e, (e) => {
				e &&
					e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.uvs,
						11051,
					);
			}));
	}
}
exports.LevelEventMoveWithSpline = LevelEventMoveWithSpline;
