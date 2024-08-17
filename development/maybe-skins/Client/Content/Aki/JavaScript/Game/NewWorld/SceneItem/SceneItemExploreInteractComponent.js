"use strict";
var SceneItemExploreInteractComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, o) {
			var i,
				r = arguments.length,
				a =
					r < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				a = Reflect.decorate(e, t, n, o);
			else
				for (var l = e.length - 1; 0 <= l; l--)
					(i = e[l]) &&
						(a = (r < 3 ? i(a) : 3 < r ? i(t, n, a) : i(t, n)) || a);
			return 3 < r && a && Object.defineProperty(t, n, a), a;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemExploreInteractComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	manipulateInteractPointPointStateTagMap = new Map([
		[0, -422517001],
		[1, 1725677503],
		[2, -1335742570],
		[3, 968645625],
	]);
let SceneItemExploreInteractComponent =
	(SceneItemExploreInteractComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments),
				(this.Lo = void 0),
				(this.Hte = void 0),
				(this.SIe = void 0),
				(this.r1n = void 0),
				(this.ktn = void 0),
				(this.YO = void 0),
				(this.Lie = void 0),
				(this.ac = 4),
				(this.Qnn = () => {
					this.ChangeManipulateInteractPointState(0);
				}),
				(this.vln = (e) => {
					this.Lo.Option.Type ===
						IComponent_1.EExploreSkillInteractType.PullGiant &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnOverlapSceneItemExploreInteractRange,
							e,
							this,
						);
				});
		}
		get Location() {
			return this.Hte.ActorLocationProxy;
		}
		get CreatureDataId() {
			return this.SIe.GetCreatureDataId();
		}
		get IsLocked() {
			return this.r1n.IsLocked;
		}
		get InteractActions() {
			if (
				this.Lo.Option.Type === IComponent_1.EExploreSkillInteractType.PullGiant
			)
				return this.Lo.Option.Actions;
		}
		OnInitData(e) {
			e = e.GetParam(SceneItemExploreInteractComponent_1)[0];
			return (
				(this.Lo = e),
				void 0 !== this.Lo.PlayerStateRestritionId &&
					((e = {
						Type: "CheckPlayerStateRestriction",
						RestrictionId: this.Lo.PlayerStateRestritionId,
					}),
					(this.YO = { Type: 0, Conditions: [e] })),
				!0
			);
		}
		OnStart() {
			return (
				(this.Hte = this.Entity.GetComponent(182)),
				(this.SIe = this.Entity.GetComponent(0)),
				(this.r1n = this.Entity.GetComponent(115)),
				(this.ktn = this.Entity.GetComponent(74)),
				this.ktn.AddOnPlayerOverlapCallback(this.vln),
				(this.Lie = this.Entity.GetComponent(177)),
				EventSystem_1.EventSystem.OnceWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
					this.Qnn,
				),
				!0
			);
		}
		get PullTime() {
			return this.Lo.Option.Type !==
				IComponent_1.EExploreSkillInteractType.PullGiant
				? -1
				: this.Lo.Option.PullTime;
		}
		OnClear() {
			return this.ktn.RemoveOnPlayerOverlapCallback(this.vln), !0;
		}
		CheckCondition() {
			return (
				void 0 === this.YO ||
				ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
					this.YO,
					this.Hte.Owner,
					LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
				)
			);
		}
		ChangeManipulateInteractPointState(e) {
			this.Valid &&
				this.ac !== e &&
				(this.Lie.RemoveTag(
					manipulateInteractPointPointStateTagMap.get(this.ac),
				),
				(this.ac = e),
				this.Lie.AddTag(manipulateInteractPointPointStateTagMap.get(this.ac)));
		}
	});
(SceneItemExploreInteractComponent = SceneItemExploreInteractComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(134)],
		SceneItemExploreInteractComponent,
	)),
	(exports.SceneItemExploreInteractComponent =
		SceneItemExploreInteractComponent);
