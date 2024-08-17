"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardExploreScore = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreScore extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.F7e = void 0),
			(this.yPr = void 0),
			(this.VOe = () => new ScoreItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.yPr = new NewRecordItem()),
			await this.yPr.CreateByActorAsync(this.GetItem(1).GetOwner()),
			this.yPr.SetActive(!0);
	}
	OnStart() {
		var e = this.GetScrollViewWithScrollbar(0);
		this.F7e = new GenericLayout_1.GenericLayout(
			e.GetContent().GetComponentByClass(UE.UILayoutBase.StaticClass()),
			this.VOe,
		);
	}
	OnBeforeDestroy() {}
	Refresh(e) {
		this.F7e?.RefreshByData(e.TargetReached), this.yPr?.Refresh(e);
	}
}
exports.RewardExploreScore = RewardExploreScore;
class ScoreItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0);
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, t) {}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = []);
	}
	Refresh(e, t, i) {
		this.C4e(e), this.Pqe(e);
	}
	C4e(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.DescriptionTextId);
	}
	Pqe(e) {
		this.GetText(2)?.SetText(e.Target[0]);
	}
}
class NewRecordItem extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = []);
	}
	Refresh(e) {
		this.mGe(e), this.IPr(e), this.D0i(e.IfNewRecord);
	}
	mGe(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.RecordTextId);
	}
	IPr(e) {
		this.GetText(1)?.SetText(e.FullScore.toString());
	}
	D0i(e) {
		this.GetItem(2)?.SetUIActive(e);
	}
}
