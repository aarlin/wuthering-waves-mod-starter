"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerTitleItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class TowerTitleItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.CDo = t),
			(this.Awe = () => {
				this.CDo && this.CDo();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[3, this.Awe]]);
	}
	OnStart() {}
	RefreshText(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, ...t);
	}
	OnBeforeDestroy() {
		this.CDo = void 0;
	}
}
exports.TowerTitleItem = TowerTitleItem;
