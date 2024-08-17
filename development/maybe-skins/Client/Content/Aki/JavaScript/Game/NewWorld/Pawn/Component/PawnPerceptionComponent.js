"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, i) {
		var r,
			o = arguments.length,
			a =
				o < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, n, i);
		else
			for (var h = e.length - 1; 0 <= h; h--)
				(r = e[h]) && (a = (o < 3 ? r(a) : 3 < o ? r(t, n, a) : r(t, n)) || a);
		return 3 < o && a && Object.defineProperty(t, n, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnPerceptionComponent = void 0);
const cpp_1 = require("cpp"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	EnvironmentalPerceptionController_1 = require("../../../World/Enviroment/EnvironmentalPerceptionController"),
	ModManager_1 = require("../../../Manager/ModManager"),
	DISTANCE_OFFSET = 100,
	INTERACT_LOGIC_OFFSET = 100;
let PawnPerceptionComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.ban = void 0),
			(this.Nhn = !1),
			(this.Ohn = !1),
			(this.khn = !1),
			(this.NearbyEnable = !1),
			(this.Fhn = !1),
			(this.Vhn = void 0),
			(this.Izr = void 0),
			(this.ConfigId = -0),
			(this.Hhn = void 0),
			(this.jhn = void 0),
			(this.Whn = void 0),
			(this.Khn = void 0),
			(this.CVs = () => {
				this.Hhn &&
					(EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
						this.Hhn,
					),
					(this.Hhn = void 0));
			}),
			(this.gVs = () => {
				this.jhn &&
					(EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
						this.jhn,
					),
					(this.jhn = void 0));
			}),
			(this.fVs = () => {
				this.Whn &&
					(EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
						this.Whn,
					),
					(this.Whn = void 0));
			}),
			(this.pVs = () => {
				this.Khn &&
					(EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
						this.Khn,
					),
					(this.Khn = void 0));
			}),
			(this.Ozr = () => {
				this.Fhn &&
					((this.Fhn = !1),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
						this.Entity,
					));
			}),
			(this.Qhn = (e) => {
				(this.NearbyEnable = e), (this.Fhn = !1);
			});
	}
	get IsInInteractRange() {
		return !!ModManager_1.ModManager.Settings.PerceptionRange || this.Nhn;
	}
	get IsInAdsorbRange() {
		return !!ModManager_1.ModManager.Settings.PerceptionRange || this.Ohn;
	}
	get IsInSightRange() {
		return !!ModManager_1.ModManager.Settings.PerceptionRange || this.khn;
	}
	SetInteractRange(e, t = 0, n = void 0) {
		ModManager_1.ModManager.Settings.PerceptionRange && (e *= 40),
			this.Izr.SetLogicRange(Math.max(e + 100, t)),
			this.Hhn
				? this.Hhn.UpdateDistance(e, 0 === t ? e : t)
				: ((this.Hhn =
						EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
					this.Hhn.Init(
						e,
						this.Entity?.GameBudgetManagedToken,
						() => {
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Interaction", 37, "进入交互范围", [
									"EntityId",
									this.Entity.Id,
								]),
								(this.Nhn = !0);
						},
						() => {
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Interaction", 37, "离开交互范围", [
									"EntityId",
									this.Entity.Id,
								]),
								(this.Nhn = !1);
						},
						this.CVs,
						void 0,
						t,
						n,
					));
	}
	SetSightRange(e) {
		ModManager_1.ModManager.Settings.PerceptionRange && (e *= 100),
			this.Izr.SetLogicRange(e),
			this.jhn
				? this.jhn.UpdateDistance(e)
				: ((this.jhn =
						EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
					this.jhn.Init(
						e,
						this.Entity?.GameBudgetManagedToken,
						() => {
							this.khn = !0;
						},
						() => {
							this.khn = !1;
						},
						this.gVs,
					));
	}
	SetGuideRange(e) {
		ModManager_1.ModManager.Settings.PerceptionRange && (e *= 100),
			this.Izr.SetLogicRange(e),
			this.Whn
				? this.Whn.UpdateDistance(e)
				: ((this.Whn =
						EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
					this.Whn.Init(
						e,
						this.Entity?.GameBudgetManagedToken,
						() => {
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnGuideRangeEnter,
								this.Entity.Id,
							);
						},
						void 0,
						this.fVs,
					));
	}
	OnInitData() {
		return (
			(this.Vhn = UE.NewMap(UE.BuiltinInt, UE.BuiltinInt)),
			(this.ConfigId = this.Entity.GetComponent(0).GetPbDataId()),
			!0
		);
	}
	OnInit() {
		return (this.Izr = this.Entity.GetComponent(106)), !0;
	}
	OnStart() {
		var e = this.Entity.GetComponent(0),
			t = ((this.ban = this.Entity.GetComponent(1)), this.ban.Owner);
		return UE.KismetSystemLibrary.IsValid(t)
			? (EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.LeaveLogicRange,
					this.Ozr,
				),
				EventSystem_1.EventSystem.AddWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnUpdateNearbyEnable,
					this.Qhn,
				),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Pawn",
						7,
						"[PawnPerceptionComponent.OnStart] 非法Actor",
						["PbDataId", e.GetPbDataId()],
					),
				!1);
	}
	OnActivate() {
		var e,
			t,
			n = this.Entity.GetComponent(144);
		return (
			n &&
				((e = n.ShowRange),
				(t = n.HideRange),
				(this.NearbyEnable = n.EnableTracking),
				(this.Fhn = !1),
				(this.Khn =
					EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
				this.Khn.Init(
					e,
					this.Entity?.GameBudgetManagedToken,
					() => {
						(this.Fhn = !0),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnEnterNearbyTrackRange,
								this.Entity,
							);
					},
					() => {
						(this.Fhn = !1),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
								this.Entity,
							);
					},
					this.pVs,
					() => this.NearbyEnable,
					t,
				),
				this.Izr.SetLogicRange(e),
				this.Izr.SetLogicRange(t + 100)),
			!0
		);
	}
	OnEnd() {
		return (
			this.Fhn &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RemoveNearbyTrack,
					this.Entity,
				),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.LeaveLogicRange,
				this.Ozr,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnUpdateNearbyEnable,
				this.Qhn,
			),
			this.CVs(),
			this.gVs(),
			this.fVs(),
			this.pVs(),
			this.Vhn.Empty(),
			!0
		);
	}
	GetDebugString() {
		let e = "";
		return (
			(e += `InteractRangeToken: ${this.Hhn?.EventToken ?? "undefined"}; IsInRangeInternal: ${this.Nhn}\nInteractRangeInfo:\n`),
			this.Hhn &&
				(e += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(
					this.Hhn.EventToken,
				)),
			e
		);
	}
};
(PawnPerceptionComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(104)],
	PawnPerceptionComponent,
)),
	(exports.PawnPerceptionComponent = PawnPerceptionComponent);
