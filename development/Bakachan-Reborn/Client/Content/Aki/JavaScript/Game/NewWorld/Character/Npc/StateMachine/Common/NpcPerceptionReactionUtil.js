"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcPerceptionReactionUtil = void 0);
const Time_1 = require("../../../../../../Core/Common/Time"),
	MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	Global_1 = require("../../../../../Global"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	BUBBLE_RANDOM_MAX = 100,
	TURN_SPEED = 2e4,
	BUBBLE_TIME = 3;
class NpcPerceptionReactionUtil {
	static TurnToPlayer(t) {
		var e = t.GetComponent(2),
			o = e.ActorLocationProxy,
			r =
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.ActorLocationProxy,
			a = Vector_1.Vector.Create();
		r.Subtraction(o, a),
			(a.Z = 0),
			a.Normalize(),
			(r = Rotator_1.Rotator.Create());
		(o = (a.ToOrientationRotator(r), t.GetComponent(36)))
			? o.SmoothCharacterRotation(r, 2e4, Time_1.Time.DeltaTimeSeconds)
			: e.SetActorRotation(
					r.ToUeRotator(),
					"NpcPerformUnderAttackState.TurnToPlayer",
				);
	}
	static ShowHeadDialog(t, e, o) {
		e < MathUtils_1.MathUtils.GetRandomFloatNumber(0, 100) ||
			((e = t.GetComponent(70)) &&
				(t = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
					o.FlowListName,
					o.FlowId,
					t.GetComponent(2).Actor.ActorLabel,
					o.StateId,
				)) &&
				0 !== t.TalkItems.length &&
				((o = t.TalkItems[0]),
				StringUtils_1.StringUtils.IsEmpty(o.TidTalk) ||
					((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.TidTalk)),
					o.WaitTime && 0 < o.WaitTime
						? e.SetDialogueText(t, o.WaitTime)
						: e.SetDialogueText(t, 3))));
	}
}
exports.NpcPerceptionReactionUtil = NpcPerceptionReactionUtil;
