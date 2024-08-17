"use strict";
var _StateRef_Group,
	_StateRef_State,
	__classPrivateFieldSet =
		(this && this.__classPrivateFieldSet) ||
		function (t, e, a, r, i) {
			if ("m" === r) throw new TypeError("Private method is not writable");
			if ("a" === r && !i)
				throw new TypeError("Private accessor was defined without a setter");
			if ("function" == typeof e ? t === e && i : e.has(t))
				return "a" === r ? i.call(t, a) : i ? (i.value = a) : e.set(t, a), a;
			throw new TypeError(
				"Cannot write private member to an object whose class did not declare it",
			);
		},
	__classPrivateFieldGet =
		(this && this.__classPrivateFieldGet) ||
		function (t, e, a, r) {
			if ("a" === a && !r)
				throw new TypeError("Private accessor was defined without a getter");
			if ("function" == typeof e ? t === e && r : e.has(t))
				return "m" === a ? r : "a" === a ? r.call(t) : r ? r.value : e.get(t);
			throw new TypeError(
				"Cannot read private member from an object whose class did not declare it",
			);
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StateRef = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
class StateRef {
	constructor(t, e) {
		_StateRef_Group.set(this, void 0),
			_StateRef_State.set(this, void 0),
			__classPrivateFieldSet(this, _StateRef_Group, t, "f"),
			__classPrivateFieldSet(this, _StateRef_State, e, "f");
	}
	get State() {
		return __classPrivateFieldGet(this, _StateRef_State, "f");
	}
	set State(t) {
		__classPrivateFieldGet(this, _StateRef_State, "f") !== t &&
			(__classPrivateFieldSet(this, _StateRef_State, t, "f"),
			AudioSystem_1.AudioSystem.SetState(
				__classPrivateFieldGet(this, _StateRef_Group, "f"),
				__classPrivateFieldGet(this, _StateRef_State, "f"),
			));
	}
	ClearObject() {
		return !0;
	}
}
(exports.StateRef = StateRef),
	(_StateRef_Group = new WeakMap()),
	(_StateRef_State = new WeakMap());
//# sourceMappingURL=StateRef.js.map
