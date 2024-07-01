"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TopPanel = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeController_1 = require("../RoguelikeController");
class TopPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.nVt = void 0),
			(this.CloseCallback = void 0),
			(this.Xno = () => {
				this.CloseCallback?.();
			}),
			(this.Gho = (e) => {
				ModelManager_1.ModelManager.RoguelikeModel.UpdateDescModel(1 === e);
			}),
			(this.Nho = () => {
				RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIExtendToggle],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[1, this.Xno],
				[2, this.Gho],
				[4, this.Nho],
			]);
	}
	OnStart() {
		(this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.nVt.SetCloseBtnActive(!1),
			this.nVt.SetHelpBtnActive(!1);
	}
	OnBeforeShow() {
		this.RefreshTabBtn();
	}
	RefreshTabBtn() {
		var e =
			0 === ModelManager_1.ModelManager.RoguelikeModel.GetDescModel() ? 1 : 0;
		this.GetExtendToggle(2)?.SetToggleState(e, !0);
	}
	OnBeforeDestroy() {
		this.CloseCallback = void 0;
	}
	RefreshTitle(e) {
		this.nVt.SetTitleByTextIdAndArgNew(e);
	}
	async RefreshCurrency(e) {
		return this.nVt.SetCurrencyItemList(e);
	}
	RefreshSelectTipsText(e, t = !1, ...o) {
		t
			? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e, ...o)
			: LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e, ...o);
	}
	EmptySelectTipsText() {
		this.GetText(5).SetText("");
	}
	GetCostItemByIndex(e) {
		var t = this.nVt?.GetCurrencyItemList();
		if (t && t.length > e) return t[e].GetRootItem();
	}
}
exports.TopPanel = TopPanel;
