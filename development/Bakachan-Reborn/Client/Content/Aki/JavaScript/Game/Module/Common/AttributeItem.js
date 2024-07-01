"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AttributeItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class AttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.NextItem = void 0),
			(this.qte = ""),
			(this.xe = 0),
			(this.Fyt = !1);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UIItem],
		];
	}
	OnStart() {
		(this.NextItem = this.GetItem(2)), this.NextItem?.SetUIActive(!1);
	}
	InitCommon() {
		var t =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					this.xe,
				),
			e = (this.GetText(0)?.ShowTextNew(t.Name), this.GetTexture(4));
		e && this.SetTextureByPath(t.Icon, e);
	}
	UpdateParam(t, e) {
		(this.xe = t), (this.Fyt = e), this.InitCommon();
	}
	SetCurrentValue(t) {
		(t =
			ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
				this.xe,
				t,
				this.Fyt,
			)),
			(this.qte = t),
			this.GetText(1)?.SetText(this.qte);
	}
	SetNextValue(t) {
		(t =
			ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
				this.xe,
				t,
				this.Fyt,
			)),
			this.qte && this.qte === t
				? this.SetNextItemActive(!1)
				: this.GetText(3)?.SetText(t);
	}
	SetNextItemActive(t) {
		this.NextItem?.SetUIActive(t), this.GetText(3).SetUIActive(t);
	}
	GetAttributeId() {
		return this.xe;
	}
	SetBgActive(t) {
		var e = this.GetItem(5);
		e && e.SetUIActive(t);
	}
	RefreshNameByAnotherName() {
		var t =
			ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
				this.xe,
			);
		this.GetText(0)?.ShowTextNew(t.AnotherName);
	}
	Refresh(t, e, r) {
		this.UpdateParam(t.Id, t.IsRatio),
			this.SetCurrentValue(t.CurValue),
			this.SetNextItemActive(t.ShowNext),
			t.NextValue && this.SetNextValue(t.NextValue),
			t.UseAnotherName && this.RefreshNameByAnotherName(),
			this.SetBgActive(t.BgActive);
	}
}
exports.AttributeItem = AttributeItem;
