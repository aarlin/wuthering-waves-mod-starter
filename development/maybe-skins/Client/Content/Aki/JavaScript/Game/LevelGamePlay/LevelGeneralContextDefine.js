"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeneralLogicTreeContext =
		exports.PlotContext =
		exports.GmLevelActionContext =
		exports.GuaranteeContext =
		exports.TriggerContext =
		exports.InstanceDungeonContext =
		exports.LevelPlayContext =
		exports.QuestContext =
		exports.EntityContext =
		exports.GeneralContext =
			void 0);
class GeneralContext {
	constructor() {
		(this.Type = void 0), (this.SubType = void 0), (this.DUe = !1);
	}
	Reset() {
		this.SubType = void 0;
	}
	static GetObj(e, t, n) {
		let r,
			o = GeneralContext.RUe.get(e);
		return (
			o || ((o = []), GeneralContext.RUe.set(e, o)),
			0 < o.length ? ((r = o.pop()).DUe = !1) : (r = new n()),
			(r.SubType = t),
			r
		);
	}
	Release() {
		if ((this.Reset(), !this.DUe)) {
			let e = GeneralContext.RUe.get(this.Type);
			e || ((e = []), GeneralContext.RUe.set(this.Type, e)),
				e.push(this),
				(this.DUe = !0);
		}
	}
	static Copy(e) {
		if (e) {
			let t;
			switch (e.Type) {
				case 2:
					t = QuestContext.Create(e.QuestId, e.SubType);
					break;
				case 3:
					t = LevelPlayContext.Create(e.LevelPlayId, e.SubType);
					break;
				case 1:
					t = EntityContext.Create(e.EntityId, e.SubType);
					break;
				case 4:
					t = InstanceDungeonContext.Create(e.InstanceDungeonId, e.SubType);
					break;
				case 5:
					t = TriggerContext.Create(
						e.TriggerEntityId,
						e.OtherEntityId,
						e.SubType,
					);
					break;
				case 6:
					t = GeneralLogicTreeContext.Create(
						e.BtType,
						e.TreeIncId,
						e.TreeConfigId,
						e.NodeId,
						e.SubType,
					);
					break;
				case 7:
					t = TriggerContext.Create(e.SubType);
			}
			return t;
		}
	}
}
(exports.GeneralContext = GeneralContext).RUe = new Map();
class EntityContext extends GeneralContext {
	constructor() {
		super(), (this.EntityId = 0), (this.Type = 1);
	}
	Reset() {
		this.EntityId = 0;
	}
	static Create(e = 0, t) {
		return ((t = GeneralContext.GetObj(1, t, EntityContext)).EntityId = e), t;
	}
}
exports.EntityContext = EntityContext;
class QuestContext extends GeneralContext {
	constructor() {
		super(), (this.QuestId = 0), (this.Type = 2);
	}
	Reset() {
		this.QuestId = 0;
	}
	static Create(e = 0, t) {
		return ((t = GeneralContext.GetObj(2, t, QuestContext)).QuestId = e), t;
	}
}
exports.QuestContext = QuestContext;
class LevelPlayContext extends GeneralContext {
	constructor() {
		super(), (this.LevelPlayId = 0), (this.Type = 3);
	}
	Reset() {
		this.LevelPlayId = 0;
	}
	static Create(e = 0, t) {
		return (
			((t = GeneralContext.GetObj(3, t, LevelPlayContext)).LevelPlayId = e), t
		);
	}
}
exports.LevelPlayContext = LevelPlayContext;
class InstanceDungeonContext extends GeneralContext {
	constructor() {
		super(), (this.InstanceDungeonId = 0), (this.Type = 4);
	}
	Reset() {
		this.InstanceDungeonId = 0;
	}
	static Create(e = 0, t, n) {
		return (
			((n = GeneralContext.GetObj(
				4,
				n,
				InstanceDungeonContext,
			)).InstanceDungeonId = e),
			n
		);
	}
}
exports.InstanceDungeonContext = InstanceDungeonContext;
class TriggerContext extends GeneralContext {
	constructor() {
		super(),
			(this.TriggerEntityId = 0),
			(this.OtherEntityId = 0),
			(this.Type = 5);
	}
	static Create(e = 0, t = 0, n) {
		return (
			((n = GeneralContext.GetObj(5, n, TriggerContext)).TriggerEntityId = e),
			(n.OtherEntityId = t),
			n
		);
	}
}
exports.TriggerContext = TriggerContext;
class GuaranteeContext extends GeneralContext {
	constructor() {
		super(), (this.Type = 7);
	}
	static Create(e) {
		return GeneralContext.GetObj(7, e, GuaranteeContext);
	}
}
exports.GuaranteeContext = GuaranteeContext;
class GmLevelActionContext extends GeneralContext {
	constructor() {
		super(), (this.Type = 8);
	}
	Reset() {}
	static Create(e) {
		return GeneralContext.GetObj(8, e, GmLevelActionContext);
	}
}
exports.GmLevelActionContext = GmLevelActionContext;
class PlotContext extends GeneralContext {
	constructor() {
		super(), (this.FlowIncId = 0), (this.Type = 9);
	}
	Reset() {
		this.FlowIncId = 0;
	}
	static Create(e, t) {
		return ((t = GeneralContext.GetObj(8, t, PlotContext)).FlowIncId = e), t;
	}
}
exports.PlotContext = PlotContext;
class GeneralLogicTreeContext extends GeneralContext {
	constructor() {
		super(),
			(this.TreeIncId = void 0),
			(this.TreeConfigId = 0),
			(this.NodeId = 0),
			(this.BtType = void 0),
			(this.Type = 6);
	}
	Reset() {
		(this.TreeIncId = BigInt(0)), (this.NodeId = 0);
	}
	static Create(e, t = BigInt(0), n = 0, r = 0, o) {
		return (
			((o = GeneralContext.GetObj(6, o, GeneralLogicTreeContext)).BtType = e),
			(o.TreeIncId = t),
			(o.TreeConfigId = n),
			(o.NodeId = r),
			o
		);
	}
}
exports.GeneralLogicTreeContext = GeneralLogicTreeContext;
