"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatRowItem = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView");
class ChatRowItem extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments), (this.xnt = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIHorizontalLayout],
			[4, UE.UIText],
			[3, UE.UIText],
			[1, UE.UISprite],
			[2, UE.UISprite],
		];
	}
	Initialize(e) {
		super.Initialize(), (this.xnt = e);
		var t = this.GetText(4),
			i = this.GetSprite(1),
			o = this.GetSprite(2),
			a = this.GetText(3),
			r = ModelManager_1.ModelManager.FriendModel,
			l = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
			n = e.SenderPlayerId,
			T = e.TargetPlayerId,
			g = e.Content;
		let u;
		if (1 === e.ContentChatRoomType) {
			if (!T) return;
			if (!(r = r.GetFriendById(T))) return;
			(u = `<color=#e5d5a1>[${(u = r.PlayerName)}]</color>`),
				LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_FriendTag_Text"),
				i?.SetUIActive(!0),
				o?.SetUIActive(!1);
		} else
			(T =
				ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
					n,
				)?.PlayerNumber),
				(u = `<color=#aadcef>[${T}P][${(u = e.SenderPlayerName)}]</color>`),
				LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_TeamTag_Text"),
				i?.SetUIActive(!1),
				o?.SetUIActive(!0);
		if (
			(e.ContentType === Protocol_1.Aki.Protocol.U3n.nMs &&
				(1 === e.ContentChatRoomType
					? l === n
						? LguiUtil_1.LguiUtil.SetLocalTextNew(
								t,
								"Text_TalkToFriendWithOutTag_Text",
								u,
								g,
							)
						: LguiUtil_1.LguiUtil.SetLocalTextNew(
								t,
								"Text_FriendTalkToMeExpressionWithOutTag_Text",
								u,
								g,
							)
					: LguiUtil_1.LguiUtil.SetLocalTextNew(
							t,
							"Text_TeamTalkWithoutTag_Text",
							u,
							g,
						),
				t.SetUIActive(!0),
				(t.bBestFit = !1)),
			e.ContentType === Protocol_1.Aki.Protocol.U3n.Proto_Emoji)
		) {
			r = Number(e.Content);
			let i = "";
			if (
				(T = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(r))
			) {
				if (!(a = T.ExpressionTexturePath)) return;
				i = `<texture=${a},0.3/>`;
			}
			1 === e.ContentChatRoomType
				? l === n
					? LguiUtil_1.LguiUtil.SetLocalTextNew(
							t,
							"Text_TalkToFriendWithOutTag_Text",
							u,
							i,
						)
					: LguiUtil_1.LguiUtil.SetLocalTextNew(
							t,
							"Text_FriendTalkToMeExpressionWithOutTag_Text",
							u,
							i,
						)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(
						t,
						"Text_TeamTalkWithoutTag_Text",
						u,
						i,
					),
				t.SetUIActive(!0),
				this.GetHorizontalLayout(0)?.SetAlign(6);
		}
	}
	Reset() {
		super.Reset();
	}
	GetChatRowData() {
		return this.xnt;
	}
}
exports.ChatRowItem = ChatRowItem;
