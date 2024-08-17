"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SubLevelLoadingModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ModelManager_1 = require("../../Manager/ModelManager");
class SubLevelLoadingModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.Uyo = 0), (this.Ayo = !1);
	}
	get ScreenEffect() {
		return this.Uyo;
	}
	set ScreenEffect(e) {
		this.Uyo = e;
	}
	get LoadSubLeveling() {
		return this.Ayo;
	}
	set LoadSubLeveling(e) {
		this.Ayo = e;
	}
	OnClear() {
		return (
			(this.Uyo = 0),
			(ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0),
			!(this.Ayo = !1)
		);
	}
}
exports.SubLevelLoadingModel = SubLevelLoadingModel;
