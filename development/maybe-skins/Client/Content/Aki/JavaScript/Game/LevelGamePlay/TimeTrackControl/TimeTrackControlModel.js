"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeTrackControlModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	ModelManager_1 = require("../../Manager/ModelManager");
class TimeTrackControlModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.zxe = void 0),
			(this.Zxe = void 0),
			(this.ewe = void 0),
			(this.twe = 0),
			(this.iwe = 0),
			(this.owe = !1),
			(this.rwe = 0),
			(this.Zxn = 0),
			(this.nwe = void 0),
			(this.swe = void 0);
	}
	get CreatureDataId() {
		return this.twe;
	}
	get ControlPoint() {
		return this.iwe;
	}
	get CanUpdated() {
		return this.owe;
	}
	set CanUpdated(e) {
		this.owe = e;
	}
	get RefEntityId() {
		return this.rwe;
	}
	set RefEntityId(e) {
		this.rwe = e;
	}
	get RefTrueEntityId() {
		return this.Zxn;
	}
	set RefTrueEntityId(e) {
		this.Zxn = e;
	}
	get ControllerEntity() {
		return this.zxe;
	}
	SetCurrentTimeTrackControl(e, t) {
		(this.zxe = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)),
			(this.Zxe = t),
			(e = this.zxe?.Entity.GetComponent(0)),
			(this.twe = e?.GetCreatureDataId() ?? 0),
			this.awe(),
			(this.owe = !0);
	}
	awe() {
		var e;
		this.zxe &&
			void 0 !== this.Zxe &&
			(e = this.zxe.Entity.GetComponent(118)) &&
			(this.ewe = e.GetTimeTrackControlConfig(this.Zxe));
	}
	GetConfigStatesCounts() {
		if (this.ewe)
			for (const e of this.ewe.ControlConfigs) return e.ControlPoints?.length;
		return 0;
	}
	GetConfigSegmentTime() {
		return this.ewe ? this.ewe.SegmentTime ?? 0.5 : 0.5;
	}
	InitControlInfo(e) {
		(this.iwe = e.GCs), (this.nwe = e.Wxs), this.UpdatePointsUsable();
	}
	UpdateControlInfo(e) {
		(this.iwe = e), this.UpdatePointsUsable();
	}
	UpdatePointsUsable() {
		var e = this.GetConfigStatesCounts();
		if (e) {
			this.swe ? this.swe.fill(!1) : (this.swe = new Array(e).fill(!1));
			var t = this.nwe[this.iwe];
			this.swe[this.iwe] = (t.Hxs || t.jxs) ?? !1;
			for (let e = this.iwe - 1; 0 <= e; e--)
				t.Hxs && this.swe[e + 1]
					? (this.swe[e] = this.nwe[e + 1].Hxs ?? !1)
					: (this.swe[e] = !1);
			for (let s = this.iwe + 1; s < e; s++)
				t.jxs && this.swe[s - 1]
					? (this.swe[s] = this.nwe[s - 1].jxs ?? !1)
					: (this.swe[s] = !1);
		}
	}
	IsControlPointUsable(e) {
		return !(!this.swe?.length || e > this.swe.length - 1) && this.swe[e];
	}
}
exports.TimeTrackControlModel = TimeTrackControlModel;
