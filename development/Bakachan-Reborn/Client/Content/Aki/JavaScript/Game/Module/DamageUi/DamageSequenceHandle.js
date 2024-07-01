"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageSequenceHandle = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils");
class DamageSequenceHandle {
	constructor() {
		(this.Bkt = void 0),
			(this.Gft = void 0),
			(this.n8 = ""),
			(this.GPe = UE.NewArray(UE.Actor));
	}
	Initialize(e) {
		this.n8 = e;
	}
	Destroy() {
		if (this.Bkt) {
			const e = this.Bkt;
			TimerSystem_1.TimerSystem.Next(() => {
				ActorSystem_1.ActorSystem.Put(e);
			}),
				(this.Bkt = void 0),
				(this.Gft = void 0);
		}
	}
	Reset() {
		this.Stop(), this.ResetSequenceBinding(), this.Gft.OnFinished.Clear();
	}
	Play() {
		this.Gft?.IsValid() && this.Gft.Play();
	}
	Stop() {
		this.Gft?.IsValid() && this.Gft.IsPlaying() && this.Gft.Stop();
	}
	SetSequenceBindingByTag(e, t) {
		this.Bkt?.IsValid() &&
			t &&
			(this.GPe.Empty(),
			this.GPe.Add(t),
			(t = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
			this.Bkt.SetBindingByTag(t, this.GPe, !1));
	}
	AddSequenceBindingByTag(e, t) {
		this.Bkt?.IsValid() &&
			t &&
			((e = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
			this.Bkt.AddBindingByTag(e, t));
	}
	ResetSequenceBinding() {
		this.Bkt?.IsValid() && this.Bkt.ResetBindings();
	}
	AddOnFinished(e) {
		this.Gft?.IsValid() && this.Gft.OnFinished.Add(e);
	}
	SpawnSequence(e = void 0) {
		StringUtils_1.StringUtils.IsEmpty(this.n8) ||
			ResourceSystem_1.ResourceSystem.LoadAsync(
				this.n8,
				UE.LevelSequence,
				(t) => {
					ObjectUtils_1.ObjectUtils.IsValid(t) &&
						((this.Bkt = ActorSystem_1.ActorSystem.Get(
							UE.LevelSequenceActor.StaticClass(),
							MathUtils_1.MathUtils.DefaultTransform,
							void 0,
							!1,
						)),
						this.Bkt.SetSequence(t),
						(this.Gft = this.Bkt.SequencePlayer),
						e) &&
						e(this);
				},
			);
	}
	GetPath() {
		return this.n8;
	}
}
exports.DamageSequenceHandle = DamageSequenceHandle;
