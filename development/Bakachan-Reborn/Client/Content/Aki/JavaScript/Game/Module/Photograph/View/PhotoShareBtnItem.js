"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotoShareBtnItem = void 0);
const UE = require("ue"),
	SharePlatformById_1 = require("../../../../Core/Define/ConfigQuery/SharePlatformById"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	ConfigManager_1 = require("../../../Manager/ConfigManager");
class PhotoShareBtnItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.MWi = 0),
			(this.SWi = void 0),
			(this.cVe = 0),
			(this.wIt = void 0),
			(this.jyn = 1),
			(this.Fjt = () => {
				var t = TimeUtil_1.TimeUtil.GetServerTime();
				t - this.cVe < this.jyn
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"CannotShare",
						)
					: ((this.cVe = t),
						this.wIt?.(
							SharePlatformById_1.configSharePlatformById.GetConfig(this.MWi)
								.ShareId,
						));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UISprite]];
	}
	OnStart() {
		(this.jyn = ConfigManager_1.ConfigManager.CommonConfig.GetShareGap()
			? ConfigManager_1.ConfigManager.CommonConfig.GetShareGap()
			: 1),
			this.GetRootActor()
				.GetComponentByClass(UE.UIButtonComponent.StaticClass())
				.OnPointUpCallBack.Bind(this.Fjt),
			(this.SWi = this.GetSprite(0)
				.GetOwner()
				.GetComponentByClass(UE.UISpriteTransition.StaticClass()));
	}
	SetClickCallBack(t) {
		this.wIt = t;
	}
	Refresh(t, e, i) {
		this.Update(t), this.RefreshPanel();
	}
	Update(t) {
		this.MWi = t;
	}
	RefreshPanel() {
		var t = SharePlatformById_1.configSharePlatformById.GetConfig(this.MWi);
		t &&
			this.SetSpriteByPath(t.Icon, this.GetSprite(0), !1, void 0, (t) => {
				this.SWi?.SetAllTransitionSprite(this.GetSprite(0).GetSprite());
			});
	}
	OnBeforeDestroy() {
		this.SWi = void 0;
	}
}
exports.PhotoShareBtnItem = PhotoShareBtnItem;
