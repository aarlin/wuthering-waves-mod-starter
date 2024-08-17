"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var i,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, o);
		else
			for (var h = e.length - 1; 0 <= h; h--)
				(i = e[h]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
		return 3 < r && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelActorComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines"),
	RoleDefine_1 = require("../../../RoleUi/RoleDefine"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelActorComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Actor = void 0),
			(this.MainMeshComponent = void 0),
			(this.ChildMeshComponentList = void 0),
			(this.CharRenderingComponent = void 0),
			(this.Qwr = void 0),
			(this.Xwr = void 0),
			(this.$wr = (e) => {
				var t;
				if (
					(this.MainMeshComponent &&
						(this.Ywr(this.MainMeshComponent, e),
						e ||
							((t = this.MainMeshComponent.GetAnimInstance()),
							UE.KuroAnimLibrary.EndAnimNotifyStates(t))),
					this.ChildMeshComponentList && 0 < this.ChildMeshComponentList.length)
				)
					for (const t of this.ChildMeshComponentList) this.Ywr(t, e);
			}),
			(this.Jwr = (e) => {
				this.CharRenderingComponent?.SetDitherEffect(e, 0);
			});
	}
	OnInit() {
		switch (
			((this.Qwr = this.Owner.CheckGetComponent(0)), this.Qwr.ModelActorType)
		) {
			case 1:
			case 0:
				this.CharRenderingComponent = this.zwr();
		}
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelVisibleChange,
			this.$wr,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelSetDitherEffect,
				this.Jwr,
			);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelVisibleChange,
			this.$wr,
		),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Owner,
				EventDefine_1.EEventName.OnUiModelSetDitherEffect,
				this.Jwr,
			);
	}
	Zwr() {
		var e = this.Actor.AddComponentByClass(
			UE.SkeletalMeshComponent.StaticClass(),
			!1,
			MathUtils_1.MathUtils.DefaultTransform,
			!1,
		);
		return (
			e.SetTickableWhenPaused(!0),
			e.SetForcedLOD(1),
			this.Ywr(e, this.Qwr.GetVisible()),
			e
		);
	}
	zwr() {
		var e = this.Actor.AddComponentByClass(
			UE.CharRenderingComponent_C.StaticClass(),
			!1,
			MathUtils_1.MathUtils.DefaultTransform,
			!1,
		);
		return e.Init(5), e.SetTickableWhenPaused(!0), e;
	}
	eBr() {
		switch (this.Qwr.ModelType) {
			case 1:
				this.CharRenderingComponent.AddComponent(
					"WeaponCase0",
					this.MainMeshComponent,
				);
				break;
			case 0:
			case 2:
				this.CharRenderingComponent.AddComponent(
					"CharacterMesh0",
					this.MainMeshComponent,
				);
				break;
			case 3:
				this.CharRenderingComponent.AddComponent(
					"HuluCase",
					this.MainMeshComponent,
				);
		}
	}
	ChangeMesh(e, t, n) {
		switch (this.Qwr.ModelType) {
			case 0:
				this.tBr(e, t, n);
				break;
			case 1:
			case 2:
			case 3:
				this.iBr(e, t);
		}
	}
	iBr(e, t) {
		this.CharRenderingComponent.ResetAllRenderingState(), this.oBr();
		var n = this.MainMeshComponent,
			o = n?.GetAnimInstance();
		o && UE.KuroAnimLibrary.EndAnimNotifyStates(o), (o = this.Zwr());
		o?.SetSkeletalMesh(e),
			o?.SetAnimClass(t),
			(this.MainMeshComponent = o),
			n && this.rBr(n),
			this.eBr();
	}
	tBr(e, t, n) {
		if (0 !== this.Qwr?.ModelActorType)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 44, "actor类型必须为TsUiSceneRoleActor");
		else {
			this.CharRenderingComponent.ResetAllRenderingState(), this.oBr();
			var o = this.MainMeshComponent;
			let r;
			o &&
				(r = this.GetAnimInstanceFromSkeletalMesh(o)) &&
				UE.KuroAnimLibrary.EndAnimNotifyStates(r);
			var i = this.Zwr();
			e =
				(i?.SetSkeletalMesh(e),
				i?.SetAnimClass(t),
				this.GetAnimInstanceFromSkeletalMesh(i));
			if (r) {
				let n = !1;
				(n =
					!(!(t = r.StateInternal) || !((13 <= t && t <= 15) || 7 === t)) ||
					n) &&
					e &&
					e.SyncAnimInstance(r);
			}
			if (((this.MainMeshComponent = i), o && this.rBr(o), n && 0 < n.length))
				for (const e of n) this.nBr(e);
			this.eBr();
		}
	}
	nBr(e) {
		this.ChildMeshComponentList || (this.ChildMeshComponentList = []);
		var t = this.Zwr();
		t.SetSkeletalMesh(e),
			t.SetMasterPoseComponent(this.MainMeshComponent),
			this.ChildMeshComponentList.push(t),
			(e = this.ChildMeshComponentList.length - 1);
		return this.CharRenderingComponent.AddComponent("OtherCase" + e, t), t;
	}
	oBr() {
		if (this.ChildMeshComponentList)
			for (const e of this.ChildMeshComponentList) this.rBr(e);
	}
	rBr(e) {
		e.K2_DestroyComponent(this.Actor);
	}
	SetTransformByTag(e) {
		var t = UE.KuroCollectActorComponent.GetActorWithTag(
			FNameUtil_1.FNameUtil.GetDynamicFName(e),
			1,
		);
		t
			? this.Actor.K2_SetActorTransform(t.GetTransform(), !1, void 0, !1)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("UiSceneRoleActor", 44, "查找不到标签对象", [
					"标签Tag",
					e,
				]);
	}
	GetAnimInstanceFromSkeletalMesh(e) {
		var t = e.GetAnimInstance();
		if (t)
			if (
				(t = t.GetLinkedAnimGraphInstanceByTag(
					CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
				))
			) {
				if (
					this.Xwr ||
					((this.Xwr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
						RoleDefine_1.UI_ABP_PATH,
						UE.Class,
					)),
					this.Xwr)
				)
					return t.IsA(this.Xwr)
						? t
						: void (
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"UiComponent",
									44,
									"Ui场景以下网格体动画蓝图 LinkedAnimGraph节点父类配置错误，应该为ABP_Performance_{角色}",
									["Mesh:", e.SkeletalMesh.GetName()],
								)
							);
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiComponent",
						44,
						"Ui场景 基本路径网格体动画蓝图错误",
						[
							"现错误Path:",
							"/Game/Aki/Character/Role/Common/ABP_PerformanceRole.ABP_PerformanceRole_C",
						],
					);
			} else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiComponent",
						44,
						"Ui场景以下网格体动画状态机ABP_Performance_{角色}_PC需要重新生成",
						["Mesh:", e.SkeletalMesh.GetName()],
					);
		else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiComponent",
					44,
					"Ui场景以下网格体AnimInstance获取失败",
					["Mesh:", e.SkeletalMesh?.GetName()],
				);
	}
	Ywr(e, t) {
		e.SetHiddenInGame(!t),
			e.SetComponentTickEnabled(t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Character",
					44,
					"Mesh显隐",
					["MeshName", e.GetName()],
					["enable", t],
				);
	}
};
(UiModelActorComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(1)],
	UiModelActorComponent,
)),
	(exports.UiModelActorComponent = UiModelActorComponent);
