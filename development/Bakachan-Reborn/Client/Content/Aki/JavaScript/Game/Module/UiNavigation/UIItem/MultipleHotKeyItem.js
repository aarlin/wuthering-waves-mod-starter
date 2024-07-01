"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MultipleHotKeyItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	HotKeyItem_1 = require("./HotKeyItem"),
	HotKeyTypeCreator_1 = require("./HotKeyType/HotKeyTypeCreator");
class MultipleHotKeyItem extends HotKeyItem_1.HotKeyItem {
	constructor() {
		super(...arguments),
			(this.eGe = void 0),
			(this.Gbo = 0),
			(this.Nbo = []),
			(this.qbo = (e, t, o) => ({
				Key: e,
				Value: HotKeyTypeCreator_1.HotKeyTypeCreator.CreateHotKeyType(
					t.GetOwner(),
					e,
					!0,
				),
			}));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UILayoutBase],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetLayoutBase(0),
			this.qbo,
			this.GetItem(1),
		)),
			(this.Gbo = this.OpenParam),
			await this.Obo();
	}
	OnClear() {
		for (const e of this.Nbo) e.Clear();
	}
	async Obo() {
		var e =
			ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyViewConfig(
				this.Gbo,
			);
		e &&
			(e.FunctionButtonArray.length <= 0 &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"UiNavigation",
					11,
					"快捷键界面配置错误, 快捷键类型的数量为0",
				),
			this.eGe.RebuildLayoutByDataNew(e.FunctionButtonArray),
			(this.Nbo = await Promise.all(this.eGe.GetLayoutItemList())));
	}
	GetHotKeyComponentArray() {
		var e = [];
		for (const t of this.Nbo) e.push(...t.GetHotKeyComponents());
		return e;
	}
}
exports.MultipleHotKeyItem = MultipleHotKeyItem;
