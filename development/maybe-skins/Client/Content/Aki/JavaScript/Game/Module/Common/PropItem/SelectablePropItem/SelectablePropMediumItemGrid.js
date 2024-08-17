"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectablePropMediumItemGrid = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../MediumItemGrid/LoopScrollMediumItemGrid");
class SelectablePropMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments),
			(this.SelectablePropData = void 0),
			(this.$wt = void 0),
			(this.Ywt = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSelectItemAdd,
					this.SelectablePropData.ItemId,
					this.SelectablePropData.IncId,
				);
			});
	}
	OnSelected(e) {
		e &&
			((e = { IsVisible: !0, LongPressConfigId: 1 }),
			this.SetSelected(!0, !0),
			this.SetReduceButton(e));
	}
	OnDeselected(e) {
		this.SetSelected(!1, !0);
	}
	SetSelected(e, t = !1) {
		this.RefreshUi(this.SelectablePropData), super.SetSelected(e, t);
	}
	OnStart() {
		this.GetItemGridExtendToggle().FocusListenerDelegate.Bind(this.Ywt);
	}
	OnBeforeDestroy() {
		this.GetItemGridExtendToggle().FocusListenerDelegate.Unbind(),
			(this.$wt = void 0);
	}
	OnRefresh(e, t, o) {
		(this.SelectablePropData = e),
			this.SetSelected(0 < e.SelectedCount, !0),
			this.$wt && this.$wt(this);
	}
	RefreshUi(e) {
		this.SelectablePropData = e;
		var t = ModelManager_1.ModelManager.InventoryModel,
			o = e.IncId,
			a = e.ItemId,
			r = e.ItemDataType,
			i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(a);
		let n;
		if ((n = 0 < o ? t.GetAttributeItemData(o) : t.GetCommonItemData(a))) {
			var l = this.SelectablePropData.SelectedCount,
				s = this.SelectablePropData.Count,
				d = {
					Type: 4,
					Data: e,
					ItemConfigId: a,
					StarLevel: i.QualityId,
					ReduceButtonInfo: { IsVisible: 0 < l, LongPressConfigId: 1 },
				};
			switch (r) {
				case 0:
					(d.BuffIconType = i.ItemBuffType),
						(d.IsOmitBottomText = !1),
						0 < l
							? ((d.BottomTextId = "Text_ItemEnoughText_Text"),
								(d.BottomTextParameter = [l, s]))
							: (d.BottomText = s.toString());
					break;
				case 2:
					var m =
							ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(o),
						c = m.GetResonanceLevel();
					(d.Level = c),
						(d.BottomTextId = "Text_LevelShow_Text"),
						(d.BottomTextParameter = [m.GetLevel()]);
					break;
				case 3:
					(c =
						ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
							o,
						)),
						(d.Level = c.GetCost()),
						(d.IsLevelTextUseChangeColor = !0),
						(d.BottomTextId = "VisionLevel"),
						(d.BottomTextParameter = [c.GetPhantomLevel()]),
						(d.VisionFetterGroupId = c.GetFetterGroupId()),
						(d.IsOmitBottomText = !0);
					break;
				default:
					0 < l
						? ((d.BottomTextId = "Text_ItemEnoughText_Text"),
							(d.BottomTextParameter = [l, s]))
						: (d.BottomText = s.toString());
			}
			this.Apply(d);
		}
	}
	RefreshCostCount() {
		if (this.SelectablePropData) {
			var e = this.SelectablePropData.ItemDataType,
				t = this.SelectablePropData.SelectedCount,
				o = this.SelectablePropData.Count;
			switch (e) {
				case 0:
				default:
					0 < t
						? this.SetBottomTextId("Text_ItemEnoughText_Text", [t, o])
						: this.SetBottomText(this.SelectablePropData.Count.toString());
				case 2:
				case 3:
			}
		}
	}
	BindAfterApply(e) {
		this.$wt = e;
	}
}
exports.SelectablePropMediumItemGrid = SelectablePropMediumItemGrid;
