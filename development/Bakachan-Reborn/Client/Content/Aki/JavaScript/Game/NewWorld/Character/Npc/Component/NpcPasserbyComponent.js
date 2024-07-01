"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, r) {
		var i,
			n = arguments.length,
			a =
				n < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, o))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, o, r);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(i = e[s]) && (a = (n < 3 ? i(a) : 3 < n ? i(t, o, a) : i(t, o)) || a);
		return 3 < n && a && Object.defineProperty(t, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcPasserbyComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	GameSplineComponent_1 = require("../../../../LevelGamePlay/Common/GameSplineComponent"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	NPC_PB = "dps",
	END_DISTANCE = 30,
	ENTITY_REMOVE_DELAY = 3,
	DEFUALT_MOVE_SPEED = 100;
let NpcPasserbyComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this._in = 0),
			(this.uin = 0),
			(this.Hte = void 0),
			(this.Gce = void 0),
			(this.cin = !1),
			(this.lJo = !1),
			(this.tu = void 0),
			(this.Qrr = void 0),
			(this.JLe = void 0),
			(this.din = Vector_1.Vector.Create());
	}
	OnCreate(e) {
		return (
			(this.cin = !1),
			(this.Hte = this.Entity.CheckGetComponent(2)),
			(this.Gce = this.Entity.GetComponent(36)),
			!(!this.Hte || !this.Gce)
		);
	}
	OnStart() {
		var e = this.Hte.CreatureData,
			t = e.ComponentDataMap.get("dps")?.dps;
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("NPC", 43, "特效NPC没有NpcPb相关配置数据", [
						"PbDataId",
						e.GetPbDataId(),
					]),
				!1
			);
		if (
			((this._in = t.HMs),
			(this.uin = t.qVn),
			!(t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
				this.uin,
			)))
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("NPC", 51, "特效NPC没有行人生成器相关配置数据", [
						"GeneratorEntityId",
						this.uin,
					]),
				!1
			);
		var o = (0, IComponent_1.getComponent)(
			t.ComponentsData,
			"PasserbyNpcSpawnComponent",
		);
		if (!o)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"NPC",
						51,
						"获取行人NPC生成器配置失败",
						["PbDataId", e.GetPbDataId()],
						["GeneratorId", t?.Id],
					),
				!1
			);
		for (const e of o.MoveConfig.Routes)
			if (this._in === e.SplineEntityId) {
				(this.lJo = !!e.IsLoop),
					e.MoveState &&
						((this.tu = e.MoveState.MoveState),
						(this.Qrr = e.MoveState.MoveSpeed));
				break;
			}
		return (
			(e =
				this.Hte.Actor.CharacterMovement).KuroSetPredictionDataMaxMoveDeltaTime(
				1,
			),
			(e.MaxSimulationTimeStep = 1),
			!0
		);
	}
	HC(e) {
		var t = new GameSplineComponent_1.GameSplineComponent(e);
		if (!t.InitializeWithSubPoints(this.Hte.CreatureData.GetPbDataId()))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"NPC",
						43,
						"特效NPC找不到对应的样条实体或实体上没有样条组件",
						["PbDataId", this.Hte.CreatureData.GetPbDataId()],
						["SplineId", e],
					),
				!1
			);
		var o = t.PathPoint;
		if (o.length < 2)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"NPC",
						43,
						"特效NPC样条点数量小于2",
						["PbDataId", this.Hte.CreatureData.GetPbDataId()],
						["SplineId", e],
					),
				!1
			);
		var r = [],
			i = t.GetNumberOfSplinePoints();
		let n = 0;
		for (const e of o) {
			var a = {
				Index: e.IsMain ? n : -1,
				Position: e.Point,
				MoveState: this.tu ?? IComponent_1.EPatrolMoveState.Walk,
				MoveSpeed:
					this.Qrr ?? this.Gce?.CurrentMovementSettings?.WalkSpeed ?? 100,
			};
			e.IsMain &&
				(this.lJo ||
					n !== i - 2 ||
					(a.Callback = () => {
						this.cin = !0;
					}),
				n++),
				r.push(a);
		}
		return (
			(e = r[r.length - 1].Position),
			this.din.Set(e.X, e.Y, e.Z),
			(this.JLe = {
				Points: r,
				Navigation: !1,
				IsFly: !1,
				DebugMode: !0,
				Loop: this.lJo,
				CircleMove: this.lJo,
				UsePreviousIndex: !0,
				UseNearestPoint: !0,
				ReturnFalseWhenNavigationFailed: !1,
			}),
			this.lJo ||
				(this.JLe.Callback = (e) => {
					this.cin && this.Cin();
				}),
			!0
		);
	}
	OnActivate() {
		this.HC(this._in) && this.JLe && this.Gce.MoveAlongPath(this.JLe);
	}
	OnTick(e) {
		var t;
		!this.lJo &&
			this.cin &&
			((t = Vector_1.Vector.Dist(this.din, this.Hte.ActorLocationProxy)) <
				3 * this.Gce.Speed ||
				t <= 30) &&
			this.Cin();
	}
	Cin() {
		this.cin = !1;
		var e = Protocol_1.Aki.Protocol.zYn.create();
		(e.rkn = MathUtils_1.MathUtils.NumberToLong(
			this.Hte.CreatureData.GetCreatureDataId(),
		)),
			Net_1.Net.Call(11735, e, (e) => {
				e &&
					e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.Kms,
						14299,
					);
			});
	}
};
(NpcPasserbyComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(78)],
	NpcPasserbyComponent,
)),
	(exports.NpcPasserbyComponent = NpcPasserbyComponent);
