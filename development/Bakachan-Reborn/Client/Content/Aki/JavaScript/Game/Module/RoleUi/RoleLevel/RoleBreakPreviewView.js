"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CostContentItem =
		exports.LevelLayoutGrid =
		exports.RoleBreakPreviewView =
			void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RoleBreakPreviewView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.QTn = void 0),
			(this.XTn = void 0),
			(this.$Tn = void 0),
			(this.YTn = void 0),
			(this.JTn = () => {
				this.YTn.HandleClickLeft();
			}),
			(this.zTn = () => {
				this.YTn.HandleClickRight();
			}),
			(this.I4t = () => {
				this.YTn.HandleViewClosePromise(
					UiManager_1.UiManager.CloseViewAsync("RoleBreakPreviewView"),
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIHorizontalLayout],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIHorizontalLayout],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[6, this.JTn],
				[7, this.zTn],
				[8, this.I4t],
			]);
	}
	async OnBeforeStartAsync() {
		(this.YTn = this.OpenParam),
			(this.$Tn = new CostContentItem(this.YTn)),
			await this.$Tn.CreateByActorAsync(this.GetItem(5).GetOwner());
	}
	OnStart() {
		(this.QTn = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(0),
			this.YTn.CreateLevelLayoutGrid,
		)),
			(this.XTn = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(3),
				this.YTn.CreateItemLayoutGrid,
			)),
			this.YTn.BindView(this),
			this.YTn.HandleViewOnStart();
	}
	OnBeforeDestroy() {
		this.YTn.Dispose(),
			(this.YTn = void 0),
			(this.QTn = void 0),
			(this.XTn = void 0),
			(this.$Tn = void 0);
	}
	RefreshLevelLayout(e) {
		this.QTn.RefreshByData(e);
	}
	RefreshItemLayout(e) {
		this.XTn.RefreshByData(e, () => {
			this.XTn?.GetUiAnimController()?.Play();
		});
	}
	RefreshLevelContent(e) {
		this.GetText(2).SetText(e.toString());
	}
	RefreshLeftButton(e) {
		this.GetButton(6).SetSelfInteractive(e);
	}
	RefreshRightButton(e) {
		this.GetButton(7).SetSelfInteractive(e);
	}
	RefreshLevelContentItem(e) {
		this.GetItem(9).SetUIActive(e);
	}
	RefreshHasBrokenTip(e) {
		this.GetText(10).SetUIActive(e);
	}
}
exports.RoleBreakPreviewView = RoleBreakPreviewView;
class LevelLayoutGrid extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e) {
		super(),
			(this.YTn = void 0),
			(this.kqe = () => {
				this.YTn.HandleItemOnClickToggle(this.GridIndex);
			}),
			(this.YTn = e);
	}
	ZTn() {
		this.YTn = void 0;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[5, this.kqe]]);
	}
	Refresh(e, t, i) {
		this.GridIndex = i;
		var n = e.IsAvailable,
			s = e.LevelContent.toString();
		this.GetItem(0).SetUIActive(!n),
			this.GetText(1).SetText(n ? "" : s),
			this.GetItem(2).SetUIActive(n),
			this.GetText(3).SetText(n ? s : ""),
			this.GetItem(4).SetUIActive(0 !== i),
			this.GetExtendToggle(5).SetToggleState(e.IsChosen ? 1 : 0);
	}
	OnBeforeDestroy() {
		super.OnBeforeDestroy(), this.ZTn();
	}
}
exports.LevelLayoutGrid = LevelLayoutGrid;
class CostContentItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.YTn = void 0), (this.YTn = e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UITexture],
		];
	}
	OnStart() {
		this.YTn.BindCostContentItem(this), this.YTn.HandleCostContentItemOnStart();
	}
	OnBeforeDestroy() {
		this.YTn.UnbindCostContentItem(), (this.YTn = void 0);
	}
	RefreshTitle(e) {
		(e = e || ""), this.GetText(0).SetText(e);
	}
	RefreshCostNumber(e) {
		(e = e || ""), this.GetText(1).SetText(e);
	}
	RefreshMoneyIcon(e) {
		this.SetItemIcon(this.GetTexture(2), e);
	}
}
exports.CostContentItem = CostContentItem;
