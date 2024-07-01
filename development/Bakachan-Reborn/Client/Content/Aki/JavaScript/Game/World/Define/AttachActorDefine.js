"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AttachActorEntry = exports.AttachActorItem = void 0);
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	GlobalData_1 = require("../../GlobalData"),
	CustomMap_1 = require("./CustomMap");
class AttachActorItem {
	constructor() {
		(this.Id = 0),
			(this.EntityId = 0),
			(this.Reason = void 0),
			(this.Actor = void 0),
			(this.Name = void 0),
			(this.ParentActorName = void 0),
			(this.DetachType = void 0);
	}
}
exports.AttachActorItem = AttachActorItem;
class AttachActorEntry {
	constructor() {
		(this.SPn = 0),
			(this.EPn = new Map()),
			(this.wQe = new CustomMap_1.CustomMap());
	}
	AddAttachActorItem(t, e, a, r, s, i) {
		if (this.EPn.has(a)) return !1;
		this.EPn.set(a, ++this.SPn);
		var o = new AttachActorItem();
		return (
			(o.Id = t),
			(o.EntityId = e),
			(o.Reason = s),
			(o.Actor = a),
			(o.Name = a.GetName()),
			(o.ParentActorName = r.GetName()),
			(o.DetachType = i),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				a.Tags.Add(FNameUtil_1.FNameUtil.GetDynamicFName("AttachId: " + t)),
			this.wQe.Set(this.SPn, o),
			!0
		);
	}
	GetAttachActorItem(t) {
		if ((t = this.EPn.get(t))) return this.wQe.Get(t);
	}
	GetAttachActorItems() {
		return this.wQe.GetItems();
	}
	Size() {
		return this.EPn.size;
	}
	RemoveAttachActorItem(t) {
		var e = this.EPn.get(t);
		return !!e && this.EPn.delete(t) && this.wQe.Remove(e);
	}
	Clear() {
		(this.SPn = 0), this.EPn.clear(), this.wQe.Clear();
	}
}
exports.AttachActorEntry = AttachActorEntry;
