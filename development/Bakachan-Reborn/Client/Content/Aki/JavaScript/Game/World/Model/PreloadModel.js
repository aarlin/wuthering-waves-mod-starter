"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PreloadModel =
		exports.EntityAssetElement =
		exports.CommonAssetElement =
		exports.AssetElement =
		exports.preloadAssetTypeForName =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	Macro_1 = require("../../../Core/Preprocessor/Macro"),
	PreCreateEffect_1 = require("../../Effect/PreCreateEffect"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager");
exports.preloadAssetTypeForName = new Map([
	[0, "Animation"],
	[5, "AnimationBlueprint"],
	[2, "Audio"],
	[1, "Effect"],
	[4, "Material"],
	[3, "Mesh"],
	[6, "Other"],
]);
class AssetElement {
	constructor() {
		(this.AssetForIndexMap = new Map()),
			(this.HasError = !1),
			(this.AssetPathSet = new Set()),
			(this.AnimationAssetSet = new Set()),
			(this.MajorAssets = new Set()),
			(this.EffectAssetSet = new Set()),
			(this.AudioAssetSet = new Set()),
			(this.MeshAssetSet = new Set()),
			(this.MaterialAssetSet = new Set()),
			(this.OtherAssetSet = new Set()),
			(this.AnimationBlueprintClassAssetSet = new Set());
	}
	CheckPath(e) {
		return (
			!(!e || 0 === e.length) ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"搜集资源失败，asset=undefined或asset.length=0。",
				),
			!1)
		);
	}
	AddPath(e) {
		return !this.AssetPathSet.has(e) && (this.AssetPathSet.add(e), !0);
	}
	AddObject(e, t) {}
	AddMajorAsset(e) {
		this.CheckPath(e) && this.AddPath(e) && this.MajorAssets.add(e);
	}
	AddAnimationAsset(e) {
		this.CheckPath(e) && this.AddPath(e) && this.AnimationAssetSet.add(e);
	}
	AddEffectAsset(e) {
		return (
			!!this.CheckPath(e) &&
			!!this.AddPath(e) &&
			(this.EffectAssetSet.add(e), !0)
		);
	}
	AddAudioAsset(e) {
		this.CheckPath(e) && this.AddPath(e) && this.AudioAssetSet.add(e);
	}
	AddMeshAsset(e) {
		this.CheckPath(e) && this.AddPath(e) && this.MeshAssetSet.add(e);
	}
	AddMaterialAsset(e) {
		this.CheckPath(e) && this.AddPath(e) && this.MaterialAssetSet.add(e);
	}
	AddOtherAsset(e) {
		this.CheckPath(e) && this.AddPath(e) && this.OtherAssetSet.add(e);
	}
	AddAnimationBlueprintClassAsset(e) {
		this.CheckPath(e) &&
			this.AddPath(e) &&
			this.AnimationBlueprintClassAssetSet.add(e);
	}
	NeedLoadCount() {
		var e = this.OtherAssetSet.size,
			t = this.AnimationAssetSet.size,
			s = this.AudioAssetSet.size;
		return (
			e +
			t +
			this.AudioAssetSet.size +
			this.EffectAssetSet.size +
			this.MeshAssetSet.size +
			s +
			this.AnimationBlueprintClassAssetSet.size
		);
	}
	Clear() {
		this.AssetPathSet.clear(),
			this.OtherAssetSet.clear(),
			this.MaterialAssetSet.clear(),
			this.MeshAssetSet.clear(),
			this.AnimationAssetSet.clear(),
			this.AudioAssetSet.clear(),
			this.EffectAssetSet.clear(),
			this.AnimationBlueprintClassAssetSet.clear();
	}
	GetLoadPriority() {
		return 100;
	}
	PrintDebugInfo() {}
}
class CommonAssetElement extends (exports.AssetElement = AssetElement) {
	AddObject(e, t) {
		ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddCommonAsset(
			t,
		);
	}
	PrintDebugInfo() {}
	Clear() {
		ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.ClearCommonAsset(),
			super.Clear();
	}
}
exports.CommonAssetElement = CommonAssetElement;
class EntityAssetElement extends AssetElement {
	constructor(e) {
		super(),
			(this.DMr = 100),
			(this.dsr = 0),
			(this.CreatureDataComponent = void 0),
			(this.Csr = !1),
			(this.$fo = void 0),
			(this.gsr = void 0),
			(this.RMr = void 0),
			(this.UMr = void 0),
			(this.AMr = void 0),
			(this.IsDestroy = !1),
			(this.$fo = e),
			(this.CreatureDataComponent = e.Entity.GetComponent(0)),
			(ModelManager_1.ModelManager.PreloadModel.LoadingNeedWaitEntitySet.has(
				e.Id,
			) ||
				(this.CreatureDataComponent.IsRole() &&
					this.CreatureDataComponent.GetPlayerId() ===
						ModelManager_1.ModelManager.CreatureModel.GetPlayerId())) &&
				(this.DMr = 101),
			(e.Priority = this.DMr);
	}
	get LoadState() {
		return this.dsr;
	}
	set LoadState(e) {
		this.dsr = e;
	}
	get CollectMinorAsset() {
		return this.Csr;
	}
	set CollectMinorAsset(e) {
		this.Csr = e;
	}
	get Entity() {
		return this.$fo?.Entity;
	}
	get EntityHandle() {
		return this.$fo;
	}
	get BlueprintClassPath() {
		return this.gsr;
	}
	set BlueprintClassPath(e) {
		this.gsr = e;
	}
	get CharacterPath() {
		return this.RMr;
	}
	set CharacterPath(e) {
		this.RMr = e;
	}
	get PartHitEffectPath() {
		return this.UMr;
	}
	set PartHitEffectPath(e) {
		this.UMr = e;
	}
	get SkillDataTable() {
		return this.AMr;
	}
	set SkillDataTable(e) {
		this.AMr = e;
	}
	AddObject(e, t) {
		this.$fo?.Valid &&
			ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.AddEntityAsset(
				this.$fo.Id,
				t,
			);
	}
	Clear() {
		ModelManager_1.ModelManager.PreloadModel.HoldPreloadObject.RemoveEntityAssets(
			this.Entity.Id,
		),
			this.MajorAssets.clear(),
			(this.AMr = void 0),
			(this.RMr = void 0),
			(this.gsr = void 0),
			(this.$fo = void 0),
			(this.CreatureDataComponent = void 0),
			(this.Csr = !1),
			(this.dsr = 0),
			(this.IsDestroy = !0),
			super.Clear();
	}
	GetLoadPriority() {
		return this.DMr;
	}
	PrintDebugInfo() {}
}
exports.EntityAssetElement = EntityAssetElement;
class PreloadModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.PreCreateEffect = new PreCreateEffect_1.PreCreateEffect()),
			(this.CommonAssetElement = new CommonAssetElement()),
			(this.PreloadAssetMap = new Map()),
			(this.AllEntityAssetMap = new Map()),
			(this.PMr = void 0),
			(this.xMr = !0),
			(this.LoadAssetOneByOneState = !1),
			(this.UseEntityProfilerInternal = !0),
			(this.ResourcesLoadTime = new Array()),
			(this.LoadingNeedWaitEntitySet = new Set());
	}
	OnInit() {
		return (
			GlobalData_1.GlobalData.IsPlayInEditor || (this.xMr = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Preload",
					3,
					"预加载信息",
					["是否开启预加载", this.xMr],
					["是否使用LoadOneByOne", this.LoadAssetOneByOneState],
				),
			(this.PMr = UE.NewObject(
				UE.HoldPreloadObject.StaticClass(),
				GlobalData_1.GlobalData.GameInstance,
			)),
			this.PreCreateEffect.RegisterTick(),
			this.PreCreateEffect.Init(),
			!0
		);
	}
	OnClear() {
		return (
			(this.ResourcesLoadTime.length = 0),
			this.PMr.Clear(),
			this.PMr?.IsValid() && this.PMr.Clear(),
			(this.PMr = void 0),
			this.PreCreateEffect.UnregisterTick(),
			this.PreCreateEffect.Clear(),
			!0
		);
	}
	get HoldPreloadObject() {
		return this.PMr;
	}
	AddPreloadResource(e) {
		var t;
		this.PreloadAssetMap.has(e)
			? ((t = this.PreloadAssetMap.get(e)), this.PreloadAssetMap.set(e, t + 1))
			: this.PreloadAssetMap.set(e, 1);
	}
	RemovePreloadResource(e) {
		if (!this.PreloadAssetMap.has(e)) return !1;
		let t = this.PreloadAssetMap.get(e);
		return (
			0 < t && (t--, this.PreloadAssetMap.set(e, t)),
			0 === t && this.PreloadAssetMap.delete(e),
			!0
		);
	}
	ClearPreloadResource() {
		this.PreloadAssetMap.clear(),
			this.PMr.Clear(),
			this.LoadingNeedWaitEntitySet.clear();
	}
	AddEntityAsset(e, t) {
		return (
			!this.AllEntityAssetMap.has(e) && (this.AllEntityAssetMap.set(e, t), !0)
		);
	}
	RemoveEntityAsset(e) {
		return this.AllEntityAssetMap.delete(e);
	}
	ClearEntityAsset() {
		this.AllEntityAssetMap.clear();
	}
	get IsUsePreload() {
		return this.xMr;
	}
	set IsUsePreload(e) {
		this.xMr = e;
	}
	AddResourcesLoadTime(e) {
		this.ResourcesLoadTime.push(e);
	}
	ClearResourcesLoadTime() {
		this.ResourcesLoadTime.length = 0;
	}
	AddNeedWaitEntity(e) {
		this.LoadingNeedWaitEntitySet.add(e);
	}
	RemoveNeedWaitEntity(e) {
		this.LoadingNeedWaitEntitySet.delete(e);
	}
}
exports.PreloadModel = PreloadModel;
