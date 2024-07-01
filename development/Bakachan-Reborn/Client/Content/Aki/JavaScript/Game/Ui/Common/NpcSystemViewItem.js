"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcSystemViewItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	HelpController_1 = require("../../Module/Help/HelpController"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiManager_1 = require("../UiManager"),
	CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase"),
	PopupCaptionItem_1 = require("./PopupCaptionItem");
class NpcSystemViewItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
	constructor() {
		super(...arguments),
			(this.nVt = void 0),
			(this.Mur = void 0),
			(this.YZe = () => {
				var t = this.Mur.HelpGroupId;
				HelpController_1.HelpController.OpenHelpById(t);
			}),
			(this.ACt = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Test", 8, "[CloseCookRootView]当点击关闭按钮时", [
						"viewName",
						this.ViewInfo.Name,
					]),
					UiManager_1.UiManager.CloseView(this.ViewInfo.Name);
			});
	}
	GetAttachParent() {
		return this.GetItem(4);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UITexture],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [[6, this.OnClickMaskButton]]);
	}
	OnStart() {
		this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(5));
		var t,
			e,
			i,
			o,
			s,
			r,
			l,
			n,
			S,
			a,
			p,
			u,
			h,
			T = this.ViewInfo.CommonPopBgKey,
			m =
				ConfigManager_1.ConfigManager.UiCommonConfig.GetNpcSystemBackgroundByViewName(
					T,
				);
		m
			? ((l = (this.Mur = m).Title),
				(t = m.TitleTexturePath),
				(e = m.TitleBgTexturePath),
				(i = m.TitleSymbolColor),
				(o = m.CaptionTitle),
				(s = m.CaptionTitleSpritePath),
				(r = m.CostItemList),
				(l = !StringUtils_1.StringUtils.IsEmpty(l)),
				(n = !StringUtils_1.StringUtils.IsEmpty(t)),
				(S = !StringUtils_1.StringUtils.IsEmpty(e)),
				(a = !StringUtils_1.StringUtils.IsEmpty(i)),
				(p = !StringUtils_1.StringUtils.IsEmpty(o)),
				(u = !StringUtils_1.StringUtils.IsEmpty(s)),
				(h = 0 < r?.length),
				this.SetTitleVisible(l),
				l && this.SetTitleText(m.Title),
				this.SetTitleTextureVisible(n),
				n && this.SetTitleTexture(t),
				this.SetTitleBackgroundTextureVisible(S),
				S && this.SetTitleBackgroundTexture(e),
				this.SetTitleSymbolVisible(a),
				a && this.SetTitleSymbolColor(i),
				this.SetCaptionTitleVisible(p),
				p && this.SetCaptionTitleText(o),
				this.SetCaptionTitleIconVisible(u),
				u && this.SetCaptionTitleSprite(s),
				this.SetCurrencyItemVisible(h),
				h && this.SetCostItemList(r),
				this.SetHelpButtonVisible(m.IsHelpButtonVisible),
				this.nVt.SetHelpCallBack(this.YZe),
				this.nVt.SetCloseCallBack(this.ACt))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Test",
					8,
					"u.Ui表现表中配置了通用背景面板(CommonPopBg)为5，但是t.通用背景-Npc系统界面通用背景中没有配置对应界面",
					["ViewName", T],
				);
	}
	OnBeforeDestroy() {
		(this.Mur = void 0), (this.nVt = void 0);
	}
	SetTitleVisible(t) {
		this.GetText(0).SetUIActive(t);
	}
	SetTitleText(t) {
		var e = this.GetText(0);
		LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
	}
	SetTitleTextureVisible(t) {
		this.GetTexture(2).SetUIActive(t);
	}
	SetTitleTexture(t) {
		const e = this.GetTexture(2);
		e.SetUIActive(!1),
			this.SetTextureByPath(t, e, void 0, () => {
				e.SetUIActive(!0);
			});
	}
	SetTitleBackgroundTextureVisible(t) {
		this.GetTexture(1).SetUIActive(t);
	}
	SetTitleBackgroundTexture(t) {
		const e = this.GetTexture(1);
		e.SetUIActive(!1),
			this.SetTextureByPath(t, e, void 0, () => {
				e.SetUIActive(!0);
			});
	}
	SetTitleSymbolVisible(t) {
		this.GetSprite(3).SetUIActive(t);
	}
	SetTitleSymbolColor(t) {
		this.GetSprite(3).SetColor(UE.Color.FromHex(t));
	}
	SetCaptionTitleText(t) {
		this.nVt.SetTitleLocalText(t);
	}
	SetCaptionTitleVisible(t) {
		this.nVt.SetTitleTextActive(t);
	}
	SetCurrencyItemVisible(t) {
		this.nVt.SetCurrencyItemVisible(t);
	}
	SetCaptionTitleSprite(t) {
		this.nVt.SetTitleIcon(t);
	}
	SetCaptionTitleIconVisible(t) {
		this.nVt.SetTitleIconVisible(t);
	}
	async SetCostItemList(t) {
		await this.nVt.SetCurrencyItemList(t);
	}
	SetHelpButtonVisible(t) {
		this.nVt.SetHelpBtnActive(t);
	}
	SetTexBgVisible(t) {
		this.GetItem(7).SetUIActive(t);
	}
}
exports.NpcSystemViewItem = NpcSystemViewItem;
