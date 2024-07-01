"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarPointGraduate = void 0);
const UE = require("ue"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase"),
	SpecialEnergyBarPointItem_1 = require("./SpecialEnergyBarPointItem"),
	SpecialEnergyBarSlotItem_1 = require("./SpecialEnergyBarSlotItem"),
	POINT_NUM = 41,
	POINT_WIDTH = 9,
	TOTAL_WIDTH = 369;
class SpecialEnergyBarPointGraduate extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
	constructor() {
		super(...arguments),
			(this.SlotItem = void 0),
			(this.PointItem = void 0),
			(this.GraduateItemList = []),
			(this.IsKeyEnable = !1),
			(this.LastPercent = 0),
			(this.NeedInitSlot = !0),
			(this.NeedInitPoint = !0),
			(this.IsMorph = !1);
	}
	OnInitData() {
		this.LastPercent = this.PercentMachine.GetCurPercent();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		var t = [];
		t.push(this.InitSlotItem(this.GetItem(0))),
			t.push(this.InitPointItem(this.GetItem(1))),
			t.push(this.InitNumItem(this.GetItem(3))),
			t.push(this.InitKeyItem(this.GetItem(3))),
			await Promise.all(t),
			this.NumItem && this.NumItem.GetRootItem().SetHierarchyIndex(0);
	}
	async InitSlotItem(t) {
		this.NeedInitSlot &&
			((this.SlotItem =
				new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem()),
			await this.SlotItem.CreateThenShowByResourceIdAsync(
				"UiItem_EnergyBarSlot",
				t,
			));
	}
	async InitPointItem(t) {
		this.NeedInitPoint &&
			((this.PointItem =
				new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem()),
			this.PointItem.InitPrefabInfo(41, 9),
			await this.PointItem.CreateThenShowByResourceIdAsync(
				"UiItem_EnergyBarPoint",
				t,
			));
	}
	OnStart() {
		if (this.Config) {
			if (this.Config.EffectColor) {
				var t = UE.Color.FromHex(this.Config.EffectColor),
					e = new UE.LinearColor(t);
				let i = t;
				this.Config.PointColor &&
					(i = UE.Color.FromHex(this.Config.PointColor)),
					this.PointItem?.SetFullEffectColor(e),
					this.SlotItem?.SetBarColor(t),
					this.SlotItem?.SetPointColor(i),
					this.SlotItem?.SetFullEffectColor(e);
			}
			t = this.GetItem(2);
			var i = (this.GraduateItemList.push(t), this.Config.SlotNum - 1);
			if (1 < i) {
				var r = t.GetOwner(),
					s = t.GetParentAsUIItem();
				for (let t = 1; t < i; t++) {
					var n = LguiUtil_1.LguiUtil.DuplicateActor(r, s);
					this.GraduateItemList.push(
						n.GetComponentByClass(UE.UIItem.StaticClass()),
					);
				}
			} else t.SetUIActive(0 < i);
			for (let t = 0; t < i; t++)
				this.SetGraduateItemOffset(t, this.Config.ExtraFloatParams[t]);
			this.GetItem(4).SetUIActive(!this.IsMorph), this.RefreshBarPercent(!0);
		}
	}
	SetGraduateItemOffset(t, e) {
		(t = this.GraduateItemList[t]) && t.SetAnchorOffsetX(369 * (e - 0.5));
	}
	RefreshBarPercent(t = !1) {
		var e = this.PercentMachine.GetCurPercent(),
			i = this.GetKeyEnable();
		let r = !1;
		this.IsKeyEnable !== i && ((this.IsKeyEnable = i), (r = !0)),
			this.SlotItem?.UpdatePercentWithVisible(e, !i, r, t, this.LastPercent),
			this.PointItem?.UpdatePercentWithVisible(e, i, r, t),
			this.KeyItem?.RefreshKeyEnable(i, t),
			(this.LastPercent = e);
	}
	OnBarPercentChanged() {
		this.RefreshBarPercent();
	}
	OnKeyEnableChanged() {
		this.RefreshBarPercent();
	}
	Tick(t) {
		super.Tick(t), this.PointItem?.Tick(t), this.SlotItem?.Tick(t);
	}
	ReplaceFullEffect(t) {
		this.PointItem.ReplaceFullEffect(t), this.SlotItem.ReplaceFullEffect(t);
	}
}
exports.SpecialEnergyBarPointGraduate = SpecialEnergyBarPointGraduate;
