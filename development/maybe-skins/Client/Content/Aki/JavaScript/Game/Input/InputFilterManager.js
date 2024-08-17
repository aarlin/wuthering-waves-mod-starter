"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputFilterManager = void 0);
const InputEnums_1 = require("./InputEnums");
class InputFilterManager {
	static UpdateCharacterSystemActions(n, t) {
		InputFilterManager.CharacterSystemActions.set(n, t);
	}
}
((exports.InputFilterManager = InputFilterManager).CharacterActions = new Set([
	InputEnums_1.EInputAction.跳跃,
	InputEnums_1.EInputAction.攀爬,
	InputEnums_1.EInputAction.走跑切换,
	InputEnums_1.EInputAction.攻击,
	InputEnums_1.EInputAction.闪避,
	InputEnums_1.EInputAction.技能1,
	InputEnums_1.EInputAction.幻象1,
	InputEnums_1.EInputAction.大招,
	InputEnums_1.EInputAction.幻象2,
	InputEnums_1.EInputAction.切换角色1,
	InputEnums_1.EInputAction.切换角色2,
	InputEnums_1.EInputAction.切换角色3,
	InputEnums_1.EInputAction.锁定目标,
	InputEnums_1.EInputAction.瞄准,
	InputEnums_1.EInputAction.通用交互,
])),
	(InputFilterManager.CharacterSystemActions = new Map([])),
	(InputFilterManager.CharacterSystemViewActions = new Map([
		["PlotSubtitleView", new Set()],
	])),
	(InputFilterManager.CharacterAxes = new Set([
		InputEnums_1.EInputAxis.MoveForward,
		InputEnums_1.EInputAxis.MoveRight,
		InputEnums_1.EInputAxis.LookUp,
		InputEnums_1.EInputAxis.Turn,
		InputEnums_1.EInputAxis.Zoom,
	]));
