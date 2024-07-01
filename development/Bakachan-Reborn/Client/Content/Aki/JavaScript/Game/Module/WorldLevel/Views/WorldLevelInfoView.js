"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldLevelInfoView = void 0);
const UE = require("ue"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	ShopUtils_1 = require("../../Shop/ShopUtils");
class WorldLevelInfoView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.iko = !1),
			(this.oko = void 0),
			(this.rko = void 0),
			(this.nko = () => {
				ModelManager_1.ModelManager.GameModeModel.IsMulti
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"OnlineCantChangeLevel",
						)
					: (UiManager_1.UiManager.CloseView("WorldLevelInfoView"),
						UiManager_1.UiManager.IsViewShow("WorldLevelChangeConfirmView") ||
							UiManager_1.UiManager.OpenView("WorldLevelChangeConfirmView"));
			});
	}
	get CanShowInteractCd() {
		return this.iko;
	}
	set CanShowInteractCd(e) {
		this.iko !== e &&
			((this.iko = e),
			this.GetItem(8).SetUIActive(
				!this.iko &&
					ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel >=
						this.oko,
			),
			this.GetItem(4).SetUIActive(this.iko));
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[5, this.nko]]);
	}
	OnStart() {
		(this.rko = ConfigManager_1.ConfigManager.WorldLevelConfig.GetCommonValue(
			"world_level_change_cd",
		)),
			(this.oko = ConfigManager_1.ConfigManager.WorldLevelConfig.GetCommonValue(
				"world_level_change_conditon_level",
			)),
			this.GetItem(3).SetUIActive(!0),
			this.GetItem(8).SetUIActive(!0),
			this.LBt(),
			this.tko(),
			this.sko();
	}
	OnTick(e) {
		this.ako();
	}
	LBt() {
		this.GetText(0).SetText(
			ModelManager_1.ModelManager.WorldLevelModel.WorldLevelMultilingualText,
		);
	}
	tko() {
		var e =
			ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevelIntro");
		this.GetText(2).SetText(e);
	}
	sko() {
		var e = this.hko();
		e = 0 < Math.max(this.rko - e, 0);
		ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel < this.oko || e
			? this.GetItem(8).SetUIActive(!1)
			: this.ako();
	}
	ako() {
		var e = this.hko();
		e = Math.max(this.rko - e, 0);
		if (((this.CanShowInteractCd = 0 < e), this.CanShowInteractCd))
			this.GetText(6).SetText(ShopUtils_1.ShopUtils.FormatTime(e));
		else {
			e = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
			var o = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
			let t = "";
			e === o
				? ((ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget =
						e - 1),
					(t =
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							"WorldLevelDown",
						)))
				: e < o &&
					((ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget =
						e + 1),
					(t =
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							"WorldLevelRestore",
						))),
				this.GetText(7).SetText(t);
		}
	}
	hko() {
		return (
			TimeUtil_1.TimeUtil.GetServerTime() -
			ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp
		);
	}
}
exports.WorldLevelInfoView = WorldLevelInfoView;
