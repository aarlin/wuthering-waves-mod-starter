"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemSelectView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	CommonItemSelectView_1 = require("./CommonItemSelectView"),
	FilterEntrance_1 = require("./FilterSort/Filter/View/FilterEntrance"),
	SortEntrance_1 = require("./FilterSort/Sort/View/SortEntrance"),
	ItemTipsComponent_1 = require("./ItemTips/ItemTipsComponent"),
	ItemTipsUtilTool_1 = require("./ItemTips/ItemTipsUtilTool");
class ItemSelectView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Upt = void 0),
			(this.Apt = void 0),
			(this.hft = void 0),
			(this.aft = void 0),
			(this.OnClickMask = () => {
				this.GetItem(3).SetUIActive(!1), this.CloseMe();
			}),
			(this.wpt = (t, e) => {
				((t = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
					t,
					e,
				)).CanClickLockButton = this.Bpt),
					this.Apt.Refresh(t),
					this.GetItem(3).SetUIActive(!0);
			}),
			(this.Bpt = (t) => {
				var e = this.Upt.GetCurrentSelectedData(),
					i = e?.length;
				for (let n = 0; n < i; n++)
					if (e[n].IncId === t)
						return (
							ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"NoLock",
							),
							!1
						);
				return !0;
			}),
			(this.bpt = (t) => {
				this.Upt.UpdateByDataList(t);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.OnClickMask]]);
	}
	async OnBeforeStartAsync() {
		(this.Apt = new ItemTipsComponent_1.ItemTipsComponent()),
			await this.Apt.CreateByActorAsync(this.GetItem(3).GetOwner());
	}
	OnStart() {
		(this.Upt = new CommonItemSelectView_1.CommonItemSelectView(
			this.GetItem(0),
		)),
			(this.hft = new SortEntrance_1.SortEntrance(this.GetItem(5), this.bpt)),
			(this.aft = new FilterEntrance_1.FilterEntrance(
				this.GetItem(4),
				this.bpt,
			));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSelectItemAdd,
			this.wpt,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSelectItemAdd,
			this.wpt,
		);
	}
	OnBeforeShow() {
		var t = this.OpenParam;
		this.Upt.UpdateSelectableComponent(
			t.SelectableComponentType,
			t.ItemDataBaseList,
			t.SelectedDataList,
			t.SelectableComponentData,
			t.ExpData,
		),
			this.hft.SetSortToggleState(t.InitSortToggleState),
			this.UpdateFilterComponent(t.UseWayId, t.ItemDataBaseList);
	}
	UpdateFilterComponent(t, e) {
		let i = !1,
			n = !1;
		var o;
		t &&
			((o = ConfigManager_1.ConfigManager.SortConfig.GetSortId(t)) &&
				0 < o &&
				(i = !0),
			(o = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(t))) &&
			0 < o &&
			(n = !0),
			this.hft.GetRootItem().SetUIActive(i),
			this.aft.GetRootItem().SetUIActive(n),
			i || n
				? (i && this.hft.UpdateData(t, e), n && this.aft.UpdateData(t, e))
				: this.Upt.UpdateByDataList(e);
	}
	OnBeforeDestroy() {
		this.Upt.Destroy(), this.Apt.Destroy();
	}
}
exports.ItemSelectView = ItemSelectView;
