"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectActorHandle = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Time_1 = require("../../Core/Common/Time"),
	Quat_1 = require("../../Core/Utils/Math/Quat"),
	Transform_1 = require("../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	NiagaraComponentHandle_1 = require("./NiagaraComponentHandle"),
	REFRESH_ACTOR_LOCATION_INTERVAL = 60;
class EffectActorAction {
	DoAction(t, e) {}
}
class EffectActor_K2_AttachToComponent extends EffectActorAction {
	constructor() {
		super(...arguments),
			(this.Parent = void 0),
			(this.SocketName = void 0),
			(this.LocationRule = 0),
			(this.RotationRule = 0),
			(this.ScaleRule = 0),
			(this.WeldSimulatedBodies = !1),
			(this.RelativeTransform = void 0),
			(this.GCe = 0),
			(this.NCe = void 0);
	}
	DoAction(t, e) {
		this.Parent &&
			t.K2_AttachToComponent(
				this.Parent,
				this.SocketName,
				this.LocationRule,
				this.RotationRule,
				this.ScaleRule,
				this.WeldSimulatedBodies,
			);
	}
	UpdateChildTransform(t = !1) {
		(!this.NCe || this.GCe < Time_1.Time.Frame || t) &&
			((this.GCe = Time_1.Time.Frame),
			(this.NCe = this.RelativeTransform.op_Multiply(
				this.Parent.GetSocketTransform(this.SocketName),
			)));
	}
	GetLocation(t = 0) {
		return this.UpdateChildTransform(), this.NCe.GetLocation();
	}
	GetRotation() {
		return this.UpdateChildTransform(), this.NCe.Rotator();
	}
	GetScale() {
		return this.UpdateChildTransform(), this.NCe.GetScale3D();
	}
	InitRelativeTransform(t, e) {
		(this.RelativeTransform = e.GetRelativeTransform(
			this.Parent.GetSocketTransform(this.SocketName),
		)),
			0 === this.LocationRule
				? t?.RelativeTransform
					? this.RelativeTransform.SetLocation(
							t.RelativeTransform.GetLocation(),
						)
					: this.RelativeTransform.SetLocation(e.GetLocation())
				: 2 === this.LocationRule &&
					this.RelativeTransform.SetLocation(Vector_1.Vector.ZeroVector),
			0 === this.RotationRule
				? t?.RelativeTransform
					? this.RelativeTransform.SetRotation(
							t.RelativeTransform.GetRotation(),
						)
					: this.RelativeTransform.SetRotation(e.GetRotation())
				: 2 === this.RotationRule &&
					this.RelativeTransform.SetRotation(Quat_1.Quat.Identity),
			0 === this.ScaleRule
				? t?.RelativeTransform
					? this.RelativeTransform.SetScale3D(t.RelativeTransform.GetScale3D())
					: this.RelativeTransform.SetScale3D(e.GetScale3D())
				: 2 === this.ScaleRule &&
					this.RelativeTransform.SetScale3D(Vector_1.Vector.OneVector);
	}
}
class EffectActor_K2_AttachToActor extends EffectActor_K2_AttachToComponent {
	constructor() {
		super(...arguments), (this.ParentActor = void 0);
	}
}
class EffectActorBeAttachedAction extends EffectActorAction {
	constructor() {
		super(...arguments),
			(this.OCe = void 0),
			(this.kCe = void 0),
			(this.FCe = 0);
	}
	Init(t, e, o) {
		(this.OCe = t), (this.kCe = e), (this.FCe = o);
	}
	DoAction(t, e) {
		e.ExecuteAttachToEffectSkeletalMesh(this.OCe, this.kCe, this.FCe);
	}
}
class EffectActorHandle {
	constructor() {
		(this.Transform = void 0),
			(this.n8 = ""),
			(this.VCe = void 0),
			(this.HCe = void 0),
			(this.jCe = void 0),
			(this.WCe = void 0),
			(this.HiddenInGame = void 0),
			(this.KCe = void 0),
			(this.QCe = !0),
			(this.XCe = -1);
	}
	get $Ce() {
		if (this.VCe)
			return (
				this.VCe.Parent?.IsValid() ||
					((this.VCe = void 0),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"RenderEffect",
							37,
							"AttachAction parent is inValid",
							["path", this.n8],
						)),
				this.VCe
			);
	}
	Init(t, e) {
		var o;
		t
			? ((o = Transform_1.Transform.Create()).FromUeTransform(t),
				(this.Transform = o.ToUeTransform()))
			: (this.Transform = new UE.Transform()),
			(this.n8 = e);
	}
	get NiagaraComponent() {
		return (
			this.jCe ||
				(this.jCe = new NiagaraComponentHandle_1.NiagaraComponentHandle()),
			this.jCe
		);
	}
	get NiagaraComponents() {
		return (
			this.WCe ||
				(this.WCe = new NiagaraComponentHandle_1.NiagaraComponentHandle()),
			this.WCe
		);
	}
	SetBeAttached(t, e, o) {
		this.HCe || (this.HCe = new Array());
		var i = new EffectActorBeAttachedAction();
		i.Init(t, e, o), this.HCe.push(i);
	}
	IsValid() {
		return !0;
	}
	SetActorHiddenInGame(t) {
		this.HiddenInGame = t;
	}
	K2_AttachToActor(t, e, o, i, r, a) {
		var s, n, h;
		t
			? (s = UE.KuroEffectLibrary.GetActorDefaultAttachComponent(t))?.IsValid()
				? ((n = new EffectActor_K2_AttachToActor()),
					(h = this.VCe),
					(n.ParentActor = t),
					(n.Parent = s),
					(n.SocketName = e),
					(n.LocationRule = o),
					(n.RotationRule = i),
					(n.ScaleRule = r),
					(n.WeldSimulatedBodies = a),
					(this.VCe = n),
					this.VCe.InitRelativeTransform(h, this.Transform))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderEffect",
						37,
						"EffectActor_K2_AttachToActor attachComponent is null",
					)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderEffect",
					37,
					"EffectActor_K2_AttachToActor parent is null",
				);
	}
	K2_AttachToComponent(t, e, o, i, r, a) {
		var s, n;
		t?.IsValid
			? ((s = new EffectActor_K2_AttachToComponent()),
				(n = this.VCe),
				(s.Parent = t),
				(s.SocketName = e),
				(s.LocationRule = o),
				(s.RotationRule = i),
				(s.ScaleRule = r),
				(s.WeldSimulatedBodies = a),
				(this.VCe = s),
				this.VCe.InitRelativeTransform(n, this.Transform))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderEffect",
					37,
					"EffectActor_K2_AttachToComponent parent is null",
				);
	}
	YCe() {
		(this.QCe = !0),
			this.$Ce &&
				(this.$Ce.RelativeTransform = this.Transform.GetRelativeTransform(
					this.$Ce.Parent.GetSocketTransform(this.$Ce.SocketName),
				));
	}
	GetActorLocation() {
		return (
			this.$Ce && this.XCe--,
			this.XCe < 0 && ((this.QCe = !0), (this.XCe = 60)),
			this.QCe && ((this.QCe = !1), (this.KCe = this.K2_GetActorLocation())),
			this.KCe
		);
	}
	K2_GetActorLocation() {
		let t = this.$Ce?.GetLocation();
		return t || this.Transform.GetLocation();
	}
	K2_GetActorRotation() {
		let t = this.$Ce?.GetRotation();
		return t || this.Transform.GetRotation().Rotator();
	}
	GetActorScale3D() {
		let t = this.$Ce?.GetScale();
		return t || this.Transform.GetScale3D();
	}
	K2_SetActorLocation(t, e, o, i) {
		return !!t && (this.Transform.SetLocation(t), this.YCe(), !0);
	}
	K2_SetActorRotation(t, e) {
		return !!t && (this.Transform.SetRotation(t.Quaternion()), this.YCe(), !0);
	}
	SetActorScale3D(t) {
		t && (this.Transform.SetScale3D(t), this.YCe());
	}
	K2_SetActorLocationAndRotation(t, e, o, i, r) {
		return !(
			!t ||
			!e ||
			(this.Transform.SetLocation(t),
			this.Transform.SetRotation(e.Quaternion()),
			this.YCe(),
			0)
		);
	}
	K2_AddActorWorldOffset(t, e, o, i) {
		t &&
			((t = this.Transform.GetLocation().op_Addition(t)),
			this.Transform.SetLocation(t),
			this.YCe());
	}
	K2_SetActorTransform(t, e, o, i) {
		return !!t && ((this.Transform = t), this.YCe(), !0);
	}
	JCe() {
		var t;
		(this.QCe = !0),
			this.$Ce &&
				(this.$Ce.UpdateChildTransform(!0),
				(t = this.$Ce.GetLocation()) && this.Transform.SetLocation(t),
				(t = this.$Ce.GetRotation()) &&
					this.Transform.SetRotation(t.Quaternion()),
				(t = this.$Ce.GetScale())) &&
				this.Transform.SetScale3D(t);
	}
	K2_SetActorRelativeLocation(t, e, o, i) {
		t &&
			this.$Ce &&
			2 !== this.$Ce.LocationRule &&
			(this.$Ce.RelativeTransform.SetLocation(t), this.JCe());
	}
	K2_SetActorRelativeRotation(t, e, o, i) {
		t &&
			this.$Ce &&
			2 !== this.$Ce.RotationRule &&
			(this.$Ce.RelativeTransform.SetRotation(t.Quaternion()), this.JCe());
	}
	K2_SetActorRelativeTransform(t, e, o, i) {
		t && this.$Ce && ((this.$Ce.RelativeTransform = t), this.JCe());
	}
	K2_AddActorLocalTransform(t, e, o, i) {
		t &&
			(this.$Ce
				? ((this.$Ce.RelativeTransform =
						this.$Ce.RelativeTransform.op_Multiply(t)),
					this.JCe())
				: ((this.Transform = this.Transform.op_Multiply(t)), (this.QCe = !0)));
	}
	InitEffectActor(t, e) {
		if ((this.$Ce && this.$Ce.DoAction(t, e), this.HCe))
			for (const o of this.HCe) o.DoAction(t, e);
		var o;
		if (
			(this.JCe(),
			t.K2_SetActorTransform(this.Transform, !1, void 0, !1),
			void 0 !== this.HiddenInGame && t.SetActorHiddenInGame(this.HiddenInGame),
			this.jCe &&
				((o = t.GetComponentByClass(UE.NiagaraComponent.StaticClass())),
				this.jCe.InitNiagaraComponent(o)),
			this.WCe)
		) {
			var i = t.K2_GetComponentsByClass(UE.NiagaraComponent.StaticClass());
			for (let t = 0; t < i.Num(); t++) this.WCe.InitNiagaraComponent(i.Get(t));
		}
	}
}
exports.EffectActorHandle = EffectActorHandle;
