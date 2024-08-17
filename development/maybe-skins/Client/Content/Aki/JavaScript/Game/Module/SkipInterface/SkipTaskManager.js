"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipTaskManager = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	SkipInterfaceDefine_1 = require("./SkipInterfaceDefine");
class SkipTaskManager {
	static CheckContainRingView(e) {
		SkipTaskManager.CheckContainLimitViewName(e) &&
			UiManager_1.UiManager.CloseHistoryRingView(e);
	}
	static CheckContainLimitViewName(e) {
		return this.Iyo.has(e);
	}
	static RunByConfigId(e) {
		var o =
			ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(e);
		if (o) {
			var r = o.SkipName;
			if (void 0 === r)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SkipInterface",
						8,
						"开始跳转任务时,没有在ESkipName中找到对应枚举",
						["skipTaskName", r],
					);
			else if (-1 !== r) {
				var a,
					i,
					n = ModelManager_1.ModelManager.FunctionModel;
				for ([a, i] of o.FunctionOpenCheckMap)
					if (!n.IsOpen(a))
						return (
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"SkipInterface",
									8,
									"开始跳转任务时,对应功能未开启，不会跳转",
									["skipTaskName", r],
									["functionId", a],
								),
							void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								i,
							)
						);
				let t = this.Tyo(r);
				(t = t || this.Lyo(r))
					? t.Run(o.Val1, o.Val2, o.Val3)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"SkipInterface",
							8,
							"开始跳转任务时,没有配对应的跳转任务",
							["途径表Id", e],
						);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SkipInterface",
					8,
					"开始跳转任务时,没有在途径表中找到对应配置",
					["id", e],
				);
	}
	static Run(e, ...o) {
		let r = this.Tyo(e);
		(r = r || this.Lyo(e))?.Run(...o);
	}
	static async AsyncRun(e, ...o) {
		let r = this.Tyo(e);
		if ((r = r || this.Lyo(e))) return r.AsyncRun(...o);
	}
	static Lyo(e) {
		if (!(e < 0)) {
			var o = SkipInterfaceDefine_1.skipClassMap.get(e);
			if (o) return (o = new o()), this.Dyo.set(e, o), o.Initialize(), o;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SkipInterface",
					8,
					"创建跳转任务时，skipClassMap中找不到对应类",
					["Name", e],
				);
		}
	}
	static Tyo(e) {
		return this.Dyo.get(e);
	}
	static Stop(e) {
		(e = this.Dyo.get(e)) && e.GetIsRunning() && e.Stop();
	}
	static Clear() {
		for (const e of this.Dyo.values()) e.Destroy();
		this.Dyo.clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("SkipInterface", 17, "[Clear] 清理所有跳转任务");
	}
}
((exports.SkipTaskManager = SkipTaskManager).Dyo = new Map()),
	(SkipTaskManager.Iyo = new Set(["RoleRootView", "CalabashRootView"]));
