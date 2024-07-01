"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongTimeToTriggerComponent = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class LongTimeToTriggerComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor() {
		super(...arguments),
			(this.Ebo = 0),
			(this.ybo = void 0),
			(this.Ibo = !1),
			(this.Tbo = () => {
				this.Ebo += TimerSystem_1.MIN_TIME;
				var e,
					o = this.GetHotKeyConfig();
				let t = 0;
				this.Ebo > o.ReleaseFailureTime &&
					(this.Lbo(),
					(e = o.LongPressTime),
					(t = (this.Ebo - o.ReleaseFailureTime) / e)),
					1 <= t
						? this.ReleaseWithoutCheck()
						: this.CurComponent.SetLongPressState(t);
			});
	}
	OnPress(e) {
		this.Dbo(), this.Rbo();
	}
	OnRelease(e) {
		this.Ebo >= e.LongPressTime + e.ReleaseFailureTime &&
			this.m6i(e.BindButtonTag),
			this.CurComponent.SetLongPressState(0),
			this.Dbo(),
			(this.Ibo = !1);
	}
	m6i(e) {
		e === HotKeyViewDefine_1.EXIT_TAG
			? UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView()
			: UiNavigationNewController_1.UiNavigationNewController.ClickButton(e);
	}
	OnUnRegisterMe() {
		this.Dbo();
	}
	Dbo() {
		this.ybo &&
			(TimerSystem_1.TimerSystem.Remove(this.ybo), (this.ybo = void 0)),
			(this.Ebo = 0);
	}
	Rbo() {
		this.ybo = TimerSystem_1.TimerSystem.Forever(
			this.Tbo,
			TimerSystem_1.MIN_TIME,
		);
	}
	Lbo() {
		if (!this.Ibo) {
			this.Ibo = !0;
			var e = ModelManager_1.ModelManager.UiNavigationModel;
			if (e)
				for (const o of e.GetActionHotKeyComponentSet(this.GetActionName()))
					o.ResetPressState();
		}
	}
}
exports.LongTimeToTriggerComponent = LongTimeToTriggerComponent;
