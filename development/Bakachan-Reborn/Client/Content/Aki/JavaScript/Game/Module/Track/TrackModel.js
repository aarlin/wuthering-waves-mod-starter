"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class TrackModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.SDo = void 0),
			(this.EDo = void 0),
			(this.yDo = void 0),
			(this.DefaultTrackHideDis = 0);
	}
	OnInit() {
		return (
			(this.SDo = new Map()),
			(this.EDo = new Map()),
			(this.yDo = new Map()),
			(this.DefaultTrackHideDis = parseInt(
				ConfigManager_1.ConfigManager.QuestNewConfig.GetGlobalConfig(
					"TrackMarkHideDis",
				),
			)),
			!0
		);
	}
	OnClear() {
		return (
			this.SDo && (this.SDo.clear(), (this.SDo = void 0)),
			this.EDo && (this.EDo.clear(), (this.EDo = void 0)),
			this.yDo && (this.yDo.clear(), (this.yDo = void 0)),
			!0
		);
	}
	OnLeaveLevel() {
		return !0;
	}
	AddTrackData(e) {
		let t = this.GetTracksByType(e.TrackSource);
		t || ((t = new Map()), this.SDo.set(e.TrackSource, t)),
			e.TrackHideDis || (e.TrackHideDis = this.DefaultTrackHideDis),
			t.set(e.Id, e),
			this.IDo(e);
	}
	RemoveTrackData(e, t) {
		var r;
		(e = this.GetTracksByType(e)) && ((r = e.get(t)), e.delete(t), this.TDo(r));
	}
	ClearTrackData() {
		this.SDo.clear(),
			this.EDo.clear(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearTrackMark);
	}
	IDo(e) {
		if (e && void 0 !== e.ShowGroupId) {
			let t = this.EDo.get(e.ShowGroupId);
			(t = t || new Map()).set(e.Id, e);
		}
	}
	TDo(e) {
		var t;
		e &&
			void 0 !== e.ShowGroupId &&
			(t = this.EDo.get(e.ShowGroupId)) &&
			t.delete(e.Id);
	}
	IsTargetTracking(e) {
		let t, r;
		for (var [a, o] of this.SDo)
			for (var [, i] of o)
				i.TrackTarget === e &&
					(t || ((t = a), (r = i)), a > t) &&
					((r = i), (t = a));
		return r;
	}
	GetTrackData(e, t) {
		if ((e = this.GetTracksByType(e))) return e.get(t);
	}
	UpdateTrackData(e, t, r) {
		var a = this.GetTrackData(e, t);
		a &&
			((a.TrackTarget = r),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UpdateTrackTarget,
				e,
				t,
				r,
			));
	}
	GetTracksByType(e) {
		return this.SDo.get(e);
	}
	IsTracking(e, t) {
		return (
			void 0 !== e &&
			void 0 !== t &&
			!!(e = this.GetTracksByType(e)) &&
			e.has(t)
		);
	}
	UpdateGroupMinDistance(e, t) {
		var r;
		this.yDo && e && (!(r = this.yDo.get(e)) || t <= r) && this.yDo.set(e, t);
	}
	CanShowInGroup(e, t) {
		return !this.yDo || !e || !(e = this.yDo.get(e)) || t <= e;
	}
	ClearGroupMinDistance() {
		this.yDo?.clear();
	}
}
exports.TrackModel = TrackModel;
