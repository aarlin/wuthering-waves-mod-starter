"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicReboundController = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	CameraController_1 = require("../../../Camera/CameraController"),
	Global_1 = require("../../../Global"),
	BulletController_1 = require("../BulletController"),
	BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
	BulletLogicController_1 = require("./BulletLogicController"),
	OUTER_RADIUS = 100;
class BulletLogicReboundController extends BulletLogicController_1.BulletLogicController {
	constructor(e, o) {
		super(e, o),
			(this.nXt = void 0),
			(this._9o = void 0),
			(this.nXt = o.GetComponent(152)),
			(this._9o = this.Bullet.GetBulletInfo());
	}
	OnInit() {
		this.Bullet.GetBulletInfo().BulletDataMain.Execution.ReboundBitMask |=
			this.LogicController.ReboundBitMask;
	}
	BulletLogicAction(e) {
		var o = e.BulletDataMain.Logic.ReboundChannel;
		if (!((this.LogicController.ReboundBitMask & o) <= 0)) {
			this.LogicController.EffectRebound &&
				UE.KismetSystemLibrary.IsValidSoftObjectReference(
					this.LogicController.EffectRebound,
				) &&
				((e = (o = e.Attacker).GetComponent(51)),
				(o = o.GetComponent(3)),
				(t = UE.KismetMathLibrary.TransformLocation(
					o.ActorTransform,
					this.LogicController.PositionOffset,
				)),
				(o = UE.KismetMathLibrary.TransformRotation(
					o.ActorTransform,
					this.LogicController.RotationOffset,
				)),
				(o = new UE.Transform(o, t, Vector_1.Vector.OneVector)),
				e.OnReboundSuccess(this.LogicController.EffectRebound, o)),
				this.LogicController.ScreenShake &&
					UE.KismetSystemLibrary.IsValidSoftClassReference(
						this.LogicController.ScreenShake,
					) &&
					ResourceSystem_1.ResourceSystem.LoadAsync(
						this.LogicController.ScreenShake.ToAssetPathName(),
						UE.Class,
						(e) => {
							var o =
								Global_1.Global.CharacterCameraManager.GetCameraLocation();
							CameraController_1.CameraController.PlayWorldCameraShake(
								e,
								o,
								0,
								100,
								1,
								!1,
							);
						},
					),
				this.LogicController.CameraModified &&
					CameraController_1.CameraController.FightCamera.GetComponent(
						5,
					).ApplyCameraModify(
						void 0,
						this.LogicController.CameraModified.持续时间,
						this.LogicController.CameraModified.淡入时间,
						this.LogicController.CameraModified.淡出时间,
						this.LogicController.CameraModified.摄像机配置,
						void 0,
					);
			var t,
				r = this.LogicController.BulletRowName.Num(),
				l = this._9o.ContextId;
			for (let e = 0; e < r; e++) {
				var i = this.LogicController.BulletRowName.Get(e);
				i = BulletController_1.BulletController.CreateBulletCustomTarget(
					this._9o.AttackerActorComp.Actor,
					i,
					this.nXt.ActorTransform,
					{
						SyncType: 1,
						ParentId: this.Bullet.Id,
						SkillId: this._9o.BulletInitParams.SkillId,
						Source: Protocol_1.Aki.Protocol.LOs.Proto_ReboundSource,
						DtType: this._9o.BulletInitParams.DtType,
					},
					l,
				);
				i?.Valid &&
					(i = i.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect &&
					BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(
						this._9o,
						i,
					);
			}
		}
	}
}
exports.BulletLogicReboundController = BulletLogicReboundController;
