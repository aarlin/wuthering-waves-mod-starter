"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckPlayerMotionState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPlayerMotionState extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		if (!e) return !1;
		var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		if (!a)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"LevelCondition",
						7,
						"[CheckPlayerMotionState]无法获取当前角色",
					),
				!1
			);
		var i = a.Entity.GetComponent(158);
		if (!i)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"LevelCondition",
						7,
						"[CheckPlayerMotionState]无法获取当前角色UnifiedState组件",
					),
				!1
			);
		let r = !1,
			o = !1;
		switch (e.MotionState) {
			case "Ground":
				r =
					i.PositionState ===
						CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
					i.PositionSubState ===
						CharacterUnifiedStateTypes_1.ECharPositionSubState.None;
				break;
			case "Air":
				r =
					i.PositionState ===
					CharacterUnifiedStateTypes_1.ECharPositionState.Air;
				break;
			case "Climb":
				r =
					i.PositionState ===
					CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
				break;
			case "OnClimbing":
				r =
					i.PositionState ===
						CharacterUnifiedStateTypes_1.ECharPositionState.Climb &&
					(i.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other ||
						i.MoveState ===
							CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb ||
						i.MoveState ===
							CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb);
				break;
			case "Water":
				r =
					i.PositionState ===
					CharacterUnifiedStateTypes_1.ECharPositionState.Water;
				break;
			case "WalkOnWater":
				r =
					i.PositionState ===
						CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
					i.PositionSubState ===
						CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface;
				break;
			case "GlideInAir":
				r =
					i.PositionState ===
						CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
					i.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Glide;
				break;
			case "FallInAir":
				r =
					i.PositionState ===
						CharacterUnifiedStateTypes_1.ECharPositionState.Air &&
					i.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Other;
				break;
			default:
				o = !0;
		}
		if (o) {
			var n = a.Entity.GetComponent(185);
			if (!n)
				return (
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"LevelCondition",
							7,
							"[CheckPlayerMotionState]无法获取当前角色CharacterGameplayTag组件",
						),
					!1
				);
			switch (e.MotionState) {
				case "SwitchSkill":
					r = n.HasTag(1674960297);
					break;
				case "UltimateDodge":
					r = n.HasTag(-1221493771);
					break;
				case "UltimateSkill":
					r = n.HasTag(1733479717);
			}
		}
		switch (e.Compare) {
			case "Eq":
				return r;
			case "Ne":
				return !r;
			default:
				return !1;
		}
	}
}
exports.LevelConditionCheckPlayerMotionState =
	LevelConditionCheckPlayerMotionState;
