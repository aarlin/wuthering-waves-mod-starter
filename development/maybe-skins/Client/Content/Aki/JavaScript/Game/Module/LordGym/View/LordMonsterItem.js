"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LordMonsterItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class LordMonsterItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UITexture],
		];
	}
	SetMonsterInfo(e, t) {
		var n = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e);
		this.SetTextureByPath(n, this.GetTexture(2)),
			(n = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(e));
		this.GetText(0).SetText(n),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(1),
				"Text_InstanceDungeonRecommendLevel_Text",
				t,
			);
	}
}
exports.LordMonsterItem = LordMonsterItem;
