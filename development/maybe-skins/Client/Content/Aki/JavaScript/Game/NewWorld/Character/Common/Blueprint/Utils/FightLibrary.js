"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FightLibrary = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	GlobalData_1 = require("../../../../../GlobalData"),
	CampUtils_1 = require("./CampUtils");
class FightLibrary {
	static Init() {
		var a = UE.DataTableUtil_C.LoadAllCampConfigs(
			GlobalData_1.GlobalData.GameInstance,
		);
		for (let i = (CampUtils_1.CampUtils.Camp.length = 0); i < a.Num(); ++i) {
			var r = a.Get(i),
				t = new Array();
			CampUtils_1.CampUtils.Camp.push(t);
			for (let a = 0; a < r.Value.Num(); ++a) {
				var e = r.Value.Get(a);
				t.push(0 === e ? 2 : 1 === e ? 1 : 0);
			}
		}
	}
	static GetHitMapConfig(a) {
		var r = (0, puerts_1.$ref)(!1),
			t = (0, puerts_1.$ref)(void 0);
		if (
			(UE.DataTableUtil_C.LoadHitMapConfig(
				a,
				GlobalData_1.GlobalData.GameInstance,
				t,
				r,
			),
			(0, puerts_1.$unref)(r))
		)
			return (0, puerts_1.$unref)(t);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Config", 4, "找不到受击映射配置", [
				"selfCamp:",
				a.toString(),
			]);
	}
}
exports.FightLibrary = FightLibrary;
