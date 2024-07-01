"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneGameplayPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById"),
	ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
	MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
	MapMarkPhantomGroupByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkPhantomGroupByMarkId"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ActivityDoubleRewardController_1 = require("../../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	HelpController_1 = require("../../../Help/HelpController"),
	ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
	LevelPlay_1 = require("../../../LevelPlay/LevelPlay"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapDefine_1 = require("../../WorldMapDefine"),
	TipsListView_1 = require("../TipsListView"),
	SceneGameplayTipGrid_1 = require("./SceneGameplayTipGrid"),
	POWER_DISCOUNT_HELP_ID = 26,
	POWER_COST_KEY = "power",
	REBORN_TIME_KEY = "reborn",
	REWARD_SHARE_COUNT = "reward",
	TARGET_ITEM_SHOW_TYPE = 41;
class SceneGameplayPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.Nct = void 0),
			(this.dko = void 0),
			(this.Vko = void 0),
			(this.Hko = void 0),
			(this.jko = void 0),
			(this.Wko = void 0),
			(this.IRe = void 0),
			(this.xko = void 0),
			(this.$Ut = void 0),
			(this.a2o = void 0),
			(this.h2o = !1),
			(this.CHi = () => {
				HelpController_1.HelpController.OpenHelpById(26);
			}),
			(this.gko = () => {
				var e = this.dko.IsTracked;
				MapController_1.MapController.RequestTrackMapMark(
					this.dko.MarkType,
					this.dko.MarkId,
					!e,
				),
					this.Close();
			}),
			(this.UOe = () => {
				var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
					this.Nct.Id,
				);
				e.IsOccupied &&
					((e =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							e.QuestId,
						)),
					UiManager_1.UiManager.OpenView("QuestView", e.TreeConfigId));
			}),
			(this.l2o = () => {
				ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !0;
				var e =
					MapMarkPhantomGroupByMarkId_1.configMapMarkPhantomGroupByMarkId.GetConfig(
						this.dko.MarkId,
					);
				(ModelManager_1.ModelManager.CalabashModel.OnlyShowPhantomFetterGroupIdList =
					e.ShowRange),
					UiManager_1.UiManager.OpenView("CalabashRootView");
			}),
			(this._2o = () => {
				UiManager_1.UiManager.OpenView(
					"SilentAreaRewardPreviewPopView",
					this.Nct.RewardId,
				);
			});
	}
	GetResourceId() {
		return "UiView_InstanceEntranceTip_Prefab_2";
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos =
			WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
			(this.BtnBindInfo = [
				[15, this.UOe],
				[18, this.l2o],
			]);
	}
	OnStart() {
		this.RootItem.SetRaycastTarget(!1),
			(this.xko = new TipsListView_1.TipsListView()),
			this.xko.Initialize(this.GetVerticalLayout(5)),
			(this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
			this.$Ut.SetFunction(this.gko),
			this.GetItem(14).SetUIActive(!0),
			this.GetVerticalLayout(5)?.RootUIComp?.SetUIActive(!0);
	}
	OnBeforeDestroy() {
		this.xko.Clear(),
			this.$Ut.Destroy(),
			(this.a2o = void 0),
			this.Vko && (this.AddChild(this.Vko), (this.Vko = void 0)),
			this.Hko && (this.AddChild(this.Hko), (this.Hko = void 0)),
			(this.jko = void 0),
			(this.Wko = void 0),
			this.cG(),
			(ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !1);
	}
	OnShowWorldMapSecondaryUi(e) {
		e
			? ((this.dko = e),
				this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
				(this.Nct = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
					e.MarkConfig.RelativeId,
				)),
				this.Nct ||
					((this.Nct = new LevelPlay_1.LevelPlayInfo(e.MarkConfig.RelativeId)),
					this.Nct.InitConfig()),
				(this.IRe = void 0),
				(this.h2o =
					1 === this.dko?.MarkConfig?.RelativeSubType ||
					2 === this.dko?.MarkConfig?.RelativeSubType),
				this.h7e(),
				this.l1i(),
				this.u2o())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SceneGameplay",
					18,
					"玩法弹窗打开错误，地图标记不存在",
				);
	}
	OnCloseWorldMapSecondaryUi() {
		this.xko.Clear(),
			this.IRe &&
				(TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0)),
			(this.a2o = void 0),
			(ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = !1);
	}
	h7e() {
		(this.jko = ExchangeRewardById_1.configExchangeRewardById.GetConfig(
			this.Nct.RewardId,
		)),
			(this.Wko = this.Nct.FirstRewardId
				? ExchangeRewardById_1.configExchangeRewardById.GetConfig(
						this.Nct.FirstRewardId,
					)
				: void 0);
		var e,
			t,
			i = this.dko.MarkConfigId,
			o = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(i);
		o
			? ((e = (t = this.dko.IsRelativeFunctionOpen())
					? o.MarkTitle
					: "UnknownPlace"),
				this.GetText(1).ShowTextNew(e),
				(e = t ? o.MarkDesc : "UnknownPlaceContent"),
				this.GetText(4).ShowTextNew(e),
				this.c2o(),
				this.GetItem(9).SetUIActive(!1),
				this.GetItem(12).SetUIActive(!1),
				this.GetItem(8).SetUIActive(!1),
				(t = this.dko.GetAreaText()) && this.GetText(3).SetText(t),
				this.GetButton(18).RootUIComp?.SetUIActive(
					1 === this.dko.MarkConfig.RelativeSubType,
				),
				this.InitRewards(),
				this.Xko())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("SceneGameplay", 18, "缺少标记配置", ["MarkId", i]);
	}
	c2o() {
		let e = 0;
		0 <
			(e = this.jko?.Cost.has(ItemDefines_1.EItemId.Power)
				? this.jko.Cost.get(ItemDefines_1.EItemId.Power)
				: e) &&
			((o = this.xko.AddItemByKey("power")).SetIconByItemId(
				ItemDefines_1.EItemId.Power,
			),
			o.SetHelpButtonVisible(!1),
			o.SetClickHelpFunc(this.CHi),
			o.SetLeftText(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ??
					"",
			),
			o.SetRightText("x" + e.toString())),
			(this.a2o = this.xko.AddItemByKey("reborn")),
			this.a2o?.SetLeftText(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"LastTimeToRefresh",
				) ?? "",
			),
			this.a2o?.SetHelpButtonVisible(!1),
			this.a2o?.SetActive(!1);
		var t,
			i,
			o = this.jko.SharedId;
		0 < o &&
			0 <
				(t =
					ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
						this.jko.SharedId,
					)) &&
			((o =
				ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
					o,
				)),
			(i = this.xko.AddItemByKey("reward")).SetLeftText(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"RemainingCollectTimes",
				) ?? "",
			),
			i.SetRightText(
				StringUtils_1.StringUtils.Format(
					"{0}/{1}",
					(t - o).toString(),
					t.toString(),
				),
			),
			i.SetHelpButtonVisible(!1));
	}
	Xko() {
		var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(
			this.Nct.Id,
		);
		this.$Ut.SetActive(!e.IsOccupied),
			this.GetItem(12).SetUIActive(e.IsOccupied),
			e.IsOccupied &&
				((e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
					e.QuestId,
				)),
				(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
					e.TreeConfigId,
				)),
				(e = StringUtils_1.StringUtils.Format(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"Quest_Require_Note",
					) ?? "",
					e.Name,
				)),
				this.GetText(13).SetText(e)),
			this.GetItem(17).SetUIActive(1 === this.dko.MarkConfig.RelativeSubType);
	}
	InitRewards() {
		let e = !1;
		1 === this.dko.MarkConfig.RelativeSubType &&
			((e =
				void 0 !==
				(t =
					ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
						[3],
						!1,
					))),
			t) &&
			((t = t.GetNumTxtAndParam()),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), t[0], t[1], t[2])),
			this.GetItem(19).SetUIActive(e),
			this.Vko ||
				((t = this.GetItem(8).GetOwner()),
				(i = this.GetVerticalLayout(7).RootUIComp),
				(this.Hko = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
				this.Hko.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(t, i)),
				(this.Vko = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
				this.Vko.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(t, i)),
				(this.Vko.OnClickPreviewCall = this._2o));
		var t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
			i =
				(this.Hko?.SetBtnPreviewVisible(!1),
				this.Vko.SetBtnPreviewVisible(this.h2o),
				this.Nct.IsFirstPass);
		i
			? this.$ko(this.Hko, void 0, 0, "")
			: this.$ko(this.Hko, this.Wko, t, "FirstReward"),
			this.$ko(this.Vko, this.jko, t, "ProbReward", e);
	}
	$ko(e, t, i, o, a = !1) {
		if (t) {
			var r = t.PreviewReward;
			let c;
			if (r.has(i)) c = r.get(i).MapIntInt;
			else
				for (let e = i - 1; 0 <= e; e--)
					if (r.has(e)) {
						c = r.get(e).MapIntInt;
						break;
					}
			if (!c) {
				var n = t.RewardId;
				let e = 0;
				if (n.has(i)) e = n.get(i);
				else
					for (let t = i - 1; 0 <= t; t--)
						if (n.has(t)) {
							e = n.get(t);
							break;
						}
				e &&
					0 < e &&
					((h = DropPackageById_1.configDropPackageById.GetConfig(e))
						? (c = h.DropPreview)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneGameplay",
								18,
								"兑换奖励表配置的掉落ID读取不到掉落奖励",
								["兑换奖励ID", t.Id],
							));
			}
			if (1 === this.dko.MarkConfig.RelativeSubType) {
				var s,
					l,
					d,
					h = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
					g =
						ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(
							h,
						),
					M = [];
				for ([s] of c)
					this.m2o(s) &&
						((l =
							ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
								s,
							)),
						(d = g.QualityDropWeight.get(l.QualityId) ?? 0),
						l.ShowTypes.includes(41)) &&
						d <= 0 &&
						l &&
						M.push(s);
				M.forEach((e) => {
					c.delete(e);
				});
			}
			c
				? (e.Refresh(c, o, !1, !1, a), e.SetActive(!0))
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"SceneGameplay",
							18,
							"读取不到奖励配置",
							["兑换奖励ID", t.Id],
							["WorldLevel", i],
						),
					e.SetActive(!1));
		} else e.SetActive(!1);
	}
	m2o(e) {
		return (
			7 ===
				(e =
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
						e,
					)) || 0 === e
		);
	}
	l1i() {
		let e = "";
		(e = this.dko.IsTracked
			? "InstanceDungeonEntranceCancelTrack"
			: "InstanceDungeonEntranceTrack"),
			this.$Ut.SetLocalText(e);
	}
	u2o() {
		var e = TimeUtil_1.TimeUtil.GetServerTime(),
			t = this.Nct.RefreshTime;
		if (t < e) this.cG();
		else {
			let i;
			(i =
				(t -= e) < TimeUtil_1.TimeUtil.Minute
					? "" +
						Math.floor(t) +
						ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second")
					: t < TimeUtil_1.TimeUtil.Hour
						? "" +
							Math.floor(t / TimeUtil_1.TimeUtil.Minute) +
							ConfigManager_1.ConfigManager.TextConfig.GetTextById("Minute")
						: "" +
							Math.floor(t / TimeUtil_1.TimeUtil.Hour) +
							ConfigManager_1.ConfigManager.TextConfig.GetTextById("Hour")),
				this.a2o?.SetRightText(i),
				void 0 === this.IRe && this.rqo();
		}
	}
	rqo() {
		this.a2o?.SetActive(!0),
			(this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
				this.u2o();
			}, TimeUtil_1.TimeUtil.InverseMillisecond));
	}
	cG() {
		void 0 !== this.IRe &&
			TimerSystem_1.TimerSystem.Has(this.IRe) &&
			(TimerSystem_1.TimerSystem.Remove(this.IRe),
			(this.IRe = void 0),
			this.a2o?.SetActive(!1));
	}
}
exports.SceneGameplayPanel = SceneGameplayPanel;
