"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeamPlayerSelectionComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class TeamPlayerSelectionComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.zke = void 0),
			(this.KBt = void 0),
			(this.IsSet = !1),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
		];
	}
	OnBeforeDestroy() {
		(this.zke = void 0), (this.KBt = void 0), (this.IsSet = !1);
	}
	SetRoleId(e) {
		this.zke = e;
	}
	SetTeamNumber(e) {
		this.KBt = e;
	}
	RefreshItem() {
		var e = this.GetTexture(0),
			t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
				this.zke,
			).RoleHeadIconBig;
		this.SetTextureByPath(t, e),
			(t = this.GetSprite(1)),
			(e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				`SP_Online${this.KBt}PIcon`,
			));
		this.SetSpriteByPath(e, t, !1), (this.IsSet = !0);
	}
}
exports.TeamPlayerSelectionComponent = TeamPlayerSelectionComponent;
