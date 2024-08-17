"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelUpModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager");
class LevelUpModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.CanBreakTipsShowFlag = !0), (this.yGn = void 0);
	}
	SetExpChange(e, r, i, a, l) {
		this.ipi({ AddExp: !0, PreLevel: e, PreExp: i, CurLevel: e, CurExp: r });
	}
	SetLevelUp(e, r, i, a, l, n, p, t) {
		this.ipi({ AddExp: 0 < t, PreLevel: e, PreExp: a, CurLevel: r, CurExp: i });
	}
	SetShowLevelOnly(e) {
		var r = ModelManager_1.ModelManager.FunctionModel.GetPlayerExp() ?? 0;
		this.ipi({ AddExp: !1, PreLevel: e, PreExp: r, CurLevel: e, CurExp: r });
	}
	IGn(e) {
		this.yGn &&
			(e.AddExp && (this.yGn.AddExp = e.AddExp),
			e.PreExp <= this.yGn.PreExp && (this.yGn.PreExp = e.PreExp),
			e.PreLevel <= this.yGn.PreLevel && (this.yGn.PreLevel = e.PreLevel),
			e.CurExp >= this.yGn.CurExp && (this.yGn.CurExp = e.CurExp),
			e.CurLevel >= this.yGn.CurLevel) &&
			(this.yGn.CurLevel = e.CurLevel);
	}
	ipi(e) {
		UiManager_1.UiManager.IsViewOpen("LevelUpView") && this.yGn
			? this.IGn(e)
			: ((this.yGn = e),
				UiManager_1.UiManager.OpenView("LevelUpView", this.yGn));
	}
	GetCacheData() {
		return this.yGn;
	}
	ClearCacheData() {
		this.yGn = void 0;
	}
}
exports.LevelUpModel = LevelUpModel;
