"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsActionHandle = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
	StatDefine_1 = require("../Common/StatDefine");
class TsActionHandle extends UE.Object {
	constructor() {
		super(...arguments),
			(this.PlayerController = void 0),
			(this.ActionName = void 0),
			(this.OnInputActionCallback = void 0),
			(this.OnPressStat = void 0),
			(this.OnReleaseStat = void 0);
	}
	Initialize(t) {
		(this.PlayerController = t),
			(this.OnPressStat = void 0),
			(this.OnReleaseStat = void 0);
	}
	Reset() {
		(this.PlayerController = void 0),
			(this.ActionName = void 0),
			(this.OnInputActionCallback = void 0);
	}
	AddActionBinding(t, e) {
		e
			? ((this.ActionName = t),
				(this.OnInputActionCallback = e),
				(e = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
				this.PlayerController.AddActionBinding(
					e,
					0,
					this,
					new UE.FName(this.OnPressAction.name),
				),
				this.PlayerController.AddActionBinding(
					e,
					1,
					this,
					new UE.FName(this.OnReleaseAction.name),
				))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Controller", 8, "添加Action输入绑定时，回调不存在", [
					"actionName",
					t,
				]);
	}
	OnPressAction(t) {
		this.OnInputActionCallback &&
			this.OnInputActionCallback(this.ActionName, !0, t);
	}
	OnReleaseAction(t) {
		this.OnInputActionCallback &&
			this.OnInputActionCallback(this.ActionName, !1, t);
	}
}
(exports.TsActionHandle = TsActionHandle), (exports.default = TsActionHandle);
