"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackboardController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CombatDebugController_1 = require("../../Utils/CombatDebugController"),
	BlackboardMap_1 = require("../Define/BlackboardMap");
class BlackboardController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			Net_1.Net.Register(2169, BlackboardController.vgr),
			Net_1.Net.Register(12273, BlackboardController.Mgr),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
				this.Sgr,
			),
			!0
		);
	}
	static OnClear() {
		return (
			Net_1.Net.UnRegister(2169),
			Net_1.Net.UnRegister(12273),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
				this.Sgr,
			),
			!0
		);
	}
	static Egr(o) {
		var a = Protocol_1.Aki.Protocol.GKn.create();
		(a.xFn = o), Net_1.Net.Call(10758, a, (o) => {});
	}
	static ygr(o, a) {
		var e;
		this.Igr() &&
			(((e = Protocol_1.Aki.Protocol.NKn.create()).rkn =
				MathUtils_1.MathUtils.NumberToLong(o)),
			(e.xFn = a),
			this.PushBlackboardParam(o, a));
	}
	static PushBlackboardParam(o, a) {
		let e = this.PendingBlackboardParams.get(o);
		e = e || new Map();
		for (const t of a)
			ConfigManager_1.ConfigManager.AiConfig.CheckBlackboardWhiteList(t.Ckn) &&
				(CombatDebugController_1.CombatDebugController.CombatDebug(
					"Ai",
					o,
					"请求修改黑板值",
					["k", t.Ckn],
					["v", t[t.gkn]],
				),
				e.set(t.Ckn, t));
		0 < e.size && this.PendingBlackboardParams.set(o, e);
	}
	static GetIntValueByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetIntValueByWorld(o);
	}
	static SetIntValueByWorld(o, a) {
		var e;
		ModelManager_1.ModelManager.BlackboardModel.SetIntValueByWorld(o, a),
			this.Igr() &&
				(((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int),
				(e.Ckn = o),
				(e.Z3n = a),
				(o = new Array()).push(e),
				this.Egr(o));
	}
	static GetIntValuesByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetIntValuesByWorld(o);
	}
	static SetIntValuesByWorld(o, a) {
		var e;
		ModelManager_1.ModelManager.BlackboardModel.SetIntValuesByWorld(o, a),
			this.Igr() &&
				(((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray),
				(e.Ckn = o),
				(e.D7n = Protocol_1.Aki.Protocol.c2s.create()),
				(e.D7n.A7n = a),
				(o = new Array()).push(e),
				this.Egr(o));
	}
	static GetLongValueByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetLongValueByWorld(o);
	}
	static SetLongValueByWorld(o, a) {
		var e;
		ModelManager_1.ModelManager.BlackboardModel.SetLongValueByWorld(o, a),
			this.Igr() &&
				(((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long),
				(e.Ckn = o),
				(e.U7n = MathUtils_1.MathUtils.BigIntToLong(a)),
				(o = new Array()).push(e),
				this.Egr(o));
	}
	static GetLongValuesByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetLongValuesByWorld(o);
	}
	static SetLongValuesByWorld(o, a) {
		if (
			(ModelManager_1.ModelManager.BlackboardModel.SetLongValuesByWorld(o, a),
			this.Igr())
		) {
			var e = Protocol_1.Aki.Protocol.l2s.create();
			(e.Ikn = Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray),
				(e.Ckn = o),
				(e.R7n = Protocol_1.Aki.Protocol.d2s.create()),
				(e.R7n.A7n = new Array(a.length));
			for (let o = 0; o < a.length; o++) {
				var t = MathUtils_1.MathUtils.BigIntToLong(a[o]);
				e.R7n.A7n[o] = t;
			}
			(o = new Array()).push(e), this.Egr(o);
		}
	}
	static GetBooleanValueByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetBooleanValueByWorld(
			o,
		);
	}
	static SetBooleanValueByWorld(o, a) {
		var e;
		ModelManager_1.ModelManager.BlackboardModel.SetBooleanValueByWorld(o, a),
			this.Igr() &&
				(((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean),
				(e.Ckn = o),
				(e.x7n = a),
				(o = new Array()).push(e),
				this.Egr(o));
	}
	static GetFloatValueByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetFloatValueByWorld(o);
	}
	static SetFloatValueByWorld(o, a) {
		var e;
		ModelManager_1.ModelManager.BlackboardModel.SetFloatValueByWorld(o, a),
			this.Igr() &&
				(((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float),
				(e.Ckn = o),
				(e.P7n = a),
				(o = new Array()).push(e),
				this.Egr(o));
	}
	static GetFloatValuesByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetFloatValuesByWorld(o);
	}
	static SetFloatValuesByWorld(o, a) {
		var e;
		ModelManager_1.ModelManager.BlackboardModel.SetFloatValuesByWorld(o, a),
			this.Igr() &&
				(((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray),
				(e.Ckn = o),
				(e.B7n = Protocol_1.Aki.Protocol.C2s.create()),
				(e.B7n.A7n = a),
				(o = new Array()).push(e),
				this.Egr(o));
	}
	static GetStringValueByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetStringValueByWorld(o);
	}
	static SetStringValueByWorld(o, a) {
		var e;
		ModelManager_1.ModelManager.BlackboardModel.SetStringValueByWorld(o, a),
			this.Igr() &&
				(((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String),
				(e.Ckn = o),
				(e.t4n = a),
				(o = new Array()).push(e),
				this.Egr(o));
	}
	static GetStringValuesByWorld(o) {
		return ModelManager_1.ModelManager.BlackboardModel.GetStringValuesByWorld(
			o,
		);
	}
	static SetStringValuesByWorld(o, a) {
		var e;
		ModelManager_1.ModelManager.BlackboardModel.SetStringValuesByWorld(o, a),
			this.Igr() &&
				(((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray),
				(e.Ckn = o),
				(e.w7n = Protocol_1.Aki.Protocol.m2s.create()),
				(e.w7n.A7n = a),
				(o = new Array()).push(e),
				this.Egr(o));
	}
	static RemoveValueByWorld(o) {
		var a;
		ModelManager_1.ModelManager.BlackboardModel.RemoveValueByWorld(o),
			this.Igr() &&
				(((a = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_None),
				(a.Ckn = o),
				(o = new Array()).push(a),
				this.Egr(o));
	}
	static SetWorldBlackboardsByProtocol(o) {
		if (void 0 !== o) for (const a of o) this.SetWorldBlackboardByProtocol(a);
	}
	static SetWorldBlackboardByProtocol(o) {
		void 0 !== o &&
			void 0 !== (o = BlackboardMap_1.BlackboardParam.CreateByProtocol(o)) &&
			ModelManager_1.ModelManager.BlackboardModel.SetValueByWorld(
				o.GetKey(),
				o,
			);
	}
	static GetIntValueByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetIntValueByEntity(
			o,
			a,
		);
	}
	static SetIntValueByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetIntValueByEntity(o, a, e),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Int),
			(o.Ckn = a),
			(o.Z3n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetIntValuesByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetIntValuesByEntity(
			o,
			a,
		);
	}
	static SetIntValuesByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetIntValuesByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_IntArray),
			(o.Ckn = a),
			(o.D7n = Protocol_1.Aki.Protocol.c2s.create()),
			(o.D7n.A7n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetLongValueByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetLongValueByEntity(
			o,
			a,
		);
	}
	static SetLongValueByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetLongValueByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Long),
			(o.Ckn = a),
			(o.U7n = MathUtils_1.MathUtils.BigIntToLong(e)),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetLongValuesByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetLongValuesByEntity(
			o,
			a,
		);
	}
	static SetLongValuesByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		if (
			t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetLongValuesByEntity(
				o,
				a,
				e,
			),
			this.Igr())
		) {
			var r = Protocol_1.Aki.Protocol.l2s.create();
			(r.Ikn = Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_LongArray),
				(r.Ckn = a),
				(r.R7n = Protocol_1.Aki.Protocol.d2s.create()),
				(r.R7n.A7n = new Array(e.length));
			for (let o = 0; o < e.length; o++) {
				var l = MathUtils_1.MathUtils.BigIntToLong(e[o]);
				r.R7n.A7n[o] = l;
			}
			(o = t.GetCreatureDataId()), (a = new Array()).push(r), this.ygr(o, a);
		}
	}
	static GetBooleanValueByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetBooleanValueByEntity(
			o,
			a,
		);
	}
	static SetBooleanValueByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetBooleanValueByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Boolean),
			(o.Ckn = a),
			(o.x7n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetFloatValueByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetFloatValueByEntity(
			o,
			a,
		);
	}
	static SetFloatValueByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetFloatValueByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Float),
			(o.Ckn = a),
			(o.P7n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetFloatValuesByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetFloatValuesByEntity(
			o,
			a,
		);
	}
	static SetFloatValuesByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetFloatValuesByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_FloatArray),
			(o.Ckn = a),
			(o.B7n = Protocol_1.Aki.Protocol.C2s.create()),
			(o.B7n.A7n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetStringValueByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetStringValueByEntity(
			o,
			a,
		);
	}
	static SetStringValueByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetStringValueByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_String),
			(o.Ckn = a),
			(o.t4n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetStringValuesByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetStringValuesByEntity(
			o,
			a,
		);
	}
	static SetStringValuesByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetStringValuesByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_StringArray),
			(o.Ckn = a),
			(o.w7n = Protocol_1.Aki.Protocol.m2s.create()),
			(o.w7n.A7n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetVectorValueByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetVectorValueByEntity(
			o,
			a,
		);
	}
	static SetVectorValueByGlobal(o, a, e, t) {
		ModelManager_1.ModelManager.BlackboardModel.SetVectorValueByWorld(
			o,
			a,
			e,
			t,
		);
	}
	static SetVectorValueByEntity(o, a, e, t, r) {
		var l =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		l &&
			(ModelManager_1.ModelManager.BlackboardModel.SetVectorValueByEntity(
				o,
				a,
				e,
				t,
				r,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Vector),
			(o.Ckn = a),
			(o.b7n = Protocol_1.Aki.Protocol.VBs.create()),
			(o.b7n.X = e),
			(o.b7n.Y = t),
			(o.b7n.Z = r),
			(a = l.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetVectorValuesByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetVectorValuesByEntity(
			o,
			a,
		);
	}
	static SetVectorValuesByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetVectorValuesByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_VectorArray),
			(o.Ckn = a),
			(o.q7n = Protocol_1.Aki.Protocol.g2s.create()),
			(o.q7n.A7n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetRotatorValueByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetRotatorValueByEntity(
			o,
			a,
		);
	}
	static SetRotatorValueByEntity(o, a, e, t, r) {
		var l =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		l &&
			(ModelManager_1.ModelManager.BlackboardModel.SetRotatorValueByEntity(
				o,
				a,
				e,
				t,
				r,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Rotator),
			(o.Ckn = a),
			(o.G7n = Protocol_1.Aki.Protocol.iws.create()),
			(o.G7n.Pitch = e),
			(o.G7n.Roll = t),
			(o.G7n.Yaw = r),
			(a = l.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetRotatorValuesByEntity(o, a) {
		return ModelManager_1.ModelManager.BlackboardModel.GetRotatorValuesByEntity(
			o,
			a,
		);
	}
	static SetRotatorValuesByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		t &&
			(ModelManager_1.ModelManager.BlackboardModel.SetRotatorValuesByEntity(
				o,
				a,
				e,
			),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_RotatorArray),
			(o.Ckn = a),
			(o.O7n = Protocol_1.Aki.Protocol.f2s.create()),
			(o.O7n.A7n = e),
			(a = t.GetCreatureDataId()),
			(e = new Array()).push(o),
			this.ygr(a, e));
	}
	static GetEntityIdByEntity(o, a) {
		if (
			(o = ModelManager_1.ModelManager.BlackboardModel.GetEntityIdByEntity(
				o,
				a,
			))
		)
			return ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Id ?? 0;
	}
	static SetEntityIdByEntity(o, a, e) {
		(e =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(
				e,
			)) &&
			((e = e.GetCreatureDataId()),
			ModelManager_1.ModelManager.BlackboardModel.SetEntityIdByEntity(o, a, e),
			this.Igr()) &&
			(((o = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_Entity),
			(o.Ckn = a),
			(o.U7n = MathUtils_1.MathUtils.NumberToLong(e)),
			(a = new Array()).push(o),
			this.ygr(e, a));
	}
	static GetEntityIdsByEntity(o, a) {
		if (
			(o = ModelManager_1.ModelManager.BlackboardModel.GetEntityIdsByEntity(
				o,
				a,
			))
		) {
			var e = new Array();
			for (const a of o)
				e.push(ModelManager_1.ModelManager.CreatureModel.GetEntity(a)?.Id ?? 0);
			return e;
		}
	}
	static SetEntityIdsByEntity(o, a, e) {
		var t =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		if (t) {
			var r = new Array();
			for (const o of e)
				r.push(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(o));
			if (
				(ModelManager_1.ModelManager.BlackboardModel.SetEntityIdsByEntity(
					o,
					a,
					r,
				),
				this.Igr())
			) {
				var l = Protocol_1.Aki.Protocol.l2s.create();
				(l.Ikn =
					Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_EntityArray),
					(l.Ckn = a),
					(l.R7n = Protocol_1.Aki.Protocol.d2s.create()),
					(l.R7n.A7n = new Array(e.length));
				for (let o = 0; o < r.length; o++) {
					var n = MathUtils_1.MathUtils.NumberToLong(r[o]);
					l.R7n.A7n[o] = n;
				}
				(o = t.GetCreatureDataId()), (a = new Array()).push(l), this.ygr(o, a);
			}
		}
	}
	static RemoveValueByEntity(o, a) {
		var e;
		(o =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(
				o,
			)) &&
			(o.RemoveBlackboard(a) || this.Igr()) &&
			((o = o.GetCreatureDataId()),
			((e = Protocol_1.Aki.Protocol.l2s.create()).Ikn =
				Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_None),
			(e.Ckn = a),
			(a = new Array()).push(e),
			this.ygr(o, a));
	}
	static HasValueByEntity(o, a) {
		return (
			!!(o =
				ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(
					o,
				)) && o.GetBlackboard().HasValue(a)
		);
	}
	static ClearValuesByEntity(o, a) {
		var e =
			ModelManager_1.ModelManager.BlackboardModel.GetCreatureDataComponent(o);
		if (e) {
			if (((e = e.GetBlackboard()), this.Igr())) {
				var t = new Array();
				for (const o of e.BlackboardMap.keys()) {
					var r = Protocol_1.Aki.Protocol.l2s.create();
					(r.Ikn = Protocol_1.Aki.Protocol.u2s.Proto_BlackboardParamType_None),
						(r.Ckn = o),
						t.push(r);
				}
				0 < t.length &&
					((o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(o)),
					this.ygr(o, t));
			}
			e.Clear();
		}
	}
	static Igr() {
		return GlobalData_1.GlobalData.Networking();
	}
}
((exports.BlackboardController = BlackboardController).Sgr = (o) => {
	ModelManager_1.ModelManager.BlackboardModel.RemoveCreatureDataComponent(o);
}),
	(BlackboardController.vgr = (o) => {
		BlackboardController.SetWorldBlackboardsByProtocol(o.xFn);
	}),
	(BlackboardController.PendingBlackboardParams = new Map()),
	(BlackboardController.Mgr = (o) => {
		var a = MathUtils_1.MathUtils.LongToNumber(o.rkn),
			e = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
		e
			? e.Entity.GetComponent(0).SetBlackboardsByProtocol(o.xFn)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[CreatureController.EntityBlackboardNotify] 不存在实体数据CreatureData。",
					["CreatureDataId", a],
				);
	});
