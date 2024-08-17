"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonConditionFilterComponent = void 0);
const UE = require("ue"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiNavigationView_1 = require("../../UiNavigation/UiNavigationView"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LevelSequencePlayer_1 = require("../LevelSequencePlayer"),
	CommonConditionFilterItem_1 = require("./CommonConditionFilterItem");
class CommonConditionFilterComponent extends UiNavigationView_1.UiNavigationView {
	constructor(e, t) {
		super(),
			(this.ConditionFunction = t),
			(this.Layout = void 0),
			(this.LevelSequencePlayer = void 0),
			(this.WIt = () => {
				UiLayer_1.UiLayer.SetShowMaskLayer(
					"CommonConditionFilterComponent",
					!0,
				),
					this.LevelSequencePlayer.PlayLevelSequenceByName("hide");
			}),
			(this.KIt = (e) => {
				"hide" === e &&
					(this.SetActive(!1),
					UiLayer_1.UiLayer.SetShowMaskLayer(
						"CommonConditionFilterComponent",
						!1,
					));
			}),
			(this.sGe = (e, t, o) => (
				(t = new CommonConditionFilterItem_1.CommonConditionFilterItem(
					t,
					e,
				)).SetToggleFunction(this.U4e),
				{ Key: o, Value: t }
			)),
			(this.U4e = (e, t) => {
				this.ResetComponent(),
					this.SetActive(!1),
					this.ConditionFunction && this.ConditionFunction(e, t);
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIVerticalLayout],
		]),
			(this.BtnBindInfo = [[0, this.WIt]]);
	}
	OnStart() {
		(this.Layout = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetVerticalLayout(2),
			this.sGe,
		)),
			(this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			)),
			this.LevelSequencePlayer.BindSequenceCloseEvent(this.KIt);
	}
	RefreshQualityList(e) {
		this.Layout.RebuildLayoutByDataNew(e),
			this.Layout.GetLayoutItemByKey(0).SetToggleState(!0);
	}
	ResetComponent() {
		for (const e of this.Layout.GetLayoutItemMap().values())
			e.SetToggleState(!1, !1);
	}
	OnBeforeDestroy() {
		this.Layout && (this.Layout.ClearChildren(), (this.Layout = void 0));
	}
	UpdateComponent(e) {
		this.SetActive(!0);
		for (const t of this.Layout.GetLayoutItemMap().values())
			t.GetQualityInfo().Id === e && t.SetToggleState(!0, !1);
		this.LevelSequencePlayer.PlayLevelSequenceByName("show");
	}
}
exports.CommonConditionFilterComponent = CommonConditionFilterComponent;
