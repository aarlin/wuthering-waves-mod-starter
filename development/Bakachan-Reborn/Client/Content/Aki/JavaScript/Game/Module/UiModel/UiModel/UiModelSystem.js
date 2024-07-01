"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelSystem = void 0);
const UiModelDefine_1 = require("../Define/UiModelDefine"),
	UiModelBase_1 = require("./UiModelBase");
class UiModelSystem {
	static CreateUiModelByUseWay(e, o) {
		return (
			(e = UiModelDefine_1.uiModelCreateDataPreDefine[e]),
			this.CreateUiModelByCreateData(e, o)
		);
	}
	static CreateUiModelByCreateData(e, o) {
		var t,
			i = new UiModelBase_1.UiModelBase();
		for (const o of e.Components) i.AddComponent(o);
		return (
			(t =
				((t = i.CheckGetComponent(0)) &&
					((t.ModelType = e.ModelType),
					(t.ModelActorType = e.ModelActorType),
					(t.ModelUseWay = e.ModelUseWay)),
				i.CheckGetComponent(1))) && (t.Actor = o),
			i
		);
	}
}
exports.UiModelSystem = UiModelSystem;
