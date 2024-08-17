"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiSetModel = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	BattleUiSetController_1 = require("./BattleUiSetController"),
	BattleUiSetDefine_1 = require("./BattleUiSetDefine"),
	BattleUiSetPanelData_1 = require("./BattleUiSetPanelData"),
	BattleUiSetPanelItemData_1 = require("./BattleUiSetPanelItemData");
class BattleUiSetModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Zdt = new Map()),
			(this.eCt = new Map()),
			(this.SelectedPanelItemData = void 0),
			(this.tCt = new Map()),
			(this.MinTouchMoveDifference = 0),
			(this.MaxTouchMoveDifference = 0),
			(this.MaxTouchMoveValue = 0),
			(this.MinTouchMoveValue = 0),
			(this.ControlScaleRate = 0);
	}
	OnInit() {
		var e = ConfigManager_1.ConfigManager.BattleUiSetConfig;
		for (
			let o = BattleUiSetDefine_1.PANEL_MIN_INDEX;
			o < BattleUiSetDefine_1.PANEL_MAX_INDEX;
			o++
		) {
			var t = [];
			for (const i of e.GetMobileBattleUiSetConfigList(o)) {
				var a = i.Id,
					n = new BattleUiSetPanelItemData_1.BattleUiSetPanelItemData(
						i.ItemIndex,
						i,
					);
				t.push(n), this.eCt.set(a, n);
			}
			var i = new BattleUiSetPanelData_1.BattleUiSetPanelData(o, t);
			this.Zdt.set(o, i);
		}
		return (
			(this.MinTouchMoveDifference =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MinTouchMoveDifference",
				)),
			(this.MaxTouchMoveDifference =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MaxTouchMoveDifference",
				)),
			(this.MaxTouchMoveValue =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"MaxTouchMoveValue",
				)),
			(this.MinTouchMoveValue =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"MinTouchMoveValue",
				)),
			(this.ControlScaleRate =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"ControlScaleRate",
				)),
			!0
		);
	}
	OnClear() {
		return (
			this.Zdt.clear(), this.eCt.clear(), !(this.SelectedPanelItemData = void 0)
		);
	}
	GetPanelDataMap() {
		return this.Zdt;
	}
	GetPanelItemDataMap() {
		return this.eCt;
	}
	GetPanelItemDataByConfigId(e) {
		return this.eCt.get(e);
	}
	SetPanelItemSelected(e) {
		e &&
			e.CanEdit &&
			((this.SelectedPanelItemData = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSelectedEditPanelItem,
				this.SelectedPanelItemData,
			));
	}
	ResetSettings() {
		for (const e of this.GetPanelItemDataMap().values())
			(e.EditSize = e.SourceSize),
				(e.EditAlpha = e.SourceAlpha),
				(e.EditOffsetX = e.SourceOffsetX),
				(e.EditOffsetY = e.SourceOffsetY),
				(e.EditorHierarchyIndex = e.SourceHierarchyIndex);
	}
	SaveSettings() {
		var e = [];
		for (const l of this.GetPanelItemDataMap().values()) {
			var t = l.EditSize,
				a = l.EditAlpha,
				n = l.EditOffsetX,
				i = l.EditOffsetY,
				o = l.EditorHierarchyIndex,
				r = { Ekn: l.ConfigId, x3n: t, P3n: a, B3n: n, w3n: i, b3n: o, q3n: 0 };
			(l.Size = t),
				(l.Alpha = a),
				(l.OffsetX = n),
				(l.OffsetY = i),
				(l.HierarchyIndex = o),
				e.push(r);
		}
		BattleUiSetController_1.BattleUiSetController.MobileButtonSettingUpdateRequest(
			e,
		);
	}
	ReInitSettings() {
		for (const e of this.GetPanelItemDataMap().values()) e.ReInit();
	}
	AddTouchFingerData(e) {
		var t = e.GetFingerIndex();
		this.tCt.set(t, e);
	}
	RemoveTouchFingerData(e) {
		(e = e.GetFingerIndex()), this.tCt.delete(e);
	}
	GetTouchFingerDataCount() {
		return this.tCt.size;
	}
	GetTouchFingerData(e) {
		return this.tCt.get(e);
	}
}
exports.BattleUiSetModel = BattleUiSetModel;
