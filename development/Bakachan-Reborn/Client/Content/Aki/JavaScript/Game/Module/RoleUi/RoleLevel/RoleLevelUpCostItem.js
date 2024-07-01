"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleLevelUpCostItem = void 0);
const UE = require("ue"),
	LongPressButtonItem_1 = require("../../Common/Button/LongPressButtonItem"),
	ItemGridVariantSelect_1 = require("../../Common/ItemGrid/ItemGridVariantSelect"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleLevelUpCostItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t = void 0, e, o, i, s, r = void 0) {
		super(),
			(this.N_o = e),
			(this.O_o = o),
			(this.x_o = i),
			(this.w_o = s),
			(this.BelongView = r),
			(this.Jwt = void 0),
			(this.k_o = void 0),
			(this.F_o = void 0),
			t && this.CreateThenShowByActor(t.GetOwner());
	}
	V_o() {
		return this.Jwt.GetConfigId();
	}
	Refresh(t, e, o) {
		this.RefreshBySelectedData(t);
	}
	OnStart() {
		(this.Jwt = new ItemGridVariantSelect_1.ItemGridVariantSelect(
			this.RootItem.GetOwner(),
			void 0,
			this.BelongView,
		)),
			(this.k_o = new LongPressButtonItem_1.LongPressButtonItem(
				this.Jwt.GetClickToggle(),
				1,
				() => {
					this.N_o?.(this.V_o());
				},
			)),
			this.k_o.SetTickConditionDelegate(() => this.x_o?.(this.V_o()) ?? !1),
			(this.F_o = new LongPressButtonItem_1.LongPressButtonItem(
				this.Jwt.GetReduceButton(),
				1,
				() => {
					this.O_o?.(this.V_o());
				},
			)),
			this.F_o.SetTickConditionDelegate(() => this.w_o?.(this.V_o()) ?? !1),
			this.Jwt.SetToggleClickEvent((t, e) => {
				this.Jwt.GetClickToggle().SetToggleState(0, !1);
			}),
			this.Jwt.GetAddButton().RootUIComp.SetUIActive(!1),
			this.Jwt.RefreshItemShowState(!0);
	}
	RefreshBySelectedData(t) {
		this.Jwt.RefreshByItemId(t.ItemId), this.RefreshCountBySelectedData(t);
	}
	RefreshCountBySelectedData(t) {
		var e = t.SelectedCount;
		t = t.Count;
		this.Jwt.RefreshTextDown(!0, e + "/" + t),
			this.Jwt.GetReduceButton().RootUIComp.SetUIActive(0 < e);
	}
	OnBeforeDestroy() {
		this.k_o.Clear(), this.F_o.Clear();
	}
	GetUiItemForGuide() {
		return this.Jwt?.GetClickToggle()
			?.GetOwner()
			.GetComponentByClass(UE.UIItem.StaticClass());
	}
}
exports.RoleLevelUpCostItem = RoleLevelUpCostItem;
