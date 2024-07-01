"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRoleDescribeComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout");
class ActivityRoleDescribeComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.zke = 0),
			(this.EPe = void 0),
			(this.$be = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[3, UE.UITexture],
			[4, UE.UISprite],
			[2, UE.UIHorizontalLayout],
			[5, UE.UISprite],
		];
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.EPe.PlayLevelSequenceByName("Start"),
			(this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
				this.GetHorizontalLayout(2),
			)),
			this.GetTexture(3)?.SetUIActive(!0),
			this.GetSprite(5)?.SetUIActive(!1),
			this.GetItem(1).SetUIActive(!1);
	}
	Update(e) {
		var t, i, n;
		(this.zke = e),
			(e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
				this.zke,
			)) &&
				(this.GetText(0).ShowTextNew(e.Name),
				(t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
					e.ElementId,
				)),
				(i = this.GetTexture(3)),
				(n = this.GetSprite(4)),
				this.SetTextureByPath(t.Icon, i),
				this.SetSpriteByPath(t.GachaElementBgSpritePath, n, !1),
				this.HFe(e.QualityId));
	}
	HFe(e) {
		this.$be.RebuildLayout(e);
	}
}
exports.ActivityRoleDescribeComponent = ActivityRoleDescribeComponent;
