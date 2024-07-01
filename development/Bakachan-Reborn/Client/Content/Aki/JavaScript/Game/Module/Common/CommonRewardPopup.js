"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonRewardPopup = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	CommonItemSmallItemGrid_1 = require("./ItemGrid/CommonItemSmallItemGrid");
class CommonRewardPopup extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.FIt = void 0),
			(this.VIt = void 0),
			(this.nit = new Map()),
			(this.rOe = () => new RewardPanelItem()),
			(this.HIt = () => {
				this.SetActive(!1);
			}),
			this.CreateByResourceIdAsync("UiItem_RewardPopup", t);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIHorizontalLayout],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[3, this.HIt]]);
	}
	OnStart() {
		(this.FIt = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(0),
			this.rOe,
		)),
			this.SetActive(!1);
		for (const t of this.nit.values()) t();
	}
	OnBeforeDestroy() {
		this.FIt.ClearChildren(),
			(this.FIt = void 0),
			(this.VIt = void 0),
			this.nit.clear();
	}
	Refresh(t) {
		var e = () => {
			if (0 !== this.VIt.RewardLists.length) {
				let t = this.VIt.MountItem.GetLGUISpaceAbsolutePosition();
				void 0 !== this.VIt.PosBias && (t = t.op_Addition(this.VIt.PosBias)),
					this.GetItem(2).SetLGUISpaceAbsolutePosition(t),
					this.FIt.RefreshByDataAsync(this.VIt.RewardLists).then(() => {
						this.SetActive(!0);
					});
			}
		};
		(this.VIt = t), this.InAsyncLoading() ? this.nit.set("Refresh", e) : e();
	}
}
exports.CommonRewardPopup = CommonRewardPopup;
class RewardPanelItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments), (this.jIt = void 0), (this._Ne = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	OnStart() {
		var t = this.GetItem(0).GetOwner();
		(this._Ne = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			this._Ne.Initialize(t);
	}
	Refresh(t, e, i) {
		(this.jIt = t),
			this._Ne.RefreshByConfigId(this.jIt.Id, this.jIt.Num),
			this._Ne.SetReceivedVisible(this.jIt.Received);
	}
	OnBeforeDestroy() {
		this.jIt = void 0;
	}
}
