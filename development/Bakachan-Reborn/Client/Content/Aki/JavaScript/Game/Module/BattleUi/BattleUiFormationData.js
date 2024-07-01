"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiFormationData = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	GlobalData_1 = require("../../GlobalData");
class BattleUiFormationData {
	constructor() {
		(this.XKe = void 0),
			(this.EnvironmentPropertyList = []),
			(this.UiEnvironmentPropertyMap = new Map()),
			(this.gU = !1);
	}
	Init() {
		this.gU = !0;
		var t = CommonParamById_1.configCommonParamById.GetStringConfig(
			"EnvironmentPropertyInfoPath",
		);
		ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.DataTable, (t) => {
			if (this.gU && (this.XKe = t)) {
				var e = (0, puerts_1.$ref)(void 0),
					a =
						(UE.DataTableFunctionLibrary.GetDataTableRowNames(t, e),
						(0, puerts_1.$unref)(e));
				if (a) {
					var r = a.Num();
					if (!(r <= 0))
						for (let e = 0; e < r; e++) {
							var i = a.Get(e).toString(),
								o = Number(i);
							o &&
								((i = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, i)),
								this.UiEnvironmentPropertyMap.set(o, i),
								this.EnvironmentPropertyList.push(o));
						}
				}
			}
		});
	}
	OnLeaveLevel() {}
	Clear() {
		(this.gU = !1),
			(this.XKe = void 0),
			(this.EnvironmentPropertyList.length = 0),
			this.UiEnvironmentPropertyMap.clear();
	}
	GetUiEnvironmentProperty(t) {
		if (this.gU)
			return GlobalData_1.GlobalData.IsPlayInEditor
				? DataTableUtil_1.DataTableUtil.GetDataTableRow(this.XKe, t.toString())
				: this.UiEnvironmentPropertyMap.get(t);
	}
}
exports.BattleUiFormationData = BattleUiFormationData;
