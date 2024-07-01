"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotCameraTemplateConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	FlowTemplateDataById_1 = require("../../../Core/Define/ConfigQuery/FlowTemplateDataById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PlotCameraTemplateConfig extends ConfigBase_1.ConfigBase {
	GetCameraTemplateConfig(e) {
		var o = FlowTemplateDataById_1.configFlowTemplateDataById.GetConfig(e, !1);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Plot", 43, "找不到相机模板配置", [
						"CameraTemplate ID",
						e,
					])),
			o
		);
	}
}
exports.PlotCameraTemplateConfig = PlotCameraTemplateConfig;
