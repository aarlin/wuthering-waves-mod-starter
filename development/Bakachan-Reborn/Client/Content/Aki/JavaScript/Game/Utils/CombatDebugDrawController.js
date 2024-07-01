"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombatDebugDrawController = void 0);
const UE = require("ue"),
	EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	CombatDebugController_1 = require("./CombatDebugController");
class CombatDebugDrawController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(this.RedColor = new UE.LinearColor(1, 0, 0, 1)),
			(this.GreenColor = new UE.LinearColor(0, 1, 0, 1)),
			(this.BlueColor = new UE.LinearColor(0, 0, 1, 1)),
			(this.YellowColor = new UE.LinearColor(1, 1, 0, 1)),
			(this.EntityBoxColor = new UE.LinearColor(1, 1, 0, 0.5)),
			(this.EntityBoxInfoColor = new UE.LinearColor(0.8, 0.8, 1, 0.5)),
			!0
		);
	}
	static OnTick(o) {
		this.DebugMonsterControl && this.gCr(),
			this.fCr(CombatDebugController_1.CombatDebugController.DebugEntityId);
	}
	static gCr() {
		this.pCr.clear();
		for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
			[]) {
			var o;
			t.Entity.Active &&
				(o = t.Entity.GetComponent(0)).IsRole() &&
				this.pCr.set(o.GetPlayerId(), t.Entity);
		}
		for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
			[]) {
			var t, e;
			o.Entity.Active &&
				o.Entity.GetComponent(0).IsMonster() &&
				(e = o.Entity.GetComponent(38)?.AiController) &&
				(t = this.pCr.get(e.ControllerPlayerId)) &&
				(this.vCr.DeepCopy(o.Entity.GetComponent(3).ActorLocationProxy),
				this.MCr.DeepCopy(t.GetComponent(3).ActorLocationProxy),
				UE.KismetSystemLibrary.DrawDebugArrow(
					GlobalData_1.GlobalData.World,
					this.vCr.ToUeVector(),
					this.MCr.ToUeVector(),
					2,
					this.GreenColor,
				),
				(t = o.Entity.GetComponent(57))) &&
				e.ControllerPlayerId !== t.ControllerPlayerId &&
				(e = this.pCr.get(t.ControllerPlayerId)) &&
				(this.MCr.DeepCopy(e.GetComponent(3).ActorLocationProxy),
				UE.KismetSystemLibrary.DrawDebugArrow(
					GlobalData_1.GlobalData.World,
					this.vCr.ToUeVector(),
					this.MCr.ToUeVector(),
					2,
					this.YellowColor,
				));
		}
	}
	static fCr(o) {
		o = EntitySystem_1.EntitySystem.Get(o);
		var t = o?.GetComponent(3),
			e = t?.Actor,
			r = e?.CapsuleComponent;
		if (e?.IsValid() && r?.IsValid()) {
			var l = e.K2_GetActorLocation();
			if (
				(CombatDebugDrawController.IsDrawEntityBoxEnabled &&
					UE.KismetSystemLibrary.DrawDebugCapsule(
						e,
						l,
						r.CapsuleHalfHeight,
						r.CapsuleRadius,
						e.K2_GetActorRotation(),
						this.YellowColor,
					),
				CombatDebugDrawController.IsDrawEntityBoxInfoEnabled)
			) {
				r = new UE.Vector(l.X, l.Y, l.Z - r.CapsuleHalfHeight - 30);
				let n = `${e.GetName()}_${o?.Id.toString()}\n` + l.ToCompactString();
				(n += "\n" + (t?.IsAutonomousProxy ? "主控" : "非主控")),
					(l = o.GetComponent(107)) &&
						(n += "\n时间缩放: " + l.CurrentTimeScale.toFixed(2)),
					(t = o.GetComponent(65));
				for (const o of t?.StateMachineGroup?.StateMachines ?? [])
					n += `\n状态机${o.Name}: ` + o.GetCurrentStateString();
				(l = o.GetComponent(33)) &&
					(n =
						(n +=
							"\n技能目标: " +
							(l.SkillTarget?.Entity.GetComponent(3)?.Actor?.GetName() ??
								"无")) +
						"\n当前技能: " +
						(l.CurrentSkill?.SkillId ?? "无")),
					UE.KismetSystemLibrary.DrawDebugString(
						e,
						r,
						n,
						void 0,
						this.EntityBoxInfoColor,
					);
			}
		}
	}
}
((exports.CombatDebugDrawController =
	CombatDebugDrawController).DebugMonsterMovePath = !1),
	(CombatDebugDrawController.DebugMonsterControl = !1),
	(CombatDebugDrawController.IsDrawEntityBoxEnabled = !0),
	(CombatDebugDrawController.IsDrawEntityBoxInfoEnabled = !1),
	(CombatDebugDrawController.RedColor = void 0),
	(CombatDebugDrawController.GreenColor = void 0),
	(CombatDebugDrawController.BlueColor = void 0),
	(CombatDebugDrawController.YellowColor = void 0),
	(CombatDebugDrawController.EntityBoxColor = void 0),
	(CombatDebugDrawController.EntityBoxInfoColor = void 0),
	(CombatDebugDrawController.vCr = Vector_1.Vector.Create()),
	(CombatDebugDrawController.MCr = Vector_1.Vector.Create()),
	(CombatDebugDrawController.pCr = new Map());
