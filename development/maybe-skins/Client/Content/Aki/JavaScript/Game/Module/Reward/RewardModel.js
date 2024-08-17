"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardModel = void 0);
const UE = require("ue"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	GlobalData_1 = require("../../GlobalData"),
	CHECK_GROUND_PROFILE_KEY = "RewardModel_CheckGroundHit",
	CHECK_WATER_PROFILE_KEY = "RewardModel_CheckWaterHit";
class RewardModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.yso = void 0), (this.Iso = void 0);
	}
	koe() {
		(this.yso = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.yso.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.yso.bIsSingle = !0),
			(this.yso.bIgnoreSelf = !0),
			this.yso.AddObjectTypeQuery(
				QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
			),
			(this.Iso = UE.NewObject(UE.TraceLineElement.StaticClass())),
			(this.Iso.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.Iso.bIsSingle = !0),
			(this.Iso.bIgnoreSelf = !0),
			this.Iso.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
	}
	CheckGroundHit(e, t, o) {
		this.yso || this.koe(),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.yso, e),
			this.yso.SetEndLocation(e.X, e.Y, e.Z + o),
			(this.yso.Radius = t);
		let r = !1;
		return (
			!(
				!(e = TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.yso,
					CHECK_GROUND_PROFILE_KEY,
				)) || !this.yso.HitResult.bBlockingHit
			) || r
		);
	}
	CheckWaterHit(e, t, o, r) {
		this.Iso || this.koe(),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Iso, e),
			this.Iso.SetEndLocation(t.X, t.Y, t.Z - o);
		let s = !1;
		return (
			!(
				!(e = TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.Iso,
					CHECK_WATER_PROFILE_KEY,
				)) || !this.Iso.HitResult.bBlockingHit
			) || s
		);
	}
}
exports.RewardModel = RewardModel;
