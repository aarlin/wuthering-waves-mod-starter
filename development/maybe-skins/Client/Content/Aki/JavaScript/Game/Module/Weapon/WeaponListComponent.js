"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponListComponent = void 0);
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew"),
	WeaponItemSmallItemGrid_1 = require("./WeaponItemSmallItemGrid");
class WeaponListComponent {
	constructor() {
		(this.TOi = void 0),
			(this.xqe = void 0),
			(this.DOo = void 0),
			(this.InitWeaponItem = () => {
				var e = new WeaponItemSmallItemGrid_1.WeaponItemSmallItemGrid();
				return (
					e.BindOnExtendToggleStateChanged(this.I6e),
					e.BindOnCanExecuteChange(this.d4e),
					e
				);
			}),
			(this.d4e = (e, t, i) => this.GetCurSelectedData() !== e),
			(this.I6e = (e) => {
				1 === e.State &&
					(e = e.MediumItemGrid) instanceof
						WeaponItemSmallItemGrid_1.WeaponItemSmallItemGrid &&
					this.ROo(e.GridIndex);
			}),
			(this.ROo = (e) => {
				this.xqe.GetGenericLayout()?.DeselectCurrentGridProxy(),
					this.xqe.GetGenericLayout()?.SelectGridProxy(e),
					this.DOo?.();
			});
	}
	Init(e) {
		this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
			e,
			this.InitWeaponItem,
		);
	}
	SetWeaponChangeCallBack(e) {
		this.DOo = e;
	}
	async UpdateDataList(e) {
		(this.TOi = e),
			this.xqe.SetActive(1 < e.length),
			await this.xqe.RefreshByDataAsync(this.TOi);
	}
	SetCurSelect(e) {
		var t;
		!this.TOi ||
			e < 0 ||
			e >= this.TOi.length ||
			e === this.xqe.GetGenericLayout().GetSelectedGridIndex() ||
			((t = this.xqe.GetScrollItemByIndex(e)) &&
				(t?.SetSelected(!0), this.ROo(e)));
	}
	GetCurSelectedData() {
		var e = this.xqe.GetGenericLayout().GetSelectedGridIndex();
		if (!(!this.TOi || e < 0 || e >= this.TOi.length)) return this.TOi[e];
	}
	CancelSelect() {
		this.xqe.GetGenericLayout()?.DeselectCurrentGridProxy();
	}
}
exports.WeaponListComponent = WeaponListComponent;
