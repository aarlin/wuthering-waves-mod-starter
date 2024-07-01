"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiPool = void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	UiPrefabLoadModule_1 = require("../../Ui/UiPrefabLoadModule"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	headStateConfigList = [
		{ ResourceId: "UiItem_LittleMonsterState_Prefab", PreloadCount: 6 },
		{ ResourceId: "UiItem_MingsutiState_Prefab", PreloadCount: 1 },
		{ ResourceId: "UiItem_GuardianState_Prefab", PreloadCount: 1 },
		{ ResourceId: "UiItem_EliteMonsterState_Prefab", PreloadCount: 4 },
		{ ResourceId: "UiItem_DestructionState_Prefab", PreloadCount: 1 },
	],
	bossHeadStateConfig = {
		ResourceId: "UiItem_BossState_Prefab",
		PreloadCount: 0,
	},
	damageViewConfig = {
		ResourceId: "UiItem_DamageView_Prefab",
		PreloadCount: 21,
	},
	buffItemConfig = { ResourceId: "UiItem_BuffItem_Prefab", PreloadCount: 5 },
	environmentItemConfig = {
		ResourceId: "UiItem_BuffEnvironmentItem_Prefab",
		PreloadCount: 5,
	};
class BattleUiPoolElement {
	constructor() {
		(this.ActorList = void 0), (this.ExistMulti = !0), (this.Actor = void 0);
	}
	Clear() {
		for (const t of this.ActorList) ActorSystem_1.ActorSystem.Put(t);
		(this.ActorList.length = 0), (this.Actor = void 0);
	}
}
class BattleUiPool {
	constructor() {
		(this.wQe = new Map()),
			(this.BQe = new Map()),
			(this.bQe = new UiPrefabLoadModule_1.UiPrefabLoadModule()),
			(this.tZ = !1),
			(this.qQe = void 0),
			(this.GQe = void 0),
			(this.NQe = void 0),
			(this.OQe = void 0);
	}
	async Init() {
		if (!this.tZ) {
			if (!this.kQe()) return !1;
			await this.FQe(), (this.tZ = !0);
		}
		return !0;
	}
	kQe() {
		var t = UiLayer_1.UiLayer.WorldSpaceUiRootItem;
		return t?.IsValid()
			? ((this.qQe = t),
				(t = UiLayer_1.UiLayer.GetLayerRootUiItem(
					UiLayerType_1.ELayerType.Pool,
				)),
				t?.IsValid()
					? ((this.GQe = t),
						(t = UiLayer_1.UiLayer.UiRootItem),
						t?.IsValid()
							? ((this.NQe = t),
								(this.OQe = UiLayer_1.UiLayer.GetBattleViewUnit(0)),
								!0)
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error("Battle", 18, "UiRootItem为空"),
								!1))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Battle", 18, "PoolRoot为空"),
						!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 18, "WorldSpaceUiRootItem为空"),
				!1);
	}
	async FQe() {
		var t = [];
		for (const e of headStateConfigList) t.push(this.VQe(e, this.qQe));
		return (
			t.push(this.VQe(bossHeadStateConfig, this.GQe)),
			t.push(this.VQe(damageViewConfig, this.OQe)),
			t.push(this.VQe(buffItemConfig, this.NQe)),
			t.push(this.VQe(environmentItemConfig, this.NQe)),
			await Promise.all(t),
			!0
		);
	}
	async VQe(t, e) {
		var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				t.ResourceId,
			),
			r = await this.bQe.LoadPrefabAsync(o, e);
		if (!r?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 18, "预加载Actor失败", [
						"resourceId",
						t.ResourceId,
					]),
				!1
			);
		r.RootComponent.SetUIActive(!1);
		var i =
			(((o = new BattleUiPoolElement()).ExistMulti = 0 < t.PreloadCount),
			new Array());
		i.push(r);
		for (let o = 0; o < t.PreloadCount; o++) {
			var s = LguiUtil_1.LguiUtil.DuplicateActor(r, e);
			i.push(s);
		}
		return (o.ActorList = i), (o.Actor = r), this.wQe.set(t.ResourceId, o), !0;
	}
	GetActor(t, e, o) {
		var r,
			i = this.wQe.get(t);
		if (i && !(i.ActorList.length <= 0))
			return i.ExistMulti
				? 1 < i.ActorList.length
					? ((r = i.ActorList.pop()), o && r.K2_AttachRootComponentTo(e), r)
					: LguiUtil_1.LguiUtil.DuplicateActor(i.ActorList[0], e)
				: ((r = i.ActorList[0]), o && r.K2_AttachRootComponentTo(e), r);
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "BattleUiPool没有缓存该预制体", [
				"resourceId",
				t,
			]);
	}
	RecycleActor(t, e, o = !1) {
		var r = this.wQe.get(t);
		return r
			? (e.RootComponent.SetUIActive(!1),
				o && e.K2_AttachRootComponentTo(this.GQe),
				r.ExistMulti && r.ActorList.push(e),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 18, "BattleUiPool没有缓存该预制体", [
						"resourceId",
						t,
					]),
				!1);
	}
	GetHeadStateView(t) {
		return this.GetActor(t, this.qQe, !1);
	}
	RecycleHeadStateView(t, e, o = !1) {
		return !this.tZ || this.RecycleActor(t, e, o);
	}
	GetDamageView() {
		return this.GetActor(damageViewConfig.ResourceId, this.OQe, !1);
	}
	RecycleDamageView(t) {
		return this.tZ
			? this.RecycleActor(damageViewConfig.ResourceId, t)
			: (ActorSystem_1.ActorSystem.Put(t), !0);
	}
	GetBuffItem(t) {
		return this.GetActor(buffItemConfig.ResourceId, t, !0);
	}
	RecycleBuffItem(t) {
		return this.tZ
			? this.RecycleActor(buffItemConfig.ResourceId, t, !0)
			: (ActorSystem_1.ActorSystem.Put(t), !0);
	}
	GetEnvironmentItem(t) {
		return this.GetActor(environmentItemConfig.ResourceId, t, !0);
	}
	RecycleEnvironmentItem(t) {
		return this.tZ
			? this.RecycleActor(environmentItemConfig.ResourceId, t, !0)
			: (ActorSystem_1.ActorSystem.Put(t), !0);
	}
	async LoadActor(t, e) {
		var o,
			r = void 0;
		let i = this.wQe.get(t);
		return i
			? this.HQe(i, e)
			: (r = await this.bQe.LoadPrefabAsync(t, this.GQe))?.IsValid()
				? ((i = this.wQe.get(t))
						? ActorSystem_1.ActorSystem.Put(r)
						: ((i = new BattleUiPoolElement()),
							this.wQe.set(t, i),
							(o = new Array()).push(r),
							(i.ActorList = o),
							(i.Actor = r),
							this.wQe.set(t, i)),
					this.HQe(i, e))
				: void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Battle", 18, "加载Actor失败", ["", t])
					);
	}
	HQe(t, e) {
		var o;
		return 1 < t.ActorList.length
			? ((o = t.ActorList.pop()).K2_AttachRootComponentTo(e), o)
			: LguiUtil_1.LguiUtil.DuplicateActor(t.Actor, e);
	}
	RecycleActorByPath(t, e, o = !1) {
		return (
			this.tZ &&
				((t = this.wQe.get(t))
					? (t.ActorList.push(e),
						e.RootComponent.SetUIActive(!1),
						o && e.K2_AttachRootComponentTo(this.GQe))
					: ActorSystem_1.ActorSystem.Put(e)),
			!0
		);
	}
	async LoadSingleActorByPath(t, e) {
		let o = this.BQe.get(t);
		return o
			? (o.K2_AttachRootComponentTo(e), o)
			: (o = await this.bQe.LoadPrefabAsync(t, e))?.IsValid()
				? (this.BQe.set(t, o), o)
				: void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Battle", 18, "加载Actor失败", ["", t])
					);
	}
	RecycleSingleActor(t, e = !1) {
		return (
			this.tZ &&
				(t.RootComponent.SetUIActive(!1), e) &&
				t.K2_AttachRootComponentTo(this.GQe),
			!0
		);
	}
	async PreloadSingleActorByPath(t, e) {
		return (
			(t = await this.LoadSingleActorByPath(t, e)) &&
				this.RecycleSingleActor(t),
			!0
		);
	}
	Clear() {
		this.bQe.Clear();
		for (const t of this.wQe.values()) t.Clear();
		this.wQe.clear();
		for (const t of this.BQe.values()) ActorSystem_1.ActorSystem.Put(t);
		this.BQe.clear(),
			(this.tZ = !1),
			(this.qQe = void 0),
			(this.GQe = void 0),
			(this.NQe = void 0);
	}
}
exports.BattleUiPool = BattleUiPool;
