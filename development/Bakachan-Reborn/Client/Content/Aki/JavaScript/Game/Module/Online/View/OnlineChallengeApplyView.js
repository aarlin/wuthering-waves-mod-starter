"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineChallengeApplyView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	OnlineController_1 = require("../OnlineController"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class OnlineChallengeApplyView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.EGi = -1),
			(this.yGi = -1),
			(this.Q2t = void 0),
			(this.pGi = void 0),
			(this.MGi = () => {
				if (
					ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
				) {
					if (
						0 ===
							ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
								ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
							) &&
						ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
					)
						return void OnlineController_1.OnlineController.InviteRechallengeRequest();
					OnlineController_1.OnlineController.ReceiveRechallengeRequest();
				} else
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchAcceptInviteRequest(
						!0,
					);
				this.CloseMe();
			}),
			(this.J9e = () => {
				ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchAcceptInviteRequest(
						!1,
					),
					this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UISprite],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[2, this.MGi],
				[8, this.J9e],
			]);
	}
	OnStart() {
		var e;
		this.GetButton(8).GetRootComponent().SetUIActive(!0),
			(this.Q2t = this.GetText(5)),
			(this.pGi = this.GetSprite(6)),
			ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
				? ((this.EGi = ModelManager_1.ModelManager.OnlineModel.ApplyCd),
					(this.yGi = ModelManager_1.ModelManager.OnlineModel.ApplyCd),
					this.IGi())
				: ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
						"match_confirm_time_out_seconds",
					)),
					(this.EGi = e),
					(this.yGi = e),
					this.TGi());
	}
	OnTick(e) {
		(this.EGi -= e * TimeUtil_1.TimeUtil.Millisecond),
			this.EGi <= 0
				? this.CloseMe()
				: (this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.EGi)),
					this.pGi.SetFillAmount(this.EGi / this.yGi));
	}
	IGi() {
		var e = this.GetItem(3),
			t = this.GetItem(4),
			n = this.GetText(7);
		e.SetUIActive(!0),
			t.SetUIActive(!1),
			ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
				? ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
					? LguiUtil_1.LguiUtil.SetLocalText(n, "SuggestChallengeAgain")
					: LguiUtil_1.LguiUtil.SetLocalText(n, "InviteChallengeAgain")
				: ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
					? LguiUtil_1.LguiUtil.SetLocalText(n, "SuggestContinueChallenge")
					: LguiUtil_1.LguiUtil.SetLocalText(n, "InviteContinueChallenge"),
			(e = ModelManager_1.ModelManager.OnlineModel.ChallengeApplyPlayerId);
		(t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e))
			? (this.GetText(1).SetText(t.Name),
				this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.EGi)),
				this.pGi.SetFillAmount(this.EGi / this.yGi),
				(n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
					t.HeadId,
				)?.Card) && this.SetTextureByPath(n, this.GetTexture(0)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("MultiPlayerTeam", 5, "未找到发起邀请的玩家", [
					"playerId：",
					e,
				]);
	}
	TGi() {
		var e = this.GetItem(3),
			t = this.GetItem(4);
		e.SetUIActive(!0),
			t.SetUIActive(!1),
			(e = this.GetText(1)),
			LguiUtil_1.LguiUtil.SetLocalText(e, "TeamLeaderInviteToInstance"),
			(t = this.GetText(7)),
			(e = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId()),
			(e =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
						.MapName,
				) ?? ""),
			t.SetText(e),
			(t = ModelManager_1.ModelManager.OnlineModel.OwnerId);
		(e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t))
			? (this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.EGi)),
				this.pGi.SetFillAmount(this.EGi / this.yGi),
				(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
					e.HeadId,
				)?.Card) && this.SetTextureByPath(e, this.GetTexture(0)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("MultiPlayerTeam", 5, "未找到发起邀请的玩家", [
					"playerId：",
					t,
				]);
	}
}
exports.OnlineChallengeApplyView = OnlineChallengeApplyView;
