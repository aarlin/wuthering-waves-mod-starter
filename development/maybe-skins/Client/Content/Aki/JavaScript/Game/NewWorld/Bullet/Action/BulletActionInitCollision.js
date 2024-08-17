"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionInitCollision = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	BulletConstant_1 = require("../BulletConstant"),
	BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil"),
	BulletActionBase_1 = require("./BulletActionBase");
class BulletActionInitCollision extends BulletActionBase_1.BulletActionBase {
	constructor() {
		super(...arguments), (this.CollisionInfo = void 0);
	}
	Clear() {
		super.Clear(), (this.CollisionInfo = void 0);
	}
	OnExecute() {
		this.CollisionInfo = this.BulletInfo.CollisionInfo;
		var o = this.BulletInfo.BulletDataMain,
			l =
				((this.CollisionInfo.StageInterval = 1),
				(this.CollisionInfo.AllowedEnergy = !0),
				o.Base.CollisionActiveDelay * TimeUtil_1.TimeUtil.InverseMillisecond);
		(this.CollisionInfo.ActiveDelayMs = 0 < l ? l : 0),
			(this.CollisionInfo.IsPassDelay = this.CollisionInfo.ActiveDelayMs <= 0),
			(this.CollisionInfo.IntervalMs =
				o.Base.Interval * TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.CollisionInfo.IsProcessOpen = this.CollisionInfo.IsPassDelay),
			this.CollisionInfo.FinalScale.FromUeVector(o.Scale.SizeScale),
			(this.CollisionInfo.NeedHitObstacles =
				o.Logic.DestroyOnHitObstacle ||
				this.BulletInfo.ChildInfo?.HaveSpecialChildrenBullet ||
				o.Render.EffectOnHit.has(2) ||
				this.BulletInfo.ActionLogicComponent.ObstaclesDetect),
			this.CollisionInfo.NeedHitObstacles &&
				o.Base.IsOversizeForTrace &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Bullet", 18, "子弹尺寸过大，不会开启射线检测", [
					"BulletRowName",
					this.BulletInfo.BulletRowName,
				]),
			this.H4o(o.Base.Shape),
			this.BulletInfo.CloseCollision || 4 === o.Base.Shape
				? (this.BulletInfo.IsCollisionRelativeLocationZero = !0)
				: (this.j4o(),
					this.BulletInfo.IsCollisionRelativeRotationModify &&
						this.CollisionInfo.CollisionComponent.K2_SetRelativeRotation(
							o.Base.Rotator.ToUeRotator(),
							!1,
							void 0,
							!0,
						),
					(this.CollisionInfo.HasObstaclesCollision = 0 < o.Obstacle.Radius),
					this.W4o()),
			this.CollisionInfo.LastFramePosition.FromUeVector(
				this.BulletInfo.CollisionLocation,
			),
			this.CollisionInfo.ActiveDelayMs <= 0 &&
				(this.CollisionInfo.IsStartup = !0);
	}
	H4o(o) {
		switch (o) {
			case 0:
				this.K4o();
				break;
			case 1:
				this.Q4o();
				break;
			case 2:
				this.X4o();
				break;
			case 3:
				this.$4o();
				break;
			case 4:
				this.Y4o();
				break;
			case 6:
				this.J4o(UE.KuroRegionBoxComponent.StaticClass());
				break;
			case 7:
				this.z4o();
				break;
			case 8:
				this.J4o(UE.KuroRegionSectorComponent.StaticClass());
				break;
			case 9:
				this.J4o(UE.KuroRegionCylinderComponent.StaticClass());
		}
	}
	K4o() {
		var o = this.BulletInfo.BulletDataMain,
			l = this.BulletInfo.Actor,
			t = l.GetComponentByClass(UE.BoxComponent.StaticClass()),
			e =
				t ??
				l.AddComponentByClass(
					UE.BoxComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!0,
				);
		(this.BulletInfo.CloseCollision =
			o.Base.Size.X <= 0 || o.Base.Size.Y <= 0 || o.Base.Size.Z <= 0),
			(this.CollisionInfo.CollisionComponent = e),
			ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
				this.BulletInfo.Attacker.Id,
			) &&
				((e.LineThickness = 5),
				(e.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow)),
			e.SetCollisionProfileName(o.Logic.ProfileName),
			this.SetCollisionIgnoreChannels(e),
			t ||
				(GlobalData_1.GlobalData.IsPlayInEditor &&
					BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor &&
					(this.CollisionInfo.CollisionComponent.CreationMethod = 3),
				l.FinishAddComponent(e, !1, MathUtils_1.MathUtils.DefaultTransform));
	}
	Q4o() {
		var o = this.BulletInfo.BulletDataMain,
			l = this.BulletInfo.Actor,
			t = l.GetComponentByClass(UE.SphereComponent.StaticClass()),
			e =
				t ??
				l.AddComponentByClass(
					UE.SphereComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!0,
				);
		(this.BulletInfo.CloseCollision = o.Base.Size.X <= 0),
			(this.CollisionInfo.CollisionComponent = e).SetCollisionProfileName(
				o.Logic.ProfileName,
			),
			this.SetCollisionIgnoreChannels(e),
			t ||
				(GlobalData_1.GlobalData.IsPlayInEditor &&
					BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor &&
					(this.CollisionInfo.CollisionComponent.CreationMethod = 3),
				l.FinishAddComponent(e, !1, MathUtils_1.MathUtils.DefaultTransform));
	}
	X4o() {
		var o = this.BulletInfo.BulletDataMain,
			l = this.BulletInfo.Actor,
			t =
				((this.BulletInfo.CloseCollision =
					o.Base.Size.X <= 0 || o.Base.Size.Z <= 0),
				l.GetComponentByClass(UE.BoxComponent.StaticClass())),
			e =
				t ??
				l.AddComponentByClass(
					UE.BoxComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!0,
				);
		(this.CollisionInfo.CollisionComponent = e),
			ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
				this.BulletInfo.Attacker.Id,
			) &&
				((e.LineThickness = 2),
				(e.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow)),
			e.SetCollisionProfileName(o.Logic.ProfileName),
			this.SetCollisionIgnoreChannels(e),
			t ||
				(GlobalData_1.GlobalData.IsPlayInEditor &&
					BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor &&
					(this.CollisionInfo.CollisionComponent.CreationMethod = 3),
				l.FinishAddComponent(e, !1, MathUtils_1.MathUtils.DefaultTransform));
	}
	$4o() {
		var o = this.BulletInfo.BulletDataMain,
			l = this.BulletInfo.Actor,
			t =
				((this.BulletInfo.CloseCollision =
					o.Base.Size.X <= 0 || o.Base.Size.Z <= 0),
				l.GetComponentByClass(UE.BoxComponent.StaticClass())),
			e =
				t ??
				l.AddComponentByClass(
					UE.BoxComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					!0,
				);
		(this.CollisionInfo.CollisionComponent = e),
			ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
				this.BulletInfo.Attacker.Id,
			) &&
				((e.LineThickness = 2),
				(e.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow)),
			e.SetCollisionProfileName(o.Logic.ProfileName),
			this.SetCollisionIgnoreChannels(e),
			t ||
				(GlobalData_1.GlobalData.IsPlayInEditor &&
					BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor &&
					(this.CollisionInfo.CollisionComponent.CreationMethod = 3),
				l.FinishAddComponent(e, !1, MathUtils_1.MathUtils.DefaultTransform));
	}
	Y4o() {
		var o = this.BulletInfo.BulletDataMain,
			l = this.BulletInfo.RayInfo;
		(l.Speed = this.BulletInfo.Size.X / TimeUtil_1.TimeUtil.InverseMillisecond),
			(l.BlockByCharacter = "f" !== o.Base.SpecialParams.get(1));
	}
	z4o() {
		this.BulletInfo.CloseCollision = !1;
	}
	J4o(o) {
		var l = this.BulletInfo.Actor,
			t =
				GlobalData_1.GlobalData.IsPlayInEditor &&
				BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor,
			e = l.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass()),
			i =
				e ??
				l.AddComponentByClass(
					UE.KuroRegionDetectComponent.StaticClass(),
					!1,
					MathUtils_1.MathUtils.DefaultTransform,
					t,
				),
			n =
				((this.CollisionInfo.RegionDetectComponent = i),
				l.GetComponentByClass(o));
		o =
			n ??
			l.AddComponentByClass(o, !1, MathUtils_1.MathUtils.DefaultTransform, t);
		(this.CollisionInfo.RegionComponent = o),
			i.RegionMap.Set(BulletConstant_1.BulletConstant.RegionKey, o),
			(this.BulletInfo.CloseCollision = !1),
			t &&
				(e ||
					((i.CreationMethod = 3),
					l.FinishAddComponent(i, !1, MathUtils_1.MathUtils.DefaultTransform)),
				n ||
					((o.CreationMethod = 3),
					l.FinishAddComponent(o, !1, MathUtils_1.MathUtils.DefaultTransform)));
	}
	j4o() {
		var o = this.BulletInfo.BulletDataMain,
			l = this.CollisionInfo.CollisionComponent,
			t = this.CollisionInfo.RegionComponent,
			e = this.CollisionInfo.CenterLocalLocation,
			i = (e.FromUeVector(o.Base.CenterOffset), o.Base.Shape);
		7 === i
			? (e.IsZero() ||
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Bullet",
							18,
							"出于性能考虑，大球体的中心位置偏移不会生效",
						),
					e.Reset()),
				(this.BulletInfo.IsCollisionRelativeLocationZero = !0))
			: ((i = this.BulletInfo.Size),
				2 !== o.Base.Shape
					? e.IsZero()
						? (this.BulletInfo.IsCollisionRelativeLocationZero = !0)
						: l
							? l.K2_SetRelativeLocation(e.ToUeVector(), !1, void 0, !0)
							: t && t.K2_SetRelativeLocation(e.ToUeVector(), !1, void 0, !0)
					: 360 <= i.Y
						? (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Bullet",
									18,
									"扇形子弹的角度超过360！请使用柱形",
									["ID", this.BulletInfo.BulletRowName],
								),
							(i.Y = 360))
						: i.Y <= 0 &&
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Bullet", 18, "扇形子弹的角度小于0！请检查", [
									"ID",
									this.BulletInfo.BulletRowName,
								]),
							(i.Y = 90)),
				l
					? BulletCollisionUtil_1.BulletCollisionUtil.UpdateCollisionExtend(
							o.Base.Shape,
							l,
							i,
							e,
							o.Base.Rotator,
						)
					: t &&
						BulletCollisionUtil_1.BulletCollisionUtil.UpdateRegionExtend(
							o.Base.Shape,
							t,
							i,
						));
	}
	W4o() {
		this.BulletInfo.Actor.SetActorHiddenInGame(!1);
		var o = this.CollisionInfo?.CollisionComponent;
		if (o) {
			var l = this.CollisionInfo.NeedHitObstacles,
				t = this.BulletInfo.BulletDataMain.Base.IsOversizeForTrace;
			let e = !1;
			(e =
				!this.CollisionInfo.HasObstaclesCollision && l
					? !t
					: this.BulletInfo.ActorComponent.NeedDetach) &&
				o.SetCollisionProfileName(
					BulletConstant_1.BulletConstant.ProfileNameOnlyBullet,
				),
				this.BulletInfo.Actor.SetActorEnableCollision(!0);
		}
	}
	SetCollisionIgnoreChannels(o) {
		for (const l of this.CollisionInfo.IgnoreChannels)
			o.SetCollisionResponseToChannel(l, 0);
	}
}
exports.BulletActionInitCollision = BulletActionInitCollision;
