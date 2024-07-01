"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChipHandBookChildItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class ChipHandBookChildItem extends UiPanelBase_1.UiPanelBase {
	constructor(t = void 0) {
		super(),
			(this.Gzt = void 0),
			(this.Nzt = void 0),
			(this.RHt = !1),
			(this.Ozt = (t) => {
				this.Gzt && 1 === t && this.Gzt(this.Nzt);
			}),
			t && this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[4, UE.UIText],
			[3, UE.UIText],
			[5, UE.UISprite],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.Ozt]]);
	}
	Refresh(t, e, i) {
		this.Nzt = t;
		t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
			6,
			this.Nzt.Id,
		);
		var o =
				((this.RHt = void 0 === t),
				this.GetItem(2).SetUIActive(this.RHt),
				this.GetText(4).SetUIActive(!this.RHt),
				ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
					this.Nzt.Id,
				)),
			s =
				((o =
					(this.GetText(4).SetText(o),
					this.GetText(6).SetText(o),
					this.GetItem(7))),
				this.GetItem(8));
		t = void 0 !== t && !t.IsRead;
		s.SetUIActive(this.RHt), this.RHt ? o.SetUIActive(!1) : o.SetUIActive(t);
	}
	SetNewState(t) {
		this.GetItem(7).SetUIActive(t);
	}
	GetData() {
		return this.Nzt;
	}
	BindToggleCallback(t) {
		this.Gzt = t;
	}
	SetToggleStateForce(t, e = 0) {
		this.GetExtendToggle(0).SetToggleState(t), 1 === t && this.Gzt?.(this.Nzt);
	}
	OnBeforeDestroy() {
		(this.Gzt = void 0), (this.Nzt = void 0), (this.RHt = !1);
	}
	GetTog() {
		return this.GetExtendToggle(0);
	}
}
exports.ChipHandBookChildItem = ChipHandBookChildItem;
