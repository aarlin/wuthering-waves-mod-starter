"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletDataMain = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../GlobalData"),
	BulletDataAimed_1 = require("./BulletDataAimed"),
	BulletDataBase_1 = require("./BulletDataBase"),
	BulletDataChild_1 = require("./BulletDataChild"),
	BulletDataExecution_1 = require("./BulletDataExecution"),
	BulletDataInteract_1 = require("./BulletDataInteract"),
	BulletDataLogic_1 = require("./BulletDataLogic"),
	BulletDataMove_1 = require("./BulletDataMove"),
	BulletDataObstacle_1 = require("./BulletDataObstacle"),
	BulletDataRender_1 = require("./BulletDataRender"),
	BulletDataScale_1 = require("./BulletDataScale"),
	BulletDataSummon_1 = require("./BulletDataSummon"),
	BulletDataTimeScale_1 = require("./BulletDataTimeScale"),
	RADIUS_MAX = 2e3,
	SIZE_MAX = 4e3,
	TRACE_RADIUS_MAX = 300,
	TRACE_SIZE_MAX = 600;
class BulletDataMain {
	constructor(e, t) {
		(this.Data = e),
			(this.BulletRowName = t),
			(this.BulletName = e.子弹名称?.toString()),
			(this.Base = new BulletDataBase_1.BulletDataBase(e.基础设置)),
			(this.Logic = new BulletDataLogic_1.BulletDataLogic(e.逻辑设置.预设)),
			(this.Aimed = new BulletDataAimed_1.BulletDataAimed(e.瞄准设置)),
			(this.Move = new BulletDataMove_1.BulletDataMove(e.移动设置)),
			(this.Render = new BulletDataRender_1.BulletDataRender(e.表现效果设置)),
			(this.TimeScale = new BulletDataTimeScale_1.BulletDataTimeScale(
				e.时间膨胀,
			)),
			(this.Execution = new BulletDataExecution_1.BulletDataExecution(
				e.执行逻辑,
			)),
			(this.Scale = new BulletDataScale_1.BulletDataScale(e.缩放设置)),
			(this.Summon = new BulletDataSummon_1.BulletDataSummon(e.召唤实体)),
			(this.Children = new Array());
		var a = e.子子弹设置.Num();
		for (let t = 0; t < a; t++) {
			var l = e.子子弹设置.Get(t);
			this.Children.push(new BulletDataChild_1.BulletDataChild(l));
		}
		(this.Obstacle = new BulletDataObstacle_1.BulletDataObstacle(e.障碍检测)),
			(this.Interact = new BulletDataInteract_1.BulletDataInteract(e.环境交互)),
			(this.SimpleBullet = BulletDataMain.x6o(this));
	}
	static x6o(e) {
		var t = e.Base;
		return !(
			0 < t.SpecialParams.size ||
			0 !== t.BornPositionStandard ||
			t.BlackboardKey !== BulletDataMain.w6o ||
			!t.CenterOffset.IsZero() ||
			!t.BornPositionRandom.IsZero() ||
			!t.Rotator.IsNearlyZero() ||
			!t.BornDistLimit.IsZero() ||
			0 < t.CollisionActiveDuration ||
			0 < t.CollisionActiveDelay ||
			2 !== t.HitType ||
			t.DaHitTypePreset !== BulletDataMain.w6o ||
			t.HitConditionTagId ||
			t.BanHitTagId ||
			-1 !== t.VictimCount ||
			-1 !== t.HitCountPerVictim ||
			-1 !== t.HitCountMax ||
			0 < t.Interval ||
			t.ShareCounter ||
			t.HitEffectWeakness === FNameUtil_1.FNameUtil.EMPTY ||
			!t.AttackDirection.IsNearlyZero() ||
			t.DestroyOnSkillEnd ||
			t.BornRequireTagIds ||
			t.BornForbidTagIds ||
			t.ContinuesCollision ||
			t.StickGround ||
			t.IgnoreGradient ||
			0 !== t.SyncType ||
			t.TagId ||
			e.Aimed.AimedCtrlDir ||
			0 < e.Move.Speed ||
			1 !== e.Move.FollowType ||
			0 !==
				(t = e.Execution).SendGameplayEventTagToAttackerOnStart.TagName
					.length ||
			0 !== t.SendGameplayEventTagToAttacker.TagName.length ||
			0 !== t.SendGameplayEventTagToVictim.TagName.length ||
			0 !== t.SendGameplayEventTagToAttackerOnEnd.TagName.length ||
			0 < t.SendGeIdToAttacker.length ||
			0 < t.SendGeIdToVictim.length ||
			0 < t.EnergyRecoverGeIds.length ||
			0 < t.SendGeIdToRoleInGame.length ||
			0 < t.GeIdApplyToVictim.length ||
			(t.GbDataList && 0 < t.GbDataList.length) ||
			(t = e.Scale).SizeScale !== Vector_1.Vector.OneVectorProxy ||
			t.ScaleCurve ||
			t.ShapeSwitch ||
			0 < e.Summon.EntityId ||
			0 < e.Children.length ||
			!e.Obstacle.Center.IsZero() ||
			0 < e.Obstacle.Radius ||
			e.Interact.WaterInteract !== BulletDataMain.w6o
		);
	}
	CheckValid() {
		return !!this.Logic?.Data && (this.B6o(), this.Yz(), this.b6o(), !0);
	}
	B6o() {
		switch (this.Base.Shape) {
			case 0:
			default:
				this.Base.IsOversizeForTrace = this.Base.Size.GetMax() > 600;
				break;
			case 1:
				this.Base.IsOversizeForTrace = this.Base.Size.X > 300;
				break;
			case 2:
			case 3:
				this.Base.IsOversizeForTrace =
					this.Base.Size.X > 300 || this.Base.Size.Z > 600;
			case 6:
			case 7:
			case 8:
			case 9:
			case 4:
		}
		return this.Base.IsOversizeForTrace;
	}
	Yz() {
		if (GlobalData_1.GlobalData.IsPlayInEditor)
			switch (this.Base.Shape) {
				case 0:
				default:
					this.Base.Size.GetMax() > 4e3 &&
						this.q6o("子弹大小超过20米，会引起性能问题");
					break;
				case 1:
					this.Base.Size.X > 2e3 &&
						this.q6o("子弹半径超过10米，会引起性能问题");
					break;
				case 2:
				case 3:
					this.Base.Size.X > 2e3 &&
						this.q6o("子弹半径超过10米，会引起性能问题"),
						this.Base.Size.Z > 4e3 &&
							this.q6o("子弹大小超过20米，会引起性能问题");
					break;
				case 4:
					this.Base.Size.Z > 2e3 &&
						this.q6o("子弹半径超过10米，会引起性能问题");
				case 6:
				case 7:
				case 8:
				case 9:
			}
	}
	b6o() {
		GlobalData_1.GlobalData.IsPlayInEditor &&
			this.Obstacle.Radius > 300 &&
			this.q6o("障碍检测配置的检测距离超过3米，会引起性能问题");
	}
	q6o(e) {
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"Bullet",
				18,
				"子弹配置非法",
				["", e],
				["", this.BulletRowName],
				["", this.BulletName],
			);
	}
	Preload() {
		this.Base.Preload(),
			this.Logic.Preload(),
			this.Move.Preload(),
			this.Execution.Preload(),
			this.Scale.Preload(),
			this.Obstacle.Preload();
	}
}
(exports.BulletDataMain = BulletDataMain).w6o = "None";
