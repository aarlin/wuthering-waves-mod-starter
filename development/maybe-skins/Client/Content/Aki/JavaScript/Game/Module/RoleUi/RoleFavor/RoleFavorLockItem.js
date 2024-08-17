"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorLockItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleFavorLockItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(), (this.c_o = t), e && this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	OnStart() {
		var e, t;
		this.c_o &&
			((e = this.c_o.Desc),
			(t = this.c_o.IsLock),
			this.GetText(3).SetText(e),
			this.GetText(2).SetText(e),
			this.GetItem(1).SetUIActive(t),
			this.GetItem(0).SetUIActive(!t));
	}
	OnBeforeDestroy() {
		this.c_o = void 0;
	}
}
exports.RoleFavorLockItem = RoleFavorLockItem;
