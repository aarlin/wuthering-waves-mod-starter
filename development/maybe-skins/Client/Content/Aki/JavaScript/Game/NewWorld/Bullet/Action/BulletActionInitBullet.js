"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionInitBullet = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	GlobalData_1 = require("../../../GlobalData"),
	BulletController_1 = require("../BulletController"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletPool_1 = require("../Model/BulletPool"),
	BulletActionBase_1 = require("./BulletActionBase"),
	BULLET_TAG_PREFIX = "子弹.";
class BulletActionInitBullet extends BulletActionBase_1.BulletActionBase {
	OnExecute() {
		var l = this.BulletInfo,
			e = l.BulletInitParams,
			t = l.BulletDataMain,
			o = ((l.GenerateTime = Time_1.Time.WorldTime), e.TargetId);
		if (
			(o = ((l.TargetId = o), l.SetTargetById(o), l.AttackerCreatureDataComp))
		) {
			var r;
			o.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Player
				? (l.AttackerCamp = o.GetEntityCamp())
				: (l.AttackerCamp = 0),
				(l.IsAutonomousProxy = l.AttackerActorComp.IsAutonomousProxy),
				(l.AttackerPlayerId = o.GetPlayerId()),
				(l.SkillLevel = l.AttackerSkillComp.GetSkillLevelBySkillInfoId(
					e.SkillId,
				)),
				0 < (o = t.Move).UpDownAngleLimit &&
					(a = BulletUtil_1.BulletUtil.GetTargetLocation(
						l.TargetActorComp,
						FNameUtil_1.FNameUtil.GetDynamicFName(o.InitVelocityDirParam),
						l,
					)) &&
					((r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(a),
					(a = l.AttackerActorComp),
					(n = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
						a.ActorLocationProxy,
					),
					n.SubtractionEqual(r),
					0 < (a = n.Size()) &&
						((i = 0 < (i = n.Z) ? i : -1 * i),
						o.UpDownAngleLimit <
							Math.asin(i / a) * MathCommon_1.MathCommon.RadToDeg) &&
						l.SetTargetById(0),
					BulletPool_1.BulletPool.RecycleVector(n),
					BulletPool_1.BulletPool.RecycleVector(r));
			const u = t.Base.TagId;
			0 < u && l.AddTagId(u), (o = t.Logic.PresentTagIds);
			for (const e of o) l.AddTagId(e);
			if (GlobalData_1.GlobalData.IsPlayInEditor) {
				0 < u &&
					this.V4o(
						u,
						e.BulletRowName,
						"子弹的'基础设置.子弹标签'中的值必须是以[子弹.]开头的",
					);
				for (const l of o)
					0 < l &&
						this.V4o(
							l,
							e.BulletRowName,
							"子弹的'逻辑设置.预设.预设标签'中的值必须是以[子弹.]开头的",
						);
			}
			var i = t.Base.Shape,
				a = l.Size,
				n = e.Size;
			n
				? 3 === i
					? a.Set(n.X, 0, n.Z)
					: a.FromUeVector(n)
				: a.FromUeVector(t.Base.Size),
				0 < t.Children.length &&
					BulletController_1.BulletController.AddSimpleAction(l, 10),
				BulletController_1.BulletController.AddSimpleAction(l, 2),
				BulletController_1.BulletController.AddSimpleAction(l, 3),
				BulletController_1.BulletController.AddSimpleAction(l, 6),
				0 < t.Summon.EntityId &&
					BulletController_1.BulletController.AddSimpleAction(l, 12),
				BulletController_1.BulletController.AddSimpleAction(l, 4),
				t.Logic.DestroyOnFrozen &&
					BulletController_1.BulletController.AddSimpleAction(l, 15),
				BulletController_1.BulletController.AddSimpleAction(l, 7),
				BulletController_1.BulletController.AddSimpleAction(l, 8),
				BulletController_1.BulletController.AddSimpleAction(l, 5),
				BulletController_1.BulletController.AddSimpleAction(l, 9);
		} else
			BulletController_1.BulletController.DestroyBullet(l.BulletEntityId, !1);
	}
	V4o(l, e, t) {
		(l = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(l)),
			l?.startsWith("子弹.") ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 18, t, ["BulletId", e], ["Tag", l]));
	}
}
exports.BulletActionInitBullet = BulletActionInitBullet;
