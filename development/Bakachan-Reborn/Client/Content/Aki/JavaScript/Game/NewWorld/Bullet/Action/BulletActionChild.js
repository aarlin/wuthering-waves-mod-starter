"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionChild = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	BulletController_1 = require("../BulletController"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletChildInfo_1 = require("../Model/BulletChildInfo"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionChild extends BulletActionBase_1.BulletActionBase {
	constructor() {
		super(...arguments), (this.ChildInfo = void 0), (this.U4o = void 0);
	}
	OnExecute() {
		(this.ChildInfo = new BulletChildInfo_1.BulletChildInfo()),
			(this.BulletInfo.ChildInfo = this.ChildInfo),
			(this.ChildInfo.HaveSummonedBulletNumber = []),
			(this.U4o = this.BulletInfo.BulletDataMain.Children);
		var e = this.U4o.length;
		for (let l = 0; l < e; l++) this.ChildInfo.HaveSummonedBulletNumber.push(0);
		this.A4o();
	}
	Clear() {
		super.Clear(), (this.ChildInfo = void 0), (this.U4o = void 0);
	}
	A4o() {
		for (const e of this.U4o)
			if (2 === e.Condition)
				return void (this.ChildInfo.HaveSpecialChildrenBullet = !0);
	}
	OnTick(e) {
		this.BulletInfo.NeedDestroy || this.P4o();
	}
	P4o() {
		var e = this.U4o.length;
		for (let i = 0; i < e; ++i) {
			var l = this.U4o[i],
				t = i;
			if (
				!(
					l.RowName <= MathCommon_1.MathCommon.KindaSmallNumber ||
					0 !== l.Condition ||
					(0 < l.Num &&
						!(this.ChildInfo.HaveSummonedBulletNumber[t] < l.Num)) ||
					(l.Delay < 0 &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error("Bullet", 21, "子弹Delay为负数！"),
					this.BulletInfo.LiveTime <
						l.Delay * TimeUtil_1.TimeUtil.InverseMillisecond +
							this.ChildInfo.HaveSummonedBulletNumber[t] *
								l.Interval *
								TimeUtil_1.TimeUtil.InverseMillisecond)
				)
			) {
				var o = BulletController_1.BulletController.CreateBulletCustomTarget(
					this.BulletInfo.AttackerActorComp.Actor,
					l.RowName.toString(),
					this.BulletInfo.ActorComponent.ActorTransform,
					{
						SkillId: this.BulletInfo.BulletInitParams.SkillId,
						ParentTargetId: this.BulletInfo.Target?.Id,
						ParentId: this.BulletInfo.Entity.Id,
						DtType: this.BulletInfo.BulletInitParams.DtType,
					},
					this.BulletInfo.ContextId,
				);
				if (o)
					BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
						this.BulletInfo,
						o,
					),
						this.ChildInfo.HaveSummonedBulletNumber[t]++;
				else if (l.BreakOnFail) return;
			}
		}
	}
}
exports.BulletActionChild = BulletActionChild;
