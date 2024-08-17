"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomBattleData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	CommonComponentDefine_1 = require("../../Common/CommonComponentDefine"),
	PhantomDataBase_1 = require("./Data/PhantomDataBase"),
	PhantomBattleModel_1 = require("./PhantomBattleModel");
class PhantomBattleData extends PhantomDataBase_1.PhantomDataBase {
	constructor() {
		super(...arguments), (this.RIt = 0);
	}
	SetData(t) {
		(this.RIt = t.Q5n ?? 0),
			(this.PhantomLevel = t.fDs ?? 0),
			(this.ItemId = t.Ekn ?? 0),
			(this.PhantomExp = t.vDs ?? 0),
			(this.PhantomMainProp = t.pDs ?? []),
			(this.PhantomSubProp = t.MDs ?? []),
			(this.FetterGroupId = t.SDs ?? 0),
			(this.FuncValue = t.gDs ?? 0),
			this.SetSkinId(t.u8n ?? 0),
			this.SetIncId(this.RIt);
	}
	GetUniqueId() {
		return this.RIt;
	}
	GetMainPropArray() {
		var t = new Array();
		for (const n of this.GetPhantomMainProp()) {
			var e =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
						n.IDs,
					),
				a = new PhantomBattleModel_1.PhantomSortStruct();
			(a.PhantomPropId = e.PropId),
				(a.Value = n.gkn),
				(a.IfPercentage = e.AddType === CommonComponentDefine_1.RATIO),
				t.push(a);
		}
		return t;
	}
	GetSubPropArray() {
		var t = new Array();
		for (const o of this.GetPhantomSubProp()) {
			var e =
					ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
						o.IDs,
					),
				a =
					ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
						o.IDs,
					),
				n = new PhantomBattleModel_1.PhantomSortStruct();
			(n.PhantomPropId = e.Id),
				(n.Value = o.gkn),
				(n.IfPercentage = a.AddType === CommonComponentDefine_1.RATIO),
				t.push(n);
		}
		return t;
	}
	IsBreach() {
		return 0 < this.PhantomSubProp.length;
	}
}
exports.PhantomBattleData = PhantomBattleData;
