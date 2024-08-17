"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineChallengePlayerStateItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	OnlineModel_1 = require("../OnlineModel");
class OnlineChallengePlayerStateItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(), (this.j8 = t), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UISprite],
		];
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
			this.j8,
		);
		e
			? (this.GetText(1).SetText(e.Name),
				(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
					e.HeadId,
				)?.Card) && this.SetTextureByPath(e, this.GetTexture(0)),
				(e =
					ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
						this.j8,
					)),
				this.SetTeamPlayerSprite(e))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("MultiPlayerTeam", 5, "获取队友联机时，失败", [
					"PlayerId",
					this.j8,
				]);
	}
	SetTeamPlayerSprite(e) {
		(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			OnlineModel_1.onlineContinuingChallengeIcon[e],
		)),
			StringUtils_1.StringUtils.IsEmpty(e) ||
				this.SetSpriteByPath(e, this.GetSprite(2), !1);
	}
}
exports.OnlineChallengePlayerStateItem = OnlineChallengePlayerStateItem;
