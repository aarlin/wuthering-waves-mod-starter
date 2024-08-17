"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotWeather = exports.PlotWeatherActorInfo = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	WeatherController_1 = require("../Weather/WeatherController"),
	PLOT_WEATHER_PRIORITY = 100;
class PlotWeatherActorInfo {
	constructor() {
		(this.WeatherConfig = void 0),
			(this.Actor = void 0),
			(this.KuroPostProcessComponent = void 0),
			(this.TargetBlendWeight = 0),
			(this.CurBlendWeight = 0),
			(this.ChangeSpeed = 0),
			(this.Priority = 0),
			(this.IsLoadCompleted = !1);
	}
	Disable() {
		this.WeatherConfig &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Plot",
					18,
					"停止剧情天气",
					["id", this.WeatherConfig.Id],
					["DA", this.WeatherConfig.DAPath],
				),
			(this.WeatherConfig = void 0),
			this.KuroPostProcessComponent?.IsValid() &&
				(this.KuroPostProcessComponent.bEnabled = !1),
			(this.IsLoadCompleted = !1),
			(this.CurBlendWeight = 0),
			(this.IsLoadCompleted = !1));
	}
	Destroy() {
		(this.WeatherConfig = void 0),
			this.Actor?.IsValid() &&
				(ActorSystem_1.ActorSystem.Put(this.Actor), (this.Actor = void 0)),
			(this.KuroPostProcessComponent = void 0);
	}
}
exports.PlotWeatherActorInfo = PlotWeatherActorInfo;
class PlotWeather {
	constructor() {
		(this.Heo = 0), (this.Uk = !1), (this.RHe = void 0), (this.UHe = void 0);
	}
	Init() {
		(this.Heo = 0), (this.Uk = !1);
	}
	Clear() {
		(this.Heo = 0), (this.Uk = !1), this.jeo();
	}
	OnPlotEnd() {
		this.Uk &&
			((this.Uk = !1),
			WeatherController_1.WeatherController.RequestChangeWeather(this.Heo)),
			this.jeo();
	}
	StopAllWeather() {
		this.Uk && (this.RHe?.Disable(), this.UHe?.Disable());
	}
	jeo() {
		this.RHe?.Destroy(),
			(this.RHe = void 0),
			this.UHe?.Destroy(),
			(this.UHe = void 0);
	}
	OnTick(e) {
		this.Z0e(this.UHe, e), this.Z0e(this.RHe, e);
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
						"Plot",
						18,
						"剧情天气开始",
						["id", e.WeatherConfig.Id],
						["DA", e.WeatherConfig.DAPath],
					),
				0 < o &&
					0 === e.CurBlendWeight &&
					((e.KuroPostProcessComponent.bEnabled = !1),
					Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug(
						"Plot",
						18,
						"剧情天气结束",
						["id", e.WeatherConfig.Id],
						["DA", e.WeatherConfig.DAPath],
					);
		}
	}
	ChangeWeather(e, t, o, i = 100) {
		(this.Heo = e),
			(this.Uk = t),
			this.RHe && (this.RHe.TargetBlendWeight = 0),
			(t =
				ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherConfig(
					e,
				)) &&
				(this.RHe
					? this.RHe.WeatherConfig?.Id === t.Id
						? ((this.RHe.TargetBlendWeight = 1),
							this.Z0e(this.RHe, 0),
							this.xHe(),
							this.Weo(t, o),
							this.Keo(i))
						: this.UHe
							? ((e = this.UHe),
								(this.UHe = this.RHe),
								(this.RHe = e),
								this.RHe.WeatherConfig?.Id === t.Id
									? ((this.RHe.TargetBlendWeight = 1),
										this.Z0e(this.RHe, 0),
										this.xHe(),
										this.Weo(t, o))
									: (this.Weo(t, o), this.BHe()),
								this.Keo(i))
							: ((this.UHe = this.RHe),
								(this.RHe = new PlotWeatherActorInfo()),
								this.Weo(t, o),
								this.Keo(i),
								this.Qeo())
					: ((this.RHe = new PlotWeatherActorInfo()),
						this.Weo(t, o),
						this.Keo(i),
						this.Qeo()));
	}
	Weo(e, t) {
		(this.RHe.WeatherConfig = e),
			(this.RHe.ChangeSpeed =
				0 < t ? 1 / (t * TimeUtil_1.TimeUtil.InverseMillisecond) : 0),
			this.UHe && (this.UHe.ChangeSpeed = this.RHe.ChangeSpeed);
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
	Qeo() {
		let e;
		e = Global_1.Global.BaseCharacter
			? Global_1.Global.BaseCharacter.GetTransform()
			: new UE.Transform();
		var t = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e),
			o = t.AddComponentByClass(
				UE.KuroPostProcessComponent.StaticClass(),
				!1,
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
			);
		GlobalData_1.GlobalData.IsPlayInEditor &&
			t.SetActorLabel("PlotWeatherActor"),
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
		const e = this.RHe.WeatherConfig,
			t =
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Plot",
						18,
						"加载剧情天气",
						["id", e.Id],
						["DA", e.DAPath],
					),
				this.RHe.KuroPostProcessComponent);
		ResourceSystem_1.ResourceSystem.LoadAsync(
			e.DAPath,
			UE.KuroWeatherDataAsset,
			(o) => {
				o?.IsValid() &&
					this.RHe.WeatherConfig?.Id === e.Id &&
					((t.WeatherDataAsset = o),
					t.SetPriority(this.RHe.Priority),
					(this.RHe.IsLoadCompleted = !0),
					this.Z0e(this.RHe, 0));
			},
		);
	}
	Keo(e) {
		this.RHe &&
			this.RHe.Priority !== e &&
			((this.RHe.Priority = e), this.RHe.IsLoadCompleted) &&
			this.RHe.KuroPostProcessComponent?.IsValid() &&
			this.RHe.KuroPostProcessComponent.SetPriority(e);
	}
}
exports.PlotWeather = PlotWeather;
