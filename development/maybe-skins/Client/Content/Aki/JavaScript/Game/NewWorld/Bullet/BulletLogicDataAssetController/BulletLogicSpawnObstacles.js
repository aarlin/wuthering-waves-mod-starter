"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicSpawnObstacles = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines"),
	BulletPool_1 = require("../Model/BulletPool"),
	BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSpawnObstacles extends BulletLogicController_1.BulletLogicController {
	constructor(t, e) {
		super(t, e), (this.OC = void 0);
	}
	OnInit() {
		var t = this.LogicController,
			e = MathUtils_1.MathUtils.DefaultTransform,
			o =
				((this.OC = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e)),
				GlobalData_1.GlobalData.IsPlayInEditor &&
					this.OC.SetActorLabel("BulletCage", !0),
				t.Model);
		let l;
		var r,
			a = this.Bullet.GetBulletInfo();
		1 === o
			? ((r = this.OC.AddComponentByClass(
					UE.StaticMeshComponent.StaticClass(),
					!1,
					e,
					!0,
				)).SetStaticMesh(t.Mesh),
				(l = r))
			: 2 === o &&
				(l = this.OC.AddComponentByClass(
					UE.BoxComponent.StaticClass(),
					!1,
					e,
					!0,
				)),
			l &&
				(l.SetCollisionProfileName(t.ProfileName, !1),
				(l.bCanCharacterStandOn = t.CanStandOn),
				this.OC.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE),
				l.SetGenerateOverlapEvents(!1),
				(l.CreationMethod = 3),
				l.SetVisibility(t.ShowModel),
				this.OC.FinishAddComponent(l, !1, e),
				t.NeedAttach
					? this.OC.K2_AttachToActor(
							a.Actor,
							FNameUtil_1.FNameUtil.NONE,
							2,
							2,
							1,
							!1,
						)
					: this.OC.K2_SetActorTransform(
							a.Actor.GetTransform(),
							!1,
							void 0,
							!0,
						),
				1 === o
					? ((r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.Size),
						r.MultiplyEqual(0.02),
						l.SetRelativeScale3D(r.ToUeVector()),
						BulletPool_1.BulletPool.RecycleVector(r))
					: 2 === o && l.SetBoxExtent(t.Size));
	}
	OnBulletDestroy() {
		this.LogicController.NeedAttach && this.OC.K2_DetachFromActor(),
			ActorSystem_1.ActorSystem.Put(this.OC);
	}
}
exports.BulletLogicSpawnObstacles = BulletLogicSpawnObstacles;
