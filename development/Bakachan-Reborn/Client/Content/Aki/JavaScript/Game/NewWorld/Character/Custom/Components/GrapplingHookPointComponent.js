"use strict";
var GrapplingHookPointComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, o, i) {
			var n,
				r = arguments.length,
				a =
					r < 3
						? t
						: null === i
							? (i = Object.getOwnPropertyDescriptor(t, o))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, o, i);
			else
				for (var s = e.length - 1; 0 <= s; s--)
					(n = e[s]) &&
						(a = (r < 3 ? n(a) : 3 < r ? n(t, o, a) : n(t, o)) || a);
			return 3 < r && a && Object.defineProperty(t, o, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GrapplingHookPointComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	TsEffectActor_1 = require("../../../../Effect/TsEffectActor"),
	LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
	HOOK_VISION_ID = 1001,
	hookPointStateTagMap = new Map([
		[0, 1888174838],
		[1, -1156116864],
		[2, -43463105],
	]);
let GrapplingHookPointComponent =
	(GrapplingHookPointComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Lo = void 0),
				(this.Lie = void 0),
				(this.RadiusSquared = 0),
				(this.ac = 3),
				(this.Hte = void 0),
				(this.YO = void 0),
				(this.ken = !1),
				(this.fVo = void 0),
				(this.Fen = (e) => {
					1001 === e && (this.Lie.AddTag(1888174838), (this.ac = 0));
				});
		}
		get Location() {
			return Vector_1.Vector.Create(this.Hte?.ActorLocationProxy);
		}
		get Radius() {
			return this.Lo?.Range.Radius ?? 0;
		}
		get CameraGaze() {
			return this.Lo?.CameraGaze;
		}
		get InheritSpeed() {
			return this.Lo?.InheritSpeed ?? !1;
		}
		get IsClimb() {
			return this.Lo?.IsClimb ?? !1;
		}
		get IsInCd() {
			return this.ken;
		}
		get WillBeDestroyedAfterHook() {
			return this.Lo?.IsDestroyedSelf ?? !1;
		}
		get WillBeHideAfterHook() {
			return this.Lo?.IsHideSelf ?? !1;
		}
		OnInitData(e) {
			e = e.GetParam(GrapplingHookPointComponent_1)[0];
			if (
				((this.Lo = e || void 0),
				void 0 !== this.Lo.PlayerStateRestritionId &&
					((e = {
						Type: "CheckPlayerStateRestriction",
						RestrictionId: this.Lo.PlayerStateRestritionId,
					}),
					(this.YO = { Type: 0, Conditions: [e] })),
				(this.Lie = this.Entity.GetComponent(177)),
				this.Lie?.Valid && this.Lie.AddTag(-254251760),
				this.Lo.HookInteractConfig)
			)
				switch (this.Lo.HookInteractConfig.Type) {
					case "FixedPointHook":
						this.fVo = -833935142;
						break;
					case "SuiGuangHook":
						this.fVo = 561771029;
				}
			else this.fVo = -833935142;
			return (
				(this.RadiusSquared = MathUtils_1.MathUtils.Square(this.Radius)), !0
			);
		}
		OnStart() {
			if (
				((this.Hte = this.Entity.GetComponent(182)),
				this.Entity.GetComponent(0))
			) {
				GrapplingHookPointComponent_1.Ven ||
					(ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
						1001,
					) &&
						(GrapplingHookPointComponent_1.Ven = !0));
				let e = !1;
				if (GrapplingHookPointComponent_1.Ven) {
					for (const t of hookPointStateTagMap.keys())
						if (this.Lie.HasTag(t)) {
							e = !0;
							break;
						}
					e || (this.Lie.AddTag(1888174838), (this.ac = 0));
				}
				GrapplingHookPointComponent_1.AllPoints.push(this),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.AddExploreVisionSkill,
						this.Fen,
					);
			}
			return !0;
		}
		OnEnd() {
			var e = GrapplingHookPointComponent_1.AllPoints.indexOf(this);
			return (
				0 <= e && GrapplingHookPointComponent_1.AllPoints.splice(e, 1),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.AddExploreVisionSkill,
					this.Fen,
				),
				!0
			);
		}
		ChangeHookPointState(e) {
			this.ac !== e &&
				(this.Lie.RemoveTag(hookPointStateTagMap.get(this.ac)),
				1 === this.ac &&
					this.Entity.GetComponent(182).PlaySceneInteractionEndEffect(0),
				(this.ac = e),
				this.Lie.AddTag(hookPointStateTagMap.get(this.ac)));
		}
		CheckCondition() {
			return (
				void 0 === this.YO ||
				ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
					this.YO,
					this.Hte.Owner,
					LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
				)
			);
		}
		TryStartCd() {
			void 0 !== this.Lo.HookLockCd &&
				((this.ken = !0),
				TimerSystem_1.TimerSystem.Delay(() => {
					this.ken = !1;
				}, this.Lo.HookLockCd * TimeUtil_1.TimeUtil.InverseMillisecond));
		}
		WasRecentlyRenderOnScreen() {
			let e = this.Hte?.CurLevelPrefabShowActor;
			if (e?.IsValid()) {
				if (e instanceof TsEffectActor_1.default) {
					var t = e.GetHandle();
					if (
						!EffectSystem_1.EffectSystem.IsValid(t) &&
						(this.Hte.RefreshShowActor(),
						!(e = this.Hte?.CurLevelPrefabShowActor)?.IsValid())
					)
						return !1;
				}
				return (
					!(
						UE.KuroStaticLibrary.IsObjectClassByName(
							e,
							CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
						) &&
						(this.Hte.RefreshShowActor(),
						!(e = this.Hte?.CurLevelPrefabShowActor)?.IsValid())
					) && e.WasRecentlyRenderedOnScreen(0.5)
				);
			}
			return !1;
		}
		GetTagId() {
			return this.fVo;
		}
		GetHookInteractType() {
			return this.Lo.HookInteractConfig?.Type ?? "FixedPointHook";
		}
	});
(GrapplingHookPointComponent.AllPoints = []),
	(GrapplingHookPointComponent.Ven = !1),
	(GrapplingHookPointComponent = GrapplingHookPointComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(73)],
			GrapplingHookPointComponent,
		)),
	(exports.GrapplingHookPointComponent = GrapplingHookPointComponent);
