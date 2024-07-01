"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TitleItemBase = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TitleItemBase extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
}
exports.TitleItemBase = TitleItemBase;
