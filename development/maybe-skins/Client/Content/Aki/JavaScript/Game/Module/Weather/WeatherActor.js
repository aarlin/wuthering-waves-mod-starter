"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeatherActor = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class WeatherActor {
	constructor() {
		(this.bOo = void 0),
			(this.qOo = void 0),
			(this.GOo = void 0),
			(this.NOo = 0),
			(this.OOo = 0),
			(this.kOo = 0),
			(this.FOo = 0),
			(this.Uqe = -0),
			(this.VOo = -0),
			(this.HOo = !1),
			(this.Rqe = TickSystem_1.TickSystem.InvalidId),
			(this.Mke = !1),
			(this.LVs = 0),
			(this.J_ = () => {
				this.Uqe += Time_1.Time.DeltaTime;
				var t = this.Uqe / (1e3 * this.VOo),
					s = MathUtils_1.MathUtils.Lerp(this.NOo, this.kOo, t),
					e = MathUtils_1.MathUtils.Lerp(this.OOo, this.FOo, t);
				this.jOo(s), this.WOo(e), 1 <= t && this.jm();
			}),
			(this.jOo = (t) => {
				this.qOo?.IsValid() && (this.qOo.BlendWeight = t);
			}),
			(this.WOo = (t) => {
				this.GOo?.IsValid() && (this.GOo.BlendWeight = t);
			}),
			(this.n8e = () => {
				this.jm(),
					(this.qOo = void 0),
					(this.GOo = void 0),
					(this.bOo = void 0);
			});
	}
	KOo() {
		this.bOo?.IsValid() ||
			((this.bOo = ActorSystem_1.ActorSystem.Get(
				UE.BP_Weather_C.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
				void 0,
			)),
			this.bOo.OnDestroyed.Add(this.n8e));
	}
	BanWeather() {
		this.Destroy(), (this.HOo = !this.HOo);
	}
	SetActorState(t) {
		this.Mke !== t &&
			(this.bOo?.IsValid() && this.bOo.SetActorHiddenInGame(!t),
			(this.Mke = t));
	}
	DVs() {
		0 !== this.LVs &&
			(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.LVs),
			(this.LVs = 0));
	}
	ChangeWeather(t, s) {
		var e;
		this.jm(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Weather",
					28,
					"改变天气",
					["targetId", t],
					["tweentime", s],
				),
			this.HOo ||
				((t =
					ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherConfig(
						t,
					)) &&
					((t = t.DAPath),
					this.KOo(),
					(e = this.bOo).KuroPostProcess_1.BlendWeight >=
					e.KuroPostProcess_2.BlendWeight
						? ((this.qOo = e.KuroPostProcess_1),
							(this.GOo = e.KuroPostProcess_2))
						: ((this.qOo = e.KuroPostProcess_2),
							(this.GOo = e.KuroPostProcess_1)),
					this.DVs(),
					(this.LVs = ResourceSystem_1.ResourceSystem.LoadAsync(
						t,
						UE.KuroWeatherDataAsset,
						(t) => {
							t?.IsValid() &&
								this.GOo?.IsValid() &&
								((this.LVs = 0), (this.GOo.WeatherDataAsset = t));
						},
					)),
					0 === s
						? (this.jOo(0), this.WOo(1))
						: ((this.NOo = this.qOo.BlendWeight),
							(this.kOo = 0),
							(this.OOo = this.GOo.BlendWeight),
							(this.FOo = 1),
							(this.VOo = s),
							(this.Uqe = 0),
							(this.Rqe = TickSystem_1.TickSystem.Add(
								this.J_,
								"WeatherActor",
							).Id))));
	}
	jm() {
		this.Rqe !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.Rqe),
			(this.Rqe = TickSystem_1.TickSystem.InvalidId));
	}
	Destroy() {
		this.bOo?.IsValid() && this.bOo.K2_DestroyActor(),
			(this.Mke = !1),
			(this.bOo = void 0);
	}
}
exports.WeatherActor = WeatherActor;
