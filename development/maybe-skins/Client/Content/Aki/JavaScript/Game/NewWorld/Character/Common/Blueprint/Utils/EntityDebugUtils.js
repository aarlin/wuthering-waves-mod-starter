"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityDebugUtils = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	Global_1 = require("../../../../../Global"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	AnimalStateMachineComponent_1 = require("../../../Animal/Component/AnimalStateMachineComponent"),
	CharacterController_1 = require("../../../CharacterController");
class EntityDebugUtils {
	static GetDebugEntityNameList() {
		return (
			this.zWo ||
				((this.zWo = UE.NewArray(UE.BuiltinString)),
				(this.ZWo = new Map()),
				(this.eKo = new Map())),
			this.tKo(),
			this.zWo
		);
	}
	static tKo() {
		this.zWo.Empty(), this.ZWo.clear(), this.eKo.clear();
		var t = [],
			e = Global_1.Global.BaseCharacter.CharacterActorComponent;
		if (ModelManager_1.ModelManager?.GameModeModel?.WorldDone) {
			for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
				if (r && r.Entity.Active && r.Entity !== e.Entity) {
					var n = r.Entity.GetComponent(0),
						o = n?.GetEntityType();
					if (o)
						switch (o) {
							case Protocol_1.Aki.Protocol.wks.Proto_Npc:
							case Protocol_1.Aki.Protocol.wks.Proto_Monster:
							case Protocol_1.Aki.Protocol.wks.Proto_SceneItem:
							case Protocol_1.Aki.Protocol.wks.Proto_Custom:
							case Protocol_1.Aki.Protocol.wks.Proto_Animal:
								var i = Vector_1.Vector.Create();
								i =
									((
										CharacterController_1.CharacterController.GetActorComponent(
											r,
										)?.ActorLocationProxy ??
										Vector_1.Vector.Create(n.GetLocation())
									).Subtraction(e.ActorLocationProxy, i),
									i.SizeSquared());
								t.push({ Entity: r.Entity, Distance: i });
						}
				}
			t.sort((t, e) => t.Distance - e.Distance),
				t.forEach((t) => {
					this.iKo(t.Entity);
				});
		}
	}
	static iKo(t) {
		var e = t.GetComponent(1),
			n = t.GetComponent(0);
		e = `[${n?.GetPbDataId() ?? "?"}] ` + (e?.Owner?.GetName() ?? "?");
		(e += ` (${t.GetComponent(102)?.PawnName ?? n?.GetBaseInfo()?.TidName ?? "无名字"})`),
			this.zWo.Add(e),
			this.ZWo.set(e, t.Id),
			this.eKo.set(t.Id, e);
	}
	static GetSelectedEntityId(t) {
		return (t && this.ZWo && this.ZWo.get(t)) || 0;
	}
	static GetDebugBaseInfo(t) {
		if (!(a = EntitySystem_1.EntitySystem.Get(t))) return "无";
		var e = a.GetComponent(0);
		if (!e) return "无";
		if (!a?.IsInit) return "实体尚未完成Init";
		var n = a.GetComponent(1),
			o = a.GetComponent(102),
			i = a.GameBudgetManagedToken
				? cpp_1.FKuroGameBudgetAllocatorInterface.GetGameBudgetDebugString(
						a.GameBudgetManagedToken,
					)
				: "Null";
		let r = "Name: " + (o?.PawnName ?? "无名字");
		(r =
			(r =
				(r =
					(r =
						(r =
							(r =
								(r =
									(r += "\t\t") +
									"TidName: " +
									(e.GetBaseInfo()?.TidName ?? "无名字") +
									"\t\t") +
								"EntityId: " +
								t +
								"\t\t") +
							"PbDataId: " +
							e.GetPbDataId() +
							"\t\t") +
						"ModelId: " +
						e.GetModelId() +
						"\n\n") +
					`GameBudgetToken: ${a.GameBudgetManagedToken}\n` +
					`GameBudgetInfo:\n${i} `) + "\n\nEntityTag: \n") +
			this.GetEntityCommonTagDebugString(t) +
			"\n\n"),
			a.GetComponent(74) &&
				(r =
					(r =
						(r =
							(r =
								(r =
									(r += "范围组件内实体(客户端)列表: \n") +
									this.GetInRangeLocalEntityListDebugString(t)) +
								"\n\n范围组件内Actor(客户端)列表: \n") +
							this.GetInRangeActorListDebugString(t)) +
						"\n\n范围组件内实体(服务端)列表: \n") +
					this.GetInRangeOnlineEntityListDebugString(t) +
					"\n\n");
		var a =
			((t =
				((i =
					((o =
						((t =
							((i =
								((o = a.GetComponent(106)) &&
									(r =
										(r =
											(r = r + "进入逻辑范围: " + o.IsInLogicRange + "\t\t") +
											"LogicRange: " +
											o.LogicRange +
											"\t\t") +
										"PlayerDistance: " +
										o.PlayerDist +
										"\n\n"),
								a.GetComponent(115))) &&
								(r =
									(r =
										(r += "SceneItem属性:\t\t") +
										"IsLocked: " +
										i.IsLocked +
										"\t\t") +
									"IsMoving: " +
									i.IsMoving +
									"\n\n"),
							a.GetComponent(140))) &&
							(r =
								(r += "SceneItemManipulable属性:\t\t") +
								"State: " +
								t.State +
								"\n\n"),
						a.GetComponent(178))) &&
						(r =
							(r = r + "启用交互: " + o.DebugInteractOpened + "\t\t") +
							"定时器开启: " +
							o.DebugTimerRunning +
							"\n\n"),
					a.GetComponent(90))) &&
					(r =
						(r = r + "启用销毁: " + !!i.DeadActions + "\t\t") +
						"耐久: " +
						e.GetDurabilityValue() +
						"\n\n"),
				a.GetComponent(14))) &&
				((o = t.CurrentState()),
				(i =
					AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(
						o,
					)),
				(r =
					r +
					`动物状态: ${o}-` +
					AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetStateName(
						i,
					) +
					"\n\n")),
			e.GetInitLocation());
		return (
			(o =
				((t =
					(a && (r += `初始位置: [${a.X}, ${a.Y}, ${a.Z}]\n\n`),
					n?.ActorLocationProxy)) &&
					(r += `当前位置: [${t.X}, ${t.Y}, ${t.Z}]\n\n`),
				n?.Owner)) &&
				((i = o?.GetVelocity()),
				(r =
					(r += `Self Velocity: [${i.X}, ${i.Y}, ${i.Z}]`) +
					this.oKo(o) +
					"\n\n")),
			r
		);
	}
	static oKo(t, e = 1) {
		let n = "";
		var o = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
			i = (t.GetAttachedActors(o, !0), (0, puerts_1.$unref)(o));
		for (let t = 0; t < i.Num(); t++) {
			var r = i.Get(t),
				a = r.GetVelocity();
			n += "\n";
			let o = e;
			for (; 0 < o--; ) n += "\t\t";
			n =
				(n =
					(n += `[${UE.KismetSystemLibrary.GetDisplayName(r)}] Velocity: `) +
					`[${a.X}, ${a.Y}, ${a.Z}]`) + this.oKo(r, e + 1);
		}
		return n;
	}
	static GetInteractionDebugInfos(t) {
		if (!(t = EntitySystem_1.EntitySystem.Get(t))) return "无";
		let e = "";
		var n;
		return (n =
			((n =
				((n = t.GetComponent(106)) && (e += n.GetDebugString()),
				t.GetComponent(104))) && (e += n.GetDebugString()),
			(e += "\n"),
			t.GetComponent(178))) && (t = n.GetInteractController())
			? e + t.GetInteractionDebugInfos()
			: e;
	}
	static GetEntityCommonTagDebugString(t) {
		if (!(t = EntitySystem_1.EntitySystem.Get(t))) return "无";
		let e = t.GetComponent(185)?.GetTagDebugStrings()?.trim();
		return e && 0 !== e.length ? e : "无";
	}
	static GetInRangeLocalEntityListDebugString(t) {
		var e = EntitySystem_1.EntitySystem.Get(t);
		if (!e) return "无";
		t = e.GetComponent(74)?.GetEntitiesInRangeLocal();
		let n = "";
		if (t?.size) {
			for (var [, o] of t) {
				var i = o.Entity?.GetComponent(1),
					o = o.Entity?.GetComponent(0);
				i = `[${o?.GetPbDataId() ?? "?"}] ` + (i?.Owner?.GetName() ?? "?");
				n +=
					(i += ` (${e.GetComponent(102)?.PawnName ?? o?.GetBaseInfo()?.TidName ?? "无名字"})`) +
					"\n";
			}
			n = n.trimEnd();
		}
		return n && 0 !== n.length ? n : "无";
	}
	static GetInRangeOnlineEntityListDebugString(t) {
		var e = EntitySystem_1.EntitySystem.Get(t);
		if (!e) return "无";
		t = e.GetComponent(74)?.GetEntitiesInRangeOnline();
		let n = "";
		if (t?.size) {
			for (var [, o] of t) {
				var i = o.Entity?.GetComponent(1),
					o = o.Entity?.GetComponent(0);
				i = `[${o?.GetPbDataId() ?? "?"}] ` + (i?.Owner?.GetName() ?? "?");
				n +=
					(i += ` (${e.GetComponent(102)?.PawnName ?? o?.GetBaseInfo()?.TidName ?? "无名字"})`) +
					"\n";
			}
			n = n.trimEnd();
		}
		return n && 0 !== n.length ? n : "无";
	}
	static GetInRangeActorListDebugString(t) {
		if (!(t = EntitySystem_1.EntitySystem.Get(t))) return "无";
		t = t.GetComponent(74)?.GetActorsInRangeLocal();
		let e = "";
		if (t?.size) {
			for (const n of t)
				n?.IsValid() && (e += UE.KismetSystemLibrary.GetDisplayName(n) + "\n");
			e = e.trimEnd();
		}
		return e && 0 !== e.length ? e : "无";
	}
	static GetDebugEntityActor(t) {
		if (
			(this.eKo || EntityDebugUtils.GetDebugEntityNameList(),
			this.eKo.has(t) &&
				(t = EntitySystem_1.EntitySystem.Get(t)) &&
				(t = t.GetComponent(1)))
		)
			return t.Owner;
	}
	static GetDebugEntityName(t) {
		return (
			this.eKo || EntityDebugUtils.GetDebugEntityNameList(), this.eKo.get(t)
		);
	}
	static GetEntityPbDataId(t) {
		return (t = (t = EntitySystem_1.EntitySystem.Get(t)) && t.GetComponent(0))
			? t.GetPbDataId()
			: 0;
	}
}
exports.EntityDebugUtils = EntityDebugUtils;
