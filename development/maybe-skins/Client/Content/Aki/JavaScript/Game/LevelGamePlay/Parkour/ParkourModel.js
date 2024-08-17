"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ParkourModel =
		exports.ParkourConfig =
		exports.ParkourPointInfo =
			void 0);
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class ParkourPointInfo {
	constructor(e) {
		(this.Point = void 0),
			(this.IsRecycled = !1),
			(this.Point = e),
			(this.IsRecycled = !1);
	}
}
exports.ParkourPointInfo = ParkourPointInfo;
class ParkourConfig {
	constructor() {
		(this.TAe = 0),
			(this.LAe = void 0),
			(this.DAe = void 0),
			(this.RAe = 0),
			(this.nx = void 0),
			(this.UAe = void 0),
			(this.mC = void 0),
			(this.AAe = void 0),
			(this.PAe = void 0);
	}
	set ConfigId(e) {
		this.TAe = e;
	}
	get ConfigId() {
		return this.TAe;
	}
	set ParkourActorList(e) {
		this.DAe = e;
	}
	get ParkourActorList() {
		return this.DAe;
	}
	set ParkourContext(e) {
		this.nx = e;
	}
	get ParkourContext() {
		return this.nx;
	}
	get ParkourInfo() {
		return this.LAe;
	}
	set ParkourInfo(e) {
		this.LAe = e;
	}
	set CurCheckPointCount(e) {
		this.RAe = e;
	}
	get CurCheckPointCount() {
		return this.RAe;
	}
	set OriginLocation(e) {
		this.UAe = e;
	}
	get OriginLocation() {
		return this.UAe;
	}
	set OriginRotation(e) {
		this.mC = e;
	}
	get OriginRotation() {
		return this.mC;
	}
	get TotalScore() {
		return this.AAe;
	}
	get MatchRoleOption() {
		return this.PAe;
	}
	set MatchRoleOption(e) {
		this.PAe = e;
	}
	ClearTotalScore() {
		this.AAe = new Map();
	}
	ClearParkourActorList() {
		if (this.DAe?.length) {
			for (const o of this.DAe)
				if (0 < o?.length)
					for (const r of o) {
						var e = r.Point;
						!r.IsRecycled &&
							e?.IsValid() &&
							(e.ReceiveEndPlay(0), ActorSystem_1.ActorSystem.Put(e));
					}
			this.DAe.length = 0;
		}
	}
}
exports.ParkourConfig = ParkourConfig;
class ParkourModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments), (this.xAe = new Map());
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return this.xAe.clear(), !0;
	}
	AddParkour(e, o, r) {
		var t, n, i, a;
		return this.xAe.get(e)
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						7,
						"[ParkourModel.AddParkour] 添加相同跑酷路线",
						["ParkourConfigId", e],
					),
				!1)
			: (i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e))
				? ((t = Vector_1.Vector.Create(
						i.Transform?.Pos.X ?? 0,
						i.Transform?.Pos.Y ?? 0,
						i.Transform?.Pos.Z ?? 0,
					)),
					(n = Rotator_1.Rotator.Create(
						i.Transform?.Rot?.Y ?? 0,
						i.Transform?.Rot?.Z ?? 0,
						i.Transform?.Rot?.X ?? 0,
					)),
					(i = (0, IComponent_1.getComponent)(
						i.ComponentsData,
						"SplineComponent",
					))
						? i.Option.Type !== IComponent_1.ESplineType.Parkour
							? (Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Level",
										7,
										"[ParkourModel.AddParkour] SplineComponent配置类型不是parkour",
										["ParkourConfigId", e],
									),
								!1)
							: (((a = new ParkourConfig()).OriginLocation = t),
								(a.OriginRotation = n),
								(a.ParkourContext =
									LevelGeneralContextDefine_1.GeneralContext.Copy(o)),
								(a.ConfigId = e),
								(a.ParkourInfo = i.Option),
								(a.CurCheckPointCount = i.Option.CheckPointsRequire),
								(a.MatchRoleOption = r),
								this.xAe.set(e, a),
								!0)
						: (Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Level",
									7,
									"[ParkourModel.AddParkour] 无法找到SplineComponent配置",
									["ParkourConfigId", e],
								),
							!1))
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Level",
							7,
							"[ParkourModel.AddParkour] 无法找到spline entity",
							["ParkourConfigId", e],
						),
					!1);
	}
	RemoveParkour(e) {
		var o = this.xAe.get(e);
		o &&
			(o.ClearParkourActorList(),
			o.ParkourContext?.Release(),
			this.xAe.delete(e));
	}
	GetParkour(e) {
		return this.xAe.get(e);
	}
}
exports.ParkourModel = ParkourModel;
