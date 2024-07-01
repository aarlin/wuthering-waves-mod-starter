"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, a, r) {
		var o,
			i = arguments.length,
			l =
				i < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, a))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			l = Reflect.decorate(e, t, a, r);
		else
			for (var n = e.length - 1; 0 <= n; n--)
				(o = e[n]) && (l = (i < 3 ? o(l) : 3 < i ? o(t, a, l) : o(t, a)) || l);
		return 3 < i && l && Object.defineProperty(t, a, l), l;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterGameplayCueComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	GameplayCueById_1 = require("../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../../../../Common/TimeUtil"),
	EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	GameplayCueBeam_1 = require("./GameplayCueSFX/GameplayCueBeam"),
	GameplayCueCameraEffect_1 = require("./GameplayCueSFX/GameplayCueCameraEffect"),
	GameplayCueEffect_1 = require("./GameplayCueSFX/GameplayCueEffect"),
	GameplayCueFixHook_1 = require("./GameplayCueSFX/GameplayCueFixHook"),
	GameplayCueFollow_1 = require("./GameplayCueSFX/GameplayCueFollow"),
	GameplayCueFromSummoned_1 = require("./GameplayCueSFX/GameplayCueFromSummoned"),
	GameplayCueHideBone_1 = require("./GameplayCueSFX/GameplayCueHideBone"),
	GameplayCueHideMesh_1 = require("./GameplayCueSFX/GameplayCueHideMesh"),
	GameplayCueHookUp_1 = require("./GameplayCueSFX/GameplayCueHookUp"),
	GameplayCueManipulateInteract_1 = require("./GameplayCueSFX/GameplayCueManipulateInteract"),
	GameplayCueMaterial_1 = require("./GameplayCueSFX/GameplayCueMaterial"),
	GameplayCueMoveSpline_1 = require("./GameplayCueSFX/GameplayCueMoveSpline"),
	GameplayCueUIEffect_1 = require("./GameplayCueSFX/GameplayCueUIEffect");
let CharacterGameplayCueComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.nXt = void 0),
			(this.Qbr = void 0),
			(this.WKo = new Map()),
			(this.oGr = new Set());
	}
	OnStart() {
		return (
			(this.nXt = this.Entity.CheckGetComponent(3)),
			(this.Qbr = this.Entity.CheckGetComponent(107)),
			!0
		);
	}
	OnClear() {
		for (const e of this.GetAllCurrentCueRef()) e.Destroy();
		return !0;
	}
	OnEnable() {
		this.SetHidden(!1);
	}
	OnDisable() {
		this.SetHidden(!0);
	}
	OnTick(e) {
		var t = e * TimeUtil_1.TimeUtil.Millisecond;
		for (const e of this.GetAllCurrentCueRef()) e.Tick(t);
	}
	OnChangeTimeDilation(e) {
		for (const t of this.GetAllCurrentCueRef()) t.ChangeTimeDilation(e);
		this.oGr.forEach((t) => {
			EffectSystem_1.EffectSystem.IsValid(t)
				? EffectSystem_1.EffectSystem.SetTimeScale(
						t,
						this.Qbr.CurrentTimeScale * e,
					)
				: this.oGr.delete(t);
		});
	}
	CreateGameplayCue(e, t = {}) {
		let a = !0;
		var r = t.Buff,
			o = (r && (a = r.IsInstantBuff()), this.rGr(e, a));
		if (o)
			return (
				(o = o.Spawn({
					Entity: this.Entity,
					CueConfig: e,
					Actor: this.nXt.Actor,
					CueComp: this,
					Buff: r,
					BeginCallback: t.BeginCallback,
					EndCallback: t.EndCallback,
				})),
				t.Sync && this.w6s(e.Id),
				o
			);
	}
	CreateGameplayCueByBuff(e) {
		var t = e.Config.GameplayCueIds,
			a = e.Handle;
		if (t)
			for (const o of t) {
				if (this.WKo.get(a)?.get(o)) return;
				var r = GameplayCueById_1.configGameplayCueById.GetConfig(o);
				if (!r)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Battle", 29, "无法找到Cue配置！", [
							"cueConfigId:",
							o,
						])
					);
				(r = this.CreateGameplayCue(r, { Buff: e })),
					!e.IsInstantBuff() && r && this.nGr(a, o, r);
			}
	}
	AddEffectToSet(e) {
		this.oGr.add(e),
			EffectSystem_1.EffectSystem.AddFinishCallback(e, (e) => {
				this.oGr.delete(e);
			}),
			EffectSystem_1.EffectSystem.SetTimeScale(
				e,
				this.Qbr.CurrentTimeScale * this.Entity.TimeDilation,
			),
			this.Active ||
				EffectSystem_1.EffectSystem.GetEffectActor(e).SetActorHiddenInGame(!0);
	}
	*GetAllCurrentCueRef() {
		for (const e of this.WKo.values()) for (const t of e.values()) yield t;
	}
	DestroyGameplayCue(e) {
		var t = e.Config.GameplayCueIds,
			a = e.Handle;
		if (t)
			for (const e of t) {
				var r = this.WKo.get(a)?.get(e);
				if (!r) return;
				r.Destroy(),
					(r = this.WKo.get(a)) &&
						(r.delete(e), r.size <= 0) &&
						this.WKo.delete(a);
			}
	}
	OnAnyBuffInhibitionChanged(e, t) {
		if ((e = this.WKo.get(e)))
			for (const a of e.values()) t ? a.Destroy() : a.Create();
	}
	SetHidden(e) {
		for (const t of this.GetAllCurrentCueRef()) e ? t.Disable() : t.Enable();
		this.oGr.forEach((t) => {
			EffectSystem_1.EffectSystem.IsValid(t)
				? EffectSystem_1.EffectSystem.GetEffectActor(t).SetActorHiddenInGame(e)
				: this.oGr.delete(t);
		});
	}
	nGr(e, t, a) {
		this.WKo.has(e) || this.WKo.set(e, new Map()), this.WKo.get(e).set(t, a);
	}
	rGr(e, t) {
		switch (e.CueType) {
			case 0:
				return e.bSoftFollow
					? GameplayCueFollow_1.GameplayCueFollow
					: GameplayCueEffect_1.GameplayCueEffect;
			case 1:
				return GameplayCueMaterial_1.GameplayCueMaterial;
			case 4:
			case 2:
				return t ? void 0 : GameplayCueUIEffect_1.GameplayCueUIEffect;
			case 5:
				return GameplayCueUIEffect_1.GameplayCueUIEffect;
			case 3:
				return GameplayCueMoveSpline_1.GameplayCueMoveSpline;
			case 6:
				return t ? void 0 : GameplayCueBeam_1.GameplayCueBeam;
			case 7:
				return t ? void 0 : GameplayCueHookUp_1.GameplayCueHookUp;
			case 8:
				return t ? void 0 : GameplayCueFixHook_1.GameplayCueFixHook;
			case 9:
				return GameplayCueCameraEffect_1.GameplayCueCameraEffect;
			case 10:
				return GameplayCueFromSummoned_1.GameplayCueFromSummoned;
			case 11:
				return GameplayCueHideMesh_1.GameplayCueHideMesh;
			case 12:
				return GameplayCueHideBone_1.GameplayCueHideBone;
			case 13:
				return GameplayCueManipulateInteract_1.GameplayCueManipulateInteract;
			default:
				return;
		}
	}
	w6s(e) {
		var t = Protocol_1.Aki.Protocol.R6s.create();
		(t.A6s = MathUtils_1.MathUtils.BigIntToLong(e)),
			CombatMessage_1.CombatNet.Call(16292, this.Entity, t, () => {});
	}
	static GameplayCueNotify(e, t) {
		(e = e?.GetComponent(19)),
			(t = MathUtils_1.MathUtils.LongToBigInt(t.A6s)),
			(t = GameplayCueById_1.configGameplayCueById.GetConfig(t)) &&
				e?.CreateGameplayCue(t);
	}
};
__decorate(
	[CombatMessage_1.CombatNet.SyncHandle("L6s")],
	CharacterGameplayCueComponent,
	"GameplayCueNotify",
	null,
),
	(CharacterGameplayCueComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(19)],
		CharacterGameplayCueComponent,
	)),
	(exports.CharacterGameplayCueComponent = CharacterGameplayCueComponent);
