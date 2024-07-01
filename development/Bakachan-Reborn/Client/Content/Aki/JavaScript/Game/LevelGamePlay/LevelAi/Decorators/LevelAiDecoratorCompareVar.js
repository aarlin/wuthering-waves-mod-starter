"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiDecoratorCompareVar = void 0);
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorCompareVar extends LevelAiDecorator_1.LevelAiDecorator {
	CheckCondition(e) {
		var r = this.Params;
		return (
			!!r &&
			("Eq" !== r.Compare ||
			r.Var1.Type !== r.Var2.Type ||
			"Self" !== r.Var1.Source ||
			"Constant" !== r.Var2.Source
				? (this.PrintDescription("配置错误"), !1)
				: ((e = this.GetWorldStateProxy(e)), this.CIe(e, r.Var1.Name, r.Var2)))
		);
	}
	CIe(e, r, t) {
		switch (t.Type) {
			case "Int":
				return t.Value === e.GetIntWorldState(r);
			case "Boolean":
				return t.Value === e.GetBooleanWorldState(r);
			default:
				return !1;
		}
	}
}
exports.LevelAiDecoratorCompareVar = LevelAiDecoratorCompareVar;
