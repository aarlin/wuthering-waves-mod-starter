"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotHandBookItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	HandBookDefine_1 = require("./HandBookDefine"),
	PlotHandBookChildItem_1 = require("./PlotHandBookChildItem");
class PlotHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e = void 0) {
		super(),
			(this.Vzt = void 0),
			(this.CZt = []),
			(this.gZt = []),
			(this.Wzt = (e, t, o) => (
				(t = new PlotHandBookChildItem_1.PlotHandBookChildItem(t)).Refresh(
					e,
					!1,
					o,
				),
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
					ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
						i,
					)),
				(this.CZt = i),
				this.GetText(0).ShowTextNew(e.TypeDescription),
				(this.gZt = []),
				this.CZt.length);
		for (let e = 0; e < r; e++) {
			var n = this.CZt[e],
				a = new HandBookDefine_1.HandBookCommonItemData(),
				s =
					void 0 ===
					(d = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
						7,
						n.Id,
					)),
				d = void 0 !== d && !d.IsRead;
			(a.Config = n), (a.IsLock = s), (a.IsNew = d), this.gZt.push(a);
		}
		(this.Vzt = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetGridLayout(1),
			this.Wzt,
		)),
			this.Vzt.RebuildLayoutByDataNew(this.gZt);
	}
	GetChildItemList() {
		return this.Vzt ? this.Vzt.GetLayoutItemList() : [];
	}
	OnBeforeDestroy() {
		(this.CZt = []), (this.gZt = []);
	}
}
exports.PlotHandBookItem = PlotHandBookItem;
