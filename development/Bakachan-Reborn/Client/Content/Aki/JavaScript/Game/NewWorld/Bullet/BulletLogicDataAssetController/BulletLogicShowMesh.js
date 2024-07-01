"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletLogicShowMesh = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EffectModelHelper_1 = require("../../../Render/Effect/Data/EffectModelHelper"),
	BulletLogicController_1 = require("./BulletLogicController"),
	MIN_LOD = 99;
class BulletLogicShowMesh extends BulletLogicController_1.BulletLogicController {
	constructor(e, o) {
		super(e, o),
			(this.$6e = void 0),
			(this.F9o = void 0),
			(this._9o = void 0),
			(this.V9o = new Array()),
			(this.u9o = e);
	}
	BulletLogicAction(e = 0) {
		(this._9o = this.Bullet.GetBulletInfo()),
			this._9o
				? this._9o.Target
					? (this.H9o(), this.j9o(), this.W9o(), this.K9o())
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Battle", 4, "子弹没有目标，生成残影失败")
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 4, "无法获取BattleInfo");
	}
	OnBulletDestroy() {
		const e = this.Bullet.GetBulletInfo();
		this.F9o && e.Actor.K2_DestroyComponent(this.F9o),
			this.$6e && (e.Actor.K2_DestroyComponent(this.$6e), (this.$6e = void 0)),
			this.V9o.forEach((o) => {
				o && e.Actor.K2_DestroyComponent(o);
			}),
			(this.V9o.length = 0);
	}
	H9o() {
		if (this._9o.Target) {
			var e = this._9o.Target.GetComponent(3).Actor.Mesh;
			if (((this.F9o = this.Q9o(e)), this.F9o))
				return (
					(e = (0, puerts_1.$ref)(new UE.HitResult())),
					this.F9o.K2_SetWorldTransform(
						this._9o.ActorComponent.ActorTransform,
						!1,
						e,
						!0,
					),
					this.F9o.CopyPoseFromSkeletalComponent(
						this._9o.Target.GetComponent(3).Actor.Mesh,
					),
					this.F9o.SetForcedLOD(99),
					!(this.F9o.CastShadow = !1)
				);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 4, "PoseComponent初始化失败");
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 4, "子弹没有目标，生成残影失败");
		return !1;
	}
	Q9o(e) {
		var o = void 0;
		return (
			(o = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
				this._9o.Actor,
				UE.PoseableMeshComponent.StaticClass(),
				void 0,
				void 0,
				!1,
			)).SetSkeletalMesh(e.SkeletalMesh, !1),
			o
		);
	}
	j9o() {
		this.$6e ||
			(this.$6e = this._9o.Actor.AddComponentByClass(
				UE.CharRenderingComponent_C.StaticClass(),
				!1,
				MathUtils_1.MathUtils.DefaultTransform,
				!1,
			)),
			this.$6e
				? (this.$6e.Init(0), this.$6e.AddComponentByCase(0, this.F9o))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 4, "BulletLogicShowMesh中渲染组件添加失败");
	}
	W9o() {
		var e = this.Bullet.GetBulletInfo().Target;
		if (e) {
			var o = e.GetComponent(69);
			if (o) {
				(o = o.GetWeaponMesh()),
					(e = e.GetComponent(0).GetRoleConfig().WeaponScale);
				const t = Vector_1.Vector.Create(e[0], e[1], e[2]);
				let r = 0;
				const s = [1, 2, 3, 4, 5];
				o.CharacterWeapons.forEach((e) => {
					var o;
					e.WeaponHidden ||
						((o = void 0),
						(o = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
							this._9o.Actor,
							UE.PoseableMeshComponent.StaticClass(),
							void 0,
							void 0,
							!1,
						)).SetSkeletalMesh(e.Mesh.SkeletalMesh, !1),
						o.CopyPoseFromSkeletalComponent(e.Mesh),
						o.SetForcedLOD(99),
						(o.CastShadow = !1),
						this.X9o(o, e.BattleSocket, t.ToUeVector()),
						this.$6e.AddComponentByCase(s[r + 1], o),
						this.V9o.push(o)),
						++r;
				});
			}
		}
	}
	K9o() {
		const e = this.u9o.MaterialEffect.AssetPathName?.toString();
		"" !== e &&
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.PD_CharacterControllerData_C,
				(o) => {
					o
						? this.$6e.AddMaterialControllerData(o)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Battle",
								4,
								"无法找到BulletLogicShowMesh子弹材质效果",
								["EffectPath", e],
							);
				},
			);
	}
	X9o(e, o, t) {
		var r = new UE.Transform();
		r.SetScale3D(t),
			e.K2_AttachToComponent(this.F9o, o, 0, 0, 0, !0),
			e.K2_SetRelativeTransform(r, !1, void 0, !0);
	}
}
exports.BulletLogicShowMesh = BulletLogicShowMesh;
