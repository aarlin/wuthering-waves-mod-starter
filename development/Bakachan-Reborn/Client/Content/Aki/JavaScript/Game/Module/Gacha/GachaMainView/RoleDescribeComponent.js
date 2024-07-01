"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleDescribeComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
class RoleDescribeComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.cjt = 0),
			(this.EPe = void 0),
			(this.$be = void 0),
			(this.OpenRolePreview = () => {});
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
			this.GetSprite(5)?.SetUIActive(!1);
	}
	Update(e, t = !1) {
		var i, n, o;
		(this.cjt = e),
			(e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
				this.cjt,
			)) &&
				(this.GetText(0).ShowTextNew(e.Name),
				(i = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
					e.ElementId,
				)),
				(n = this.GetTexture(3)),
				(o = this.GetSprite(4)),
				this.SetTextureByPath(i.Icon, n),
				this.SetSpriteByPath(i.GachaElementBgSpritePath, o, !1),
				this.HFe(e.QualityId),
				this.GetItem(1).SetUIActive(t));
	}
	HFe(e) {
		this.$be.RebuildLayout(e);
	}
}
exports.RoleDescribeComponent = RoleDescribeComponent;
