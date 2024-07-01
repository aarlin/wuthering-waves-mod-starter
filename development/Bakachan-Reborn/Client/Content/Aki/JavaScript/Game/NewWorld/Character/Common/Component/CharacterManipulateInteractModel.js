"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ManipulateInteractModel = void 0);
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem");
class ManipulateInteractModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.InRangePoints = new Set()),
			(this.LHr = (e, t) => {
				e ? this.InRangePoints.add(t) : this.InRangePoints.delete(t);
			});
	}
	OnInit() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange,
				this.LHr,
			),
			!0
		);
	}
	OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange,
				this.LHr,
			),
			!0
		);
	}
}
exports.ManipulateInteractModel = ManipulateInteractModel;
