"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorBaseInfoComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorBaseInfoComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.zke = 0),
			(this.zke = t),
			e && this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UINiagara],
		];
	}
	OnStart() {
		var e, t;
		this.zke &&
			((e = this.GetText(0)),
			(t = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
				this.zke,
			)),
			LguiUtil_1.LguiUtil.SetLocalText(e, "FavorBaseInfo"),
			this.GetText(2).SetUIActive(!1),
			this.GetText(3).ShowTextNew(t.Sex),
			this.GetText(4).ShowTextNew(t.Country),
			this.GetText(5).ShowTextNew(t.Influence),
			this.GetText(6).ShowTextNew(t.Info));
	}
	OnBeforeDestroy() {
		this.zke = void 0;
	}
}
exports.RoleFavorBaseInfoComponent = RoleFavorBaseInfoComponent;
