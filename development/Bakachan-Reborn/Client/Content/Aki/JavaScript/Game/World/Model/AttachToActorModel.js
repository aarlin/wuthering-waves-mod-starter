"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AttachToActorModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	GlobalData_1 = require("../../GlobalData"),
	AttachActorDefine_1 = require("../Define/AttachActorDefine");
class AttachToActorModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ShowLog = !0),
			(this.yPn = new Map()),
			(this.IPn = new Map()),
			(this.tqn = 0);
	}
	OnInit() {
		return (this.ShowLog = GlobalData_1.GlobalData.IsPlayInEditor), !0;
	}
	AddEntityActor(t, e, o, r, a) {
		let c = this.yPn.get(t);
		c || ((c = new AttachActorDefine_1.AttachActorEntry()), this.yPn.set(t, c));
		var n = ++this.tqn;
		return c.AddAttachActorItem(n, t, e, o, r, a)
			? (this.ShowLog &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Entity",
						3,
						"AttachActor: 添加Attach数据",
						["AttachId", n],
						["ActorName", e.GetName()],
						["EntityId", t],
						["ParentActorName", o.GetName()],
						["Reason", r],
					),
				this.IPn.set(e, t),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Entity",
						3,
						"AttachActor: 重复AttachActor",
						["EntityId", t],
						["AttachId", n],
						["ActorName", e.GetName()],
						["Reason", r],
					),
				!1);
	}
	RemoveEntityActor(t, e, o) {
		var r,
			a = this.yPn.get(t);
		return (
			!!a &&
			(this.ShowLog &&
				(r = a.GetAttachActorItem(e)) &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Entity",
					3,
					"AttachActor: 删除Attach数据",
					["AttachId", r.Id],
					["ActorName", r.Name],
					["EntityId", r.EntityId],
					["ParentActorName", r.ParentActorName],
					["AttachReason", r.Reason],
					["Reason", o],
				),
			!!a.RemoveAttachActorItem(e)) &&
			(a.Size() || this.yPn.delete(t), this.IPn.delete(e), !0)
		);
	}
	GetEntityIdByActor(t) {
		return this.IPn.get(t) ?? 0;
	}
	GetAttachActorEntry(t) {
		return this.yPn.get(t);
	}
	GetAttachActorItem(t, e) {
		if ((t = this.yPn.get(t))) return t.GetAttachActorItem(e);
	}
	ClearActorsByEntity(t) {
		if ((t = this.yPn.get(t))) {
			for (const e of t.GetAttachActorItems())
				e.Actor?.IsValid() && this.IPn.delete(e.Actor),
					this.ShowLog &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Entity",
							3,
							"AttachActor: 删除Attach数据",
							["AttachId", e.Id],
							["ActorName", e.Name],
							["EntityId", e.EntityId],
							["ParentActorName", e.ParentActorName],
							["AttachReason", e.Reason],
						);
			t.Clear();
		}
	}
	ClearEntityActor(t) {
		for (var [, e] of this.yPn) {
			if (this.ShowLog)
				for (const o of e.GetAttachActorItems())
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Entity",
							3,
							"AttachActor: 删除Attach数据",
							["AttachId", o.Id],
							["ActorName", o.Name],
							["EntityId", o.EntityId],
							["ParentActorName", o.ParentActorName],
							["AttachReason", o.Reason],
							["Reason", t],
						);
			e.Clear();
		}
		this.yPn.clear(), this.IPn.clear();
	}
	OnLeaveLevel() {
		return this.ClearEntityActor("AttachToActorModel.OnLeaveLevel"), !0;
	}
}
exports.AttachToActorModel = AttachToActorModel;
