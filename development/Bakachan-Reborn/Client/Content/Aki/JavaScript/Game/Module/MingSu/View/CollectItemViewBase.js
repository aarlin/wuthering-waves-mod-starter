"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CollectItemViewBase = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class CollectItemViewBase extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.PoolConfigId = 0),
			(this.CollectItemConfigId = 0),
			(this.CurrentShowLevel = 0),
			(this._Ar = () => {
				this.OnUpdateDragonPoolView();
			}),
			(this.uAr = () => {
				this.OnSubmitItemLevelUp();
			}),
			(this.kDn = () => {
				this.OnSubmitItemLevelMax();
			}),
			(this.YBn = () => {
				this.OnLevelMaxSequenceFinished();
			}),
			(this.Hwn = () => {
				this.OnLevelUpSequenceFinished();
			}),
			(this.FDn = () => {
				this.OnSubmitItemLevelUpSequencePlayFail();
			}),
			(this.qmi = (e, t) => {
				e === this.CollectItemConfigId && this.OnCollectItemCountChanged(t);
			}),
			(this.$Ge = (e) => {
				"CompositeRewardView" === e && this.OnCloseRewardView();
			});
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.MingSuModel;
		(this.PoolConfigId = e.GetCurrentDragonPoolId()),
			(this.CollectItemConfigId = e.GetCollectItemConfigId()),
			(this.CurrentShowLevel =
				e.GetTargetDragonPoolLevelById(this.PoolConfigId) + 1),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail,
				this.FDn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdateDragonPoolView,
				this._Ar,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
				this.YBn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
				this.Hwn,
			),
			(ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId =
				ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
			this.OnBegined();
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CloseView,
			this.$Ge,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail,
				this.FDn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdateDragonPoolView,
				this._Ar,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished,
				this.YBn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished,
				this.Hwn,
			),
			this.OnEnded();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSubmitItemLevelUp,
			this.uAr,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSubmitItemLevelMax,
				this.kDn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnCommonItemCountAnyChange,
				this.qmi,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSubmitItemLevelUp,
			this.uAr,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSubmitItemLevelMax,
				this.kDn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnCommonItemCountAnyChange,
				this.qmi,
			);
	}
	OnBegined() {}
	OnEnded() {}
	OnUpdateDragonPoolView() {}
	OnSubmitItemLevelUp() {}
	OnSubmitItemLevelMax() {}
	OnLevelMaxSequenceFinished() {}
	OnLevelUpSequenceFinished() {}
	OnSubmitItemLevelUpSequencePlayFail() {}
	OnCloseRewardView() {}
	OnCollectItemCountChanged(e) {}
}
exports.CollectItemViewBase = CollectItemViewBase;
