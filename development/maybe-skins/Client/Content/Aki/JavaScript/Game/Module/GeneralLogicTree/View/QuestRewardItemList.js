"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestRewardItemList = void 0);
const UE = require("ue"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	QuestRewardItemGrid_1 = require("./QuestRewardItemGrid");
class QuestRewardItemList extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.wqe = void 0),
			(this.kGe = void 0),
			(this.N2t = void 0),
			(this.mkt = (e, t, r) => (
				(t = this.x$t(t)).Refresh(e, !1, r), { Key: r, Value: t }
			)),
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
			}),
			e && this.CreateThenShowByActor(e);
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
			(this.kGe = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(2),
				this.mkt,
			));
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
	x$t(e) {
		var t = new QuestRewardItemGrid_1.QuestRewardItemGrid();
		return (
			t.Initialize(e.GetOwner()),
			t.BindOnCanExecuteChange(() => !1),
			t.BindOnExtendToggleClicked(this.w$t),
			t.SetActive(!0),
			t
		);
	}
}
exports.QuestRewardItemList = QuestRewardItemList;
