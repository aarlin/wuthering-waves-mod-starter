"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeyUtil = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils");
class KeyUtil {
	static GetActionMappingByName(e) {
		var t = UE.InputSettings.GetInputSettings(),
			i = (0, puerts_1.$ref)(void 0);
		return (t =
			(t.GetActionMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(e), i),
			(0, puerts_1.$unref)(i)));
	}
	static GetAxisMappingByName(e) {
		var t = UE.InputSettings.GetInputSettings(),
			i = (0, puerts_1.$ref)(void 0);
		return (t =
			(t.GetAxisMappingByName(FNameUtil_1.FNameUtil.GetDynamicFName(e), i),
			(0, puerts_1.$unref)(i)));
	}
	static GetKeyName(e, t) {
		if ((e = this.GetKeyNames(e, t))) return e[0];
	}
	static GetKeyNames(e, t) {
		if (!StringUtils_1.StringUtils.IsEmpty(e)) {
			let i = this.GetKeyNameByAction(e, t);
			return (i = i?.length ? i : this.GetKeyNameByAxis(e, t));
		}
	}
	static GetKeyNameByAction(e, t) {
		var i = KeyUtil.GetActionMappingByName(e);
		if (0 !== i.Num()) {
			var r = [];
			for (let e = 0; e < i.Num(); e++) {
				var s = i.Get(e).Key;
				switch (t) {
					case 3:
						var a = UE.KismetInputLibrary.Key_IsKeyboardKey(s),
							y = UE.KismetInputLibrary.Key_IsMouseButton(s);
						(a || y) && r.push(s.KeyName.toString());
						break;
					case 7:
						UE.KismetInputLibrary.Key_IsGamepadKey(s) &&
							r.push(s.KeyName.toString());
				}
			}
			return r;
		}
	}
	static GetKeyNameByAxis(e, t) {
		var i = KeyUtil.GetAxisMappingByName(e);
		if (0 !== i.Num()) {
			var r = [];
			for (let e = 0; e < i.Num(); e++) {
				var s = i.Get(e).Key;
				switch (t) {
					case 3:
						var a =
								UE.KismetInputLibrary.Key_IsAxis1D(s) ||
								UE.KismetInputLibrary.Key_IsAxis2D(s) ||
								UE.KismetInputLibrary.Key_IsAxis3D(s),
							y = UE.KismetInputLibrary.Key_IsKeyboardKey(s),
							n = UE.KismetInputLibrary.Key_IsMouseButton(s);
						((a && (y || n)) || y || n) && r.push(s.KeyName.toString());
						break;
					case 7:
						(a =
							UE.KismetInputLibrary.Key_IsAxis1D(s) ||
							UE.KismetInputLibrary.Key_IsAxis2D(s) ||
							UE.KismetInputLibrary.Key_IsAxis3D(s)),
							(y = UE.KismetInputLibrary.Key_IsGamepadKey(s)),
							((a && y) || y) && r.push(s.KeyName.toString());
				}
			}
			return r;
		}
	}
	static GetPcKeyNameByAction(e, t) {
		if (3 === t || 4 === t || 5 === t) {
			var i = KeyUtil.GetActionMappingByName(e);
			if (0 !== i.Num()) {
				t = [];
				var r = [],
					s = [];
				for (let e = 0; e < i.Num(); e++) {
					var a = i.Get(e).Key,
						y = UE.KismetInputLibrary.Key_IsKeyboardKey(a),
						n = UE.KismetInputLibrary.Key_IsMouseButton(a);
					y ? r.push(a.KeyName.toString()) : n && s.push(a.KeyName.toString());
				}
				return t.push(r, s), t;
			}
		}
	}
}
exports.KeyUtil = KeyUtil;
