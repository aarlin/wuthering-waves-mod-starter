"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineInstanceDungeonDeathPanel = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	OnlineController_1 = require("../OnlineController"),
	OnlineModel_1 = require("../OnlineModel");
class OnlineInstanceDungeonDeathPanel extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Xli = new Map()),
			(this.YGi = () => {
				var e;
				ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
					? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon()
					: ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
							108,
						)).FunctionMap.set(2, () => {
							InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
						}),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							e,
						));
			}),
			(this.JGi = () => {
				var e, n;
				ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
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
											Protocol_1.Aki.Protocol.h3s.Proto_Dead,
										))
						: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"CannotInvite",
							)
					: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"NeedAllDeadToChallengeAgain",
						);
			}),
			(this.$li = (e, n) => {
				(e = this.Xli.get(e)) && this.Yli(n, e);
			}),
			(this.zGi = () => {
				this.Jli();
			}),
			this.CreateThenShowByResourceIdAsync(
				"UiView_OnlineDeath_Prefab",
				e,
			).finally(() => {
				this.InitPanel();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[1, this.YGi],
				[2, this.JGi],
			]);
	}
	OnStart() {
		this.AddEventListener();
	}
	OnBeforeDestroy() {
		this.RemoveEventListener();
	}
	InitPanel() {
		this.Jli(), this.ZGi();
	}
	ResetData() {
		this.Xli && this.Xli.clear();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlayerChallengeStateChange,
			this.$li,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnOtherPlayerDead,
				this.zGi,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlayerChallengeStateChange,
			this.$li,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnOtherPlayerDead,
				this.zGi,
			);
	}
	Jli() {
		var e = this.GetText(0),
			n = this.GetItem(3),
			t = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
		let l = !0;
		for (const e of t)
			if (
				!ModelManager_1.ModelManager.DeadReviveModel.IsPlayerDead(
					e.GetPlayerId(),
				)
			) {
				l = !1;
				break;
			}
		if (t.length <= 1 || !l) e.SetUIActive(!0), n.SetUIActive(!1);
		else {
			e.SetUIActive(!1), n.SetUIActive(!0);
			var i = this.GetSprite(4),
				o = this.GetSprite(5),
				r =
					(i.SetUIActive(!1),
					o.SetUIActive(!1),
					ModelManager_1.ModelManager.PlayerInfoModel.GetId());
			for (const e of t) {
				var a,
					s = e.GetPlayerId();
				s !== r &&
					((a =
						ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
							s,
						)),
					i.bIsUIActive
						? o.bIsUIActive ||
							(o.SetUIActive(!0), this.Yli(a, o), this.Xli.set(s, o))
						: (i.SetUIActive(!0), this.Yli(a, i), this.Xli.set(s, i)));
			}
		}
	}
	ZGi() {
		ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
			? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "ChallengeAgain")
			: LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(6),
					"SuggestChallengeAgain",
				);
	}
	Yli(e, n) {
		(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			OnlineModel_1.onlineContinuingChallengeIcon[e],
		)),
			StringUtils_1.StringUtils.IsEmpty(e) || this.SetSpriteByPath(e, n, !1);
	}
}
exports.OnlineInstanceDungeonDeathPanel = OnlineInstanceDungeonDeathPanel;
