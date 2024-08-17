"use strict";
var _SwitchRef_Group,
	_SwitchRef_State,
	_SwitchRef_Actor,
	__classPrivateFieldSet =
		(this && this.__classPrivateFieldSet) ||
		function (t, e, i, r, _) {
			if ("m" === r) throw new TypeError("Private method is not writable");
			if ("a" === r && !_)
				throw new TypeError("Private accessor was defined without a setter");
			if ("function" == typeof e ? t === e && _ : e.has(t))
				return "a" === r ? _.call(t, i) : _ ? (_.value = i) : e.set(t, i), i;
			throw new TypeError(
				"Cannot write private member to an object whose class did not declare it",
			);
		},
	__classPrivateFieldGet =
		(this && this.__classPrivateFieldGet) ||
		function (t, e, i, r) {
			if ("a" === i && !r)
				throw new TypeError("Private accessor was defined without a getter");
			if ("function" == typeof e ? t === e && r : e.has(t))
				return "m" === i ? r : "a" === i ? r.call(t) : r ? r.value : e.get(t);
			throw new TypeError(
				"Cannot read private member from an object whose class did not declare it",
			);
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SwitchRef = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../Core/Common/Log");
class SwitchRef {
	constructor(t, e) {
		_SwitchRef_Group.set(this, void 0),
			_SwitchRef_State.set(this, void 0),
			_SwitchRef_Actor.set(this, void 0),
			__classPrivateFieldSet(this, _SwitchRef_Group, t, "f"),
			__classPrivateFieldSet(this, _SwitchRef_State, e, "f");
	}
	get State() {
		return __classPrivateFieldGet(this, _SwitchRef_State, "f");
	}
	set State(t) {
		__classPrivateFieldGet(this, _SwitchRef_Actor, "f")?.IsValid()
			? __classPrivateFieldGet(this, _SwitchRef_State, "f") !== t &&
				(__classPrivateFieldSet(this, _SwitchRef_State, t, "f"),
				AudioSystem_1.AudioSystem.SetSwitch(
					__classPrivateFieldGet(this, _SwitchRef_Group, "f"),
					__classPrivateFieldGet(this, _SwitchRef_State, "f"),
					__classPrivateFieldGet(this, _SwitchRef_Actor, "f"),
				))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Audio", 57, "[Core.SwitchRef] 绑定对象无效", [
					"Group",
					__classPrivateFieldGet(this, _SwitchRef_Group, "f"),
				]);
	}
	Bind(t) {
		__classPrivateFieldSet(this, _SwitchRef_Actor, t, "f"),
			AudioSystem_1.AudioSystem.SetSwitch(
				__classPrivateFieldGet(this, _SwitchRef_Group, "f"),
				__classPrivateFieldGet(this, _SwitchRef_State, "f"),
				__classPrivateFieldGet(this, _SwitchRef_Actor, "f"),
			);
	}
	ClearObject() {
		return !0;
	}
}
(exports.SwitchRef = SwitchRef),
	(_SwitchRef_Group = new WeakMap()),
	(_SwitchRef_State = new WeakMap()),
	(_SwitchRef_Actor = new WeakMap());
//# sourceMappingURL=SwitchRef.js.map
