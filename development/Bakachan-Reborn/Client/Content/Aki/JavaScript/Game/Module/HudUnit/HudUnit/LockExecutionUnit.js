"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LockExecutionUnit = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	HudUnitBase_1 = require("../HudUnitBase"),
	CLOSE_ANIM_TIME = 200;
class LockExecutionUnit extends HudUnitBase_1.HudUnitBase {
	constructor() {
		super(...arguments),
			(this.znt = void 0),
			(this.Wei = !1),
			(this.Znt = void 0),
			(this.ist = () => {
				(this.znt = void 0), this.Znt.SetResult(), (this.Znt = void 0);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[2, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.RootItem.SetAnchorAlign(2, 2),
			this.InitTweenAnim(0),
			this.InitTweenAnim(1),
			this.InitTweenAnim(2);
	}
	TryShow() {
		this.IsShowOrShowing || this.Show();
	}
	OnAfterShow() {
		this.StopTweenAnim(2), this.PlayTweenAnim(0), this.PlayTweenAnim(1);
	}
	TryHide(t) {
		(this.Wei = t), this.IsHideOrHiding || this.Hide();
	}
	async OnBeforeHideAsync() {
		this.StopTweenAnim(0),
			this.StopTweenAnim(1),
			this.Wei &&
				(this.Znt &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("Battle", 18, "重复调用隐藏"),
					this.Znt.SetResult()),
				(this.Znt = new CustomPromise_1.CustomPromise()),
				(this.znt = TimerSystem_1.TimerSystem.Delay(this.ist, 200)),
				this.PlayTweenAnim(2),
				await this.Znt.Promise);
	}
	OnBeforeDestroy() {
		this.znt &&
			(TimerSystem_1.TimerSystem.Remove(this.znt),
			(this.znt = void 0),
			this.Znt.SetResult());
	}
}
exports.LockExecutionUnit = LockExecutionUnit;
