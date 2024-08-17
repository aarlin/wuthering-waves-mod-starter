"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	ComposeController_1 = require("../ComposeController");
class ComposeItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.dqt = void 0),
			(this.Wgt = void 0),
			(this.UIt = (t) => {
				this.Wgt && (this.Wgt(this.dqt), this.xqt());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[6, UE.UIExtendToggle],
			[10, UE.UISprite],
			[11, UE.UITexture],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[12, UE.UIText],
		]),
			(this.BtnBindInfo = [[6, this.UIt]]);
	}
	Refresh(t, e, i) {
		(this.dqt = t),
			this.C4e(),
			this.Pqt(),
			this.Kbe(),
			this.IPt(),
			this.wqt(),
			this.xqt(),
			this.IVe(e, !1);
	}
	C4e() {
		var t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
			this.dqt.ItemId,
		);
		t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name);
		this.GetText(12).SetText(t);
	}
	Pqt() {
		switch (this.dqt.MainType) {
			case 1:
				if (35 === this.dqt.SubType)
					return void this.SetItemQualityIcon(
						this.GetSprite(10),
						this.dqt.ItemId,
					);
				break;
			case 2:
				if (37 === this.dqt.SubType)
					return void this.SetItemQualityIcon(
						this.GetSprite(10),
						this.dqt.ItemId,
					);
		}
		var t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
			this.dqt.ItemId,
		);
		this.SetItemQualityIcon(this.GetSprite(10), t.ItemId);
	}
	Kbe() {
		switch (this.dqt.MainType) {
			case 1:
			case 2:
				if (0 === this.dqt.SubType)
					return (
						(t =
							ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
								this.dqt.ItemId,
							)),
						void this.SetItemIcon(this.GetTexture(11), t.ItemId)
					);
				this.SetItemIcon(this.GetTexture(11), this.dqt.ItemId);
				break;
			case 3:
				var t =
					ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
						this.dqt.ItemId,
					);
				this.SetItemIcon(this.GetTexture(11), t.ItemId);
		}
	}
	IPt() {
		switch (this.dqt.MainType) {
			case 1:
			case 2:
				this.GetItem(7).SetUIActive(!1);
				break;
			case 3:
				var t = this.dqt;
				this.GetItem(7).SetUIActive(!t.IsUnlock);
		}
	}
	wqt() {
		switch (this.dqt.MainType) {
			case 1:
				35 === (t = this.dqt).SubType
					? this.GetItem(8).SetUIActive(!1)
					: ((t =
							ComposeController_1.ComposeController.CheckCanReagentProduction(
								t.ItemId,
							)),
						this.GetItem(8).SetUIActive(!t));
				break;
			case 2:
				var t;
				37 === (t = this.dqt).SubType
					? this.GetItem(8).SetUIActive(!1)
					: ((t = ComposeController_1.ComposeController.CheckCanStructure(
							t.ItemId,
						)),
						this.GetItem(8).SetUIActive(!t));
				break;
			case 3:
				(t = this.dqt),
					0 !==
					ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
						t.ItemId,
					).IsUnlock
						? ((t = ComposeController_1.ComposeController.CheckCanPurification(
								t.ItemId,
							)),
							this.GetItem(8).SetUIActive(!t))
						: this.GetItem(8).SetUIActive(!0);
		}
	}
	xqt() {
		this.GetItem(9).SetUIActive(this.dqt.IsNew);
	}
	BindOnClickedCallback(t) {
		this.Wgt = t;
	}
	OnSelected(t) {
		this.IVe(!0);
	}
	OnDeselected(t) {
		this.IVe(!1);
	}
	IVe(t, e = !0) {
		var i = this.GetExtendToggle(6);
		t ? i.SetToggleState(1, e) : i.SetToggleState(0, !1);
	}
}
exports.ComposeItem = ComposeItem;
