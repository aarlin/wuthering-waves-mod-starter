"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerEntrancePanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	InstanceDungeonEntranceConfig_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceConfig"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	TowerController_1 = require("../../../TowerDetailUi/TowerController"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapController_1 = require("../../WorldMapController"),
	WorldMapDefine_1 = require("../../WorldMapDefine"),
	RewardItemBar_1 = require("../RewardItemBar"),
	TipsListView_1 = require("../TipsListView"),
	REWARD_ID = 3331,
	TIME_KEY = "time",
	DIFFICULT_KEY = "difficult",
	SCORE_KEY = "score";
class TowerEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.dko = void 0),
			(this.$Ut = void 0),
			(this.xko = void 0),
			(this.RewardsView = void 0),
			(this.IRe = void 0),
			(this.Gko = 0),
			(this.Nko = 0),
			(this.Oko = () => {
				this.kko(this.Gko), this.Fko(this.Gko), this.$2e();
			}),
			(this.gko = () => {
				this.dko.IsLocked
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Map", 50, "追踪", ["markId", this.dko.MarkId]),
						MapController_1.MapController.RequestTrackMapMark(
							this.dko.MarkType,
							this.dko.MarkId,
							!this.dko.IsTracked,
						))
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Map", 50, "追踪", ["markId", this.dko.MarkId]),
						WorldMapController_1.WorldMapController.TryTeleport(this.dko)),
					this.Close();
			});
	}
	GetResourceId() {
		return "UiView_Map_Tower_Tip_Prefab";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos =
			WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
	}
	OnStart() {
		this.RootItem.SetRaycastTarget(!1),
			this.GetItem(14).SetUIActive(!0),
			this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
			(this.xko = new TipsListView_1.TipsListView()),
			this.xko.Initialize(this.GetVerticalLayout(5)),
			(this.RewardsView = new RewardItemBar_1.RewardItemBar()),
			this.RewardsView.SetRootActor(this.GetItem(8).GetOwner(), !0),
			(this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
			this.$Ut.SetFunction(this.gko);
	}
	OnShowWorldMapSecondaryUi(e) {
		(e =
			0 !== (this.dko = e).MarkConfig.RelativeId
				? e.MarkConfig.RelativeId
				: ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
						e.MarkConfigId,
					)),
			(e =
				ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
					e,
				)),
			(this.Gko = e),
			this.$2e(),
			this.mGe(),
			this.jqe(),
			this.Fko(e),
			this.l1i(),
			this.kko(e),
			(e = this.dko.GetAreaText()) && this.GetText(3).SetText(e),
			this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
			this.GetItem(9).SetUIActive(!1),
			this.GetItem(12).SetUIActive(!1),
			(this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
				this.Oko();
			}, TimeUtil_1.TimeUtil.InverseMillisecond)),
			(this.Nko =
				MathUtils_1.MathUtils.LongToNumber(
					ModelManager_1.ModelManager.TowerModel.TowerEndTime,
				) - TimeUtil_1.TimeUtil.GetServerTime());
	}
	mGe() {
		this.GetText(1).SetText(this.dko.GetTitleText()),
			this.GetText(4).ShowTextNew(this.dko.GetLocaleDesc());
	}
	jqe() {
		var e,
			t,
			o = [];
		for ([e, t] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
			3331,
		)?.DropPreview) {
			var i = [{ IncId: 0, ItemId: e }, t];
			o.push(i);
		}
		void 0 === o || 0 === o.length
			? this.RewardsView.SetActive(!1)
			: (this.RewardsView.SetActive(!0),
				this.RewardsView.RebuildRewardsByData(o));
	}
	kko(e) {
		var t = this.xko.AddItemByKey("difficult"),
			o = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
		t.SetHelpButtonVisible(!1),
			t.SetLeftText(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
					"",
			),
			(o =
				ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
					o,
				));
		t.SetRightText(o);
	}
	$2e() {
		var e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData(),
			t = this.xko.AddItemByKey("time"),
			o = StringUtils_1.StringUtils.Format(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"Text_ActiveRemainTime_Text",
				) ?? "",
				"",
			);
		t.SetLeftText(o),
			t.SetRightText(e.CountDownText ?? ""),
			t.SetHelpButtonVisible(!1),
			this.Nko--,
			this.Nko < 2 && TowerController_1.TowerController.RefreshTower();
	}
	Fko(e) {
		var t, o, i;
		e >= InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType.CycleTower &&
			((e = this.xko.AddItemByKey("score")),
			(t = (i = ModelManager_1.ModelManager.TowerModel).GetMaxDifficulty()),
			(o = i.GetDifficultyMaxStars(t)),
			(i = i.GetDifficultyAllStars(t)),
			e.SetHelpButtonVisible(!1),
			e.SetLeftText(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerScore") ?? "",
			),
			e.SetRightText(o + "/" + i),
			e.SetStarVisible(!0));
	}
	l1i() {
		let e = "";
		(e = this.dko.IsLocked
			? this.dko.IsTracked
				? "InstanceDungeonEntranceCancelTrack"
				: "InstanceDungeonEntranceTrack"
			: "TeleportFastMove"),
			this.$Ut.SetLocalText(e);
	}
	OnCloseWorldMapSecondaryUi() {
		this.xko.Clear(),
			this.IRe &&
				TimerSystem_1.TimerSystem.Has(this.IRe) &&
				TimerSystem_1.TimerSystem.Remove(this.IRe);
	}
	OnBeforeDestroy() {
		this.$Ut.Destroy(), this.RewardsView.Destroy(), this.xko.Clear();
	}
}
exports.TowerEntrancePanel = TowerEntrancePanel;
