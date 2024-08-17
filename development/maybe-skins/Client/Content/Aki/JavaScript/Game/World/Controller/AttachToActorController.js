"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AttachToActorController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ATTACH_REASON_LENGTH_LIMIT = 4;
class AttachToActorController extends ControllerBase_1.ControllerBase {
	static AttachToActor(t, r, o, e, a, c, n, A, g, E = !0) {
		var i;
		return e
			? e.length < 4
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"AttachToActor的Reason字符串长度必须大于等于限制字符数量",
							["Reason", e],
							["限制的字符数量", 4],
						),
					!1)
				: t?.IsValid()
					? r?.IsValid()
						? UE.KuroStaticLibrary.IsImplementInterface(
								r.GetClass(),
								UE.BPI_CreatureInterface_C.StaticClass(),
							)
							? (i = r.GetEntityId())
								? ModelManager_1.ModelManager.AttachToActorModel.AddEntityActor(
										i,
										t,
										r,
										e,
										o,
									)
									? (E && t.K2_AttachToActor(r, a, c, n, A, g),
										t.OnEndPlay.Add(AttachToActorController.MPn),
										!0)
									: (Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Entity",
												3,
												"actor添加失败",
												["ActorName", r.GetName()],
												["Reason", e],
											),
										!1)
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Entity",
											3,
											"entityId无效",
											["ActorName", r.GetName()],
											["Reason", e],
										),
									!1)
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Entity",
										3,
										"parentActor未实现接口CreatureInterface",
										["ActorName", r.GetName()],
										["Reason", e],
									),
								!1)
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("Entity", 3, "parentActor无效", ["Reason", e]),
							!1)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Entity", 3, "actor无效", ["Reason", e]),
						!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachToActor的Reason不能使用undefined",
						["Entity", this.constructor.name],
					),
				!1);
	}
	static AttachToComponent(t, r, o, e, a, c, n, A, g, E = !0) {
		var i, h;
		return e
			? e.length < 4
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"AttachToComponent的Reason字符串长度必须大于等于限制字符数量",
							["Reason", e],
							["限制的字符数量", 4],
						),
					!1)
				: t?.IsValid()
					? r?.IsValid()
						? (i = r.GetOwner())?.IsValid()
							? UE.KuroStaticLibrary.IsImplementInterface(
									i.GetClass(),
									UE.BPI_CreatureInterface_C.StaticClass(),
								)
								? (h = i.GetEntityId())
									? ModelManager_1.ModelManager.AttachToActorModel.AddEntityActor(
											h,
											t,
											i,
											e,
											o,
										)
										? (E && t.K2_AttachToComponent(r, a, c, n, A, g),
											t.OnEndPlay.Add(AttachToActorController.MPn),
											!0)
										: (Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"Entity",
													3,
													"actor添加失败",
													["ActorName", i.GetName()],
													["Reason", e],
												),
											!1)
									: (Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Entity",
												3,
												"entityId无效",
												["ActorName", i.GetName()],
												["Reason", e],
											),
										!1)
								: (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Entity",
											3,
											"ParentActor未实现接口CreatureInterface",
											["ActorName", i.GetName()],
											["Reason", e],
										),
									!1)
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error("Entity", 3, "parentActor无效", [
										"Reason",
										e,
									]),
								!1)
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("Entity", 3, "parentComponent无效", [
									"Reason",
									e,
								]),
							!1)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Entity", 3, "actor无效", ["Reason", e]),
						!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachToComponent的Reason不能使用undefined",
						["Entity", this.constructor.name],
					),
				!1);
	}
	static DetachActor(t, r, o, e, a, c) {
		if (!o)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachActor: RemoveActor的Reason不能使用undefined",
						["Entity", this.constructor.name],
					),
				!1
			);
		if (o.length < 4)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachActor: RemoveActor的Reason字符串长度必须大于等于限制字符数量",
						["Reason", o],
						["限制的字符数量", 4],
					),
				!1
			);
		if (!t?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Entity", 3, "srcActor无效", ["Reason", o]),
				!1
			);
		var n = t.GetAttachParentActor();
		if (!n?.IsValid()) {
			const n =
				ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(t);
			return n
				? this.DetachActorByEntity(t, o, n, r, e, a, c)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"AttachActor: entityActor无效",
							["Name", t.GetName()],
							["Reason", o],
						),
					!1);
		}
		if (
			!UE.KuroStaticLibrary.IsImplementInterface(
				n.GetClass(),
				UE.BPI_CreatureInterface_C.StaticClass(),
			)
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachActor: Actor未实现接口CreatureInterface",
						["ActorName", n.GetName()],
						["Reason", o],
					),
				!1
			);
		const A = n.GetEntityId();
		return A
			? this.DetachActorByEntity(t, o, A, r, e, a, c)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachActor: entityId无效",
						["ActorName", n.GetName()],
						["Reason", o],
					),
				!1);
	}
	static DetachActorByEntity(t, r, o, e, a, c, n) {
		var A;
		return r
			? r.length < 4
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							3,
							"AttachActor: RemoveActor的Reason字符串长度必须大于等于限制字符数量",
							["Reason", r],
							["限制的字符数量", 4],
						),
					!1)
				: t?.IsValid()
					? o
						? (A =
								ModelManager_1.ModelManager
									.AttachToActorModel).GetAttachActorItem(o, t)
							? (t.OnEndPlay.Remove(AttachToActorController.MPn),
								A.RemoveEntityActor(o, t, r)
									? (e ? t.K2_DestroyActor() : t.K2_DetachFromActor(a, c, n),
										!0)
									: (Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Entity",
												3,
												"AttachActor: Detach Actor 失败",
												["EntityId", o],
												["ActorName", t.GetName()],
												["Reason", r],
											),
										!1))
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Entity",
										3,
										"AttachActor: attachActorItem无效",
										["EntityId", o],
										["ActorName", t.GetName()],
										["Reason", r],
									),
								!1)
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Entity",
									3,
									"AttachActor: entityId无效",
									["EntityId", o],
									["ActorName", t.GetName()],
									["Reason", r],
								),
							!1)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Entity", 3, "srcActor无效", ["Reason", r]),
						!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachActor: RemoveActor的Reason不能使用undefined",
						["Entity", this.constructor.name],
					),
				!1);
	}
	static DetachActorsBeforeDestroyEntity(t) {
		if (!t?.Valid) return !0;
		var r = ModelManager_1.ModelManager.AttachToActorModel.GetAttachActorEntry(
			t.Id,
		);
		if (!r) return !0;
		var o = r.GetAttachActorItems();
		if (!o?.length) return !0;
		let e = !0;
		for (let r = o.length - 1; 0 <= r; --r) {
			var a = o[r];
			1 === a.DetachType &&
				a.Actor?.IsValid() &&
				!this.DetachActorByEntity(
					a.Actor,
					"AttachToActorController.DetachActorsBeforeDestroyEntity",
					t.Id,
					!0,
					1,
					1,
					1,
				) &&
				(e = !1);
		}
		return e;
	}
	static DetachActorsAfterDestroyEntity(t) {
		var r =
			ModelManager_1.ModelManager.AttachToActorModel.GetAttachActorEntry(t);
		if (!r) return !0;
		var o = r.GetAttachActorItems();
		if (!o?.length) return !0;
		let e = !0;
		for (let r = o.length - 1; 0 <= r; --r) {
			var a = o[r];
			0 === a.DetachType &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachActor: 存在未类型为ManualDestroy未Detach的Actor",
						["EntityId", t],
						["ActorName", a.Name],
						["ParentActorName", a.ParentActorName],
						["Reason", a.Reason],
					),
				a.Actor?.IsValid()) &&
				!this.DetachActorByEntity(
					a.Actor,
					"AttachToActorController.DetachActorsAfterDestroyEntity",
					t,
					!0,
					1,
					1,
					1,
				) &&
				(e = !1);
		}
		return e;
	}
	static CheckAttachError(t) {
		var r = ModelManager_1.ModelManager.AttachToActorModel,
			o = r.GetAttachActorEntry(t);
		if (!o) return !0;
		var e = o.GetAttachActorItems();
		if (!e?.length) return !0;
		let a = !0;
		for (let r = e.length - 1; 0 <= r; --r) {
			var c = e[r];
			(a = !1),
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachActor: Attach的Actor没有删除",
						["EntityId", t],
						["ActorName", c.Name],
						["ParentActorName", c.ParentActorName],
						["Reason", c.Reason],
					),
				c.Actor?.IsValid() &&
					this.DetachActorByEntity(
						c.Actor,
						"AttachToActorController.CheckAttachError",
						c.EntityId,
						!0,
						1,
						1,
						1,
					);
		}
		return r.ClearActorsByEntity(t), a;
	}
}
(exports.AttachToActorController = AttachToActorController),
	((_a = AttachToActorController).MPn = (t, r) => {
		if (t) {
			switch (r) {
				case 2:
				case 4:
					return;
			}
			if ((r = ModelManager_1.ModelManager.AttachToActorModel)) {
				var o = r.GetEntityIdByActor(t),
					e = r.GetAttachActorItem(o, t);
				if (e)
					switch (e.DetachType) {
						case 2:
							_a.DetachActorByEntity(
								t,
								"AttachToActorController.OnEndPlay DestroyExternal",
								o,
								!1,
								1,
								1,
								1,
							);
							break;
						case 0:
						case 1:
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Entity",
									3,
									"非法删除Attach的Actor",
									["EntityId", o],
									["ActorName", e.Name],
									["ParentActorName", e.ParentActorName],
									["DetachType", e.DetachType],
								),
								_a.DetachActorByEntity(
									t,
									"AttachToActorController.OnEndPlay ManualDestroy",
									o,
									!1,
									1,
									1,
									1,
								);
					}
			}
		}
	});
