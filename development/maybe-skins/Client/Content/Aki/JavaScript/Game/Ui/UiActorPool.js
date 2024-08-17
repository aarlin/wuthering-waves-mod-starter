"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiActorPool = exports.UiPoolActor = void 0);
const ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	CustomPromise_1 = require("../../Core/Common/CustomPromise"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	Time_1 = require("../../Core/Common/Time"),
	Queue_1 = require("../../Core/Container/Queue"),
	CommonDefine_1 = require("../../Core/Define/CommonDefine"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	UiLayerType_1 = require("./Define/UiLayerType"),
	LguiResourceManager_1 = require("./LguiResourceManager"),
	UiLayer_1 = require("./UiLayer"),
	CACHE_TIME_SECOND = 30,
	CACHE_TIME = 30 * CommonDefine_1.MILLIONSECOND_PER_SECOND,
	TICK_GARBAGE_MAXCOUNT = 1,
	DEFAULT_CAPACITY = 15,
	prepareConfigList = [
		{ ResourceId: "UiItem_NPCIcon_Prefab", CacheCount: () => 30 },
		{ ResourceId: "UiItem_Mark_Prefab", CacheCount: () => 2 },
		{ ResourceId: "UiItem_MarkMapName_Prefab", CacheCount: () => 2 },
		{ ResourceId: "UiItem_MarkArea_Prefab", CacheCount: () => 2 },
		{ ResourceId: "UiItem_ProbeArea", CacheCount: () => 2 },
		{ ResourceId: "UiItem_MarkChoose_Prefab", CacheCount: () => 2 },
		{ ResourceId: "UiItem_MarkOut_Prefab", CacheCount: () => 2 },
		{ ResourceId: "UiItem_MarkTrackNia_Prefab", CacheCount: () => 2 },
		{ ResourceId: "UiItem_Map_Prefab", CacheCount: () => 0 },
		{ ResourceId: "UiItem_MiniMap_Prefab", CacheCount: () => 1 },
		{ ResourceId: "UiItem_WorldMapMark_Prefab", CacheCount: () => 1 },
		{ ResourceId: "UiView_InteractionHint_Prefab", CacheCount: () => 1 },
		{ ResourceId: "UiView_Roulette_Prefab", CacheCount: () => 1 },
		{ ResourceId: "UiItem_SuoDing", CacheCount: () => 1 },
		{ ResourceId: "UiItem_PartState_Prefab", CacheCount: () => 1 },
		{ ResourceId: "UiView_AcquireIntro_Prefab", CacheCount: () => 1 },
		{ ResourceId: "UiView_BlackScreen_Prefab", CacheCount: () => 1 },
		{ ResourceId: "UiView_BlackFadeScreen_Prefab", CacheCount: () => 1 },
	];
class UiPoolActor {
	constructor(e) {
		(this.OCe = void 0), (this.Ymr = ""), (this.Jmr = 0), (this.Ymr = e);
	}
	get Actor() {
		return this.OCe;
	}
	set Actor(e) {
		this.OCe = e;
	}
	get IsValid() {
		return this.OCe?.IsValid() ?? !1;
	}
	get UiItem() {
		return this.OCe?.RootComponent;
	}
	get Path() {
		return this.Ymr;
	}
	get EndTime() {
		return this.Jmr;
	}
	set EndTime(e) {
		this.Jmr = e;
	}
	Clear() {
		this.IsValid &&
			(ActorSystem_1.ActorSystem.Put(this.OCe), (this.OCe = void 0));
	}
}
exports.UiPoolActor = UiPoolActor;
class UiActorFactory {
	constructor(e, o) {
		(this.Ymr = ""),
			(this.zmr = void 0),
			(this.Zmr = 0),
			(this.IsKeepWhileCleaning = !1),
			(this.mp = new Queue_1.Queue(15)),
			(this.edr = LguiResourceManager_1.LguiResourceManager.InvalidId),
			(this.Ymr = e),
			(this.zmr = o) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Pool",
						11,
						"[UiActorFactory:constructor]初始化缓存池有问题,缓存池挂载根节点为空",
					));
	}
	a7() {
		var e = new UiPoolActor(this.Ymr);
		return (e.EndTime = Time_1.Time.Now + CACHE_TIME), e;
	}
	h7(e) {
		e.Clear();
	}
	async PreloadActor(e) {
		this.Zmr = e();
		var o = e() - this.mp.Size;
		if (!(o <= 0))
			if (this.zmr) {
				var r = [];
				for (let e = 0; e < o; e++) r.push(this.GetAsync(this.Ymr, this.zmr));
				(await Promise.all(r)).forEach((e) => {
					this.mp.Push(e);
				}),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Pool",
							17,
							"预加载UiPoolActor对象",
							["预加载数量", o],
							["资源路径", this.Ymr],
						);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Pool",
						11,
						"[UiActorFactory:PreloadActor]初始化缓存池有问题,缓存池挂载根节点为空",
					);
	}
	Release(e) {
		return e
			? (this.mp.Push(e),
				e.IsValid
					? (e.UiItem?.SetUIParent(this.zmr),
						(e.EndTime = Time_1.Time.Now + CACHE_TIME))
					: (e.EndTime = Time_1.Time.Now),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Pool",
						17,
						"回收UiPoolActor对象",
						["目前未使用数量", this.mp.Size],
						["资源路径", e.Path],
					),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Pool", 17, "回收UiPoolActor对象不存在"),
				this.CancelGetAsync(),
				!1);
	}
	GarbageCollect(e) {
		if (this.mp.Size <= this.Zmr) return e;
		let o = 0;
		for (let t = 0; t < e && !this.mp.Empty; ++t) {
			var r = this.mp.Front;
			if (r.EndTime > Time_1.Time.Now) break;
			this.mp.Pop(),
				this.h7(r),
				o++,
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Pool",
						17,
						"缓存池中UiPoolActor未使用对象执行GC",
						["目前未使用数量", this.mp.Size],
						["资源路径", this.Ymr],
					);
		}
		return e - o;
	}
	Clear() {
		for (; !this.mp.Empty; ) {
			var e = this.mp.Pop();
			this.h7(e);
		}
		this.mp.Clear(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Pool", 17, "清除操作", ["资源路径", this.Ymr]);
	}
	async tdr() {
		if (this.zmr) {
			const e = new CustomPromise_1.CustomPromise();
			return (
				(this.edr = LguiResourceManager_1.LguiResourceManager.LoadPrefab(
					this.Ymr,
					this.zmr,
					(o) => {
						(this.edr = LguiResourceManager_1.LguiResourceManager.InvalidId),
							e.SetResult(o);
					},
				)),
				e.Promise
			);
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Pool",
				11,
				"[UiActorFactory:TemplateActor]初始化缓存池有问题,缓存池挂载根节点为空",
			);
	}
	async GetAsync(e, o) {
		var r = this.mp.Empty ? this.a7() : this.mp.Pop(),
			t = (r.IsValid || (r.Actor = await this.tdr()), r.UiItem);
		if (t)
			return (
				o && t?.SetUIParent(o),
				t?.SetUIActive(!0),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Pool", 17, "获取UiPoolActor对象", ["资源路径", e]),
				r
			);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Pool", 17, "获取UiPoolActor对象失败, 未成功加载Actor", [
				"资源路径",
				e,
			]);
	}
	CancelGetAsync() {
		LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.edr),
			(this.edr = LguiResourceManager_1.LguiResourceManager.InvalidId);
	}
}
class UiActorPool {
	static idr(e) {
		let o = UiActorPool.odr.get(e);
		return (
			o ||
				((o = new UiActorFactory(e, UiActorPool.rdr)),
				UiActorPool.odr.set(e, o)),
			o
		);
	}
	static ndr(e) {
		return UiActorPool.odr.get(e);
	}
	static async Init() {
		this.IsOpenPool &&
			((UiActorPool.rdr = UiLayer_1.UiLayer.GetLayerRootUiItem(
				UiLayerType_1.ELayerType.Pool,
			)),
			await UiActorPool.VQe());
	}
	static async VQe() {
		var e = [];
		for (const r of prepareConfigList) {
			var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				r.ResourceId,
			);
			o = UiActorPool.idr(o);
			e.push(o.PreloadActor(r.CacheCount));
		}
		await Promise.all(e);
	}
	static Tick(e) {
		let o = 1;
		for (const e of UiActorPool.odr.values())
			if ((o = e.GarbageCollect(o)) <= 0) break;
	}
	static ClearPool() {
		for (var [e, o] of UiActorPool.odr)
			o.IsKeepWhileCleaning || (o.Clear(), UiActorPool.odr.delete(e));
	}
	static SetKeepWhileCleaning(e, o) {
		this.IsOpenPool && (e = UiActorPool.idr(e)) && (e.IsKeepWhileCleaning = o);
	}
	static async GetAsync(e, o) {
		return this.IsOpenPool
			? UiActorPool.idr(e).GetAsync(e, o)
			: UiActorPool.sdr(e, o);
	}
	static async sdr(e, o) {
		const r = new CustomPromise_1.CustomPromise();
		return (
			LguiResourceManager_1.LguiResourceManager.LoadPrefab(e, o, (o) => {
				var t = new UiPoolActor(e);
				(t.EndTime = Time_1.Time.Now + CACHE_TIME),
					(t.Actor = o),
					r.SetResult(t);
			}),
			r.Promise
		);
	}
	static RecycleAsync(e, o) {
		(o = UiActorPool.ndr(o))
			? o.Release(e)
			: e?.Actor &&
				(e.Clear(), Log_1.Log.CheckWarn()) &&
				Log_1.Log.Warn(
					"Pool",
					11,
					"[UiActorPool:RecycleAsync]工厂不存在,直接销毁对象",
					["路径", e.Path],
				);
	}
}
((exports.UiActorPool = UiActorPool).odr = new Map()),
	(UiActorPool.xW = void 0),
	(UiActorPool.rdr = void 0),
	(UiActorPool.IsOpenPool = !0);
