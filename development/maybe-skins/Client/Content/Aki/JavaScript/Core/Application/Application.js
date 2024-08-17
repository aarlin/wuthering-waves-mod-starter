"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Application = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../Common/Log"),
	CommonDefine_1 = require("../Define/CommonDefine");
class Application {
	static Initialize() {
		Application.gU ||
			((Application.gU = !0),
			UE.KuroApplicationLibrary.AddApplicationLifetimeDelegate(
				(0, puerts_1.toManualReleaseDelegate)(Application.R6),
			),
			UE.KuroApplicationLibrary.AddEditorPreEndPIEDelegate(
				(0, puerts_1.toManualReleaseDelegate)(Application.U6),
			));
	}
	static Destroy() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Core", 42, "Application.Destroy OnEditorPreEndPIE"),
			Application.gU &&
				(Application.A6.clear(),
				Application.PLn.clear(),
				(0, puerts_1.releaseManualReleaseDelegate)(Application.R6),
				(0, puerts_1.releaseManualReleaseDelegate)(Application.U6),
				UE.KuroApplicationLibrary.UnBind(),
				(Application.gU = !1));
	}
	static AddApplicationHandler(i, p) {
		Application.A6.has(i) || Application.A6.set(i, new Set()),
			Application.A6.get(i).add(p);
	}
	static RemoveApplicationHandler(i, p) {
		Application.A6.has(i) && Application.A6.get(i).delete(p);
	}
	static AddEditorPreEndPIEHandler(i) {
		Application.PLn.add(i);
	}
	static RemoveEditorPreEndPIEHandler(i) {
		Application.PLn.delete(i);
	}
	static IsPublicationApp() {
		return (
			this.GmSimulatePublication ||
			UE.KuroLauncherLibrary.GetAppInternalUseType() ===
				CommonDefine_1.PUBLICATION_TYPE
		);
	}
}
((exports.Application = Application).A6 = new Map()),
	(Application.PLn = new Set()),
	(Application.gU = !1),
	(Application.R6 = (i) => {
		var p = i;
		Application.A6.has(p) &&
			(Application.A6.get(p).forEach((i) => {
				i();
			}),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug("Core", 31, "ApplicationLifeTime: " + i);
	}),
	(Application.U6 = (i) => {
		Application.PLn.forEach((i) => {
			i();
		}),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Core", 42, "OnEditorPreEndPIE: " + i);
	}),
	(Application.GmSimulatePublication = !1);
//# sourceMappingURL=Application.js.map
