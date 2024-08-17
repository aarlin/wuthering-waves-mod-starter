"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PreloadModelNew = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	PreCreateEffect_1 = require("../../Effect/PreCreateEffect"),
	GlobalData_1 = require("../../GlobalData"),
	PreloadDefine_1 = require("../../Preload/PreloadDefine");
class PreloadModelNew extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ProjectPath = void 0),
			(this.JsonExportRootPath = void 0),
			(this.ModelConfigJsonExportPath = void 0),
			(this.SkillJsonExportPath = void 0),
			(this.CommonSkillJsonExportPath = void 0),
			(this.BulletJsonExportPath = void 0),
			(this.StateMachineJsonExportPath = void 0),
			(this.PreCreateEffect = new PreCreateEffect_1.PreCreateEffect()),
			(this.CommonAssetElement = new PreloadDefine_1.CommonAssetElement()),
			(this.PreloadAssetMap = new Map()),
			(this.wMr = new Map()),
			(this.BMr = new Map()),
			(this.PMr = void 0),
			(this.LoadingNeedWaitEntitySet = new Set());
	}
	get HoldPreloadObject() {
		return this.PMr;
	}
	OnInit() {
		return (
			(this.ProjectPath = UE.KismetSystemLibrary.ConvertToAbsolutePath(
				UE.BlueprintPathsLibrary.ProjectDir(),
			)),
			(this.JsonExportRootPath = UE.KismetSystemLibrary.ConvertToAbsolutePath(
				this.ProjectPath + "../Config/Client/Preload/",
			)),
			(this.ModelConfigJsonExportPath =
				this.JsonExportRootPath + "ModelConfig/"),
			(this.SkillJsonExportPath = this.JsonExportRootPath + "SkillInfo/"),
			(this.CommonSkillJsonExportPath =
				this.JsonExportRootPath + "CommonSkillInfo/"),
			(this.BulletJsonExportPath = this.JsonExportRootPath + "BulletInfo/"),
			(this.StateMachineJsonExportPath =
				this.JsonExportRootPath + "EntityFsm/"),
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
			this.PMr.Clear(),
			this.PMr?.IsValid() && this.PMr.Clear(),
			(this.PMr = void 0),
			this.PreCreateEffect.UnregisterTick(),
			this.PreCreateEffect.Clear(),
			this.BMr.clear(),
			!0
		);
	}
	AddPreloadResource(t) {
		var e;
		this.PreloadAssetMap.has(t)
			? ((e = this.PreloadAssetMap.get(t)), this.PreloadAssetMap.set(t, e + 1))
			: this.PreloadAssetMap.set(t, 1);
	}
	RemovePreloadResource(t) {
		if (!this.PreloadAssetMap.has(t)) return !1;
		let e = this.PreloadAssetMap.get(t);
		return (
			0 < e && (e--, this.PreloadAssetMap.set(t, e)),
			0 === e && this.PreloadAssetMap.delete(t),
			!0
		);
	}
	ClearPreloadResource() {
		this.PreloadAssetMap.clear(),
			this.PMr.Clear(),
			this.LoadingNeedWaitEntitySet.clear();
	}
	AddEntityAsset(t, e) {
		return !this.wMr.has(t) && (this.wMr.set(t, e), !0);
	}
	HasEntityAsset(t) {
		return this.wMr.has(t);
	}
	GetEntityAssetElement(t) {
		return this.wMr.get(t);
	}
	RemoveEntityAsset(t) {
		return this.wMr.delete(t);
	}
	ClearEntityAsset() {
		this.wMr.clear();
	}
	AddNeedWaitEntity(t) {
		this.LoadingNeedWaitEntitySet.add(t);
	}
	RemoveNeedWaitEntity(t) {
		this.LoadingNeedWaitEntitySet.delete(t);
	}
	AddCommonSkill(t, e, r) {
		return this.BMr.has(t)
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Preload", 3, "[预加载] 重复添加技能", [
						"SkillId",
						t,
					]),
				!1)
			: (this.BMr.set(t, [e, r]), !0);
	}
	IsCommonSkill(t) {
		return this.BMr.has(t);
	}
	GetCommonSkill(t) {
		return this.BMr.get(t);
	}
}
exports.PreloadModelNew = PreloadModelNew;
