"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MingSuModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	DragonPoolAll_1 = require("../../../Core/Define/ConfigQuery/DragonPoolAll"),
	ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	MingSuInstance_1 = require("./MingSuInstance");
class MingSuModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.wBi = new Map()),
			(this.BBi = void 0),
			(this.bBi = 0),
			(this.UpgradeFlow = void 0),
			(this.CurrentPreviewLevel = 0),
			(this.aAr = 0),
			(this.CurrentInteractCreatureDataLongId = void 0),
			(this.qBi = 0);
	}
	OnInit() {
		return this.InitData(), !0;
	}
	InitData() {
		this.InitMingSuMap();
	}
	SetCurrentDragonPoolId(e) {
		this.bBi = e;
	}
	GetCurrentDragonPoolId() {
		return this.bBi;
	}
	SetCollectItemConfigId(e) {
		this.aAr = e;
	}
	GetCollectItemConfigId() {
		return this.aAr;
	}
	RefreshDragonPoolActiveStatus(e, o) {
		(e = this.wBi.get(e)) && e.SetDragonPoolState(o);
	}
	RefreshDragonPoolDropItems(e, o) {
		(e = this.wBi.get(e)) && e.SetDropItemList(o);
	}
	RefreshDragonPoolLevel(e, o) {
		(e = this.wBi.get(e)) && e.SetDragonPoolLevel(o);
	}
	RefreshDragonPoolHadCoreCount(e, o) {
		(e = this.wBi.get(e)) && e.SetHadCoreCount(o);
	}
	UpdateDragonPoolInfoMap(e) {
		for (const o of e) this.DoUpdateDragonPoolInfoMap(o);
	}
	DoUpdateDragonPoolInfoMap(e) {
		this.RefreshDragonPoolActiveStatus(e.z6n, e.Efs),
			this.RefreshDragonPoolLevel(e.z6n, e.r3n),
			this.RefreshDragonPoolHadCoreCount(e.z6n, e.yfs);
	}
	InitMingSuMap() {
		var e = DragonPoolAll_1.configDragonPoolAll.GetConfigList();
		if (e)
			for (const t of e) {
				var o = new MingSuInstance_1.MingSuInstance(t.Id);
				this.wBi.set(t.Id, o);
			}
		else
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("MingSuTi", 8, "龙池配置读取失败", [
					"dragonPoolConfigList",
					e,
				]);
	}
	GetDragonPoolInstanceById(e) {
		return this.wBi.get(e);
	}
	GetTargetDragonPoolLevelById(e) {
		return (e = this.GetDragonPoolInstanceById(e)) ? e.GetDragonPoolLevel() : 0;
	}
	GetTargetDragonPoolMaxLevelById(e) {
		return (e = this.GetDragonPoolInstanceById(e))
			? e.GetDragonPoolMaxLevel()
			: 0;
	}
	GetTargetDragonPoolCoreCountById(e) {
		return (e = this.GetDragonPoolInstanceById(e)) ? e.GetHadCoreCount() : 0;
	}
	GetTargetDragonPoolLevelNeedCoreById(e, o) {
		return (e = this.GetDragonPoolInstanceById(e)) ? e.GetNeedCoreCount(o) : 0;
	}
	GetTargetDragonPoolLevelRewardById(e, o) {
		if (
			(e = this.GetDragonPoolInstanceById(e)) &&
			(e = e.GetDropItemList()) &&
			e.length > o
		) {
			if (!(e = e[o]._gs)) return;
			var t = new Array();
			for (const o of e) {
				var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(o.G3n);
				t.push({ ItemInfo: r, Count: o.g5n });
			}
			return t;
		}
	}
	GetTargetDragonPoolLevelRewardByIdEx(e, o) {
		if (
			(e = this.GetDragonPoolInstanceById(e)) &&
			(e = e.GetDropItemList()) &&
			e.length > o
		) {
			if (!(e = e[o]._gs)) return;
			var t = new Array();
			for (const o of e) t.push([{ ItemId: o.G3n, IncId: 0 }, o.g5n]);
			return t;
		}
	}
	GetTargetDragonPoolCoreById(e) {
		return (e = this.GetDragonPoolInstanceById(e)) ? e.GetCoreId() : 0;
	}
	GetTargetDragonPoolActiveById(e) {
		return (e = this.GetDragonPoolInstanceById(e)) ? e.GetDragonPoolState() : 0;
	}
	GetItemCount(e) {
		return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
	}
	GetItemInfoById(e) {
		return ItemInfoById_1.configItemInfoById.GetConfig(e);
	}
	CheckUp(e) {
		let o = this.GetTargetDragonPoolLevelById(e);
		var t = this.GetDragonPoolInstanceById(e).GetGoalList(),
			r = this.GetTargetDragonPoolMaxLevelById(e),
			n = this.GetTargetDragonPoolCoreCountById(e);
		let a = 0;
		for (; o < r; o++) {
			a += t[o];
		}
		a -= n;
		(n = this.GetTargetDragonPoolCoreById(e)),
			(e = this.GetItemCount(n)),
			(n = this.GetItemInfoById(n));
		return (
			0 !== e &&
			((n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name)),
			this.GBi({ UseCoreCount: e >= a ? a : e, CoreName: n ?? "" }),
			!0)
		);
	}
	CanLevelUp(e) {
		var o = this.GetTargetDragonPoolLevelById(e);
		return (
			!!(e = this.GetDragonPoolInstanceById(e)) &&
			e.GetNeedCoreCount(o) <=
				e.GetHadCoreCount() + this.GetItemCount(e.GetCoreId())
		);
	}
	GetCanUpPoolId() {
		let e = 0;
		for (var [o, t] of this.wBi) {
			var r = t.GetDragonPoolLevel(),
				t =
					((r = t.GetNeedCoreCount(r) - t.GetHadCoreCount()),
					this.GetTargetDragonPoolCoreById(o));
			if (r <= this.GetItemCount(t)) {
				e = o;
				break;
			}
		}
		return e;
	}
	GBi(e) {
		var o = [];
		o.push(e.CoreName, e.UseCoreCount.toString()),
			(this.BBi = new ConfirmBoxDefine_1.ConfirmBoxDataNew(9)),
			this.BBi.SetTextArgs(...o);
	}
	GetUpData() {
		return this.BBi;
	}
	set MingSuLastLevel(e) {
		this.qBi = e;
	}
	get MingSuLastLevel() {
		return this.qBi;
	}
}
exports.MingSuModel = MingSuModel;
