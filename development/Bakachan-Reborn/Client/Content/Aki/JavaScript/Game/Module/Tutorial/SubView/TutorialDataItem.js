"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialDataItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class TutorialDataItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.PDo = void 0),
			(this.xDo = void 0),
			(this.I6e = (t) => {
				1 === t && ((t = this.GetExtendToggle(2)), this.xDo(this.PDo, t));
			});
	}
	async Init(t) {
		await super.CreateByActorAsync(t.GetOwner(), void 0, !0);
	}
	ClearItem() {}
	GetUsingItem(t) {
		return (t.IsTypeTitle ? this.GetItem(0) : this.GetRootItem()).GetOwner();
	}
	Update(t, e) {
		(this.PDo = t).IsTypeTitle ? this.qPt() : this.wDo();
	}
	InitData(t) {
		this.PDo = t;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIExtendToggle],
			[3, UE.UIItem],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.I6e]]);
	}
	SetOnToggleSelected(t) {
		this.xDo = t;
	}
	qPt() {
		this.GetItem(0).SetUIActive(!0),
			this.GetExtendToggle(2).RootUIComp.SetUIActive(!1);
		var t = this.GetText(1);
		this.PDo.Text
			? t.SetText(this.PDo.Text)
			: LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.PDo.TextId);
	}
	wDo() {
		this.GetItem(0).SetUIActive(!1);
		var t = this.GetExtendToggle(2),
			e = (t.RootUIComp.SetUIActive(!0), this.GetText(4));
		this.PDo.Text
			? e.SetText(this.PDo.Text)
			: LguiUtil_1.LguiUtil.SetLocalTextNew(e, this.PDo.TextId),
			this.RefreshRed(),
			t.SetToggleState(0, !1),
			this.PDo.Selected && this.OnSelected(!0);
	}
	RefreshRed() {
		this.PDo.IsTypeTitle ||
			this.GetItem(3).SetUIActive(this.PDo.SavedData.HasRedDot);
	}
	OnSelected(t) {
		this.GetExtendToggle(2).SetToggleState(1, t), this.I6e(1);
	}
	OnBeforeDestroy() {
		this.PDo && (this.PDo = void 0);
	}
}
exports.TutorialDataItem = TutorialDataItem;
