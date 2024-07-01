"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, l) {
		var i,
			r = arguments.length,
			a =
				r < 3
					? e
					: null === l
						? (l = Object.getOwnPropertyDescriptor(e, o))
						: l;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(t, e, o, l);
		else
			for (var n = t.length - 1; 0 <= n; n--)
				(i = t[n]) && (a = (r < 3 ? i(a) : 3 < r ? i(e, o, a) : i(e, o)) || a);
		return 3 < r && a && Object.defineProperty(e, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BulletActionLogicComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	PerformanceDecorators_1 = require("../../../../Core/Performance/PerformanceDecorators"),
	BulletLogicAdditiveAccelerateController_1 = require("../BulletLogicDataAssetController/BulletLogicAdditiveAccelerateController"),
	BulletLogicCreateBulletController_1 = require("../BulletLogicDataAssetController/BulletLogicCreateBulletController"),
	BulletLogicCurveMovementController_1 = require("../BulletLogicDataAssetController/BulletLogicCurveMovementController"),
	BulletLogicDestroyBulletController_1 = require("../BulletLogicDataAssetController/BulletLogicDestroyBulletController"),
	BulletLogicDestroyOtherBullet_1 = require("../BulletLogicDataAssetController/BulletLogicDestroyOtherBullet"),
	BulletLogicForceController_1 = require("../BulletLogicDataAssetController/BulletLogicForceController"),
	BulletLogicFreezeController_1 = require("../BulletLogicDataAssetController/BulletLogicFreezeController"),
	BulletLogicManipulatableCreateBullet_1 = require("../BulletLogicDataAssetController/BulletLogicManipulatableCreateBullet"),
	BulletLogicManipulatableTagsChange_1 = require("../BulletLogicDataAssetController/BulletLogicManipulatableTagsChange"),
	BulletLogicReboundController_1 = require("../BulletLogicDataAssetController/BulletLogicReboundController"),
	BulletLogicShakeCameraController_1 = require("../BulletLogicDataAssetController/BulletLogicShakeCameraController"),
	BulletLogicShowMesh_1 = require("../BulletLogicDataAssetController/BulletLogicShowMesh"),
	BulletLogicSpawnObstacles_1 = require("../BulletLogicDataAssetController/BulletLogicSpawnObstacles"),
	BulletLogicSpeedReduceController_1 = require("../BulletLogicDataAssetController/BulletLogicSpeedReduceController"),
	BulletLogicSuiGuang_1 = require("../BulletLogicDataAssetController/BulletLogicSuiGuang"),
	BulletLogicSupportController_1 = require("../BulletLogicDataAssetController/BulletLogicSupportController"),
	BulletLogicWhirlpool_1 = require("../BulletLogicDataAssetController/BulletLogicWhirlpool"),
	LogicDataAdditiveAccelerate_1 = require("../LogicDataClass/LogicDataAdditiveAccelerate"),
	LogicDataCreateBullet_1 = require("../LogicDataClass/LogicDataCreateBullet"),
	LogicDataDestroyBullet_1 = require("../LogicDataClass/LogicDataDestroyBullet"),
	LogicDataDestroyOtherBullet_1 = require("../LogicDataClass/LogicDataDestroyOtherBullet"),
	LogicDataForce_1 = require("../LogicDataClass/LogicDataForce"),
	LogicDataFreeze_1 = require("../LogicDataClass/LogicDataFreeze"),
	LogicDataManipulatableCreateBullet_1 = require("../LogicDataClass/LogicDataManipulatableCreateBullet"),
	LogicDataManipulatableTagsChange_1 = require("../LogicDataClass/LogicDataManipulatableTagsChange"),
	LogicDataRebound_1 = require("../LogicDataClass/LogicDataRebound"),
	LogicDataShakeScreen_1 = require("../LogicDataClass/LogicDataShakeScreen"),
	LogicDataShowMesh_1 = require("../LogicDataClass/LogicDataShowMesh"),
	LogicDataSpawnObstacles_1 = require("../LogicDataClass/LogicDataSpawnObstacles"),
	LogicDataSpeedReduce_1 = require("../LogicDataClass/LogicDataSpeedReduce"),
	LogicDataSplineMovement_1 = require("../LogicDataClass/LogicDataSplineMovement"),
	LogicDataSuiGuang_1 = require("../LogicDataClass/LogicDataSuiGuang"),
	LogicDataSupport_1 = require("../LogicDataClass/LogicDataSupport"),
	LogicDataWhirlpool_1 = require("../LogicDataClass/LogicDataWhirlpool"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let BulletActionLogicComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this._9o = void 0),
			(this.tbr = void 0),
			(this.ibr = void 0),
			(this.obr = void 0),
			(this.rbr = void 0),
			(this.nbr = void 0),
			(this.sbr = void 0),
			(this.abr = void 0),
			(this.hbr = void 0),
			(this.lbr = !1),
			(this._br = !1);
	}
	get ObstaclesDetect() {
		return this.lbr;
	}
	OnStart() {
		(this._9o = this.Entity.GetBulletInfo()),
			((this._9o.ActionLogicComponent = this).tbr = this._9o.BulletDataMain),
			(this._br =
				this.tbr.Base.ContinuesCollision &&
				(0 < this.tbr.Base.Interval || 0 < this.tbr.Base.CollisionActiveDelay));
		var t = this.tbr.Execution.GbDataList;
		if (t && 0 < t.length)
			for (const o of t) {
				var e = this.ubr(o);
				0 === o.ExecuteStage
					? (this.ibr || (this.ibr = []), this.ibr.push(e))
					: 2 === o.ExecuteStage
						? (this.rbr || (this.rbr = []), this.rbr.push(e))
						: 1 === o.ExecuteStage
							? (this.obr || (this.obr = []), this.obr.push(e))
							: 3 === o.ExecuteStage
								? (this.nbr || (this.nbr = []), this.nbr.push(e))
								: 4 === o.ExecuteStage
									? (this.sbr || (this.sbr = []), this.sbr.push(e))
									: 5 === o.ExecuteStage &&
										(this.abr || (this.abr = []), this.abr.push(e)),
					e.NeedTick && (this.hbr || (this.hbr = []), this.hbr.push(e));
			}
		return !0;
	}
	OnAfterInit() {
		if (this.ibr) for (const t of this.ibr) t.OnInit(), t.BulletLogicAction();
		if (this.rbr) for (const t of this.rbr) t.OnInit();
		if (this.obr) for (const t of this.obr) t.OnInit();
		if (this.nbr) for (const t of this.nbr) t.OnInit();
		if (this.sbr) for (const t of this.sbr) t.OnInit();
		if (this.abr) for (const t of this.abr) t.OnInit();
	}
	OnTick(t) {
		if (this._9o.IsInit) {
			if (this._br && this._9o.CollisionInfo.HaveCharacterInBullet && this.obr)
				for (const t of this.obr) t.BulletLogicAction();
			if (!this._9o.NeedDestroy && this.hbr)
				for (const e of this.hbr) e.Tick(t);
		}
	}
	OnEnd() {
		if (this.ibr) for (const t of this.ibr) t.OnBulletDestroy();
		if (this.obr) for (const t of this.obr) t.OnBulletDestroy();
		if (this.rbr) for (const t of this.rbr) t.OnBulletDestroy();
		if (this.nbr) for (const t of this.nbr) t.OnBulletDestroy();
		if (this.sbr) for (const t of this.sbr) t.OnBulletDestroy();
		if (this.abr) for (const t of this.abr) t.OnBulletDestroy();
		return !(this.lbr = !1);
	}
	ActionDestroy() {
		if (this.rbr) for (const t of this.rbr) t.BulletLogicAction();
	}
	ActionHit(t) {
		if (this._9o.IsInit && !this._br && this.obr)
			for (const e of this.obr) e.BulletLogicAction(t);
	}
	ActionHitObstacles(t) {
		if (this._9o.IsInit && this.obr)
			for (const e of this.obr) e.BulletLogicActionOnHitObstacles(t);
	}
	ActionRebound(t) {
		if (this.nbr) for (const e of this.nbr) e.BulletLogicAction(t);
	}
	ActionSupport(t) {
		if (
			((!this.sbr || this.sbr?.length <= 0) &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Bullet",
					21,
					"与子弹碰撞, 执行Support",
					["This.Id", this._9o.BulletRowName],
					["this.OnSupportController.Len", this.sbr?.length],
				),
			this.sbr)
		)
			for (const e of this.sbr) e.BulletLogicAction(t);
	}
	ActionTickMovement(t) {
		if (this.abr) for (const e of this.abr) e.BulletLogicAction(t);
	}
	ubr(t) {
		return t instanceof LogicDataCreateBullet_1.default
			? new BulletLogicCreateBulletController_1.BulletLogicCreateBulletController(
					t,
					this.Entity,
				)
			: t instanceof LogicDataDestroyBullet_1.default
				? new BulletLogicDestroyBulletController_1.BulletLogicDestroyBulletController(
						t,
						this.Entity,
					)
				: t instanceof LogicDataForce_1.default
					? new BulletLogicForceController_1.BulletLogicForceController(
							t,
							this.Entity,
						)
					: t instanceof LogicDataSpeedReduce_1.default
						? ((this.lbr = !0),
							new BulletLogicSpeedReduceController_1.BulletLogicSpeedReduceController(
								t,
								this.Entity,
							))
						: t instanceof LogicDataAdditiveAccelerate_1.default
							? new BulletLogicAdditiveAccelerateController_1.BulletLogicAdditiveAccelerateController(
									t,
									this.Entity,
								)
							: t instanceof LogicDataFreeze_1.default
								? new BulletLogicFreezeController_1.BulletLogicFreezeController(
										t,
										this.Entity,
									)
								: t instanceof LogicDataRebound_1.default
									? new BulletLogicReboundController_1.BulletLogicReboundController(
											t,
											this.Entity,
										)
									: t instanceof LogicDataSupport_1.default
										? new BulletLogicSupportController_1.BulletLogicSupportController(
												t,
												this.Entity,
											)
										: t instanceof LogicDataSplineMovement_1.default
											? new BulletLogicCurveMovementController_1.BulletLogicCurveMovementController(
													t,
													this.Entity,
												)
											: t instanceof LogicDataShakeScreen_1.default
												? new BulletLogicShakeCameraController_1.BulletLogicShakeCameraController(
														t,
														this.Entity,
													)
												: t instanceof LogicDataShowMesh_1.default
													? new BulletLogicShowMesh_1.BulletLogicShowMesh(
															t,
															this.Entity,
														)
													: t instanceof LogicDataSuiGuang_1.default
														? new BulletLogicSuiGuang_1.BulletLogicSuiGuang(
																t,
																this.Entity,
															)
														: t instanceof LogicDataSpawnObstacles_1.default
															? new BulletLogicSpawnObstacles_1.BulletLogicSpawnObstacles(
																	t,
																	this.Entity,
																)
															: t instanceof
																	LogicDataManipulatableCreateBullet_1.default
																? new BulletLogicManipulatableCreateBullet_1.BulletLogicManipulatableCreateBullet(
																		t,
																		this.Entity,
																	)
																: t instanceof
																		LogicDataManipulatableTagsChange_1.default
																	? new BulletLogicManipulatableTagsChange_1.BulletLogicManipulatableTagsChange(
																			t,
																			this.Entity,
																		)
																	: t instanceof LogicDataWhirlpool_1.default
																		? new BulletLogicWhirlpool_1.BulletLogicWhirlpool(
																				t,
																				this.Entity,
																			)
																		: t instanceof
																				LogicDataDestroyOtherBullet_1.default
																			? new BulletLogicDestroyOtherBullet_1.BulletLogicDestroyOtherBullet(
																					t,
																					this.Entity,
																				)
																			: void 0;
	}
};
__decorate(
	[(0, PerformanceDecorators_1.TickPerformanceEx)("Bullet", !1)],
	BulletActionLogicComponent.prototype,
	"OnTick",
	null,
),
	(BulletActionLogicComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(13)],
		BulletActionLogicComponent,
	)),
	(exports.BulletActionLogicComponent = BulletActionLogicComponent);
