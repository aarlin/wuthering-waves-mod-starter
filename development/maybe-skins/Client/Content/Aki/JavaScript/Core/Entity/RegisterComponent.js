"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.isComponentInstance =
		exports.RegisterComponent =
		exports.RegisterComponentFinish =
			void 0);
const Log_1 = require("../Common/Log"),
	EntityComponent_1 = require("./EntityComponent");
let finish = !1;
function RegisterComponentFinish() {
	finish = !0;
}
function RegisterComponent(t) {
	return function (n) {
		return (
			finish
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"调用RegisterComponentFinish函数后不再允许注册组件",
						["Type", n.name],
						["id", t],
					)
				: (n.Id = t),
			n
		);
	};
}
function isComponentInstance(t, e) {
	if (t) {
		let n = t?.__proto__;
		for (
			;
			n?.constructor &&
			n instanceof EntityComponent_1.EntityComponent &&
			n.constructor !== EntityComponent_1.EntityComponent;
		) {
			var o = n.constructor.Id;
			if (void 0 === o) return !1;
			if (o === e) return !0;
			n = n?.__proto__;
		}
	}
	return !1;
}
(exports.RegisterComponentFinish = RegisterComponentFinish),
	(exports.RegisterComponent = RegisterComponent),
	(exports.isComponentInstance = isComponentInstance);
//# sourceMappingURL=RegisterComponent.js.map
