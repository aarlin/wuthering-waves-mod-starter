"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AoiModel = void 0);
const UE = require("ue"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase");
class AoiModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.hvr = void 0), (this.lvr = void 0);
	}
	get MinCoordinate() {
		return this.hvr;
	}
	set MinCoordinate(e) {
		this.hvr = e;
	}
	get MaxCoordinate() {
		return this.lvr;
	}
	set MaxCoordinate(e) {
		this.lvr = e;
	}
	OnInit() {
		return (this.hvr = new UE.Vector()), (this.lvr = new UE.Vector()), !0;
	}
	OnClear() {
		return (this.hvr = void 0), !(this.lvr = void 0);
	}
	OnLeaveLevel() {
		return !0;
	}
}
exports.AoiModel = AoiModel;
