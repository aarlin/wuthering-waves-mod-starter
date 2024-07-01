"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrainingView = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	TrainingItem_1 = require("./TrainingItem");
class TrainingView {
	constructor() {
		(this.E_i = void 0),
			(this.ADo = (e, i, t) => (
				(i = new TrainingItem_1.TrainingItem(i)).SetData(e),
				{ Key: t, Value: i }
			));
	}
	Show(e) {
		var i, t;
		e &&
			((i = e.RootUIComp),
			(t =
				ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList()) ||
				i.SetUIActive(!1),
			(this.E_i = new GenericLayoutNew_1.GenericLayoutNew(e, this.ADo)),
			this.E_i.RebuildLayoutByDataNew(t),
			i.SetUIActive(!0));
	}
	Clear() {
		this.E_i && this.E_i.ClearChildren(), (this.E_i = void 0);
	}
}
exports.TrainingView = TrainingView;
