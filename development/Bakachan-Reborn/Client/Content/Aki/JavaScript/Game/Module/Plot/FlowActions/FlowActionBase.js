"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionBase = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class FlowActionBase {
	constructor() {
		(this.Type = ""),
			(this.ActionInfo = void 0),
			(this.Callback = void 0),
			(this.Runner = void 0),
			(this.Owner = void 0),
			(this.Context = void 0);
	}
	Execute(t, o, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Plot",
				27,
				"===>剧情行为开始",
				["", t.Name],
				["actionId", t.ActionId],
			),
			(this.Context = o),
			(this.ActionInfo = t),
			o.IsBackground ? this.OnBackgroundExecute() : this.OnExecute(),
			e && this.FinishExecute(!0);
	}
	OnExecute() {}
	OnBackgroundExecute() {
		this.FinishExecute(!0);
	}
	InterruptExecute() {
		this.OnInterruptExecute();
	}
	OnInterruptExecute() {}
	FinishExecute(t, o = !0) {
		var e;
		this.ActionInfo &&
			this.Runner &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Plot",
					27,
					"<===剧情行为结束",
					["", this.ActionInfo?.Name],
					["actionId", this.ActionInfo?.ActionId],
					["isSuccess", t],
					["isContinue", o],
				),
			(this.ActionInfo = void 0),
			(this.Runner = void 0),
			(this.Context = void 0),
			this.Callback) &&
			((e = this.Callback), (this.Callback = void 0), e(t, o));
	}
	Recycle() {
		this.Owner?.RecycleAction(this);
	}
}
exports.FlowActionBase = FlowActionBase;
