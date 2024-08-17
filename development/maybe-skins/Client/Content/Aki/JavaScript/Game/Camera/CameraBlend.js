"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CameraBlend = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager"),
	PROFILE_KEY1 = "FightCameraLogicComponent_CheckCollision_Water",
	PROFILE_KEY2 = "FightCameraLogicComponent_CheckCollision_Camera",
	LIMIT_COUNT = 1,
	TRACE_START_HEIGHT = 300,
	LINE_HEIGHT = 100;
class CameraBlend {
	constructor() {
		(this.bse = void 0),
			(this.CheckArmLocation = Vector_1.Vector.Create()),
			(this.qse = Vector_1.Vector.Create()),
			(this.Gse = Vector_1.Vector.Create()),
			(this.Nse = Vector_1.Vector.Create()),
			(this.Ose = Vector_1.Vector.Create()),
			(this.kse = void 0),
			(this.Fse = void 0),
			(this.Vse = void 0),
			(this.Hse = void 0),
			(this.jse = void 0),
			(this.Wse = Vector_1.Vector.Create()),
			(this.Kse = Vector_1.Vector.Create()),
			(this.Qse = Vector_1.Vector.Create()),
			(this.TempCameraLocation = Vector_1.Vector.Create()),
			(this.CurrentSpringBlendState = void 0),
			(this.NextSpringBlendState = void 0),
			(this.t6 = 0),
			(this.LineHitState = 0),
			(this.NearCameraLocation = Vector_1.Vector.Create()),
			(this.Xse = -0),
			(this.$se = -0),
			(this.Yse = Vector_1.Vector.Create()),
			(this.CurrentCollisionDifferenceSize = -0),
			(this.CurrentInputSpeedPercentage = -0),
			(this.CameraForward = Vector_1.Vector.Create()),
			(this.Jse = Vector_1.Vector.Create()),
			(this.zse = !1),
			(this.Zse = !0),
			(this.eae = void 0),
			(this.tae = !1),
			(this.iae = !1),
			(this.oae = !1),
			(this.rae = !1),
			(this.nae = !1),
			(this.sae = !1),
			(this.aae = void 0),
			(this.hae = !1),
			(this.lae = Vector_1.Vector.Create()),
			(this.IsOpenBlend = !0),
			(this._ae = Vector_1.Vector.Create()),
			(this.uae = Vector_1.Vector.Create()),
			(this.cae = Vector_1.Vector.Create()),
			(this.mae = 0),
			(this.dae = Vector_1.Vector.Create()),
			(this.Cae = Vector_1.Vector.Create()),
			(this.cz = Vector_1.Vector.Create()),
			(this.gae = 0),
			(this.fae = Vector_1.Vector.Create());
	}
	Init(e) {
		(this.bse = e),
			(this.CurrentCollisionDifferenceSize = 0),
			(this.CurrentSpringBlendState = 4),
			(this.LineHitState = 0),
			(this.Xse = 0),
			(this.$se = 0),
			(this.t6 = 0),
			(this.oae = !1),
			(this.rae = !1),
			(this.nae = !1);
	}
	Clear() {
		this.kse && (this.kse.Dispose(), (this.kse = void 0)),
			this.Fse && (this.Fse.Dispose(), (this.Fse = void 0)),
			this.Vse && (this.Vse.Dispose(), (this.Vse = void 0)),
			this.Hse && (this.Hse.Dispose(), (this.Hse = void 0)),
			this.jse && (this.jse.Dispose(), (this.jse = void 0)),
			(this.oae = !1),
			(this.rae = !1),
			(this.nae = !1);
	}
	CheckCollision(e, t) {
		if (
			((this.aae = void 0),
			(this.hae = !1),
			(this.nae = !1),
			this.Jse.DeepCopy(t),
			this.pae(),
			this.qse.DeepCopy(e),
			this.CheckArmLocation.DeepCopy(e),
			e.Subtraction(t, this.Ose),
			this.Nse.DeepCopy(this.qse),
			this._ae.DeepCopy(this.Nse),
			(this._ae.Z += 300),
			(this.kse.WorldContextObject = GlobalData_1.GlobalData.World),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.kse,
				this._ae,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.kse,
				this.qse,
			),
			(this.kse.Radius = this.bse.CurrentCollisionSize),
			(this.zse = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.kse,
				PROFILE_KEY1,
			)),
			this.zse &&
				(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
					this.kse.HitResult,
					0,
					this.Wse,
				),
				this.qse.Set(
					e.X,
					e.Y,
					this.Wse.Z + this.bse.CollisionAdditionalHeightInWater,
				)),
			(this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.Fse,
				this.vae(this.qse, t, this.bse.CurrentCollisionSize),
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, t),
			(this.Fse.Radius = this.bse.CurrentCollisionSize),
			(this.tae = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.Fse,
				PROFILE_KEY2,
			)),
			this.tae
				? ((this.aae = this.Fse.HitResult.Actors.Get(0)),
					TraceElementCommon_1.TraceElementCommon.GetHitLocation(
						this.Fse.HitResult,
						0,
						this.Wse,
					),
					this.lae.DeepCopy(this.Wse))
				: (this.LineHitState = 0),
			this.IsOpenBlend)
		) {
			if (
				((this.iae = !1),
				this.tae
					? ((e = this.Mae(t)),
						this.Vse.HitResult?.Clear(),
						(this.Vse.WorldContextObject = GlobalData_1.GlobalData.World),
						(this.Vse.Radius = 5),
						TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							this.Vse,
							this.vae(this.qse, t, this.Vse.Radius),
						),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Vse, t),
						(this.iae = TraceElementCommon_1.TraceElementCommon.SphereTrace(
							this.Vse,
							PROFILE_KEY2,
						)),
						this.iae ||
							e ||
							this.nae ||
							e ||
							((this.t6 = 0), (e = this.Mae(t))))
					: (this.t6 = 0),
				this.iae)
			)
				if (this.rae || this.oae)
					(this.CurrentSpringBlendState = 2), (this.LineHitState = 0);
				else {
					if (
						(this.sae &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Character",
								23,
								"water1: ",
								["this.IsHitWater", this.zse],
								["this.WaterActor", this.aae?.GetName()],
								["waterActor", this.kse.HitResult.Actors.Get(0)?.GetName()],
								["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
							),
						this.zse && this.aae === this.kse.HitResult.Actors.Get(0))
					)
						return (this.hae = !0), this.Wse;
					if (4 === this.CurrentSpringBlendState) return t;
				}
			else if (this.tae && (this.rae || this.oae))
				this.Sae(2, this.tae ? this.Wse : t);
			else if (this.tae) {
				if (
					(this.sae &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Character",
							23,
							"water0: ",
							["this.IsHitWater", this.zse],
							["this.WaterActor", this.aae?.GetName()],
							["waterActor", this.kse.HitResult.Actors.Get(0)?.GetName()],
							["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
						),
					this.zse && this.aae === this.kse.HitResult.Actors.Get(0))
				)
					return (this.hae = !0), this.Wse;
				if (4 === this.CurrentSpringBlendState) return t;
			} else this.Sae(4, this.tae ? this.Wse : t);
			if (
				(this.tae
					? this.sae &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Character",
							23,
							"jiancheluoji： ",
							["this.IsHitBigCenter", this.tae],
							["this.IsHitSmallCenter", this.iae],
							["this.IsHitLeft", this.oae],
							["this.IsHitRight", this.rae],
						)
					: this.sae &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Character",
							23,
							"返回原点： ",
							["this.IsHitBigCenter", this.tae],
							["this.IsHitSmallCenter", this.iae],
							["this.IsHitLeft", this.oae],
							["this.IsHitRight", this.rae],
						),
				this.tae || this.Eae(t),
				this.tae && !this.bse.ContainsTag(-1150819426))
			) {
				e = this.Fse.HitResult.Components.Get(0);
				var i = this.eae !== e,
					s =
						e?.IsValid() &&
						2 ===
							e.GetCollisionResponseToChannel(
								QueryTypeDefine_1.KuroCollisionChannel.Water,
							);
				if (((this.eae = e), i || s)) {
					if (!this.Zse && s) {
						var [e, i] = this.bse?.CharacterEntityHandle.Entity.GetComponent(
							52,
						)?.GetCameraInput() ?? [0, 0];
						if (
							!(
								Math.abs(e) > MathUtils_1.MathUtils.KindaSmallNumber ||
								Math.abs(i) > MathUtils_1.MathUtils.KindaSmallNumber
							)
						)
							return (
								(t.Z = Math.max(
									t.Z,
									this.Wse.Z +
										this.bse.CollisionProbeSize +
										MathUtils_1.MathUtils.KindaSmallNumber,
								)),
								t
							);
					}
					this.Zse = s;
				} else this.Zse = !1;
			} else this.Zse = !1;
		}
		return this.tae ? this.Wse : t;
	}
	Eae(e) {
		this._ae.DeepCopy(e),
			this.uae.DeepCopy(e),
			(this._ae.Z += 300),
			this.kse.HitResult?.Clear(),
			(this.kse.WorldContextObject = GlobalData_1.GlobalData.World),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.kse,
				this._ae,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.kse,
				this.uae,
			),
			(this.kse.Radius = this.bse.CurrentCollisionSize),
			(this.zse = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.kse,
				PROFILE_KEY1,
			)),
			this.zse &&
				(TraceElementCommon_1.TraceElementCommon.GetHitLocation(
					this.kse.HitResult,
					0,
					this.Wse,
				),
				(e.Z = this.Wse.Z));
	}
	vae(e, t, i) {
		return (
			e.Subtraction(t, this.cae),
			(this.mae = this.cae.Size()),
			this.cae.Normalize(),
			this.cae.Multiply(this.mae - i, this.cae),
			t.Addition(this.cae, this.cae),
			this.cae
		);
	}
	Mae(e) {
		return (
			!(1 < this.t6) &&
			((this.nae = !0),
			(this.oae = !1),
			(this.rae = !1),
			this.bse.CurrentCamera.ArmRotation.Vector(this.Kse),
			this.Kse.CrossProduct(Vector_1.Vector.DownVectorProxy, this.Qse),
			this.Qse.Normalize(),
			this.Qse.Multiply(
				this.bse.CheckWidth + this.CurrentCollisionDifferenceSize,
				this.bse.TempVector,
			),
			this.CheckArmLocation.Addition(this.bse.TempVector, this.Gse),
			this.TempCameraLocation.DeepCopy(this.Jse),
			this.TempCameraLocation.Addition(
				this.bse.TempVector,
				this.TempCameraLocation,
			),
			this.dae.DeepCopy(this.TempCameraLocation),
			this.yae(this.TempCameraLocation, this.Gse),
			this.Hse.HitResult?.Clear(),
			(this.Hse.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.Hse.Radius = this.bse.CheckCollisionProbeSize),
			this.Cae.DeepCopy(
				this.vae(this.Gse, this.TempCameraLocation, this.Hse.Radius),
			),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.Hse,
				this.Cae,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.Hse,
				this.TempCameraLocation,
			),
			(this.rae = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.Hse,
				PROFILE_KEY2,
			)),
			this.rae
				? 2 !== this.CurrentSpringBlendState && (this.LineHitState = 3)
				: (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						this.Hse,
						this.TempCameraLocation,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(
						this.Hse,
						this.Cae,
					),
					(this.rae = TraceElementCommon_1.TraceElementCommon.SphereTrace(
						this.Hse,
						PROFILE_KEY2,
					)),
					this.rae &&
						2 !== this.CurrentSpringBlendState &&
						(this.LineHitState = 3)),
			this.Qse.Multiply(
				2 * -this.bse.CheckWidth - 2 * this.CurrentCollisionDifferenceSize,
				this.bse.TempVector,
			),
			this.Gse.Addition(this.bse.TempVector, this.Gse),
			this.TempCameraLocation.Addition(
				this.bse.TempVector,
				this.TempCameraLocation,
			),
			this.jse.HitResult?.Clear(),
			(this.jse.WorldContextObject = GlobalData_1.GlobalData.World),
			(this.jse.Radius = this.bse.CheckCollisionProbeSize),
			this.Cae.DeepCopy(
				this.vae(this.Gse, this.TempCameraLocation, this.jse.Radius),
			),
			TraceElementCommon_1.TraceElementCommon.SetStartLocation(
				this.jse,
				this.Cae,
			),
			TraceElementCommon_1.TraceElementCommon.SetEndLocation(
				this.jse,
				this.TempCameraLocation,
			),
			(this.oae = TraceElementCommon_1.TraceElementCommon.SphereTrace(
				this.jse,
				PROFILE_KEY2,
			)),
			this.oae
				? 2 !== this.CurrentSpringBlendState && (this.LineHitState = 1)
				: (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
						this.jse,
						this.TempCameraLocation,
					),
					TraceElementCommon_1.TraceElementCommon.SetEndLocation(
						this.jse,
						this.Cae,
					),
					(this.oae = TraceElementCommon_1.TraceElementCommon.SphereTrace(
						this.jse,
						PROFILE_KEY2,
					)),
					this.oae &&
						2 !== this.CurrentSpringBlendState &&
						(this.LineHitState = 1)),
			1 > this.t6 && this.t6++,
			this.rae || this.oae)
		);
	}
	yae(e, t, i = 100) {
		e.Subtraction(t, this.cz),
			(this.gae = this.cz.Size()),
			this.cz.Normalize(),
			this.cz.Multiply(this.gae + i, this.cz),
			t.Addition(this.cz, e);
	}
	GetLocation(e, t, i) {
		switch (
			(0 !== this.bse.CameraDialogueController.State
				? (this.tae
						? this.bse.TempDesireLocation.DeepCopy(this.lae)
						: this.bse.TempDesireLocation.DeepCopy(this.Jse),
					(this.CurrentSpringBlendState = 4),
					(this.$se = 0),
					(this.LineHitState = 0))
				: ModelManager_1.ModelManager.GameModeModel.IsSilentLogin
					? (this.bse.TempDesireLocation.DeepCopy(this.Jse),
						(this.CurrentSpringBlendState = 4),
						(this.$se = 0),
						(this.LineHitState = 0))
					: this.hae &&
						((this.CurrentSpringBlendState = 4),
						(this.$se = 0),
						(this.LineHitState = 0)),
			this.CurrentSpringBlendState)
		) {
			case 1:
				this.$se < this.Xse
					? ((this.$se += this.bse.InSpeed * e),
						(this.$se = this.Iae(this.$se)),
						this.sae &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Character",
								23,
								"BlendIn0",
								["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
								["this.TempAddCameraLength", this.$se],
								["this.TempCameraLength", this.Xse],
								["this.LineHitState", this.LineHitState],
							))
					: ((this.$se = this.Xse),
						(this.CurrentSpringBlendState = 2),
						(this.LineHitState = 0),
						this.sae &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Character",
								23,
								"BlendIn1",
								["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
								["this.TempAddCameraLength", this.$se],
								["this.TempCameraLength", this.Xse],
								["this.LineHitState", this.LineHitState],
							));
				break;
			case 3:
				0 < this.$se
					? ((this.$se -= this.bse.OutSpeed * e),
						(this.$se = this.Iae(this.$se)),
						this.sae &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Character",
								23,
								"BlendOut0",
								["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
								["this.TempAddCameraLength", this.$se],
								["this.TempCameraLength", this.Xse],
								["this.LineHitState", this.LineHitState],
							))
					: ((this.$se = 0),
						(this.CurrentSpringBlendState = 4),
						this.sae &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Character",
								23,
								"BlendOut1",
								["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
								["this.TempAddCameraLength", this.$se],
								["this.TempCameraLength", this.Xse],
								["this.LineHitState", this.LineHitState],
							)),
					(this.LineHitState = 0);
				break;
			case 4:
			case 2:
				return (
					this.sae &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Character",
							23,
							"InOrOut",
							["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
							["this.TempAddCameraLength", this.$se],
							["this.TempCameraLength", this.Xse],
							["this.LineHitState", this.LineHitState],
						),
					void (this.LineHitState = 0)
				);
		}
		this.CameraForward.DeepCopy(this.bse.CameraForward),
			this.CameraForward.Normalize(),
			this.CameraForward.Multiply(this.$se, this.CameraForward),
			this.Jse.Addition(this.CameraForward, this.bse.TempDesireLocation);
	}
	Iae(e) {
		return (
			this.Jse.Subtraction(this.CheckArmLocation, this.fae),
			e > this.fae.Size() ? (this.ResetBlendData(), 0) : e
		);
	}
	Sae(e, t) {
		switch (((this.NextSpringBlendState = e), this.NextSpringBlendState)) {
			case 2:
				if (
					1 === this.CurrentSpringBlendState ||
					2 === this.CurrentSpringBlendState
				)
					this.NearCameraLocation.DeepCopy(this.bse.CameraLocation);
				else if (
					3 === this.CurrentSpringBlendState ||
					4 === this.CurrentSpringBlendState
				) {
					if (
						((this.$se = 0),
						this.Jse.Subtraction(t, this.Yse),
						(this.Xse = this.Yse.Size()),
						this.bse.CameraLocation.Subtraction(t, this.Yse),
						!(this.Xse > this.Yse.Size()))
					)
						return (
							this.bse.CameraLocation.Subtraction(this.Jse, this.Yse),
							(this.Xse = this.Yse.Size()),
							(this.$se = this.Xse),
							void (this.CurrentSpringBlendState = 3)
						);
					(this.$se = this.Xse - this.Yse.Size()),
						this.Ose.Size() >= this.bse.MaxDistance
							? (this.CurrentSpringBlendState = 2)
							: (this.CurrentSpringBlendState = 1),
						this.sae &&
							Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Character",
								23,
								"开始进行In或者BlendIn",
								["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
								["this.TempAddCameraLength", this.$se],
								["this.TempCameraLength", this.Xse],
								["this.LineHitState", this.LineHitState],
							);
				}
				break;
			case 4:
				3 === this.CurrentSpringBlendState ||
					4 === this.CurrentSpringBlendState ||
					(1 !== this.CurrentSpringBlendState &&
						2 !== this.CurrentSpringBlendState) ||
					(this.bse.CameraLocation.Subtraction(this.Jse, this.Yse),
					(this.Xse = this.Yse.Size()),
					(this.$se = this.Xse),
					(this.CurrentSpringBlendState = 3),
					this.sae &&
						Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Character",
							23,
							"开始进行BlendOut",
							["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
							["this.TempAddCameraLength", this.$se],
							["this.TempCameraLength", this.Xse],
							["this.LineHitState", this.LineHitState],
						));
		}
	}
	pae() {
		this.bse.NearCollisionProbeSize <= this.bse.CollisionProbeSize
			? Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Character",
					23,
					"CollisionSize数据错误 :NearCollisionProbeSize > this.CollisionProbeSize ",
				)
			: ((this.CurrentCollisionDifferenceSize =
					this.bse.NearCollisionProbeSize - this.bse.CollisionProbeSize),
				(this.CurrentInputSpeedPercentage =
					this.bse.CameraInputController.InputSpeedPercentage /
					this.bse.CollisionSizePercentage),
				(this.CurrentInputSpeedPercentage = MathUtils_1.MathUtils.Clamp(
					this.CurrentInputSpeedPercentage,
					0,
					1,
				)),
				(this.bse.CurrentCollisionSize =
					this.CurrentCollisionDifferenceSize *
						this.CurrentInputSpeedPercentage +
					this.bse.CollisionProbeSize),
				(this.bse.CurrentCollisionSize = MathUtils_1.MathUtils.Clamp(
					this.bse.CurrentCollisionSize,
					this.bse.CurrentCollisionSize,
					this.bse.NearCollisionProbeSize,
				)),
				(3 !== this.CurrentSpringBlendState &&
					2 !== this.CurrentSpringBlendState &&
					1 !== this.CurrentSpringBlendState) ||
					(this.bse.CurrentCollisionSize = this.bse.NearCollisionProbeSize));
	}
	SetCharacter(e) {
		this.kse.ActorsToIgnore.Add(e),
			this.Fse.ActorsToIgnore.Add(e),
			this.Vse.ActorsToIgnore.Add(e),
			this.Hse.ActorsToIgnore.Add(e),
			this.jse.ActorsToIgnore.Add(e);
	}
	InitTraceElements() {
		(this.kse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.kse.bIsSingle = !0),
			(this.kse.bIgnoreSelf = !0),
			(this.kse.bTraceComplex = !0),
			this.kse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
			(this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Fse.bIsSingle = !0),
			(this.Fse.bIgnoreSelf = !0),
			(this.Fse.bTraceComplex = !0),
			this.sae && ((this.Fse.DrawTime = 5), this.Fse.SetDrawDebugTrace(1)),
			this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
			(this.Vse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Vse.bIsSingle = !0),
			(this.Vse.bIgnoreSelf = !0),
			(this.Vse.bTraceComplex = !0),
			this.sae && ((this.Vse.DrawTime = 5), this.Vse.SetDrawDebugTrace(1)),
			this.Vse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
			(this.Hse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.Hse.bIsSingle = !0),
			(this.Hse.bIgnoreSelf = !0),
			(this.Hse.bTraceComplex = !0),
			this.sae && ((this.Hse.DrawTime = 5), this.Hse.SetDrawDebugTrace(1)),
			this.Hse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
			(this.jse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
			(this.jse.bIsSingle = !0),
			(this.jse.bIgnoreSelf = !0),
			(this.jse.bTraceComplex = !0),
			this.sae && ((this.jse.DrawTime = 5), this.jse.SetDrawDebugTrace(1)),
			this.jse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
	}
	ResetBlendData() {
		(this.CurrentSpringBlendState = 4),
			(this.$se = 0),
			(this.LineHitState = 0),
			this.sae &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Character",
					23,
					"重置数据",
					["this.CurrentSpringBlendState", this.CurrentSpringBlendState],
					["this.TempAddCameraLength", this.$se],
					["this.TempCameraLength", this.Xse],
					["this.LineHitState", this.LineHitState],
				);
	}
	DrawCube(e, t, i) {
		var s, a, r;
		e &&
			((i = new UE.LinearColor(i, i, i, i)),
			(r = e.GetLocation()),
			(s = new UE.Vector(10, 10, 10)),
			(s = new UE.Vector(0.5 * s.X, 0.5 * s.Y, 0.5 * s.Z)),
			(a = e.Rotator()),
			UE.KismetSystemLibrary.DrawDebugBox(
				GlobalData_1.GlobalData.World,
				r,
				s,
				i,
				a,
				t,
				30,
			),
			(r = UE.KismetMathLibrary.TransformLocation(
				e,
				new UE.Vector(0.5, 0.5, 0.5),
			)),
			(s = UE.KismetMathLibrary.TransformLocation(
				e,
				new UE.Vector(-0.5, -0.5, -0.5),
			)),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.World,
				r,
				s,
				i,
				t,
				15,
			),
			(a = UE.KismetMathLibrary.TransformLocation(
				e,
				new UE.Vector(0.5, -0.5, 0.5),
			)),
			(r = UE.KismetMathLibrary.TransformLocation(
				e,
				new UE.Vector(-0.5, 0.5, 0.5),
			)),
			UE.KismetSystemLibrary.DrawDebugLine(
				GlobalData_1.GlobalData.World,
				a,
				r,
				i,
				t,
				15,
			));
	}
}
exports.CameraBlend = CameraBlend;
