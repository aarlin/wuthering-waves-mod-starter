"use strict";
var __decorate =
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
				(a = t[s]) && (r = (i < 3 ? a(r) : 3 < i ? a(e, n, r) : a(e, n)) || r);
		return 3 < i && r && Object.defineProperty(e, n, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemDynamicAttachTargetComponent = exports.AttachParam =
		void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	SceneItemActorComponent_1 = require("../../SceneItemActorComponent");
class AttachParam {
	constructor() {
		(this.PosAttachType = 0),
			(this.PosAttachOffset = void 0),
			(this.PosAbsolute = !1),
			(this.RotAttachType = 0),
			(this.RotAttachOffset = void 0),
			(this.RotAbsolute = !1),
			(this.AttachSocketName = void 0);
	}
	From(t) {
		(this.PosAttachType = t.PosAttachType),
			(this.PosAbsolute = t.PosAbsolute),
			this.PosAttachOffset
				? ((this.PosAttachOffset.X = t.PosAttachOffset?.X ?? 0),
					(this.PosAttachOffset.Y = t.PosAttachOffset?.Y ?? 0),
					(this.PosAttachOffset.Z = t.PosAttachOffset?.Z ?? 0))
				: (this.PosAttachOffset = Vector_1.Vector.Create(t.PosAttachOffset)),
			(this.RotAttachType = t.RotAttachType),
			(this.RotAbsolute = t.RotAbsolute),
			this.RotAttachOffset
				? ((this.RotAttachOffset.Roll = t.RotAttachOffset?.Roll ?? 0),
					(this.RotAttachOffset.Pitch = t.RotAttachOffset?.Pitch ?? 0),
					(this.RotAttachOffset.Yaw = t.RotAttachOffset?.Yaw ?? 0))
				: (this.RotAttachOffset = Rotator_1.Rotator.Create(t.RotAttachOffset)),
			t && (this.AttachSocketName = t.AttachSocketName);
	}
	Reset() {
		(this.PosAttachType = 0),
			(this.PosAbsolute = !1),
			this.PosAttachOffset &&
				((this.PosAttachOffset.X = 0),
				(this.PosAttachOffset.Y = 0),
				(this.PosAttachOffset.Z = 0)),
			(this.RotAttachType = 0),
			(this.RotAbsolute = !1),
			this.RotAttachOffset &&
				((this.RotAttachOffset.Roll = 0),
				(this.RotAttachOffset.Pitch = 0),
				(this.RotAttachOffset.Yaw = 0));
	}
}
exports.AttachParam = AttachParam;
let SceneItemDynamicAttachTargetComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.SIe = void 0),
			(this.Hte = void 0),
			(this.Fln = !1),
			(this.Vln = 0),
			(this.Hln = void 0),
			(this.Eln = void 0),
			(this.jln = void 0),
			(this.yln = void 0),
			(this.Iln = void 0),
			(this.Lln = void 0),
			(this.Dln = (t, e, n) => {
				if (e?.Valid) {
					if (((e = e.Entity.GetComponent(0)), this.Eln)) {
						if (this.Eln !== e?.GetPbDataId()) return;
					} else if (this.jln && this.jln !== e?.GetCreatureDataId()) return;
					this.Rln();
				}
			}),
			(this.Aln = (t, e) => {
				if (e?.Valid) {
					if (((e = e.Entity.GetComponent(0)), this.Eln)) {
						if (this.Eln !== e?.GetPbDataId()) return;
					} else if (this.jln && this.jln !== e?.GetCreatureDataId()) return;
					this.Uln(),
						EventSystem_1.EventSystem.Has(
							EventDefine_1.EEventName.AddEntity,
							this.Dln,
						) ||
							EventSystem_1.EventSystem.Add(
								EventDefine_1.EEventName.AddEntity,
								this.Dln,
							);
				}
			}),
			(this.Pln = () => {
				let t;
				if (this.Eln)
					t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
						this.Eln,
					);
				else {
					if (!this.jln) return;
					t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.jln);
				}
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
				var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.Iln);
				t && e && t.op_Equality(e) && ((t = this.Lln.GetActor(e)), this.wln(t));
			}),
			(this.Bln = (t) => {
				this.bln(t);
			});
	}
	static get Dependencies() {
		return [182, 0];
	}
	OnInitData(t) {
		return (
			(this.SIe = this.Entity.GetComponent(0)),
			(this.Hte = this.Entity.GetComponent(182)),
			!!this.Hte ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SceneItem",
						40,
						"[DynamicAttachComp] Invalid ActorComp",
						["PbDataId:", this.SIe?.GetPbDataId()],
					),
				!1)
		);
	}
	OnActivate() {
		(this.Fln = !0), 0 !== this.Vln && this.qln();
	}
	OnEnd() {
		return (
			0 !== this.Vln && this.Gln(),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.AddEntity,
				this.Dln,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.AddEntity,
					this.Dln,
				),
			!(this.Fln = !1)
		);
	}
	qln() {
		switch (this.Vln) {
			case 1:
				this.Rln();
				break;
			case 2:
				this.Nln();
		}
	}
	Gln() {
		switch (this.Vln) {
			case 1:
				this.Uln();
				break;
			case 2:
				this.Oln();
		}
	}
	Rln() {
		let t;
		if (this.Eln)
			t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.Eln,
			);
		else {
			if (!this.jln) return;
			t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.jln);
		}
		if (t?.IsInit)
			switch (t.Entity?.GetComponent(0)?.GetEntityType()) {
				case Protocol_1.Aki.Protocol.HBs.Proto_SceneItem:
					this.Wln(t);
					break;
				case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
				case Protocol_1.Aki.Protocol.HBs.Proto_Player:
				case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
					this.Kln(t);
			}
		else
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.AddEntity,
				this.Dln,
			) ||
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.AddEntity,
					this.Dln,
				);
	}
	Wln(t) {
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
				(t = this.yln
					? e.GetActorInSceneInteraction(this.yln) ?? e.Owner
					: e.Owner),
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
	}
	Kln(t) {
		(t = t.Entity?.GetComponent(3)?.Owner),
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
	Uln() {
		let t;
		if (this.Eln)
			t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.Eln,
			);
		else {
			if (!this.jln) return;
			t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.jln);
		}
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.RemoveEntity,
			this.Aln,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.Aln,
			),
			t?.Entity &&
				EventSystem_1.EventSystem.HasWithTarget(
					t.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.Pln,
				) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					t.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.Pln,
				);
		var e = t?.Entity?.GetComponent(182);
		let n;
		(n =
			this.yln && e?.GetIsSceneInteractionLoadCompleted()
				? e?.GetActorInSceneInteraction(this.yln)
				: e?.Owner),
			this.bln(n);
	}
	Nln() {
		var t;
		this.Iln &&
			(this.Lln?.IsValid() ||
				((this.Lln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
					GlobalData_1.GlobalData.World,
					UE.KuroActorSubsystem.StaticClass(),
				)),
				this.Lln?.IsValid())) &&
			(this.Lln.OnAddToSubsystem.Add(this.xln),
			(t = this.Lln.GetActor(
				FNameUtil_1.FNameUtil.GetDynamicFName(this.Iln),
			))?.IsValid()) &&
			this.wln(t);
	}
	Oln() {
		var t;
		this.Iln &&
			(this.Lln?.IsValid() && this.Lln.OnAddToSubsystem.Remove(this.xln),
			(t = this.Lln?.GetActor(FNameUtil_1.FNameUtil.GetDynamicFName(this.Iln))),
			this.bln(t));
	}
	wln(t) {
		if (
			this.Hte?.Owner?.RootComponent?.IsValid() &&
			t?.RootComponent?.IsValid()
		) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"SceneItem",
					40,
					"[DynamicAttachComp] AttachToTargetActor: 开始",
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
					["AttachParam", this.Hln],
				);
			var e = Vector_1.Vector.Create(Vector_1.Vector.ZeroVectorProxy),
				n = Rotator_1.Rotator.Create(Rotator_1.Rotator.ZeroRotatorProxy);
			if (
				(0 === this.Hln.PosAttachType &&
					e.FromUeVector(this.Hte.Owner.RootComponent.RelativeLocation),
				0 === this.Hln.RotAttachType &&
					n.FromUeRotator(this.Hte.Owner.RootComponent.RelativeRotation),
				(1 !== this.Hln.PosAttachType && 1 !== this.Hln.RotAttachType) ||
					((o = this.Hte.Owner.GetTransform().GetRelativeTransform(
						t.GetTransform(),
					)),
					1 === this.Hln.PosAttachType && e.FromUeVector(o.GetLocation()),
					1 === this.Hln.RotAttachType && n.FromUeRotator(o.Rotator())),
				3 === this.Hln.PosAttachType || 3 === this.Hln.RotAttachType)
			) {
				var o = this.SIe.GetPbEntityInitData()?.Transform;
				o = o ? this.kln(o) : this.SIe.GetTransform();
				let s;
				if (2 === this.Vln) {
					var a = (0, puerts_1.$ref)(void 0);
					this.Lln.GetActorOriginalTransform(
						FNameUtil_1.FNameUtil.GetDynamicFName(this.Iln),
						a,
					),
						(s = (0, puerts_1.$unref)(a));
				} else if (1 === this.Vln) {
					let e;
					this.Eln
						? (e =
								ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
									this.Eln,
								))
						: this.jln &&
							(e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
								this.jln,
							));
					a = e.Entity;
					var i = a?.GetComponent(1),
						r = ((a = a?.GetComponent(0)), a?.GetPbEntityInitData()?.Transform);
					r = r ? this.kln(r) : a.GetTransform();
					let n =
						this.yln?.length &&
						i instanceof SceneItemActorComponent_1.SceneItemActorComponent
							? i?.GetActorInSceneInteractionOriginalRelTransform(t)
							: void 0;
					(n =
						n || t.GetTransform().GetRelativeTransform(i.Owner.GetTransform())),
						(s = n.op_Multiply(r));
				}
				s ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SceneItem",
							40,
							"[SceneItemAttachTargetComponent] 目标初始坐标获取失败，使用自身初始坐标代替",
							["PbDataId:", this.SIe?.GetPbDataId()],
						),
					(s = o)),
					(a = o.GetRelativeTransform(s)),
					3 === this.Hln.PosAttachType && e.FromUeVector(a.GetLocation()),
					3 === this.Hln.RotAttachType && n.FromUeRotator(a.Rotator());
			}
			MathUtils_1.MathUtils.CommonTempVector.FromConfigVector(
				this.Hln.PosAttachOffset,
			),
				e.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector),
				n.AdditionEqual(this.Hln.RotAttachOffset),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"SceneItem",
						40,
						"[DynamicAttachComp] AttachToTargetActor: 计算相对关系",
						["PbDataId", this.SIe?.GetPbDataId()],
						["相对坐标", e],
						["相对旋转", n],
					),
				this.Hte.Owner.RootComponent.SetAbsolute(
					this.Hln.PosAbsolute,
					this.Hln.RotAbsolute,
					!0,
				);
			let s = this.Hln.AttachSocketName;
			s &&
				!FNameUtil_1.FNameUtil.IsEmpty(s) &&
				t.RootComponent.DoesSocketExist(s) &&
				(s = void 0),
				(i = t.GetComponentByClass(UE.MeshComponent.StaticClass())),
				s && i
					? this.Hte.Owner.K2_AttachRootComponentTo(i, s, 1, !0)
					: (this.Hte.Owner.K2_AttachToActor(t, s, 1, 1, 1, !0),
						this.Hte.Owner.K2_SetActorRelativeTransform(
							new UE.Transform(
								n.ToUeRotator(),
								e.ToUeVector(),
								Vector_1.Vector.OneVector,
							),
							!1,
							void 0,
							!1,
						)),
				t.OnDestroyed.Add(this.Bln),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"SceneItem",
						40,
						"[DynamicAttachComp] AttachToTargetActor: 完成",
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
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SceneItem",
					40,
					"[DynamicAttachComp] AttachToTargetActor Failed",
					["PbDataId", this.SIe?.GetPbDataId()],
					["SelfActorValid", !!this.Hte?.Owner?.RootComponent?.IsValid()],
					["TargetActorValid", t?.RootComponent?.IsValid()],
				);
	}
	bln(t) {
		this.Hte?.Owner?.IsValid() &&
			(this.Hte.Owner.K2_DetachFromActor(1, 1, 1),
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
	IsRegTarget() {
		return 0 !== this.Vln;
	}
	RegEntityTarget(t, e, n, o) {
		return 0 !== this.Vln || this.Entity.IsEnd || !t
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"SceneItem",
						40,
						"[RegEntityTarget] 注册Attach失败",
						["PbDataId", this.SIe?.GetPbDataId()],
						["CurrentRegTargetType", this.Vln],
						["CurrentEntityIsEnd", this.Entity.IsEnd],
						["TargetPbDataId", t],
						["Reason", o],
					),
				!1)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneItem",
						40,
						"[RegEntityTarget] 注册Attach成功",
						["PbDataId", this.SIe?.GetPbDataId()],
						["CurrentRegTargetType", this.Vln],
						["CurrentEntityIsEnd", this.Entity.IsEnd],
						["TargetPbDataId", t],
						["Reason", o],
					),
				(this.Vln = 1),
				(this.Eln = t),
				(this.jln = void 0),
				(this.yln = e),
				this.Hln || (this.Hln = new AttachParam()),
				this.Hln.From(n),
				this.Fln && this.qln(),
				!0);
	}
	RegEntityTargetByCreatureDataId(t, e, n, o) {
		return 0 !== this.Vln || this.Entity.IsEnd || !t
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"SceneItem",
						40,
						"[RegEntityTarget] 注册Attach失败",
						["PbDataId", this.SIe?.GetPbDataId()],
						["CurrentRegTargetType", this.Vln],
						["CurrentEntityIsEnd", this.Entity.IsEnd],
						["TargetCreatureDataId", t],
						["Reason", o],
					),
				!1)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneItem",
						40,
						"[RegEntityTarget] 注册Attach成功",
						["PbDataId", this.SIe?.GetPbDataId()],
						["CurrentRegTargetType", this.Vln],
						["CurrentEntityIsEnd", this.Entity.IsEnd],
						["TargetCreatureDataId", t],
						["Reason", o],
					),
				(this.Vln = 1),
				(this.jln = t),
				(this.Eln = void 0),
				(this.yln = e),
				this.Hln || (this.Hln = new AttachParam()),
				this.Hln.From(n),
				this.Fln && this.qln(),
				!0);
	}
	RegRefActorTarget(t, e, n) {
		return 0 === this.Vln && !this.Entity.IsEnd && t && t.length
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneItem",
						40,
						"[RegEntityTarget] 注册Attach成功",
						["PbDataId", this.SIe?.GetPbDataId()],
						["CurrentRegTargetType", this.Vln],
						["CurrentEntityIsEnd", this.Entity.IsEnd],
						["TargetActorRef", t],
						["Reason", n],
					),
				(this.Vln = 2),
				(this.Iln = t),
				this.Hln || (this.Hln = new AttachParam()),
				this.Hln.From(e),
				this.Fln && this.qln(),
				!0)
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"SceneItem",
						40,
						"[RegEntityTarget] 注册Attach失败",
						["PbDataId", this.SIe?.GetPbDataId()],
						["CurrentRegTargetType", this.Vln],
						["CurrentEntityIsEnd", this.Entity.IsEnd],
						["TargetActorRef", t],
						["Reason", n],
					),
				!1);
	}
	UnRegTarget(t) {
		return 0 === this.Vln || this.Entity.IsEnd
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"SceneItem",
						40,
						"[RegEntityTarget] 反注册Attach失败",
						["PbDataId", this.SIe?.GetPbDataId()],
						["CurrentRegTargetType", this.Vln],
						["CurrentEntityIsEnd", this.Entity.IsEnd],
						["Reason", t],
					),
				!1)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneItem",
						40,
						"[RegEntityTarget] 反注册Attach成功",
						["PbDataId", this.SIe?.GetPbDataId()],
						["CurrentRegTargetType", this.Vln],
						["CurrentEntityIsEnd", this.Entity.IsEnd],
						["Reason", t],
					),
				this.Gln(),
				EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.AddEntity,
					this.Dln,
				) &&
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.AddEntity,
						this.Dln,
					),
				(this.Vln = 0),
				this.Hln && this.Hln.Reset(),
				(this.Eln = void 0),
				(this.jln = void 0),
				(this.yln = void 0),
				!(this.Iln = void 0));
	}
	RequestAttachRefActor(t, e, n) {
		var o;
		this.Hte?.Owner?.IsValid() &&
			(((o = Protocol_1.Aki.Protocol.Cds.create()).rkn =
				this.Hte.CreatureData.GetCreatureDataId()),
			(o.EFn = Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetActorPath),
			(o.s3n = "LFn"),
			(o.LFn = t),
			(o.MFn = Protocol_1.Aki.Protocol.VBs.create()),
			(o.MFn.X = e.X),
			(o.MFn.Y = e.Y),
			(o.MFn.Z = e.Z),
			(o.SFn = Protocol_1.Aki.Protocol.iws.create()),
			(o.SFn.Pitch = n.Pitch),
			(o.SFn.Yaw = n.Yaw),
			(o.SFn.Roll = n.Roll),
			Net_1.Net.Call(5903, o, () => {}));
	}
	RequestAttachEntity(t, e, n, o) {
		var a;
		this.Hte?.Owner?.IsValid() &&
			(((a = Protocol_1.Aki.Protocol.Cds.create()).rkn =
				this.Hte.CreatureData.GetCreatureDataId()),
			(a.EFn = Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetEntity),
			(a.s3n = "IFn"),
			(a.IFn = Protocol_1.Aki.Protocol.uGs.create()),
			(a.IFn.yFn = t),
			(a.IFn.TFn = e ?? ""),
			(a.MFn = Protocol_1.Aki.Protocol.VBs.create()),
			(a.MFn.X = n.X),
			(a.MFn.Y = n.Y),
			(a.MFn.Z = n.Z),
			(a.SFn = Protocol_1.Aki.Protocol.iws.create()),
			(a.SFn.Pitch = o.Pitch),
			(a.SFn.Yaw = o.Yaw),
			(a.SFn.Roll = o.Roll),
			Net_1.Net.Call(5903, a, () => {}));
	}
	RequestDetach() {
		var t = Protocol_1.Aki.Protocol.Cds.create();
		(t.rkn = this.Hte.CreatureData.GetCreatureDataId()),
			(t.EFn = Protocol_1.Aki.Protocol._Gs.Proto_AttachTargetNone),
			Net_1.Net.Call(5903, t, () => {});
	}
};
(SceneItemDynamicAttachTargetComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(110)],
	SceneItemDynamicAttachTargetComponent,
)),
	(exports.SceneItemDynamicAttachTargetComponent =
		SceneItemDynamicAttachTargetComponent);
