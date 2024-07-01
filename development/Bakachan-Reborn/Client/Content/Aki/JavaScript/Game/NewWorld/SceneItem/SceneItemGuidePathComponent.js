"use strict";
var SceneItemGuidePathComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, i) {
			var o,
				s = arguments.length,
				a =
					s < 3
						? t
						: null === i
							? (i = Object.getOwnPropertyDescriptor(t, n))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, n, i);
			else
				for (var r = e.length - 1; 0 <= r; r--)
					(o = e[r]) &&
						(a = (s < 3 ? o(a) : 3 < s ? o(t, n, a) : o(t, n)) || a);
			return 3 < s && a && Object.defineProperty(t, n, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemGuidePathComponent = exports.SCAN_SKILL_ID = void 0);
const UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	LevelGamePlayUtils_1 = require("../../LevelGamePlay/LevelGamePlayUtils"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	colorString = FNameUtil_1.FNameUtil.GetDynamicFName("Color"),
	colorRed = new UE.LinearColor(12, 2, 2, 1),
	colorBlue = new UE.LinearColor(6, 8, 15, 1),
	colorYellow = new UE.LinearColor(12, 8, 4, 1),
	finishTag = 1298716444,
	activatedTag = -3775711,
	normalTag = -1152559349;
exports.SCAN_SKILL_ID = 210004;
let SceneItemGuidePathComponent =
	(SceneItemGuidePathComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Lo = void 0),
				(this.Hte = void 0),
				(this.Lie = void 0),
				(this.Efn = void 0),
				(this.md = void 0),
				(this.Uxr = void 0),
				(this.yfn = void 0),
				(this.Ifn = 0),
				(this.Tfn = 0),
				(this.dce = !1),
				(this.rXt = !1),
				(this.opi = 0),
				(this.Lfn = void 0),
				(this.Dfn = void 0),
				(this.Rfn = void 0),
				(this.Afn = void 0),
				(this.Ufn = !1),
				(this.Pfn = 0),
				(this.xfn = new Map()),
				(this.wfn = (e, t = !1) => {
					(this.Ufn && !t) ||
						(this.dce
							? this.Bfn(e)
							: this.bfn(!1, () => {
									this.Bfn(e);
								}));
				}),
				(this.ooo = (e, t) => {
					t !== exports.SCAN_SKILL_ID ||
						e !== Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ||
						((t = Global_1.Global.BaseCharacter?.CharacterActorComponent),
						(e = Vector_1.Vector.Create(t?.ActorLocationProxy)),
						(t = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy)),
						Vector_1.Vector.Distance(e, t) > this.Pfn) ||
						((e = this.Entity.GetComponent(0)),
						(t =
							LevelGamePlayUtils_1.LevelGamePlayUtils.GetScanCompositeResult(
								e,
							)),
						this.wfn(t.Interval, !0));
				}),
				(this.gIe = (e, t) => {
					e.includes(1298716444)
						? ((this.rXt = !0),
							Info_1.Info.EnableForceTick
								? this.qfn(1, !0)
								: (this.Efn.HasFinishTag = !0))
						: e.includes(-3775711)
							? ((this.dce = !0),
								Info_1.Info.EnableForceTick || (this.Efn.HasActiveTag = !0),
								this.bfn(!0))
							: e.includes(-1152559349) &&
								(this.rXt &&
									((this.rXt = !1),
									Info_1.Info.EnableForceTick || (this.Efn.HasFinishTag = !1)),
								this.dce) &&
								((this.dce = !1),
								Info_1.Info.EnableForceTick || (this.Efn.HasActiveTag = !1));
				}),
				(this.Gfn = (e, t) => {
					Info_1.Info.EnableForceTick ||
						(5 === e &&
							((this.Uxr = this.Disable(
								"[SceneItemGuidePathComponent.OnEffectFinish] 特效加载完成，由C++组件接管tick",
							)),
							(this.Efn.NiagaraComponent =
								EffectSystem_1.EffectSystem.GetNiagaraComponent(t)),
							this.Efn.StartTick(
								this.Dfn,
								this.Rfn,
								this.Afn,
								colorString,
								this.Tfn / 1e3,
								this.Ifn / 1e3,
							)));
				});
		}
		OnInitData(e) {
			if (
				((e = e.GetParam(SceneItemGuidePathComponent_1)[0]),
				(this.Lo = e),
				void 0 !== this.Lo.ColorChangeOption)
			)
				switch (this.Lo.ColorChangeOption.Type) {
					case IComponent_1.EColorChangeStrategyOfSplineEffect.RGB:
						if (this.Nfn(this.Lo.ColorChangeOption)) break;
						return !1;
				}
			return (
				void 0 !== this.Lo.ScanOption &&
					((this.Ufn = !0), (this.Pfn = this.Lo.ScanOption.ResponseRange)),
				!0
			);
		}
		Nfn(e) {
			var t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.RedState);
			return (
				!this.xfn.has(t) &&
				(this.xfn.set(t, colorRed),
				(t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.YellowState)),
				!this.xfn.has(t) &&
					(this.xfn.set(t, colorYellow),
					(t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.BlueState)),
					!this.xfn.has(t) &&
						(this.xfn.set(t, colorBlue),
						(this.Dfn = this.xfn.get(normalTag)),
						(this.Afn = this.xfn.get(finishTag)),
						(this.Rfn = this.Dfn.op_Subtraction(this.xfn.get(-3775711))),
						!0)))
			);
		}
		OnActivate() {
			return (
				(this.Hte = this.Entity.GetComponent(1)),
				(this.Lie = this.Entity.GetComponent(177)),
				(this.Uxr = this.Disable(
					"[SceneItemGuidePathComponent.OnActivate] 默认Disable",
				)),
				Info_1.Info.EnableForceTick ||
					((this.Efn = this.Hte.Owner.GetComponentByClass(
						UE.KuroSceneItemGuidePathComponent.StaticClass(),
					)),
					this.Efn?.IsValid() ||
						(this.Efn = this.Hte.Owner.AddComponentByClass(
							UE.KuroSceneItemGuidePathComponent.StaticClass(),
							!1,
							new UE.Transform(),
							!1,
						)),
					this.Efn.SetComponentTickEnabled(!1)),
				this.Ofn(),
				!0
			);
		}
		kfn() {
			var e = (this.Entity?.GetComponent(0)).GetPbEntityInitData();
			e = (0, IComponent_1.getComponent)(
				e.ComponentsData,
				"EntityStateComponent",
			).StateChangeBehaviors;
			0 < e?.length &&
				(e = e[0].DelayChangeState) &&
				(this.Tfn = e.Time * TimeUtil_1.TimeUtil.InverseMillisecond);
		}
		OnEnd() {
			return (
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnScanStart,
					this.wfn,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnScanStart,
						this.wfn,
					),
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnLevelTagChanged,
					this.gIe,
				) &&
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnLevelTagChanged,
						this.gIe,
					),
				EventSystem_1.EventSystem.Has(
					EventDefine_1.EEventName.CharUseSkill,
					this.ooo,
				) &&
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.CharUseSkill,
						this.ooo,
					),
				this.md?.IsValid() &&
					(this.Ffn(),
					ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(
						this.Lo.SplineEntityId,
						this.Entity.GetComponent(0).GetPbDataId(),
					)),
				!0
			);
		}
		OnTick(e) {
			Info_1.Info.EnableForceTick || this.Vfn(e);
		}
		OnForceTick(e) {
			this.Vfn(e);
		}
		Vfn(e) {
			if (this.rXt) this.qfn(1, !0);
			else {
				let t = this.dce ? 1 : 0;
				this.dce ||
					0 === this.Tfn ||
					((this.Ifn -= e),
					(this.Ifn = this.Ifn <= 0 ? 0 : this.Ifn),
					(t = this.Ifn / this.Tfn)),
					this.qfn(t, !1);
			}
		}
		Ofn() {
			var e,
				t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
					this.Lo.SplineEntityId,
				);
			t
				? (e = (0, IComponent_1.getComponent)(
						t.ComponentsData,
						"SplineComponent",
					))
					? e.Option.Type !== IComponent_1.ESplineType.Effect
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Level",
								32,
								"[SceneItemGuidePathComponent.LoadPathAsset] SplineComponent配置类型不是Effect",
								["SplineEntityId", this.Lo.SplineEntityId],
							)
						: (ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(
								this.Lo.SplineEntityId,
								this.Entity.GetComponent(0).GetPbDataId(),
							),
							(e = Vector_1.Vector.Create(
								t.Transform?.Pos.X ?? 0,
								t.Transform?.Pos.Y ?? 0,
								t.Transform?.Pos.Z ?? 0,
							)),
							(this.md =
								ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(
									this.Lo.SplineEntityId,
								)),
							this.md.K2_SetActorLocation(e.ToUeVector(), !1, void 0, !1),
							this.Entity.GetComponent(0).GetBaseInfo()?.ScanFunction?.ScanId
								? EventSystem_1.EventSystem.AddWithTarget(
										this.Entity,
										EventDefine_1.EEventName.OnScanStart,
										this.wfn,
									)
								: this.Lzr(),
							this.Ufn &&
								EventSystem_1.EventSystem.Add(
									EventDefine_1.EEventName.CharUseSkill,
									this.ooo,
								),
							this.Lo.ColorChangeOption &&
								(EventSystem_1.EventSystem.AddWithTarget(
									this.Entity,
									EventDefine_1.EEventName.OnLevelTagChanged,
									this.gIe,
								),
								this.kfn(),
								this.Hfn()))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Level",
							32,
							"[SceneItemGuidePathComponent.LoadPathAsset] 无法找到SplineComponent配置",
							["SplineEntityId", this.Lo.SplineEntityId],
						)
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						32,
						"[SceneItemGuidePathComponent.LoadPathAsset] 无法找到Spline Entity",
						["SplineEntityId", this.Lo.SplineEntityId],
					);
		}
		bfn(e = !1, t = void 0) {
			var n = Protocol_1.Aki.Protocol.M_s.create();
			(n.rkn = MathUtils_1.MathUtils.NumberToLong(
				this.Hte.CreatureData.GetCreatureDataId(),
			)),
				Net_1.Net.Call(11173, n, (n) => {
					n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							n.lkn,
							15876,
						),
						(this.Ifn = n.REs),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"SceneItem",
								32,
								"response",
								["entityID", n.rkn],
								["resetTime", n.REs],
							),
						e &&
							this.Efn?.IsValid() &&
							this.Efn.StartTick(
								this.Dfn,
								this.Rfn,
								this.Afn,
								colorString,
								this.Tfn / 1e3,
								this.Ifn / 1e3,
							),
						void 0 !== t && t();
				});
		}
		Hfn() {
			this.Lie.HasTag(-3775711) &&
				((this.dce = !0),
				Info_1.Info.EnableForceTick || (this.Efn.HasActiveTag = !0)),
				this.Lie.HasTag(1298716444) &&
					((this.rXt = !0),
					Info_1.Info.EnableForceTick || (this.Efn.HasFinishTag = !0));
		}
		Bfn(e) {
			this.Lzr(),
				void 0 !== this.Uxr &&
					this.Enable(this.Uxr, "SceneItemGuidePathComponent.ShowGuidePath"),
				(this.Uxr = void 0) !== this.yfn &&
					(TimerSystem_1.TimerSystem.Remove(this.yfn), (this.yfn = void 0)),
				(this.yfn = TimerSystem_1.TimerSystem.Delay(() => {
					this.Ffn(),
						void 0 === this.Uxr &&
							(this.Uxr = this.Disable(
								"[SceneItemGuidePathComponent.ShowGuidePath] 超时触发Disable",
							)),
						(this.yfn = void 0);
				}, e * TimeUtil_1.TimeUtil.InverseMillisecond));
		}
		Ffn() {
			EffectSystem_1.EffectSystem.IsValid(this.opi) &&
				(Info_1.Info.EnableForceTick || this.Efn.SetComponentTickEnabled(!1),
				EffectSystem_1.EffectSystem.StopEffectById(
					this.opi,
					"[SceneItemGuidePathComponent.HideEffect]",
					!1,
				),
				(this.opi = 0));
		}
		Lzr() {
			this.opi || this.NKt();
		}
		qfn(e, t) {
			let n;
			(n = t ? this.Afn : this.Dfn.op_Subtraction(this.Rfn.op_Multiply(e))),
				this.Lfn?.IsValid() || this.jfn(),
				this.Lfn?.SetColorParameter(colorString, n);
		}
		NKt() {
			var e = this.md.SplineData;
			(this.opi = EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				this.Hte.ActorTransform,
				e.Effect,
				"[SceneItemGuidePathComponent.SpawnEffect]",
				new EffectContext_1.EffectContext(this.Entity.Id),
				3,
				void 0,
				this.Gfn,
			)),
				EffectSystem_1.EffectSystem.IsValid(this.opi) &&
					EffectSystem_1.EffectSystem.GetEffectActor(this.opi).K2_AttachToActor(
						this.md,
						void 0,
						2,
						2,
						2,
						!1,
					),
				this.jfn();
		}
		jfn() {
			EffectSystem_1.EffectSystem.IsValid(this.opi) &&
				((this.Lfn = EffectSystem_1.EffectSystem.GetNiagaraComponent(this.opi)),
				this.Lfn?.IsValid()) &&
				(this.Lfn.bForceSolo = !0);
		}
	});
(SceneItemGuidePathComponent = SceneItemGuidePathComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(137)],
		SceneItemGuidePathComponent,
	)),
	(exports.SceneItemGuidePathComponent = SceneItemGuidePathComponent);
