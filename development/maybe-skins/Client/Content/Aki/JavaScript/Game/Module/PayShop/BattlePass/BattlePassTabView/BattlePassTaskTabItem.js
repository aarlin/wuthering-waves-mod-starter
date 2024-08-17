"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassTaskTabItem = void 0);
const UE = require("ue"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class BattlePassTaskTabItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.QFe = ""),
			(this.SelectedCallBack = void 0),
			(this.OnCanExecuteChange = void 0),
			(this.T7e = () => this.OnCanExecuteChange?.(this.GridIndex) ?? !0),
			(this.x4e = (e) => {
				1 === e && this.SelectedCallBack?.(this.GridIndex);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIText],
			[0, UE.UIText],
			[2, UE.UIExtendToggle],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.x4e]]);
	}
	OnStart() {
		this.GetExtendToggle(2).CanExecuteChange.Bind(this.T7e);
	}
	SetForceSwitch(e, t = !1) {
		this.GetExtendToggle(2).SetToggleState(e, t),
			this.GetExtendToggle(2).SetSelfInteractive(0 === e);
	}
	SetSelectedCallBack(e) {
		this.SelectedCallBack = e;
	}
	SetCanExecuteChange(e) {
		this.OnCanExecuteChange = e;
	}
	Refresh(e, t, i) {
		this.UpdateView(e);
	}
	GetKey(e, t) {
		return e;
	}
	Clear() {
		this.UnBindRedDot();
	}
	OnSelected() {}
	OnDeselected() {}
	UpdateView(e) {
		var t = this.GetText(0),
			i = ModelManager_1.ModelManager.BattlePassModel;
		let a = i.GetBattlePassEndTime();
		switch (e) {
			case 0:
				(this.QFe = "BattlePassAlwaysTaskTab"),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						t,
						"Text_BattlePassAwalsTask_Text",
					);
				break;
			case 1:
				(a = Math.min(a, i.GetDayEndTime())),
					LguiUtil_1.LguiUtil.SetLocalText(t, "BattlePassDayTask"),
					(this.QFe = "BattlePassDayTaskTab");
				break;
			case 2:
				(a = Math.min(a, i.GetWeekEndTime())),
					LguiUtil_1.LguiUtil.SetLocalText(t, "BattlePassWeekTask"),
					(this.QFe = "BattlePassWeekTaskTab");
		}
		e = this.GetText(1);
		var s = TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(a, !0),
			l = Math.floor(s / TimeUtil_1.TimeUtil.OneDayHourCount);
		s = Math.floor(s - l * TimeUtil_1.TimeUtil.OneDayHourCount);
		0 < l
			? LguiUtil_1.LguiUtil.SetLocalTextNew(
					e,
					"Text_BattlePassRefreshTime1_Text",
					l,
					s,
				)
			: 0 < s
				? LguiUtil_1.LguiUtil.SetLocalTextNew(
						e,
						"Text_BattlePassRefreshTime2_Text",
						s,
					)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(
						e,
						"Text_BattlePassRefreshTime3_Text",
					),
			this.x6e();
	}
	x6e() {
		this.QFe &&
			RedDotController_1.RedDotController.BindRedDot(
				this.QFe,
				this.GetItem(3),
				void 0,
				0,
			);
	}
	UnBindRedDot() {
		this.QFe &&
			(RedDotController_1.RedDotController.UnBindRedDot(this.QFe),
			(this.QFe = void 0));
	}
}
exports.BattlePassTaskTabItem = BattlePassTaskTabItem;
