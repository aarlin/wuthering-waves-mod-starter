"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialGameplayCamera = void 0);
const AiShengGuYangCamera_1 = require("./AiShengGuYangCamera");
class SpecialGameplayCamera {}
(exports.SpecialGameplayCamera = SpecialGameplayCamera).GameplayMap = new Map([
	[0, () => new AiShengGuYangCamera_1.AiShengGuYangCamera()],
]);
