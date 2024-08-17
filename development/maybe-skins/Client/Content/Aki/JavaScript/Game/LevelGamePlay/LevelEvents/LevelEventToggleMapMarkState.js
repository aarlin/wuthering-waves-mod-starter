"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventToggleMapMarkState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleMapMarkState extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.tUe = (e) => {
				"WorldMapView" === e &&
					(this.Finish(),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.CloseView,
						this.tUe,
					));
			});
	}
	ExecuteNew(e, a) {
		var r = e;
		if (r)
			switch (r.Type) {
				case IAction_1.EMapMarkState.Show:
					var t = r;
					if (this.iUe(t.MarkId) && t.IsFocusOnFirstShow) {
						var n = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(
							t.MarkId,
						);
						if (n.IsShow && n.NeedFocus) {
							if (
								((n.NeedFocus = !1),
								!(n = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(
									t.MarkId,
								)))
							)
								return (
									Log_1.Log.CheckError() &&
										Log_1.Log.Error("Map", 50, "缺少MapMark表缺少地图配置", [
											"MarkId",
											t.MarkId,
										]),
									void this.Finish()
								);
							if (
								((t = {
									MarkId: t.MarkId,
									MarkType: n.ObjectType,
									IsNotFocusTween: !0,
								}),
								UiManager_1.UiManager.OpenView("WorldMapView", t, () => {
									this.IsAsync ||
										EventSystem_1.EventSystem.Add(
											EventDefine_1.EEventName.CloseView,
											this.tUe,
										);
								}),
								!this.IsAsync)
							)
								return;
						}
					}
					break;
				case IAction_1.EMapMarkState.Hide:
					this.iUe(r.MarkId);
			}
		this.Finish();
	}
	iUe(e) {
		return (
			-1 ===
			ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)?.ShowCondition
		);
	}
}
exports.LevelEventToggleMapMarkState = LevelEventToggleMapMarkState;
