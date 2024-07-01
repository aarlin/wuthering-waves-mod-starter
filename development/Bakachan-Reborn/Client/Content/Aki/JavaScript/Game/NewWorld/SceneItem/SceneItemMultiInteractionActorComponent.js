"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, i) {
		var s,
			r = arguments.length,
			o =
				r < 3
					? e
					: null === i
						? (i = Object.getOwnPropertyDescriptor(e, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			o = Reflect.decorate(t, e, n, i);
		else
			for (var a = t.length - 1; 0 <= a; a--)
				(s = t[a]) && (o = (r < 3 ? s(o) : 3 < r ? s(e, n, o) : s(e, n)) || o);
		return 3 < r && o && Object.defineProperty(e, n, o), o;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemMultiInteractionActorComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Queue_1 = require("../../../Core/Container/Queue"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	SceneInteractionLevel_1 = require("../../Render/Scene/Item/SceneInteractionLevel"),
	AttachToActorController_1 = require("../../World/Controller/AttachToActorController"),
	ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
	MultiInteractionActorController_1 = require("../../World/Controller/MultiInteractionActorController"),
	CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines"),
	SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent"),
	defaultTagId = -821437887,
	MAX_GEN_TIME = 3;
class InteractionData {
	constructor(t, e) {
		(this.States = void 0),
			(this.Effects = void 0),
			(this.States = t),
			(this.Effects = e);
	}
}
let SceneItemMultiInteractionActorComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.TXr = void 0),
			(this.gU = !1),
			(this.Uvn = !1),
			(this.Ixe = void 0),
			(this.Pvn = void 0),
			(this.xvn = new Map()),
			(this.wvn = void 0),
			(this.Bvn = new Map()),
			(this.bvn = new Map()),
			(this.qvn = new Map()),
			(this.Gvn = new Map()),
			(this.ynn = new Map()),
			(this.UEn = !1),
			(this.Nvn = new Queue_1.Queue()),
			(this.gIe = (t, e) => {
				for (const s of [1408918695, -1278190765]) {
					if (t.includes(s))
						for (var [n] of this.qvn)
							this.AddTagsByIndex(
								SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(n),
								s,
							);
					if (e.includes(s))
						for (var [i] of this.qvn)
							this.RemoveTagsByIndex(
								SceneItemJigsawBaseComponent_1.JigsawIndex.GenObjFromKey(i),
								s,
							);
				}
			}),
			(this.Ovn = () => {
				let t = 0;
				if (this.Pvn)
					for (; t < 3; ) {
						if (this.Pvn.length <= 0)
							return (
								this.kvn(),
								void ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
									this,
								)
							);
						var e = this.Pvn.shift();
						this.Fvn(e, this.Ixe.MainActor), t++;
					}
				else
					ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
						this,
					);
			});
	}
	OnStart() {
		return (this.Hte = this.Entity.GetComponent(182)), !0;
	}
	kvn() {
		for (this.Uvn = !0; !this.Nvn.Empty; ) {
			var t = this.Nvn.Pop();
			t.Func(t.Index, t.TagIds);
		}
		var e = UE.NewArray(UE.Transform),
			n = this.Ixe?.MainActor;
		if (
			n?.CollisionActors?.Num() &&
			((n = n.CollisionActors?.Get(0)), n && n.StaticMeshComponent?.StaticMesh)
		) {
			for (var [, i] of this.qvn) {
				var s = this.Hte?.ActorTransform,
					i = i.GetTransform().GetRelativeTransform(s);
				e.Add(i);
			}
			var r = this.Hte?.Owner;
			r &&
				(r = r.GetComponentByClass(UE.StaticMeshComponent.StaticClass())) &&
				(UE.KuroStaticMeshLibrary.MergeSimpleCollisions(
					n.StaticMeshComponent,
					e,
				),
				r.SetStaticMesh(n.StaticMeshComponent?.StaticMesh)),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.gIe,
				);
		}
	}
	OnEnd() {
		for (var [, t] of (EventSystem_1.EventSystem.HasWithTarget(
			this.Entity,
			EventDefine_1.EEventName.OnLevelTagChanged,
			this.gIe,
		) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnLevelTagChanged,
				this.gIe,
			),
		this.qvn))
			MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(
				t,
			);
		var e;
		return (
			this.qvn.clear(),
			this.Ixe?.MainActor?.IsValid() &&
				((e = this.Ixe.MainActor),
				MultiInteractionActorController_1.MultiInteractionActorController.AddWaitDestroyActor(
					e,
				)),
			!0
		);
	}
	Fvn(t, e) {
		var n = this.wvn(t);
		const i = UE.KuroStaticLibrary.SpawnActorFromAnother(e, this.Hte.Owner);
		if (i?.IsValid()) {
			AttachToActorController_1.AttachToActorController.AttachToActor(
				i,
				this.Hte.Owner,
				2,
				"SceneItemMultiInteractionActorComponent.GenerateActorInternal",
				void 0,
				2,
				2,
				2,
				!1,
				!1,
			),
				(e = e.K2_GetActorRotation()),
				i.K2_SetActorLocationAndRotation(n.ToUeVector(), e, !1, void 0, !0),
				this.Bvn.clear(),
				this.Vvn(i),
				this.Hvn(i),
				this.jvn(i, i);
			const s = t.GetKey();
			this.qvn.set(s, i),
				GlobalData_1.GlobalData.IsPlayInEditor && (i.ActorLabel = s),
				TimerSystem_1.TimerSystem.Next(() => {
					if ((this.tsn(t), this.xvn.has(s))) {
						const t = this.xvn.get(s);
						this.xvn.delete(s);
						let e = this.Gvn.get(s);
						(e = (e = e || []).concat(t)), this.Gvn.set(s, e);
					}
					const e = this.Gvn.get(s);
					if (void 0 !== e)
						for (const n of e)
							i.PlayExtraEffectOnTagsChange(
								GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n),
							),
								this.Wvn(t, n, !0);
				});
		}
	}
	Kvn(t) {
		var e = this.TXr.场景交互物状态列表;
		for (const i of t) {
			var n = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i);
			if (void 0 !== (n = e.Get(n))) return n;
		}
		return 21;
	}
	Vvn(t) {
		var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
			n = (t.GetAttachedActors(e, !0), (0, puerts_1.$unref)(e));
		for (let t = 0; t < n.Num(); t++) this.Vvn(n.Get(t));
		this.Bvn.set(t.GetOwner(), t);
	}
	Hvn(t) {
		for (let a = 0; a < t.States.Num(); a++) {
			var e,
				n = t.States.GetKey(a),
				i = t.States.Get(n);
			for (let t = 0; t < i.Effects.Num(); t++) {
				const n = i.Effects.Get(t);
				this.Bvn.has(n) && ((e = this.Bvn.get(n)), i.Effects.Set(t, e));
			}
			for (let t = 0; t < i.Actors.Num(); t++) {
				const e = i.Actors.Get(t);
				this.Bvn.has(e) && i.Actors.Set(t, this.Bvn.get(e));
			}
			for (let t = 0; t < i.HideActors.Num(); t++) {
				const e = i.HideActors.Get(t);
				this.Bvn.has(e) && i.HideActors.Set(t, this.Bvn.get(e));
			}
			for (let t = 0; t < i.MaterialControllers.Num(); t++) {
				var s = i.MaterialControllers.Get(t);
				for (let t = 0; t < s.Actors.Num(); t++) {
					const e = s.Actors.Get(t);
					this.Bvn.has(e) && s.Actors.Set(t, this.Bvn.get(e));
				}
			}
			for (let t = 0; t < i.StateBasedEffect.Num(); t++) {
				var r,
					o = i.StateBasedEffect.Get(t);
				const e = o.StateBasedEffect;
				this.Bvn.has(e) && ((r = this.Bvn.get(e)), (o.StateBasedEffect = r));
			}
		}
		for (let e = 0; e < t.Effects.Num(); e++) {
			var a = t.Effects.GetKey(e),
				l = t.Effects.Get(a);
			for (let t = 0; t < l.Material.Actors.Num(); t++) {
				const e = l.Material.Actors.Get(t);
				this.Bvn.has(e) && l.Material.Actors.Set(t, this.Bvn.get(e));
			}
			this.Bvn.has(l.Effect) && ((a = this.Bvn.get(l.Effect)), (l.Effect = a));
		}
		for (let e = 0; e < t.TagsAndCorrespondingEffects.Num(); e++) {
			var c = t.TagsAndCorrespondingEffects.GetKey(e),
				h = t.TagsAndCorrespondingEffects.Get(c);
			for (let t = 0; t < h.Actors.Num(); t++) {
				const e = h.Actors.Get(t);
				this.Bvn.has(e) && h.Actors.Set(t, this.Bvn.get(e));
			}
			for (let t = 0; t < h.Effects.Num(); t++) {
				var v = h.Effects.Get(t);
				this.Bvn.has(v) && ((v = this.Bvn.get(v)), h.Effects.Set(t, v));
			}
			for (let t = 0; t < h.HideActors.Num(); t++) {
				var m = h.HideActors.Get(t);
				this.Bvn.has(m) && h.HideActors.Set(t, this.Bvn.get(m));
			}
			for (let t = 0; t < h.MaterialControllers.Num(); t++) {
				var f = h.MaterialControllers.Get(t);
				for (let t = 0; t < f.Actors.Num(); t++) {
					var d = f.Actors.Get(t);
					this.Bvn.has(d) && f.Actors.Set(t, this.Bvn.get(d));
				}
			}
		}
		this.bvn.set(t, new InteractionData(t.States, t.Effects));
	}
	jvn(t, e) {
		var n = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
			i = (t.GetAttachedActors(n, !0), (0, puerts_1.$unref)(n));
		for (let t = 0; t < i.Num(); t++) this.jvn(i.Get(t), e);
		t.Owner = e;
	}
	InitGenerateInfo(t, e, n, i) {
		(this.TXr = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, t)),
			(this.Pvn = e),
			(this.wvn = n),
			void 0 !== i && (this.Gvn = i),
			this.InitLevelDynamic(this.Hte.ActorLocation, this.Hte.ActorRotation),
			(this.gU = !0);
	}
	InitLevelDynamic(t, e) {
		var n = GlobalData_1.GlobalData.World;
		let i = this.TXr.场景交互物.AssetPathName?.toString();
		i.includes(".") && (i = i.split(".")[0]);
		var s = (0, puerts_1.$ref)(!1),
			r =
				((n = UE.LevelStreamingDynamic.LoadLevelInstance(n, i, t, e, s)),
				(s = (0, puerts_1.$unref)(s)),
				GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-821437887));
		r = this.TXr.场景交互物状态列表.Get(r);
		s &&
			n &&
			((this.Ixe = new SceneInteractionLevel_1.SceneInteractionLevel()),
			this.Ixe.Init(
				n,
				i,
				t,
				e,
				-1,
				r,
				() => {
					this.Txe();
				},
				!0,
			));
	}
	Txe() {
		this.Ixe.AttachToActor(this.Hte.Owner),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				(this.Ixe.MainActor.ActorLabel = "Template:" + this.Ixe.LevelName);
		var t = this.Ixe.GetAllActorsInLevel();
		if (t)
			for (let n = 0, i = t.Num(); n < i; n++) {
				var e = t.Get(n);
				e instanceof UE.StaticMeshActor &&
					(e.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE),
					e.StaticMeshComponent?.SetReceivesDecals(!1),
					e.SetActorHiddenInGame(!0),
					e.SetActorEnableCollision(!1));
			}
		this.Active
			? this.Pvn &&
				ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
					this,
					this.Ovn,
				)
			: (this.UEn = !0);
	}
	OnEnable() {
		this.UEn &&
			this.Pvn &&
			(ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
				this,
				this.Ovn,
			),
			(this.UEn = !1));
	}
	IsChildrenActor(t) {
		return this.bvn.has(t.Owner);
	}
	GetInteractionActorByIndex(t) {
		return this.qvn.get(t.GetKey());
	}
	AddTagsByIndex(t, e) {
		var n = this.qvn.get(t.GetKey());
		if (n?.IsValid() || !this.Uvn) {
			var i = this.Uvn ? this.Gvn : this.xvn;
			let s = i.get(t.GetKey()),
				r = (s || ((s = []), i.set(t.GetKey(), s)), -1);
			if (Array.isArray(e))
				for (const i of e)
					(r = s.indexOf(i)) < 0 &&
						(s.push(i), this.Uvn) &&
						(n.PlayExtraEffectOnTagsChange(
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i),
						),
						this.Wvn(t, i, !0));
			else
				(r = s.indexOf(e)) < 0 &&
					(s.push(e), this.Uvn) &&
					(n.PlayExtraEffectOnTagsChange(
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e),
					),
					this.Wvn(t, e, !0));
			this.Uvn && this.tsn(t);
		}
	}
	RemoveTagsByIndex(t, e) {
		var n = this.qvn.get(t.GetKey());
		if (n?.IsValid() || !this.Uvn) {
			var i = this.Uvn ? this.Gvn : this.xvn;
			let s = i.get(t.GetKey()),
				r = (s || ((s = []), i.set(t.GetKey(), s)), -1);
			if (Array.isArray(e))
				for (const i of e)
					-1 < (r = s.indexOf(i)) &&
						(s.splice(r, 1), this.Uvn) &&
						(n.StopExtraEffectOnTagsChange(
							GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i),
						),
						this.Wvn(t, i, !1));
			else
				-1 < (r = s.indexOf(e)) &&
					(s.splice(r, 1), this.Uvn) &&
					(n.StopExtraEffectOnTagsChange(
						GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e),
					),
					this.Wvn(t, e, !1));
			this.Uvn && this.tsn(t);
		}
	}
	HasTagByIndex(t, e) {
		return (
			!!(t = (this.Uvn ? this.Gvn : this.xvn).get(t.GetKey())) &&
			-1 < t.indexOf(e)
		);
	}
	Wvn(t, e, n) {
		let i = this.ynn.get(t.GetKey());
		var s = this.qvn.get(t.GetKey());
		n
			? (void 0 === i && ((i = new Map()), this.ynn.set(t.GetKey(), i)),
				i.has(e) ||
					((n = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e)),
					void 0 !== (t = this.TXr.场景交互物特效列表.Get(n)) &&
						(s.PlayIndependentEffect(t), i.set(e, t))))
			: void 0 !== i &&
				0 !== i.size &&
				i.has(e) &&
				((n = i.get(e)),
				i.delete(e),
				s.EndIndependentEffect(n),
				s.PlayIndependentEndEffect(n));
	}
	tsn(t) {
		t = t.GetKey();
		var e = this.qvn.get(t);
		let n = [],
			i = 21;
		this.Gvn.has(t) && (n = this.Gvn.get(t)),
			21 === (i = 0 < n?.length ? this.Kvn(n) : i) &&
				((t =
					GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-821437887)),
				(i = this.TXr.场景交互物状态列表.Get(t))),
			e.SetState(i, !0, !1);
	}
	DynamicRemoveActorByIndex(t) {
		var e, n;
		this.Uvn
			? ((e = t.GetKey()),
				void 0 !== (n = this.qvn.get(e)) &&
					(this.qvn.delete(e), n.DestroySelf()))
			: this.Nvn.Push({
					Func: (t) => {
						this.DynamicRemoveActorByIndex(t);
					},
					Index: t,
					TagIds: [],
				});
	}
	DynamicAddActorByIndex(t, e) {
		if (this.Uvn) {
			var n = t.GetKey();
			let i = this.Gvn.get(n);
			(i = (i = i || []).concat(e)),
				this.Gvn.set(n, i),
				this.Fvn(t, this.Ixe.MainActor);
		} else
			this.Nvn.Push({
				Func: (t, e) => {
					this.DynamicAddActorByIndex(t, e);
				},
				Index: t,
				TagIds: e,
			});
	}
	GetIsInit() {
		return this.gU;
	}
	GetIsFinish() {
		return this.Uvn;
	}
	SetIsFinish(t) {
		this.Uvn = t;
	}
};
(SceneItemMultiInteractionActorComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(143)],
	SceneItemMultiInteractionActorComponent,
)),
	(exports.SceneItemMultiInteractionActorComponent =
		SceneItemMultiInteractionActorComponent);
