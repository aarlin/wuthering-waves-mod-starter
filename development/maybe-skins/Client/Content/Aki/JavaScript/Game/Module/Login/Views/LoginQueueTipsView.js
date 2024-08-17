"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginQueueTipsView = void 0);
const UE = require("ue"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class LoginQueueTipsView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.vSi = void 0),
			(this.MSi = 0),
			(this.SSi = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[3, this.SSi]]);
	}
	OnBeforeDestroy() {
		ModelManager_1.ModelManager.LoginModel.HasAutoLoginPromise() &&
			ModelManager_1.ModelManager.LoginModel.FinishAutoLoginPromise(!1);
	}
	OnStart() {
		switch (((this.vSi = this.GetViewParam()), this.vSi?.o6n)) {
			case 0:
				this.GetText(0).ShowTextNew("NormalWaitTipsText"),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(1),
						"ExpectWaitingTimeText",
						Math.round(this.vSi.n6n / TimeUtil_1.TimeUtil.Minute)
							.toString()
							.padStart(2, "0"),
					),
					this.ESi();
				break;
			case 1:
				this.GetText(0).ShowTextNew("specialWaitTipsText"),
					this.GetText(1).SetUIActive(!1),
					this.GetText(2).SetUIActive(!1);
		}
	}
	OnTick(e) {
		(this.MSi += e), this.ESi();
	}
	ESi() {
		var e, i;
		this.GetText(2).IsUIActiveInHierarchy() &&
			((e = Math.round(TimeUtil_1.TimeUtil.SetTimeSecond(this.MSi))),
			(i = Math.floor(e / TimeUtil_1.TimeUtil.Minute)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(2),
				"AddWaitingTimeText",
				i.toString().padStart(2, "0"),
				(e % TimeUtil_1.TimeUtil.Minute).toString().padStart(2, "0"),
			));
	}
}
exports.LoginQueueTipsView = LoginQueueTipsView;
