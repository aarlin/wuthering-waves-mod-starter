"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventHighlightExploreUi = void 0);
const Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventHighlightExploreUi extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, l) {
		e || this.FinishExecute(!1);
		var i,
			t =
				Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
					45,
				);
		t &&
			("Show" === e.Type &&
				((i = e),
				t
					.GetHighlightExploreSkill()
					.ShowHighlightExploreSkill(i.SkillType, i.Duration, i.IsSwitchBack)),
			"Hide" === e.Type) &&
			t.GetHighlightExploreSkill().HideHighlightExploreSkill();
	}
}
exports.LevelEventHighlightExploreUi = LevelEventHighlightExploreUi;
