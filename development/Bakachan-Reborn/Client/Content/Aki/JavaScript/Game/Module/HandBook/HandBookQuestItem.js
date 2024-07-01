"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookQuestItem = void 0);
const UE = require("ue"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	HandBookDefine_1 = require("./HandBookDefine"),
	HandBookQuestChildItem_1 = require("./HandBookQuestChildItem");
class HandBookQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.Vzt = void 0),
			(this.GAn = []),
			(this.gZt = []),
			(this.Wzt = () => new HandBookQuestChildItem_1.HandBookQuestChildItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIGridLayout],
		];
	}
	OnStart() {
		this.Vzt = new GenericLayout_1.GenericLayout(
			this.GetGridLayout(1),
			this.Wzt,
		);
	}
	Refresh(e, t, o) {
		var i = e,
			n =
				((e = i.Id),
				(e =
					ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
						e,
					)),
				(this.GAn = ConfigCommon_1.ConfigCommon.ToList(e)),
				this.GAn.sort((e, t) => e.Id - t.Id),
				this.GetText(0).ShowTextNew(i.TypeDescription),
				(this.gZt = []),
				this.GAn.length);
		for (let e = 0; e < n; e++) {
			var r = this.GAn[e],
				s = new HandBookDefine_1.HandBookCommonItemData(),
				a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
					i.Type,
					r.Id,
				),
				d = void 0 === a;
			d ||
				((a = void 0 !== a && !a.IsRead),
				(s.ConfigId = r.Id),
				(s.Config = r),
				(s.IsLock = d),
				(s.IsNew = a),
				this.gZt.push(s));
		}
		this.Vzt?.SetActive(0 < this.gZt.length), this.Vzt?.RefreshByData(this.gZt);
	}
	GetChildItemList() {
		return this.Vzt.GetLayoutItemList();
	}
	OnBeforeDestroy() {
		this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
			(this.GAn = []),
			(this.gZt = []);
	}
}
exports.HandBookQuestItem = HandBookQuestItem;
