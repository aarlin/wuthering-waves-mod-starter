"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreProgressView = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class ExploreProgressView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Ako = void 0),
			(this.Pko = (e, r, t) => (
				(r = new ExploreProgressItem(r)).Update(e), { Key: t, Value: r }
			)),
			(this.mIt = () => {
				UiManager_1.UiManager.CloseView("ExploreProgressView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIScrollViewWithScrollbarComponent],
		]),
			(this.BtnBindInfo = [[0, this.mIt]]);
	}
	OnStart() {
		this.Ako = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(3),
			this.Pko,
		);
	}
	OnBeforeDestroy() {
		this.Ako && (this.Ako.ClearChildren(), (this.Ako = void 0));
	}
	OnAfterShow() {
		var e = ModelManager_1.ModelManager.WorldMapModel.GetAreaExploreInfo(),
			r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.AreaId);
		(r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(r.Title)),
			this.GetText(1).SetText(r),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(2),
				"ExplorationDegree",
				e.ExplorePercent,
			),
			(r = ModelManager_1.ModelManager.WorldMapModel.GetAreaExploreInfo());
		this.Ako.RefreshByData(r.ExploreProgress);
	}
}
exports.ExploreProgressView = ExploreProgressView;
const ONEHUNDRED = 100;
class ExploreProgressItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UISprite],
		];
	}
	Update(e) {
		var r =
			ConfigManager_1.ConfigManager.WorldMapConfig.GetExploreProgressInfoById(
				e.ExploreProgressId,
			);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r.TypeName);
		let t = 0;
		e.ExplorePercent && (t = e.ExplorePercent),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ExplorationDegree", t),
			(r = MathUtils_1.MathUtils.GetFloatPointFloor(
				MathUtils_1.MathUtils.SafeDivide(t, 100),
				2,
			)),
			this.GetSprite(2).SetFillAmount(r);
	}
}
