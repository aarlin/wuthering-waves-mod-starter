"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LordGymItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class LordGymItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.sEi = -1),
			(this.X3e = void 0),
			(this.aEi = void 0),
			(this.hEi = void 0),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.lEi = () => {
				this.X3e && this.X3e(this.sEi);
			}),
			(this.T7e = () => !this.aEi || this.aEi(this.sEi)),
			(this.X3e = e),
			(this.aEi = t);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UISprite],
			[3, UE.UIItem],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.lEi]]);
	}
	OnStart() {
		(this.hEi = this.GetExtendToggle(0)),
			this.hEi.CanExecuteChange.Bind(this.T7e);
	}
	OnBeforeDestroy() {
		(this.X3e = void 0), (this.sEi = -1);
	}
	Refresh(e, t, i) {
		this.RefreshByLordId(e), this.hEi.SetToggleState(t ? 1 : 0, !1);
	}
	Clear() {}
	OnSelected(e) {
		this.hEi.SetToggleState(1, e);
	}
	OnDeselected(e) {
		this.hEi.SetToggleState(0, e);
	}
	GetKey(e, t) {
		return this.sEi;
	}
	RefreshByLordId(e) {
		(this.sEi = e),
			this.GetItem(3).SetUIActive(
				!ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(
					this.sEi,
				) ||
					!ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(this.sEi),
			),
			(e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(
				this.sEi,
			)),
			this.GetItem(4).SetUIActive(
				!ModelManager_1.ModelManager.ExchangeRewardModel.GetRewardIfCanExchange(
					e.RewardId,
				),
			),
			this.SetSpriteByPath(e.IconPath, this.GetSprite(2), !1),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.GymTitle);
	}
}
exports.LordGymItem = LordGymItem;
