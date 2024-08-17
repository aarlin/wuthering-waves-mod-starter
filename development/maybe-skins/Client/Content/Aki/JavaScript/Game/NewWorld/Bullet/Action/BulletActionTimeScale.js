"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionTimeScale = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
	PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PawnTimeScaleComponent_1 = require("../../Pawn/Component/PawnTimeScaleComponent"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionTimeScale extends BulletActionBase_1.BulletActionBase {
	constructor() {
		super(...arguments), (this.V5o = -0), (this.H5o = void 0), (this.j5o = -0);
	}
	OnExecute() {
		if (this.BulletInfo.BulletDataMain.TimeScale.TimeScaleWithAttacker)
			this.H5o = this.BulletInfo.Attacker.GetComponent(107);
		else {
			(this.BulletInfo.TimeScaleList = new PriorityQueue_1.PriorityQueue(
				PawnTimeScaleComponent_1.PawnTimeScaleComponent.CompareScalePriority,
			)),
				(this.BulletInfo.TimeScaleMap = new Map()),
				(this.BulletInfo.TimeScaleId = 1);
			var e = Time_1.Time.WorldTimeSeconds,
				t = ModelManager_1.ModelManager.BulletModel.PersistentTimeScaleMap;
			for (const o of t.values()) {
				var i = e - o.StartTime;
				if (i >= o.Duration) t.delete(o.TimeScaleId);
				else {
					if (o.CenterLocation) {
						var l = this.BulletInfo.CollisionInfo.LastFramePosition;
						if (!l) continue;
						if (
							Math.abs(l.X - o.CenterLocation.X) > o.Radius ||
							Math.abs(l.Y - o.CenterLocation.Y) > o.Radius ||
							Math.abs(l.Z - o.CenterLocation.Z) > o.Radius
						)
							continue;
					}
					BulletUtil_1.BulletUtil.SetTimeScale(
						this.BulletInfo,
						o.Priority,
						o.TimeDilation,
						o.Curve,
						o.Duration,
						o.SourceType,
						i,
						o.TimeScaleId,
					);
				}
			}
		}
	}
	OnTick(e) {
		var t,
			i = this.BulletInfo.Entity.TimeDilation;
		if (this.BulletInfo.BulletDataMain.TimeScale.TimeScaleWithAttacker)
			return (
				(t = this.H5o),
				(this.V5o = t.Active ? t.CurrentTimeScale : 1),
				this.j5o === this.V5o
					? void 0
					: ((this.j5o = this.V5o),
						(this.BulletInfo.Actor.CustomTimeDilation = this.V5o),
						void BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(
							this.BulletInfo.EffectInfo,
							this.V5o * i,
						))
			);
		for (
			var l = Time_1.Time.WorldTimeSeconds;
			!this.BulletInfo.TimeScaleList.Empty &&
			(this.BulletInfo.TimeScaleList.Top.EndTime <= l ||
				this.BulletInfo.TimeScaleList.Top.MarkDelete);
		) {
			var o = this.BulletInfo.TimeScaleList.Pop();
			this.BulletInfo.TimeScaleMap.delete(o.Id);
		}
		this.BulletInfo.TimeScaleList.Empty
			? (this.V5o = 1)
			: (this.V5o = this.BulletInfo.TimeScaleList.Top.CalculateTimeScale()),
			(i *= this.V5o),
			this.j5o !== i &&
				((this.j5o = i),
				(this.BulletInfo.Actor.CustomTimeDilation = this.V5o),
				BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(
					this.BulletInfo.EffectInfo,
					i,
				));
	}
	Clear() {
		super.Clear(), (this.V5o = 0), (this.H5o = void 0), (this.j5o = 0);
	}
}
exports.BulletActionTimeScale = BulletActionTimeScale;
