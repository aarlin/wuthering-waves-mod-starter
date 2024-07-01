"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcConfigModel = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
	IGlobal_1 = require("../../../../../UniverseEditor/Interface/IGlobal"),
	PublicUtil_1 = require("../../../../Common/PublicUtil");
class NpcConfigModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.jZ = void 0);
	}
	OnInit() {
		return this.XZ(), !0;
	}
	XZ() {
		this.jZ = new Map();
		let e = (0, PublicUtil_1.getConfigPath)(
			IGlobal_1.globalConfig.MontageConfigPath,
		);
		PublicUtil_1.PublicUtil.IsUseTempData() ||
			(e = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfigTemp.MontageConfigPath,
			));
		var o = (0, puerts_1.$ref)("");
		if (
			(UE.KuroStaticLibrary.LoadFileToString(o, e),
			(o = (0, puerts_1.$unref)(o)))
		)
			for (const e of JSON.parse(o).Montages) this.jZ.set(e.Id, e);
	}
	GetMontageConfig(e) {
		return this.jZ.get(e);
	}
}
exports.NpcConfigModel = NpcConfigModel;
