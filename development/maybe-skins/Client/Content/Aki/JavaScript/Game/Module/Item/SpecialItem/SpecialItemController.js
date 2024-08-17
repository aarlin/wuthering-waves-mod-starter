"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialItemController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	RouletteController_1 = require("../../Roulette/RouletteController"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	ItemDefines_1 = require("../Data/ItemDefines");
class SpecialItemController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.k6e),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSpecialItemUse,
				this.Ydi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddCommonItemNotify,
				this.Jdi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSpecialItemUpdate,
				this.$mi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
				this.zdi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UnEquipSpecialItem,
				this.Zdi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnItemUse,
			this.k6e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSpecialItemUse,
				this.Ydi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddCommonItemNotify,
				this.Jdi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSpecialItemUpdate,
				this.$mi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
				this.zdi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UnEquipSpecialItem,
				this.Zdi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			);
	}
	static IsSpecialItem(e) {
		return !!ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e)
			?.SpecialItem;
	}
	static AllowReqUseSpecialItem(e) {
		if (!(e = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e)))
			return !1;
		if (
			!e.UseInstance &&
			ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
		)
			return !1;
		var t =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(
				185,
			);
		if (!t) return 0 === e.AllowTags.length;
		for (const l of e.AllowTags) {
			var a = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(l);
			if (!a || !t.HasTag(a)) return !1;
		}
		for (const a of e.BanTags) {
			var l = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(a);
			if (l && t.HasTag(l)) return !1;
		}
		return !0;
	}
	static ListenSpecialItemRelatedTags(e, t) {
		if (SpecialItemController.IsSpecialItem(e)) {
			var a = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e);
			if (a) {
				var l = t?.Entity?.GetComponent(185);
				SpecialItemController.StopListenSpecialItemRelatedTags();
				for (const e of a.AllowTags) {
					var n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
					n &&
						(l?.AddTagAddOrRemoveListener(n, SpecialItemController.eCi),
						ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds.add(
							n,
						));
				}
				for (const e of a.BanTags) {
					var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
					o &&
						(l?.AddTagAddOrRemoveListener(o, SpecialItemController.eCi),
						ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds.add(
							o,
						));
				}
				(ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId = e),
					(ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle =
						t);
			}
		}
	}
	static StopListenSpecialItemRelatedTags() {
		var e =
			ModelManager_1.ModelManager.SpecialItemModel?.TagWatchedEntityHandle?.Entity?.GetComponent(
				185,
			);
		if (e)
			for (const t of ModelManager_1.ModelManager.SpecialItemModel
				.WatchedAllowTagIds)
				e.RemoveTagAddOrRemoveListener(t, SpecialItemController.eCi);
		if (
			(ModelManager_1.ModelManager.SpecialItemModel.WatchedAllowTagIds.clear(),
			e)
		)
			for (const t of ModelManager_1.ModelManager.SpecialItemModel
				.WatchedBanTagIds)
				e.RemoveTagAddOrRemoveListener(t, SpecialItemController.eCi);
		ModelManager_1.ModelManager.SpecialItemModel.WatchedBanTagIds.clear(),
			(ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId = 0),
			(ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle =
				void 0);
	}
	static EquipSpecialItem(e, t = !0, a = !0) {
		var l;
		ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() &&
			((l = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e))
				? 0 !== l.SpecialItemType
					? Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Item",
							38,
							"特殊道具配置类型无法装备",
							["Id", e],
							["SpecialItemType", l.SpecialItemType],
						)
					: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
								e,
							) <= 0
						? Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Item", 38, "背包中没有对应特殊道具,无法切换", [
								"Id",
								e,
							])
						: ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() !==
								e
							? ModelManager_1.ModelManager.RouletteModel.SaveCurrentRouletteData(
									void 0,
									void 0,
									e,
									!1,
									(l) => {
										l &&
											(t &&
												RouletteController_1.RouletteController.EquipItemSetRequest(
													e,
												),
											a) &&
											ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
												"ItemEquiped",
											);
									},
								)
							: t &&
								RouletteController_1.RouletteController.EquipItemSetRequest(e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Item",
						38,
						"特殊道具不存在,请检查是否配置t.特殊道具",
						["Id", e],
					));
	}
	static UnEquipSpecialItem(e) {
		ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() ===
			e &&
			ModelManager_1.ModelManager.RouletteModel.SaveCurrentRouletteData(
				void 0,
				void 0,
				0,
			);
	}
	static AutoEquipOrUnEquipSpecialItem(e) {
		var t =
			e ===
			ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId();
		return (
			t
				? SpecialItemController.UnEquipSpecialItem(e)
				: SpecialItemController.EquipSpecialItem(e),
			!t
		);
	}
	static tCi(e, t, a) {
		var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
		l?.Valid &&
			(l = l.GetComponent(33)).Valid &&
			l.BeginSkill(a, { Context: "Explore skill item: UseSkill" });
	}
}
(exports.SpecialItemController = SpecialItemController),
	((_a = SpecialItemController).$mi = (e) => {
		var t;
		void 0 === e
			? SpecialItemController.StopListenSpecialItemRelatedTags()
			: ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
				SpecialItemController.ListenSpecialItemRelatedTags(e, t));
	}),
	(SpecialItemController.xie = (e, t) => {
		var a = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId;
		a &&
			(SpecialItemController.StopListenSpecialItemRelatedTags(),
			SpecialItemController.ListenSpecialItemRelatedTags(a, e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
				a,
				e,
			));
	}),
	(SpecialItemController.eCi = (e, t) => {
		var a = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedItemId,
			l = ModelManager_1.ModelManager.SpecialItemModel.TagWatchedEntityHandle;
		a &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRefreshSpecialItemAllowReqUse,
				a,
				l,
			);
	}),
	(SpecialItemController.Jdi = (e) => {
		for (const t of e)
			SpecialItemController.IsSpecialItem(t.Ekn) &&
				SpecialItemController.EquipSpecialItem(t.Ekn);
	}),
	(SpecialItemController.Ydi = (e, t) => {
		var a;
		SpecialItemController.IsSpecialItem(e)
			? ((a = e),
				(a =
					ModelManager_1.ModelManager.SpecialItemModel.GetSpecialItemLogic(
						a,
					)).CheckUseCondition() && a.OnUse())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Item", 38, "特殊道具不存在,请检查是否配置t.特殊道具", [
					"Id",
					e,
				]);
	}),
	(SpecialItemController.zdi = (e, t = !0) => {
		SpecialItemController.EquipSpecialItem(e, t);
	}),
	(SpecialItemController.Zdi = (e) => {
		SpecialItemController.UnEquipSpecialItem(e);
	}),
	(SpecialItemController.k6e = (e, t) => {
		var a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
		a.Parameters.size &&
			SpecialItemController.IsSpecialItem(e) &&
			(a = a.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill)) &&
			_a.tCi(e, t, a);
	});
