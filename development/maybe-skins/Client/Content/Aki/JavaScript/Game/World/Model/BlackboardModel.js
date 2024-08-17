"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackboardModel = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	BlackboardMap_1 = require("../Define/BlackboardMap");
class BlackboardModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this._vr = new BlackboardMap_1.BlackboardMap()),
			(this.uvr = new BlackboardMap_1.BlackboardMap()),
			(this.cvr = new Map());
	}
	OnClear() {
		return this._vr.Clear(), this.uvr.Clear(), this.cvr.clear(), !0;
	}
	GetCreatureDataComponent(a) {
		if (!this.cvr.has(a)) {
			var t = EntitySystem_1.EntitySystem.Get(a);
			if (!t?.Valid) return;
			if (((t = t.GetComponent(0)), !t?.Valid)) return;
			this.cvr.set(a, t);
		}
		return this.cvr.get(a);
	}
	RemoveCreatureDataComponent(a) {
		this.cvr.has(a) && this.cvr.delete(a);
	}
	GetIntValueByGlobal(a) {
		return this._vr.GetValue(a)?.GetIntValue();
	}
	SetIntValueByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetIntValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int,
				)).SetIntValue(t),
				this._vr.SetValue(a, e));
	}
	GetIntValuesByGlobal(a) {
		return (a = this._vr.GetValue(a)) ? a.GetIntValues() : void 0;
	}
	SetIntValuesByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetIntValues(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray,
				)).SetIntValues(t),
				this._vr.SetValue(a, e));
	}
	GetLongValueByGlobal(a) {
		return this._vr.GetValue(a)?.GetLongValue();
	}
	SetLongValueByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetLongValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long,
				)).SetLongValue(t),
				this._vr.SetValue(a, e));
	}
	GetLongValuesByGlobal(a) {
		return (a = this._vr.GetValue(a)) ? a.GetLongValues() : void 0;
	}
	SetLongValuesByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetLongValues(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray,
				)).SetLongValues(t),
				this._vr.SetValue(a, e));
	}
	GetBooleanValueByGlobal(a) {
		return this._vr.GetValue(a)?.GetBooleanValue();
	}
	SetBooleanValueByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetBooleanValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean,
				)).SetBooleanValue(t),
				this._vr.SetValue(a, e));
	}
	GetFloatValueByGlobal(a) {
		return this._vr.GetValue(a)?.GetFloatValue();
	}
	SetFloatValueByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetFloatValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float,
				)).SetFloatValue(t),
				this._vr.SetValue(a, e));
	}
	GetFloatValuesByGlobal(a) {
		return (a = this._vr.GetValue(a)) ? a.GetFloatValues() : void 0;
	}
	SetFloatValuesByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetFloatValues(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray,
				)).SetFloatValues(t),
				this._vr.SetValue(a, e));
	}
	GetStringValueByGlobal(a) {
		return (a = this._vr.GetValue(a)) ? a.GetStringValue() : void 0;
	}
	SetStringValueByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetStringValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String,
				)).SetStringValue(t),
				this._vr.SetValue(a, e));
	}
	GetStringValuesByGlobal(a) {
		return (a = this._vr.GetValue(a)) ? a.GetStringValues() : void 0;
	}
	SetStringValuesByGlobal(a, t) {
		let e = this._vr.GetValue(a);
		e
			? e.SetStringValues(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray,
				)).SetStringValues(t),
				this._vr.SetValue(a, e));
	}
	SetValueByGlobal(a, t) {
		this._vr.SetValue(a, t);
	}
	RemoveValueByGlobal(a) {
		this._vr.RemoveValue(a);
	}
	SetWorldBlackboardByProtocol(a) {}
	GetIntValueByWorld(a) {
		return this.uvr.GetValue(a)?.GetIntValue();
	}
	SetIntValueByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetIntValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int,
				)).SetIntValue(t),
				this.uvr.SetValue(a, e));
	}
	GetIntValuesByWorld(a) {
		return (a = this.uvr.GetValue(a)) ? a.GetIntValues() : void 0;
	}
	SetIntValuesByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetIntValues(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray,
				)).SetIntValues(t),
				this.uvr.SetValue(a, e));
	}
	GetLongValueByWorld(a) {
		return this.uvr.GetValue(a)?.GetLongValue();
	}
	SetLongValueByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetLongValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long,
				)).SetLongValue(t),
				this.uvr.SetValue(a, e));
	}
	GetLongValuesByWorld(a) {
		return (a = this.uvr.GetValue(a)) ? a.GetLongValues() : void 0;
	}
	SetLongValuesByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetLongValues(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray,
				)).SetLongValues(t),
				this.uvr.SetValue(a, e));
	}
	GetBooleanValueByWorld(a) {
		return this.uvr.GetValue(a)?.GetBooleanValue();
	}
	SetBooleanValueByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetBooleanValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean,
				)).SetBooleanValue(t),
				this.uvr.SetValue(a, e));
	}
	GetFloatValueByWorld(a) {
		return this.uvr.GetValue(a)?.GetFloatValue();
	}
	SetFloatValueByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetFloatValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float,
				)).SetFloatValue(t),
				this.uvr.SetValue(a, e));
	}
	GetFloatValuesByWorld(a) {
		return (a = this.uvr.GetValue(a)) ? a.GetFloatValues() : void 0;
	}
	SetFloatValuesByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetFloatValues(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray,
				)).SetFloatValues(t),
				this.uvr.SetValue(a, e));
	}
	GetStringValueByWorld(a) {
		return (a = this.uvr.GetValue(a)) ? a.GetStringValue() : void 0;
	}
	SetStringValueByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetStringValue(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String,
				)).SetStringValue(t),
				this.uvr.SetValue(a, e));
	}
	GetStringValuesByWorld(a) {
		return (a = this.uvr.GetValue(a)) ? a.GetStringValues() : void 0;
	}
	SetStringValuesByWorld(a, t) {
		let e = this.uvr.GetValue(a);
		e
			? e.SetStringValues(t)
			: ((e = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray,
				)).SetStringValues(t),
				this.uvr.SetValue(a, e));
	}
	SetValueByWorld(a, t) {
		this.uvr.SetValue(a, t);
	}
	RemoveValueByWorld(a) {
		this.uvr.RemoveValue(a);
	}
	SetVectorValueByWorld(a, t, e, o) {
		let r = this.uvr.GetValue(a);
		r
			? r.SetVectorValue(t, e, o)
			: ((r = new BlackboardMap_1.BlackboardParam(
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector,
				)).SetVectorValue(t, e, o),
				this.uvr.SetValue(a, r));
	}
	GetVectorValueByWorld(a) {
		return this.uvr.GetValue(a)?.GetVectorValue();
	}
	GetIntValueByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetIntValue();
	}
	SetIntValueByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int,
					),
					o.SetIntValue(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int,
					)).SetIntValue(e),
					a.SetValue(t, o));
		}
	}
	GetIntValuesByEntity(a, t) {
		return (a =
			(a = this.GetCreatureDataComponent(a)) && a.GetBlackboard().GetValue(t))
			? a.GetIntValues()
			: void 0;
	}
	SetIntValuesByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray,
					),
					o.SetIntValues(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray,
					)).SetIntValues(e),
					a.SetValue(t, o));
		}
	}
	GetLongValueByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetLongValue();
	}
	SetLongValueByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long,
					),
					o.SetLongValue(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long,
					)).SetLongValue(e),
					a.SetValue(t, o));
		}
	}
	GetLongValuesByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetLongValues();
	}
	SetLongValuesByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray,
					),
					o.SetLongValues(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray,
					)).SetLongValues(e),
					a.SetValue(t, o));
		}
	}
	GetBooleanValueByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetBooleanValue();
	}
	SetBooleanValueByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean,
					),
					o.SetBooleanValue(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean,
					)).SetBooleanValue(e),
					a.SetValue(t, o));
		}
	}
	GetFloatValueByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetFloatValue();
	}
	SetFloatValueByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float,
					),
					o.SetFloatValue(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float,
					)).SetFloatValue(e),
					a.SetValue(t, o));
		}
	}
	GetFloatValuesByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetFloatValues();
	}
	SetFloatValuesByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray,
					),
					o.SetFloatValues(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray,
					)).SetFloatValues(e),
					a.SetValue(t, o));
		}
	}
	GetStringValueByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetStringValue();
	}
	SetStringValueByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String,
					),
					o.SetStringValue(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String,
					)).SetStringValue(e),
					a.SetValue(t, o));
		}
	}
	GetStringValuesByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetStringValues();
	}
	SetStringValuesByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray,
					),
					o.SetStringValues(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray,
					)).SetStringValues(e),
					a.SetValue(t, o));
		}
	}
	GetVectorValueByEntity(a, t) {
		return (a =
			(a = this.GetCreatureDataComponent(a)) && a.GetBlackboard().GetValue(t))
			? a.GetVectorValue()
			: void 0;
	}
	SetVectorValueByEntity(a, t, e, o, r) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let l = (a = a.GetBlackboard()).GetValue(t);
			l
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						l,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector,
					),
					l.SetVectorValue(e, o, r))
				: ((l = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector,
					)).SetVectorValue(e, o, r),
					a.SetValue(t, l));
		}
	}
	GetVectorValuesByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetVectorValues();
	}
	SetVectorValuesByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_VectorArray,
					),
					o.SetVectorValues(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_VectorArray,
					)).SetVectorValues(e),
					a.SetValue(t, o));
		}
	}
	GetRotatorValueByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetRotatorValue();
	}
	SetRotatorValueByEntity(a, t, e, o, r) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let l = (a = a.GetBlackboard()).GetValue(t);
			l
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						l,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Rotator,
					),
					l.SetRotatorValue(e, o, r))
				: ((l = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Rotator,
					)).SetRotatorValue(e, o, r),
					a.SetValue(t, l));
		}
	}
	GetRotatorValuesByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetRotatorValues();
	}
	SetRotatorValuesByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_RotatorArray,
					),
					o.SetRotatorValues(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_RotatorArray,
					)).SetRotatorValues(e),
					a.SetValue(t, o));
		}
	}
	GetEntityIdByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetIntValue();
	}
	SetEntityIdByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Entity,
					),
					o.SetIntValue(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Entity,
					)).SetIntValue(e),
					a.SetValue(t, o));
		}
	}
	GetEntityIdsByEntity(a, t) {
		if ((a = this.GetCreatureDataComponent(a)))
			return a.GetBlackboard().GetValue(t)?.GetIntValues();
	}
	SetEntityIdsByEntity(a, t, e) {
		if ((a = this.GetCreatureDataComponent(a))) {
			let o = (a = a.GetBlackboard()).GetValue(t);
			o
				? (BlackboardMap_1.BlackboardMap.CheckValueType(
						t,
						o,
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_EntityArray,
					),
					o.SetIntValues(e))
				: ((o = new BlackboardMap_1.BlackboardParam(
						Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_EntityArray,
					)).SetIntValues(e),
					a.SetValue(t, o));
		}
	}
	SetValueByEntity(a, t, e) {
		(a = this.GetCreatureDataComponent(a)) && a.SetBlackboard(t, e);
	}
}
exports.BlackboardModel = BlackboardModel;
