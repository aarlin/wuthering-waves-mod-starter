"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TurntableControlController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager");
class TurntableControlController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
			this.wwn,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
			this.wwn,
		);
	}
	static Clear() {
		return this.Owe(), super.Clear();
	}
	static kwe() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		e?.CurControllerEntity &&
			!EventSystem_1.EventSystem.HasWithTarget(
				e.CurControllerEntity,
				EventDefine_1.EEventName.OnSceneItemStateChange,
				this.Fwe,
			) &&
			EventSystem_1.EventSystem.AddWithTarget(
				e.CurControllerEntity,
				EventDefine_1.EEventName.OnSceneItemStateChange,
				this.Fwe,
			);
	}
	static Owe() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		e?.CurControllerEntity &&
			EventSystem_1.EventSystem.HasWithTarget(
				e.CurControllerEntity,
				EventDefine_1.EEventName.OnSceneItemStateChange,
				this.Fwe,
			) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				e.CurControllerEntity,
				EventDefine_1.EEventName.OnSceneItemStateChange,
				this.Fwe,
			);
	}
	static async OpenTurntableControlView(e) {
		var t;
		return !(
			!UiManager_1.UiManager.IsViewShow("TurntableControlView") &&
			((t = ModelManager_1.ModelManager.TurntableControlModel)
				.CurControllerEntity && this.Owe(),
			t.SetCurControllerEntity(e),
			!t?.CurControllerEntityComp ||
				!t.CurControllerEntity ||
				(t.CurControllerEntityComp.IsAllRingsAtTarget() ||
					t.CurControllerEntityComp.SetAllowRotate(!0),
				this.kwe(),
				void 0 ===
					(await UiManager_1.UiManager.OpenViewAsync("TurntableControlView"))))
		);
	}
	static HandleTurntableControlViewClose() {
		this.Owe();
		var e = ModelManager_1.ModelManager.TurntableControlModel,
			t = e.CurControllerEntityComp;
		t &&
			(t.TriggerStopAllRingsRotate(),
			t.DeselectAllRings(!0),
			t.SetAllowRotate(!1)),
			e.ClearCurControllerEntity();
	}
	static GetControllerEntity() {
		return ModelManager_1.ModelManager.TurntableControlModel
			.CurControllerEntity;
	}
	static StartRotateSelected() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		e?.CurControllerEntityComp &&
			e.CurControllerEntityComp.TriggerStartSelectedRingsRotate();
	}
	static StopAllRotate() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		e?.CurControllerEntityComp &&
			e.CurControllerEntityComp.GetControlType() ===
				IComponent_1.EControllerType.FreeAngle &&
			e.CurControllerEntityComp.TriggerStopAllRingsRotate();
	}
	static IsAllRingsAtTarget() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		return (
			!!e?.CurControllerEntityComp &&
			e.CurControllerEntityComp.IsAllRingsAtTarget()
		);
	}
	static IsBusyRotating() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		return (
			!!e?.CurControllerEntityComp && e.CurControllerEntityComp.IsBusyRotating()
		);
	}
	static SwitchSelectedRing() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		if (e?.CurControllerEntityComp) {
			var t,
				n = e.CurControllerEntityComp.GetRingsNum();
			for (let r = 0; r < n; r++)
				if (e.CurControllerEntityComp.IsRingSelectedByIndex(r))
					return (
						(t = r + 1 >= n ? 0 : r + 1), void this.SelectRingByIndex(t, !0)
					);
			this.SelectRingByIndex(0, !0);
		}
	}
	static SelectRingByIndex(e, t) {
		var n = ModelManager_1.ModelManager.TurntableControlModel;
		n?.CurControllerEntityComp &&
			(t
				? (n.CurControllerEntityComp.DeselectAllRings(!1),
					n.CurControllerEntityComp.SelectRingByIndex(e, !1),
					n.CurControllerEntityComp.UpdateAllRingsSelectedEffect())
				: n.CurControllerEntityComp.SelectRingByIndex(e, !0));
	}
	static DeselectRingByIndex(e) {
		var t = ModelManager_1.ModelManager.TurntableControlModel;
		t?.CurControllerEntityComp &&
			t.CurControllerEntityComp.DeselectRingByIndex(e, !0);
	}
	static ResetRingsAngle() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		e?.CurControllerEntityComp &&
			e.CurControllerEntityComp.TriggerResetAllRingsToInitAngle();
	}
	static GetControlType() {
		var e = ModelManager_1.ModelManager.TurntableControlModel;
		if (e?.CurControllerEntityComp)
			return e.CurControllerEntityComp.GetControlType();
	}
}
(exports.TurntableControlController = TurntableControlController),
	((_a = TurntableControlController).wwn = () => {
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"SceneItem",
				40,
				"[TurntableControlView] 激活UI相机Seq失败，关闭UI",
			),
			UiManager_1.UiManager.IsViewOpen("TurntableControlView") &&
				UiManager_1.UiManager.CloseView("TurntableControlView");
	}),
	(TurntableControlController.Fwe = (e, t) => {
		1298716444 === e &&
			t &&
			(_a.HandleTurntableControlViewClose(),
			UiManager_1.UiManager.CloseView("TurntableControlView"));
	});
