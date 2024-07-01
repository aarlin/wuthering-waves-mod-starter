"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	GlobalData_1 = require("../../../../GlobalData"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
	PROFILE_KEY = "TsTaskNpcFindFleePosition_GetNoTargetDirectionList",
	CHECK_DEGREE_ADDITION = 15;
class TsTaskNpcFindFleePosition extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.SearchRange = 0),
			(this.BlackboardKey = ""),
			(this.TempEnemyList = void 0),
			(this.TraceElement = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsSearchRange = 0),
			(this.TsBlackboardKey = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsSearchRange = this.SearchRange),
			(this.TsBlackboardKey = this.BlackboardKey));
	}
	ReceiveExecuteAI(e, t) {
		if ((this.InitTsVariables(), e instanceof TsAiController_1.default)) {
			this.TempEnemyList || (this.TempEnemyList = new Array()),
				(this.TempEnemyList.length = 0);
			const t = (e = e.AiController).CharActorComp;
			var r = t.Entity.Id,
				i = t.ActorLocationProxy,
				o =
					((e =
						(this.InitTraceElement(),
						e.AiPerception && this.FindEnemies(e.AiPerception),
						MathUtils_1.MathUtils.GetRandomFloatNumber(
							this.TsSearchRange / 2,
							this.TsSearchRange,
						))),
					this.GetNoTargetDirectionList(i, t));
			if (0 < o.length)
				(o = this.GetOptimalDirection(i, o).MultiplyEqual(e).AdditionEqual(i)),
					BlackboardController_1.BlackboardController.SetVectorValueByEntity(
						r,
						this.TsBlackboardKey,
						o.X,
						o.Y,
						o.Z,
					);
			else {
				if (!(0 < (o = this.TempEnemyList.length)))
					return void this.FinishExecute(!1);
				{
					o = Math.floor(MathUtils_1.MathUtils.GetRandomFloatNumber(0, o));
					const t = this.TempEnemyList[o]?.GetComponent(1);
					(o = Vector_1.Vector.Create(i).SubtractionEqual(
						t.ActorLocationProxy,
					)).Normalize(),
						(o = o.MultiplyEqual(e).AdditionEqual(i)),
						BlackboardController_1.BlackboardController.SetVectorValueByEntity(
							r,
							this.TsBlackboardKey,
							o.X,
							o.Y,
							o.Z,
						);
				}
			}
			this.FinishExecute(!0);
		} else this.FinishExecute(!1);
	}
	InitTraceElement() {
		this.TraceElement ||
			((this.TraceElement = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.TraceElement.bIsSingle = !0),
			(this.TraceElement.bIgnoreSelf = !0),
			this.TraceElement.SetTraceTypeQuery(
				QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
			)),
			(this.TraceElement.WorldContextObject = this.GetWorld());
	}
	FindEnemies(e) {
		for (const r of e.AllEnemies) {
			var t = EntitySystem_1.EntitySystem.Get(r);
			t && this.TempEnemyList.push(t);
		}
	}
	GetNoTargetDirectionList(e, t) {
		var r = new Array(),
			i = t.ActorForwardProxy,
			o =
				(TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.TraceElement,
					e,
				),
				MathUtils_1.PI_DEG_DOUBLE / 15);
		for (let t = 0; t < o; t++) {
			var a = 15 * t,
				s = Vector_1.Vector.Create();
			a =
				(i.RotateAngleAxis(a, Vector_1.Vector.UpVectorProxy, s),
				Vector_1.Vector.Create());
			((a =
				(s.Multiply(this.TsSearchRange, a),
				a.AdditionEqual(e),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.TraceElement,
					a,
				),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.TraceElement,
					PROFILE_KEY,
				))) &&
				this.TraceElement.HitResult.bBlockingHit) ||
				r.push(s);
		}
		return r;
	}
	GetOptimalDirection(e, t) {
		var r = this.TempEnemyList.length;
		if (0 === r) {
			return t[
				Math.floor(MathUtils_1.MathUtils.GetRandomFloatNumber(0, t.length))
			];
		}
		let i = 0,
			o = 0;
		for (let l = 0, n = t.length; l < n; l++) {
			var a = Vector_1.Vector.Create(t[l]).MultiplyEqual(this.TsSearchRange);
			a.AdditionEqual(e);
			let n = 0;
			for (let e = 0; e < r; e++) {
				var s = this.TempEnemyList[e]?.GetComponent(1);
				n < (s = Vector_1.Vector.Dist(s.ActorLocationProxy, a)) && (n = s);
			}
			n > o && ((o = n), (i = l));
		}
		return t[i];
	}
}
exports.default = TsTaskNpcFindFleePosition;
