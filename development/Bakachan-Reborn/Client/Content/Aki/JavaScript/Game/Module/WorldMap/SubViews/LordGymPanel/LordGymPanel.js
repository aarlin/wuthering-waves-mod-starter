"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LordGymPanel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById"),
	ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
	MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	LevelPlay_1 = require("../../../LevelPlay/LevelPlay"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapDefine_1 = require("../../WorldMapDefine"),
	SceneGameplayTipGrid_1 = require("../SceneGameplayPanel/SceneGameplayTipGrid");
class LordGymPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.Nct = void 0),
			(this.dko = void 0),
			(this.Vko = void 0),
			(this.Hko = void 0),
			(this.jko = void 0),
			(this.Wko = void 0),
			(this.IRe = void 0),
			(this.Kko = void 0),
			(this.$Ut = void 0),
			(this.Qko = !1),
			(this.OnCreateDifficultyItem = () => new DifficultyItem()),
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
			});
	}
	GetResourceId() {
		return "UiView_InstanceEntranceTip_Prefab_2";
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos =
			WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
			(this.BtnBindInfo = [[15, this.UOe]]);
	}
	OnStart() {
		this.RootItem.SetRaycastTarget(!1),
			this.GetItem(14).SetUIActive(!0),
			(this.Kko = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(16),
				this.OnCreateDifficultyItem,
			)),
			this.Kko.SetActive(!0),
			(this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
			this.$Ut.SetFunction(this.gko);
	}
	OnBeforeDestroy() {
		this.Kko.ClearChildren(),
			this.AddChild(this.$Ut),
			this.Vko && (this.AddChild(this.Vko), (this.Vko = void 0)),
			this.Hko && (this.AddChild(this.Hko), (this.Hko = void 0)),
			(this.jko = void 0),
			(this.Wko = void 0);
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
				this.h7e(),
				this.l1i())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SceneGameplay",
					18,
					"玩法弹窗打开错误，地图标记不存在",
				);
	}
	OnCloseWorldMapSecondaryUi() {
		this.IRe &&
			(TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0));
	}
	h7e() {
		var e,
			t,
			i = this.dko.MarkConfigId,
			r = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(i);
		r
			? (this.GetText(1).ShowTextNew(r.MarkTitle),
				this.GetText(4).ShowTextNew(r.MarkDesc),
				(r = this.dko.GetAreaText()) && this.GetText(3).SetText(r),
				(r =
					ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfigByMarkId(
						this.dko.MarkId,
					)),
				(e =
					ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceLordList(
						r.Id,
					)),
				(t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
					this.Nct.Id,
				)?.LevelPlayRewardConfig),
				(r =
					ModelManager_1.ModelManager.LordGymModel.GetMaxDifficultyLordGymEntranceCanFight(
						r.Id,
					) ?? 1),
				(this.jko = ExchangeRewardById_1.configExchangeRewardById.GetConfig(
					t.RewardConfig[r - 1].RewardId,
				)),
				(this.Wko = this.Nct.FirstRewardId
					? ExchangeRewardById_1.configExchangeRewardById.GetConfig(
							this.Nct.FirstRewardId,
						)
					: void 0),
				(t = e[r - 1]),
				(this.Qko =
					ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(t)),
				this.Kko.RefreshByData(e),
				this.GetItem(9).SetUIActive(!1),
				this.GetItem(12).SetUIActive(!1),
				this.GetItem(8).SetUIActive(!1),
				this.InitRewards(),
				this.Xko())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("SceneGameplay", 18, "缺少标记配置", ["MarkId", i]);
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
				this.GetText(13).SetText(e));
	}
	InitRewards() {
		this.Vko ||
			((t = this.GetItem(8).GetOwner()),
			(e = this.GetVerticalLayout(7).RootUIComp),
			(this.Hko = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
			this.Hko.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(t, e)),
			(this.Vko = new SceneGameplayTipGrid_1.SceneGameplayTipGrid()),
			this.Vko.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(t, e)));
		var e,
			t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
		this.Nct.IsFirstPass
			? this.$ko(this.Hko, void 0, 0, "", this.Qko)
			: this.$ko(this.Hko, this.Wko, t, "FirstPassReward"),
			this.$ko(this.Vko, this.jko, t, "FirstPassReward", this.Qko);
	}
	$ko(e, t, i, r, o = !1) {
		if (t) {
			var a = t.PreviewReward;
			let d;
			if (a.has(i)) d = a.get(i).MapIntInt;
			else
				for (let e = i - 1; 0 <= e; e--)
					if (a.has(e)) {
						d = a.get(e).MapIntInt;
						break;
					}
			if (!d) {
				var n,
					s = t.RewardId;
				let e = 0;
				if (s.has(i)) e = s.get(i);
				else
					for (let t = i - 1; 0 <= t; t--)
						if (s.has(t)) {
							e = s.get(t);
							break;
						}
				e &&
					0 < e &&
					((n = DropPackageById_1.configDropPackageById.GetConfig(e))
						? (d = n.DropPreview)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneGameplay",
								18,
								"兑换奖励表配置的掉落ID读取不到掉落奖励",
								["兑换奖励ID", t.Id],
							));
			}
			d
				? (e.Refresh(d, r, !0, o), e.SetActive(!0))
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
	l1i() {
		let e = "";
		(e = this.dko.IsTracked
			? "InstanceDungeonEntranceCancelTrack"
			: "InstanceDungeonEntranceTrack"),
			this.$Ut.SetLocalText(e);
	}
}
exports.LordGymPanel = LordGymPanel;
class DifficultyItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
		];
	}
	Refresh(e, t, i) {
		var r = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e),
			o =
				((r =
					(LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(0),
						"LordGymDifficulty",
						r.Difficulty,
					),
					ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(e))),
				ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(e));
		e = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(e);
		this.GetSprite(3)?.SetUIActive(o),
			this.GetSprite(2)?.SetUIActive(e && r && !o),
			this.GetSprite(1)?.SetUIActive(!e || !r);
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, t) {
		return this.GridIndex;
	}
}
