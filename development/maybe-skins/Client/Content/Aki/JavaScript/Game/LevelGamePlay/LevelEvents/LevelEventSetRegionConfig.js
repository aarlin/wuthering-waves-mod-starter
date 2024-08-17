"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetRegionConfig = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	AreaMpcById_1 = require("../../../Core/Define/ConfigQuery/AreaMpcById"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetRegionConfig extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		var r;
		e.Type !== IAction_1.ERegionConfigType.Mpc
			? this.FinishExecute(!0)
			: (r = (e = AreaMpcById_1.configAreaMpcById.GetConfig(e.RegionMpcId))
						.MpcData) &&
					"None" !== r &&
					"Empty" !== r
				? ResourceSystem_1.ResourceSystem.LoadAsync(
						r,
						UE.ItemMaterialControllerMPCData_C,
						(e) => {
							e?.IsValid()
								? ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(
										e,
									)
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"LevelEvent",
										7,
										"[SetRegionConfig]: MPCData无效",
									),
								this.FinishExecute(!0);
						},
					)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelEvent",
							7,
							"[SetRegionConfig]未配置对应区域的MPCData",
							["AreaId", e.RegionId],
							["MpcData", r],
						),
					this.FinishExecute(!0));
	}
}
exports.LevelEventSetRegionConfig = LevelEventSetRegionConfig;
