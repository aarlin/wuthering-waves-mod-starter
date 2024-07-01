"use strict";
var SceneItemAttachTargetComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (t, e, n, o) {
			var a,
				i = arguments.length,
				r =
					i < 3
						? e
						: null === o
							? (o = Object.getOwnPropertyDescriptor(e, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(t, e, n, o);
			else
				for (var s = t.length - 1; 0 <= s; s--)
					(a = t[s]) &&
						(r = (i < 3 ? a(r) : 3 < i ? a(e, n, r) : a(e, n)) || r);
			return 3 < i && r && Object.defineProperty(e, n, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemAttachTargetComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	StaticSceneUtils_1 = require("../../../../LevelGamePlay/StaticScene/StaticSceneUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager");
let SceneItemAttachTargetComponent =
	(SceneItemAttachTargetComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Lo = void 0),
				(this.SIe = void 0),
				(this.Mln = "Relatively"),
				(this.Sln = "Relatively"),
				(this.Eln = void 0),
				(this.yln = void 0),
				(this.Iln = void 0),
				(this.Tln = void 0),
				(this.Hte = void 0),
				(this.Lln = void 0),
				(this.Dln = (t, e, n) => {
					e?.Valid &&
						(e = e.Entity.GetComponent(0)?.GetPbDataId()) &&
						this.Eln === e &&
						this.Rln();
				}),
				(this.Aln = (t, e) => {
					e?.Valid &&
						(e = e.Entity.GetComponent(0)?.GetPbDataId()) &&
						this.Eln === e &&
						(this.Uln(),
						EventSystem_1.EventSystem.Has(
							EventDefine_1.EEventName.AddEntity,
							this.Dln,
						) ||
							EventSystem_1.EventSystem.Add(
								EventDefine_1.EEventName.AddEntity,
								this.Dln,
							));
				}),
				(this.Pln = () => {
					var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
						this.Eln,
					);
					t &&
						t.Entity &&
						(EventSystem_1.EventSystem.HasWithTarget(
							t.Entity,
							EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
							this.Pln,
						) &&
							EventSystem_1.EventSystem.RemoveWithTarget(
								t.Entity,
								EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
								this.Pln,
							),
						this.Rln());
				}),
				(this.xln = (t) => {
					t.op_Equality(this.Tln) &&
						((t = this.Lln.GetActor(this.Tln)), this.wln(t));
				}),
				(this.Bln = (t) => {
					this.bln(t);
				});
		}
		static get Dependencies() {
			return [182, 0];
		}
		OnInitData(t) {
			if (
				((t = t.GetParam(SceneItemAttachTargetComponent_1)[0]),
				(this.Lo = t),
				(this.SIe = this.Entity.GetComponent(0)),
				this.Lo?.AttachTarget)
			)
				switch (
					((this.Mln = this.Lo.PosRule ?? "Relatively"),
					(this.Sln = this.Lo.RotRule ?? "Relatively"),
					this.Lo.AttachTarget?.Type)
				) {
					case "Entity":
						(this.Eln = this.Lo.AttachTarget.EntityId),
							(this.yln = this.Lo.AttachTarget.AttachPoint);
						break;
					case "Actor":
						this.Iln = this.Lo.AttachTarget.ActorRef?.PathName ?? "";
				}
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						7,
						"[SceneItemAttachTargetComponent]附加目标配置无效，请联系对应策划检查配置",
						["PbDataId:", this.SIe?.GetPbDataId()],
					);
			return !0;
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(182)),
				!!this.Hte ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							7,
							"[SceneItemAttachTargetComponent]Invalid ActorComp",
							["PbDataId:", this.SIe?.GetPbDataId()],
						),
					!1)
			);
		}
		OnActivate() {
			this.qln();
		}
		OnEnd() {
			return (
				this.Gln(),
				EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.AddEntity,
					this.Dln,
				) &&
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.AddEntity,
						this.Dln,
					),
				!0
			);
		}
		qln() {
			switch (this.Lo.AttachTarget?.Type) {
				case "Entity":
					this.Rln();
					break;
				case "Actor":
					this.Nln();
			}
		}
		Gln() {
			switch (this.Lo.AttachTarget?.Type) {
				case "Entity":
					this.Uln();
					break;
				case "Actor":
					this.Oln();
			}
		}
		Rln() {
			if (this.Eln) {
				var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					this.Eln,
				);
				if (t?.IsInit) {
					var e = t.Entity?.GetComponent(182);
					if (e)
						if (this.yln && !e?.GetIsSceneInteractionLoadCompleted())
							EventSystem_1.EventSystem.HasWithTarget(
								t.Entity,
								EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
								this.Pln,
							) ||
								EventSystem_1.EventSystem.AddWithTarget(
									t.Entity,
									EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
									this.Pln,
								);
						else {
							let t;
							(t = this.yln ? e.GetActorInSceneInteraction(this.yln) : e.Owner),
								this.wln(t),
								EventSystem_1.EventSystem.Has(
									EventDefine_1.EEventName.RemoveEntity,
									this.Aln,
								) ||
									EventSystem_1.EventSystem.Add(
										EventDefine_1.EEventName.RemoveEntity,
										this.Aln,
									);
						}
				} else
					EventSystem_1.EventSystem.Has(
						EventDefine_1.EEventName.AddEntity,
						this.Dln,
					) ||
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.AddEntity,
							this.Dln,
						);
			}
		}
		Uln() {
			if (this.Eln) {
				EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.RemoveEntity,
					this.Aln,
				) &&
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.RemoveEntity,
						this.Aln,
					);
				var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					this.Eln,
				);
				t =
					(t?.Entity &&
						EventSystem_1.EventSystem.HasWithTarget(
							t.Entity,
							EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
							this.Pln,
						) &&
						EventSystem_1.EventSystem.RemoveWithTarget(
							t.Entity,
							EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
							this.Pln,
						),
					t?.Entity?.GetComponent(182));
				let e;
				(e = this.yln
					? t?.GetIsSceneInteractionLoadCompleted()
						? t?.GetActorInSceneInteraction(this.yln)
						: void 0
					: t?.Owner),
					this.bln(e);
			}
		}
		Nln() {
			if (this.Iln) {
				var t = this.Hte.CreatureData.GetPbDataId();
				if (
					(t = StaticSceneUtils_1.StaticSceneUtils.GetActorRefByPbDataId(t))
				) {
					for (const e of t)
						this.Iln = e.PathName.split(".")[1] + "." + e.ActorName;
					(this.Lln?.IsValid() ||
						((this.Lln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
							GlobalData_1.GlobalData.World,
							UE.KuroActorSubsystem.StaticClass(),
						)),
						this.Lln?.IsValid())) &&
						(this.Tln || (this.Tln = new UE.FName(this.Iln)),
						this.Lln.OnAddToSubsystem.Add(this.xln),
						(t = this.Lln.GetActor(this.Tln))?.IsValid()) &&
						this.wln(t);
				}
			}
		}
		Oln() {
			var t;
			this.Tln &&
				(this.Lln?.IsValid() && this.Lln.OnAddToSubsystem.Remove(this.xln),
				(t = this.Lln?.GetActor(this.Tln)),
				this.bln(t));
		}
		wln(t) {
			if (this.Hte?.Owner?.IsValid() && t?.IsValid()) {
				if (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"SceneItem",
							40,
							"[SceneItemAttachTargetComponent] AttachToTargetActor: 开始",
							["PbDataId", this.SIe?.GetPbDataId()],
							[
								"自身坐标",
								Vector_1.Vector.Create(this.Hte.Owner.K2_GetActorLocation()),
							],
							[
								"自身旋转",
								Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation()),
							],
							["目标坐标", Vector_1.Vector.Create(t.K2_GetActorLocation())],
							["目标旋转", Rotator_1.Rotator.Create(t.K2_GetActorRotation())],
							["目标PathName", UE.KismetSystemLibrary.GetPathName(t)],
							["PosAttachRule", this.Mln],
							["RotAttachRule", this.Sln],
						),
					this.Hte.Owner.RootComponent?.SetAbsolute(
						"Absolute" === this.Mln,
						"Absolute" === this.Sln,
						!0,
					),
					this.Hte.Owner.K2_AttachToActor(
						t,
						void 0,
						"AlignTarget" === this.Mln ? 2 : 1,
						"AlignTarget" === this.Sln ? 2 : 1,
						1,
						!0,
					),
					t.OnDestroyed.Add(this.Bln),
					"Relatively" === this.Mln || "Relatively" === this.Sln)
				) {
					let a;
					if (this.Iln?.length) {
						var e = (0, puerts_1.$ref)(void 0);
						this.Lln.GetActorOriginalTransform(this.Tln, e),
							(a = (0, puerts_1.$unref)(e));
					} else {
						var n = (e =
								ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
									this.Eln,
								).Entity).GetComponent(182),
							o = ((e = e.GetComponent(0)), e.GetPbEntityInitData()?.Transform);
						o = o ? this.kln(o) : e.GetTransform();
						let i;
						(i =
							(i = this.yln?.length
								? n.GetActorInSceneInteractionOriginalRelTransform(t)
								: i) ||
							t.GetTransform().GetRelativeTransform(n.Owner.GetTransform())),
							(a = i.op_Multiply(o));
					}
					a ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"SceneItem",
								40,
								"[SceneItemAttachTargetComponent] 目标初始坐标获取失败",
								["PbDataId:", this.SIe?.GetPbDataId()],
							)),
						(e = this.SIe.GetPbEntityInitData()?.Transform),
						(o = (n = e
							? this.kln(e)
							: this.SIe.GetTransform()).GetRelativeTransform(a)),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"SceneItem",
								40,
								"[SceneItemAttachTargetComponent] AttachToTargetActor: 计算相对信息",
								["PbDataId", this.SIe?.GetPbDataId()],
								["自身初始坐标", Vector_1.Vector.Create(n.GetLocation())],
								["自身初始旋转", Rotator_1.Rotator.Create(n.Rotator())],
								["目标初始坐标", Vector_1.Vector.Create(a.GetLocation())],
								["目标初始旋转", Rotator_1.Rotator.Create(a.Rotator())],
								["彼此相对坐标", Vector_1.Vector.Create(o.GetLocation())],
								["彼此相对旋转", Rotator_1.Rotator.Create(o.Rotator())],
							),
						"Relatively" === this.Mln &&
							this.Hte.Owner.K2_SetActorRelativeLocation(
								o.GetLocation(),
								!1,
								void 0,
								!1,
							),
						"Relatively" === this.Sln &&
							this.Hte.Owner.K2_SetActorRelativeRotation(
								o.Rotator(),
								!1,
								void 0,
								!1,
							);
				}
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"SceneItem",
						40,
						"[SceneItemAttachTargetComponent] AttachToTargetActor: 完成",
						["PbDataId", this.SIe?.GetPbDataId()],
						[
							"自身坐标",
							Vector_1.Vector.Create(this.Hte.Owner.K2_GetActorLocation()),
						],
						[
							"自身旋转",
							Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation()),
						],
						["目标坐标", Vector_1.Vector.Create(t.K2_GetActorLocation())],
						["目标旋转", Rotator_1.Rotator.Create(t.K2_GetActorRotation())],
						[
							"自身相对坐标",
							Vector_1.Vector.Create(
								this.Hte.Owner.RootComponent?.RelativeLocation,
							),
						],
						[
							"自身相对旋转",
							Rotator_1.Rotator.Create(
								this.Hte.Owner.RootComponent?.RelativeRotation,
							),
						],
					);
			}
		}
		bln(t) {
			this.Hte?.Owner?.IsValid() &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"SceneItem",
						40,
						"[SceneItemAttachTargetComponent] DetachFromTargetActor: 开始",
						["PbDataId", this.SIe?.GetPbDataId()],
						[
							"自身坐标",
							Vector_1.Vector.Create(this.Hte.Owner.K2_GetActorLocation()),
						],
						[
							"自身旋转",
							Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation()),
						],
					),
				this.Hte.Owner.K2_DetachFromActor(1, 1, 1),
				t?.OnDestroyed.Remove(this.Bln));
		}
		kln(t) {
			var e = new UE.Transform();
			return (
				e.SetLocation(new UE.Vector(t.Pos.X ?? 0, t.Pos.Y ?? 0, t.Pos.Z ?? 0)),
				e.SetRotation(
					UE.Rotator.MakeFromEuler(
						new UE.Vector(t.Rot?.X ?? 0, t.Rot?.Y ?? 0, t.Rot?.Z ?? 0),
					).Quaternion(),
				),
				e.SetScale3D(
					new UE.Vector(t.Scale?.X ?? 1, t.Scale?.Y ?? 1, t.Scale?.Z ?? 1),
				),
				e
			);
		}
	});
(SceneItemAttachTargetComponent = SceneItemAttachTargetComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(109)],
		SceneItemAttachTargetComponent,
	)),
	(exports.SceneItemAttachTargetComponent = SceneItemAttachTargetComponent);
