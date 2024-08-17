"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController");
class TrackController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnEnterNearbyTrackRange,
				this.vDo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
				this.MDo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveNearbyTrack,
				this.MDo,
			),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnEnterNearbyTrackRange,
				this.vDo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
				this.MDo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveNearbyTrack,
				this.MDo,
			),
			!0
		);
	}
	static StartTrack(e, t = !0) {
		return (
			!!e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Track",
					50,
					"开始追踪:",
					["追踪类型:", e.TrackSource],
					["追踪Id:", e.Id],
					["追踪目标:", e.TrackTarget],
				),
			(e.IsSubTrack = t),
			ModelManager_1.ModelManager.TrackModel.AddTrackData(e),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMark, e),
			!0)
		);
	}
	static EndTrack(e, t) {
		var r = ModelManager_1.ModelManager.TrackModel.GetTrackData(e, t);
		return (
			!!r &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Track",
					50,
					"取消追踪:",
					["追踪类型:", r.TrackSource],
					["追踪Id:", r.Id],
					["追踪目标:", r.TrackTarget],
				),
			ModelManager_1.ModelManager.TrackModel.RemoveTrackData(e, t),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnTrackMark, r),
			!0)
		);
	}
	static SetTrackMarkOccupied(e, t, r) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.SetTrackMarkOccupied,
			e,
			t,
			r,
		);
	}
}
((exports.TrackController = TrackController).vDo = (e) => {
	if (e) {
		var t = e.GetComponent(144);
		if (t?.Valid) {
			var r = e.GetComponent(1).CreatureData.GetPbEntityInitData(),
				a =
					((r = (0, IComponent_1.getComponent)(
						r.ComponentsData,
						"InteractComponent",
					)),
					e.GetComponent(177));
			if (!a || !a.HasTag(1196894179)) {
				let a = 3;
				r && (a = r.Range / 100),
					TrackController.StartTrack({
						TrackSource: 3,
						Id: e.Id,
						IconPath: t?.IconPath ?? "",
						TrackHideDis: a,
						TrackTarget:
							CharacterController_1.CharacterController.GetActorByEntity(e),
						TrackType: t.TrackType,
						Offset: t.IconOffset,
						IsSubTrack: !1,
					});
			}
		}
	}
}),
	(TrackController.MDo = (e) => {
		TrackController.EndTrack(3, e.Id);
	});
