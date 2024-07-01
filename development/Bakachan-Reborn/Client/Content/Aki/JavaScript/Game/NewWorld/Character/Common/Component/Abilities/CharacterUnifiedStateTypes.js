"use strict";
var ECharPositionState,
	ECharMoveState,
	ECharDirectionState,
	ECharPositionSubState;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ECharPositionSubState =
		exports.ECharDirectionState =
		exports.legalMoveStates =
		exports.ECharMoveState =
		exports.ECharPositionState =
			void 0),
	(function (t) {
		(t[(t.Ground = 0)] = "Ground"),
			(t[(t.Climb = 1)] = "Climb"),
			(t[(t.Air = 2)] = "Air"),
			(t[(t.Water = 3)] = "Water"),
			(t[(t.Ski = 4)] = "Ski");
	})(
		(ECharPositionState =
			exports.ECharPositionState || (exports.ECharPositionState = {})),
	),
	(function (t) {
		(t[(t.Other = 0)] = "Other"),
			(t[(t.Stand = 1)] = "Stand"),
			(t[(t.Walk = 2)] = "Walk"),
			(t[(t.WalkStop = 3)] = "WalkStop"),
			(t[(t.Run = 4)] = "Run"),
			(t[(t.RunStop = 5)] = "RunStop"),
			(t[(t.Sprint = 6)] = "Sprint"),
			(t[(t.SprintStop = 7)] = "SprintStop"),
			(t[(t.Dodge = 8)] = "Dodge"),
			(t[(t.LandRoll = 9)] = "LandRoll"),
			(t[(t.KnockDown = 10)] = "KnockDown"),
			(t[(t.Parry = 11)] = "Parry"),
			(t[(t.SoftKnock = 12)] = "SoftKnock"),
			(t[(t.HeavyKnock = 13)] = "HeavyKnock"),
			(t[(t.NormalClimb = 14)] = "NormalClimb"),
			(t[(t.FastClimb = 15)] = "FastClimb"),
			(t[(t.Glide = 16)] = "Glide"),
			(t[(t.KnockUp = 17)] = "KnockUp"),
			(t[(t.FastSwim = 18)] = "FastSwim"),
			(t[(t.NormalSwim = 19)] = "NormalSwim"),
			(t[(t.Swing = 20)] = "Swing"),
			(t[(t.Captured = 21)] = "Captured"),
			(t[(t.Slide = 22)] = "Slide"),
			(t[(t.Flying = 23)] = "Flying"),
			(t[(t.EnterClimb = 24)] = "EnterClimb"),
			(t[(t.ExitClimb = 25)] = "ExitClimb"),
			(t[(t.NormalSki = 26)] = "NormalSki"),
			(t[(t.StandUp = 27)] = "StandUp"),
			(t[(t.Soar = 28)] = "Soar");
	})(
		(ECharMoveState = exports.ECharMoveState || (exports.ECharMoveState = {})),
	),
	(exports.legalMoveStates = new Map([
		[
			ECharPositionState.Ground,
			new Set([
				ECharMoveState.Other,
				ECharMoveState.Stand,
				ECharMoveState.Walk,
				ECharMoveState.WalkStop,
				ECharMoveState.Run,
				ECharMoveState.RunStop,
				ECharMoveState.Sprint,
				ECharMoveState.SprintStop,
				ECharMoveState.Dodge,
				ECharMoveState.LandRoll,
				ECharMoveState.KnockDown,
				ECharMoveState.Parry,
				ECharMoveState.SoftKnock,
				ECharMoveState.HeavyKnock,
				ECharMoveState.NormalClimb,
				ECharMoveState.FastClimb,
				ECharMoveState.Glide,
				ECharMoveState.KnockUp,
				ECharMoveState.Captured,
				ECharMoveState.Flying,
				ECharMoveState.StandUp,
			]),
		],
		[
			ECharPositionState.Climb,
			new Set([
				ECharMoveState.Other,
				ECharMoveState.NormalClimb,
				ECharMoveState.FastClimb,
				ECharMoveState.ExitClimb,
				ECharMoveState.EnterClimb,
			]),
		],
		[
			ECharPositionState.Air,
			new Set([
				ECharMoveState.Other,
				ECharMoveState.Dodge,
				ECharMoveState.KnockDown,
				ECharMoveState.Parry,
				ECharMoveState.SoftKnock,
				ECharMoveState.HeavyKnock,
				ECharMoveState.Glide,
				ECharMoveState.KnockUp,
				ECharMoveState.Swing,
				ECharMoveState.Captured,
				ECharMoveState.Slide,
				ECharMoveState.Flying,
				ECharMoveState.Soar,
			]),
		],
		[
			ECharPositionState.Water,
			new Set([
				ECharMoveState.Other,
				ECharMoveState.FastSwim,
				ECharMoveState.NormalSwim,
			]),
		],
		[
			ECharPositionState.Ski,
			new Set([ECharMoveState.Other, ECharMoveState.NormalSki]),
		],
	])),
	(function (t) {
		(t[(t.LockDirection = 0)] = "LockDirection"),
			(t[(t.AimDirection = 1)] = "AimDirection"),
			(t[(t.FaceDirection = 2)] = "FaceDirection"),
			(t[(t.LookAtDirection = 3)] = "LookAtDirection");
	})(
		(ECharDirectionState =
			exports.ECharDirectionState || (exports.ECharDirectionState = {})),
	),
	(function (t) {
		(t[(t.None = 0)] = "None"), (t[(t.WaterSurface = 1)] = "WaterSurface");
	})(
		(ECharPositionSubState =
			exports.ECharPositionSubState || (exports.ECharPositionSubState = {})),
	);
