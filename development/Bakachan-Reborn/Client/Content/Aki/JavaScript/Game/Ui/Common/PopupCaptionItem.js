"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PopupCaptionItem = void 0);
const UE = require("ue"),
	CommonCurrencyItemListComponent_1 = require("../../Module/Common/CommonCurrencyItemListComponent"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiPanelBase_1 = require("../Base/UiPanelBase");
class PopupCaptionItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.dur = void 0),
			(this.OnClickCloseBtnCall = () => {}),
			(this.OnClickHelpBtnCall = () => {}),
			(this.Opt = () => {
				this.OnClickCloseBtnCall && this.OnClickCloseBtnCall();
			}),
			(this.Sur = () => {
				this.OnClickHelpBtnCall && this.OnClickHelpBtnCall();
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[3, this.Opt],
				[2, this.Sur],
			]);
	}
	SetCloseBtnActive(t) {
		this.GetButton(3).RootUIComp.SetUIActive(t);
	}
	SetHelpBtnActive(t) {
		this.GetButton(2).RootUIComp.SetUIActive(t);
	}
	SetCloseCallBack(t) {
		this.OnClickCloseBtnCall = t;
	}
	SetHelpCallBack(t) {
		this.OnClickHelpBtnCall = t;
	}
	SetCloseBtnRaycast(t) {
		this.GetButton(3).RootUIComp.SetRaycastTarget(t);
	}
	SetCloseBtnShowState(t) {
		this.GetButton(3).RootUIComp.SetUIActive(t);
	}
	SetTitle(t) {
		this.GetText(1).SetText(t);
	}
	SetTitleByTextIdAndArg(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, e);
	}
	SetTitleByTextIdAndArgNew(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, e);
	}
	SetTitleByTitleData(t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TextId, t.Args);
	}
	SetTitleLocalText(t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
	}
	SetTitleIcon(t) {
		this.SetSpriteByPath(t, this.GetSprite(0), !1);
	}
	SetTitleTextActive(t) {
		this.GetText(1).SetUIActive(t);
	}
	SetTitleIconVisible(t) {
		this.GetSprite(0).SetUIActive(t);
	}
	SetCurrencyItemVisible(t) {
		this.GetItem(4).SetUIActive(t);
	}
	async SetCurrencyItemList(t) {
		this.dur ||
			(this.dur =
				new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(
					this.GetItem(4),
				)),
			await this.dur.SetCurrencyItemList(t);
	}
	GetCurrencyItemList() {
		return this.dur?.GetCurrencyItemList();
	}
}
exports.PopupCaptionItem = PopupCaptionItem;
