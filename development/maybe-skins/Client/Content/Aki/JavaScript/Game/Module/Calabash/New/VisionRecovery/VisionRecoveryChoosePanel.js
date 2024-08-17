"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionRecoveryChoosePanel = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence"),
	CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView"),
	FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
	SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
	ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent"),
	ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
class VisionRecoveryChoosePanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.UiViewSequence = void 0),
			(this.Upt = void 0),
			(this.Apt = void 0),
			(this.hft = void 0),
			(this.aft = void 0),
			(this.Ppt = void 0),
			(this.xpt = void 0),
			(this.OnClickMask = () => {
				this.GetItem(3).SetUIActive(!1),
					this.GetButton(2).RootUIComp.SetUIActive(!1);
			}),
			(this.OnClickCloseBtn = () => {
				this.Ppt ? this.Ppt() : this.SetActive(!1);
			}),
			(this.wpt = (e, t) => {
				((e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
					e,
					t,
				)).CanClickLockButton = this.Bpt),
					this.Apt.Refresh(e),
					this.GetItem(3).SetUIActive(!0),
					this.GetButton(2).RootUIComp.SetUIActive(!0);
			}),
			(this.Bpt = (e) => {
				var t = this.Upt.GetCurrentSelectedData(),
					i = t?.length;
				for (let n = 0; n < i; n++)
					if (t[n].IncId === e)
						return (
							ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"NoLock",
							),
							!1
						);
				return !0;
			}),
			(this.bpt = (e) => {
				this.Upt.UpdateByDataList(e), this.xpt && this.xpt(e);
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
			[6, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[2, this.OnClickMask],
				[6, this.OnClickCloseBtn],
			]);
	}
	OnBeforeCreateImplement() {
		(this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
			this.AddUiBehavior(this.UiViewSequence);
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
	OnAfterShow() {
		this.OnAddEventListener();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSelectItemAdd,
			this.wpt,
		);
	}
	RefreshUi(e) {
		this.Upt.UpdateSelectableComponent(
			e.SelectableComponentType,
			e.ItemDataBaseList,
			e.SelectedDataList,
			e.SelectableComponentData,
			e.ExpData,
		),
			this.hft.SetSortToggleState(e.InitSortToggleState),
			this.UpdateFilterComponent(e.UseWayId, e.ItemDataBaseList);
	}
	UpdateFilterComponent(e, t) {
		let i = !1,
			n = !1;
		var o;
		e &&
			((o = ConfigManager_1.ConfigManager.SortConfig.GetSortId(e)) &&
				0 < o &&
				(i = !0),
			(o = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e))) &&
			0 < o &&
			(n = !0),
			this.hft.GetRootItem().SetUIActive(i),
			this.aft.GetRootItem().SetUIActive(n),
			i || n
				? (i && this.hft.UpdateData(e, t), n && this.aft.UpdateData(e, t))
				: this.Upt.UpdateByDataList(t);
	}
	BindClickCloseCallBack(e) {
		this.Ppt = e;
	}
	BindFilterSortRefresh(e) {
		this.xpt = e;
	}
	OnBeforeHide() {
		this.OnRemoveEventListener();
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSelectItemAdd,
			this.wpt,
		);
	}
	OnBeforeDestroy() {
		this.Upt.Destroy(), this.Apt.Destroy();
	}
}
exports.VisionRecoveryChoosePanel = VisionRecoveryChoosePanel;
