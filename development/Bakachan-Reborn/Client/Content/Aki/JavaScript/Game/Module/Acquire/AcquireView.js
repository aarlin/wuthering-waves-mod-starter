"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AcquireView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
	NumberSelectComponent_1 = require("../Common/NumberSelect/NumberSelectComponent"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
class AcquireView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.OGe = void 0),
			(this.kGe = void 0),
			(this.FGe = void 0),
			(this.VGe = void 0),
			(this.HGe = void 0),
			(this.jGe = void 0),
			(this.WGe = void 0),
			(this.KGe = (e) => {
				var t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"UseCount",
					);
				return new LguiUtil_1.TableTextArgNew(t, e);
			}),
			(this.QGe = (e) => {
				0 < this.jGe.GetRemainItemCount()
					? this.jGe.SetAmount(e)
					: this.jGe.SetAmount(0);
			}),
			(this.XGe = () => {
				this.ChildPopView?.HidePopView();
			}),
			(this.$Ge = (e) => {
				("CommonRewardView" !== e &&
					"CompositeRewardView" !== e &&
					"ExploreRewardView" !== e) ||
					this.ChildPopView?.ShowPopView();
			}),
			(this.bl = (e) => {
				e.GetRemainItemCount() <= 0
					? this.CloseMe()
					: ((this.jGe = e),
						(e = this.jGe.GetItemData()),
						this.kGe.RefreshByData(e),
						this.RefreshButtonState(),
						this.YGe(),
						this.WGe.Refresh(this.jGe.GetRemainItemCount()));
			}),
			(this.JGe = (e, t, i) => {
				var o = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
				return o.Initialize(t.GetOwner()), o.Refresh(e), { Key: i, Value: o };
			}),
			(this.YGe = () => {
				this.zGe(), this.ZGe();
			}),
			(this.eNe = () => {
				this.CloseMe();
			}),
			(this.tNe = () => {
				var e = this.jGe.GetLeftButtonFunction();
				e ? e() : this.eNe();
			}),
			(this.iNe = () => {
				var e = this.jGe.GetRightButtonFunction();
				e ? e() : this.eNe();
			}),
			(this.oNe = () => {
				this.eNe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIButtonComponent],
			[10, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[4, this.iNe],
				[3, this.tNe],
				[8, this.oNe],
				[9, this.tNe],
			]);
	}
	rNe() {
		this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
			this.GetItem(10),
		);
		var e = {
			MaxNumber: this.jGe.GetMaxAmount(),
			GetExchangeTableText: this.KGe,
			ValueChangeFunction: this.QGe,
		};
		this.WGe.Init(e);
	}
	OnStart() {
		(this.jGe = this.OpenParam),
			(this.OGe = this.GetText(5)),
			(this.VGe = this.GetText(7)),
			(this.HGe = this.GetText(2)),
			this.rNe(),
			(this.kGe = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(0),
				this.JGe,
			));
		var e = this.jGe.GetItemData();
		this.kGe.RefreshByData(e), this.RefreshButtonState(), this.YGe();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RefreshAcquireView,
			this.bl,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnShowRewardView,
				this.XGe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RefreshAcquireView,
			this.bl,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnShowRewardView,
				this.XGe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			);
	}
	RefreshButtonState() {
		var e = this.jGe.GetLeftButtonFunction(),
			t = this.jGe.GetRightButtonFunction(),
			i = this.GetButton(3),
			o = this.GetButton(4),
			n = this.GetButton(8),
			s = this.GetButton(9);
		e || t
			? ((e = this.jGe.GetAcquireViewType()),
				o.RootUIComp.SetUIActive(!0),
				n.RootUIComp.SetUIActive(!1),
				2 === e
					? (s.RootUIComp.SetUIActive(!0), i.RootUIComp.SetUIActive(!1))
					: (s.RootUIComp.SetUIActive(!1), i.RootUIComp.SetUIActive(!0)),
				o.RootUIComp.SetUIActive(!0),
				n.RootUIComp.SetUIActive(!1))
			: (i.RootUIComp.SetUIActive(!1),
				o.RootUIComp.SetUIActive(!1),
				s.RootUIComp.SetUIActive(!1),
				n.RootUIComp.SetUIActive(!0));
	}
	zGe() {
		var e = 0 === this.jGe.GetAcquireViewType();
		this.OGe.SetUIActive(e),
			e
				? (this.OGe.SetText(this.jGe.GetNameText()),
					LguiUtil_1.LguiUtil.SetLocalText(this.HGe, "AcquireOpenCount"))
				: LguiUtil_1.LguiUtil.SetLocalText(this.HGe, "AcquireGetReward");
	}
	ZGe() {
		var e = this.jGe.GetLeftButtonTextTableId();
		LguiUtil_1.LguiUtil.SetLocalText(this.FGe, e ?? "AcquireCancel"),
			(e = this.jGe.GetRightButtonTextTableId());
		LguiUtil_1.LguiUtil.SetLocalText(this.VGe, e ?? "AcquireConfirm");
	}
	OnBeforeDestroy() {
		var e = this.jGe.GetMidButtonFunction();
		e && e(),
			ModelManager_1.ModelManager.InventoryModel.SetAcquireData(void 0),
			(this.OGe = void 0),
			this.kGe.ClearChildren(),
			(this.kGe = void 0),
			(this.FGe = void 0),
			(this.VGe = void 0),
			(this.HGe = void 0),
			(this.jGe = void 0);
	}
}
exports.AcquireView = AcquireView;
