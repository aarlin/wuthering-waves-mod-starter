"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashCollectStageItem = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class CalabashCollectStageItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	Refresh(e, t, o) {
		var r;
		(r =
			((r = this.GetText(0)).ShowTextNew(e.Info),
			r.SetChangeColor(e.IsUnlock, r.changeColor),
			this.GetText(1))).SetText(e.Num.toString()),
			r.SetChangeColor(e.IsUnlock, r.changeColor),
			this.GetItem(2).SetUIActive(e.IsUnlock),
			this.GetItem(3).SetUIActive(!e.IsUnlock);
	}
}
exports.CalabashCollectStageItem = CalabashCollectStageItem;
