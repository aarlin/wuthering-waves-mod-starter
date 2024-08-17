"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SensoryInfoController = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class SensoryInfoController {
	constructor() {
		(this._A = 0),
			(this.SensoryInfoType = 0),
			(this.MaxSensoryRange = 0),
			(this.Xor = new Map());
	}
	Tick(o) {
		if (2 & this.SensoryInfoType)
			for (const e of this.Xor) e[1].CheckInRange() && e[1].Tick(o);
	}
	HandleEntities(o, e, t) {
		for (const o of this.Xor) o[1].ClearCacheList();
		for (const i of o) {
			var n = i.Id,
				r = i.Entity?.GetComponent(1);
			if (i && i.Entity?.Active && r && n !== t) {
				var s = Vector_1.Vector.Distance(r.ActorLocationProxy, e);
				for (const o of this.Xor)
					s > o[1].SensoryRange ||
						!o[1].CheckEntity(i.Entity) ||
						o[1].EnterRange(i.Entity);
			}
		}
		for (const o of this.Xor) o[1].ExitRange();
	}
	AddSensoryInfo(o) {
		(this.SensoryInfoType |= o.SensoryInfoType),
			(this.MaxSensoryRange = Math.max(this.MaxSensoryRange, o.SensoryRange));
		var e = ++this._A;
		return this.Xor.set(e, o), e;
	}
	RemoveSensoryInfo(o) {
		return (
			!!this.Xor.has(o) &&
			(this.Xor.delete(o), this.UpdateInfoType(), this.UpdateSensoryRange(), !0)
		);
	}
	UpdateInfoType() {
		this.SensoryInfoType = 0;
		for (const o of this.Xor) this.SensoryInfoType |= o[1].SensoryInfoType;
	}
	UpdateSensoryRange() {
		this.MaxSensoryRange = 0;
		for (const o of this.Xor)
			this.MaxSensoryRange = Math.max(this.MaxSensoryRange, o[1].SensoryRange);
	}
	Clear() {
		(this._A = 0), (this.SensoryInfoType = 0), (this.MaxSensoryRange = 0);
		for (const o of this.Xor) o[1].Clear();
		this.Xor.clear();
	}
}
exports.SensoryInfoController = SensoryInfoController;
