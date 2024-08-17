"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var r,
			i = arguments.length,
			a =
				i < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, o, n);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (a = (i < 3 ? r(a) : 3 < i ? r(t, o, a) : r(t, o)) || a);
		return 3 < i && a && Object.defineProperty(t, o, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PasserbyGeneratorComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Net_1 = require("../../../../../Core/Net/Net"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
	Global_1 = require("../../../../Global"),
	GameSplineComponent_1 = require("../../../../LevelGamePlay/Common/GameSplineComponent"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager");
class SplineStateInfo {
	constructor(e, t) {
		(this.PbDataId = 0),
			(this.Location = Vector_1.Vector.Create()),
			(this.InRange = !1),
			(this.PbDataId = e),
			(this.Location = t);
	}
}
let PasserbyGeneratorComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Hte = void 0),
			(this.SIe = void 0),
			(this.Win = Array()),
			(this.Kin = 0),
			(this.Qin = !0),
			(this.wit = Vector_1.Vector.Create());
	}
	OnStart() {
		(this.Hte = this.Entity.GetComponent(1)),
			(this.SIe = this.Entity.GetComponent(0));
		var e,
			t,
			o = (0, IComponent_1.getComponent)(
				this.SIe.GetPbEntityInitData().ComponentsData,
				"PasserbyNpcSpawnComponent",
			);
		if (!o?.SpawnConfig.MinDistance) return !(this.Qin = !1);
		this.Kin = o.SpawnConfig.MinDistance * o.SpawnConfig.MinDistance;
		for (const n of o.MoveConfig.Routes)
			n.IsLoop &&
				((e = n.SplineEntityId),
				(t = new GameSplineComponent_1.GameSplineComponent(e)).Initialize()
					? t.GetNumberOfSplinePoints() &&
						this.Win.push(
							new SplineStateInfo(e, t.GetWorldLocationAtSplinePoint(0)),
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"NPC",
							51,
							"行人生成器获取样条信息错误",
							["PbDataId", this.SIe?.GetPbDataId()],
							["SplinePbDataId", e],
						));
		return this.Win.length || (this.Qin = !1), !0;
	}
	OnTick(e) {
		if (this.Qin)
			for (const e of this.Win)
				this.Xin(e.Location)
					? e.InRange ||
						((e.InRange = !0),
						this.$in(e.PbDataId, !0),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("NPC", 51, "进入生成范围", [
								"PbDataId",
								this.SIe?.GetPbDataId(),
							]))
					: e.InRange &&
						((e.InRange = !1),
						this.$in(e.PbDataId, !1),
						Log_1.Log.CheckDebug()) &&
						Log_1.Log.Debug("NPC", 51, "离开生成范围", [
							"PbDataId",
							this.SIe?.GetPbDataId(),
						]);
	}
	Xin(e) {
		let t = MathUtils_1.MathUtils.MaxFloat;
		var o;
		return (
			ModelManager_1.ModelManager.GameModeModel.IsMulti
				? (t = (o = this.Yin(e)).MinDistSquared)
				: (o = Global_1.Global.BaseCharacter)?.IsValid() &&
					(o.CharacterActorComponent.ActorLocationProxy.Subtraction(
						e,
						this.wit,
					),
					(t = this.wit.SizeSquared2D())),
			t < this.Kin
		);
	}
	$in(e, t) {
		var o = Protocol_1.Aki.Protocol.iJn.create();
		(o.rkn = MathUtils_1.MathUtils.NumberToLong(
			this.Hte.CreatureData.GetCreatureDataId(),
		)),
			(o.d7n = e),
			(o.C7n = t),
			Net_1.Net.Call(25538, o, (e) => {
				e &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						11896,
					);
			});
	}
	Yin(e) {
		var t = ModelManager_1.ModelManager.CreatureModel.ScenePlayerDataMap,
			o = ModelManager_1.ModelManager.SceneTeamModel;
		let n,
			r = MathUtils_1.MathUtils.MaxFloat;
		for (const s of t) {
			var i,
				a = o.GetTeamItem(s[0], { ParamType: 2, IsControl: !0 })?.EntityHandle;
			a &&
				(a.Entity.GetComponent(3).ActorLocationProxy.Subtraction(e, this.wit),
				(i = this.wit.SizeSquared2D()) < r) &&
				((r = i), (n = a));
		}
		return { PlayerEntity: n, MinDistSquared: r };
	}
};
(PasserbyGeneratorComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(189)],
	PasserbyGeneratorComponent,
)),
	(exports.PasserbyGeneratorComponent = PasserbyGeneratorComponent);
