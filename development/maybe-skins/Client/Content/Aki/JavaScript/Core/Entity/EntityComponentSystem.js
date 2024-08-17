"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityComponentSystem = void 0);
const Log_1 = require("../Common/Log"),
	Stats_1 = require("../Common/Stats"),
	Deque_1 = require("../Container/Deque"),
	PriorityQueue_1 = require("../Container/PriorityQueue"),
	Queue_1 = require("../Container/Queue"),
	Quat_1 = require("../Utils/Math/Quat"),
	Rotator_1 = require("../Utils/Math/Rotator"),
	Transform_1 = require("../Utils/Math/Transform"),
	Vector_1 = require("../Utils/Math/Vector"),
	Vector2D_1 = require("../Utils/Math/Vector2D");
class EntityComponentSystem {
	constructor() {}
	static Initialize() {
		return !0;
	}
	static Create(t, e, n) {
		e.UsePool &&
			!EntityComponentSystem.ComponentTemplates.has(t.name) &&
			((o = new t()), EntityComponentSystem.ComponentTemplates.set(t.name, o));
		var o = new t();
		if (o.Create(e, n)) return o;
	}
	static Destroy(t, e) {
		var n = e.Clear();
		return !!n && (t.UsePool ? EntityComponentSystem.ClearComponent(e) : n);
	}
	static ClearComponent(t) {
		var e = EntityComponentSystem.ComponentTemplates.get(t.constructor.name);
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Entity", 30, "清理不存在的组件类型", [
						"Component",
						t.constructor.name,
					]),
				!1
			);
		for (const n in t)
			if ("UnResetPropertySet" !== n && !t.UnResetPropertySet?.has(n))
				if (void 0 === e[n]) t[n] = void 0;
				else if (t[n] instanceof Object) {
					if (!EntityComponentSystem.HW(t[n]))
						return (
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Entity",
									30,
									"组件存在未定义清理方式的Object",
									["Component", t.constructor.name],
									["Object", n],
								),
							!1
						);
				} else t[n] = e[n];
		return !0;
	}
	static HW(t) {
		return !(
			!(t instanceof Stats_1.Stat || t instanceof Function) &&
			(t instanceof Array
				? (t.length = 0)
				: t instanceof Vector_1.Vector ||
						t instanceof Vector2D_1.Vector2D ||
						t instanceof Rotator_1.Rotator ||
						t instanceof Quat_1.Quat ||
						t instanceof Transform_1.Transform
					? (t.Reset(), 0)
					: t instanceof Map || t instanceof Set
						? (t.clear(), 0)
						: t instanceof Queue_1.Queue ||
								t instanceof PriorityQueue_1.PriorityQueue ||
								t instanceof Deque_1.Deque
							? (t.Clear(), 0)
							: !t.ClearObject || !t.ClearObject())
		);
	}
}
((exports.EntityComponentSystem = EntityComponentSystem).ComponentTemplates =
	new Map()),
	(EntityComponentSystem.PerformanceStateClearComponent = void 0);
//# sourceMappingURL=EntityComponentSystem.js.map
