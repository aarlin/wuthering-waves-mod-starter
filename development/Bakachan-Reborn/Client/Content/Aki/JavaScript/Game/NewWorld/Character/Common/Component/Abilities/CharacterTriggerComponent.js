"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, r, t, o) {
		var a,
			n = arguments.length,
			i =
				n < 3
					? r
					: null === o
						? (o = Object.getOwnPropertyDescriptor(r, t))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, r, t, o);
		else
			for (var g = e.length - 1; 0 <= g; g--)
				(a = e[g]) && (i = (n < 3 ? a(i) : 3 < n ? a(r, t, i) : a(r, t)) || i);
		return 3 < n && i && Object.defineProperty(r, t, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterTriggerComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
	Trigger_1 = require("./Trigger/Trigger"),
	TriggerType_1 = require("./Trigger/TriggerType"),
	builtinFunc = {
		GetTags: (e) => {
			var r = [];
			for (const t of e.CheckGetComponent(185).TagContainer.GetAllExactTags() ??
				[])
				r.push(GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t));
			return r;
		},
		GetAttributeByID: (e, r) => e.CheckGetComponent(156).GetCurrentValue(r),
		MatchAnyTag: (e, r) =>
			e
				.CheckGetComponent(185)
				.HasAnyTag(
					r.map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
				),
		MatchAllTags: (e, r) =>
			e
				.CheckGetComponent(185)
				.HasAllTag(
					r.map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
				),
		GetShieldValue: (e) => e.CheckGetComponent(64)?.ShieldTotal ?? 0,
		Distance: (e, r) => {
			var t = ModelManager_1.ModelManager.CreatureModel,
				o = e?.GetComponent(0),
				a = r?.GetComponent(0);
			(o = o?.IsRole()
				? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation()
				: e?.CheckGetComponent(3)?.ActorLocationProxy),
				(e = a?.IsRole()
					? t.GetScenePlayerData(a.GetPlayerId())?.GetLocation()
					: r?.CheckGetComponent(3)?.ActorLocationProxy);
			return o && e ? Vector_1.Vector.Dist(o, e) : 1 / 0;
		},
		Distance2D: (e, r) => {
			var t = ModelManager_1.ModelManager.CreatureModel,
				o = e?.GetComponent(0),
				a = r?.GetComponent(0);
			(o = o?.IsRole()
				? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation()
				: e?.CheckGetComponent(3)?.ActorLocationProxy),
				(e = a?.IsRole()
					? t.GetScenePlayerData(a.GetPlayerId())?.GetLocation()
					: r?.CheckGetComponent(3)?.ActorLocationProxy);
			return o && e ? Vector_1.Vector.Dist2D(o, e) : 1 / 0;
		},
	};
let triggerHandleCounter = 0,
	CharacterTriggerComponent = class extends EntityComponent_1.EntityComponent {
		constructor() {
			super(...arguments), (this.o2r = new Map()), (this.r2r = new Map());
		}
		OnInit() {
			return !0;
		}
		OnStart() {
			for (const e of Object.keys(builtinFunc)) this.r2r.set(e, builtinFunc[e]);
			return (
				this.r2r.set("GetSelfTeamAttributeByID", (e) =>
					ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
						this.Entity.Id,
						{ ParamType: 1 },
					)?.IsMyRole()
						? FormationAttributeController_1.FormationAttributeController.GetValue(
								e,
							)
						: 0,
				),
				!0
			);
		}
		OnClear() {
			this.r2r.clear();
			for (const e of this.o2r.keys()) this.RemoveTrigger(e);
			return this.o2r.clear(), !0;
		}
		AddTrigger(e, r) {
			if (!e)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Battle", 20, "添加Trigger失败，找不到对应配置", [
							"owner",
							this.Entity.Id,
						]),
					TriggerType_1.INVALID_TRIGGER_HANDLE
				);
			var t = TriggerType_1.ETriggerEvent[e.Type];
			if (void 0 === (t = Trigger_1.Trigger.GetClass(t)))
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							20,
							"添加Trigger失败, 找不到对应的Trigger类型或客户端未作实现",
							["owner", this.Entity.Id],
							["triggerType", e.Type],
						),
					TriggerType_1.INVALID_TRIGGER_HANDLE
				);
			var o = triggerHandleCounter++;
			try {
				var a = new t(e, o, this, this.r2r, r);
				a.OnInitParams(e.Preset), this.o2r.set(o, a);
			} catch (r) {
				return (
					r instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Battle",
								20,
								"创建Trigger实例失败",
								r,
								["owner", this.Entity.Id],
								["triggerType", e.Type],
								["formula", e.Formula],
								["error", r.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Battle",
								20,
								"创建Trigger实例失败",
								["owner", this.Entity.Id],
								["triggerType", e.Type],
								["formula", e.Formula],
								["error", r],
							),
					TriggerType_1.INVALID_TRIGGER_HANDLE
				);
			}
			return o;
		}
		GetTrigger(e) {
			return this.o2r.get(e);
		}
		RemoveTrigger(e) {
			var r = this.o2r.get(e);
			r && (r.Destroy(), this.o2r.delete(e));
		}
		SetTriggerActive(e, r) {
			this.o2r.get(e)?.SetActive(r);
		}
	};
(CharacterTriggerComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(25)],
	CharacterTriggerComponent,
)),
	(exports.CharacterTriggerComponent = CharacterTriggerComponent);
