"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonVictoryView = void 0);
const ue_1 = require("ue"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	CommonResultButtonData_1 = require("../Common/ResultView/CommonResultButtonData"),
	CommonResultView_1 = require("../Common/ResultView/CommonResultView"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	OnlineController_1 = require("../Online/OnlineController"),
	OnlineModel_1 = require("../Online/OnlineModel"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonVictoryView extends CommonResultView_1.CommonResultView {
	constructor() {
		super(...arguments),
			(this.NUe = 0),
			(this.Xli = new Map()),
			(this.sOe = void 0),
			(this.q2e = () => {
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
					() => {
						UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe();
					},
				);
			}),
			(this.nli = () => {
				var e, n;
				ModelManager_1.ModelManager.GameModeModel.IsMulti
					? ModelManager_1.ModelManager.OnlineModel.AllowInitiate
						? ((e = ModelManager_1.ModelManager.CreatureModel.IsMyWorld()),
							0 <
							(n = ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime)
								? e
									? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
											"NextInviteTime",
											TimeUtil_1.TimeUtil.GetCoolDown(n),
										)
									: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
											"NextSuggestTime",
											TimeUtil_1.TimeUtil.GetCoolDown(n),
										)
								: 2 !==
											ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
												ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
											) && e
									? OnlineController_1.OnlineController.InviteRechallengeRequest()
									: OnlineController_1.OnlineController.ApplyRechallengeRequest(
											Protocol_1.Aki.Protocol.h3s.Proto_Settle,
										))
						: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"CannotInvite",
							)
					: InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
							() => {
								UiManager_1.UiManager.IsViewShow(this.Info.Name) &&
									this.CloseMe();
							},
						);
			}),
			(this.$li = (e, n) => {
				(e = this.Xli.get(e)) && this.Yli(n, e);
			});
	}
	get Khi() {
		return this.NUe
			? ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe)
			: void 0;
	}
	OnRegisterComponent() {
		super.OnRegisterComponent();
	}
	OnStart() {
		(this.NUe =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
			super.OnStart(),
			UiManager_1.UiManager.IsViewShow("ReviveView") &&
				UiManager_1.UiManager.CloseView("ReviveView"),
			ModelManager_1.ModelManager.GameModeModel.IsMulti && this.Jli();
	}
	zli() {
		var e = new Array();
		return e.push(this.Zli()), e.push(this.e1i()), e;
	}
	Zli() {
		var e = new CommonResultButtonData_1.CommonResultButtonData();
		return (
			e.SetRefreshCallBack((e) => {
				e.SetBtnText("ButtonTextExit");
				var n = this.Khi.AutoLeaveTime;
				e.SetFloatTextWithTimer(n, !0, "InstanceDungeonLeftTimeToAutoLeave");
			}),
			e.SetClickCallBack(this.q2e),
			e
		);
	}
	e1i() {
		var e = new CommonResultButtonData_1.CommonResultButtonData();
		return (
			e.SetRefreshCallBack((e) => {
				e.SetBtnText("ButtonTextRetry"),
					ModelManager_1.ModelManager.GameModeModel.IsMulti &&
						(ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
							? e.SetBtnText("ContinueChallenge")
							: e.SetBtnText("SuggestContinueChallenge")),
					this.t1i(e);
			}),
			e.SetClickCallBack(this.nli),
			e
		);
	}
	t1i(e) {
		var n,
			t =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
					this.NUe,
				);
		!t ||
			t <= 0 ||
			((n = ModelManager_1.ModelManager.PowerModel.PowerCount),
			e.SetTipsItem(ItemDefines_1.EItemId.Power, n.toString()),
			t <= n
				? e.SetTipsItemTextColor(InstanceDungeonVictoryView.i1i)
				: e.SetTipsItemTextColor(InstanceDungeonVictoryView.o1i));
	}
	OnAfterShow() {
		this.qIt();
	}
	OnBeforeDestroy() {
		ModelManager_1.ModelManager.ItemHintModel.CleanItemRewardList(),
			this.Xli && this.Xli.clear();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlayerChallengeStateChange,
			this.$li,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlayerChallengeStateChange,
			this.$li,
		);
	}
	qIt() {
		this.Yhi();
	}
	Yhi() {
		(this.sOe =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SettleRewardItemList),
			this.RewardLayout.RebuildLayoutByDataNew(this.sOe);
	}
	SetupButtonFormat() {
		var e = this.zli();
		this.RefreshButtonList(e);
	}
	Jli() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
		if (e.length <= 1) this.GetItem(5).SetUIActive(!1);
		else {
			this.GetItem(5).SetUIActive(!0);
			var n = this.GetSprite(6),
				t = this.GetSprite(7),
				o =
					(n.SetUIActive(!1),
					t.SetUIActive(!1),
					ModelManager_1.ModelManager.PlayerInfoModel.GetId());
			for (const r of e) {
				var i,
					l = r.GetPlayerId();
				l !== o &&
					((i =
						ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
							l,
						)),
					n.bIsUIActive
						? t.bIsUIActive ||
							(t.SetUIActive(!0), this.Yli(i, t), this.Xli.set(l, t))
						: (n.SetUIActive(!0), this.Yli(i, n), this.Xli.set(l, n)));
			}
		}
	}
	Yli(e, n) {
		(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			OnlineModel_1.onlineContinuingChallengeIcon[e],
		)),
			StringUtils_1.StringUtils.IsEmpty(e) || this.SetSpriteByPath(e, n, !1);
	}
}
((exports.InstanceDungeonVictoryView = InstanceDungeonVictoryView).o1i =
	new ue_1.Color(246, 93, 88, 255)),
	(InstanceDungeonVictoryView.i1i = new ue_1.Color(255, 255, 255, 255));
