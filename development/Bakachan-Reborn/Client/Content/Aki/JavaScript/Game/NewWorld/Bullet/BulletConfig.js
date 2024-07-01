"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletConfig =
		exports.BulletDataCacheInfo =
		exports.PreloadBulletConfig =
			void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	BulletDataMain_1 = require("./BulletConf/BulletDataMain"),
	bulletDtPath = [
		void 0,
		void 0,
		"/Game/Aki/Data/Fight/DT_CommonBulletDataMain_Rogue.DT_CommonBulletDataMain_Rogue",
	];
class PreloadBulletConfig {
	constructor() {
		(this.ModelId = 0),
			(this.DataTable = void 0),
			(this.RowNames = void 0),
			(this.CurIndex = 0);
	}
}
exports.PreloadBulletConfig = PreloadBulletConfig;
const preloadCommonBulletRowNames = ["100121", "100122"];
class BulletDataCacheInfo {
	constructor() {
		(this.BulletDataMap = new Map()),
			(this.DataTable = void 0),
			(this.DataTableExtra = void 0),
			(this.EntityCount = 0);
	}
}
exports.BulletDataCacheInfo = BulletDataCacheInfo;
class BulletConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.O8o = []), (this.k8o = void 0);
	}
	static RemoveCacheBulletDataByEntityId(t) {
		var e,
			a = BulletConfig.F8o.get(t);
		a &&
			(BulletConfig.F8o.delete(t),
			(e = BulletConfig.V8o.get(a))
				? (e.EntityCount--, 0 === e.EntityCount && BulletConfig.V8o.delete(a))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Bullet",
						18,
						"删除实体时，子弹缓存里没有对应的数据",
						["entityId", t],
						["modelId", a],
					));
	}
	static ClearBulletDataCache() {
		BulletConfig.V8o.clear(),
			BulletConfig.H8o.clear(),
			BulletConfig.F8o.clear();
	}
	GetBulletData(t, e, a = !0, o = -1) {
		var l = t.CheckGetComponent(33),
			i = t.Id;
		let r = BulletConfig.F8o.get(i),
			n = !0,
			u =
				(r || ((r = t.CheckGetComponent(0).GetModelId()), (n = !1)),
				BulletConfig.V8o.get(r));
		if (u) {
			var g = u.BulletDataMap.get(e);
			if (g) return n || (BulletConfig.F8o.set(i, r), u.EntityCount++), g;
		}
		let s = this.j8o(o, e);
		if (s) return s;
		let C,
			D,
			f =
				((D = u
					? ((C = u.DataTable), u.DataTableExtra)
					: ((C = l.DtBulletInfo), l.DtBulletInfoExtra)),
				DataTableUtil_1.DataTableUtil.GetDataTableRow(C, e));
		if ((f = f || DataTableUtil_1.DataTableUtil.GetDataTableRow(D, e))) {
			const t = new BulletDataMain_1.BulletDataMain(f, e);
			return t.CheckValid()
				? (GlobalData_1.GlobalData.IsPlayInEditor ||
						(u ||
							(((u = new BulletDataCacheInfo()).DataTable = C),
							(u.DataTableExtra = D),
							(u.EntityCount = 0),
							BulletConfig.V8o.set(r, u)),
						u.BulletDataMap.set(e, t),
						n) ||
						(BulletConfig.F8o.set(i, r), u.EntityCount++),
					t)
				: void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Bullet", 18, "子弹配置非法", ["", e])
					);
		}
		if ((s = this.W8o(o, e))) return s;
		a &&
			((g = t.CheckGetComponent(3).Actor), Log_1.Log.CheckError()) &&
			Log_1.Log.Error(
				"Bullet",
				18,
				"子弹数据未找到!",
				["角色:", g.GetName()],
				["子弹名称:", e],
				["dtType", o],
			);
	}
	j8o(t, e) {
		if (-1 === t)
			for (const t of BulletConfig.H8o.values()) {
				var a = t.BulletDataMap.get(e);
				if (a) return a;
			}
		else if (0 !== t) {
			const a = BulletConfig.H8o.get(t);
			if (a) {
				var o = a.BulletDataMap.get(e);
				if (o) return o;
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Bullet",
						18,
						"该子弹的DT表没有加载，请检查触发子弹的玩法是否正确",
						["bulletDataName", e],
						["dtType", t],
					);
		}
	}
	W8o(t, e) {
		if (-1 === t)
			for (const t of BulletConfig.H8o.values()) {
				const o = DataTableUtil_1.DataTableUtil.GetDataTableRow(t.DataTable, e);
				var a;
				if (o)
					return (a = new BulletDataMain_1.BulletDataMain(o, e)).CheckValid()
						? (GlobalData_1.GlobalData.IsPlayInEditor ||
								t.BulletDataMap.set(e, a),
							a)
						: void (
								Log_1.Log.CheckError() &&
								Log_1.Log.Error("Bullet", 18, "子弹配置非法", ["", e])
							);
			}
		else {
			const a = BulletConfig.H8o.get(t);
			if (a) {
				const o = DataTableUtil_1.DataTableUtil.GetDataTableRow(a.DataTable, e);
				return o
					? (t = new BulletDataMain_1.BulletDataMain(o, e)).CheckValid()
						? (GlobalData_1.GlobalData.IsPlayInEditor ||
								a.BulletDataMap.set(e, t),
							t)
						: void (
								Log_1.Log.CheckError() &&
								Log_1.Log.Error("Bullet", 18, "子弹配置非法", ["", e])
							)
					: void 0;
			}
		}
	}
	GetBulletHitData(t, e) {
		if (e !== FNameUtil_1.FNameUtil.EMPTY && e !== FNameUtil_1.FNameUtil.NONE) {
			(t = t.CheckGetComponent(33)), (e = e.toString());
			let a = DataTableUtil_1.DataTableUtil.GetDataTableRow(t.DtHitEffect, e);
			return (a =
				(a =
					!a && t.DtHitEffectExtra
						? DataTableUtil_1.DataTableUtil.GetDataTableRow(
								t.DtHitEffectExtra,
								e,
							)
						: a) ||
				DataTableUtil_1.DataTableUtil.GetDataTableRow(
					ConfigManager_1.ConfigManager.WorldConfig.GetCommonHitEffectData(),
					e,
				));
		}
	}
	PreloadCommonBulletData() {
		this.K8o(1),
			ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() &&
				this.K8o(2);
		var t = ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData();
		return this.X8o(t, void 0, 0, 0, preloadCommonBulletRowNames), !0;
	}
	K8o(t) {
		var e,
			a = BulletConfig.H8o.get(t);
		if (!a) {
			let o;
			1 === t
				? (o = ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData())
				: (e = bulletDtPath[t]) &&
					(o = ResourceSystem_1.ResourceSystem.SyncLoad(e, UE.DataTable)),
				o &&
					(((a = new BulletDataCacheInfo()).DataTable = o),
					BulletConfig.H8o.set(t, a),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info("Bullet", 18, "预加载通用子弹DT", ["dtType", t]);
		}
	}
	PreloadBulletData(t) {
		var e, a;
		t?.GetComponent(0)?.IsRole() &&
			((e = t.CheckGetComponent(33)),
			(a = t.CheckGetComponent(0).GetModelId()),
			this.X8o(e.DtBulletInfo, e.DtBulletInfoExtra, a, t.Id));
	}
	X8o(t, e, a, o, l = void 0) {
		if (
			!GlobalData_1.GlobalData.IsPlayInEditor &&
			t &&
			void 0 !== a &&
			!BulletConfig.V8o.has(a)
		) {
			let u = l;
			if (!u) {
				u = [];
				l = (0, puerts_1.$ref)(void 0);
				var i =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(t, l),
					(0, puerts_1.$unref)(l));
				if (!i) return;
				var r = i.Num();
				if (r <= 0) return;
				for (let t = 0; t < r; t++) {
					var n = i.Get(t).toString();
					u.push(n);
				}
			}
			((l = new BulletDataCacheInfo()).DataTable = t),
				(l.DataTableExtra = e),
				ModelManager_1.ModelManager.CharacterModel.IsValid(o) &&
					((l.EntityCount = 1), BulletConfig.F8o.set(o, a)),
				BulletConfig.V8o.set(a, l),
				((e = new PreloadBulletConfig()).ModelId = a),
				(e.DataTable = t),
				(e.CurIndex = 0),
				(e.RowNames = u),
				this.k8o ? this.O8o.push(e) : (this.k8o = e);
		}
	}
	TickPreload() {
		if (this.k8o) {
			if (this.k8o.RowNames.length <= this.k8o.CurIndex) {
				if (0 === this.O8o.length) return void (this.k8o = void 0);
				if (
					((this.k8o = this.O8o.pop()),
					this.k8o.RowNames.length <= this.k8o.CurIndex)
				)
					return;
			}
			var t,
				e,
				a = BulletConfig.V8o.get(this.k8o.ModelId);
			a
				? ((t = this.k8o.RowNames[this.k8o.CurIndex]),
					(e = DataTableUtil_1.DataTableUtil.GetDataTableRow(
						this.k8o.DataTable,
						t,
					))
						? (e = new BulletDataMain_1.BulletDataMain(e, t)).CheckValid()
							? (e.Preload(), a.BulletDataMap.set(t, e))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("Bullet", 18, "子弹配置非法", ["", t])
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Bullet",
								18,
								"子弹配置为空",
								["rowName", t],
								["modelId", this.k8o?.ModelId],
								["index", this.k8o?.CurIndex],
							),
					this.k8o.CurIndex++)
				: (this.k8o.CurIndex = this.k8o.RowNames.length);
		}
	}
	ClearPreload() {
		(this.k8o = void 0), (this.O8o.length = 0);
	}
}
((exports.BulletConfig = BulletConfig).Q8o = void 0),
	(BulletConfig.$8o = void 0),
	(BulletConfig.V8o = new Map()),
	(BulletConfig.H8o = new Map()),
	(BulletConfig.F8o = new Map());
