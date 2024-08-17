"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardItemList = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	RewardSmallItemGrid_1 = require("./RewardSmallItemGrid"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RewardItemList extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.wqe = void 0),
			(this.kGe = void 0),
			(this.N2t = void 0),
			(this.mkt = () => this.P0i()),
			(this.w$t = (e) => {
				this.N2t?.SetSelected(!1, !0), (this.N2t = e.MediumItemGrid);
				var t = (e = e.Data).ConfigId;
				void 0 !== (e = e.UniqueId) && 0 < e
					? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(
							e,
							t,
						)
					: ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
							t,
						);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIScrollViewWithScrollbarComponent],
		]),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		(this.wqe = this.GetItem(1)),
			this.wqe.SetUIActive(!1),
			(this.kGe = new GenericScrollViewNew_1.GenericScrollViewNew(
				this.GetScrollViewWithScrollbar(2),
				this.mkt,
			));
	}
	OnBeforeDestroy() {
		(this.N2t = void 0), (this.kGe = void 0);
	}
	Refresh(e) {
		e.sort((e, t) => {
			var r = e.GetTypeSortIndex(),
				i = t.GetTypeSortIndex();
			return r !== i
				? i - r
				: (i = e.GetQualityId()) !== (r = t.GetQualityId())
					? r - i
					: e.ConfigId - t.ConfigId;
		}),
			this.kGe.RefreshByData(e);
	}
	P0i() {
		var e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
		return (
			e.BindOnCanExecuteChange(() => !1),
			e.BindOnExtendToggleClicked(this.w$t),
			e
		);
	}
}
exports.RewardItemList = RewardItemList;
