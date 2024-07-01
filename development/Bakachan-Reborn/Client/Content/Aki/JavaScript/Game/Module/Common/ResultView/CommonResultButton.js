"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonResultButton = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class CommonResultButton extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.IRe = void 0),
			(this.tBt = 0),
			(this.iBt = void 0),
			(this.oBt = void 0),
			(this.j7e = () => {
				this.iBt && this.iBt(), this.DoClickCallBack();
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UITexture],
			[4, UE.UIText],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.j7e]]);
	}
	OnBeforeDestroy() {
		this.ClearBtnTimer(), (this.iBt = void 0);
	}
	ResetData() {
		this.oBt = void 0;
	}
	SetData(t) {
		this.oBt = t;
	}
	DoClickCallBack() {
		this.oBt?.GetButtonClickCallBack()?.();
	}
	DoTimerCallBack(t) {
		this.oBt?.GetButtonTimerCallBack()?.(t, this);
	}
	DoRefreshCallBack() {
		this.oBt?.GetButtonRefreshCallBack()?.(this);
	}
	SetBtnFunction(t) {
		this.iBt = t;
	}
	SetBtnCanClick(t) {
		var e = this.GetButton(0);
		e.GetSelfInteractive() !== t && e.SetSelfInteractive(t);
	}
	SetBtnText(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, e);
	}
	GetBtnText() {
		return this.GetText(1);
	}
	SetTipsItem(t, e) {
		(e =
			"×" +
			(
				e ??
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t)
			).toString()),
			this.GetText(4).SetText(e),
			this.SetItemIcon(this.GetTexture(3), t),
			this.GetItem(5).SetUIActive(!0);
	}
	SetTipsItemTextColor(t) {
		this.GetText(4).SetColor(t);
	}
	SetFloatText(t, ...e) {
		this.GetText(2).SetUIActive(!0),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), t, e);
	}
	GetBtnFloatText() {
		return this.GetText(2).SetUIActive(!0), this.GetText(2);
	}
	SetFloatTextWithTimer(t, e, i) {
		this.ClearBtnTimer(),
			e || this.SetBtnCanClick(e),
			(this.tBt = t),
			(this.IRe = TimerSystem_1.TimerSystem.Loop(
				() => {
					this.tBt <= 0
						? e
							? this.j7e()
							: this.SetBtnCanClick(!0)
						: LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), i, this.tBt--);
				},
				CommonDefine_1.MILLIONSECOND_PER_SECOND,
				t + 1,
			)),
			this.GetText(2).SetUIActive(!0);
	}
	ClearBtnTimer() {
		TimerSystem_1.TimerSystem.Has(this.IRe) &&
			TimerSystem_1.TimerSystem.Remove(this.IRe),
			(this.IRe = void 0);
	}
}
exports.CommonResultButton = CommonResultButton;
