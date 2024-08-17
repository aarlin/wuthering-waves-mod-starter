"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemUseLogic = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	GiftType_1 = require("../../../Core/Define/Config/SubType/GiftType"),
	ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	UiPlayItemById_1 = require("../../../Core/Define/ConfigQuery/UiPlayItemById"),
	CipherController_1 = require("../../LevelGamePlay/Cipher/CipherController"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
	UiManager_1 = require("../../Ui/UiManager"),
	AcquireData_1 = require("../Acquire/AcquireData"),
	BuffItemControl_1 = require("../BuffItem/BuffItemControl"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	PowerController_1 = require("../Power/PowerController"),
	PowerDefines_1 = require("../Power/PowerDefines"),
	RoleDefine_1 = require("../RoleUi/RoleDefine"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	InventoryGiftController_1 = require("./InventoryGiftController"),
	InventoryGiftData_1 = require("./InventoryGiftData");
class ItemUseLogic {
	static Ici(e, r = 1, t = 0) {
		var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
			ParamType: 0,
		});
		if (!o) return !1;
		if (o.GetConfigId > RoleDefine_1.ROBOT_DATA_MIN_ID)
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"NoneRole",
			);
		else {
			if (((o = o?.EntityHandle?.Entity?.GetComponent(156)), !o)) return !1;
			var n = Math.ceil(
				o.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life),
			);
			Math.ceil(
				o.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tkn),
			) <= n
				? ((o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("HpFull")),
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(o))
				: BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, r, t);
		}
		return !0;
	}
}
(exports.ItemUseLogic = ItemUseLogic),
	((_a = ItemUseLogic).TryUseParameterItem = (e, r = 1) => {
		var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
		return (
			!!t &&
			(0 === t.Parameters.size
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Inventory", 38, "使用道具失败,使用参数为空", [
							"ItemId",
							e,
						]),
					!1)
				: (ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(
						e,
						r,
					),
					!0))
		);
	}),
	(ItemUseLogic.TryUseUiPlayItem = (e, r = 0) => {
		if (!ItemInfoById_1.configItemInfoById.GetConfig(e).UiPlayItem) return !1;
		var t = UiPlayItemById_1.configUiPlayItemById.GetConfig(e);
		if (!t) return !1;
		switch (t.Type) {
			case "Cipher":
				CipherController_1.CipherController.OpenCipherView(t.UiPlayKey);
				break;
			case "SignalBreak":
				UiManager_1.UiManager.OpenView("SignalDecodeView", t.UiPlayKey);
		}
		return !0;
	}),
	(ItemUseLogic.TryUseBattlePassItem = (e, r = 0) => {
		var t;
		return (
			(e === ModelManager_1.ModelManager.BattlePassModel.PrimaryItemId ||
				e === ModelManager_1.ModelManager.BattlePassModel.AdvanceItemId) &&
			((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
				ModelManager_1.ModelManager.BattlePassModel.GetBattlePassItemConfirmId(
					e,
				),
			)).FunctionMap.set(2, () => {
				ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(
					e,
					1,
				);
			}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				t,
			),
			!0)
		);
	}),
	(ItemUseLogic.TryUseBuffItem = (e, r = 1, t = !1, o = 0) => {
		if (ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(e)) {
			if (
				ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
			) {
				var n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
				if (
					(n =
						ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(n)) &&
					0 === n.CanUseItem
				)
					return (
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
							MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								"Dungeon_BanItem",
							),
						),
						!0
					);
			}
			return 0 <
				ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e)
				? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"UseBuffCdText",
					),
					!0)
				: ConfigManager_1.ConfigManager.BuffItemConfig.IsTeamBuffItem(e)
					? (BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, 1, -1), !0)
					: (BuffItemControl_1.BuffItemControl.InitializeAllUseBuffItemRoleFromPlayerFormationInstance(
							e,
						),
						ModelManager_1.ModelManager.BuffItemModel.GetAllUseBuffItemRole()
							.size <= 0
							? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"NoneRole",
								),
								!0)
							: t
								? _a.Ici(e, r, o)
								: (UiManager_1.UiManager.OpenView("UseBuffItemView", e), !0));
		}
		return !1;
	}),
	(ItemUseLogic.TryUsePowerItem = (e, r = 0) =>
		e === PowerDefines_1.PowerConst.SingCube &&
		(PowerController_1.PowerController.RequestPowerViewData(), !0)),
	(ItemUseLogic.TryUseMonthCardItem = (e, r = 0) => {
		var t,
			o,
			n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
		let i = n.Parameters.get(
			ItemDefines_1.EItemFunctionType.ManualOpenMonthCard,
		);
		return (
			!!(i =
				i ||
				n.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard)) &&
			((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(132)),
			(n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name)),
			(o = ConfigManager_1.ConfigManager.MonthCardConfig.GetConfig(i).Days),
			t.SetTextArgs(n, o.toString()),
			t.FunctionMap.set(2, () => {
				ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(
					e,
					1,
				);
			}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				t,
			),
			!0)
		);
	}),
	(ItemUseLogic.TryUseGiftItem = (e, r = 0) => {
		const t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
		if (!t) return !1;
		if (11 !== t.GetType()) return !1;
		var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
		let n = o.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift),
			i = !1;
		n ||
			((n = o.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift)),
			(i = !0));
		var a =
			ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(n);
		if (!i)
			if (
				a.Type === GiftType_1.GiftType.Fixed ||
				a.Type === GiftType_1.GiftType.Random ||
				a.Type === GiftType_1.GiftType.RandomPhantom ||
				a.Type === GiftType_1.GiftType.CaptureMonster
			) {
				var l =
						ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
							e,
						),
					f = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Name),
					g = [];
				const r = [{ IncId: 0, ItemId: o.Id }, l];
				if ((g.push(r), 1 < l)) {
					const r = new AcquireData_1.AcquireData();
					r.SetAcquireViewType(0),
						r.SetAmount(1),
						r.SetMaxAmount(l),
						r.SetRemainItemCount(l),
						r.SetItemData(g),
						r.SetNameText(f),
						r.SetRightButtonFunction(() => {
							ItemUseLogic.Tci(e, r.GetAmount());
						}),
						InventoryGiftController_1.InventoryGiftController.ShowAcquireView(
							r,
						);
				} else
					InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(
						e,
						1,
						void 0,
					);
			} else {
				var C,
					I,
					m = [];
				for ([C, I] of a.Content) {
					var u = [{ IncId: 0, ItemId: C }, I];
					m.push(u);
				}
				(o = new InventoryGiftData_1.InventoryGiftData(e, m, a)),
					UiManager_1.UiManager.OpenView("InventoryGiftView", o);
			}
		return !0;
	}),
	(ItemUseLogic.Tci = (e, r) => {
		0 < r
			? InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(
					e,
					r,
					void 0,
				)
			: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"NotEnoughItem",
				);
	});
