"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, a, i) {
		var r,
			o = arguments.length,
			n =
				o < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, a))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			n = Reflect.decorate(e, t, a, i);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (n = (o < 3 ? r(n) : 3 < o ? r(t, a, n) : r(t, a)) || n);
		return 3 < o && n && Object.defineProperty(t, a, n), n;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleGaitComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController"),
	CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
	RoleGaitStatic_1 = require("./Define/RoleGaitStatic"),
	RoleForbidMovementHelper_1 = require("./Helper/RoleForbidMovementHelper"),
	RoleStrengthComponent_1 = require("./RoleStrengthComponent"),
	STOP_SPEED = 5;
let RoleGaitComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.Nce = void 0),
			(this.Gce = void 0),
			(this.zJo = void 0),
			(this.mbr = void 0),
			(this.Xte = void 0),
			(this.RoleForbidMovementHelper = void 0),
			(this.RoleGaitUnEnableState = new Map()),
			(this.don = (e) => {
				e
					? (this.Xte.RemoveTag(388142570),
						this.zJo.RemoveBuffByTag(388142570),
						this.RoleGaitUnEnableState.get(2).add(-63548288),
						this.RoleGaitUnEnableState.get(3).add(-63548288))
					: (this.RoleGaitUnEnableState.get(2).delete(-63548288),
						this.RoleGaitUnEnableState.get(3).delete(-63548288)),
					this.Con();
			}),
			(this.gon = (e) => {
				e
					? (this.Xte.RemoveTag(388142570),
						this.zJo.RemoveBuffByTag(388142570),
						this.RoleGaitUnEnableState.get(1).add(229513169),
						this.RoleGaitUnEnableState.get(3).add(229513169))
					: (this.RoleGaitUnEnableState.get(1).delete(229513169),
						this.RoleGaitUnEnableState.get(3).delete(229513169)),
					this.Con();
			}),
			(this.fon = (e) => {
				e
					? this.RoleGaitUnEnableState.get(1).add(930178923)
					: this.RoleGaitUnEnableState.get(1).delete(930178923),
					this.Con();
			}),
			(this.pon = (e) => {
				e
					? this.RoleGaitUnEnableState.get(3).add(477750727)
					: this.RoleGaitUnEnableState.get(3).delete(477750727),
					this.Con();
			});
	}
	static get Dependencies() {
		return [3, 161];
	}
	OnInitData() {
		return (
			(this.RoleForbidMovementHelper =
				new RoleForbidMovementHelper_1.RoleForbidMovementHelper()),
			!0
		);
	}
	OnStart() {
		return (
			(this.Hte = this.Entity.CheckGetComponent(3)),
			(this.Gce = this.Entity.CheckGetComponent(161)),
			(this.mbr = this.Entity.CheckGetComponent(158)),
			(this.Xte = this.Entity.CheckGetComponent(185)),
			(this.Nce = this.Entity.CheckGetComponent(52)),
			(this.zJo = this.Entity.CheckGetComponent(157)),
			RoleGaitStatic_1.RoleGaitStatic.Init(),
			this.InitRoleForbidMovementHelper(),
			!0
		);
	}
	InitRoleForbidMovementHelper() {
		this.RoleGaitUnEnableState.set(2, new Set()),
			this.RoleGaitUnEnableState.set(1, new Set()),
			this.RoleGaitUnEnableState.set(3, new Set()),
			(this.RoleForbidMovementHelper.TagComp =
				this.Entity.CheckGetComponent(185)),
			this.RoleForbidMovementHelper.CreateTagHandler(-63548288, 1, this.don),
			this.RoleForbidMovementHelper.CreateTagHandler(229513169, 1, this.gon),
			this.RoleForbidMovementHelper.CreateTagHandler(930178923, 0, this.fon),
			this.RoleForbidMovementHelper.RegisterMutuallyTags([
				-63548288, 930178923,
			]),
			this.RoleForbidMovementHelper.CreateTagHandler(477750727, 0, this.pon),
			this.RoleForbidMovementHelper.Awake();
	}
	OnClear() {
		return this.RoleForbidMovementHelper.Clear(), !0;
	}
	OnTick(e) {
		this.Con();
	}
	Con() {
		var e, t, a, i;
		this.Hte.IsAutonomousProxy &&
			(this.von(),
			(e = this.mbr.MoveState),
			(t = this.mbr.PositionState),
			(a = this.Xte.HasTag(388142570)),
			(i = this.mbr.DirectionState),
			this.Gce.HasMoveInput
				? this.UpdateMovePressing(a, t, e, i)
				: this.UpdateMoveReleasing(a, t, e, i));
	}
	EnableRoleGaitState(e) {
		return 0 === this.RoleGaitUnEnableState.get(e).size;
	}
	FindEnableGaitState() {
		for (var [e, t] of this.RoleGaitUnEnableState) if (0 === t.size) return e;
	}
	FindEnableCharMoveState() {
		var e = this.FindEnableGaitState();
		if (e)
			switch (e) {
				case 1:
					return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
				case 2:
				case 3:
					return CharacterUnifiedStateTypes_1.ECharMoveState.Run;
			}
	}
	UpdateMovePressing(e, t, a, i) {
		switch (t) {
			case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
				if (e && this.EnableRoleGaitState(3)) {
					var r =
						FormationAttributeController_1.FormationAttributeController.GetValue(
							1,
						);
					if (a !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) {
						if (r >= RoleStrengthComponent_1.STRENGTH_TOLERANCE) {
							this.mbr.SetMoveState(
								CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
							);
							break;
						}
					} else if (0 < r) break;
				}
				this.mbr.IsWalkBaseMode
					? !this.EnableRoleGaitState(1) && this.EnableRoleGaitState(2)
						? this.mbr.SetMoveState(
								CharacterUnifiedStateTypes_1.ECharMoveState.Run,
							)
						: this.mbr.SetMoveState(
								CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
							)
					: !this.EnableRoleGaitState(2) && this.EnableRoleGaitState(1)
						? this.mbr.SetMoveState(
								CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
							)
						: this.mbr.SetMoveState(
								CharacterUnifiedStateTypes_1.ECharMoveState.Run,
							);
				break;
			case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
				a !== CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim &&
					a !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim &&
					this.mbr.SetMoveState(
						CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim,
					);
				break;
			case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
				a !== CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb &&
					a !== CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb &&
					a !== CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb &&
					a !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb &&
					this.mbr.SetMoveState(
						CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb,
					);
		}
	}
	UpdateMoveReleasing(e, t, a, i) {
		switch (
			(e &&
				(this.Xte.RemoveTag(388142570), this.zJo.RemoveBuffByTag(388142570)),
			t)
		) {
			case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
				if (i !== CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection)
					switch (a) {
						case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
						case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
						case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
							this.SetRunStop();
							break;
						case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
						case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
						case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
							this.Gce.Speed < 5 &&
								this.mbr.SetMoveState(
									CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
								);
					}
				break;
			case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
				this.mbr.SetMoveState(
					CharacterUnifiedStateTypes_1.ECharMoveState.Other,
				);
				break;
			case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
				this.mbr.MoveState !==
					CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb &&
					this.mbr.MoveState !==
						CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb &&
					this.mbr.SetMoveState(
						CharacterUnifiedStateTypes_1.ECharMoveState.Other,
					);
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
	von() {
		switch (ModelManager_1.ModelManager.PlatformModel.InputController) {
			case 0:
				break;
			case 1:
				this.Mon();
				break;
			case 2:
				this.Son();
		}
	}
	Mon() {
		this.Nce.GetMoveVectorCache().SizeSquared() >
		MathUtils_1.MathUtils.Square(
			RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate(),
		)
			? this.mbr.MoveState ===
					CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
				this.mbr.WalkPress()
			: this.mbr.MoveState ===
					CharacterUnifiedStateTypes_1.ECharMoveState.Run &&
				this.mbr.WalkPress();
	}
	Son() {
		this.Nce.GetMoveVectorCache().SizeSquared() >
		MathUtils_1.MathUtils.Square(
			RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate(),
		)
			? this.mbr.MoveState ===
					CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
				this.mbr.WalkPress()
			: this.mbr.MoveState ===
					CharacterUnifiedStateTypes_1.ECharMoveState.Run &&
				this.mbr.WalkPress();
	}
};
(RoleGaitComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(82)],
	RoleGaitComponent,
)),
	(exports.RoleGaitComponent = RoleGaitComponent);
