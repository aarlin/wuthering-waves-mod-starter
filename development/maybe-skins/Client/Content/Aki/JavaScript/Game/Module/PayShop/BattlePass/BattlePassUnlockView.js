"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassUnlockView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	BattlePassController_1 = require("./BattlePassController");
class BattlePassUnlockView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Fki = void 0),
			(this.ZNi = []),
			(this.sOi = () => {
				this.CloseMe();
			}),
			(this.rOe = () =>
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			(this.Vki = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIHorizontalLayout],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
		]),
			(this.BtnBindInfo = [[4, this.Vki]]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattlePassMainViewHide,
			this.sOi,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattlePassMainViewHide,
			this.sOi,
		);
	}
	OnStart() {
		var e = this.OpenParam,
			t =
				((this.ZNi = []),
				ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlockReward(
					e,
					this.ZNi,
				),
				(this.Fki = new GenericLayout_1.GenericLayout(
					this.GetHorizontalLayout(0),
					this.rOe,
				)),
				this.Fki.RefreshByData(this.ZNi),
				ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlock(e));
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.UnlockTitle),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.UnlockText),
			this.GetItem(2).SetUIActive(1 === e),
			this.GetItem(3).SetUIActive(1 !== e);
	}
	OnBeforeDestroy() {
		(this.ZNi.length = 0),
			(this.ZNi = void 0),
			(this.Fki = void 0),
			1 === this.OpenParam
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.BattlePassFirstUnlockAnime,
					)
				: BattlePassController_1.BattlePassController.PopHighUnlockReward();
	}
}
exports.BattlePassUnlockView = BattlePassUnlockView;
