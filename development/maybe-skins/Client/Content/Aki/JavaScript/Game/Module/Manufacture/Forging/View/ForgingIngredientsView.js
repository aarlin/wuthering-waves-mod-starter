"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgingIngredientsView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	CommonManager_1 = require("../../Common/CommonManager"),
	ForgingController_1 = require("../ForgingController"),
	ForgingIngredientsVerticalView_1 = require("./ForgingIngredientsVerticalView");
class ForgingIngredientsView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.STi = void 0),
			(this.JNt = void 0),
			(this.TIi = () => {
				this.RefreshTips(this.STi);
			}),
			(this.ETi = () => {
				this.JNt.RefreshHelpRole();
			}),
			(this.nNt = () => {
				this.GetButton(3).IsSelfInteractive
					? this.STi.IsUnlock
						? CommonManager_1.CommonManager.SendManufacture(
								this.STi.ItemId,
								this.JNt.GetManufactureCount(),
							)
						: ForgingController_1.ForgingController.SendForgeFormulaUnlockRequest(
								this.STi.ItemId,
							)
					: ForgingController_1.ForgingController.PlayForgingFailDisplay(() => {
							ForgingController_1.ForgingController.PlayForgingLoopDisplay();
						});
			}),
			(this._9e = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OpenHelpRole,
					this.STi.ItemId,
				);
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
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.CloseHelpRole,
			this.ETi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ForgingSuccess,
				this.TIi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ForgingFail,
				this.TIi,
			);
	}
	Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CloseHelpRole,
			this.ETi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ForgingSuccess,
				this.TIi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ForgingFail,
				this.TIi,
			);
	}
	async OnBeforeStartAsync() {
		(this.JNt =
			new ForgingIngredientsVerticalView_1.ForgingIngredientsVerticalView()),
			await this.JNt.CreateByActorAsync(this.GetItem(4).GetOwner()),
			this.JNt.SetActive(!0);
	}
	OnStart() {
		this.dde(),
			this.JNt.BindChangeClickCall(this._9e),
			this.GetButton(3).SetCanClickWhenDisable(!0);
	}
	OnBeforeDestroy() {
		this.Cde(), this.JNt.Destroy();
	}
	OnSecondTimerRefresh() {
		this.STi && this.JNt?.OnSecondTimerRefresh();
	}
	RefreshTips(e) {
		this.STi = e;
		e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
			e.ItemId,
		);
		var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
			e.ItemId,
		);
		this.GetText(0).ShowTextNew(t?.WeaponName ?? ""),
			(t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				e.ItemId,
			));
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", t),
			this.JNt.RefreshForging(this.STi),
			this.ZNt();
	}
	ZNt() {
		let e = !0;
		var t = ModelManager_1.ModelManager.ForgingModel,
			i = t.CheckUnlock(this.STi),
			n = t.CheckCoinEnough(this.STi.ItemId),
			o = t.CheckLimitCount(this.STi);
		let r = "";
		i
			? ((r =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponMaking")),
				(e = t.CheckMaterialEnough(this.STi.ItemId)),
				this.GetItem(2).SetUIActive(!0))
			: ((r =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("UnlockWeapon")),
				this.GetItem(2).SetUIActive(!1)),
			this.GetText(5).SetText(r),
			this.GetText(7).SetText(this.tOt(i, e, n, o)),
			this.GetItem(6).SetUIActive(!(i && e && o)),
			this.GetButton(3).RootUIComp.SetUIActive(i && e && o);
	}
	tOt(e, t, i, n) {
		return e
			? t
				? n
					? ""
					: void 0 ===
							(e =
								ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime())
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
					i
						? StringUtils_1.StringUtils.Format(
								t,
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									"Material_Text",
								),
							)
						: StringUtils_1.StringUtils.Format(
								t,
								ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
									ForgingController_1.ForgingController.ForgingCostId,
								),
							))
			: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"GenericPrompt_Unlocked_TipsText",
				);
	}
}
exports.ForgingIngredientsView = ForgingIngredientsView;
