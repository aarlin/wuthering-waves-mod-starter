"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FriendItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ChatController_1 = require("../../Chat/ChatController"),
	ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem"),
	ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem"),
	PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
	OnlineController_1 = require("../../Online/OnlineController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	FriendController_1 = require("../FriendController"),
	FriendModel_1 = require("../FriendModel"),
	MAX_BUTTON_COUNT = 2,
	MAX_BUTTON_INFO_COUNT = 5;
class FunctionButtonInfo {
	constructor(e, t, r) {
		(this.SpritePath = e), (this.StateFunc = t), (this.CallBack = r);
	}
}
class FriendItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e, t) {
		super(),
			(this.m6t = void 0),
			(this.d6t = void 0),
			(this.FriendInstanceId = 0),
			(this.C6t = void 0),
			(this.g6t = void 0),
			(this.nNt = () => {
				this.f6t().PlayerIsOnline &&
					this.p6t() &&
					OnlineController_1.OnlineController.ApplyJoinWorldRequest(
						this.f6t().PlayerId,
						Protocol_1.Aki.Protocol.z3s.Proto_LobbyJoin,
					);
			}),
			(this.v6t = () =>
				ModelManager_1.ModelManager.FriendModel.IsMyFriend(
					this.f6t().PlayerId,
				)),
			(this.M6t = () => "FriendBlackListView" === this.BelongView),
			(this.S6t = () =>
				(2 === ModelManager_1.ModelManager.FriendModel.FilterState &&
					"FriendView" === this.BelongView) ||
				!(
					"FriendSearchView" !== this.BelongView ||
					!ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
						this.f6t().PlayerId,
					)
				)),
			(this.E6t = () =>
				!ModelManager_1.ModelManager.FriendModel.IsMyFriend(
					this.f6t().PlayerId,
				) &&
				!ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
					this.f6t().PlayerId,
				) &&
				("FriendSearchView" === this.BelongView ||
					(3 === ModelManager_1.ModelManager.FriendModel.FilterState &&
						"FriendView" === this.BelongView))),
			(this.y6t = () =>
				(2 === ModelManager_1.ModelManager.FriendModel.FilterState &&
					"FriendView" === this.BelongView) ||
				!(
					"FriendSearchView" !== this.BelongView ||
					!ModelManager_1.ModelManager.FriendModel.HasFriendApplication(
						this.f6t().PlayerId,
					)
				)),
			(this.I6t = () => {
				var e;
				ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
					this.FriendInstanceId,
				)?.Debug ||
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Friend", 28, "点击拒绝添加好友"),
					(e = this.f6t())
						? ((this.C6t = []),
							this.C6t.push(e.PlayerId),
							FriendController_1.FriendController.RequestFriendApplyHandle(
								this.C6t,
								Protocol_1.Aki.Protocol.xks.Proto_Reject,
							))
						: (FriendController_1.FriendController.LocalRemoveApplicationFriend(
								this.FriendInstanceId,
							),
							ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"FriendRequestOutOfDate",
							)));
			}),
			(this.T6t = () => {
				var e, t;
				ModelManager_1.ModelManager.FriendModel.HasFriend(this.FriendInstanceId)
					? FriendController_1.FriendController.LocalRemoveApplicationFriend(
							this.FriendInstanceId,
						)
					: ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
							this.FriendInstanceId,
						)?.Debug ||
						((e = this.f6t())
							? ((t =
									ModelManager_1.ModelManager.FriendModel.GetFriendListCount()),
								ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(
									1,
								) <
								t + 1
									? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
											"FriendListFull",
										)
									: ((this.C6t = []),
										this.C6t.push(e.PlayerId),
										FriendController_1.FriendController.RequestFriendApplyHandle(
											this.C6t,
											Protocol_1.Aki.Protocol.xks.Proto_Approve,
										)))
							: (FriendController_1.FriendController.LocalRemoveApplicationFriend(
									this.FriendInstanceId,
								),
								ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
									"FriendRequestOutOfDate",
								)));
			}),
			(this.L6t = () => {
				if (
					!ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
						this.FriendInstanceId,
					)?.Debug
				) {
					let r = Protocol_1.Aki.Protocol.wks.Proto_Search;
					"FriendView" === this.BelongView &&
						3 === ModelManager_1.ModelManager.FriendModel.FilterState &&
						(r = Protocol_1.Aki.Protocol.wks.Proto_RecentlyTeam);
					var e,
						t = this.f6t();
					t &&
						((e = ModelManager_1.ModelManager.FriendModel.GetFriendListCount()),
						ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(
							1,
						) <
						e + 1
							? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
									"FriendListFull",
								)
							: FriendController_1.FriendController.RequestFriendApplyAddSend(
									t.PlayerId,
									r,
								));
				}
			}),
			(this.D6t = () => {
				var e;
				ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
					this.FriendInstanceId,
				)?.Debug ||
					((e = this.f6t())
						? FriendController_1.FriendController.RequestUnBlockPlayer(
								e.PlayerId,
							)
						: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"IsNotBlockedPlayer",
							));
			}),
			(this.cJe = () => {
				var e = this.f6t();
				e && ChatController_1.ChatController.OpenFriendChat(e.PlayerId);
			}),
			(this.R6t = () => {
				ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
					this.FriendInstanceId,
				)?.Debug ||
					(this.f6t()
						? ((ModelManager_1.ModelManager.FriendModel.SelectedPlayerId =
								this.FriendInstanceId),
							(ModelManager_1.ModelManager.FriendModel.ShowingView =
								this.BelongView),
							UiManager_1.UiManager.OpenView("FriendProcessView"))
						: (this.U6t(),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.UpdateFriendViewShow,
							)));
			}),
			(this.BelongView = e),
			(ModelManager_1.ModelManager.FriendModel.ShowingView = this.BelongView),
			(this.LZe = new Array(2)),
			(this.A6t = new Array(5)),
			t && this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UISprite],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UITexture],
			[9, UE.UIText],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIButtonComponent],
			[13, UE.UIItem],
		]),
			(this.BtnBindInfo = [[12, this.R6t]]);
	}
	OnStart() {
		(this.m6t = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(11))),
			(this.d6t = new TeamItem(this.GetItem(10))),
			this.m6t.BindCallback(this.nNt),
			(this.g6t = new PlayerHeadItem_1.PlayerHeadItem(
				this.GetItem(0).GetOwner(),
			)),
			(this.LZe[0] = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(
				this.GetItem(7),
			)),
			(this.LZe[1] = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(
				this.GetItem(6),
			)),
			(this.A6t[0] = new FunctionButtonInfo(
				"SP_RefuseFriend",
				this.S6t,
				this.I6t,
			)),
			(this.A6t[1] = new FunctionButtonInfo(
				"SP_RemoveFriend",
				this.M6t,
				this.D6t,
			)),
			(this.A6t[2] = new FunctionButtonInfo(
				"SP_AddFriend",
				this.E6t,
				this.L6t,
			)),
			(this.A6t[3] = new FunctionButtonInfo(
				"SP_AgreeFriend",
				this.y6t,
				this.T6t,
			)),
			(this.A6t[4] = new FunctionButtonInfo(
				"SP_ChatFriend",
				this.v6t,
				this.cJe,
			));
	}
	Refresh(e, t, r) {
		this.Xqe(e.Id),
			1 === e.OperationType
				? this.P6t()
				: (2 !== e.OperationType && 3 !== e.OperationType) || this.x6t();
	}
	RefreshMute() {
		var e = ModelManager_1.ModelManager.ChatModel.IsInMute(this.f6t().PlayerId);
		this.GetItem(1).SetUIActive(e);
	}
	Xqe(e) {
		(this.FriendInstanceId = e),
			(e = this.f6t()),
			this.w6t(),
			e &&
				(this.g6t.RefreshByHeadPhotoId(e.PlayerHeadPhoto),
				this.GetText(3).SetText("Lv." + e.PlayerLevel.toString())),
			this.B6t();
	}
	w6t() {
		this.RefreshMute(),
			this._Ge(),
			this.C4e(),
			this.b6t(),
			this.q6t(),
			this.x6t(),
			this.G6t(),
			this.N6t(),
			this.O6t();
	}
	N6t() {
		this.GetText(9).SetText(this.f6t().Signature),
			this.GetItem(13).SetUIActive(0 < this.f6t().Signature.length);
	}
	O6t() {
		var e = this.f6t().CurCard;
		0 < e &&
			((e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e)),
			this.SetTextureByPath(e.LongCardPath, this.GetTexture(8)));
	}
	G6t() {
		3 !== ModelManager_1.ModelManager.FriendModel.FilterState
			? this.d6t.SetActive(!1)
			: (this.d6t.SetActive(!0), this.d6t.RefreshView(this.f6t()));
	}
	k6t(e, t) {
		return (
			!!t.StateFunc() &&
			(e.GetRootItem().SetUIActive(!0),
			e.RefreshSprite(t.SpritePath),
			e.BindCallback(t.CallBack),
			!0)
		);
	}
	x6t() {
		let e = 0;
		var t, r;
		for (let n = 0; n < this.A6t.length && !(e >= 2); n++)
			(t = this.LZe[e]), (r = this.A6t[n]), this.k6t(t, r) && (e += 1);
		for (; e < this.LZe.length; e++) this.LZe[e].GetRootItem().SetUIActive(!1);
	}
	q6t() {
		let e = !1;
		"FriendView" !== this.BelongView ||
			(1 !== ModelManager_1.ModelManager.FriendModel.FilterState &&
				3 !== ModelManager_1.ModelManager.FriendModel.FilterState) ||
			(e = !0),
			this.m6t.SetActive(e),
			e && this.F6t();
	}
	F6t() {
		this.m6t.RefreshEnable(
			this.f6t().PlayerIsOnline &&
				this.p6t() &&
				ModelManager_1.ModelManager.FunctionModel.IsOpen(10021),
		);
	}
	b6t() {
		ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)
			? this.f6t().PlayerIsOnline
				? this.p6t()
					? this.m6t.RefreshText("FriendApplyJoin")
					: this.m6t.RefreshText(
							"ApplyBtnDisable",
							this.f6t().WorldLevel -
								ModelManager_1.ModelManager.OnlineModel.EnterDiff,
						)
				: this.m6t.RefreshText("OfflineText")
			: this.m6t.RefreshText("FriendOnlineDisable");
	}
	p6t() {
		return ModelManager_1.ModelManager.OnlineModel.CanJoinOtherWorld(
			ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel,
			this.f6t().WorldLevel,
		);
	}
	C4e() {
		var e = this.GetText(2);
		FriendController_1.FriendController.CheckRemarkIsValid(
			this.f6t()?.FriendRemark ?? "",
		)
			? e.SetText(`(${this.f6t().FriendRemark})`)
			: e.SetText(this.f6t()?.PlayerName ?? "");
	}
	_Ge() {}
	B6t() {
		var e,
			t = this.f6t().PlayerIsOnline,
			r = this.GetText(5);
		"FriendBlackListView" === this.BelongView
			? r.SetText("")
			: t
				? LguiUtil_1.LguiUtil.SetLocalText(r, "FriendOnline")
				: 0 === (e = this.f6t()).PlayerLastOfflineTime
					? r.SetText("")
					: ((e = FriendModel_1.FriendModel.GetOfflineStrAndGap(
							e.PlayerLastOfflineTime,
						)),
						LguiUtil_1.LguiUtil.SetLocalText(r, e[0], e[1])),
			(this.GetText(2).useChangeColor = !t),
			(this.GetText(3).useChangeColor = !t),
			(r.useChangeColor = !t),
			this.V6t();
	}
	V6t() {
		var e,
			t = this.GetSprite(4);
		let r,
			n = !0;
		"FriendBlackListView" === this.BelongView
			? (n = !1)
			: (r = this.f6t().PlayerIsOnline
					? "SP_FriendOnline"
					: "SP_FriendOffline"),
			t.SetUIActive(n),
			r &&
				((e =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r)),
				this.SetSpriteByPath(e, t, !1));
	}
	f6t() {
		return ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(
			this.FriendInstanceId,
		);
	}
	U6t() {
		var e = ModelManager_1.ModelManager.FriendModel.FilterState;
		1 === e
			? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"FriendDeleteEach",
				)
			: 2 === e &&
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"FriendRequestOutOfDate",
				);
	}
	P6t() {
		ModelManager_1.ModelManager.FriendModel.CurrentApplyFriendListHasPlayer(
			this.FriendInstanceId,
		) && this.x6t();
	}
}
exports.FriendItem = FriendItem;
class TeamItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	RefreshView(e) {
		this.GetItem(1).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			2 <= e.TeamMemberCount && this.GetItem(1).SetUIActive(!0),
			3 <= e.TeamMemberCount && this.GetItem(2).SetUIActive(!0);
	}
}
