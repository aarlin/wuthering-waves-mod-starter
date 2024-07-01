"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreAreaParentItem = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	ExploreAreaItem_1 = require("./ExploreAreaItem"),
	ExploreCountryItem_1 = require("./ExploreCountryItem");
class ExploreAreaParentItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Data = void 0),
			(this.z5t = void 0),
			(this.ExploreAreaItem = void 0),
			(this.Z5t = void 0),
			(this.eVt = void 0),
			(this.tVt = (e, t, r) => {
				this.Z5t && this.Z5t(e, t, r);
			}),
			(this.iVt = (e, t, r) => {
				this.eVt && this.eVt(e, t, r);
			}),
			(this.oVt = () => !0),
			(this.rVt = () => !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	GetUsingItem(e) {
		if (e.IsCountry) {
			return this.GetItem(0).GetOwner();
		}
		return this.GetItem(1).GetOwner();
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	OnStart() {
		(this.z5t = new ExploreCountryItem_1.ExploreCountryItem()),
			this.z5t.Initialize(this.GetItem(0)),
			(this.ExploreAreaItem = new ExploreAreaItem_1.ExploreAreaItem()),
			this.ExploreAreaItem.Initialize(this.GetItem(1));
	}
	Update(e, t) {
		var r = (this.Data = e).IsCountry;
		(r
			? (this.z5t.BindOnSelected(this.tVt),
				this.z5t.BindCanExecuteChange(this.oVt),
				this.z5t)
			: (this.ExploreAreaItem.BindOnSelected(this.iVt),
				this.ExploreAreaItem.BindCanExecuteChange(this.rVt),
				this.ExploreAreaItem)
		).Refresh(e),
			this.z5t.SetActive(r),
			this.ExploreAreaItem.SetActive(!r);
	}
	BindOnCountrySelected(e) {
		this.Z5t = e;
	}
	BindOnAreaSelected(e) {
		this.eVt = e;
	}
	ClearItem() {
		(this.Data = void 0),
			this.z5t?.Destroy(),
			(this.z5t = void 0),
			this.ExploreAreaItem?.Destroy(),
			(this.ExploreAreaItem = void 0);
	}
}
exports.ExploreAreaParentItem = ExploreAreaParentItem;
