"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SwimConfig = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	SwimBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/SwimBuffById"),
	SwimById_1 = require("../../../../../../Core/Define/ConfigQuery/SwimById"),
	ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase"),
	NORMAL_SWIM_CONFIG_ID = 0,
	NO_INPUT_CONFIG_ID = 1,
	FAST_SWIM_CONFIG_ID = 3;
class SwimConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.xzo = void 0),
			(this.wzo = void 0),
			(this.Bzo = void 0),
			(this.bzo = void 0);
	}
	OnInit() {
		return (
			(this.xzo = new Map()),
			(this.wzo = BigInt(0)),
			(this.Bzo = BigInt(0)),
			(this.bzo = BigInt(0)),
			this.InitSwimBuffConfig(),
			!0
		);
	}
	OnClear() {
		return (
			(this.xzo = void 0),
			(this.wzo = void 0),
			(this.Bzo = void 0),
			!(this.bzo = void 0)
		);
	}
	GetSwimConfigByRoleBodyId(o) {
		var i = this.xzo.get(o);
		return (
			i ||
			((i = SwimById_1.configSwimById.GetConfig(o)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Movement", 58, "以下身高没有配置游泳", [
						"RoleBody",
						o,
					])),
			this.xzo.set(o, i),
			i)
		);
	}
	GetSwimBuffId(o, i) {
		return o ? (i ? this.Bzo : this.wzo) : this.bzo;
	}
	InitSwimBuffConfig() {
		var o = SwimBuffById_1.configSwimBuffById.GetConfig(0);
		o
			? ((this.wzo = BigInt(o.BuffId)),
				(o = SwimBuffById_1.configSwimBuffById.GetConfig(1))
					? ((this.bzo = BigInt(o.BuffId)),
						(o = SwimBuffById_1.configSwimBuffById.GetConfig(3))
							? (this.Bzo = BigInt(o.BuffId))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Movement",
									58,
									"游泳Buff表没有配置Id为3的基础配置",
								))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Movement",
							58,
							"游泳Buff表没有配置Id为1的基础配置",
						))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Movement", 58, "游泳Buff表没有配置Id为0的基础配置");
	}
}
exports.SwimConfig = SwimConfig;
