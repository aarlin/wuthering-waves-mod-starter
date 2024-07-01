"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreDetailView = void 0);
const UE = require("ue"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../../Ui/UiManager"),
	SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
	DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	ExploreProgressDefine_1 = require("../ExploreProgressDefine"),
	ExploreAreaDynamicItem_1 = require("./ExploreAreaDynamicItem"),
	ExploreAreaParentItem_1 = require("./ExploreAreaParentItem"),
	ExploreAreaViewData_1 = require("./ExploreAreaViewData"),
	ExploreProgressItem_1 = require("./ExploreProgressItem");
class ExploreDetailView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.nVt = void 0),
			(this.sVt = void 0),
			(this.aVt = void 0),
			(this.kGe = void 0),
			(this.hVt = -1),
			(this.lVt = (e, r, t) => {
				const o = new ExploreProgressItem_1.ExploreProgressItem();
				return (
					o.CreateByActorAsync(r.GetOwner()).then(
						() => {
							o.Refresh(e), o.SetUiActive(!0);
						},
						() => {},
					),
					{ Key: t, Value: o }
				);
			}),
			(this.P3t = () => {
				UiManager_1.UiManager.CloseView("ExploreDetailView");
			}),
			(this._Vt = () => {
				ModelManager_1.ModelManager.FunctionModel.IsOpen(10057)
					? (UiManager_1.UiManager.CloseView("ExploreDetailView"),
						SkipTaskManager_1.SkipTaskManager.Run(
							0,
							ExploreProgressDefine_1.MAP_MARK_TYPE,
							ExploreProgressDefine_1.MAP_MARK_ID,
						))
					: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"ExploreProgressRewardNotOpen",
						);
			}),
			(this.uVt = (e, r, t) => {
				var o = new ExploreAreaParentItem_1.ExploreAreaParentItem();
				return (
					o.BindOnCountrySelected(this.tVt),
					o.BindOnAreaSelected(this.iVt),
					t === this.hVt && ((this.sVt = o.ExploreAreaItem), (this.hVt = -1)),
					o
				);
			}),
			(this.tVt = (e, r, t) => {
				(r = r.CountryId),
					1 === t
						? this.cVt(r)
						: (((t =
								ModelManager_1.ModelManager
									.ExploreProgressModel).SelectedCountryId = 0),
							(t.SelectedAreaId = 0)),
					this.mVt();
			}),
			(this.iVt = (e, r, t) => {
				t && (this.dVt(r.AreaId, e), this.CVt(), this.PlaySequence("Switch"));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIDynScrollViewComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIScrollViewWithScrollbarComponent],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[6, this._Vt]]);
	}
	async OnBeforeStartAsync() {
		(this.aVt = new DynScrollView_1.DynamicScrollView(
			this.GetUIDynScrollViewComponent(1),
			this.GetItem(2),
			new ExploreAreaDynamicItem_1.ExploreAreaDynamicItem(),
			this.uVt,
		)),
			await this.aVt.Init();
	}
	OnStart() {
		(this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.nVt.SetCloseCallBack(this.P3t),
			(this.kGe = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(4),
				this.lVt,
			)),
			this.cVt(ModelManager_1.ModelManager.AreaModel.GetAreaCountryId()),
			this.mVt(),
			this.sVt || this.CVt();
	}
	OnBeforeDestroy() {
		this.nVt?.Destroy(),
			(this.nVt = void 0),
			this.aVt?.ClearChildren(),
			(this.aVt = void 0),
			this.kGe?.ClearChildren(),
			(this.kGe = void 0);
	}
	dVt(e, r) {
		r &&
			(this.sVt?.SetSelected(!1),
			(this.sVt = r).SetSelected(!0),
			(ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId = e));
	}
	cVt(e) {
		var r,
			t = ModelManager_1.ModelManager.ExploreProgressModel;
		e <= 0 &&
			((t.SelectedCountryId = ExploreProgressDefine_1.DEFAULT_COUNTRY_ID),
			(r = t.GetExploreCountryData(e).GetExploreAreaDataList()[0]),
			(t.SelectedAreaId = r.AreaId)),
			(t.SelectedCountryId = e),
			(t.SelectedAreaId =
				ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
					ExploreProgressDefine_1.AREA_LEVEL,
				));
	}
	mVt() {
		var e = [],
			r = this.gVt(e);
		e[r] ? (this.aVt.RefreshByData(e), (this.hVt = r)) : (this.sVt = void 0);
	}
	gVt(e) {
		var r = ModelManager_1.ModelManager.ExploreProgressModel;
		let t = 0;
		for (const n of ModelManager_1.ModelManager.ExploreProgressModel.GetExploreCountryDataMap().values())
			if (!(n.GetAreaSize() <= 0)) {
				var o = n.CountryId;
				if (
					((l = new ExploreAreaViewData_1.ExploreAreaViewData()).RefreshCountry(
						o,
						n.GetNameId(),
						!1,
					),
					e.push(l),
					o === r.SelectedCountryId)
				) {
					var a, i, l;
					(l = n.GetExploreAreaDataList()).sort((e, r) => {
						var t = e.GetSortIndex(),
							o = r.GetSortIndex();
						return 0 !== t && 0 !== o && t !== o ? t - o : e.AreaId - r.AreaId;
					});
					for (const o of l)
						o.GetAllExploreAreaItemData().length <= 0 ||
							((a = o.AreaId),
							(i = new ExploreAreaViewData_1.ExploreAreaViewData()).RefreshArea(
								a,
								o.GetNameId(),
								o.GetProgress(),
							),
							e.push(i),
							r.SelectedAreaId === a && (t = e.length - 1));
				}
			}
		return t;
	}
	CVt() {
		var e,
			r = (e = ModelManager_1.ModelManager.ExploreProgressModel).SelectedAreaId;
		(e = e.GetExploreAreaData(r)) &&
			this.kGe.RefreshByData(e.GetAllExploreAreaItemData());
	}
}
exports.ExploreDetailView = ExploreDetailView;
