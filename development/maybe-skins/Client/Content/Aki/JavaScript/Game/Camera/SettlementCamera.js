"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SettlementCamera = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
	Macro_1 = require("../../Core/Preprocessor/Macro"),
	MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../Core/Utils/StringUtils"),
	TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
	GlobalData_1 = require("../GlobalData"),
	ColorUtils_1 = require("../Utils/ColorUtils"),
	CameraController_1 = require("./CameraController"),
	MIN_CAMERA_DISTANCE = 100,
	TARGET_PITCH_MIN = -5,
	TARGET_PITCH_MAX = -8,
	TRACE_TOP_ADDITION_Z = 50,
	TRACE_BOTTOM_ADDITION_Z = 50,
	LEFT_YAW_RANGE_MIN = -180,
	LEFT_YAW_RANGE_MAX = 0,
	RIGHT_YAW_RANGE_MIN = 0,
	RIGHT_YAW_RANGE_MAX = 180,
	MIN_VALID_YAW_RANGE = 0,
	MIN_SHAPE_RADUIS = 30,
	MAX_CACHE_CAPSULE_COUNT = 4,
	PTICH_MAX = 90,
	PITCH_MIN = -90,
	MINUS_FLAT_ANGLE = -180,
	FLAT_ANGLE = 180,
	PROFILE_KEY = "FightCameraLogicComponent_TraceValidRange_Camera",
	DEBUG_DRAW_DURATION = 10,
	THICKNESS = 5;
class YawRange {
	constructor(e, t) {
		(this.Min = 0), (this.Max = 0), (this.Min = e), (this.Max = t);
	}
}
class SettlementCamera {
	constructor() {
		(this.Hh = void 0),
			(this.Ime = 100),
			(this.Fse = void 0),
			(this.Tme = void 0),
			(this.Lme = void 0),
			(this.Dme = 100),
			(this.Rme = -5),
			(this.Ume = -8),
			(this.Ame = 50),
			(this.Pme = 50),
			(this.xme = -180),
			(this.wme = 0),
			(this.Bme = 0),
			(this.bme = 180),
			(this.qme = 0),
			(this.Gme = 0),
			(this.Nme = void 0),
			(this.Ome = new Rotator_1.Rotator()),
			(this.kme = new Map()),
			(this.Fme = new Map()),
			(this.Vme = new Map()),
			(this.Hme = (0, puerts_1.$ref)(void 0)),
			(this.jme = []),
			(this.Wme = []),
			(this.Kme = []),
			(this.Lz = Vector_1.Vector.Create()),
			(this.Tz = Vector_1.Vector.Create()),
			(this.Qme = []),
			(this.EnableDebugDraw = !1);
	}
	Init(e) {
		(this.Hh = e),
			(this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Fse.bIsSingle = !1),
			(this.Fse.bTraceComplex = !1),
			(this.Fse.bIgnoreSelf = !0);
	}
	SetSettlementCamera(e) {
		e && e.CameraModifier
			? ((this.Tme = e),
				(this.Lme = e.CameraModifier),
				(this.Dme = this.Lme.Settings.ArmLength),
				this.Dme < 100 &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】臂长配置过小:${this.Dme},将自动修正为:100`,
						),
					(this.Dme = 100)),
				(this.Rme = this.Tme.MinRandomPitch),
				(this.Rme > 90 || this.Rme < -90) &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】最小Pitch配置不正确:${this.Rme},合理区间为(-90,90),将自动修正为:-5`,
						),
					(this.Rme = -5)),
				(this.Ume = this.Tme.MaxRandomPitch),
				(this.Ume > 90 || this.Ume < -90) &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】最大Pitch配置不正确:${this.Ume},合理区间为(-90,90),将自动修正为:-8`,
						),
					(this.Ume = -8)),
				(this.Ame = this.Tme.TopAdditionZ),
				this.Ame < 50 &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】探测合法值上限叠加值过小:${this.Ame},将自动修正为:50`,
						),
					(this.Ame = 50)),
				(this.Pme = this.Tme.BottomAdditionZ),
				this.Pme < 50 &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】探测合法值下限叠加值过小:${this.Pme},将自动修正为:50`,
						),
					(this.Pme = 50)),
				(this.xme = this.Tme.LeftMinYawRange),
				(this.wme = this.Tme.LeftMaxYawRange),
				this.xme < -180 &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】左侧Yaw区间合法值最小值过小:${this.xme},将自动修正为:-180`,
						),
					(this.xme = -180)),
				this.wme > 0 &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】左侧Yaw区间合法值最大值过大:${this.wme},将自动修正为:0`,
						),
					(this.wme = 0)),
				this.wme < this.xme &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】左侧Yaw区间合法值最小值大于最大值,最小值:${this.xme},最大值:${this.wme},将自动修正为,最小值:-180,最大值:0`,
						),
					(this.xme = -180),
					(this.wme = 0)),
				(this.Bme = this.Tme.RightMinYawRange),
				(this.bme = this.Tme.RightMaxYawRange),
				this.Bme < 0 &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】右侧Yaw区间合法值最小值过小:${this.Bme},将自动修正为:0`,
						),
					(this.Bme = 0)),
				this.bme > 180 &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】右侧Yaw区间合法值最大值过大:${this.bme},将自动修正为:180`,
						),
					(this.bme = 180)),
				this.bme < this.Bme &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】右侧Yaw区间合法值最小值大于最大值,最小值:${this.Bme},最大值:${this.bme},将自动修正为,最小值:0,最大值:180`,
						),
					(this.Bme = 0),
					(this.bme = 180)),
				(this.qme = this.Tme.MinValidYawRange),
				this.qme < 0 &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							`【结算镜头】最小合法区间过小:${this.qme},将自动修正为:0`,
						),
					(this.qme = 0)),
				StringUtils_1.StringUtils.IsEmpty(this.Lme.Settings.Name) &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Camera",
							58,
							"【结算镜头】没有配置CameraModifier名称，将自动修正为 SettlementCamera",
						),
					(this.Lme.Settings.Name = "SettlementCamera")))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Camera", 58, "无结算镜头配置数据");
	}
	PlaySettlementCamera() {
		CameraController_1.CameraController.IsSequenceCameraInCinematic() ||
			(this.Tme &&
				this.Tme.CameraModifier &&
				((this.Gme = this.Hh.PlayerRotator.Yaw),
				(this.Nme = this.Hh.PlayerLocation),
				(this.Ime = Math.max(this.Hh.FinalCameraDistance, this.Dme)),
				(this.Fse.bTraceComplex = !1),
				this.Fse.HitResult?.Clear(),
				(this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
				(this.Fse.Radius = this.Ime),
				this.Fse.ActorsToIgnore.Add(this.Hh.Character),
				this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
				this.Fse.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
				this.Fse.AddObjectTypeQuery(
					QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
				),
				this.Fse.AddObjectTypeQuery(
					QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
				),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.Fse,
					this.Hh.PlayerLocation,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.Fse,
					this.Hh.PlayerLocation,
				),
				TraceElementCommon_1.TraceElementCommon.SphereTrace(
					this.Fse,
					PROFILE_KEY,
				),
				this.UpdateRotator(this.Fse.HitResult),
				this.PlaySettlementCameraInternal()));
	}
	UpdateRotator(e) {
		this.Jme(e), this.zme(e), this.Zme(), this.UpdateFinalRotator();
	}
	UpdateFinalRotator() {
		this.Qme.length = 0;
		for (const e of this.Wme) e.Max - e.Min > this.qme && this.Qme.push(e);
		for (const e of this.Kme) e.Max - e.Min > this.qme && this.Qme.push(e);
		var e;
		0 < this.Qme.length
			? ((e = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(this.Qme)),
				(e =
					MathUtils_1.MathUtils.Lerp(e.Min, e.Max, Math.random()) + this.Gme),
				(this.Ome.Pitch = MathUtils_1.MathUtils.Lerp(
					this.Rme,
					this.Ume,
					Math.random(),
				)),
				(this.Ome.Yaw = MathCommon_1.MathCommon.WrapAngle(e + 180)),
				(this.Ome.Roll = 0))
			: this.Hh.CameraForward.ToOrientationRotator(this.Ome);
	}
	PlaySettlementCameraInternal() {
		CameraController_1.CameraController.StopAllCameraShakes(),
			this.Ome.SubtractionEqual(
				this.Hh.Character.CharacterActorComponent.ActorRotationProxy,
			),
			(this.Lme.Settings.ArmRotation = new UE.Rotator(
				this.Ome.Pitch,
				this.Ome.Yaw,
				this.Ome.Roll,
			)),
			this.Hh.CameraModifyController.ApplyCameraModify(
				void 0,
				this.Lme.Duration,
				this.Lme.BlendInTime,
				this.Lme.BlendOutTime,
				this.Lme.BreakBlendOutTime,
				this.Lme.Settings,
				void 0,
				this.Lme.BlendInCurve,
				this.Lme.BlendOutCurve,
				this.Hh.Character,
				"HitCase",
				void 0,
			);
	}
	IsPlayingSettlementCamera() {
		return (
			!!this.Hh.CameraModifyController.IsModified &&
			this.Hh.CameraModifyController.ModifySettings.Name ===
				this.Lme.Settings.Name
		);
	}
	Jme(e) {
		if ((this.kme.clear(), this.Fme.clear(), this.Vme.clear(), e)) {
			var t = e.GetHitCount(),
				i = this.Hh.PlayerLocation.Z + this.Ame,
				r = this.Hh.PlayerLocation.Z - this.Pme;
			for (let h = 0; h < t; ++h) {
				var s,
					o,
					a = e.Actors.Get(h);
				a &&
					(s = e.Components?.Get(h)) &&
					(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
						this.Fse.HitResult,
						h,
						this.Lz,
					),
					this.Lz.Z < r ||
						this.Lz.Z > i ||
						(s instanceof UE.StaticMeshComponent
							? (!this.kme.has(a) ||
									((o = this.kme.get(a)),
									TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
										this.Fse.HitResult,
										o,
										this.Tz,
									),
									(o = Vector_1.Vector.DistSquared(
										this.Lz,
										this.Hh.PlayerLocation,
									)),
									Vector_1.Vector.DistSquared(this.Tz, this.Hh.PlayerLocation) <
										o)) &&
								this.kme.set(a, h)
							: s instanceof UE.ShapeComponent &&
								this.ede(s) > 30 &&
								(this.Fme.has(a)
									? this.Fme.get(a).push(h)
									: this.Fme.set(a, [h]))));
			}
		}
	}
	tde(e, t) {
		return (
			t.GetLocalBounds(void 0, this.Hme),
			[
				(0, puerts_1.$unref)(this.Hme).X * e.GetScale3D().X,
				(0, puerts_1.$unref)(this.Hme).Y * e.GetScale3D().Y,
			]
		);
	}
	zme(e) {
		for (var [t, i] of ((this.jme.length = 0), this.kme)) {
			var r = e.Components?.Get(i);
			r &&
				(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(e, i, this.Lz),
				this.jme.push(this.ide(t.GetTransform(), r, this.Lz)));
		}
		for (var [, s] of this.Fme) {
			s.sort((t, i) => {
				var r = e.Components?.Get(t),
					s = e.Components?.Get(i);
				return s ? (r ? ((r = this.ode(r, t)), this.ode(s, i) - r) : 1) : -1;
			});
			for (let t = 0; t < s.length && t < 4; ++t) {
				var o = e.Components?.Get(s[t]);
				o && this.jme.push(this.rde(o, s[t]));
			}
		}
	}
	rde(e, t) {
		let i = 0;
		this.Lz.DeepCopy(e.K2_GetComponentLocation());
		var r = this.Ime,
			s =
				((e = this.ode(e, t)),
				(t = Vector_1.Vector.Dist2D(this.Hh.PlayerLocation, this.Lz)),
				this.nde(this.Lz));
		return (
			(i =
				t < r
					? Math.atan(e / t)
					: MathUtils_1.MathUtils.GetObliqueTriangleAngle(r, t, e)),
			(i *= MathUtils_1.MathUtils.RadToDeg),
			new YawRange(s - i, s + i)
		);
	}
	ide(e, t, i) {
		var r = e.InverseTransformPositionNoScale(this.Nme.ToUeVector()),
			s = ((i = e.InverseTransformPositionNoScale(i.ToUeVector())), this.Ime),
			[t, o] = this.tde(e, t);
		let a = 0,
			h = 0;
		var m,
			n,
			l = Vector_1.Vector.Create(),
			C = Vector_1.Vector.Create(),
			o =
				((t =
					(r.Y >= -o && r.Y <= o
						? ((_ = o + r.Y),
							(m = o - r.Y),
							(a =
								s * s < _ * _ + (n = i.X - r.X) * n
									? r.Y - Math.sqrt(s * s - n * n)
									: r.Y - _),
							(h =
								s * s < m * m + n * n
									? r.Y + Math.sqrt(s * s - n * n)
									: r.Y + m),
							(l.X = i.X),
							(l.Y = r.X <= 0 ? a : h),
							(l.Z = i.Z),
							(C.X = i.X),
							(C.Y = 0 < r.X ? a : h),
							(C.Z = i.Z))
						: r.X >= -t && r.X <= t
							? ((_ = t - r.X),
								(n = t + r.X),
								(a =
									s * s < _ * _ + (m = i.Y - r.Y) * m
										? r.X + Math.sqrt(s * s - m * m)
										: r.X + _),
								(h =
									s * s < n * n + m * m
										? r.X - Math.sqrt(s * s - m * m)
										: r.X - n),
								(l.X = r.Y <= 0 ? a : h),
								(l.Y = i.Y),
								(l.Z = i.Z),
								(C.X = 0 < r.Y ? a : h),
								(C.Y = i.Y),
								(C.Z = i.Z))
							: r.Y < -o && r.X < -t
								? ((_ = t - r.X),
									(m = o - r.Y),
									(n = i.X - r.X),
									(a =
										s * s < _ * _ + (c = i.Y - r.Y) * c
											? r.X + Math.sqrt(s * s - c * c)
											: r.X + _),
									(h =
										s * s < m * m + n * n
											? r.Y + Math.sqrt(s * s - n * n)
											: r.Y + m),
									(l.X = a),
									(l.Y = i.Y),
									(l.Z = i.Z),
									(C.X = i.X),
									(C.Y = h),
									(C.Z = i.Z))
								: r.Y > o && r.X < -t
									? ((c = t - r.X),
										(_ = o + r.Y),
										(n = i.X - r.X),
										(a =
											s * s < c * c + (m = i.Y - r.Y) * m
												? r.X + Math.sqrt(s * s - m * m)
												: r.X + c),
										(h =
											s * s < _ * _ + n * n
												? r.Y - Math.sqrt(s * s - n * n)
												: r.Y - _),
										(C.X = a),
										(C.Y = i.Y),
										(C.Z = i.Z),
										(l.X = i.X),
										(l.Y = h),
										(l.Z = i.Z))
									: r.Y < -o && r.X > t
										? ((m = t + r.X),
											(c = o - r.Y),
											(n = i.X - r.X),
											(a =
												s * s < m * m + (_ = i.Y - r.Y) * _
													? r.X - Math.sqrt(s * s - _ * _)
													: r.X - m),
											(h =
												s * s < c * c + n * n
													? r.Y + Math.sqrt(s * s - n * n)
													: r.Y + c),
											(l.X = i.X),
											(l.Y = h),
											(l.Z = i.Z),
											(C.X = a),
											(C.Y = i.Y),
											(C.Z = i.Z))
										: r.Y > o &&
											r.X > t &&
											((_ = t + r.X),
											(m = o + r.Y),
											(n = i.X - r.X),
											(a =
												s * s < _ * _ + (c = i.Y - r.Y) * c
													? r.X - Math.sqrt(s * s - c * c)
													: r.X - _),
											(h =
												s * s < m * m + n * n
													? r.Y - Math.sqrt(s * s - n * n)
													: r.Y - m),
											(l.X = a),
											(l.Y = i.Y),
											(l.Z = i.Z),
											(C.X = i.X),
											(C.Y = h),
											(C.Z = i.Z)),
					e.TransformPositionNoScale(l.ToUeVector()))),
				e.TransformPositionNoScale(C.ToUeVector())),
			c = this.sde(t),
			_ = this.sde(o);
		return new YawRange(c, _);
	}
	Zme() {
		(this.Wme.length = 0),
			(this.Kme.length = 0),
			this.Wme.push(new YawRange(this.xme, this.wme)),
			this.Kme.push(new YawRange(this.Bme, this.bme));
		for (const m of this.jme) {
			var e = MathCommon_1.MathCommon.WrapAngle(m.Max - this.Gme),
				t = MathCommon_1.MathCommon.WrapAngle(m.Min - this.Gme);
			let n = 0,
				l = 0,
				C = 0,
				c = 0,
				_ = 0,
				M = 0,
				g = 0,
				L = 0,
				T = 0,
				u = 0;
			e < 0 && t < 0
				? e < t
					? ((T = 1), (n = e), (l = t))
					: ((T = 2),
						(n = -180),
						(l = t),
						(C = e),
						(c = 0),
						(u = 1),
						(_ = 0),
						(M = 180))
				: 0 < e && 0 < t
					? e < t
						? ((u = 1), (_ = e), (M = t))
						: ((u = 2),
							(_ = 0),
							(M = t),
							(g = e),
							(L = 180),
							(T = 1),
							(n = -180),
							(l = 0))
					: e < 0 && 0 < t
						? ((T = 1), (u = 1), (n = e), (l = 0), (_ = 0), (M = t))
						: 0 < e &&
							t < 0 &&
							((T = 1), (u = 1), (n = -180), (l = t), (_ = e), (M = 180));
			for (let e = this.Wme.length - 1; 0 <= e; --e) {
				let t = !0;
				var i,
					r,
					s = this.Wme[e];
				2 <= T &&
					(s.Min > c ||
						s.Max < C ||
						((i = Math.max(s.Min, C)),
						(r = Math.min(s.Max, c)),
						this.Wme.push(new YawRange(i, r)))),
					1 <= T &&
						(s.Min > l ||
							s.Max < n ||
							((t = !1),
							(s.Min = Math.max(s.Min, n)),
							(s.Max = Math.min(s.Max, l)))),
					t && this.Wme.splice(e, 1);
			}
			for (let e = this.Kme.length - 1; 0 <= e; --e) {
				let t = !0;
				var o,
					a,
					h = this.Kme[e];
				2 <= u &&
					(h.Min > L ||
						h.Max < g ||
						((o = Math.max(h.Min, g)),
						(a = Math.min(h.Max, L)),
						this.Kme.push(new YawRange(o, a)))),
					1 <= u &&
						(h.Min > M ||
							h.Max < _ ||
							((t = !1),
							(h.Min = Math.max(h.Min, _)),
							(h.Max = Math.min(h.Max, M)))),
					t && this.Kme.splice(e, 1);
			}
		}
	}
	ode(e, t) {
		return this.Vme.has(t) || this.Vme.set(t, this.ede(e)), this.Vme.get(t);
	}
	ede(e) {
		return e
			? e instanceof UE.CapsuleComponent
				? e.CapsuleRadius
				: e instanceof UE.BoxComponent
					? Math.max(e.BoxExtent.X, e.BoxExtent.Y)
					: e instanceof UE.SphereComponent
						? e.SphereRadius
						: 0
			: 0;
	}
	sde(e) {
		return this.Lz.Set(e.X, e.Y, e.Z), this.nde(this.Lz);
	}
	nde(e) {
		return (
			e.Subtraction(this.Nme, this.Lz),
			this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg
		);
	}
	Clear() {
		this.Fse && (this.Fse.Dispose(), (this.Fse = void 0)),
			(this.Hh = void 0),
			this.kme.clear(),
			this.Fme.clear(),
			this.Vme.clear(),
			(this.jme.length = 0),
			(this.Wme.length = 0),
			(this.Kme.length = 0);
	}
}
exports.SettlementCamera = SettlementCamera;
