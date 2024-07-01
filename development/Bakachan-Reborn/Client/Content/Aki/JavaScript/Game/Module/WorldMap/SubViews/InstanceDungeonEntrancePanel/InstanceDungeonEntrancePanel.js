"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonEntrancePanel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityDoubleRewardController_1 = require("../../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	HelpController_1 = require("../../../Help/HelpController"),
	ExchangeRewardModel_1 = require("../../../InstanceDungeon/ExchangeReward/ExchangeRewardModel"),
	InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
	InstanceTipGrid_1 = require("../../../InstanceDungeon/InstanceTipGrid"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapController_1 = require("../../WorldMapController"),
	WorldMapDefine_1 = require("../../WorldMapDefine"),
	TipsListView_1 = require("../TipsListView"),
	POWER_COST_KEY = "power",
	COUNT_LIMMIT_KEY = "countLimit";
class InstanceDungeonEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.thi = 0),
			(this.rhi = []),
			(this.dko = void 0),
			(this.xko = void 0),
			(this.wko = void 0),
			(this.$Ut = void 0),
			(this.OnInstanceRefresh = (e, t, n, o) => {
				var r = new TipsListView_1.InstanceDungeonCostTip();
				return r.SetRootActor(t.GetOwner(), !0), { Key: e, Value: r };
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
			}),
			(this.CHi = () => {
				HelpController_1.HelpController.OpenHelpById(
					ExchangeRewardModel_1.POWER_DISCOUNT_HELP_ID,
				);
			}),
			(this.sGe = () => new InstanceTipGrid_1.InstanceTipGrid());
	}
	get Bko() {
		return this.thi
			? ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
					this.thi,
				)
			: void 0;
	}
	GetResourceId() {
		return "UiView_InstanceEntranceTip_Prefab";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos =
			WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
	}
	OnStart() {
		this.RootItem.SetRaycastTarget(!1),
			(this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
			this.$Ut.SetFunction(this.gko),
			this.GetItem(14)?.SetUIActive(!0),
			this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(!0),
			(this.xko = new GenericLayoutAdd_1.GenericLayoutAdd(
				this.GetVerticalLayout(5),
				this.OnInstanceRefresh,
			)),
			(this.wko = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(7),
				this.sGe,
			));
	}
	OnBeforeDestroy() {
		this.xko.ClearChildren(), this.$Ut.Destroy();
	}
	OnShowWorldMapSecondaryUi(e) {
		var t;
		e
			? ((this.dko = e),
				(this.thi =
					0 !== e.MarkConfig.RelativeId
						? e.MarkConfig.RelativeId
						: ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
								e.MarkConfigId,
							)),
				this.thi
					? (this.h7e(),
						InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.InstEntranceDetailRequest(
							this.thi,
						).finally(() => {
							this.bko(), this.qko();
						}),
						this.l1i(),
						(t = this.Bko.UnLockCondition) &&
							!ModelManager_1.ModelManager.FunctionModel.IsOpen(t) &&
							((t =
								ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(
									t,
								)),
							(t =
								ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
									t.OpenConditionId,
								)),
							LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.HintText)))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"InstanceDungeon",
							17,
							"副本入口弹窗打开错误，副本入口表中找不到对应的地图标价Id！",
							["MarkId", e.MarkConfigId],
						))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InstanceDungeon",
					50,
					"副本入口弹窗打开错误，地图标记不存在",
				);
	}
	GetMaxUnlockInstanceList() {
		let e = new Array(),
			t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
				this.rhi[0],
				ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
			);
		for (const o of this.rhi) {
			var n;
			!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
				o,
			) ||
				(n =
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
						o,
						ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
					)) < t ||
				(n > t && ((e = []), (t = n)), e.push(o));
		}
		if (0 === e.length)
			for (const n of this.rhi) {
				var o =
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
						n,
						ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
					);
				o > t || (o < t && ((e = []), (t = o)), e.push(n));
			}
		return (
			e.sort(
				(e, t) =>
					(ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
						e,
					)
						? 0
						: 1) -
					(ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
						t,
					)
						? 0
						: 1),
			),
			e
		);
	}
	h7e() {
		var e = this.Bko;
		e &&
			(this.GetText(4).ShowTextNew(e.Description),
			this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
			this.GetText(1).ShowTextNew(e.Name),
			(e = this.dko.GetAreaText()) && this.GetText(3).SetText(e),
			this.GetItem(9).SetUIActive(!this.dko.IsFogUnlock),
			this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text"),
			this.GetItem(12).SetUIActive(!1),
			this.GetItem(8).SetUIActive(!1));
	}
	bko() {
		this.rhi.length = 0;
		var e,
			t =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(
					this.thi,
				);
		for ([e] of Array.from(t).sort((e, t) => e[1] - t[1])) this.rhi.push(e);
		this.rhi = this.GetMaxUnlockInstanceList();
		t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
			this.rhi[0],
		);
		var n,
			o =
				ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
					t.CustomTypes,
				);
		this.GetItem(19).SetUIActive(void 0 !== o),
			o &&
				((o = o.GetNumTxtAndParam()),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(20),
					o[0],
					o[1],
					o[2],
				)),
			this.wko.RefreshByData(this.rhi),
			(o = t.RewardId),
			(t =
				ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
					o,
				)?.SharedId);
		t &&
			(this.xko.AddItemToLayout(["countLimit"]),
			(o = this.xko.GetLayoutItemByKey("countLimit")).SetIconVisible(!1),
			o.SetStarVisible(!1),
			(n = StringUtils_1.StringUtils.Format(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"Text_CanReceivedCount_Text",
				) ?? "",
				"",
			)),
			o.SetLeftText(n),
			(n =
				ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(
					t,
				)),
			(t =
				ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
					t,
				)),
			(t = (n = n.MaxCount) - t),
			o.SetRightText(
				StringUtils_1.StringUtils.Format("{0}/{1}", "" + t, "" + n),
			),
			o.SetHelpButtonVisible(!1));
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
	qko() {
		var e,
			t,
			n =
				ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(
					this.rhi[0],
				);
		n &&
			n[0] &&
			(this.xko.AddItemToLayout(["power"]),
			(e = this.xko.GetLayoutItemByKey("power")).SetStarVisible(!1),
			(t = n[0][0].ItemId),
			e.SetIconByItemId(t),
			e.SetLeftText(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ??
					"",
			),
			e.SetHelpButtonVisible(!0),
			e.SetRightText(n[0][1].toString()),
			e.SetClickHelpFunc(this.CHi));
	}
	OnCloseWorldMapSecondaryUi() {
		this?.xko?.ClearChildren();
	}
	GetGuideFocusUiItem() {
		return this.GetButton(11)
			.GetOwner()
			.GetComponentByClass(UE.UIItem.StaticClass());
	}
}
exports.InstanceDungeonEntrancePanel = InstanceDungeonEntrancePanel;
