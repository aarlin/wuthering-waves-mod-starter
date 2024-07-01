"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MediumItemGridDevelopRewardComponent = exports.DevelopRewardItem =
		void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
	MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class DevelopRewardItem extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	SetIsUnlock(e) {
		this.GetItem(0).SetUIActive(e), this.GetItem(1).SetUIActive(!e);
	}
}
exports.DevelopRewardItem = DevelopRewardItem;
class MediumItemGridDevelopRewardComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
	constructor() {
		super(...arguments),
			(this.eGe = void 0),
			(this.pxt = 0),
			(this.vxt = 0),
			(this.sGe = (e, t, i) => {
				const o = new DevelopRewardItem();
				return (
					o.CreateByActorAsync(t.GetOwner()).then(
						() => {
							o.SetIsUnlock(i < this.vxt), o.SetUiActive(!0);
						},
						() => {},
					),
					{ Key: i, Value: o }
				);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILayoutBase],
			[1, UE.UIItem],
		];
	}
	GetResourceId() {
		return "UiItem_ItemVisionMap";
	}
	OnActivate() {
		this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(0),
			this.sGe,
			this.GetItem(1),
		);
	}
	OnDeactivate() {
		this.eGe.ClearChildren(), (this.eGe = void 0);
	}
	OnRefresh(e) {
		e && e.IsUnlock
			? ((this.pxt = e.DevelopRewardLevel),
				(this.vxt = e.UnlockLevel),
				this.eGe.RebuildLayoutByDataNew(void 0, this.pxt),
				this.SetActive(!0))
			: this.SetActive(!1);
	}
}
exports.MediumItemGridDevelopRewardComponent =
	MediumItemGridDevelopRewardComponent;
