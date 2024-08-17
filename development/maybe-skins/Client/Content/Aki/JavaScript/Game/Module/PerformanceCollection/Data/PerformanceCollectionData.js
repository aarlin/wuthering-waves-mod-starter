"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PerformanceCollectionData = void 0);
const UE = require("ue"),
	ThinkDataLaunchReporter_1 = require("../../../../Launcher/ThinkDataReport/ThinkDataLaunchReporter"),
	GlobalData_1 = require("../../../GlobalData");
class PerformanceCollectionData {
	constructor() {
		(this.Name = ""),
			(this.AreaId = 0),
			(this.ClientVersion = ""),
			(this.PlayerId = 0),
			(this.Average = 0),
			(this.Max = 0),
			(this.MaxInfo = void 0),
			PerformanceCollectionData.E3i ||
				((PerformanceCollectionData.E3i = UE.GameplayStatics.GetPlatformName()),
				GlobalData_1.GlobalData.IsPlayInEditor &&
					(PerformanceCollectionData.E3i += "_Editor")),
			(this.Platform = PerformanceCollectionData.E3i),
			(this.ClientVersion =
				ThinkDataLaunchReporter_1.ThinkDataLaunchReporter.ClientVersion);
	}
}
exports.PerformanceCollectionData = PerformanceCollectionData;
