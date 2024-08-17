"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionInitRender = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	CameraController_1 = require("../../../Camera/CameraController"),
	Global_1 = require("../../../Global"),
	SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager"),
	SceneObjectWaterEffect_1 = require("../../../Render/Scene/Interaction/SceneObjectWaterEffect"),
	CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent_New"),
	BulletUtil_1 = require("../BulletUtil"),
	BulletModel_1 = require("../Model/BulletModel"),
	BulletActionBase_1 = require("./BulletActionBase"),
	PATH_DEFAULT_INTERACT =
		"/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig";
class BulletActionInitRender extends BulletActionBase_1.BulletActionBase {
	constructor() {
		super(...arguments), (this.P5o = void 0);
	}
	OnExecute() {
		BulletModel_1.BulletModel.DefaultBulletSceneInteraction ||
			(BulletModel_1.BulletModel.DefaultBulletSceneInteraction =
				ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					PATH_DEFAULT_INTERACT,
					UE.DefaultBulletSceneInteraction_C,
				));
		var e = this.BulletInfo.BulletDataMain;
		if (e.Logic.InteractWithWater) {
			let a = e.Interact.WaterInteract;
			if ("" !== a)
				ResourceSystem_1.ResourceSystem.LoadAsync(
					a,
					UE.BulletSceneInteraction_C,
					(e) => {
						this.x5o(e);
					},
				);
			else {
				var t =
						BulletModel_1.BulletModel.DefaultBulletSceneInteraction
							?.ConditionConfig,
					l = t?.Num(),
					r = this.GetSize();
				for (let e = 0; e < l; e++) {
					var n = t.Get(e);
					if (!(r >= n.RangeMin)) break;
					a = n.Config.ToAssetPathName();
				}
				"" !== a &&
					ResourceSystem_1.ResourceSystem.LoadAsync(
						a,
						UE.BulletSceneInteraction_C,
						(e) => {
							this.x5o(e);
						},
					);
			}
		}
		(e = e.Render.AttackerCameraShakeOnStart),
			this.BulletInfo.Attacker?.Valid &&
				this.BulletInfo.IsAutonomousProxy &&
				BulletUtil_1.BulletUtil.IsPlayerOrSummons(this.BulletInfo) &&
				0 < e.length &&
				ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (e) => {
					var t = Global_1.Global.CharacterCameraManager.GetCameraLocation();
					CameraController_1.CameraController.PlayWorldCameraShake(
						e,
						t,
						0,
						CharacterHitComponent_1.OUTER_RADIUS,
						1,
						!1,
					);
				});
	}
	GetSize() {
		return 0 !== this.BulletInfo.BulletDataMain.Base.Shape
			? this.BulletInfo.Size.X
			: Math.max(this.BulletInfo.Size.X, this.BulletInfo.Size.Y);
	}
	x5o(e) {
		(this.P5o = new SceneObjectWaterEffect_1.SceneObjectWaterEffect()),
			this.P5o.Start(
				e.WaterEffect,
				this.BulletInfo.CollisionInfo.CollisionComponent,
			),
			SceneInteractionManager_1.SceneInteractionManager.Get().RegisterWaterEffectObject(
				this.P5o,
			);
	}
	Clear() {
		super.Clear(),
			this.P5o &&
				SceneInteractionManager_1.SceneInteractionManager.Get().UnregisterWaterEffectObject(
					this.P5o,
				);
	}
}
exports.BulletActionInitRender = BulletActionInitRender;
