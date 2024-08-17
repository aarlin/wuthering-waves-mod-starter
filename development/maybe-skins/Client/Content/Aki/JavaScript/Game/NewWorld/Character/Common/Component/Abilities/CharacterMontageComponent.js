"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, o) {
		var a,
			i = arguments.length,
			s =
				i < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, e, n, o);
		else
			for (var r = t.length - 1; 0 <= r; r--)
				(a = t[r]) && (s = (i < 3 ? a(s) : 3 < i ? a(e, n, s) : a(e, n)) || s);
		return 3 < i && s && Object.defineProperty(e, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterMontageComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
	montagePathMap = new Map([
		[0, "AM_Death"],
		[1, "AM_Death_InWater"],
		[2, "AM_Death_InAir"],
		[3, "AM_Death_Falling"],
	]);
class MontageTask {
	constructor(t, e, n, o, a, i = !0, s = -1) {
		(this.MontageComponent = void 0),
			(this.Handle = 0),
			(this.Montage = void 0),
			(this.PlayCallback = void 0),
			(this.EndCallback = void 0),
			(this.BlendInTime = 0),
			(this.MontagePathHash = 0),
			(this.DKo = void 0),
			(this.RKo = !1),
			(this.lfe = !1),
			(this.UKo = !1),
			(this.MontageComponent = t),
			(this.Handle = e),
			(this.PlayCallback = o),
			(this.EndCallback = a),
			(this.RKo = !1),
			(this.BlendInTime = s),
			(e = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
				t.ActorComponent.Actor.GetClass(),
			)),
			(o = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(e)),
			(a = ConfigManager_1.ConfigManager.WorldConfig.GetMontageMap(o)?.get(n)),
			a
				? ((s = a.ToAssetPathName()),
					(this.MontagePathHash = UE.GASBPLibrary.FnvHash(s)),
					ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.AnimMontage, (t) => {
						!this.UKo && ((this.Montage = t), i || this.RKo) && this.Play();
					}))
				: (this.UKo = !0);
	}
	get Invalid() {
		return this.UKo;
	}
	Play(t = 0) {
		var e;
		this.UKo ||
			(this.PlayCallback?.(),
			this.Montage &&
				!this.lfe &&
				((e = this.Montage.BlendIn.BlendTime),
				0 <= this.BlendInTime &&
					(this.Montage.BlendIn.BlendTime = this.BlendInTime),
				CombatDebugController_1.CombatDebugController.CombatDebug(
					"Animation",
					this.MontageComponent.Entity,
					"播放Montage",
					["Montage", this.Montage?.GetName()],
					["BlendInTime", this.BlendInTime],
				),
				(this.DKo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
					this.MontageComponent.AnimationComponent.MainAnimInstance,
					this.Montage,
					1,
					t,
					FNameUtil_1.FNameUtil.NONE,
				)),
				0 <= this.BlendInTime && (this.Montage.BlendIn.BlendTime = e),
				this.DKo.EndCallback.Add((t) => {
					this.EndCallback?.(t),
						this.MontageComponent.EndMontageTask(this.Handle);
				}),
				(this.lfe = !0)),
			(this.RKo = !0));
	}
	EndTask() {
		this.DKo?.EndTask(),
			this.DKo?.EndCallback.Clear(),
			(this.DKo = void 0),
			(this.MontageComponent = void 0),
			(this.PlayCallback = void 0),
			(this.EndCallback = void 0),
			(this.UKo = !0);
	}
}
let CharacterMontageComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.ActorComponent = void 0),
			(this.UnifiedStateComponent = void 0),
			(this.AnimationComponent = void 0),
			(this.F$ = new Map()),
			(this.YOr = new Map()),
			(this.JOr = new Array()),
			(this.zOr = 0),
			(this.MontageTaskMessageId = void 0),
			(this.ZOr = new Map()),
			(this.ekr = 0),
			(this.tkr = new Map());
	}
	OnInit() {
		return !0;
	}
	OnStart() {
		return (
			(this.ActorComponent = this.Entity.CheckGetComponent(3)),
			(this.AnimationComponent = this.Entity.CheckGetComponent(160)),
			(this.UnifiedStateComponent = this.Entity.CheckGetComponent(89)),
			this.ezo(),
			!0
		);
	}
	OnEnd() {
		this.F$.clear(), this.YOr.clear();
		for (const t of this.JOr) t.EndTask();
		for (var [, t] of ((this.JOr.length = 0), this.ZOr)) t.EndTask();
		return this.ZOr.clear(), !0;
	}
	ezo() {
		if (
			(t = this.ActorComponent.CreatureData.GetEntityType()) !==
				Protocol_1.Aki.Protocol.wks.Proto_Npc &&
			t !== Protocol_1.Aki.Protocol.wks.Proto_Vision
		) {
			var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
					this.ActorComponent.Actor.GetClass(),
				),
				e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
			for (const [t, o] of montagePathMap.entries()) {
				var n = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(e, o);
				n &&
					!StringUtils_1.StringUtils.IsNothing(n.ToAssetPathName()) &&
					ResourceSystem_1.ResourceSystem.LoadAsync(
						n.ToAssetPathName(),
						UE.AnimMontage,
						(e) => {
							this.F$.set(t, e);
						},
					);
			}
		}
	}
	PlayMontageAsync(t, e, n, o = !0, a = -1) {
		var i = ++this.zOr;
		if (
			!(t = new MontageTask(
				this,
				i,
				t,
				() => {
					this.UnifiedStateComponent?.ExitHitState("播放蒙太奇"), e?.();
				},
				n,
				o,
				a,
			)).Invalid
		)
			return this.ZOr.set(i, t), i;
	}
	PlayMontageTaskAndRequest(t, e, n, o) {
		var a = Protocol_1.Aki.Protocol.$Nn.create();
		(a.pkn = n),
			(a.p4s = this.GetMontagePathHash(t)),
			(this.MontageTaskMessageId = CombatMessage_1.CombatNet.Call(
				13545,
				this.Entity,
				a,
				(t) => {},
				o,
			)),
			this.PlayMontageTask(t, e);
	}
	PlayMontageTask(t, e = 0) {
		(t = this.ZOr.get(t)) && t.Play(e);
	}
	EndMontageTask(t) {
		var e = this.ZOr.get(t);
		e &&
			(e.EndTask(), this.ZOr.delete(t), (this.MontageTaskMessageId = void 0));
	}
	GetMontageTimeRemaining(t) {
		return (
			(t = this.ZOr.get(t)),
			t?.Montage
				? t.Montage.SequenceLength -
					t.MontageComponent.AnimationComponent.MainAnimInstance.Montage_GetPosition(
						t.Montage,
					)
				: -1
		);
	}
	HasMontage(t) {
		return this.F$.has(t);
	}
	PlayMontageWithCallBack(t, e) {
		var n = this.tkr.get(t);
		if (n && 0 < n.size && (n = [...n.values()][n.size - 1]))
			void 0 === this.PlayMontageAsync(n, void 0, e) && e?.(!0);
		else if ((n = this.F$.get(t))) {
			const t = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
				this.AnimationComponent.MainAnimInstance,
				n,
				1,
				0,
				FNameUtil_1.FNameUtil.NONE,
			);
			this.JOr.push(t),
				t.EndCallback.Add((n) => {
					e?.(n),
						t.EndTask(),
						(n = this.JOr.findIndex((e) => e === t)),
						this.JOr.splice(n, 1);
				});
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Battle",
					20,
					"事件未找到对应路径蒙太奇或Entity已结束运行状态，执行结束回调",
					["montagePath", montagePathMap.get(t)],
					["Actor", this.ActorComponent.Actor.GetName()],
				),
				e?.(!0);
	}
	AddReplacement(t, e) {
		let n = this.tkr.get(t);
		return (
			n || this.tkr.set(t, (n = new Map())), n.set(++this.ekr, e), this.ekr
		);
	}
	RemoveReplacement(t) {
		for (const e of this.tkr.values()) e?.delete(t);
	}
	GetMontagePathHash(t) {
		return (t = this.ZOr.get(t)) ? t.MontagePathHash : 0;
	}
};
(CharacterMontageComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(22)],
	CharacterMontageComponent,
)),
	(exports.CharacterMontageComponent = CharacterMontageComponent);
