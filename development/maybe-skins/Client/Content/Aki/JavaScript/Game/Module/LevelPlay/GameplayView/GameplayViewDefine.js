"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DelayCloseTime =
		exports.GameplayFirstPassViewData =
		exports.GameplayEnterViewData =
			void 0);
const UiViewData_1 = require("../../../Ui/Define/UiViewData");
class GameplayEnterViewData extends UiViewData_1.UiViewData {
	constructor() {
		super(...arguments), (this.InfoId = ""), (this.TitleId = "");
	}
}
exports.GameplayEnterViewData = GameplayEnterViewData;
class GameplayFirstPassViewData extends UiViewData_1.UiViewData {
	constructor() {
		super(...arguments), (this.InfoId = ""), (this.TitleId = "");
	}
}
(exports.GameplayFirstPassViewData = GameplayFirstPassViewData),
	(exports.DelayCloseTime = 3e3);
