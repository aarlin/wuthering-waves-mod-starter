"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfluenceSearchView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class InfluenceSearchView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.CurrentCountryId = 0),
			(this.vUt = ""),
			(this.xqe = void 0),
			(this.Pni = () => {
				this.GetInputText(0).SetText("", !0);
			}),
			(this.gpt = () => {
				this.CloseMe();
			}),
			(this.sGe = (e, t, i) => {
				if (this.CurrentCountryId === e[0]) {
					const n = new InfluenceSearchGrid(t);
					return n.UpdateGrid(e[0], e[1]), { Key: i, Value: n };
				}
				if (0 < e[1].length) {
					const n = new InfluenceSearchGrid(t);
					return n.UpdateGrid(e[0], e[1]), { Key: i, Value: n };
				}
				t.SetUIActive(!1);
			}),
			(this.xni = (e) => {
				(this.vUt = e), this.RefreshSearchResult();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITextInputComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIScrollViewWithScrollbarComponent],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[1, this.Pni],
				[4, this.gpt],
			]);
	}
	OnBeforeCreate() {
		this.CurrentCountryId = this.OpenParam;
	}
	OnStart() {
		(this.xqe = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(2),
			this.sGe,
		)),
			this.GetInputText(0).OnTextChange.Bind(this.xni);
	}
	OnAfterShow() {
		this.RefreshSearchResult();
	}
	RefreshSearchResult() {
		let e = [];
		this.vUt
			? (e =
					ModelManager_1.ModelManager.InfluenceReputationModel.GetUnLockCountry()).sort(
					(e, t) =>
						e === this.CurrentCountryId
							? -1
							: t === this.CurrentCountryId
								? 1
								: e - t,
				)
			: e.push(this.CurrentCountryId);
		var t =
				ModelManager_1.ModelManager.InfluenceReputationModel.FilterUnLockInfluenceList(
					e,
					this.vUt,
				),
			i = t.HasResult;
		this.GetItem(3).SetUIActive(!i),
			this.xqe.SetActive(i),
			i && this.xqe.RefreshByData(t.InfluenceList);
	}
	OnBeforeDestroy() {
		this.xqe.ClearChildren(), (this.xqe = void 0);
	}
}
exports.InfluenceSearchView = InfluenceSearchView;
class InfluenceSearchGrid extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.eGe = void 0),
			(this.z4t = 0),
			(this.sGe = (e, t, i) => (
				(t = new InfluenceSearchItem(t)).UpdateItem(e, this.z4t),
				{ Key: i, Value: t }
			)),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIVerticalLayout],
			[3, UE.UIItem],
		];
	}
	OnStart() {
		this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetVerticalLayout(2),
			this.sGe,
			this.GetItem(3),
		);
	}
	UpdateGrid(e, t) {
		this.z4t = e;
		(e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title),
			(e = this.GetItem(1));
		var i = 0 < t.length;
		e.SetUIActive(!i), this.eGe.RebuildLayoutByDataNew(t);
	}
	OnBeforeDestroy() {
		this.eGe.ClearChildren(), (this.eGe = void 0);
	}
}
class InfluenceSearchItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.z4t = 0),
			(this.Tni = 0),
			(this.j7e = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SearchInfluence,
					this.Tni,
					this.z4t,
				),
					UiManager_1.UiManager.CloseView("InfluenceSearchView");
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[7, this.j7e]]);
	}
	OnBeforeDestroy() {
		RedDotController_1.RedDotController.UnBindRedDot("InfluenceReward");
	}
	UpdateItem(e, t) {
		(this.Tni = e), (this.z4t = t);
		(t =
			ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
				e,
			)),
			(e = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
				t.Id,
			));
		var i =
			(this.SetTextureByPath(e.Logo, this.GetTexture(0)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
			this.GetText(2));
		e.ExtraDesc
			? (i.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.ExtraDesc))
			: i.SetUIActive(!1),
			this.Rni(t.Relation),
			this.x6e(t.Id);
	}
	Rni(e) {
		this.GetItem(3).SetUIActive(2 === e),
			this.GetItem(4).SetUIActive(3 === e),
			this.GetItem(5).SetUIActive(1 === e);
	}
	x6e(e) {
		RedDotController_1.RedDotController.BindRedDot(
			"InfluenceReward",
			this.GetItem(6),
			void 0,
			e,
		);
	}
}
