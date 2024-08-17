"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DestroyPreviewView = void 0);
const UE = require("ue"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	DestroyPreviewGrid_1 = require("./DestroyPreviewGrid"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	GRID_SIZE = 210,
	GRID_NORMAL_WIDTH_SIZE = 630,
	GRID_NORMAL_HEIGHT_SIZE = 525,
	layoutSize = [
		[630, 525],
		[210, 210],
		[420, 210],
		[630, 210],
		[630, 420],
		[630, 420],
		[630, 420],
	];
class DestroyPreviewView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Nci = void 0),
			(this.Oci = void 0),
			(this.kci = []),
			(this.Fci = void 0),
			(this.Vci = void 0),
			(this.Hci = !1),
			(this.jci = () => new DestroyPreviewGrid_1.DestroyPreviewGrid());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UILoopScrollViewComponent],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		var e,
			t,
			i = this.OpenParam;
		i &&
			((e = this.GetLoopScrollViewComponent(0)),
			(this.Nci = new LoopScrollView_1.LoopScrollView(
				e,
				this.GetItem(2).GetOwner(),
				this.jci,
			)),
			await this.Nci.RefreshByDataAsync(i.OriginList),
			this.Wci(i.OriginList.length, e),
			(this.kci = i.OriginList),
			(e = this.GetLoopScrollViewComponent(1)),
			(this.Oci = new LoopScrollView_1.LoopScrollView(
				e,
				this.GetItem(2).GetOwner(),
				this.jci,
			)),
			(t = 0 === i.ResultList.length),
			this.GetText(3).SetUIActive(t),
			e.RootUIComp.SetUIActive(!t),
			t ||
				(await this.Oci.RefreshByDataAsync(i.ResultList),
				this.Wci(i.ResultList.length, e)),
			(this.Hci = !t),
			(this.Fci = new ButtonItem_1.ButtonItem(this.GetItem(4))),
			this.Fci.SetFunction(() => {
				this.CloseMe();
			}),
			(this.Vci = new ButtonItem_1.ButtonItem(this.GetItem(5))),
			this.Vci.SetFunction(() => {
				this.Kci(), this.CloseMe();
			}));
	}
	OnAfterShow() {
		this.Hci && this.UiViewSequence.PlaySequence("Notice");
	}
	Wci(e, t) {
		let i = 630,
			o = 525;
		e < layoutSize.length && ((i = layoutSize[e][0]), (o = layoutSize[e][1])),
			t.RootUIComp.SetWidth(i),
			t.RootUIComp.SetHeight(o);
	}
	Kci() {
		var e = [];
		for (const i of this.kci) {
			var t = { G3n: i[0].ItemId, Q5n: i[0].IncId, I5n: i[1] };
			e.push(t);
		}
		ControllerHolder_1.ControllerHolder.InventoryController.ItemDestructRequest(
			e,
		);
	}
}
exports.DestroyPreviewView = DestroyPreviewView;
