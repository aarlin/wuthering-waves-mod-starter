"use strict";
var _ExecutionQueue_Handle,
	_ExecutionQueue_Executing,
	_ExecutionQueue_Pending,
	_ExecutionQueue_TaskQueue,
	__classPrivateFieldGet =
		(this && this.__classPrivateFieldGet) ||
		function (e, t, i, u) {
			if ("a" === i && !u)
				throw new TypeError("Private accessor was defined without a getter");
			if ("function" == typeof t ? e === t && u : t.has(e))
				return "m" === i ? u : "a" === i ? u.call(e) : u ? u.value : t.get(e);
			throw new TypeError(
				"Cannot read private member from an object whose class did not declare it",
			);
		},
	__classPrivateFieldSet =
		(this && this.__classPrivateFieldSet) ||
		function (e, t, i, u, n) {
			if ("m" === u) throw new TypeError("Private method is not writable");
			if ("a" === u && !n)
				throw new TypeError("Private accessor was defined without a setter");
			if ("function" == typeof t ? e === t && n : t.has(e))
				return "a" === u ? n.call(e, i) : n ? (n.value = i) : t.set(e, i), i;
			throw new TypeError(
				"Cannot write private member to an object whose class did not declare it",
			);
		};
Object.defineProperty(exports, "__esModule", { value: !0 });
const EXECUTION_QUEUE_ENABLE = !(exports.ExecutionQueue = void 0);
class ExecutionQueue {
	constructor() {
		_ExecutionQueue_Handle.set(this, 0),
			_ExecutionQueue_Executing.set(this, !1),
			_ExecutionQueue_Pending.set(this, new Set()),
			_ExecutionQueue_TaskQueue.set(this, []);
	}
	Enqueue(e) {
		var t, i;
		__classPrivateFieldSet(
			this,
			_ExecutionQueue_Handle,
			((i = __classPrivateFieldGet(this, _ExecutionQueue_Handle, "f")),
			(t = i++),
			i),
			"f",
		);
		const u = t;
		return (
			EXECUTION_QUEUE_ENABLE
				? (__classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").add(u),
					__classPrivateFieldGet(this, _ExecutionQueue_TaskQueue, "f").push(
						async () => {
							__classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").delete(
								u,
							) && (await e(u));
						},
					),
					__classPrivateFieldGet(this, _ExecutionQueue_Executing, "f") ||
						this.m8())
				: e(u),
			u
		);
	}
	Cancel(e) {
		return (
			!!EXECUTION_QUEUE_ENABLE &&
			__classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").delete(e)
		);
	}
	async m8() {
		for (__classPrivateFieldSet(this, _ExecutionQueue_Executing, !0, "f"); ; ) {
			var e = __classPrivateFieldGet(
				this,
				_ExecutionQueue_TaskQueue,
				"f",
			).shift();
			if (!e)
				return void __classPrivateFieldSet(
					this,
					_ExecutionQueue_Executing,
					!1,
					"f",
				);
			await e();
		}
	}
}
(exports.ExecutionQueue = ExecutionQueue),
	(_ExecutionQueue_Handle = new WeakMap()),
	(_ExecutionQueue_Executing = new WeakMap()),
	(_ExecutionQueue_Pending = new WeakMap()),
	(_ExecutionQueue_TaskQueue = new WeakMap());
//# sourceMappingURL=ExecutionQueue.js.map
