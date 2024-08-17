"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, o, n) {
		var r,
			i = arguments.length,
			s =
				i < 3
					? e
					: null === n
						? (n = Object.getOwnPropertyDescriptor(e, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, e, o, n);
		else
			for (var l = t.length - 1; 0 <= l; l--)
				(r = t[l]) && (s = (i < 3 ? r(s) : 3 < i ? r(e, o, s) : r(e, o)) || s);
		return 3 < i && s && Object.defineProperty(e, o, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterFollowComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActorUtils_1 = require("../../../../Utils/ActorUtils");
var EProtoSummonType = Protocol_1.Aki.Protocol.Oqs;
let CharacterFollowComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.zht = void 0),
			(this.k5r = []),
			(this.Jqi = 0),
			(this.SummonTypeInternal = 0);
	}
	get FollowIds() {
		return this.k5r;
	}
	get RoleId() {
		return this.Jqi;
	}
	get SummonType() {
		return this.SummonTypeInternal;
	}
	OnStart() {
		return (this.zht = this.Entity.GetComponent(0)), !0;
	}
	OnActivate() {
		return this.q8s(), !0;
	}
	OnEnd() {
		return this.DeleteFollowEntity(), !0;
	}
	SetRoleId(t, e) {
		(this.Jqi = t),
			(this.SummonTypeInternal = e),
			0 !== this.Jqi &&
				(t = EntitySystem_1.EntitySystem.Get(this.Jqi)?.GetComponent(83)) &&
				this.Entity.GetComponent(33)?.ResetRoleGrowComponent(t);
	}
	GetRoleActor() {
		var t = EntitySystem_1.EntitySystem.Get(this.Jqi);
		if (t?.Valid) return t.GetComponent(1).Owner;
	}
	GetFollowActor() {
		var t = this.k5r,
			e = UE.NewArray(UE.Actor);
		if (t)
			for (const n of t) {
				var o = EntitySystem_1.EntitySystem.Get(n);
				o?.Valid && (o = o.GetComponent(1).Owner) && e.Add(o);
			}
		return e;
	}
	SetFollowId(t) {
		-1 !== this.k5r.indexOf(t)
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Character", 23, "Add the Same Summon Id:", ["id", t])
			: this.k5r.push(t);
	}
	DeleteFollowEntity() {
		var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
			this.zht.GetSummonerId(),
		);
		t?.Valid && t.Entity.GetComponent(47).G8s(this.Entity.Id);
	}
	GetAttributeHolder() {
		return 0 !== this.RoleId && 2 === this.SummonType
			? EntitySystem_1.EntitySystem.Get(this.RoleId)
			: this.Entity;
	}
	SetFollowData(t, e) {
		var o;
		t?.IsValid()
			? (o = (t =
					ActorUtils_1.ActorUtils.GetEntityByActor(t))?.Entity?.GetComponent(
					47,
				))
				? (o.SetRoleId(this.Entity.Id, e), this.SetFollowId(t.Id))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Character",
						23,
						"该角色没有CharacterFollowComponent组件",
					)
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Character", 23, "SetFollowData 对象为null");
	}
	Reset(t = 0) {
		this.G8s(t), (this.SummonTypeInternal = 0), (this.Jqi = 0);
	}
	GetToRoleDistance() {
		var t;
		return this.RoleId &&
			(t = EntitySystem_1.EntitySystem.Get(this.RoleId)) &&
			this.Entity &&
			this.Entity.GetComponent(1) &&
			t.GetComponent(1)
			? UE.Vector.Dist(
					this.Entity.GetComponent(1).ActorLocation,
					t.GetComponent(1).ActorLocation,
				)
			: -1;
	}
	q8s() {
		var t,
			e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
				this.zht.GetSummonerId(),
			);
		e?.Valid &&
			this.zht.SummonType ===
				EProtoSummonType.Proto_ESummonTypeConcomitantVision &&
			((t = e.Entity.GetComponent(47)),
			this.SetRoleId(e.Id, 2),
			t.SetFollowId(this.Entity.Id));
	}
	G8s(t) {
		0 !== t
			? -1 !== (t = this.k5r.indexOf(t)) && this.k5r.splice(t, 1)
			: (this.k5r = []);
	}
};
(CharacterFollowComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(47)],
	CharacterFollowComponent,
)),
	(exports.CharacterFollowComponent = CharacterFollowComponent);
