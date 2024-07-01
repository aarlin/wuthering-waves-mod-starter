"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSelectResultView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	UiActorPool_1 = require("../../../Ui/UiActorPool"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	CommonSelectItem_1 = require("./CommonSelectItem"),
	PhantomSelectItem_1 = require("./PhantomSelectItem"),
	RogueSelectResultBaseView_1 = require("./RogueSelectResultBaseView");
class CommonSelectResultView extends RogueSelectResultBaseView_1.RogueSelectResultBaseView {
	constructor() {
		super(...arguments),
			(this.Xso = void 0),
			(this.$so = void 0),
			(this.Yso = void 0),
			(this.U9s = void 0),
			(this.R9s = void 0),
			(this.Jso = void 0),
			(this.zso = void 0),
			(this.OnDescModelChange = () => {
				this.Refresh();
			});
	}
	OnCloseBtnClick() {
		!this.Yso.GetRootItem().IsUIActiveInHierarchy() ||
		(this.Yso.GetRootItem().SetUIActive(!1),
		this.R9s.GetRootItem().SetUIActive(!1),
		this.Xso.GetNewUnlockAffixEntry().size <= 0)
			? this.CloseMe(this.Xso?.CallBack)
			: (this.zso.GetRootItem().SetUIActive(!0),
				this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_21_TEXT),
				this.Zso());
	}
	async OnBeforeStartAsync() {
		var e = this.GetHorizontalLayout(3).GetRootComponent();
		(e =
			((this.zso = new PhantomSelectItem_1.PhantomSelectItem()),
			await this.zso.CreateThenShowByResourceIdAsync(
				RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
				e,
			),
			(this.Yso = new CommonSelectItem_1.CommonSelectItem()),
			await this.Yso.CreateThenShowByResourceIdAsync(
				RoguelikeDefine_1.COMMON_SELECT_ITEM,
				e,
			),
			(this.R9s = new CommonSelectItem_1.CommonSelectItem()),
			await this.R9s.CreateThenShowByResourceIdAsync(
				RoguelikeDefine_1.COMMON_SELECT_ITEM,
				e,
			),
			(this.Xso = this.OpenParam),
			this.Xso.IsShowCommon && this.eao(),
			0 < this.Xso.GetNewUnlockAffixEntry().size && !this.Xso.IsShowCommon)) &&
			this.Zso(),
			this.Yso.SetActive(this.Xso.IsShowCommon),
			this.R9s.SetActive(
				void 0 !== this.Xso.ExtraRogueGainEntry && this.Xso.IsShowCommon,
			),
			this.zso.SetActive(e),
			this.zso.SetUnlockAttrSet(this.Xso.GetNewUnlockAffixEntry()),
			this.RefreshTitleText();
	}
	eao() {
		this.Xso.SelectRogueGainEntry &&
			(this.Yso.Update(this.Xso.SelectRogueGainEntry),
			this.Yso.SetToggleUnDetermined()),
			this.Xso.ExtraRogueGainEntry &&
				(this.R9s.Update(this.Xso.ExtraRogueGainEntry),
				this.R9s.SetToggleUnDetermined());
	}
	Zso() {
		this.zso.Update(this.Xso.NewRogueGainEntry),
			this.zso.SetToggleUnDetermined();
	}
	OnBeforeDestroy() {
		this.Yso?.Destroy(),
			this.$so &&
				UiActorPool_1.UiActorPool.RecycleAsync(
					this.$so,
					RoguelikeDefine_1.COMMON_SELECT_ITEM,
				),
			this.R9s?.Destroy(),
			this.U9s &&
				UiActorPool_1.UiActorPool.RecycleAsync(
					this.U9s,
					RoguelikeDefine_1.COMMON_SELECT_ITEM,
				),
			this.zso?.Destroy(),
			this.Jso &&
				UiActorPool_1.UiActorPool.RecycleAsync(
					this.Jso,
					RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
				);
	}
	Refresh() {
		this.Yso.RefreshPanel(),
			this.R9s.RefreshPanel(),
			this.zso.RefreshPanel(),
			this.RefreshTitleText();
	}
	RefreshTitleText() {
		let e;
		this.Xso.IsShowCommon
			? (e = RoguelikeDefine_1.ROGUELIKEVIEW_20_TEXT)
			: 0 < this.Xso.GetNewUnlockAffixEntry().size &&
				(e = RoguelikeDefine_1.ROGUELIKEVIEW_21_TEXT),
			this.GetText(4).ShowTextNew(e);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (1 !== e.length)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
					"configParams",
					e,
				]);
		else if ("Sub" === e[0] && ((e = this.zso?.GetSubItem()), e)) return [e, e];
	}
}
exports.CommonSelectResultView = CommonSelectResultView;
