"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookingIngredientsView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	CookController_1 = require("../CookController"),
	CookingIngredientsVerticalView_1 = require("../CookingIngredientsVerticalView");
class CookingIngredientsView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.dqt = void 0),
			(this.JNt = void 0),
			(this.nNt = () => {
				this.GetButton(3).IsSelfInteractive
					? 0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
						? (ModelManager_1.ModelManager.CookModel.CleanAddExp(),
							CookController_1.CookController.SendCookFoodRequest(
								this.dqt.ItemId,
								ModelManager_1.ModelManager.CookModel.CurrentCookRoleId,
								this.JNt.CurrentSetCount,
							))
						: CookController_1.CookController.SendFoodProcessRequest(
								this.dqt.ItemId,
								ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList(),
								this.JNt.CurrentSetCount,
							)
					: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"MaterialShort",
						);
			}),
			(this.zNt = () => {
				this.ZNt();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.nNt]]);
	}
	async OnBeforeStartAsync() {
		(this.JNt =
			new CookingIngredientsVerticalView_1.CookingIngredientsVerticalView()),
			await this.JNt.CreateByActorAsync(this.GetItem(4).GetOwner()),
			this.JNt.SetActive(!0);
	}
	OnStart() {
		(this.JNt.OnChangeMaterialSelectionDelegate = this.zNt),
			this.GetButton(3).SetCanClickWhenDisable(!0);
	}
	RefreshTips(e) {
		if (((this.dqt = e), this.dqt))
			switch ((this.eOt(), e.MainType)) {
				case 0:
					this.RefreshCooking();
					break;
				case 1:
					this.hNt();
			}
	}
	OnSecondTimerRefresh() {
		this.dqt && this.JNt?.OnSecondTimerRefresh();
	}
	RefreshTipsWithSavedData() {
		this.RefreshTips(this.dqt);
	}
	eOt() {
		this.C4e();
	}
	C4e() {
		var e;
		0 === this.dqt.MainType
			? ((e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
					this.dqt.ItemId,
				)),
				(e =
					ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.FoodItemId) ??
					""),
				this.GetText(0).SetText(e))
			: ((e = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
					this.dqt.ItemId,
				)),
				(e =
					ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.FinalItemId) ??
					""),
				this.GetText(0).SetText(e));
	}
	hNt() {
		var e = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
			this.dqt.ItemId,
		);
		e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
			e.FinalItemId,
		);
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", e),
			this.JNt.RefreshMachining(this.dqt),
			this.ZNt(),
			this.dqt.IsUnLock
				? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "CookButtonText")
				: LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "Research");
	}
	RefreshCooking() {
		var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
			this.dqt.ItemId,
		);
		e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
			e.FoodItemId,
		);
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", e),
			this.JNt.RefreshCooking(this.dqt),
			this.ZNt(),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "CookButtonText");
	}
	ZNt() {
		var e = this.dqt.IsUnLock;
		let t = !1,
			o = !0,
			i = !0;
		if (0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType) {
			var n = ModelManager_1.ModelManager.CookModel;
			(t = n.CheckMaterialEnough(this.dqt.ItemId)),
				(o = n.CheckCoinEnough(this.dqt.ItemId)),
				(i = n.CheckLimitCount(this.dqt.ItemId));
		} else {
			let e = !0;
			for (const t of ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList())
				t.m3n || (e = !1);
			t =
				ModelManager_1.ModelManager.CookModel.CheckCanProcessedNew(
					this.dqt.ItemId,
				) && e;
		}
		this.GetText(7).SetText(this.tOt(e, t, o, i)),
			this.GetItem(6).SetUIActive(!(t && i && e)),
			this.GetButton(3).RootUIComp.SetUIActive(t && i && e);
	}
	tOt(e, t, o, i) {
		return e
			? t
				? i
					? ""
					: void 0 ===
							(e = ModelManager_1.ModelManager.CookModel.GetRefreshLimitTime())
						? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								"LackMakeCountWithoutTime",
							)
						: StringUtils_1.StringUtils.Format(
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									"LackMakeCount",
								),
								e,
							)
				: ((t =
						MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							"LackMakeMaterial",
						)),
					o
						? StringUtils_1.StringUtils.Format(
								t,
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									"Material_Text",
								),
							)
						: StringUtils_1.StringUtils.Format(
								t,
								ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
									CookController_1.CookController.CookCoinId,
								),
							))
			: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"GenericPrompt_Unlocked_TipsText",
				);
	}
}
exports.CookingIngredientsView = CookingIngredientsView;
