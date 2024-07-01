"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionMediumItemGrid = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
	LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class VisionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments),
			(this.Y6i = void 0),
			(this.NOe = 0),
			(this.kHi = void 0),
			(this.FHi = void 0),
			(this.VHi = void 0),
			(this.HHi = void 0),
			(this.jHi = () => {
				this.VHi?.(this, this.Y6i);
			}),
			(this.WHi = () => {
				this.HHi?.(this, this.Y6i);
			}),
			(this.c2e = () => {
				this.kHi?.(this.Y6i, this.NOe);
			});
	}
	OnStart() {
		this.BindOnExtendToggleStateChanged(this.c2e),
			this.BindOnExtendTogglePress(this.jHi),
			this.BindOnExtendToggleRelease(this.WHi);
	}
	SetOnPointDownCallBack(e) {
		this.VHi = e;
	}
	SetOnPointUpCallBack(e) {
		this.HHi = e;
	}
	SetClickToggleEvent(e) {
		this.kHi = e;
	}
	OnSelected(e) {
		1 !== this.GetItemGridExtendToggle().ToggleState &&
			this.SetSelected(!0, !1),
			this.SetNewVisible(!1),
			this.SetRedDotVisible(
				ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
					this.Y6i.GetConfigId(),
				),
			),
			ModelManager_1.ModelManager.InventoryModel.RemoveNewAttributeItem(
				this.Y6i.GetUniqueId(),
			),
			ModelManager_1.ModelManager.InventoryModel.SaveNewAttributeItemUniqueIdList();
	}
	OnDeselected(e) {
		0 !== this.GetItemGridExtendToggle().ToggleState &&
			this.SetSelected(!1, !0);
	}
	SetOnRefreshEvent(e) {
		this.FHi = e;
	}
	CheckSelectedState(e) {
		return e === this.Y6i;
	}
	OnRefresh(e, t, i) {
		(this.Y6i = e), (this.NOe = i);
		i = ModelManager_1.ModelManager.InventoryModel;
		var o = e.GetUniqueId(),
			l = i.IsNewAttributeItem(o),
			s = ((i = i.GetPhantomItemData(o)), e.GetCurrentSlotData()),
			n = e.GetQuality(),
			r =
				!l &&
				ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
					e.GetConfigId(),
				),
			a = {
				Type: 3,
				Data: e,
				ItemConfigId: e.GetConfigId(!0),
				BottomText: "+" + e.GetPhantomLevel().toString(),
				StarLevel: n,
				QualityId: n,
				IsLockVisible: i.GetIsLock(),
				IsRedDotVisible: r,
				IsNewVisible: l,
				Level: e.GetCost(),
				IsLevelTextUseChangeColor: !0,
				FetterGroupId: e.GetFetterGroupId(),
			};
		if (0 < s.length) {
			var d = s[0]?.SlotState ?? 1,
				h = s[1]?.SlotState ?? 1,
				M = s[2]?.SlotState ?? 1;
			switch (n) {
				case 3:
					a.VisionSlotStateList = [d];
					break;
				case 4:
					a.VisionSlotStateList = [d, h];
					break;
				case 5:
					a.VisionSlotStateList = [d, h, M];
			}
		}
		ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
			o,
		) &&
			((i =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
					o,
				)),
			(r =
				ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(o)),
			(a.VisionRoleHeadInfo = { RoleConfigId: i, VisionUniqueId: o }),
			(a.IsMainVisionVisible = r)),
			this.Apply(a),
			0 !== this.GetItemGridExtendToggle().ToggleState &&
				this.SetSelected(!1, !0),
			this.FHi?.(this);
	}
}
exports.VisionMediumItemGrid = VisionMediumItemGrid;
