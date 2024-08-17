"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackedMarksView = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	MarkItemUtil_1 = require("../../Map/Marks/MarkItemUtil"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView"),
	TrackedMark_1 = require("./TrackedMark_New");
class TrackedMarksView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.Sct = new Map()),
			(this.Kdt = !1),
			(this.Qdt = (e) => {
				if (
					MarkItemUtil_1.MarkItemUtil.IsTrackPointedMarkInCurrentDungeon(
						e,
						!0,
					) &&
					!MarkItemUtil_1.MarkItemUtil.IsHideTrackInView(e)
				) {
					let r = this.Sct.get(e.TrackSource);
					var t;
					r || ((r = new Map()), this.Sct.set(e.TrackSource, r)),
						r.has(e.Id) ||
							((t = new TrackedMark_1.TrackedMark(e)),
							r.set(e.Id, t),
							t.Initialize("UiItem_Mark_Prefab", this.RootItem)),
						(this.Kdt = !0);
				}
			}),
			(this.Xdt = (e) => {
				var t,
					r = this.Sct.get(e.TrackSource);
				r &&
					((t = r.get(e.Id)) && (t.Destroy(), r.delete(e.Id)), (this.Kdt = !0));
			}),
			(this.$dt = (e, t, r) => {
				(e = this.Sct.get(e)) && (e = e.get(t)) && e.UpdateTrackTarget(r);
			}),
			(this.Ydt = (e, t, r) => {
				(e = this.Sct.get(e)) && (e = e.get(t)) && e.SetVisibleByOccupied(r);
			});
	}
	Initialize(e) {
		super.Initialize(e), this.uje();
	}
	Reset() {
		super.Reset(), this.Lct();
		for (const e of this.Sct.values()) for (const t of e.values()) t.Destroy();
		this.Sct.clear();
	}
	OnShowBattleChildViewPanel() {
		for (const e of this.Sct.values()) for (const t of e.values()) t.OnUiShow();
	}
	Update(e) {
		ModelManager_1.ModelManager.TrackModel.ClearGroupMinDistance();
		for (const e of this.Sct.values())
			for (const t of e.values()) t.UpdateTrackDistance();
		for (var [t, r] of this.Sct)
			for (const a of r.values())
				this.Kdt &&
					(this.IsTrackTargetRepeat(a, t)
						? (a.ShouldShowTrackMark = !1)
						: (a.ShouldShowTrackMark = !0)),
					a.Update(e);
		this.Kdt = !1;
	}
	IsTrackTargetRepeat(e, t) {
		for (var [r, a] of this.Sct)
			for (const s of a.values())
				if (e.TrackTarget === s.TrackTarget && t < r) return !0;
		return !1;
	}
	OnHideBattleChildViewPanel() {
		for (const e of this.Sct.values()) for (const t of e.values()) t.OnUiHide();
	}
	uje() {
		EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.Qdt),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UnTrackMark,
				this.Xdt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdateTrackTarget,
				this.$dt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SetTrackMarkOccupied,
				this.Ydt,
			);
	}
	Lct() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.TrackMark,
			this.Qdt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UnTrackMark,
				this.Xdt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdateTrackTarget,
				this.$dt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SetTrackMarkOccupied,
				this.Ydt,
			);
	}
	DestroyOverride() {
		return !0;
	}
}
(exports.TrackedMarksView = TrackedMarksView).ght = void 0;
