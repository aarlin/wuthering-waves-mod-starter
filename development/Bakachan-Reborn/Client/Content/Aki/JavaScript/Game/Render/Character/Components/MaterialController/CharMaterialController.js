"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharMaterialController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	CharRenderBase_1 = require("../../Manager/CharRenderBase"),
	CharRuntimeMaterialControllerInfo_1 = require("./CharRuntimeMaterialControllerInfo");
class CharMaterialController extends CharRenderBase_1.CharRenderBase {
	constructor() {
		super(...arguments),
			(this.MaterialContainer = void 0),
			(this.AllMaterialControlRuntimeDataMap = void 0),
			(this.xhr = 0),
			(this.war = new Array()),
			(this.ihr = ""),
			(this.EnableDebug = !1),
			(this.DebugInfo = void 0),
			(this.whr = void 0);
	}
	PrintCurrentInfo() {
		let e = "";
		for (const t of this.AllMaterialControlRuntimeDataMap.values())
			e += "[" + t.DataCache.Data.GetName() + "]   ";
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"RenderCharacter",
				41,
				"",
				["当前存在的角色特效DA", e],
				["Actor", this.ihr],
			);
	}
	Start() {
		super.Start(),
			(this.war.length = 0),
			(this.xhr = 0),
			(this.EnableDebug = !1),
			(this.DebugInfo = new UE.PD_MaterialDebug_C()),
			(this.AllMaterialControlRuntimeDataMap = new Map()),
			(this.ihr = this.GetRenderingComponent().GetOwner().GetName());
		var e = this.RenderComponent.GetComponent(
			RenderConfig_1.RenderConfig.IdMaterialContainer,
		);
		void 0 === e
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"材质控制器初始化失败，不存在CharMaterialContainer",
					["Actor", this.ihr],
				)
			: ((this.MaterialContainer = e),
				this.ihr,
				(this.whr = void 0),
				this.OnInitSuccess());
	}
	GetRuntimeMaterialControllerInfo(e) {
		return this.AllMaterialControlRuntimeDataMap.get(e);
	}
	Update() {
		var e = this.GetDeltaTime();
		for (const a of this.AllMaterialControlRuntimeDataMap.values()) {
			var t = this.GetRenderingComponent().GetTimeDilation();
			a.UpdateState(e, t),
				a.UpdateEffect(this.MaterialContainer),
				a.IsDead && this.war.push(a.Id);
		}
		if (this.EnableDebug && this.DebugInfo) {
			this.DebugInfo.MaterialControllerList.Empty();
			for (const e of this.AllMaterialControlRuntimeDataMap)
				this.DebugInfo.MaterialControllerList.Set(
					e[0],
					e[1].DataCache.DataName,
				);
		}
		if (0 < this.war.length) {
			for (const e of this.war)
				this.AllMaterialControlRuntimeDataMap.get(e).Destroy(),
					this.AllMaterialControlRuntimeDataMap.delete(e),
					EventSystem_1.EventSystem.EmitWithTarget(
						this.RenderComponent,
						EventDefine_1.EEventName.OnRemoveMaterialController,
						e,
					);
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderCharacter",
					14,
					"自动移除材质控制器",
					["Actor", this.ihr],
					["handle array", this.war.join()],
				),
				(this.war.length = 0);
		}
	}
	SetEffectProgress(e, t) {
		(t = this.AllMaterialControlRuntimeDataMap.get(t)) && t.SetProgress(e);
	}
	Destroy() {
		for (const e of this.AllMaterialControlRuntimeDataMap.values()) e.Destroy();
		this.AllMaterialControlRuntimeDataMap = new Map();
	}
	RemoveSkeletalMeshMaterialControllerData(e) {
		for (const t of this.AllMaterialControlRuntimeDataMap.values())
			t.SpecifiedMaterialIndexMap?.delete(e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderCharacter",
						26,
						"移除材质控制器部件",
						["SkelName", e],
						["handleId", t.Id],
					);
	}
	RemoveAllMaterialControllerData() {
		0 < this.AllMaterialControlRuntimeDataMap.size &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("RenderCharacter", 41, "移除全部材质控制器", [
				"Actor",
				this.GetRenderingComponent().GetOwner().GetName(),
			]);
		for (const e of this.AllMaterialControlRuntimeDataMap.values())
			(e.IsDead = !0), e.UpdateEffect(this.MaterialContainer), e.Destroy();
		this.AllMaterialControlRuntimeDataMap.clear();
	}
	RemoveMaterialControllerData(e) {
		var t,
			a = this.AllMaterialControlRuntimeDataMap.get(e);
		return (
			!!a &&
			((t = this.GetRenderingComponent().GetOwner().GetName()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderCharacter",
					14,
					"手动移除材质控制器",
					["Actor", t],
					["材质控制器", a.DataCache.DataName],
					["handle", e],
				),
			(a.IsDead = !0),
			a.UpdateEffect(this.MaterialContainer),
			a.Destroy(),
			this.AllMaterialControlRuntimeDataMap.delete(e),
			!0)
		);
	}
	RemoveMaterialControllerDataWithEnding(e) {
		var t,
			a = this.AllMaterialControlRuntimeDataMap.get(e);
		return (
			!!a &&
			((t = this.GetRenderingComponent().GetOwner().GetName()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderCharacter",
					14,
					"移除材质控制器WithEnding",
					["Actor", t],
					["材质控制器", a.DataCache.DataName],
					["handle", e],
				),
			a.SetReadyToDie(),
			!0)
		);
	}
	AddMaterialControllerData(e, t) {
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderCharacter", 14, "添加的材质控制器数据为空", [
						"Actor",
						this.GetRenderingComponent().GetOwner().GetName(),
					]),
				-1
			);
		this.AllMaterialControlRuntimeDataMap.keys.length >
			RenderConfig_1.RenderConfig.RefErrorCount &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"RenderCharacter",
				14,
				"材质控制器添加失败，超过单个角色的材质控制器队列数量，检查是否进行了材质控制器移除和材质控制器特效的持续时间",
				["Actor", this.GetRenderingComponent().GetOwner().GetName()],
				["添加的材质控制器名称", e.GetName()],
			),
			this.xhr++;
		var a = this.xhr,
			r =
				new CharRuntimeMaterialControllerInfo_1.CharMaterialControlRuntimeData();
		return (
			r.Init(a, e, t),
			r.SetSpecifiedMaterialIndex(this.MaterialContainer),
			this.AllMaterialControlRuntimeDataMap.set(a, r),
			this.RenderComponent.MarkForceUpdateOnce(),
			a
		);
	}
	AddMaterialControllerDataDestroyCallback(e, t) {
		var a;
		return (
			!!(e = this.AllMaterialControlRuntimeDataMap.get(e)) &&
			((a = this.GetRenderingComponent().GetOwner().GetName()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderCharacter",
					41,
					"添加材质控制器DestroyCallback",
					["Actor", a],
					["材质控制器", e.DataCache.DataName],
				),
			e.AddDestroyCallback(t))
		);
	}
	RemoveMaterialControllerDataDestroyCallback(e, t) {
		var a;
		return (
			!!(e = this.AllMaterialControlRuntimeDataMap.get(e)) &&
			((a = this.GetRenderingComponent().GetOwner().GetName()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderCharacter",
					41,
					"移除材质控制器DestroyCallback",
					["Actor", a],
					["材质控制器", e.DataCache.DataName],
				),
			e.RemoveDestroyCallback(t))
		);
	}
	GetComponentId() {
		return RenderConfig_1.RenderConfig.IdMaterialController;
	}
	GetStatName() {
		return "CharMaterialController";
	}
}
exports.CharMaterialController = CharMaterialController;
