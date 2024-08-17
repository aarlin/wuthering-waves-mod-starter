"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Input = exports.TouchData = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class TouchData {
	constructor(t, e, n) {
		(this.IsPress = t), (this.TouchId = e), (this.TouchPosition = n);
	}
}
exports.TouchData = TouchData;
class Input {
	static Initialize(t) {
		t &&
			(t.OnClickKey.Add(Input.ocr),
			t.OnMiddleMouseScroll.Add(Input.rcr),
			t.OnTouch.Add(Input.pbt),
			t.OnTouchMove.Add(Input.ncr));
	}
	static IsKeyPress(t) {
		return void 0 !== (t = Input.uSe.get(t)) && t;
	}
	static GetAxisValue() {
		return Input.scr;
	}
	static GetTouchMap() {
		return Input.q2o;
	}
}
((exports.Input = Input).uSe = new Map()),
	(Input.q2o = new Map()),
	(Input.scr = 0),
	(Input.OnlyRespondToKey = ""),
	(Input.Enable = !0),
	(Input.ocr = (t, e) => {
		var n = t.KeyName.toString();
		Input.uSe.set(n, e),
			(StringUtils_1.StringUtils.IsEmpty(Input.OnlyRespondToKey) ||
				n === Input.OnlyRespondToKey ||
				n.includes("Mouse")) &&
				Input.Enable &&
				(Input.uSe.set(n, e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.KeyClick,
					e,
					t,
				));
	}),
	(Input.rcr = (t) => {
		Input.Enable && (Input.scr = t);
	}),
	(Input.pbt = (t, e, n) => {
		Input.Enable && void 0 === Input.q2o.get(e) && new TouchData(t, e, n);
	}),
	(Input.ncr = (t, e) => {
		Input.Enable && (t = Input.q2o.get(t)) && (t.TouchPosition = e);
	});
