"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicCreateBulletController = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BulletController_1 = require("../BulletController"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
	BulletHitActorData_1 = require("../Model/BulletHitActorData"),
	BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicCreateBulletController extends BulletLogicController_1.BulletLogicController {
	constructor(t, e) {
		super(t, e), (this.u9o = void 0), (this.u9o = t);
	}
	BulletLogicAction(t = void 0) {
		var e = this.u9o;
		if ((r = e.CreateBulletRowName) !== StringUtils_1.NONE_STRING) {
			var l = this.Bullet.GetBulletInfo();
			let i;
			t &&
				t instanceof BulletHitActorData_1.BulletHitActorData &&
				(i = t.Entity);
			const n = e.FlashBulletRowName;
			if (n !== StringUtils_1.NONE_STRING) {
				t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(
					l.Attacker.Id,
				);
				let e = !1;
				var o = i.GetComponent(1);
				if (t && (0, RegisterComponent_1.isComponentInstance)(o, 3)) {
					const l = o?.Actor;
					l &&
						t.forEach((t, o, r) => {
							t.GetBulletInfo().BulletRowName === n &&
								t.GetComponent(1).Owner.GetAttachParentActor() === l &&
								((t.GetBulletInfo().GenerateTime = Time_1.Time.WorldTime),
								(e = !0));
						});
				}
				if (e) return;
			}
			var r;
			(o = this.Bullet.GetBulletInfo().ContextId),
				(t = this.c9o(e.BulletTransform, i));
			(r = BulletController_1.BulletController.CreateBulletCustomTarget(
				this.c9o(e.BulletOwner, i),
				r,
				t?.GetTransform() ?? MathUtils_1.MathUtils.DefaultTransform,
				{
					SkillId: l.BulletInitParams.SkillId,
					ParentVictimId: i?.Id,
					ParentTargetId: l.Target?.Id,
					ParentId: this.Bullet.Id,
					DtType: l.BulletInitParams.DtType,
				},
				o,
			)) &&
				((t = r.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect
					? BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(l, t)
					: ((o = e.AttachToBoneName),
						(l = this.c9o(e.AttachToActor, i)) &&
							o !== StringUtils_1.NONE_STRING &&
							((t = FNameUtil_1.FNameUtil.GetDynamicFName(o)),
							(e = r.GetComponent(152)),
							(o = l.Mesh),
							e.SetActorLocation(o.GetSocketLocation(t)),
							e.SetAttachToComponent(o, t, 1, 0, 0, !1),
							(e.NeedDetach = !0))));
		}
	}
	c9o(t, e) {
		switch (t) {
			case 1:
			default:
				return this.Bullet.GetBulletInfo().AttackerActorComp.Actor;
			case 2:
				var l = e.GetComponent(3);
				return l && ((l = l?.Actor), l?.IsValid())
					? l
					: this.Bullet.GetBulletInfo().AttackerActorComp.Actor;
		}
	}
}
exports.BulletLogicCreateBulletController = BulletLogicCreateBulletController;
