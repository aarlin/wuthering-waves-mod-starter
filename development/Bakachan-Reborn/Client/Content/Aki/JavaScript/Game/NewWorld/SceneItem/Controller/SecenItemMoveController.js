"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemMoveController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	SceneItemMoveComponent_1 = require("../Common/Component/SceneItemMoveComponent");
class MoveParam {
	constructor() {
		(this.Points = []),
			(this.IsLoop = !1),
			(this.MoveMotion = void 0),
			(this.StopTime = void 0),
			(this.Acceleration = void 0),
			(this.MaxSpeed = void 0);
	}
}
class SceneItemMoveController extends ControllerBase_1.ControllerBase {
	static AddSceneItemMove(e, o, t, r, n = void 0) {
		var i = new MoveParam();
		(i.Points = o),
			(i.IsLoop = t),
			(i.MoveMotion = r),
			(i.StopTime = n),
			(i.Acceleration =
				r.Type === IAction_1.EMoveMotion.VariableMotion ? r.Acceleration : -1),
			(i.MaxSpeed =
				r.Type === IAction_1.EMoveMotion.VariableMotion ? r.MaxSpeed : -1),
			this.EUr.set(e, i),
			EventSystem_1.EventSystem.AddWithTarget(
				e,
				EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
				this.yUr,
			);
		let v = -1;
		if (r.Type !== IAction_1.EMoveMotion.VariableMotion) {
			var a = e.GetComponent(1).ActorLocationProxy;
			t = Vector_1.Vector.Create(
				o[o.length - 1].X ?? 0,
				o[o.length - 1].Y ?? 0,
				o[o.length - 1].Z ?? 0,
			);
			if (Vector_1.Vector.Distance(a, t) < MathUtils_1.MathUtils.SmallNumber)
				return void (i.IsLoop && this.TUr(e));
			var l = Vector_1.Vector.Create(
				o[o.length - 1].X ?? 0,
				o[o.length - 1].Y ?? 0,
				o[o.length - 1].Z ?? 0,
			);
			l.SubtractionEqual(
				Vector_1.Vector.Create(o[0].X ?? 0, o[0].Y ?? 0, o[0].Z ?? 0),
			),
				l.Normalize();
			for (let e = 1; e < o.length; e++) {
				var c = Vector_1.Vector.Create(o[e].X ?? 0, o[e].Y ?? 0, o[e].Z ?? 0);
				if ((c.SubtractionEqual(a), c.Normalize(), 0 < c.DotProduct(l))) {
					v = e;
					break;
				}
			}
			if (-1 === v) return;
		} else v = 0;
		this.IUr(e, v);
	}
	static TUr(e, o = 1) {
		var t = this.EUr.get(e);
		if (t) {
			var r = e.GetComponent(113);
			if (r) {
				if (
					((e = t.Points.slice()).reverse(),
					0 < o && e.splice(0, o),
					t.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion)
				)
					for (const o of e) {
						var n = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0);
						r.AddMoveTarget(
							new SceneItemMoveComponent_1.MoveTarget(
								n,
								-1,
								t.StopTime,
								t.MoveMotion.MaxSpeed ?? -1,
								t.MoveMotion.Acceleration ?? -1,
							),
						);
					}
				else
					for (const o of e) {
						var i = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0);
						r.AddMoveTarget(
							new SceneItemMoveComponent_1.MoveTarget(
								i,
								t.MoveMotion?.Time ?? -1,
								t.StopTime,
							),
						);
					}
				t.IsLoop
					? r.AddStopMoveCallbackWithEntity(SceneItemMoveController.LUr)
					: r.AddStopMoveCallbackWithEntity(SceneItemMoveController.yUr);
			}
		}
	}
	static IUr(e, o = 1) {
		var t = this.EUr.get(e);
		if (t) {
			var r = e.GetComponent(113);
			if (r) {
				if (
					((e = t.Points.slice()),
					0 < o && e.splice(0, o),
					t.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion)
				) {
					let i = 0 < o;
					for (const o of e) {
						var n = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0);
						let e = t.StopTime;
						i || ((e = 0), (i = !0)),
							r.AddMoveTarget(
								new SceneItemMoveComponent_1.MoveTarget(
									n,
									-1,
									e,
									t.MoveMotion.MaxSpeed ?? -1,
									t.MoveMotion.Acceleration ?? -1,
								),
							);
					}
				} else
					for (const o of e) {
						var i = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0);
						r.AddMoveTarget(
							new SceneItemMoveComponent_1.MoveTarget(
								i,
								t.MoveMotion?.Time ?? -1,
								t.StopTime,
							),
						);
					}
				t.IsLoop
					? r.AddStopMoveCallbackWithEntity(SceneItemMoveController.DUr)
					: r.AddStopMoveCallbackWithEntity(SceneItemMoveController.yUr);
			}
		}
	}
}
(exports.SceneItemMoveController = SceneItemMoveController),
	((_a = SceneItemMoveController).EUr = new Map()),
	(SceneItemMoveController.DUr = (e) => {
		var o = e.GetComponent(113);
		o &&
			(o?.RemoveStopMoveCallbackWithEntity(_a.DUr),
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Event",
					32,
					"[LevelEventSceneItemMove] MoveToStartCallback",
				),
			SceneItemMoveController.TUr(e));
	}),
	(SceneItemMoveController.LUr = (e) => {
		var o = e.GetComponent(113);
		o &&
			(o?.RemoveStopMoveCallbackWithEntity(_a.LUr),
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Event",
					32,
					"[LevelEventSceneItemMove] MoveToEndCallback",
				),
			SceneItemMoveController.IUr(e));
	}),
	(SceneItemMoveController.yUr = (e) => {
		var o = e.GetComponent(113);
		o &&
			(o?.RemoveStopMoveCallbackWithEntity(_a.yUr),
			EventSystem_1.EventSystem.HasWithTarget(
				e,
				EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
				_a.yUr,
			) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					e,
					EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
					_a.yUr,
				),
			SceneItemMoveController.EUr.delete(e));
	});
