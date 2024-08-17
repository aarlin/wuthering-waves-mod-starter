"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineTeamItem = void 0);
const UE = require("ue"),
	BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	FriendController_1 = require("../../Friend/FriendController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	OnlineController_1 = require("../OnlineController");
class OnlineTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.dNi = void 0),
			(this.CNi = !1),
			(this.gNi = () => {
				if (this.dNi.IsSelf) {
					let e;
					(e = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
						? new ConfirmBoxDefine_1.ConfirmBoxDataNew(100)
						: new ConfirmBoxDefine_1.ConfirmBoxDataNew(78)).FunctionMap.set(
						2,
						() => {
							OnlineController_1.OnlineController.LeaveWorldTeamRequest(
								this.dNi.PlayerId,
							);
						},
					),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							e,
						);
				} else {
					FriendController_1.FriendController.RequestFriendApplyAddSend(
						this.dNi.PlayerId,
						Protocol_1.Aki.Protocol.wks.Proto_RecentlyTeam,
					),
						(this.CNi = !0);
					var e = this.GetText(19),
						t = this.GetInteractionGroup(15);
					LguiUtil_1.LguiUtil.SetLocalText(e, "HaveApplyFriend"),
						t.SetInteractable(!1);
				}
			}),
			(this.fNi = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(79);
				e.FunctionMap.set(2, () => {
					OnlineController_1.OnlineController.KickWorldTeamRequest(
						this.dNi.PlayerId,
					);
				}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}),
			(this.PGi = () => {
				(ModelManager_1.ModelManager.OnlineModel.CachePlayerData = this.dNi),
					UiManager_1.UiManager.OpenView("OnlineProcessView");
			}),
			(this.WJe = (e, t) => {
				this.dNi.PlayerId === e && this.pNi(t);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UITexture],
			[7, UE.UIText],
			[13, UE.UIItem],
			[14, UE.UIButtonComponent],
			[15, UE.UIInteractionGroup],
			[16, UE.UIButtonComponent],
			[17, UE.UISprite],
			[18, UE.UIItem],
			[19, UE.UIText],
			[20, UE.UISprite],
			[22, UE.UITexture],
			[21, UE.UIItem],
			[23, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[14, this.gNi],
				[16, this.fNi],
				[23, this.PGi],
			]);
	}
	OnStart() {
		this.GetItem(18).SetUIActive(!1),
			this.GetItem(13).SetUIActive(!0),
			this.AddEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshPlayerPing,
			this.WJe,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshPlayerPing,
			this.WJe,
		);
	}
	OnBeforeDestroy() {
		this.RemoveEventListener();
	}
	Refresh(e, t, i) {
		this.GetButton(23).RootUIComp.SetRaycastTarget(
			e.PlayerId !== ModelManager_1.ModelManager.FunctionModel.PlayerId,
		),
			(this.dNi = e);
		let r,
			o = !1,
			n = !1;
		(n = e.IsSelf
			? ((o = !1), (r = "ExitWorld"), !0)
			: ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId)
				? ((r = this.CNi
						? ((o = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
							"HaveApplyFriend")
						: ((o = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
							"IsMyFriend")),
					!1)
				: ((o = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
					(r = "ApplyFriend"),
					!0)),
			this.GetButton(16).RootUIComp.SetUIActive(o),
			this.GetButton(14).RootUIComp.SetUIActive(n),
			this.GetText(1).SetUIActive(!n);
		var a = n ? 19 : 1,
			l =
				((a =
					((a =
						(LguiUtil_1.LguiUtil.SetLocalText(this.GetText(a), r),
						ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.HeadId)
							?.RoleHeadIconBig)) &&
						this.SetTextureByPath(a, this.GetTexture(3)),
					ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId))),
				this.GetText(0));
		a &&
		void 0 !==
			(a = ModelManager_1.ModelManager.FriendModel.GetFriendById(
				e.PlayerId,
			)?.FriendRemark) &&
		"" !== a
			? LguiUtil_1.LguiUtil.SetLocalText(l, "NameMark", a)
			: l.SetText(e.Name),
			this.GetText(2).SetText("Lv." + e.Level),
			(a = this.GetText(7)),
			e.Signature && "" !== e.Signature
				? a.SetText(e.Signature)
				: LguiUtil_1.LguiUtil.SetLocalText(a, "DefaultSign"),
			this.GetItem(21).SetUIActive(!0),
			(l = this.GetSprite(17));
		0 <
			(a =
				(1 === this.dNi.PlayerNumber
					? (l.SetUIActive(!0),
						(a =
							ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
								"SP_Online1PIcon",
							)),
						this.SetSpriteByPath(a, l, !1))
					: 2 === this.dNi.PlayerNumber
						? (l.SetUIActive(!0),
							(a =
								ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
									"SP_Online2PIcon",
								)),
							this.SetSpriteByPath(a, l, !1))
						: 3 === this.dNi.PlayerNumber
							? (l.SetUIActive(!0),
								(a =
									ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
										"SP_Online3PIcon",
									)),
								this.SetSpriteByPath(a, l, !1))
							: l.SetUIActive(!1),
				this.pNi(e.PingState),
				e.PlayerDetails.zgs)) &&
			((l = BackgroundCardById_1.configBackgroundCardById.GetConfig(a)),
			this.SetTextureByPath(l.LongCardPath, this.GetTexture(22)));
	}
	pNi(e) {
		var t,
			i = this.GetSprite(20);
		i.SetUIActive(!0),
			e === Protocol_1.Aki.Protocol.oFs.Proto_UNKNOWN
				? ((t =
						ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
							"SP_SignalUnknown",
						)),
					this.SetSpriteByPath(t, i, !1))
				: e === Protocol_1.Aki.Protocol.oFs.Proto_GREAT
					? ((t =
							ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
								"SP_SignalGreat",
							)),
						this.SetSpriteByPath(t, i, !1))
					: e === Protocol_1.Aki.Protocol.oFs.Proto_GOOD
						? ((t =
								ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
									"SP_SignalGood",
								)),
							this.SetSpriteByPath(t, i, !1))
						: e === Protocol_1.Aki.Protocol.oFs.Proto_POOR &&
							((t =
								ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
									"SP_SignalPoor",
								)),
							this.SetSpriteByPath(t, i, !1));
	}
}
exports.OnlineTeamItem = OnlineTeamItem;
