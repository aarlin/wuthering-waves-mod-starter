"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, i) {
		var o,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, n, i);
		else
			for (var l = e.length - 1; 0 <= l; l--)
				(o = e[l]) && (s = (r < 3 ? o(s) : 3 < r ? o(t, n, s) : o(t, n)) || s);
		return 3 < r && s && Object.defineProperty(t, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnSensoryInfoComponent = void 0);
const cpp_1 = require("cpp"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	EnvironmentalPerceptionController_1 = require("../../../World/Enviroment/EnvironmentalPerceptionController"),
	PERCEPTION_SEARCH_RANGE = 2e3;
let PawnSensoryInfoComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.zhn = 0),
			(this.Zhn = !1),
			(this.eln = !1),
			(this.tln = Number.MAX_VALUE),
			(this.iln = void 0),
			(this.oln = void 0),
			(this.rln = () => {
				(this.Zhn = !0),
					this.eln || this.nln(),
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.EnterLogicRange,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.PlayerSenseTargetEnter,
						this.Entity.Id,
					);
			}),
			(this.sln = () => {
				(this.Zhn = !1),
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.LeaveLogicRange,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.PlayerSenseTargetLeave,
						this.Entity.Id,
					);
			}),
			(this.vVs = () => {
				this.iln &&
					(EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
						this.iln,
					),
					(this.iln = void 0));
			}),
			(this.MVs = () => {
				this.oln &&
					(EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
						this.oln,
					),
					(this.oln = void 0));
			}),
			(this.nln = () => {
				this.eln ||
					((this.eln = !0),
					EventSystem_1.EventSystem.EmitWithTarget(
						this.Entity,
						EventDefine_1.EEventName.EnterPresentationInitRange,
					),
					this.iln &&
						(EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
							this.iln,
						),
						(this.iln = void 0)));
			});
	}
	OnActivate() {
		var e = this.Entity.GetComponent(0),
			t = this.Entity?.GameBudgetManagedToken;
		return (
			e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player
				? this.nln()
				: (this.iln &&
						(EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(
							this.iln,
						),
						(this.iln = void 0)),
					(this.iln =
						EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
					this.iln.Init(2e3, t, this.nln, void 0, this.vVs)),
			!this.oln &&
				0 < this.zhn &&
				((this.oln =
					EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
				this.oln.Init(this.zhn, t, this.rln, this.sln, this.MVs)),
			!0
		);
	}
	SetLogicRange(e) {
		var t;
		e > this.zhn &&
			((this.zhn = e),
			this.oln
				? this.oln.UpdateDistance(e)
				: (t = this.Entity?.GameBudgetManagedToken) &&
					((this.oln =
						EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent()),
					this.oln.Init(e, t, this.rln, this.sln, this.MVs)));
	}
	OnEnd() {
		return (
			this.vVs(),
			this.MVs(),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.LeaveLogicRange,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PlayerSenseTargetLeave,
				this.Entity.Id,
			),
			!0
		);
	}
	get PlayerDistSquared() {
		return this.tln;
	}
	get PlayerDist() {
		return Math.sqrt(this.tln);
	}
	get LogicRange() {
		return this.zhn;
	}
	get IsInLogicRange() {
		return this.Zhn;
	}
	GetDebugString() {
		let e = "";
		return (
			(e =
				(e += `DefaultRangeToken: ${this.iln?.EventToken ?? "undefined"}\n`) +
				`LogicRangeToken: ${this.oln?.EventToken ?? "undefined"}; LogicRange: ${this.zhn}; IsInRangeInternal: ${this.IsInLogicRange}\nLogicRangeInfo:\n`),
			this.oln &&
				(e += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(
					this.oln.EventToken,
				)),
			e
		);
	}
};
(PawnSensoryInfoComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(106)],
	PawnSensoryInfoComponent,
)),
	(exports.PawnSensoryInfoComponent = PawnSensoryInfoComponent);
