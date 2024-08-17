"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookSuccessView = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	CommonItemSimpleGrid_1 = require("../../Common/ItemGrid/CommonItemSimpleGrid"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class CookSuccessView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.$qt = void 0),
			(this.S9 = 0),
			(this.ZGt = void 0),
			(this.dIt = () => {
				this.mIt();
			}),
			(this.mIt = () => {
				this.CloseMe();
			}),
			(this.JGe = (e, t, i) => (
				(t = new CommonItemSimpleGrid_1.CommonItemSimpleGrid(
					t.GetOwner(),
				)).RefreshItem(e[0].ItemId, e[1]),
				{ Key: i, Value: t }
			));
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIScrollViewWithScrollbarComponent],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[5, this.mIt],
				[6, this.dIt],
			]);
	}
	OnStart() {
		var e = this.OpenParam;
		(this.S9 = e.CookRewardPopType),
			(this.$qt = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(3),
				this.JGe,
			)),
			this.GetButton(5).GetRootComponent().SetUIActive(!1),
			(this.ZGt = new ExpSliderItem(this.GetItem(4)));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.FixSuccess,
			this.mIt,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.FixSuccess,
			this.mIt,
		);
	}
	OnAfterShow() {
		this.mGe(), this.bqe(), this.eNt();
	}
	mGe() {
		switch (this.S9) {
			case 1:
			case 2:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "GetItem");
		}
	}
	bqe() {
		const e = [];
		ModelManager_1.ModelManager.CookModel.GetCookItemList().forEach((t) => {
			(t = [{ IncId: 0, ItemId: t.ItemId }, t.ItemNum]), e.push(t);
		}),
			this.$qt.RefreshByData(e);
	}
	eNt() {
		switch (this.S9) {
			case 1:
				this.ZGt.SetActive(!0), this.ZGt.Update();
				break;
			case 2:
				this.ZGt.SetActive(!1);
		}
	}
	OnBeforeDestroy() {
		this.$qt.ClearChildren();
	}
}
exports.CookSuccessView = CookSuccessView;
class ExpSliderItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
		];
	}
	Update() {
		var e = ModelManager_1.ModelManager.CookModel.GetCookerInfo(),
			t = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
				ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel,
			),
			i =
				1 <
				(i = MathUtils_1.MathUtils.GetFloatPointFloor(
					e.TotalProficiencys / t,
					3,
				))
					? 1
					: i;
		this.GetSprite(0).SetFillAmount(i),
			this.GetText(1).SetText(e.AddExp.toString()),
			this.GetText(2).SetText(e.AddExp.toString()),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(2),
				"CookProgressText",
				e.TotalProficiencys,
				t,
			);
	}
}
