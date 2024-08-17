"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeographyHandBookItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	GeographyHandBookChildItem_1 = require("./GeographyHandBookChildItem"),
	HandBookDefine_1 = require("./HandBookDefine"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class GeographyHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e = void 0) {
		super(),
			(this.Vzt = void 0),
			(this.CZt = []),
			(this.gZt = []),
			(this.fZt = []),
			(this.Wzt = (e, t, o) => (
				(t = new GeographyHandBookChildItem_1.GeographyHandBookChildItem(
					t,
				)).Refresh(e, !1, o),
				this.fZt.push(t),
				{ Key: o, Value: t }
			)),
			e && this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIGridLayout],
		];
	}
	Refresh(e, t, o) {
		var i = e.Id,
			r =
				((i =
					ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfigByType(
						i,
					)),
				(this.CZt = ConfigCommon_1.ConfigCommon.ToList(i)),
				this.CZt.sort((e, t) => e.Id - t.Id),
				this.GetText(0).ShowTextNew(e.TypeDescription),
				(this.gZt = []),
				this.CZt.length);
		for (let e = 0; e < r; e++) {
			var n = this.CZt[e],
				a = new HandBookDefine_1.HandBookCommonItemData(),
				s =
					void 0 ===
					(h = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
						2,
						n.Id,
					)),
				h = void 0 !== h && !h.IsRead;
			(a.Config = n), (a.IsLock = s), (a.IsNew = h), this.gZt.push(a);
		}
		(this.fZt = []),
			(this.Vzt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetGridLayout(1),
				this.Wzt,
			)),
			this.Vzt.RebuildLayoutByDataNew(this.gZt);
	}
	GetChildItemList() {
		return this.fZt;
	}
	OnBeforeDestroy() {
		this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
			(this.CZt = []),
			(this.gZt = []),
			(this.fZt = []);
	}
}
exports.GeographyHandBookItem = GeographyHandBookItem;
