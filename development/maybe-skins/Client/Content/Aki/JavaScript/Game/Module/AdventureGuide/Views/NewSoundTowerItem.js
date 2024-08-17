"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewSoundTowerItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundTowerItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	Update(e) {
		var t = this.GetText(0),
			o =
				((t =
					(LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Conf.Name),
					this.GetText(2))),
				this.GetText(3)),
			r = this.GetTexture(1);
		e.IsLock
			? (this.SetTextureByPath(e.Conf.LockBigIcon, r),
				t.SetUIActive(!1),
				o.SetUIActive(!1))
			: (this.SetTextureByPath(e.Conf.BigIcon, r),
				(e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty()),
				(r =
					ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
						e,
					)),
				t.SetText(r),
				o.SetText(
					ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e) +
						"/" +
						ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e),
				));
	}
}
exports.NewSoundTowerItem = NewSoundTowerItem;
