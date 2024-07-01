"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonInputViewController = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	CdKeyInputController_1 = require("../../../CdKey/CdKeyInputController"),
	FriendController_1 = require("../../../Friend/FriendController"),
	PersonalController_1 = require("../../../Personal/Controller/PersonalController"),
	LguiUtil_1 = require("../../../Util/LguiUtil");
class CommonInputViewController extends UiControllerBase_1.UiControllerBase {
	static OpenSetRoleNameInputView() {
		var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
			n =
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"SetName",
				);
		n = {
			TitleTextArgs: new LguiUtil_1.TableTextArgNew(n),
			ConfirmFunc: PersonalController_1.PersonalController.RequestModifyName,
			InputText: e,
			DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"PrefabTextItem_3848209236_Text",
			),
			IsCheckNone: !0,
			NeedFunctionButton: !1,
		};
		UiManager_1.UiManager.OpenView("CommonSingleInputView", n);
	}
	static OpenSetPlayerRemarkNameInputView() {
		let e =
			ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()
				?.FriendRemark;
		StringUtils_1.StringUtils.IsEmpty(e) &&
			(e =
				ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()
					?.PlayerName);
		var n =
			ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
				"SetRemark",
			);
		n = {
			TitleTextArgs: new LguiUtil_1.TableTextArgNew(n),
			ConfirmFunc: async (e) =>
				FriendController_1.FriendController.RequestFriendRemarkChange(
					ModelManager_1.ModelManager.FriendModel.SelectedPlayerId,
					e,
				),
			InputText: e,
			DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"PrefabTextItem_3848209236_Text",
			),
			IsCheckNone: !1,
			NeedFunctionButton: !1,
		};
		UiManager_1.UiManager.OpenView("CommonSingleInputView", n);
	}
	static OpenPersonalSignInputView() {
		var e = ModelManager_1.ModelManager.PersonalModel.GetSignature(),
			n =
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"SetSign",
				);
		n = {
			TitleTextArgs: new LguiUtil_1.TableTextArgNew(n),
			ConfirmFunc:
				PersonalController_1.PersonalController.RequestModifySignature,
			DefaultText: ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"ComplianceWithTheLaw",
			),
			InputText: e,
			IsCheckNone: !1,
			NeedFunctionButton: !1,
		};
		UiManager_1.UiManager.OpenView("CommonMultiInputView", n);
	}
	static OpenCdKeyInputView() {
		var e = {
			TitleTextArgs: new LguiUtil_1.TableTextArgNew(
				"PrefabTextItem_CDKey_Title",
			),
			ConfirmFunc: CdKeyInputController_1.CdKeyInputController.RequestCdKey,
			DefaultText:
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"CDKey_InputEmpty",
				) ?? "",
			InputText: "",
			IsCheckNone: !0,
			NeedFunctionButton: !0,
		};
		UiManager_1.UiManager.OpenView("CdKeyInputView", e);
	}
}
exports.CommonInputViewController = CommonInputViewController;
