"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InventoryMediumItemGrid = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	RED_TICK_HEX = "bf5c5c",
	TICK_COLOR_HEX = "663738",
	RED_TICK_ALPHA = 0.9;
class InventoryMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments), (this.rmi = void 0), (this.nmi = void 0);
	}
	OnRefresh(e, t, o) {
		var i = (this.rmi = e).GetItemViewInfo(),
			n = i.ItemDataType,
			l = i.QualityId,
			r = 1 === e.GetItemOperationType(),
			a = {
				Type: 4,
				Data: e,
				ItemConfigId: e.GetConfigId(),
				StarLevel: l,
				IsNewVisible: i.IsNewItem,
				IsLockVisible: i.IsLock,
				CoolDown: this.GetRemainingCoolDownTime(),
				TotalCoolDown: this.GetTotalCoolDownTime(),
				IsRedDotVisible: i.HasRedDot,
				IsDisable: r && !e.IsItemCanDestroy(),
				IsCheckTick: i.IsSelectOn,
			};
		switch (n) {
			case 0:
				var s = this.rmi.GetItemDataBase();
				i.SelectOnNum
					? ((m = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							"Text_ItemRecycleChosen_text",
						)),
						(m = StringUtils_1.StringUtils.Format(
							m,
							i.SelectOnNum.toString(),
							e.GetCount().toString(),
						)),
						(a.BottomText = m))
					: (a.BottomText = e.GetCount().toString()),
					(a.IsTimeFlagVisible = s.IsLimitTimeItem()),
					(a.BuffIconType = s.GetConfig().ItemBuffType),
					(a.IsOmitBottomText = !1);
				break;
			case 2:
				var m = this.rmi.GetItemDataBase().GetUniqueId();
				s = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(m);
				(a.BottomTextId = "Text_LevelShow_Text"),
					(a.BottomTextParameter = [s.GetLevel()]),
					(a.Level = s.GetResonanceLevel()),
					(a.RoleHeadInfo = { RoleConfigId: s.GetRoleId() });
				break;
			case 3:
				m = this.rmi.GetItemDataBase().GetUniqueId();
				var d,
					I = (s =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							m,
						)).GetCurrentSlotData();
				if (
					((a.Level = s.GetCost()),
					(a.IsLevelTextUseChangeColor = !0),
					(a.BottomText = "+" + s.GetPhantomLevel().toString()),
					(a.IsOmitBottomText = !0),
					0 < I.length)
				) {
					var C = I[0]?.SlotState ?? 0,
						c = I[1]?.SlotState ?? 0,
						u = I[2]?.SlotState ?? 0;
					switch (l) {
						case 3:
							a.VisionSlotStateList = [C];
							break;
						case 4:
							a.VisionSlotStateList = [C, c];
							break;
						case 5:
							a.VisionSlotStateList = [C, c, u];
					}
				}
				ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
					m,
				) &&
					((I = s.GetUniqueId()),
					(m =
						ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
							I,
						)),
					(d =
						ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(
							I,
						)),
					(a.VisionRoleHeadInfo = { RoleConfigId: m, VisionUniqueId: I }),
					(a.IsMainVisionVisible = d)),
					(a.VisionFetterGroupId = s.GetFetterGroupId());
				break;
			default:
				a.BottomText = e.GetCount().toString();
		}
		this.Apply(a),
			this.SetCheckTickPerformance(i.IsSelectOn, "bf5c5c", 0.9, "663738"),
			this.SetSelected(t);
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
	GetRemainingCoolDownTime() {
		var e = this.rmi.GetConfigId();
		return ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e);
	}
	GetTotalCoolDownTime() {
		var e = this.rmi.GetConfigId();
		return ModelManager_1.ModelManager.BuffItemModel.GetBuffItemTotalCdTime(e);
	}
	RefreshCoolDown() {
		var e = this.GetRemainingCoolDownTime(),
			t = this.GetTotalCoolDownTime();
		this.SetCoolDown(e, t);
	}
	BindOnItemButtonClickedCallback(e) {
		this.nmi = e;
	}
	OnExtendToggleStateChanged(e) {
		this.nmi && this.nmi(this.rmi);
	}
}
exports.InventoryMediumItemGrid = InventoryMediumItemGrid;
