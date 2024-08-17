"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewFlagModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
class NewFlagModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Dqi = new Map()),
			(this.Rqi = new Array()),
			(this.IVs = new Map()),
			(this.LoadNewFlagConfig = () => {
				for (const t of [
					LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
					LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
					LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey,
					LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,
					LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
					LocalStorageDefine_1.ELocalStoragePlayerKey
						.InventoryAttributeItemRedDot,
					LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,
					LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
					LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin,
				]) {
					var e = LocalStorage_1.LocalStorage.GetPlayer(t);
					e = new Set(e || void 0);
					this.Dqi.set(t, e), this.IVs.set(t, !1);
				}
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnLoadedNewFlagConfig,
				);
			}),
			(this.ClearNewFlag = () => {
				this.Dqi.clear(), (this.Rqi.length = 0), this.IVs.clear();
			});
	}
	OnInit() {
		return this.OnAddEvents(), !0;
	}
	OnClear() {
		return this.OnRemoveEvents(), !0;
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnGetPlayerBasicInfo,
			this.LoadNewFlagConfig,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.LogOut,
				this.ClearNewFlag,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnGetPlayerBasicInfo,
			this.LoadNewFlagConfig,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LogOut,
				this.ClearNewFlag,
			);
	}
	SaveNewFlagConfig(e) {
		var t = this.Dqi.get(e);
		if (!t)
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("NewFlag", 8, "该系统当前没有需要保存的New标签", [
						"System",
						e,
					]),
				!1
			);
		if (!this.IVs.get(e)) return !1;
		this.Rqi.length = t.size;
		let o = 0;
		for (const e of t) this.Rqi[o++] = e;
		return (
			this.IVs.set(e, !1), LocalStorage_1.LocalStorage.SetPlayer(e, this.Rqi)
		);
	}
	AddNewFlag(e, t) {
		var o = this.Dqi.get(e);
		return o
			? (o.add(t), this.IVs.set(e, !0), !0)
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"NewFlag",
						8,
						"该系统当前没有Set缓存,无法添加, 请检查是否初始化",
						["System", e],
					),
				!1);
	}
	RemoveNewFlag(e, t) {
		var o = this.Dqi.get(e);
		return o
			? ((o = o.delete(t)), (t = this.IVs.get(e)), this.IVs.set(e, o || t), o)
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"NewFlag",
						8,
						"该系统当前没有Set缓存,无法删除, 请检查是否初始化",
						["System", e],
					),
				!1);
	}
	HasNewFlag(e, t) {
		return !!(e = this.Dqi.get(e)) && e.has(t);
	}
	GetNewFlagSet(e) {
		return this.Dqi.get(e);
	}
}
exports.NewFlagModel = NewFlagModel;
