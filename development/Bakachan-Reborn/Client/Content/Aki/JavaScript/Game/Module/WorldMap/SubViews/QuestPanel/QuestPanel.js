"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestPanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapDefine_1 = require("../../WorldMapDefine"),
	RewardItemBar_1 = require("../RewardItemBar"),
	TipsListView_1 = require("../TipsListView"),
	QUEST_CONDIGION_KEY = "questCondition";
class QuestPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.sOe = void 0),
			(this.$ro = void 0),
			(this.Wro = !1),
			(this.FRe = 0),
			(this.i2o = 0),
			(this.dko = void 0),
			(this.$Ut = void 0),
			(this.o2o = void 0),
			(this.r2o = void 0),
			(this.$_t = () => {
				0 !== this.i2o
					? QuestController_1.QuestNewController.RequestTrackQuest(
							this.FRe,
							!this.Wro,
							1,
							0,
							() => {
								this.ono(), this.Close();
							},
						)
					: (MapController_1.MapController.RequestTrackMapMark(
							12,
							this.dko.MarkId,
							!this.Wro,
						),
						(this.Wro = !this.Wro),
						this.ono(),
						this.Close());
			});
	}
	GetResourceId() {
		return "UiView_Task_Prefab";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos =
			WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
	}
	async OnBeforeStartAsync() {
		(this.o2o = new RewardItemBar_1.RewardItemBar()),
			(this.o2o.SkipDestroyActor = !0),
			await Promise.all([
				super.OnBeforeStartAsync(),
				this.o2o.CreateThenShowByActorAsync(this.GetItem(8).GetOwner(), !0),
			]);
	}
	OnStart() {
		this.RootItem.SetRaycastTarget(!1),
			(this.$ro = []),
			(this.sOe = []),
			(this.r2o = new TipsListView_1.TipsListView()),
			this.r2o.Initialize(this.GetVerticalLayout(5)),
			(this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
			this.$Ut.SetFunction(this.$_t);
	}
	OnBeforeDestroy() {
		for (const e of this.sOe) this.AddChild(e);
		(this.sOe.length = 0), this.o2o.Destroy(), this.r2o.Clear();
	}
	OnShowWorldMapSecondaryUi(e) {
		(this.FRe = e.TreeConfigId),
			(this.i2o = e.NodeId),
			(this.dko = e),
			this.n2o(),
			this.ono(),
			this.GetItem(2)?.SetUIActive(!1),
			this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
			this.GetItem(9).SetUIActive(!1),
			this.GetItem(12).SetUIActive(!1);
	}
	OnCloseWorldMapSecondaryUi() {
		this.r2o.Clear();
	}
	n2o() {
		var e = ModelManager_1.ModelManager.QuestNewModel;
		this.GetText(1).SetText(e.GetQuestName(this.FRe)),
			this.GetText(4).SetText(e.GetQuestDetails(this.FRe)),
			0 === this.i2o
				? this.o2o.SetActive(!1)
				: (this.o2o.SetActive(!0), this.s2o(this.FRe, this.i2o), this.hno());
	}
	s2o(e, t) {
		(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)) &&
			((e =
				GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
					e.TreeId,
					t,
				)),
			(t = this.r2o.AddItemByKey("questCondition")).SetHelpButtonVisible(!1),
			t.SetLeftText(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
					"",
			),
			t.SetRightText(e));
	}
	hno() {
		this.$ro.length = 0;
		var e =
			ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfo(
				this.FRe,
			);
		e
			? ((this.$ro = e),
				this.GetVerticalLayout(7).RootUIComp.SetUIActive(!0),
				this.o2o.RebuildRewardsByData(this.$ro))
			: this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
	}
	ono() {
		var e, t;
		0 !== this.i2o
			? (this.Wro = ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(
					this.FRe,
				))
			: ((e = this.dko.MarkId),
				(t = ModelManager_1.ModelManager.MapModel.GetCurTrackMark()),
				(this.Wro = !!t && t[1] === e)),
			this.$Ut.SetLocalText(
				this.Wro
					? "InstanceDungeonEntranceCancelTrack"
					: "InstanceDungeonEntranceTrack",
			);
	}
}
exports.QuestPanel = QuestPanel;
