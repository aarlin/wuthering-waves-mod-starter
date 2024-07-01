"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatOption = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	FriendController_1 = require("../../Friend/FriendController"),
	ReportController_1 = require("../../Report/ReportController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ChatController_1 = require("../ChatController");
class ChatOption extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.j8 = void 0),
			(this.sSt = void 0),
			(this.aSt = void 0),
			(this.hSt = (e) => {
				e === this.j8 && this.lSt();
			}),
			(this._St = () => {
				ModelManager_1.ModelManager.ChatModel.IsInMute(this.j8)
					? ChatController_1.ChatController.ChatMutePlayerRequest(this.j8, !1)
					: ChatController_1.ChatController.ChatMutePlayerRequest(this.j8, !0),
					UiManager_1.UiManager.CloseView("ChatOption");
			}),
			(this.uSt = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(57);
				e.SetTextArgs(this.sSt.PlayerName),
					e.FunctionMap.set(2, () => {
						FriendController_1.FriendController.RequestBlockPlayer(this.j8),
							UiManager_1.UiManager.CloseView("ChatOption");
					}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}),
			(this.cSt = () => {
				UiManager_1.UiManager.CloseView("ChatOption");
				var e = ModelManager_1.ModelManager.FriendModel.GetFriendById(this.j8);
				ReportController_1.ReportController.OpenReportView(e, 1);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[3, this.uSt],
				[4, this.cSt],
			]);
	}
	OnStart() {
		var e;
		this.GetButton(1)?.RootUIComp.SetUIActive(!1),
			(this.aSt = new ChatOptionButton(this.GetItem(2))),
			this.aSt.SetClickCallBack(this._St),
			(this.j8 = this.OpenParam),
			(this.sSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(
				this.j8,
			)),
			this.sSt &&
				((e = this.GetText(0)),
				LguiUtil_1.LguiUtil.SetLocalText(e, "OptionTitle", this.sSt.PlayerName),
				this.lSt());
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAddMutePlayer,
			this.hSt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				this.hSt,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAddMutePlayer,
			this.hSt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				this.hSt,
			);
	}
	OnBeforeDestroy() {
		(this.j8 = void 0), (this.sSt = void 0);
	}
	lSt() {
		var e;
		ModelManager_1.ModelManager.ChatModel.IsInMute(this.j8)
			? ((e =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"CancelMuteText",
					)),
				(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
				this.aSt.RefreshButtonText(e))
			: ((e =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"MuteText",
					)),
				(e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
				this.aSt.RefreshButtonText(e));
	}
}
exports.ChatOption = ChatOption;
class ChatOptionButton extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Kpt = void 0),
			(this.nqe = () => {
				this.Kpt && this.Kpt();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.nqe]]);
	}
	RefreshButtonText(e) {
		this.GetText(1).SetText(e);
	}
	SetClickCallBack(e) {
		this.Kpt = e;
	}
}
