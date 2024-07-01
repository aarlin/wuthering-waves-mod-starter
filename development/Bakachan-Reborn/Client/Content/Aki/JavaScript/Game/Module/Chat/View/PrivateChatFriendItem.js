"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatRoomItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PrivateChatRoom_1 = require("../PrivateChatRoom"),
	TeamChatRoom_1 = require("../TeamChatRoom"),
	WorldTeamChatRoom_1 = require("../WorldTeamChatRoom");
class ChatRoomItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.lEt = void 0),
			(this.fye = 0),
			(this.sSt = void 0),
			(this.WMt = void 0),
			(this.Wgt = void 0),
			(this._Et = (t) => {
				1 === t && this.Wgt && this.Wgt(this.lEt, this.fye);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UISprite],
			[6, UE.UIItem],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this._Et]]);
	}
	OnStart() {
		var t = this.GetItem(4);
		this.WMt = new PlayerHeadItem_1.PlayerHeadItem(t.GetOwner());
	}
	OnBeforeDestroy() {
		(this.sSt = void 0), (this.lEt = void 0), (this.fye = 0);
	}
	Clear() {}
	Refresh(t, e, i) {
		if (
			(this.GetItem(6).SetUIActive(!1),
			this.GetItem(7).SetUIActive(!1),
			this.GetSprite(5).SetIsGray(!1),
			t instanceof PrivateChatRoom_1.PrivateChatRoom)
		) {
			var r = t.GetTargetPlayerId();
			if (
				((this.sSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(r)),
				!this.sSt)
			)
				return;
			(this.lEt = 1), (this.fye = this.sSt.PlayerId), this.RefreshIsOnline(t);
		} else
			t instanceof TeamChatRoom_1.TeamChatRoom
				? ((this.sSt = void 0),
					(this.lEt = 2),
					(this.fye = ModelManager_1.ModelManager.PlayerInfoModel.GetId()))
				: t instanceof WorldTeamChatRoom_1.WorldChatRoom &&
					((this.sSt = void 0),
					(this.lEt = 3),
					(this.fye = ModelManager_1.ModelManager.PlayerInfoModel.GetId()));
		(r = t.GetIsShowRedDot()),
			this.GetItem(2)?.SetUIActive(r),
			this.RefreshPlayerTexture(),
			this.x9e(),
			this.RefreshMuteItem(),
			e ? this.SetToggleState(1) : this.SetToggleState(0);
	}
	OnSelected(t) {
		this.SetToggleState(1), this.GetItem(2)?.SetUIActive(!1);
	}
	OnDeselected(t) {
		this.SetToggleState(0);
	}
	RefreshIsOnline(t) {
		var e = this.GetItem(6);
		t = t.IsOnline();
		e.SetUIActive(!t),
			this.GetSprite(5).SetIsGray(!t),
			this.GetItem(7).SetUIActive(t),
			this.WMt.SetIsGray(!t);
	}
	RefreshPlayerTexture() {
		var t,
			e = this.GetSprite(5);
		2 === this.lEt || 3 === this.lEt
			? (e.SetUIActive(!0), this.WMt.SetActive(!1))
			: (e?.SetUIActive(!1),
				(e =
					this.sSt?.PlayerId ??
					ModelManager_1.ModelManager.PlayerInfoModel.GetId())
					? (t =
							ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(
								e,
							)?.GetPlayerIcon())
						? this.WMt.RefreshByRoleIdUseCard(t)
						: this.WMt.RefreshByPlayerId(e, !0)
					: this.WMt.SetActive(!1));
	}
	x9e() {
		var t,
			e,
			i = this.GetText(1);
		2 === this.lEt || 3 === this.lEt
			? LguiUtil_1.LguiUtil.SetLocalText(i, "CurrentTeam")
			: ((t = this.sSt.FriendRemark),
				StringUtils_1.StringUtils.IsEmpty(t)
					? ((e = this.sSt.PlayerName), i.SetText(e))
					: i.SetText(t));
	}
	RefreshMuteItem() {
		var t,
			e = this.GetItem(3);
		this.sSt
			? ((t = ModelManager_1.ModelManager.ChatModel.IsInMute(
					this.sSt.PlayerId,
				)),
				e.SetUIActive(t))
			: e.SetUIActive(!1);
	}
	BindOnClicked(t) {
		this.Wgt = t;
	}
	SetToggleState(t) {
		var e = this.GetExtendToggle(0);
		e && e.GetToggleState() !== t && e.SetToggleState(t, !1);
	}
}
exports.ChatRoomItem = ChatRoomItem;
