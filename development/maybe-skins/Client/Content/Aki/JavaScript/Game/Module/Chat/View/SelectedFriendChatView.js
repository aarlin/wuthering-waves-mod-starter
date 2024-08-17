"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectedFriendChatView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	SelectedFriendItem_1 = require("./SelectedFriendItem");
class SelectedFriendChatView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.pEt = void 0),
			(this.z9e = () => {
				var e = new SelectedFriendItem_1.SelectedFriendItem();
				return e.BindOnClicked(this.vEt), e;
			}),
			(this.vEt = (e) => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Chat", 8, "选择玩家", ["playerId", e]),
					ModelManager_1.ModelManager.FriendModel.IsMyFriend(e)
						? (EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnSelectChatFriend,
								e,
							),
							UiManager_1.UiManager.CloseView("SelectedFriendChatView"))
						: (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"SelectChatNoFriendText",
							),
							this.bl());
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		var e = this.GetItem(1).GetOwner();
		(this.pEt = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(0),
			e,
			this.z9e,
		)),
			this.bl();
	}
	OnBeforeDestroy() {
		this.pEt = void 0;
	}
	bl() {
		var e = ModelManager_1.ModelManager.FriendModel,
			t = ModelManager_1.ModelManager.ChatModel,
			i = [];
		for (const r of e.GetFriendSortedListIds())
			t.IsInPrivateChatRoom(r) || e.HasBlockedPlayer(r) || i.push(r);
		this.pEt.ReloadData(i), this.GetItem(2).SetUIActive(i.length <= 0);
	}
}
exports.SelectedFriendChatView = SelectedFriendChatView;
