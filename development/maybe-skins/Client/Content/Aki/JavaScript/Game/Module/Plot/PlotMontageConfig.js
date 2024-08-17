"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotMontageConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	AbpMontageDataById_1 = require("../../../Core/Define/ConfigQuery/AbpMontageDataById"),
	MontageDataById_1 = require("../../../Core/Define/ConfigQuery/MontageDataById"),
	OverlayAbpMontageDataById_1 = require("../../../Core/Define/ConfigQuery/OverlayAbpMontageDataById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PlotMontageConfig extends ConfigBase_1.ConfigBase {
	GetPlotMontageConfig(o) {
		var e = MontageDataById_1.configMontageDataById.GetConfig(o, !1);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Plot", 43, "找不到剧情蒙太奇配置", [
						"Montage ID",
						o,
					])),
			e
		);
	}
	GetPlotAbpMontageConfig(o) {
		var e = AbpMontageDataById_1.configAbpMontageDataById.GetConfig(o, !1);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Plot", 39, "找不到剧情ABP蒙太奇配置", [
						"Montage ID",
						o,
					])),
			e
		);
	}
	GetOverlayAbpMontageConfig(o) {
		var e =
			OverlayAbpMontageDataById_1.configOverlayAbpMontageDataById.GetConfig(
				o,
				!1,
			);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Plot", 43, "找不到剧情叠加ABP蒙太奇配置", [
						"Montage ID",
						o,
					])),
			e
		);
	}
}
exports.PlotMontageConfig = PlotMontageConfig;
