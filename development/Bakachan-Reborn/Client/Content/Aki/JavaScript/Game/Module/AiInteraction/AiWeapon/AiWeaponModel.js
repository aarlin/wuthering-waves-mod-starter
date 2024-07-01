"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiWeaponModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	AiWeaponNet_1 = require("./AiWeaponNet");
class AiWeaponModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.lHe = void 0), (this._He = new Map());
	}
	OnInit() {
		var e, t;
		for ([e, t] of ((this.lHe = new AiWeaponNet_1.AiWeaponNet()),
		this.lHe.RegisterNet(),
		DataTableUtil_1.DataTableUtil.LoadAllAiWeaponSockets()))
			if (e && t) {
				var o = t.AiModelConfig,
					a = new Set();
				for (let e = 0; e < o.Num(); ++e) {
					var n = o.GetKey(e);
					a.add(n);
				}
				this._He.set(e, a);
			}
		return !0;
	}
	OnClear() {
		return this.lHe.UnRegisterNet(), !(this.lHe = void 0);
	}
	GetStaticWeaponConfig(e) {
		return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
			2,
			e.toString(),
		);
	}
	GetStaticWeaponModelConfigs(e, t) {
		return DataTableUtil_1.DataTableUtil.LoadAiWeaponSocketConfigs(
			e.toString(),
			t,
		);
	}
	GetWeaponConfigByConfigId(e, t) {
		t = t.GetComponent(0).GetPbModelConfig();
		var o = this.GetStaticWeaponModelConfigs(e, t.ModelId);
		return (
			o ||
				(Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Character",
						58,
						"Ai改变武器失败,原因Config配置错误",
						["Char", t.ModelId],
						["Item config id", e],
					)),
			o
		);
	}
	HasWeaponConfig(e, t) {
		return (
			(e = e.GetComponent(0).GetPbEntityInitData()),
			!!(e = (0, IComponent_1.getComponent)(
				e.ComponentsData,
				"WeaponComponent",
			)) &&
				((t = t.GetComponent(0).GetPbModelConfig()),
				this._He.get(e.WeaponId).has(t.ModelId))
		);
	}
	get Net() {
		return this.lHe;
	}
}
exports.AiWeaponModel = AiWeaponModel;
