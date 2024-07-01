"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAimLineController = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ItemMaterialControllerActorData_1 = require("../../Render/Scene/Item/MaterialController/ItemMaterialControllerActorData"),
	ItemMaterialManager_1 = require("../../Render/Scene/Item/MaterialController/ItemMaterialManager"),
	UPDATE_MESH_INTERVAL = 1e3,
	DATA_PATH =
		"/Game/Aki/Effect/MaterialController/ItemMaterial/DA_Fx_ActorItem_Scanning.DA_Fx_ActorItem_Scanning",
	sightingTag = new UE.FName("Manipulate_Targeted");
class LevelAimLineController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(this.OC = ActorSystem_1.ActorSystem.Get(
				UE.BP_Miaozhunxian_C.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
				void 0,
			)),
			(this.iye = ActorSystem_1.ActorSystem.Get(
				UE.BP_Miaozhunxian_Bullet_C.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
				void 0,
			)),
			this.iye.OnActorBeginOverlap.Add(this.oye),
			(this.zie = this.OC.GetComponentByClass(
				UE.SplineComponent.StaticClass(),
			)),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				((this.OC.ActorLabel = "AimLineController"),
				(this.iye.ActorLabel = "AimLineBullet")),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				DATA_PATH,
				ItemMaterialControllerActorData_1.default,
				(e) => {
					this.rye = e;
				},
			),
			this.OC.Init(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			),
			!0
		);
	}
	static OnClear() {
		return (
			this.OC?.IsValid() && ActorSystem_1.ActorSystem.Put(this.OC),
			this.iye?.IsValid() && ActorSystem_1.ActorSystem.Put(this.iye),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.WorldDone,
				this.nye,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.WorldDone,
					this.nye,
				),
			!0
		);
	}
	static PlayEffect(e = void 0) {
		if (this.sye) return !1;
		if (((this.sye = !0), e)) {
			if (
				((this.aye = EffectSystem_1.EffectSystem.SpawnEffect(
					GlobalData_1.GlobalData.World,
					MathUtils_1.MathUtils.DefaultTransform,
					e,
					"[LevelAimLineController.PlayEffect]",
					new EffectContext_1.EffectContext(void 0, this.OC),
				)),
				!EffectSystem_1.EffectSystem.IsValid(this.aye))
			)
				return !1;
			EffectSystem_1.EffectSystem.GetEffectActor(this.aye).K2_AttachToActor(
				this.OC,
				void 0,
				0,
				0,
				0,
				!1,
			);
		} else (this.hye = !0), this.OC.ShowMesh();
		return !0;
	}
	static StopEffect() {
		return (
			!!this.sye &&
			((this.sye = !1),
			this.hye
				? this.OC.HideMesh()
				: (EffectSystem_1.EffectSystem.StopEffectById(
						this.aye ?? 0,
						"[LevelAimLineController.StopEffect]",
						!0,
					),
					(this.aye = void 0)),
			this.lye(),
			!0)
		);
	}
	static UpdatePoints(e, t) {
		if (e?.length <= 0) return !1;
		var i = e[0],
			r = Vector_1.Vector.Create(),
			o =
				(this.OC.K2_SetActorLocation(i.ToUeVector(), !1, void 0, !0),
				UE.NewArray(UE.SplinePoint));
		let a = 5;
		a = 0 === t ? 0 : 1;
		for (let t = 0; t < e.length; t++) {
			e[t].Subtraction(i, r);
			var n = new UE.SplinePoint(
				t,
				r.ToUeVector(),
				e[0 === t ? t : t - 1].ToUeVector(),
				e[t === e.length - 1 ? t : t + 1].ToUeVector(),
				Rotator_1.Rotator.ZeroRotator,
				Vector_1.Vector.OneVector,
				a,
			);
			o.Add(n);
		}
		return (
			this.zie.ClearSplinePoints(),
			this.zie.AddPoints(o),
			this.zie.UpdateSpline(),
			this.OC.UpdateMesh(),
			Time_1.Time.WorldTime - this._ye > 1e3 &&
				((this._ye = Time_1.Time.WorldTime), this.uye()),
			!0
		);
	}
	static uye() {
		this.iye.K2_SetActorLocation(this.OC.K2_GetActorLocation(), !0, void 0, !1);
		var e = this.zie.GetSplineLength() / (this.OC.SamplingNum - 1);
		for (let i = 0; i < this.OC.SamplingNum; i++) {
			var t = this.zie.GetLocationAtDistanceAlongSpline((i + 1) * e, 1);
			this.iye.K2_SetActorLocation(t, !0, void 0, !1);
		}
		this.cye
			.filter((e) => !this.mye.includes(e))
			.forEach((e) => {
				ItemMaterialManager_1.ItemMaterialManager.DisableActorData(
					this.dye.get(e),
				),
					this.dye.delete(e);
			}),
			this.mye
				.filter((e) => !this.cye.includes(e))
				.forEach((e) => {
					var t = ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
						e,
						this.rye,
					);
					this.dye.set(e, t);
				}),
			(this.cye = this.mye),
			(this.mye = []),
			this.Cye.filter((e) => !this.gye.includes(e)).forEach((e) => {
				e?.Valid && e.Entity.GetComponent(115).SetIsBeingTargeted(!1);
			}),
			this.gye
				.filter((e) => !this.Cye.includes(e))
				.forEach((e) => {
					e?.Valid && e.Entity.GetComponent(115).SetIsBeingTargeted(!0);
				}),
			(this.Cye = this.gye),
			(this.gye = []);
	}
	static lye() {
		this.Cye.forEach((e) => {
			e?.Valid && e.Entity.GetComponent(115).SetIsBeingTargeted(!1);
		}),
			this.cye.forEach((e) => {
				ItemMaterialManager_1.ItemMaterialManager.DisableActorData(
					this.dye.get(e),
				),
					this.dye.delete(e);
			});
	}
}
(exports.LevelAimLineController = LevelAimLineController),
	((_a = LevelAimLineController).aye = void 0),
	(LevelAimLineController.sye = !1),
	(LevelAimLineController.hye = !1),
	(LevelAimLineController._ye = 0),
	(LevelAimLineController.cye = []),
	(LevelAimLineController.mye = []),
	(LevelAimLineController.dye = new Map()),
	(LevelAimLineController.Cye = []),
	(LevelAimLineController.gye = []),
	(LevelAimLineController.oye = (e, t) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Temp", 32, "111", ["otherActor", t.ActorLabel]),
			t.Tags.Contains(sightingTag)
				? _a.mye.includes(t) || _a.mye.push(t)
				: (t =
						ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
							t,
						)) &&
					t.Entity.GetComponent(138)?.Valid &&
					!_a.gye.includes(t) &&
					_a.gye.push(t);
	}),
	(LevelAimLineController.nye = () => {
		_a.OC?.IsValid() ||
			((_a.OC = ActorSystem_1.ActorSystem.Get(
				UE.BP_Miaozhunxian_C.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
				void 0,
			)),
			(_a.zie = _a.OC.GetComponentByClass(UE.SplineComponent.StaticClass())),
			_a.OC.Init()),
			_a.iye?.IsValid() ||
				((_a.iye = ActorSystem_1.ActorSystem.Get(
					UE.BP_Miaozhunxian_Bullet_C.StaticClass(),
					MathUtils_1.MathUtils.DefaultTransform,
					void 0,
				)),
				_a.iye.OnActorBeginOverlap.Add(_a.oye)),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				((_a.OC.ActorLabel = "AimLineController"),
				(_a.iye.ActorLabel = "AimLineBullet"));
	});
