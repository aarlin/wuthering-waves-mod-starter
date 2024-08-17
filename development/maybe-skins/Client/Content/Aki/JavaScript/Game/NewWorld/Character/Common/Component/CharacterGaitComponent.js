"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, a, r) {
		var i,
			o = arguments.length,
			n =
				o < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, a))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(e, t, a, r);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(i = e[s]) && (n = (o < 3 ? i(n) : 3 < o ? i(t, a, n) : i(t, a)) || n);
		return 3 < o && n && Object.defineProperty(t, a, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterGaitComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig"),
	CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
	STOP_SPEED = 5;
let CharacterGaitComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.Gce = void 0),
			(this.mbr = void 0);
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.GetComponent(3)),
			(this.Gce = this.Entity.GetComponent(161)),
			(this.mbr = this.Entity.GetComponent(158)),
			!(!this.Hte || !this.Gce || !this.mbr)
		);
	}
	OnTick(e) {
		var t, a;
		this.Hte.IsAutonomousProxy &&
			((t = this.mbr.MoveState),
			(a = this.mbr.PositionState),
			this.Gce.HasMoveInput || this.UpdateMoveReleasing(a, t));
	}
	UpdateMoveReleasing(e, t) {
		if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground)
			switch (t) {
				case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
				case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
				case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
					this.Gce.Speed < 5 &&
						this.mbr.SetMoveState(
							CharacterUnifiedStateTypes_1.ECharMoveState.Other,
						);
					break;
				default:
					this.Gce.Speed > 5 && this.SetRunStop();
			}
	}
	SetRunStop() {
		switch (this.mbr.MoveState) {
			case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
				this.mbr.SetMoveState(
					CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop,
				);
				break;
			case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
			case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
			case CharacterUnifiedStateTypes_1.ECharMoveState.Dodge:
			case CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll:
				this.Gce.Speed <
				this.Gce.MovementData.FaceDirection.Standing.SprintSpeed -
					TsBaseRoleConfig_1.tsBaseRoleConfig.MaxRunStopSpeed
					? this.mbr.SetMoveState(
							CharacterUnifiedStateTypes_1.ECharMoveState.RunStop,
						)
					: this.mbr.SetMoveState(
							CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop,
						);
		}
	}
};
(CharacterGaitComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(49)],
	CharacterGaitComponent,
)),
	(exports.CharacterGaitComponent = CharacterGaitComponent);
