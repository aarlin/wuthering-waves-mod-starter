"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeIngredientsView = void 0);
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
	ComposeController_1 = require("../ComposeController"),
	ComposeIngerdientsVerticalView_1 = require("./ComposeIngerdientsVerticalView");
class ComposeIngredientsView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.yIi = void 0),
			(this.JNt = void 0),
			(this.nNt = () => {
				this.GetButton(3).IsSelfInteractive
					? CommonManager_1.CommonManager.SendManufacture(
							this.yIi.ItemId,
							this.JNt.GetManufactureCount(),
						)
					: ComposeController_1.ComposeController.PlayCompositeFailDisplay(
							() => {
								ComposeController_1.ComposeController.PlayCompositeLoopDisplay();
							},
						);
			}),
			(this._9e = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OpenHelpRole,
					this.yIi.ItemId,
				);
			}),
			(this.IIi = () => {
				1 === this.yIi.MainType
					? this.JNt.RefreshProficiencyAndHelpRole(this.yIi)
					: this.JNt.RefreshHelpRole();
			}),
			(this.TIi = () => {
				this.RefreshTips(this.yIi);
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
			new ComposeIngerdientsVerticalView_1.ComposeIngredientsVerticalView()),
			await this.JNt.CreateByActorAsync(this.GetItem(4).GetOwner()),
			this.JNt.SetActive(!0);
	}
	OnStart() {
		this.JNt.BindChangeClickCall(this._9e),
			this.dde(),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ComposeButtonText"),
			this.GetButton(3).SetCanClickWhenDisable(!0);
	}
	OnBeforeDestroy() {
		this.JNt.Destroy(), this.Cde();
	}
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.CloseHelpRole,
			this.IIi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpgradeComposeLevel,
				this.IIi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComposeSuccess,
				this.TIi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ComposeFail,
				this.TIi,
			);
	}
	Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CloseHelpRole,
			this.IIi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpgradeComposeLevel,
				this.IIi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComposeSuccess,
				this.TIi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ComposeFail,
				this.TIi,
			);
	}
	OnSecondTimerRefresh() {
		this.yIi && this.JNt?.OnSecondTimerRefresh();
	}
	RefreshTips(e) {
		this.yIi = e;
		e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
			e.ItemId,
		);
		var t = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId);
		this.GetText(0).SetText(t),
			(t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
				e.ItemId,
			));
		switch (
			(LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "Have", t),
			this.ZNt(),
			this.yIi.MainType)
		) {
			case 1:
				this.LIi();
				break;
			case 2:
				this.DIi();
				break;
			case 3:
				this.RIi();
		}
	}
	ZNt() {
		var e = (n =
				ModelManager_1.ModelManager.ComposeModel).CheckComposeMaterialEnough(
				this.yIi.ItemId,
			),
			t = n.CheckUnlock(this.yIi),
			i = n.CheckCoinEnough(this.yIi.ItemId),
			n = n.CheckLimitCount(this.yIi);
		this.GetText(7).SetText(this.tOt(t, e, i, n)),
			this.GetItem(6).SetUIActive(!(t && e && n)),
			this.GetButton(3).RootUIComp.SetUIActive(t && e && n);
	}
	tOt(e, t, i, n) {
		return e
			? t
				? n
					? ""
					: void 0 ===
							(e =
								ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime())
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
									ComposeController_1.ComposeController.ComposeCoinId,
								),
							))
			: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"GenericPrompt_Unlocked_TipsText",
				);
	}
	LIi() {
		this.JNt.RefreshReagentProduction(this.yIi);
	}
	DIi() {
		this.JNt.RefreshStructure(this.yIi);
	}
	RIi() {
		this.JNt.RefreshPurification(this.yIi);
	}
}
exports.ComposeIngredientsView = ComposeIngredientsView;
