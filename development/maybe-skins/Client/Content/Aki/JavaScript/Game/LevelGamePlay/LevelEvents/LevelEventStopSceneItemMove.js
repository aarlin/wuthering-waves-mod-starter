"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventStopSceneItemMove = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStopSceneItemMove extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.qAt = void 0);
	}
	ExecuteNew(e, t) {
		e
			? ((this.qAt = e), (e = this.qAt.EntityIds), this.CreateWaitEntityTask(e))
			: (Log_1.Log.CheckError() && Log_1.Log.Error("Event", 32, "参数配置错误"),
				this.FinishExecute(!1));
	}
	ExecuteWhenEntitiesReady() {
		if (this.qAt) {
			var e = this.qAt.EntityIds,
				t = [],
				o = Protocol_1.Aki.Protocol.e7s.create(),
				r =
					((o.i7s = []),
					this.qAt.StopType === IAction_1.EStopSceneItemMoveType.StopAtNextPos);
			for (const s of e) {
				var n = Protocol_1.Aki.Protocol.r7s.create(),
					i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
				if (i?.Valid) {
					var a = i.Entity.GetComponent(113);
					if (a?.Valid) {
						let e;
						r && (e = a.GetNextTarget());
						var c = i.Entity.GetComponent(0),
							l = i.Entity.GetComponent(1);
						c =
							((n.rkn = MathUtils_1.MathUtils.NumberToLong(
								c.GetCreatureDataId(),
							)),
							(n.$kn = l.ActorLocationProxy),
							{
								Entity: i.Entity,
								Location: Vector_1.Vector.Create(l.ActorLocationProxy),
								Velocity: e?.HasTarget ? e?.Velocity : void 0,
							});
						r &&
							e.HasTarget &&
							((n.$kn = e.Target),
							(c.Location = Vector_1.Vector.Create(e.Target)),
							(c.Velocity = e.Velocity)),
							a.IsMoving && o.i7s.push(n),
							t.push(c);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Event",
								32,
								"Entity找不到SceneItemMoveComponent",
								["entityId", s],
							);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Event", 32, "实体不合法", ["entityId", s]);
			}
			Net_1.Net.Call(15916, o, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						27191,
					);
			});
			for (const e of t) {
				var s = e.Entity.GetComponent(113),
					v =
						(s.StopMove(),
						EventSystem_1.EventSystem.EmitWithTarget(
							e.Entity,
							EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
							e.Entity,
						),
						Vector_1.Vector.Create(
							e.Entity.GetComponent(1)?.ActorLocationProxy,
						));
				e.Velocity &&
					((v = Vector_1.Vector.Distance(v, e.Location) / e.Velocity.Size()),
					s.AddMoveTarget(
						new SceneItemMoveComponent_1.MoveTarget(e.Location, v),
					));
			}
		}
	}
	OnReset() {
		this.qAt = void 0;
	}
}
exports.LevelEventStopSceneItemMove = LevelEventStopSceneItemMove;
