"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDetailItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class TowerDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(),
			(this.DLo = void 0),
			(this.RLo = -1),
			(this.kqe = () => {
				this.DLo && this.DLo(this.RLo);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.kqe]]);
	}
	Refresh(e, t, o) {
		this.RLo = e;
		var r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(1),
			"Text_TowerOnlyFloor_Text",
			r.Floor,
		),
			e === ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor
				? this.SetToggleState(1)
				: this.SetToggleState(0);
	}
	BindOnClickToggle(e) {
		this.DLo = e;
	}
	SetToggleState(e) {
		this.GetExtendToggle(0).SetToggleState(e), 1 === e && this.kqe();
	}
	OnBeforeDestroy() {
		this.DLo = void 0;
	}
}
exports.TowerDetailItem = TowerDetailItem;
