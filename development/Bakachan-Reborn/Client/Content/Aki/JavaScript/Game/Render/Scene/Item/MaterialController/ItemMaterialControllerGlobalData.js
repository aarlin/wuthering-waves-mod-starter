"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class ItemMaterialControllerGlobalData extends UE.PrimaryDataAsset {
	constructor() {
		super(...arguments),
			(this.StartTime = -0),
			(this.LoopTime = -0),
			(this.EndTime = -0),
			(this.EnableBaseColorScale = !1),
			(this.BaseColorScale = void 0),
			(this.EnableAddEmissionColor = !1),
			(this.AddEmissionColor = void 0),
			(this.EnableRimLight = !1),
			(this.AddRimLightColor = void 0),
			(this.RimWidth = void 0),
			(this.RimPower = void 0),
			(this.RimMix = void 0),
			(this.EnableScanningOutline = !1),
			(this.ScanningOutlineColor = void 0),
			(this.ScanningOutlineWidth = void 0),
			(this.ScanningOutlineTexScaleOffset = void 0),
			(this.ScanningBrokenTexScaleOffset = void 0);
	}
}
exports.default = ItemMaterialControllerGlobalData;
