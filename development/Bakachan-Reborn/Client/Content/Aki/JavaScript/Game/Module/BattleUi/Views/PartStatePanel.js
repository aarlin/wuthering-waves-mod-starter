"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PartStatePanel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PartState_1 = require("./PartState");
class PartStatePanel {
	constructor() {
		(this.Xut = new Map()),
			(this.$ut = (t, e, a) => {
				var r = EntitySystem_1.EntitySystem.Get(t);
				if (FNameUtil_1.FNameUtil.IsNothing(e))
					r &&
						(a
							? this.ActivatePartStateByRole(r)
							: this.DestroyPartStateFromRole(r));
				else if (r) {
					var s,
						i = r.GetComponent(58).Parts;
					if (!(i.length <= 0))
						for (const o of i)
							o.BoneName.op_Equality(e) &&
								(a
									? this.ActivatePartState(r, o)
									: ((s = o.Index), this.DestroyPartState(t, s)));
				}
			});
	}
	InitializePartStatePanel() {
		this.Ore();
	}
	ResetPartStatePanel() {
		this.DestroyAllParStates(), this.kre();
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSetPartStateVisible,
			this.$ut,
		);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSetPartStateVisible,
			this.$ut,
		);
	}
	OnCreateEntity(t) {
		if (t) {
			var e = t.GetComponent(58);
			if (e && (e = e.Parts) && 0 !== e.length) {
				var a,
					r = t.GetComponent(1).Owner.Mesh;
				for (const s of e)
					s.IsPartStateVisible &&
						((a = s.PartSocketName),
						r.DoesSocketExist(a)
							? this.ActivatePartState(t, s)
							: Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Battle",
									8,
									"[BattleView]激活部位血条时找不到部位插槽:",
									["SocketName", a],
								));
			}
		}
	}
	ActivatePartStateByRole(t) {
		if (t) {
			var e = t.GetComponent(58).Parts;
			if (0 !== e.length) for (const a of e) this.ActivatePartState(t, a);
		}
	}
	ActivatePartState(t, e) {
		var a = this.GetPartState(t.Id, e.Index);
		a ? a.InitializePartState(t, e) : this.Yut(t, e);
	}
	DestroyAllParStates() {
		for (const t of this.Xut.values()) for (const e of t.values()) e.Destroy();
		this.Xut.clear();
	}
	DestroyPartStateFromRole(t) {
		t = t.Id;
		var e = this.GetAllPartStates(t);
		if (e) {
			for (const t of e.values()) t.Destroy();
			this.Xut.get(t).clear();
		}
	}
	DestroyPartState(t, e) {
		var a = this.GetPartState(t, e);
		a && (a.Destroy(), (a = this.Xut.get(t))) && a.delete(e);
	}
	Tick(t) {
		for (const e of this.Xut.values()) for (const a of e.values()) a.Tick(t);
	}
	Yut(t, e) {
		var a = t.Id;
		t = new PartState_1.PartState(t, e);
		let r = this.Xut.get(a);
		return (
			r
				? r.set(e.Index, t)
				: ((r = new Map()).set(e.Index, t), this.Xut.set(a, r)),
			t
		);
	}
	GetPartState(t, e) {
		if ((t = this.Xut.get(t))) return t.get(e);
	}
	GetAllPartStates(t) {
		return this.Xut.get(t);
	}
}
(exports.PartStatePanel = PartStatePanel).aYe = void 0;
