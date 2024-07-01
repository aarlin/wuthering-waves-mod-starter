"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemMaterialParameterCollectionController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	GlobalData_1 = require("../../../../GlobalData");
class ItemMaterialParameterCollectionController {
	static UpdateMaterialParameterCollection(e, a) {
		if (a.IsValid()) {
			var t = e.Vector;
			for (let e = 0; e < t.Num(); e++)
				UE.KismetMaterialLibrary.SetVectorParameterValue(
					GlobalData_1.GlobalData.GameInstance.GetWorld(),
					a,
					FNameUtil_1.FNameUtil.GetDynamicFName(t.GetKey(e)),
					t.Get(t.GetKey(e)),
				);
			var r = e.Scalar;
			for (let e = 0; e < r.Num(); e++)
				UE.KismetMaterialLibrary.SetScalarParameterValue(
					GlobalData_1.GlobalData.GameInstance.GetWorld(),
					a,
					FNameUtil_1.FNameUtil.GetDynamicFName(r.GetKey(e)),
					r.Get(r.GetKey(e)),
				);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Render", 33, "缺失交互物着色器参数文件");
	}
}
exports.ItemMaterialParameterCollectionController =
	ItemMaterialParameterCollectionController;
