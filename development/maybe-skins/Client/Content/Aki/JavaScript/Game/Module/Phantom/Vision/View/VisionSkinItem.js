"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionSkinItem = void 0);
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class VisionSkinItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
	constructor() {
		super(...arguments),
			(this.kHi = void 0),
			(this.A4e = void 0),
			(this.gIt = -1),
			(this.c2e = () => {
				this.kHi?.(this.gIt, this.GetItemGridExtendToggle()),
					this.SetNewFlagVisible(!1),
					ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
						this.gIt,
					),
					ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
						LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
					);
			}),
			(this.d4e = () => !this.A4e || this.A4e(this.gIt));
	}
	OnRefresh(e, t, i) {
		this.gIt = e;
		var a = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
				LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
				e,
			),
			o =
				!!ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
					e,
				).ParentMonsterId &&
				!ModelManager_1.ModelManager.PhantomBattleModel.GetSkinIsUnlock(e);
		0 !==
			(e =
				(this.Apply({
					Type: 3,
					Data: e,
					ItemConfigId: e,
					IsLockVisibleBlack: o,
					IsNewVisible: a,
					IsQualityHidden: !0,
				}),
				this.GetItemGridExtendToggle().ToggleState)) &&
			this.SetSelected(!1, !0);
	}
	OnStart() {
		this.BindOnExtendToggleStateChanged(this.c2e),
			this.GetItemGridExtendToggle()?.CanExecuteChange.Bind(this.d4e);
	}
	OnSelected(e) {
		1 !== this.GetItemGridExtendToggle().ToggleState &&
			this.SetSelected(!0, !0);
	}
	SetClickToggleEvent(e) {
		this.kHi = e;
	}
	BindCanToggleExecuteChange(e) {
		this.A4e = e;
	}
}
exports.VisionSkinItem = VisionSkinItem;
