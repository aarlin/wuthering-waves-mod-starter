"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AreaAtmosphere = exports.AreaAtmosphereActorInfo = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class AreaAtmosphereActorInfo {
	constructor() {
		(this.AreaAtmosphereInfo = void 0),
			(this.Actor = void 0),
			(this.KuroPostProcessComponent = void 0),
			(this.TargetBlendWeight = 0),
			(this.CurBlendWeight = 0),
			(this.ChangeSpeed = 0),
			(this.IsLoadCompleted = !1);
	}
	Clear() {
		(this.AreaAtmosphereInfo = void 0),
			this.Actor && ActorSystem_1.ActorSystem.Put(this.Actor),
			(this.Actor = void 0),
			(this.KuroPostProcessComponent = void 0);
	}
}
exports.AreaAtmosphereActorInfo = AreaAtmosphereActorInfo;
class AreaAtmosphere {
	constructor() {
		(this.RHe = void 0),
			(this.UHe = void 0),
			(this.uMe = () => {
				this.AHe();
			}),
			(this.nye = () => {
				this.PHe();
			}),
			(this.PHe = () => {
				if (
					(this.RHe && (this.RHe.TargetBlendWeight = 0),
					(t = ModelManager_1.ModelManager.AreaModel.AreaInfo))
				) {
					let o = t.AtmosphereId;
					if (0 === o) {
						if (0 === t.Father) return;
						if (
							!(t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(
								t.Father,
							)) ||
							0 === t.AtmosphereId
						)
							return;
						o = t.AtmosphereId;
					}
					var e, t;
					(t =
						ConfigManager_1.ConfigManager.AreaConfig.GetAreaAtmosphereInfo(
							o,
						)) &&
						(this.RHe
							? this.RHe.AreaAtmosphereInfo.Id === t.Id
								? ((this.RHe.TargetBlendWeight = 1),
									this.Z0e(this.RHe, 0),
									this.xHe())
								: this.UHe
									? ((e = this.UHe),
										(this.UHe = this.RHe),
										(this.RHe = e),
										this.RHe.AreaAtmosphereInfo.Id === t.Id
											? ((this.RHe.TargetBlendWeight = 1),
												this.Z0e(this.RHe, 0),
												this.xHe())
											: (this.wHe(t), this.BHe()))
									: ((this.UHe = this.RHe),
										(this.RHe = new AreaAtmosphereActorInfo()),
										this.wHe(t),
										this.bHe())
							: ((this.RHe = new AreaAtmosphereActorInfo()),
								this.wHe(t),
								this.bHe()));
				}
			}),
			this.AU();
	}
	AU() {
		this.dde();
	}
	Destroy() {
		this.Cde(), this.AHe();
	}
	AHe() {
		this.RHe && (this.RHe.Clear(), (this.RHe = void 0)),
			this.UHe && (this.UHe.Clear(), (this.UHe = void 0));
	}
	OnTick(e) {
		this.Z0e(this.RHe, e), this.Z0e(this.UHe, e);
	}
	Z0e(e, t) {
		if (e && e.IsLoadCompleted && e.CurBlendWeight !== e.TargetBlendWeight) {
			var o = e.CurBlendWeight;
			if (0 === e.ChangeSpeed) e.CurBlendWeight = e.TargetBlendWeight;
			else {
				if (!(0 < t)) return;
				e.TargetBlendWeight > e.CurBlendWeight
					? ((e.CurBlendWeight = e.CurBlendWeight + t * e.ChangeSpeed),
						(e.CurBlendWeight = Math.min(
							e.CurBlendWeight,
							e.TargetBlendWeight,
						)))
					: ((e.CurBlendWeight = e.CurBlendWeight - t * e.ChangeSpeed),
						(e.CurBlendWeight = Math.max(
							e.CurBlendWeight,
							e.TargetBlendWeight,
						)));
			}
			(e.KuroPostProcessComponent.BlendWeight = e.CurBlendWeight),
				0 === o &&
					0 < e.CurBlendWeight &&
					((e.KuroPostProcessComponent.bEnabled = !0),
					Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug(
						"Area",
						18,
						"区域氛围开启",
						["id", e.AreaAtmosphereInfo.Id],
						["DA", e.AreaAtmosphereInfo.DAPath],
					),
				0 < o &&
					0 === e.CurBlendWeight &&
					((e.KuroPostProcessComponent.bEnabled = !1),
					Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug(
						"Area",
						18,
						"区域氛围关闭",
						["id", e.AreaAtmosphereInfo.Id],
						["DA", e.AreaAtmosphereInfo.DAPath],
					);
		}
	}
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ClearWorld,
			this.uMe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeArea,
				this.PHe,
			);
	}
	Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ClearWorld,
			this.uMe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeArea,
				this.PHe,
			);
	}
	wHe(e) {
		0 < (this.RHe.AreaAtmosphereInfo = e).FadeTime
			? (this.RHe.ChangeSpeed =
					1 / (e.FadeTime * TimeUtil_1.TimeUtil.InverseMillisecond))
			: (this.RHe.ChangeSpeed = 0);
	}
	xHe() {
		this.RHe &&
			this.RHe.Actor?.IsValid() &&
			Global_1.Global.BaseCharacter &&
			this.RHe.Actor.K2_SetActorLocation(
				Global_1.Global.BaseCharacter.K2_GetActorLocation(),
				!1,
				void 0,
				!0,
			);
	}
	bHe() {
		let e;
		e = Global_1.Global.BaseCharacter
			? Global_1.Global.BaseCharacter.GetTransform()
			: new UE.Transform();
		var t = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e),
			o =
				(GlobalData_1.GlobalData.IsPlayInEditor &&
					t.SetActorLabel("AreaAtmosphere"),
				t.AddComponentByClass(
					UE.KuroPostProcessComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!1,
				));
		(o.bUnbound = !0),
			(o.BlendWeight = 0),
			(o.bEnabled = !1),
			(this.RHe.Actor = t),
			(this.RHe.KuroPostProcessComponent = o),
			(this.RHe.TargetBlendWeight = 1),
			(this.RHe.CurBlendWeight = 0),
			(this.RHe.IsLoadCompleted = !1),
			this.qHe();
	}
	BHe() {
		var e = this.RHe.KuroPostProcessComponent;
		(this.RHe.TargetBlendWeight = 1),
			(this.RHe.CurBlendWeight = 0),
			(this.RHe.IsLoadCompleted = !1),
			(e.PPTODDataAsset = void 0),
			(e.WeatherDataAsset = void 0),
			(e.BlendWeight = 0),
			(e.bEnabled = !1),
			this.xHe(),
			this.qHe();
	}
	qHe() {
		const e = this.RHe.AreaAtmosphereInfo,
			t = this.RHe.KuroPostProcessComponent;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Area",
				18,
				"开始加载区域氛围",
				["id", e.Id],
				["DA", e.DAPath],
			),
			e.IsTOD
				? ResourceSystem_1.ResourceSystem.LoadAsync(
						e.DAPath,
						UE.KuroTODData,
						(o) => {
							o?.IsValid() &&
								this.RHe.AreaAtmosphereInfo.Id === e.Id &&
								((this.RHe.IsLoadCompleted = !0),
								(t.PPTODDataAsset = o),
								t.SetPriority(e.Priority),
								this.Z0e(this.RHe, 0),
								Log_1.Log.CheckDebug()) &&
								Log_1.Log.Debug(
									"Area",
									18,
									"加载氛围资源成功",
									["id", e.Id],
									["DA", e.DAPath],
								);
						},
					)
				: ResourceSystem_1.ResourceSystem.LoadAsync(
						e.DAPath,
						UE.KuroWeatherDataAsset,
						(o) => {
							o?.IsValid() &&
								this.RHe.AreaAtmosphereInfo.Id === e.Id &&
								((this.RHe.IsLoadCompleted = !0),
								(t.WeatherDataAsset = o),
								t.SetPriority(e.Priority),
								this.Z0e(this.RHe, 0),
								Log_1.Log.CheckDebug()) &&
								Log_1.Log.Debug(
									"Area",
									18,
									"加载氛围资源成功",
									["id", e.Id],
									["DA", e.DAPath],
								);
						},
					);
	}
}
exports.AreaAtmosphere = AreaAtmosphere;
