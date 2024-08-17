"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiPerceptionEvents = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	CombatDebugController_1 = require("../../Utils/CombatDebugController");
class AiPerceptionEvents {
	constructor(e) {
		(this.Bte = e),
			(this.Xoe = new Array()),
			(this.$oe = new Array()),
			(this.Yoe = new Array()),
			(this.Joe = new Array()),
			(this.zoe = new Array()),
			(this.Zoe = new Array()),
			(this.ere = new Array()),
			(this.tre = UE.NewArray(UE.Actor)),
			(this.ire = UE.NewArray(UE.Actor)),
			(this.ore = UE.NewArray(UE.BuiltinInt)),
			(this.rre = UE.NewArray(UE.Actor)),
			(this.nre = UE.NewArray(UE.Actor)),
			(this.sre = UE.NewArray(UE.BuiltinInt)),
			(this.are = UE.NewArray(UE.Actor)),
			(this.hre = new Array()),
			(this.lre = new Array()),
			(this._re = new Array()),
			(this.ure = !0),
			(this.cre = !0),
			(this.mre = !0),
			(this.dre = void 0),
			(this.Cre = 0),
			(this.gre = new Set()),
			(this.uie = (e) => {
				(e = e.GetComponent(1)),
					e?.Valid &&
						Vector_1.Vector.DistSquared(
							this.Bte.CharActorComp.ActorLocationProxy,
							e.ActorLocationProxy,
						) < this.Cre &&
						!this.gre.has(e.Entity.Id) &&
						(this.gre.add(e.Entity.Id),
						this.dre.Callback.Broadcast(e.Owner, !0));
			});
	}
	Clear(e = !1) {
		this.Xoe.splice(0, this.Xoe.length),
			this.$oe.splice(0, this.$oe.length),
			this.Yoe.splice(0, this.Yoe.length),
			this.Joe.splice(0, this.Joe.length),
			this.zoe.splice(0, this.zoe.length),
			this.Zoe.splice(0, this.Zoe.length),
			this.ere.splice(0, this.ere.length),
			this.tre.Empty(),
			this.ire.Empty(),
			this.ore.Empty(),
			this.rre.Empty(),
			this.nre.Empty(),
			this.sre.Empty(),
			this.are.Empty(),
			e &&
				(this.hre.splice(0, this.hre.length),
				this.lre.splice(0, this.lre.length),
				this._re.splice(0, this._re.length),
				this.dre) &&
				(EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnSceneItemDestroy,
					this.uie,
				),
				(this.dre = void 0),
				this.gre.clear());
	}
	TickPerception() {
		0 !== this.lre.length && this.fre();
	}
	TickHate() {
		0 < this._re.length && this.pre(), 0 < this.hre.length && this.vre();
	}
	pre() {
		for (const t of this.Xoe) {
			var e = this.ere.indexOf(t);
			-1 !== e && this.ere.slice(e, 1);
		}
		if (0 < this.ere.length) {
			this.Mre("超出距离被伤害没添加仇恨事件广播", this.ere, void 0),
				this.Sre(this.ere, this.are);
			for (const e of this._re)
				e.Callback.Broadcast(this.are, void 0, void 0, 0);
			this.ere.splice(0, this.ere.length), this.are.Empty();
		}
	}
	vre() {
		var e = 0 < this.Xoe.length,
			t = 0 < this.$oe.length;
		if (e || t) {
			var i = this.Bte.AiHateList.GetHatredMap().size;
			if (e)
				if (t) {
					this.Mre("仇恨广播", this.Xoe, this.$oe),
						this.Sre(this.Xoe, this.tre),
						this.Sre(this.$oe, this.ire),
						this.Ere(this.Yoe, this.ore),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("AI", 6, "CallHate Other", [
								"Count",
								this.hre.length,
							]);
					for (const e of this.hre)
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("AI", 6, "Before CallHate Callback"),
							e.Callback.Broadcast(this.tre, this.ire, this.ore, i),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("AI", 6, "After CallHate Callback");
					this.Xoe.splice(0, this.Xoe.length),
						this.$oe.splice(0, this.$oe.length),
						this.tre.Empty(),
						this.ire.Empty(),
						this.Yoe.splice(0, this.Yoe.length),
						this.ore.Empty();
				} else {
					this.Mre("仇恨广播", this.Xoe, void 0),
						this.Sre(this.Xoe, this.tre),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("AI", 6, "CallHate no remove", [
								"Count",
								this.hre.length,
							]);
					for (const e of this.hre)
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("AI", 6, "Before CallHate Callback"),
							e.Callback.Broadcast(this.tre, void 0, void 0, i),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("AI", 6, "After CallHate Callback");
					this.Xoe.splice(0, this.Xoe.length), this.tre.Empty();
				}
			else {
				this.Mre("仇恨广播", void 0, this.$oe),
					this.Sre(this.$oe, this.ire),
					this.Ere(this.Yoe, this.ore),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("AI", 6, "CallHate no add", [
							"Count",
							this.hre.length,
						]);
				for (const e of this.hre)
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("AI", 6, "Before Hatred Callback"),
						e.Callback.Broadcast(void 0, this.ire, this.ore, i),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("AI", 6, "After Hatred Callback");
				this.$oe.splice(0, this.$oe.length),
					this.ire.Empty(),
					this.Yoe.splice(0, this.Yoe.length),
					this.ore.Empty();
			}
		}
	}
	fre() {
		var e = 0 < this.Joe.length,
			t = 0 < this.zoe.length;
		if (e || t) {
			var i = this.Bte.AiPerception.AllEnemies.size;
			if (e)
				if (t) {
					this.Mre("感知广播", this.Joe, this.zoe),
						this.Sre(this.Joe, this.rre),
						this.Sre(this.zoe, this.nre),
						this.Ere(this.Zoe, this.sre);
					for (const e of this.lre)
						e.Callback.Broadcast(this.rre, this.nre, this.sre, i);
					this.Joe.splice(0, this.Joe.length),
						this.zoe.splice(0, this.zoe.length),
						this.rre.Empty(),
						this.nre.Empty(),
						this.Zoe.splice(0, this.Zoe.length),
						this.sre.Empty();
				} else {
					this.Mre("感知广播", this.Joe, void 0), this.Sre(this.Joe, this.rre);
					for (const e of this.lre)
						e.Callback.Broadcast(this.rre, void 0, void 0, i);
					this.Joe.splice(0, this.Joe.length), this.rre.Empty();
				}
			else {
				this.Mre("感知广播", void 0, this.zoe),
					this.Sre(this.zoe, this.nre),
					this.Ere(this.Zoe, this.sre);
				for (const e of this.lre)
					e.Callback.Broadcast(void 0, this.nre, this.sre, i);
				this.zoe.splice(0, this.zoe.length),
					this.nre.Empty(),
					this.Zoe.splice(0, this.Zoe.length),
					this.sre.Empty();
			}
		}
	}
	Sre(e, t) {
		for (const s of e) {
			var i = EntitySystem_1.EntitySystem.Get(s);
			i && i.Active && i.Valid && (i = i.GetComponent(1)?.Owner) && t.Add(i);
		}
		e.splice(0, e.length);
	}
	Ere(e, t) {
		for (const i of e) t.Add(i);
	}
	AddAiHateEvent(e) {
		if (!this.hre.includes(e)) {
			var t;
			if (this.Bte?.AiHateList)
				for ([t] of this.Bte?.AiHateList.GetHatredMap())
					this.Bte?.AiPerceptionEvents.CollectAiHateEventById(!0, t);
			this.hre.push(e);
		}
	}
	yre(e, t, i, s) {
		if (e && i)
			-1 !== (e = s.indexOf(t.Id))
				? (s.slice(e, e + 1), i.push(t.Id))
				: i.includes(t.Id) || i.push(t.Id);
		else {
			if (i && -1 !== (e = i.indexOf(t.Id)))
				return i.slice(e, e + 1), void s.push(t.Id);
			s.includes(t.Id) || s.push(t.Id);
		}
	}
	Ire(e, t, i, s) {
		if (e && i)
			-1 !== (e = s.indexOf(t))
				? (s.slice(e, e + 1), i.push(t))
				: i.includes(t) || i.push(t);
		else {
			if (i && -1 !== (e = i.indexOf(t)))
				return i.slice(e, e + 1), void s.push(t);
			s.includes(t) || s.push(t);
		}
	}
	CollectAiHateEvent(e, t) {
		this.yre(e, t, this.Xoe, this.$oe);
	}
	CollectAiHateEventById(e, t) {
		this.Ire(e, t, this.Xoe, this.Yoe);
	}
	AddAiHateOutRangeEvent(e) {
		this._re.includes(e) || this._re.push(e);
	}
	CollectAiHateOutRangeEvent(e) {
		this.ere.includes(e.Id) || this.ere.push(e.Id);
	}
	AddAiPerceptionEvent(e, t, i, s) {
		if (!this.lre.includes(e)) {
			if (
				((this.ure = t), (this.cre = i), (this.mre = s), this.Bte?.AiPerception)
			)
				for (const e of this.Bte?.AiPerception.AllEnemies)
					this.Bte?.AiPerceptionEvents.CollectAiPerceptionEventById(!0, e, 2);
			this.lre.push(e);
		}
	}
	SetPerceptionEventState(e, t, i) {
		(this.ure = e), (this.cre = t), (this.mre = i);
	}
	CollectAiPerceptionEventByActorComp(e, t, i) {
		switch (i) {
			case 1:
				if (this.ure) break;
				return;
			case 2:
				if (this.cre) break;
				return;
			default:
				if (this.mre) break;
				return;
		}
		this.yre(e, t.Entity, this.Joe, this.zoe);
	}
	CollectAiPerceptionEventById(e, t, i) {
		switch (i) {
			case 1:
				if (this.ure) break;
				return;
			case 2:
				if (this.cre) break;
				return;
			default:
				if (this.mre) break;
				return;
		}
		this.Ire(e, t, this.Joe, this.zoe);
	}
	CollectAiRemovePerceptionEventByEntityId(e, t, i) {
		switch (i) {
			case 1:
				if (this.ure) break;
				return;
			case 2:
				if (this.cre) break;
				return;
			default:
				if (this.mre) break;
				return;
		}
		this.Ire(e, t, void 0, this.Zoe);
	}
	AddSceneItemDestroyEvent(e, t) {
		this.dre ||
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSceneItemDestroy,
				this.uie,
			),
			(this.dre = t),
			(this.Cre = e * e);
	}
	RemoveSceneItemDestroyEvent(e) {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSceneItemDestroy,
			this.uie,
		),
			(this.dre = void 0),
			this.gre.clear();
	}
	ForceTriggerSceneItemDestroyEvent(e) {
		this.dre?.IsValid() && this.dre.Callback.Broadcast(e, !0);
	}
	OnSenseSceneItem(e) {
		var t;
		this.dre &&
			!this.gre.has(e.Entity.Id) &&
			(t = e.Entity.GetComponent(90))?.Valid &&
			t.IsDestroyed &&
			(this.gre.add(e.Entity.Id), this.dre.Callback.Broadcast(e.Owner, !0));
	}
	Mre(e, t, i) {
		CombatDebugController_1.CombatDebugController.CombatInfo(
			"Ai",
			this.Bte.CharActorComp.Entity,
			e,
			["addIds", t],
			["removeIds:", i],
		);
	}
}
exports.AiPerceptionEvents = AiPerceptionEvents;
