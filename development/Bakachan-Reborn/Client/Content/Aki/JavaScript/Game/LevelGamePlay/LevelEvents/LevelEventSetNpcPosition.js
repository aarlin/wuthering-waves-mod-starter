"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetNpcPosition = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetNpcPosition extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		if (e) {
			var o = e,
				n = new UE.Vector(0, 0, 0),
				r = new UE.Rotator(0, 0, 0);
			for (const e of o.EntityData) {
				var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					e.EntityId,
				);
				if (!a)
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								27,
								"通过事件设置NPC坐标时找不到实体：pbDataId: " + e.EntityId,
							),
						void this.Failure()
					);
				(a = a.Entity.GetComponent(3)),
					void 0 !== e.Pos.X &&
						void 0 !== e.Pos.Y &&
						void 0 !== e.Pos.Z &&
						(n.Set(e.Pos.X, e.Pos.Y, e.Pos.Z),
						o.IsCenterPosition ||
							(n.Z += a.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
						a.SetActorLocation(
							n,
							"关卡事件{LevelEventSetNpcPosition}.设置NPC的位置",
							!1,
						)),
					void 0 !== e.Pos.A &&
						((r.Yaw = e.Pos.A),
						a.SetInputRotator(r),
						a.SetActorRotation(
							r,
							"关卡事件{LevelEventSetNpcPosition}.设置NPC的朝向",
							!1,
						));
			}
		}
	}
}
exports.LevelEventSetNpcPosition = LevelEventSetNpcPosition;
