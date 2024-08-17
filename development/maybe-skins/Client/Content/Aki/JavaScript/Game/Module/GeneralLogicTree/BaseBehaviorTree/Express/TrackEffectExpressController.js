"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackEffectExpressController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	PROFILE_KEY = "TrackedMark_CreateTrackEffect",
	OFFSET_Z = 1e3;
class TrackEffectExpressController {
	constructor(t) {
		(this.OKt = void 0),
			(this.kKt = void 0),
			(this.OnBattleViewActive = () => {
				if (this.kKt) for (var [, t] of this.kKt) t.OnBattleViewActive();
			}),
			(this.OnBattleViewHide = () => {
				if (this.kKt) for (var [, t] of this.kKt) t.OnBattleViewHide();
			}),
			(this.OKt = t),
			(this.kKt = new Map());
	}
	Clear() {
		if (this.kKt) {
			for (var [, t] of this.kKt) t.Destroy();
			this.kKt.clear();
		}
		this.OKt = void 0;
	}
	EnableTrack(t) {
		if (this.kKt) for (var [, e] of this.kKt) t ? e.Start() : e.End();
	}
	NodeTrackEffectStart(t, e, i) {
		(t = this.FKt(t, e)), i && t.Start();
	}
	NodeTrackEffectEnd(t) {
		this.GetNodeTrackMarkCreator(t)?.End(), this.kKt.delete(t);
	}
	FKt(t, e) {
		var i = this.GetNodeTrackMarkCreator(t);
		return (
			i || ((i = new NodeTrackEffect(this.OKt, t, e)), this.kKt.set(t, i), i)
		);
	}
	GetNodeTrackMarkCreator(t) {
		return this.kKt.get(t);
	}
	UpdateTrackEffectExpression(t, e) {
		e === Protocol_1.Aki.Protocol.N2s.Proto_Destroy &&
			(this.GetNodeTrackMarkCreator(t)?.Destroy(), this.kKt.delete(t));
	}
	OnBtApplyExpressionOccupation(t) {
		if (!t) for (var [, e] of this.kKt) e.OnExpressOccupied();
	}
	OnBtReleaseExpressionOccupation(t) {
		if (!t) for (var [, e] of this.kKt) e.OnExpressOccupationRelease();
	}
}
exports.TrackEffectExpressController = TrackEffectExpressController;
class NodeTrackEffect {
	constructor(t, e, i) {
		(this.OKt = void 0),
			(this.b_t = 0),
			(this.VKt = 0),
			(this.HKt = 0),
			(this.jKt = 0),
			(this.WKt = 0),
			(this.Wse = void 0),
			(this.j3 = void 0),
			(this.KKt = 0),
			(this.QKt = !1),
			(this.sdt = !1),
			(this.OnBattleViewActive = () => {
				var t = this.OKt.GetTrackDistance(this.b_t);
				(this.QKt = t < this.jKt),
					this.XKt(this.VKt, !this.QKt),
					this.XKt(this.HKt, this.QKt),
					this.j3 && this.j3.IsPause() && this.j3.Resume();
			}),
			(this.OnBattleViewHide = () => {
				this.Mct(), this.j3 && !this.j3.IsPause() && this.j3.Pause();
			}),
			(this.$Kt = () => {
				var t;
				this.sdt || (t = this.OKt.GetTrackDistance(this.b_t)) <= 0
					? this.Mct()
					: (!this.QKt &&
							t < this.jKt &&
							((this.QKt = !0), this.XKt(this.VKt, !1), this.XKt(this.HKt, !0)),
						this.QKt &&
							t >= this.WKt &&
							((this.QKt = !1),
							this.XKt(this.VKt, !0),
							this.XKt(this.HKt, !1)));
			}),
			NodeTrackEffect.uoe || NodeTrackEffect.gct(),
			(this.b_t = e),
			(this.OKt = t),
			(this.jKt = i.EnterRange),
			(this.WKt = i.LeaveRange),
			(this.Wse = Vector_1.Vector.Create());
	}
	Destroy() {
		this.End(), (this.OKt = void 0);
	}
	static gct() {
		var t = UE.NewObject(UE.TraceLineElement.StaticClass());
		(t.WorldContextObject = GlobalData_1.GlobalData.World),
			(t.bIsSingle = !0),
			t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
			(NodeTrackEffect.uoe = t);
	}
	Start() {
		(this.QKt = void 0), (this.KKt = 0);
		var t,
			e,
			i =
				ConfigManager_1.ConfigManager.QuestNewConfig.GetTrackEffectPath(
					"LongLightBeam",
				);
		StringUtils_1.StringUtils.IsEmpty(i)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("GeneralLogicTree", 19, "找不到追踪特效配置路径", [
					"trackEffectType",
					"LongLightBeam",
				])
			: ((t =
					ConfigManager_1.ConfigManager.QuestNewConfig.GetTrackEffectPath(
						"ShortLightBeam",
					)),
				StringUtils_1.StringUtils.IsEmpty(t)
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error("GeneralLogicTree", 19, "找不到追踪特效配置路径", [
							"trackEffectType",
							"ShortLightBeam",
						])
					: (e = this.OKt.GetNodeTrackPosition(this.b_t))
						? ((this.VKt = this.vct("LongLightBeam", i, e)),
							(this.HKt = this.vct("ShortLightBeam", t, e)))
						: Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GeneralLogicTree",
								19,
								"找不到追踪位置",
								["trackEffectType", "ShortLightBeam"],
								["nodeId", this.b_t],
							));
	}
	End() {
		TimerSystem_1.TimerSystem.Has(this.j3) &&
			TimerSystem_1.TimerSystem.Remove(this.j3),
			(this.j3 = void 0),
			EffectSystem_1.EffectSystem.IsValid(this.VKt) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.VKt,
					"[TrackEffectExpress.End]",
					!0,
				),
			(this.VKt = 0),
			EffectSystem_1.EffectSystem.IsValid(this.HKt) &&
				EffectSystem_1.EffectSystem.StopEffectById(
					this.HKt,
					"[TrackEffectExpress.End]",
					!0,
				),
			(this.HKt = 0);
	}
	vct(t, e, i) {
		var r = NodeTrackEffect.uoe;
		TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, i),
			r.SetEndLocation(i.X, i.Y, i.Z + 1e3),
			this.Wse.FromUeVector(i),
			(i = TraceElementCommon_1.TraceElementCommon.LineTrace(r, PROFILE_KEY)),
			(r = r.HitResult),
			i && r.bBlockingHit && (this.Wse.Z = r.LocationZ_Array.Get(0)),
			(this.Wse.Z -= 5),
			(i = EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				new UE.Transform(
					Rotator_1.Rotator.ZeroRotator,
					this.Wse.ToUeVector(),
					Vector_1.Vector.OneVector,
				),
				e,
				"[TrackEffectExpress.CreateTrackEffect]",
				void 0,
				3,
				void 0,
				(e, i) => {
					5 === e && this.YKt(t, i ?? 0);
				},
			));
		return i;
	}
	YKt(t, e) {
		EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(
			e,
			() => void 0 !== this.OKt,
		);
		var i = this.OKt.GetTrackDistance(this.b_t);
		(this.QKt = i < this.jKt),
			(i = "LongLightBeam" === t ? !this.QKt : this.QKt);
		this.XKt(e, i),
			this.KKt++,
			2 === this.KKt &&
				(this.j3 = TimerSystem_1.TimerSystem.Forever(this.$Kt, 1e3));
	}
	Mct() {
		this.XKt(this.VKt, !1), this.XKt(this.HKt, !1);
	}
	XKt(t, e) {
		EffectSystem_1.EffectSystem.GetEffectActor(t)?.SetActorHiddenInGame(!e);
	}
	OnExpressOccupied() {
		this.sdt = !0;
	}
	OnExpressOccupationRelease() {
		this.sdt = !1;
	}
}
NodeTrackEffect.uoe = void 0;
