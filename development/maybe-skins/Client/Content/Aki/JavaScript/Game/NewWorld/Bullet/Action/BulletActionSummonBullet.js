"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionSummonBullet = void 0);
const TimeUtil_1 = require("../../../Common/TimeUtil"),
	BulletController_1 = require("../BulletController"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletPool_1 = require("../Model/BulletPool"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSummonBullet extends BulletActionBase_1.BulletActionBase {
	constructor() {
		super(...arguments), (this.ChildInfo = void 0), (this.U4o = void 0);
	}
	OnExecute() {
		var t;
		(this.ChildInfo = this.BulletInfo.ChildInfo),
			this.ChildInfo &&
				((this.U4o = this.BulletInfo.BulletDataMain.Children),
				(t = this.ActionInfo).IsStayInCharacter ? this.k5o(t) : this.F5o(t));
	}
	Clear() {
		super.Clear(), (this.ChildInfo = void 0), (this.U4o = void 0);
	}
	F5o(t) {
		var e = this.U4o,
			l = e.length;
		let o;
		for (let s = 0; s < l; ++s)
			if (e[s].Condition === t.ChildrenType) {
				var i = e[s];
				if (
					(!(0 < i.Num) ||
						this.ChildInfo.HaveSummonedBulletNumber[s] < i.Num) &&
					0 !== Number(i.RowName)
				) {
					!o &&
						t.ParentImpactPoint &&
						t.ParentLastPosition &&
						((r = BulletPool_1.BulletPool.CreateVector()),
						(n = BulletPool_1.BulletPool.CreateVector()),
						r.FromUeVector(t.ParentImpactPoint),
						r.SubtractionEqual(t.ParentLastPosition),
						n.FromUeVector(this.BulletInfo.MoveInfo.BulletSpeedDir),
						n.Normalize(),
						(u = r.DotProduct(n)),
						n.Multiply(u, r),
						t.ParentLastPosition.Addition(r, n),
						(o = this.BulletInfo.ActorComponent.ActorTransform).SetLocation(
							n.ToUeVector(),
						),
						BulletPool_1.BulletPool.RecycleVector(n),
						BulletPool_1.BulletPool.RecycleVector(r));
					var r,
						n,
						u = BulletController_1.BulletController.CreateBulletCustomTarget(
							this.BulletInfo.AttackerActorComp.Actor,
							i.RowName.toString(),
							o ?? this.BulletInfo.ActorComponent.ActorTransform,
							{
								SkillId: this.BulletInfo.BulletInitParams.SkillId,
								ParentVictimId: t.Victim?.Id,
								ParentTargetId: this.BulletInfo.Target?.Id,
								ParentId: this.BulletInfo.Entity.Id,
								DtType: this.BulletInfo.BulletInitParams.DtType,
							},
							this.BulletInfo.ContextId,
						);
					if (u)
						BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
							this.BulletInfo,
							u,
						),
							this.ChildInfo.HaveSummonedBulletNumber[s]++;
					else if (i.BreakOnFail) return;
				}
			}
	}
	k5o(t) {
		var e = this.U4o.length;
		for (let r = 0; r < e; ++r) {
			var l = this.U4o[r],
				o = r;
			if (
				5 === l.Condition &&
				!(
					(0 < l.Num &&
						!(this.ChildInfo.HaveSummonedBulletNumber[o] < l.Num)) ||
					this.BulletInfo.LiveTime <
						this.ChildInfo.HaveSummonedBulletNumber[o] *
							l.Interval *
							TimeUtil_1.TimeUtil.InverseMillisecond
				)
			) {
				var i = BulletController_1.BulletController.CreateBulletCustomTarget(
					this.BulletInfo.AttackerActorComp.Actor,
					l.RowName.toString(),
					this.BulletInfo.ActorComponent.ActorTransform,
					{
						SkillId: this.BulletInfo.BulletInitParams.SkillId,
						ParentVictimId: t.Victim?.Id,
						ParentTargetId: this.BulletInfo.Target?.Id,
						ParentId: this.BulletInfo.Entity.Id,
						DtType: this.BulletInfo.BulletInitParams.DtType,
					},
					this.BulletInfo.ContextId,
				);
				if (i)
					BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
						this.BulletInfo,
						i,
					),
						this.ChildInfo.HaveSummonedBulletNumber[o]++;
				else if (l.BreakOnFail) return;
			}
		}
	}
}
exports.BulletActionSummonBullet = BulletActionSummonBullet;
