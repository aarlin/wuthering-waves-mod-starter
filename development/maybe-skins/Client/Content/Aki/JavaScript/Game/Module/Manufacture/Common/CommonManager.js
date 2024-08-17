"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardPopViewData = exports.CommonManager = void 0);
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData"),
	CookController_1 = require("../../Cook/CookController"),
	ComposeController_1 = require("../Compose/ComposeController"),
	ForgingController_1 = require("../Forging/ForgingController");
class CommonManager {
	static SetCurrentSystem(e) {
		CommonManager.Pyi = e;
	}
	static GetCurrentSystem() {
		return CommonManager.Pyi;
	}
	static CheckIsBuff(e, o) {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.CheckIsBuff(e, o);
			case 2:
				return ForgingController_1.ForgingController.CheckIsBuff(e, o);
			default:
				return !1;
		}
	}
	static GetInfoText(e) {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.GetComposeInfoText(e);
			case 2:
				return ForgingController_1.ForgingController.GetForgingInfoText(e);
			default:
				return "";
		}
	}
	static GetDefaultRoleText() {
		switch (CommonManager.Pyi) {
			case 1:
				return "DefaultComposeHelperText";
			case 2:
				return "DefaultForgingHelperText";
			default:
				return "DefaultHelperText";
		}
	}
	static GetCommonItemList() {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.GetComposeItemList();
			case 2:
				return ForgingController_1.ForgingController.GetForgingItemList();
		}
	}
	static GetCurrentFixId() {
		return CookController_1.CookController.GetCurrentFixId();
	}
	static CheckCanFix() {
		return CookController_1.CookController.CheckCanFix();
	}
	static SendFixToolRequest() {
		CookController_1.CookController.SendFixToolRequest(
			CookController_1.CookController.GetCurrentFixId(),
			CookController_1.CookController.GetCurrentEntityId(),
		);
	}
	static GetSelectedLevel() {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.GetSelectedComposeLevel();
	}
	static SetSelectedLevel(e) {
		1 === CommonManager.Pyi &&
			ComposeController_1.ComposeController.SetSelectedComposeLevel(e);
	}
	static GetCurrentRewardLevel() {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.GetRewardLevelInfo()
				.ComposeLevel;
	}
	static GetCurrentRewardTotalProficiency() {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.GetRewardLevelInfo()
				.TotalProficiency;
	}
	static GetCurrentRewardAddExp() {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.GetRewardLevelInfo().AddExp;
	}
	static GetComposeLevelByLevel(e) {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.GetComposeLevelByLevel(e);
	}
	static GetLevelUpgradeTypeTexture(e) {
		if (1 === CommonManager.Pyi) return "T_ComposeTypeLevel" + e;
	}
	static GetSumExpByLevel(e) {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.GetSumExpByLevel(e);
	}
	static GetDropIdByLevel(e) {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.GetDropIdByLevel(e);
	}
	static GetComposeMaxLevel() {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.GetComposeMaxLevel();
	}
	static SendLevelRewardRequest() {
		1 === CommonManager.Pyi &&
			ComposeController_1.ComposeController.SendSynthesisLevelRewardRequest();
	}
	static CheckIsBuffEx(e, o) {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.CheckIsBuffEx(e, o);
			case 2:
				return ForgingController_1.ForgingController.CheckIsBuffEx(e, o);
			default:
				return !1;
		}
	}
	static GetCommonManufactureText(e) {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.GetComposeText(e);
			case 2:
				return ForgingController_1.ForgingController.GetForgingText(e);
		}
	}
	static GetCommonManufactureId(e) {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.GetComposeId(e);
			case 2:
				return ForgingController_1.ForgingController.GetForgingId(e);
		}
	}
	static CheckShowRoleView() {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.CheckShowRoleView();
			case 2:
				return ForgingController_1.ForgingController.CheckShowRoleView();
		}
	}
	static GetMaxCreateCount(e) {
		return (
			1 !== CommonManager.Pyi
				? ForgingController_1.ForgingController
				: ComposeController_1.ComposeController
		).GetMaxCreateCount(e);
	}
	static CheckCanManufacture(e) {
		if (2 === CommonManager.Pyi)
			return ForgingController_1.ForgingController.CheckCanForging(e);
	}
	static SendManufacture(e, o) {
		switch (CommonManager.Pyi) {
			case 1:
				ComposeController_1.ComposeController.SendManufacture(e, o);
				break;
			case 2:
				ForgingController_1.ForgingController.SendManufacture(e, o);
		}
	}
	static GetCurrentRoleId() {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.GetCurrentRoleId();
			case 2:
				return ForgingController_1.ForgingController.GetCurrentRoleId();
		}
	}
	static SetCurrentRoleId(e) {
		switch (CommonManager.Pyi) {
			case 1:
				ComposeController_1.ComposeController.SetCurrentRoleId(e);
				break;
			case 2:
				ForgingController_1.ForgingController.SetCurrentRoleId(e);
		}
	}
	static GetManufactureRoleId(e) {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.GetComposeRoleId(e);
			case 2:
				return ForgingController_1.ForgingController.GetForgingRoleId(e);
		}
	}
	static GetManufactureMaterialList(e) {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.GetManufactureMaterialList(
					e,
				);
			case 2:
				return ForgingController_1.ForgingController.GetForgingMaterialList(e);
		}
	}
	static GetHelpRoleItemDataList(e) {
		switch (CommonManager.Pyi) {
			case 1:
				return ComposeController_1.ComposeController.GetHelpRoleItemDataList(e);
			case 2:
				return ForgingController_1.ForgingController.GetHelpRoleItemDataList(e);
		}
	}
	static CheckCanShowExpItem() {
		if (1 === CommonManager.Pyi)
			return ComposeController_1.ComposeController.CheckCanShowExpItem();
	}
	static CheckShowAmountItem() {
		switch (CommonManager.Pyi) {
			case 1:
				return !0;
			case 2:
				return !1;
		}
	}
}
exports.CommonManager = CommonManager;
class RewardPopViewData extends UiPopViewData_1.UiPopViewData {
	constructor() {
		super(...arguments), (this.RewardPopType = void 0);
	}
}
exports.RewardPopViewData = RewardPopViewData;
