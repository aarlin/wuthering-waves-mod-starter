"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
	Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
	CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds"),
	BulletController_1 = require("./BulletController"),
	BulletUtil_1 = require("./BulletUtil");
class BulletBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static CreateBulletForDebug(t, e) {
		return BulletController_1.BulletController.CreateBulletForDebug(t, e);
	}
	static GetSpecialBulletToSkillId(t, e) {
		return "" !== e
			? e
			: (e = CharacterBuffIds_1.specialBulletToSkillIdMap.get(t))
				? e.toString()
				: "";
	}
	static CreateBulletFromGA(t, e, o, r, l, a) {
		if (
			"" ===
			(r = BulletBlueprintFunctionLibrary.GetSpecialBulletToSkillId(e, r))
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Bullet", 36, "CreateBulletFromGA的SkillId为空", [
						"bullet",
						e,
					]),
				-1
			);
		var n = t.GetEntityNoBlueprint()?.GetComponent(33);
		let i = n?.GetSkill(Number(r))?.CombatMessageId;
		if (!i && n?.Entity?.Id) {
			var u = EntitySystem_1.EntitySystem.GetComponent(
				n?.Entity?.Id,
				0,
			).GetSummonerId();
			if (0 < u) {
				const t =
					ModelManager_1.ModelManager.CreatureModel.GetEntity(u)?.Entity;
				(u = t?.GetComponent(33)),
					(i = u?.GetSkill(Number(r))?.CombatMessageId);
			} else
				(u = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
					n?.Entity,
					Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
				)?.Entity?.GetComponent(33)),
					(i = u?.GetSkill(Number(r))?.CombatMessageId);
		}
		return (n = BulletController_1.BulletController.CreateBulletCustomTarget(
			t,
			e,
			o,
			{ SkillId: Number(r), SyncType: l ? 1 : 0, InitTargetLocation: a },
			i,
		))
			? n.Id
			: -1;
	}
	static GetBulletActorById(t) {
		if (((t = EntitySystem_1.EntitySystem.Get(t)), t?.Valid))
			return t.GetComponent(152).Owner;
	}
	static DestroyBullet(t, e) {
		return BulletController_1.BulletController.DestroyBullet(t, e), !0;
	}
	static DestroyAllBullet(t = !1) {
		BulletController_1.BulletController.DestroyAllBullet(t);
	}
	static GetCharacterLaunchedBulletIds(t) {
		if (
			(t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t))
		) {
			var e = UE.NewArray(UE.BuiltinInt);
			for (const o of t) e.Add(o.Id);
			return e;
		}
	}
	static DebugShowBulletCollision(t, e) {
		ModelManager_1.ModelManager.BulletModel.SetBulletCollisionDraw(e, t);
	}
	static DebugShowBulletTrace(t, e) {
		ModelManager_1.ModelManager.BulletModel.SetBulletTraceDraw(e, t);
	}
	static GetIsShowBulletCollision(t) {
		return ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(t);
	}
	static GetIsShowBulletTrace(t) {
		return ModelManager_1.ModelManager.BulletModel?.ShowBulletTrace(t) ?? !1;
	}
	static FrozenBulletTimeByBulletName(t, e, o) {
		BulletUtil_1.BulletUtil.FrozenCharacterBullet(
			t.GetEntityIdNoBlueprint(),
			e,
			o,
		);
	}
	static SetEntityIdByCustomKey(t, e, o) {
		ModelManager_1.ModelManager.BulletModel.SetEntityIdByCustomKey(t, e, o);
	}
	static GetAllBullet() {
		var t = UE.NewArray(UE.BuiltinInt);
		for (const e of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator())
			for (const o of e) t.Add(o.Id);
		return t;
	}
	static GetBulletTransform(t) {
		return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.ActorComponent
			.ActorTransform;
	}
	static GetBulletAttacker(t) {
		return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.AttackerActorComp
			.Actor;
	}
	static GetBulletCollision(t) {
		return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.CollisionInfo
			.CollisionComponent;
	}
	static GetBulletName(t) {
		return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.BulletDataMain
			.BulletName;
	}
	static SetBulletStopHitTrue(t) {
		(t = BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.CollisionInfo),
			t && (t.StopHit = !0);
	}
	static SetBulletTarget(t, e) {
		(t = BulletBlueprintFunctionLibrary.GetBulletInfo(t)),
			t?.SetTargetById(e ? e.GetEntityIdNoBlueprint() : 0);
	}
	static SetBulletSummon(t) {
		BulletBlueprintFunctionLibrary.GetBulletInfo(
			t,
		)?.ChildInfo?.SetIsActiveSummonChildBullet(!0);
	}
	static SetBulletTransform(t, e) {
		BulletBlueprintFunctionLibrary.GetBulletInfo(
			t,
		)?.ActorComponent.SetActorTransform(e);
	}
	static SetBeginSpeed(t, e) {
		(t = BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.MoveInfo),
			t && (t.BulletSpeedRatio = e);
	}
	static GetBulletInfo(t) {
		return ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
			t,
		)?.GetBulletInfo();
	}
	static CalSectorPoints(t, e, o, r, l, a, n) {
		e.Normalize(MathCommon_1.MathCommon.SmallNumber),
			o.Normalize(MathCommon_1.MathCommon.SmallNumber);
		var i = 0 < a ? r / a : r;
		let u = e.RotateAngleAxis((r / 2) * -1, o).op_Multiply(l);
		(e = t.op_Addition(u)), n.Add(e);
		for (let e = 0; e < a; e++) {
			u = u.RotateAngleAxis(i, o);
			var c = t.op_Addition(u);
			n.Add(c);
		}
	}
	static RectangleTriangles(t, e, o, r, l) {
		l.Add(o), l.Add(r), l.Add(e), l.Add(o), l.Add(e), l.Add(t);
	}
	static CalcPipe(t, e, o, r, l, a, n, i, u) {
		e.Normalize(MathCommon_1.MathCommon.SmallNumber),
			o.Normalize(MathCommon_1.MathCommon.SmallNumber);
		var c = Vector_1.Vector.Create(o),
			s =
				((a = (c.MultiplyEqual(a), Vector_1.Vector.Create(t))),
				(t = Vector_1.Vector.Create()),
				a.Subtraction(c, t),
				Vector_1.Vector.Create()),
			m =
				((a = (a.Addition(c, s), (0, puerts_1.$unref)(i))),
				(0, puerts_1.$unref)(u)),
			B =
				(BulletBlueprintFunctionLibrary.CalSectorPoints(
					t.ToUeVector(),
					e,
					o,
					360,
					l,
					n,
					a,
				),
				a.Num()),
			d =
				(BulletBlueprintFunctionLibrary.CalSectorPoints(
					t.ToUeVector(),
					e,
					o,
					360,
					r,
					n,
					a,
				),
				a.Num()),
			C =
				(BulletBlueprintFunctionLibrary.CalSectorPoints(
					s.ToUeVector(),
					e,
					o,
					360,
					l,
					n,
					a,
				),
				a.Num());
		BulletBlueprintFunctionLibrary.CalSectorPoints(
			s.ToUeVector(),
			e,
			o,
			360,
			r,
			n,
			a,
		);
		for (let t = 0; t < B - 1; t++) {
			var M = d + t,
				_ = d + t + 1,
				p = C + t,
				y = C + t + 1;
			BulletBlueprintFunctionLibrary.RectangleTriangles(M, p, _, y, m),
				(M = 0 + t + 1),
				(_ = 0 + t),
				(p = B + t + 1),
				(y = B + t),
				BulletBlueprintFunctionLibrary.RectangleTriangles(M, p, _, y, m),
				(M = 0 + t),
				(_ = 0 + t + 1),
				(p = d + t),
				(y = d + t + 1),
				BulletBlueprintFunctionLibrary.RectangleTriangles(M, p, _, y, m),
				(M = B + t + 1),
				(_ = B + t),
				(p = C + t + 1),
				(y = C + t),
				BulletBlueprintFunctionLibrary.RectangleTriangles(M, p, _, y, m);
		}
	}
	static CircleTriangles(t, e, o, r, l) {
		for (let a = e; a < o; a++)
			r
				? (l.Add(t), l.Add(a + 1), l.Add(a))
				: (l.Add(t), l.Add(a), l.Add(a + 1));
	}
	static CalcSector(t, e, o, r, l, a, n, i, u) {
		e.Normalize(MathCommon_1.MathCommon.SmallNumber),
			o.Normalize(MathCommon_1.MathCommon.SmallNumber);
		i = (0, puerts_1.$unref)(i);
		var c = (0, puerts_1.$unref)(u),
			s =
				((u =
					r > MathCommon_1.MathCommon.RoundAngle
						? MathCommon_1.MathCommon.RoundAngle
						: r),
				(r = t.op_Subtraction(o.op_Multiply(a))),
				(t = t.op_Addition(o.op_Multiply(a))),
				i.Add(r),
				BulletBlueprintFunctionLibrary.CalSectorPoints(r, e, o, u, l, n, i),
				i.Num() - 1),
			m = i.Num();
		i.Add(t),
			BulletBlueprintFunctionLibrary.CalSectorPoints(t, e, o, u, l, n, i),
			(a = i.Num() - 1);
		BulletBlueprintFunctionLibrary.CircleTriangles(0, 1, s, !1, c),
			BulletBlueprintFunctionLibrary.CircleTriangles(m, m + 1, a, !0, c),
			MathUtils_1.MathUtils.IsNearlyEqual(
				u,
				MathCommon_1.MathCommon.RoundAngle,
			) ||
				(BulletBlueprintFunctionLibrary.RectangleTriangles(1, m + 1, 0, m, c),
				BulletBlueprintFunctionLibrary.RectangleTriangles(0, m, s, a, c));
		for (let t = 1; t < s; t++) {
			var B = t,
				d = t + 1,
				C = m + B,
				M = m + d;
			BulletBlueprintFunctionLibrary.RectangleTriangles(d, M, B, C, c);
		}
	}
	static CalcBulletInitLocation(t, e, o) {
		var r = e.GetTransform();
		e = Quat_1.Quat.Create();
		if (
			(Rotator_1.Rotator.Create(0, 90, 0).Quaternion(e),
			r.SetRotation(e.ToUeQuat()),
			3 === t.移动设置.运动轨迹类型)
		) {
			let l,
				a,
				n = 0;
			(a =
				0 === t.移动设置.运动轨迹参数目标 ||
				6 === t.移动设置.运动轨迹参数目标 ||
				1 === t.移动设置.运动轨迹参数目标
					? ((l = r.GetLocation()),
						(n = r.Rotator().Yaw),
						r.GetRotation().GetForwardVector())
					: ((l = o.GetLocation()),
						(n = o.GetRotation().Rotator().Yaw),
						o.GetRotation().Vector())),
				(e = t.移动设置.运动轨迹参数数据.Get(0));
			let i = a.RotateAngleAxis(e.Y, Vector_1.Vector.UpVector);
			return (
				(i.Z =
					-Math.sin((n + e.Y) * MathCommon_1.MathCommon.DegToRad) *
					Math.tan(e.Z * MathCommon_1.MathCommon.DegToRad)),
				i.Normalize(MathCommon_1.MathCommon.SmallNumber),
				(i = (i = i.op_Multiply(e.X)).op_Addition(l))
			);
		}
		var l = Vector_1.Vector.Create(),
			a = Vector_1.Vector.Create();
		switch (
			(a.FromUeVector(t.基础设置.出生位置偏移), t.基础设置.出生位置基准)
		) {
			case 0:
			case 6:
				l.FromUeVector(r.TransformPosition(a.ToUeVector()));
				break;
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 7:
			case 8:
			case 9:
			case 10:
				l.FromUeVector(o.TransformPosition(a.ToUeVector()));
		}
		return l.ToUeVector();
	}
	static AttachToBone(t, e, o) {
		var r = o.移动设置.子弹跟随类型;
		0 === r
			? e.K2_AttachToComponent(t, o.移动设置.骨骼名字, 1, 1, 1, !0)
			: 3 === r &&
				(e.K2_AttachToComponent(t, o.移动设置.骨骼名字, 1, 1, 1, !0),
				e.K2_SetActorRelativeLocation(o.基础设置.出生位置偏移, !1, void 0, !1),
				e.K2_SetActorRelativeRotation(
					Rotator_1.Rotator.ZeroRotator,
					!1,
					void 0,
					!0,
				));
	}
	static CalcBulletInitRotator(t, e, o, r, l) {
		var a = Rotator_1.Rotator.Create();
		if (3 === t.移动设置.运动轨迹类型) return e.K2_GetActorRotation();
		switch (t.移动设置.出生初速度方向基准) {
			case 0:
				var n = e
					.GetActorForwardVector()
					.RotateAngleAxis(90, Vector_1.Vector.UpVector);
				a.FromUeRotator(n.Rotation());
				break;
			case 2:
			case 7:
				a.FromUeRotator(
					UE.KismetMathLibrary.FindLookAtRotation(
						e.K2_GetActorLocation(),
						o.K2_GetActorLocation(),
					),
				);
				break;
			case 1:
			case 5:
			case 6:
			case 10:
			case 9:
			case 8:
			case 11:
				a.FromUeRotator(
					UE.KismetMathLibrary.FindLookAtRotation(
						e.K2_GetActorLocation(),
						r.GetLocation(),
					),
				);
				break;
			case 3:
				a.FromUeRotator(l.K2_GetActorRotation());
				break;
			case 4:
				a.FromUeRotator(e.K2_GetActorRotation());
		}
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Bullet", 21, "CalcBulletInitRotator", ["ret", a]),
			a.ToUeRotator()
		);
	}
	static CalcBulletRotator(t, e, o, r, l) {
		var a = Rotator_1.Rotator.Create(),
			n = Vector_1.Vector.Create();
		switch (t.移动设置.运动轨迹类型) {
			case 0:
				a.FromUeRotator(e.K2_GetActorRotation());
				break;
			case 1:
				break;
			case 2:
				a.FromUeRotator(
					UE.KismetMathLibrary.FindLookAtRotation(e.K2_GetActorLocation(), r),
				);
				break;
			case 3: {
				var i = t.移动设置.运动轨迹参数数据.Get(0),
					u =
						(t.移动设置.移动速度 * l * MathCommon_1.MathCommon.RadToDeg) / i.X;
				let a;
				n.Set(
					0,
					Math.sin(i.Z * MathCommon_1.MathCommon.DegToRad),
					Math.cos(i.Z * MathCommon_1.MathCommon.DegToRad),
				),
					(i = (a =
						0 === t.移动设置.运动轨迹参数目标 ||
						6 === t.移动设置.运动轨迹参数目标 ||
						1 === t.移动设置.运动轨迹参数目标
							? o.K2_GetActorLocation()
							: r)
						.op_Subtraction(e.K2_GetActorLocation())
						.RotateAngleAxis(u, n.ToUeVector())),
					(u = a.op_Addition(i)),
					e.K2_SetActorRotation(
						UE.KismetMathLibrary.FindLookAtRotation(a, u),
						!1,
					),
					e.K2_SetActorLocation(u, !1, void 0, !0);
				break;
			}
		}
		return a.ToUeRotator();
	}
	static CalcBulletLocation(t, e, o) {
		return e
			.K2_GetActorLocation()
			.op_Addition(
				e.GetActorForwardVector().op_Multiply(t.移动设置.移动速度 * o),
			);
	}
}
exports.default = BulletBlueprintFunctionLibrary;
