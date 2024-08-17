"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectablePropComponentBase = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class SelectablePropComponentBase extends UiPanelBase_1.UiPanelBase {
	constructor(e = void 0) {
		super(), e && this.CreateThenShowByActor(e.GetOwner());
	}
}
exports.SelectablePropComponentBase = SelectablePropComponentBase;
