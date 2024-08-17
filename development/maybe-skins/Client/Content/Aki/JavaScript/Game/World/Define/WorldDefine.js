"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VOXEL_GRID_NAME = exports.dataLayerRuntimeHLOD = void 0);
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
(exports.dataLayerRuntimeHLOD = [
	"DataLayerRuntime_GenerateHLOD",
	"DataLayerRuntime_GenerateHLOD_Middle",
	"DataLayerRuntime_GenerateHLOD_Small",
]),
	(exports.VOXEL_GRID_NAME = FNameUtil_1.FNameUtil.GetDynamicFName(
		"Grid_VoxelPartition",
	));
