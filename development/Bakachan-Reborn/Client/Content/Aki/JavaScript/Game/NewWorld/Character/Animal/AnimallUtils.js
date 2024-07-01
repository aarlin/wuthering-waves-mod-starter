"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalUtils = void 0);
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
class AnimalUtils {
	static GetAnimalComponentConfig(t) {
		return (
			(t = t.GetPbEntityInitData()),
			(0, IComponent_1.getComponent)(t.ComponentsData, "AnimalComponent")
		);
	}
}
exports.AnimalUtils = AnimalUtils;
