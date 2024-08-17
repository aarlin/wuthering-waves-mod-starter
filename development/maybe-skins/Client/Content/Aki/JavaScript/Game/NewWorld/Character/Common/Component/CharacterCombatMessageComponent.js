"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, r) {
		var s,
			n = arguments.length,
			i =
				n < 3
					? e
					: null === r
						? (r = Object.getOwnPropertyDescriptor(e, o))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(t, e, o, r);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(s = t[a]) && (i = (n < 3 ? s(i) : 3 < n ? s(e, o, i) : s(e, o)) || i);
		return 3 < n && i && Object.defineProperty(e, o, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterCombatMessageComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	Queue_1 = require("../../../../../Core/Container/Queue"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController"),
	CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
	MESSAGE_BUFFER_MAX_SIZE = 50;
let CharacterCombatMessageComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.t5r = new Queue_1.Queue(50)),
			(this.i5r = () => {
				for (; 0 < this.t5r.Size; ) {
					var t = this.t5r.Front;
					if (Time_1.Time.NowSeconds < t[3]) {
						if (this.t5r.Size < 50) break;
						CombatDebugController_1.CombatDebugController.CombatWarn(
							"Message",
							this.Entity,
							"战斗缓冲满，立即执行",
							["id", t[1]],
						);
					}
					this.t5r.Pop(), this.o5r(t);
				}
			});
	}
	Push(t, e, o, r) {
		this.t5r.Push([e, t, o, r]),
			this.t5r.Size >= 50
				? (CombatDebugController_1.CombatDebugController.CombatWarn(
						"Message",
						this.Entity,
						"战斗消息缓冲满了",
						["IsInit", this.Entity.IsInit],
						["Active", this.Entity.Active],
					),
					(e = this.t5r.Pop()),
					this.o5r(e))
				: this.Entity.IsInit &&
					!this.Active &&
					((t = this.t5r.Pop()),
					CombatDebugController_1.CombatDebugController.CombatInfo(
						"Notify",
						this.Entity,
						"协议在Disable后执行",
						["Message", t[1]],
						["CombatCommon", t[0]],
					),
					this.o5r(t));
	}
	OnActivate() {
		for (; 0 < this.t5r.Size; ) {
			var t = this.t5r.Pop();
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"Notify",
				this.Entity,
				"协议OnActivate执行",
				["Message", t[1].toString()],
				["CombatCommon", t[0]],
			),
				this.o5r(t);
		}
		CombatMessageController_1.CombatMessageController.RegisterPreTick(
			this,
			this.i5r,
		);
	}
	OnEnd() {
		return (
			CombatMessageController_1.CombatMessageController.UnregisterPreTick(this),
			!0
		);
	}
	OnDisable() {
		if (this.Entity.IsInit)
			for (; 0 < this.t5r.Size; ) {
				var t = this.t5r.Pop();
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Notify",
					this.Entity,
					"协议OnDisable执行",
					["Message", t[1]],
					["CombatCommon", t[0]],
				),
					this.o5r(t);
			}
	}
	o5r(t) {
		try {
			CombatMessageController_1.CombatMessageController.Process(
				t[1],
				this.Entity,
				t[2],
				t[0],
			);
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"CombatInfo",
						15,
						"战斗协议执行回调方法异常",
						e,
						["messageId", t[1]],
						["error", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"CombatInfo",
						15,
						"战斗协议执行回调方法异常",
						["messageId", t[1]],
						["stack", e],
					);
		}
	}
};
(CharacterCombatMessageComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(44)],
	CharacterCombatMessageComponent,
)),
	(exports.CharacterCombatMessageComponent = CharacterCombatMessageComponent);
