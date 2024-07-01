"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineChallengeStateView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	OnlineChallengePlayerStateItem_1 = require("./OnlineChallengePlayerStateItem");
class OnlineChallengeStateView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.EGi = -1),
			(this.Q2t = void 0),
			(this.pGi = void 0),
			(this.Xli = new Map()),
			(this.Opt = () => {
				this.CloseMe();
			}),
			(this.$li = (e, t) => {
				(e = this.Xli.get(e)) && e.SetTeamPlayerSprite(t);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UISprite],
			[7, UE.UIText],
		]),
			(this.BtnBindInfo = [[4, this.Opt]]);
	}
	OnStart() {
		(this.EGi = ModelManager_1.ModelManager.OnlineModel.ApplyCd),
			(this.Q2t = this.GetText(7)),
			(this.pGi = this.GetSprite(6)),
			this.RefreshView(),
			this.GetButton(4).RootUIComp.SetUIActive(!1);
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
	OnBeforeDestroy() {
		(this.Q2t = void 0),
			(this.pGi = void 0),
			(this.EGi = -1),
			this.Xli && this.Xli.clear();
	}
	OnTick(e) {
		(this.EGi -= e * TimeUtil_1.TimeUtil.Millisecond),
			this.EGi <= 0
				? this.CloseMe()
				: (this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.EGi)),
					this.pGi.SetFillAmount(
						this.EGi / ModelManager_1.ModelManager.OnlineModel.ApplyCd,
					));
	}
	RefreshView() {
		var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
				ModelManager_1.ModelManager.OnlineModel.OwnerId,
			)?.Name,
			t =
				(ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
					? (LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(0),
							"ChallengeAgain",
						),
						LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(5),
							"HasInviteChallengeAgain",
							e,
						))
					: (LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(0),
							"ContinueChallenge",
						),
						LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(5),
							"HasInviteContinueChallenge",
							e,
						)),
				this.GetText(1).SetText(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
							ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
						).MapName,
					),
				),
				this.GetItem(2)),
			i = this.GetItem(3),
			n =
				(t.SetUIActive(!1),
				i.SetUIActive(!1),
				ModelManager_1.ModelManager.PlayerInfoModel.GetId());
		if (
			!(
				(e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers())
					.length <= 1
			)
		)
			for (const o of e) {
				var l,
					a = o.GetPlayerId();
				a !== n &&
					(t.bIsUIActive
						? i.bIsUIActive ||
							(i.SetUIActive(!0),
							(l =
								new OnlineChallengePlayerStateItem_1.OnlineChallengePlayerStateItem(
									i,
									a,
								)),
							this.Xli.set(a, l))
						: (t.SetUIActive(!0),
							(l =
								new OnlineChallengePlayerStateItem_1.OnlineChallengePlayerStateItem(
									t,
									a,
								)),
							this.Xli.set(a, l)));
			}
	}
}
exports.OnlineChallengeStateView = OnlineChallengeStateView;
