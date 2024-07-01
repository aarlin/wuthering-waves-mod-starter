"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalOptionController = void 0);
const UE = require("ue"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ChatController_1 = require("../../Chat/ChatController"),
	CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	FriendController_1 = require("../../Friend/FriendController"),
	ReportController_1 = require("../../Report/ReportController"),
	PersonalDefine_1 = require("./PersonalDefine");
class PersonalOptionController extends UiControllerBase_1.UiControllerBase {
	static InitOptionMap() {
		this.M4i.set(1, this.S4i),
			this.M4i.set(2, this.S4i),
			this.M4i.set(3, this.E4i),
			this.M4i.set(4, this.E7e),
			this.M4i.set(5, this.y4i),
			this.M4i.set(11, this.z9t),
			this.M4i.set(6, this.I4i),
			this.M4i.set(7, this.T4i),
			this.M4i.set(8, this.W0),
			this.M4i.set(9, this.L4i),
			this.M4i.set(10, this.D4i),
			this.M4i.set(12, this.R4i),
			this.M4i.set(13, this.U4i);
	}
	static GetOptionFunc(e) {
		return 0 === this.M4i.size && this.InitOptionMap(), this.M4i.get(e);
	}
	static A4i() {
		var e = new PersonalDefine_1.PersonalInfoData(),
			r =
				ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
		return (
			r
				? ((e.RoleShowList = r.RoleShowList),
					(e.CardShowList = r.CardShowList),
					(e.CurCardId = r.CurCard),
					(e.Birthday = r.Birthday),
					(e.IsBirthdayDisplay = r.IsBirthdayDisplay),
					(e.CardUnlockList = r.CardUnlockList),
					(e.Signature = r.Signature),
					(e.HeadPhotoId = r.PlayerHeadPhoto),
					(e.IsOtherData = !0),
					(e.Name = r.PlayerName),
					(e.PlayerId = r.PlayerId),
					(e.Level = r.PlayerLevel),
					(e.WorldLevel = r.WorldLevel))
				: ((r =
						ModelManager_1.ModelManager.OnlineModel.CachePlayerData
							.PlayerDetails),
					(e.RoleShowList = r.Ygs),
					(e.CardShowList = r.Jgs),
					(e.CurCardId = r.zgs ?? void 0),
					(e.Birthday = r._5n ?? 0),
					(e.IsBirthdayDisplay = r.Zgs ?? !1),
					(e.CardUnlockList =
						ModelManager_1.ModelManager.OnlineModel.CachePlayerData.CardUnlockList),
					(e.Signature = r.l5n ?? ""),
					(e.HeadPhotoId = r.$gs ?? void 0),
					(e.IsOtherData = !0),
					(e.Name = r.e4n ?? ""),
					(e.PlayerId = r.aFn ?? 0),
					(e.Level = r.r3n ?? 0),
					(e.WorldLevel = r.Vgs ?? 0)),
			e
		);
	}
}
((exports.PersonalOptionController = PersonalOptionController).M4i = new Map()),
	(PersonalOptionController.S4i = () => {
		var e = (
			UiManager_1.UiManager.IsViewOpen("OnlineProcessView")
				? ModelManager_1.ModelManager.OnlineModel
				: ModelManager_1.ModelManager.FriendModel
		).CachePlayerData;
		ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId)
			? ChatController_1.ChatController.ChatMutePlayerRequest(e.PlayerId, !1)
			: ChatController_1.ChatController.ChatMutePlayerRequest(e.PlayerId, !0);
	}),
	(PersonalOptionController.y4i = () => {
		var e = (
			UiManager_1.UiManager.IsViewOpen("OnlineProcessView")
				? ModelManager_1.ModelManager.OnlineModel
				: ModelManager_1.ModelManager.FriendModel
		).CachePlayerData;
		ReportController_1.ReportController.OpenReportView(e, 2);
	}),
	(PersonalOptionController.E7e = () => {
		var e = ModelManager_1.ModelManager.FriendModel;
		const r = (
			UiManager_1.UiManager.IsViewOpen("OnlineProcessView")
				? ModelManager_1.ModelManager.OnlineModel
				: e
		).CachePlayerData;
		e.HasFriend(r.PlayerId) ||
			(ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"NotOnFriendList",
			),
			UiManager_1.UiManager.CloseView("FriendProcessView")),
			(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(56)).SetTextArgs(
				r.PlayerName,
			),
			e.FunctionMap.set(2, () => {
				FriendController_1.FriendController.RequestFriendDelete(r.PlayerId);
			}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				e,
			);
	}),
	(PersonalOptionController.E4i = () => {
		const e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
		var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(57);
		r.SetTextArgs(e.PlayerName),
			r.FunctionMap.set(2, () => {
				FriendController_1.FriendController.RequestBlockPlayer(e.PlayerId);
			}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				r,
			);
	}),
	(PersonalOptionController.z9t = () => {
		ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
			"CopiedMyUid",
		),
			UE.LGUIBPLibrary.ClipBoardCopy(
				ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(),
			);
	}),
	(PersonalOptionController.I4i = () => {
		UiManager_1.UiManager.OpenView("PersonalEditView", 0);
	}),
	(PersonalOptionController.T4i = () => {
		UiManager_1.UiManager.OpenView("PersonalEditView", 1);
	}),
	(PersonalOptionController.W0 = () => {
		CommonInputViewController_1.CommonInputViewController.OpenSetRoleNameInputView();
	}),
	(PersonalOptionController.L4i = () => {
		CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView();
	}),
	(PersonalOptionController.D4i = () => {
		UiManager_1.UiManager.OpenView("PersonalBirthView");
	}),
	(PersonalOptionController.R4i = () => {
		const e = PersonalOptionController.A4i();
		UiManager_1.UiManager.IsViewOpen("FriendProcessView")
			? UiManager_1.UiManager.CloseViewAsync("FriendProcessView").then(
					() => {
						UiManager_1.UiManager.OpenView("PersonalRootView", e);
					},
					() => {},
				)
			: UiManager_1.UiManager.IsViewOpen("OnlineProcessView")
				? UiManager_1.UiManager.CloseViewAsync("OnlineProcessView").then(
						() => {
							UiManager_1.UiManager.OpenView("PersonalRootView", e);
						},
						() => {},
					)
				: UiManager_1.UiManager.OpenView("PersonalRootView", e);
	}),
	(PersonalOptionController.U4i = () => {
		CommonInputViewController_1.CommonInputViewController.OpenSetPlayerRemarkNameInputView();
	});
