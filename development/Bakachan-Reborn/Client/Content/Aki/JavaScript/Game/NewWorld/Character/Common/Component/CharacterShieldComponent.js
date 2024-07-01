"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, i) {
		var o,
			n = arguments.length,
			h =
				n < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, r))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			h = Reflect.decorate(e, t, r, i);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(o = e[s]) && (h = (n < 3 ? o(h) : 3 < n ? o(t, r, h) : o(t, r)) || h);
		return 3 < n && h && Object.defineProperty(t, r, h), h;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterShieldComponent = exports.CharacterShield = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	ShieldById_1 = require("../../../../../Core/Define/ConfigQuery/ShieldById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
class CharacterShield {
	constructor(e, t, r) {
		(this.Id = e),
			(this.TemplateId = t),
			(this.Value = r),
			(this.Priority = 0),
			(this.ShieldValue = 0),
			(this.HandleId = 0),
			(this.HandleId = e),
			(e = ShieldById_1.configShieldById.GetConfig(t))
				? ((this.Priority = e.Priority), (this.ShieldValue = r))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 36, "护盾添加失败，护盾Id不存在", [
						"Id",
						t,
					]);
	}
}
exports.CharacterShield = CharacterShield;
let CharacterShieldComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.elt = void 0),
			(this.Xte = void 0),
			(this.cWr = new Map()),
			(this.mWr = 0);
	}
	get ShieldTotal() {
		return this.mWr;
	}
	OnStart() {
		return (
			(this.elt = this.Entity.CheckGetComponent(157)),
			(this.Xte = this.Entity.CheckGetComponent(185)),
			!0
		);
	}
	OnActivate() {
		this.cWr.clear, (this.mWr = 0);
		var e = this.Entity.GetComponent(0).ComponentDataMap.get("Rps")?.Rps?.eSs;
		if (e) for (const t of e) this.Add(t.E4n, t.R5n, t.YMs);
		return !0;
	}
	dWr(e) {
		0 === this.mWr && 0 < e
			? this.Xte.AddTag(1219330576)
			: 0 < this.mWr && this.mWr + e <= 0 && this.Xte.RemoveTag(1219330576),
			(this.mWr += e),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.CharShieldChange,
				this.mWr,
			);
	}
	Add(e, t, r) {
		this.cWr.get(e)
			? this.ChangeValue(e, t, r)
			: ((t = new CharacterShield(e, t, r)),
				this.cWr.set(e, t),
				this.dWr(t.ShieldValue)),
			this.elt.TriggerEvents(7, this.elt, {});
	}
	Remove(e) {
		var t = this.cWr.get(e);
		t && (this.dWr(-t.ShieldValue), this.CWr(), this.cWr.delete(e));
	}
	ChangeValue(e, t, r) {
		var i,
			o = this.cWr.get(e);
		o
			? ((i = o.ShieldValue), (o.ShieldValue = r), this.dWr(r - i))
			: this.Add(e, t, r);
	}
	static OnShieldUpdateNotify(e, t) {
		var r = e?.GetComponent(64);
		if (r)
			for (const e of t.dTs) {
				var i = e.cTs,
					o = Protocol_1.Aki.Protocol.VOs;
				i === o.Proto_EShieldUpdateTypeAdd && 0 < e.YMs
					? r.Add(e.E4n, e.R5n, e.YMs)
					: i === o.Proto_EShieldUpdateTypeDel && 0 === e.YMs
						? r.Remove(e.E4n)
						: i === o.Proto_EShieldUpdateTypeModify && 0 < e.YMs
							? r.ChangeValue(e.E4n, e.R5n, e.YMs)
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn("Battle", 36, "护盾更新错误", ["shield", e]);
			}
	}
	GetShieldValue(e) {
		if (0 === e) return this.ShieldTotal;
		let t = 0;
		for (const r of this.cWr.values())
			r.TemplateId === e && (t += r.ShieldValue);
		return t;
	}
	CWr() {
		this.elt.TriggerEvents(8, this.elt, {});
	}
	GetDebugShieldInfo() {
		return this.cWr.entries();
	}
};
__decorate(
	[CombatMessage_1.CombatNet.Listen("O2n", !1)],
	CharacterShieldComponent,
	"OnShieldUpdateNotify",
	null,
),
	(CharacterShieldComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(64)],
		CharacterShieldComponent,
	)),
	(exports.CharacterShieldComponent = CharacterShieldComponent);
