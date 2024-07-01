"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	InstanceDungeonAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonAll"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LoginConfig extends ConfigBase_1.ConfigBase {
	GetAllInstanceDungeon() {
		return InstanceDungeonAll_1.configInstanceDungeonAll.GetConfigList();
	}
	GetInstanceDungeonNameById(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
	}
	GetLoginFailResetTime() {
		var e = CommonParamById_1.configCommonParamById.GetIntConfig(
			"login_fail_reset_time",
		);
		return (
			0 === e &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Login", 9, "登录失败次数重置参数错误", [
					"loginFailResetTime",
					e,
				]),
			e
		);
	}
	GetLoginFailParam(e) {
		var n =
				CommonParamById_1.configCommonParamById.GetStringConfig(
					"login_fail_params",
				),
			o = n.split(/[,|]/g);
		if (0 === o.length || o.length % 2 != 0)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Login", 9, "登录失败重试参数错误, 请检查个数", [
						"params",
						n,
					]),
				0
			);
		let r = 0;
		for (let g = 0; g < o.length; g += 2) {
			var i = Number(o[g]),
				a = Number(o[g + 1]);
			if (isNaN(i) || i <= 0 || isNaN(a) || a <= 0)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Login", 9, "登录失败重试参数错误, ", [
							"params",
							n,
						]),
					0
				);
			i <= e && (r = a);
		}
		return r;
	}
	GetDefaultSingleMapId() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"default_single_map_id",
		);
	}
	GetDefaultMultiMapId() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"default_multi_map_id",
		);
	}
	GetSdkReloginTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"sdk_relogin_time",
		);
	}
	GetDevLoginServerIp() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"dev_sdk_loginserver_ip",
		);
	}
	GetMainlineLoginServerIp() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"mainline_sdk_loginserver_ip",
		);
	}
}
exports.LoginConfig = LoginConfig;
