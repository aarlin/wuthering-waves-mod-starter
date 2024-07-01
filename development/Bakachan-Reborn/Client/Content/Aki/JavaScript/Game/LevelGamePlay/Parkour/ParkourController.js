"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ParkourController = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GeneralLogicTreeController_1 = require("../../Module/GeneralLogicTree/GeneralLogicTreeController"),
	SceneTeamController_1 = require("../../Module/SceneTeam/SceneTeamController"),
	ParkourModel_1 = require("./ParkourModel");
class ParkourController extends ControllerBase_1.ControllerBase {
	static StartParkour(e, r, o) {
		ModelManager_1.ModelManager.ParkourModel.AddParkour(e, r, o) && this.yAe(e);
	}
	static EndParkour(e) {
		ModelManager_1.ModelManager.ParkourModel.RemoveParkour(e);
	}
	static HandleParkourPoint(e, r, o) {
		var t = ModelManager_1.ModelManager.ParkourModel.GetParkour(e);
		if (t) {
			var a = t.ParkourInfo;
			if (a)
				if (r === a.Points.length - 1)
					t.CurCheckPointCount <= 0 &&
						(this.EndParkour(e),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ParkourFinished,
							e.toString(),
							t.TotalScore,
						));
				else {
					var n = t.ParkourActorList[r];
					if (
						(n?.length > o &&
							((o = (n = n[o]).Point), !n.IsRecycled) &&
							o?.IsValid() &&
							(o.ReceiveEndPlay(0),
							ActorSystem_1.ActorSystem.Put(o),
							(n.IsRecycled = !0)),
						0 !== r)
					) {
						t.CurCheckPointCount--;
						n =
							((n = (o = t.TotalScore).get(1)) ? o.set(1, ++n) : o.set(1, 1),
							a.Points[r]);
						if (n?.ModifiedTime && t.ParkourContext) {
							let e = Protocol_1.Aki.Protocol.uqs.Proto_Add;
							n.ModifiedTime < 0 && (e = Protocol_1.Aki.Protocol.uqs.Proto_Sub),
								GeneralLogicTreeController_1.GeneralLogicTreeController.RequestSetTimerInfo(
									t.ParkourContext.TreeIncId,
									t.ParkourContext.NodeId,
									"CountDownChallenge",
									e,
									n.ModifiedTime,
								);
						}
						!a.IsRequireToEnd &&
							t.CurCheckPointCount <= 0 &&
							(this.EndParkour(e),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.ParkourFinished,
								e.toString(),
								t.TotalScore,
							)),
							n?.BuffId &&
								(o = Global_1.Global.BaseCharacter)?.IsValid() &&
								(r = o?.CharacterActorComponent.Entity)?.Valid &&
								((a = r.GetComponent(157))
									? a.AddBuff(BigInt(n.BuffId), {
											InstigatorId: a.CreatureDataId,
											Reason: "Parkour",
										})
									: Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Level",
											7,
											"AddBuffToPlayer 获取当前角色没有AbilityComponent",
										));
					}
				}
		}
	}
	static yAe(e) {
		var r = ModelManager_1.ModelManager.ParkourModel.GetParkour(e);
		r.ClearTotalScore(),
			r.ParkourActorList || (r.ParkourActorList = new Array());
		let o = 0;
		var t = r.ParkourInfo;
		for (const l of t.Points) {
			var a = new Array();
			if (l.PointGroup) {
				let r = 0;
				for (const i of l.PointGroup.Points) {
					var n = Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0);
					(n = UE.KismetMathLibrary.MakeTransform(
						n.ToUeVector(),
						MathUtils_1.MathUtils.DefaultTransform.Rotator(),
						MathUtils_1.MathUtils.DefaultTransform.GetScale3D(),
					)),
						(n = this.IAe(n, e, o, r++, l, t));
					a.push(new ParkourModel_1.ParkourPointInfo(n));
				}
			} else {
				var i = Vector_1.Vector.Create(
					l.Position.X ?? 0,
					l.Position.Y ?? 0,
					l.Position.Z ?? 0,
				);
				(i =
					(r.OriginRotation && r.OriginRotation.Quaternion().RotateVector(i, i),
					r.OriginLocation && i.Addition(r.OriginLocation, i),
					UE.KismetMathLibrary.MakeTransform(
						i.ToUeVector(),
						MathUtils_1.MathUtils.DefaultTransform.Rotator(),
						MathUtils_1.MathUtils.DefaultTransform.GetScale3D(),
					))),
					(i = this.IAe(i, e, o, 0, l, t));
				a.push(new ParkourModel_1.ParkourPointInfo(i));
			}
			r.ParkourActorList.push(a), o++;
		}
	}
	static IAe(e, r, o, t, a, n) {
		var i = ActorSystem_1.ActorSystem.Get(
			UE.TsParkourCheckPoint_C.StaticClass(),
			e,
			void 0,
		);
		if ((i.ReceiveBeginPlay(), i.IsValid())) {
			let e;
			switch (
				((i.CheckPointIndex = o.valueOf()),
				(i.IndexInGroup = t),
				(i.CheckTag = a.PlayerTag ?? ""),
				(i.ParkourId = r),
				i.SetDetectSphere(a.Radius),
				o)
			) {
				case 0:
					e = n.StartResource;
					break;
				case n.Points.length - 1:
					e = n.EndResource;
					break;
				default:
					(e = n.CheckPointResource),
						(i.DestroyEffectModelBasePath = n.CheckPointsDestroyRes ?? "");
			}
			return (
				e && !StringUtils_1.StringUtils.IsEmpty(e) && i.GenerateFxByPath(e), i
			);
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Level", 32, "[GenerateParkPointActor] 生成Actor失败");
	}
	static MatchParkourRoleConfig(e) {
		return (
			!!(e = ModelManager_1.ModelManager.ParkourModel.GetParkour(e)) &&
			(!e.MatchRoleOption || e.MatchRoleOption?.length <= 0
				? !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
				: SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
						e.MatchRoleOption,
					))
		);
	}
}
exports.ParkourController = ParkourController;
