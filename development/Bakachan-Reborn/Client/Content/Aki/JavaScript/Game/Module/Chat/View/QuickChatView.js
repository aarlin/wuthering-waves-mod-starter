"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuickChatView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ChatController_1 = require("../ChatController"),
	PrivateChatRoom_1 = require("../PrivateChatRoom"),
	TeamChatRoom_1 = require("../TeamChatRoom"),
	WorldTeamChatRoom_1 = require("../WorldTeamChatRoom"),
	QuickChatText_1 = require("./QuickChatText");
class QuickChatView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.ChatInputMaxNum = 0),
			(this.mEt = []),
			(this.dEt = (e) => {
				var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
				if (t) {
					if (
						t instanceof PrivateChatRoom_1.PrivateChatRoom &&
						!(t = t.GetTargetPlayerId())
					)
						return void (
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn("Chat", 5, "私聊对象玩家Id不存在", [
								"targetPlayerId",
								t,
							])
						);
					this.ISt(e, Protocol_1.Aki.Protocol.U3n.nMs), this.CloseMe();
				} else
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Chat", 5, "当前没有加入任何一个聊天室");
			}),
			(this.CEt = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.CEt]]);
	}
	OnStart() {
		(this.ChatInputMaxNum =
			CommonParamById_1.configCommonParamById.GetIntConfig("chat_character")),
			this.GetButton(1)?.RootUIComp.SetUIActive(!0),
			this.gEt();
	}
	gEt() {
		var e =
			ConfigManager_1.ConfigManager.ChatConfig.GetAllQuickChatConfigList();
		if (e) {
			var t = this.GetItem(3),
				o = this.GetItem(2),
				r = t.GetOwner();
			for (const t of e) {
				var i = LguiUtil_1.LguiUtil.DuplicateActor(r, o),
					a =
						((i = new QuickChatText_1.QuickChatText(i)),
						MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							t.QuickChatContent,
						));
				i.Refresh(a),
					i.BindOnClicked(this.dEt),
					i.SetActive(!0),
					this.mEt.push(i);
			}
			t.SetUIActive(!1);
		}
	}
	ISt(e, t) {
		var o, r;
		StringUtils_1.StringUtils.IsEmpty(e)
			? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"InputChatContent",
				)
			: e.length > this.ChatInputMaxNum
				? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"ReachInputMaxNum",
						this.ChatInputMaxNum,
					)
				: (o = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom())
					? ((r = o.GetLastTimeStamp()),
						TimeUtil_1.TimeUtil.GetServerTime() - r <
						o.ChatCd / TimeUtil_1.TimeUtil.InverseMillisecond
							? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
									"ChatCdText",
								)
							: o instanceof PrivateChatRoom_1.PrivateChatRoom
								? (r = o.GetTargetPlayerId())
									? ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(r)
										? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
												"ChatRefuseText",
											)
										: ChatController_1.ChatController.PrivateChatRequest(
												t,
												e,
												r,
											)
									: Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn("Chat", 8, "私聊对象玩家Id不存在", [
											"targetPlayerId",
											r,
										])
								: o instanceof TeamChatRoom_1.TeamChatRoom
									? ChatController_1.ChatController.ChannelChatRequest(
											t,
											e,
											Protocol_1.Aki.Protocol.kGs.Proto_MatchTeam,
										)
									: o instanceof WorldTeamChatRoom_1.WorldChatRoom &&
										ChatController_1.ChatController.ChannelChatRequest(
											t,
											e,
											Protocol_1.Aki.Protocol.kGs.Proto_WorldTeam,
										))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Chat", 8, "当前没有加入任何一个聊天室");
	}
	OnBeforeDestroy() {
		this.fEt();
	}
	fEt() {
		for (const e of this.mEt) e.Destroy();
	}
}
exports.QuickChatView = QuickChatView;
