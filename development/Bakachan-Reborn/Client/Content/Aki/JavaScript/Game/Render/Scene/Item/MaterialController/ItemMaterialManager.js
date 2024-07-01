"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemMaterialManager = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig"),
	ItemMaterialController_1 = require("./ItemMaterialController");
class ItemMaterialManager {
	static Initialize() {
		(this.GlobalController = void 0),
			(this.ActorControllers = []),
			(this.IndexCountGlobal = -1),
			(this.IndexCount = -1),
			(this.AllGlobalControllerInfoMap = new Map()),
			(this.AllActorControllerInfoMap = new Map()),
			(this.IsInit = !0);
	}
	static Tick(t) {
		RenderModuleConfig_1.RenderStats.Init();
		var e = 0.001 * t,
			r = [];
		if (
			(this.IsInit || this.Initialize(),
			0 < this.AllGlobalControllerInfoMap.size)
		)
			for (const t of this.AllGlobalControllerInfoMap.keys()) {
				var o = this.AllGlobalControllerInfoMap.get(t);
				o?.IsValid()
					? o.Update(e)
					: (o.Destroy(), this.AllGlobalControllerInfoMap.delete(t));
			}
		if (0 < this.AllActorControllerInfoMap.size)
			for (const t of this.AllActorControllerInfoMap.keys()) {
				var l = this.AllActorControllerInfoMap.get(t);
				l?.IsValid() && void 0 !== l.GetLifeTimeController()
					? l.Update(e)
					: r.push(t);
			}
		for (let t = 0; t < r.length; t++) {
			var a = r[t];
			this.AllActorControllerInfoMap.get(a)
				? (this.AllActorControllerInfoMap.get(a).Destroy(),
					this.AllActorControllerInfoMap.delete(a))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						33,
						"单体交互物材质控制器队列已经没有目标控制器，卸载失败",
						["handle", a],
					),
				this.DataMap?.Map?.Get(a) && this.DataMap.Map.Remove(a);
		}
		if (
			this.AllMaterialSimpleControllers &&
			0 < this.AllMaterialSimpleControllers.size
		)
			for (const t of this.AllMaterialSimpleControllers.keys())
				this.AllMaterialSimpleControllers.get(t).UpdateParameters();
	}
	static AddMaterialData(t, e) {
		if (!t?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						33,
						"想要添加单体交互物材质控制器，但是传入的Actor是无效的",
						["Actor", t],
					),
				-1
			);
		if (!e?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						33,
						"想要添加单体交互物材质控制器，但是传入的Data是无效的",
						["Actor", t],
					),
				-1
			);
		this.DataMap?.IsValid() ||
			((this.DataMap = ActorSystem_1.ActorSystem.Get(
				UE.ItemMaterialDataMap_C.StaticClass(),
				UE.KismetMathLibrary.MakeTransform(
					Vector_1.Vector.ZeroVector,
					Rotator_1.Rotator.ZeroRotator,
					Vector_1.Vector.ZeroVector,
				),
			)),
			(this.DataMap.Map = UE.NewMap(
				UE.BuiltinInt,
				UE.ItemMaterialControllerActorData_C,
			))),
			(this.IndexCount = this.IndexCount + 1);
		var r = this.IndexCount;
		return this.DataMap.Map.Get(r)?.IsValid()
			? -1
			: (this.DataMap.Map.Add(r, e),
				this.AllActorControllerInfoMap.set(
					r,
					new ItemMaterialController_1.ItemMaterialActorController(t, e),
				),
				r);
	}
	static DisableActorData(t) {
		if (this.AllActorControllerInfoMap) {
			if (this.AllActorControllerInfoMap.has(t))
				return (
					!!this.AllActorControllerInfoMap.get(t) &&
					(this.AllActorControllerInfoMap.get(t).Stop(), !0)
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderEffect",
					33,
					"不满足删除单体交互物材质控制器的条件，返回false",
					["handle", t],
				);
		}
		return !1;
	}
	static DisableAllActorData() {
		if (!this.AllActorControllerInfoMap)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						33,
						"不满足删除单体交互物材质控制器的条件，返回false",
						["handle", -1],
					),
				!1
			);
		for (const t of this.AllActorControllerInfoMap.keys())
			this.AllActorControllerInfoMap.get(t).Stop(), this.WaitList.push(t);
		return (
			this.AllActorControllerInfoMap,
			this.DataMap?.Map && this.DataMap.Map.Empty(),
			(this.IndexCount = -1),
			!0
		);
	}
	static AddSimpleMaterialController(t, e, r) {
		if (!t?.IsValid())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						33,
						"想要添加单体交互物材质控制器，但是传入的Actor是无效的",
						["Actor", t],
					),
				-1
			);
		let o = 0;
		for (const l of this.AllMaterialSimpleControllers.keys()) {
			const a = this.AllMaterialSimpleControllers.get(l);
			if (a.GetActor() === t)
				return (
					(o = l), (a.ScalarParameterValue = e), (a.VectorParameterValue = r), o
				);
		}
		(this.IndexCountSimple = this.IndexCountSimple + 1),
			(o = this.IndexCountSimple);
		const l = new ItemMaterialController_1.ItemMaterialSimpleController(t);
		return (
			(l.ScalarParameterValue = e),
			(l.VectorParameterValue = r),
			this.AllMaterialSimpleControllers.set(o, l),
			o
		);
	}
	static DisableSimpleMaterialController(t) {
		return (
			!!this.AllMaterialSimpleControllers &&
			(this.AllMaterialSimpleControllers.delete(t), !0)
		);
	}
}
((exports.ItemMaterialManager = ItemMaterialManager).GlobalController = void 0),
	(ItemMaterialManager.ActorControllers = []),
	(ItemMaterialManager.AllGlobalControllerInfoMap = new Map()),
	(ItemMaterialManager.AllActorControllerInfoMap = new Map()),
	(ItemMaterialManager.AllMaterialSimpleControllers = new Map()),
	(ItemMaterialManager.IndexCountGlobal = -1),
	(ItemMaterialManager.IndexCount = -1),
	(ItemMaterialManager.IndexCountSimple = -1),
	(ItemMaterialManager.RefErrorCount = 5),
	(ItemMaterialManager.DataMap = void 0),
	(ItemMaterialManager.IsInit = !1),
	(ItemMaterialManager.WaitList = []);
