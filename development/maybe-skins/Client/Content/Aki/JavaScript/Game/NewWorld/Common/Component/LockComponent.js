"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, o, e, n) {
		var r,
			i = arguments.length,
			s =
				i < 3
					? o
					: null === n
						? (n = Object.getOwnPropertyDescriptor(o, e))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, o, e, n);
		else
			for (var c = t.length - 1; 0 <= c; c--)
				(r = t[c]) && (s = (i < 3 ? r(s) : 3 < i ? r(o, e, s) : r(o, e)) || s);
		return 3 < i && s && Object.defineProperty(o, e, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LockComponent = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let LockComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Snn = void 0),
			(this.zht = void 0),
			(this.Enn = 0);
	}
	OnStart() {
		(this.Snn = this.Entity.GetComponent(177)),
			(this.zht = this.Entity.GetComponent(0));
		var t = this.zht.GetEntityEnterComponentState();
		if (void 0 !== t)
			switch (t) {
				case Protocol_1.Aki.Protocol.qqs.Proto_NotUnlock:
					this.Enn = -421801185;
					break;
				case Protocol_1.Aki.Protocol.qqs.Proto_Unlockable:
					this.Enn = 1960897308;
					break;
				case Protocol_1.Aki.Protocol.qqs.Proto_Unlocked:
					this.Enn = 1196894179;
					break;
				default:
					this.Enn = -421801185;
			}
		return this.Enn || (this.Enn = -421801185), this.Snn.AddTag(this.Enn), !0;
	}
	ChangeLockTag(t) {
		var o = this.Enn;
		(this.Enn = t), this.Snn.ChangeLocalLevelTag(this.Enn, o);
	}
};
(LockComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(92)],
	LockComponent,
)),
	(exports.LockComponent = LockComponent);
