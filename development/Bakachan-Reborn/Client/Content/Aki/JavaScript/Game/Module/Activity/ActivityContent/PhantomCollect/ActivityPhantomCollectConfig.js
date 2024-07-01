"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityPhantomCollectConfig = void 0);
const PhantomCollectActivityById_1 = require("../../../../../Core/Define/ConfigQuery/PhantomCollectActivityById"),
	PhantomCollectTaskDescById_1 = require("../../../../../Core/Define/ConfigQuery/PhantomCollectTaskDescById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityPhantomCollectConfig extends ConfigBase_1.ConfigBase {
	GetPhantomCollectConfig(t) {
		return PhantomCollectActivityById_1.configPhantomCollectActivityById.GetConfig(
			t,
		);
	}
	GetPhantomCollectTaskDesc(t) {
		return PhantomCollectTaskDescById_1.configPhantomCollectTaskDescById.GetConfig(
			t,
		);
	}
}
exports.ActivityPhantomCollectConfig = ActivityPhantomCollectConfig;
