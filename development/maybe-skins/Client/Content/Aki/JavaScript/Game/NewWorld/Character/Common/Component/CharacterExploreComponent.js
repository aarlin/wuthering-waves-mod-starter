"use strict";
var CharacterExploreComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, r, i) {
			var n,
				s = arguments.length,
				o =
					s < 3
						? t
						: null === i
							? (i = Object.getOwnPropertyDescriptor(t, r))
							: i;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				o = Reflect.decorate(e, t, r, i);
			else
				for (var h = e.length - 1; 0 <= h; h--)
					(n = e[h]) &&
						(o = (s < 3 ? n(o) : 3 < s ? n(t, r, o) : n(t, r)) || o);
			return 3 < s && o && Object.defineProperty(t, r, o), o;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterExploreComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RouletteController_1 = require("../../../../Module/Roulette/RouletteController"),
	HighlightExploreSkillLogic_1 = require("./Skill/HighlightExploreSkillLogic"),
	HOOK_VISION_ID = 1001,
	MANIPULATE_VISION_ID = 1003,
	MANIPULATE_SKILL_IDS = [210007],
	HOOK_SKILL_IDS = [100020, 100021];
let CharacterExploreComponent = (CharacterExploreComponent_1 = class extends (
	EntityComponent_1.EntityComponent
) {
	constructor() {
		super(...arguments),
			(this.r5r = !1),
			(this.n5r = !1),
			(this.s5r = void 0),
			(this.a5r = !1),
			(this.h5r = void 0),
			(this.l5r = void 0),
			(this._5r = void 0),
			(this.u5r = void 0),
			(this.cBe = void 0),
			(this.c5r = void 0),
			(this.m5r = 0),
			(this.d5r = 0),
			(this.C5r = 0),
			(this.g5r = 0),
			(this.f5r = 0),
			(this.p5r = void 0),
			(this.v5r = void 0),
			(this.M5r = !1),
			(this.S5r = 0),
			(this.E5r = !1),
			(this.o7e = () => {
				this.y5r() ? this.Ore() : this.kre();
			}),
			(this.I5r = (e, t) => {
				if (e && this.s5r.IsLegalExceptSkill()) {
					if (((this.h5r = this.s5r.GetNextTarget()), this.h5r)) {
						if (this.d5r === this.h5r.Entity.Id) return;
						this.d5r = this.h5r.Entity.Id;
					}
					(this.n5r = !0),
						this.M5r &&
							(0 !== this.v5r
								? (this.S5r = 1001)
								: EventSystem_1.EventSystem.HasWithTarget(
										this.Entity,
										EventDefine_1.EEventName.OnSkillEnd,
										this.ene,
									) &&
									(EventSystem_1.EventSystem.RemoveWithTarget(
										this.Entity,
										EventDefine_1.EEventName.OnSkillEnd,
										this.ene,
									),
									(CharacterExploreComponent_1.T5r = !1)));
				} else
					(this.n5r = !1),
						(this.h5r = void 0),
						(this.d5r = 0),
						(this.m5r = 0),
						this.L5r(0);
			}),
			(this.D5r = (e, t, r) => {
				r ||
					(e
						? ((this.r5r = !0),
							(this.l5r = t),
							(this.u5r = this.l5r.GetComponent(1)),
							(this.g5r = t.Id),
							this.M5r &&
								(1 !== this.v5r
									? (this.S5r = 1003)
									: EventSystem_1.EventSystem.HasWithTarget(
											this.Entity,
											EventDefine_1.EEventName.OnSkillEnd,
											this.ene,
										) &&
										(EventSystem_1.EventSystem.RemoveWithTarget(
											this.Entity,
											EventDefine_1.EEventName.OnSkillEnd,
											this.ene,
										),
										(CharacterExploreComponent_1.T5r = !1))))
						: ((this.r5r = !1),
							(this.l5r = void 0),
							(this.u5r = void 0),
							(this.g5r = 0),
							(this.C5r = 0),
							this.L5r(1))),
					(this.a5r = r);
			}),
			(this.R5r = () => {
				CharacterExploreComponent_1.T5r = !1;
			}),
			(this.A5r = (e) => {
				(this.f5r = 0), (this.r5r = !1), (this.n5r = !1);
			}),
			(this.U5r = (e, t) => {}),
			(this.ene = (e, t) => {
				this.p5r.includes(t) &&
					((this.M5r = !1),
					(this.v5r = void 0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Character",
							32,
							"[CharacterExploreComponent] OnCharSkillEnd",
							[
								"oldSkill",
								ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
							],
							["newSkill", this.S5r],
							["id", this.Entity.Id],
						),
					RouletteController_1.RouletteController.ExploreSkillSetRequest(
						this.S5r,
					),
					(this.S5r = 0),
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSkillEnd,
						this.ene,
					),
					(CharacterExploreComponent_1.T5r = !1),
					(this.s5r.NeedChangeTargetState = !0));
			});
	}
	OnStart() {
		return (
			(this.s5r = this.Entity.GetComponent(87)),
			(this._5r = this.Entity.GetComponent(1)),
			(this.cBe = this.Entity.GetComponent(33)),
			(this.f5r = 0),
			this.y5r() && this.Ore(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.o7e,
			),
			!0
		);
	}
	OnEnd() {
		return (
			this.c5r && (this.c5r.Clear(), (this.c5r = void 0)),
			this.kre(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.o7e,
			),
			!0
		);
	}
	OnTick() {
		return this.P5r(), !0;
	}
	P5r() {
		var e;
		(this.n5r || this.r5r) &&
			((e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId),
			this.n5r !== this.r5r ? this.x5r(e) : this.w5r(e));
	}
	x5r(e) {
		this.n5r &&
		this.d5r !== this.m5r &&
		1001 !== e &&
		this.s5r.IsLegalExceptSkill()
			? (this.B5r(0), (this.s5r.NeedChangeTargetState = !0))
			: this.r5r &&
				this.g5r !== this.C5r &&
				1003 !== e &&
				(this.B5r(1), (this.s5r.NeedChangeTargetState = !1));
	}
	w5r(e) {
		var t, r, i;
		this.a5r
			? 1003 !== e && this.B5r(1)
			: ((i = this._5r.ActorLocationProxy),
				(r = this.h5r.Location),
				(t = this.u5r.ActorLocationProxy),
				(r = Vector_1.Vector.DistSquared(i, r)),
				(i = Vector_1.Vector.DistSquared(i, t)),
				Math.abs(r - i) < Number.EPSILON || i < r
					? (1003 !== e && this.g5r !== this.C5r && this.B5r(1),
						(this.s5r.NeedChangeTargetState = !1))
					: (1001 !== e &&
							this.d5r !== this.m5r &&
							this.s5r.IsLegalExceptSkill() &&
							this.B5r(0),
						(this.s5r.NeedChangeTargetState = !0)));
	}
	Ore() {
		this.E5r ||
			((this.E5r = !0),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
				this.D5r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleFindFixHook,
				this.I5r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.R5r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeVisionSkillByTab,
				this.A5r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharUseSkill,
				this.U5r,
			));
	}
	kre() {
		this.E5r &&
			((this.E5r = !1),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
				this.D5r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleFindFixHook,
				this.I5r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeSelectedExploreId,
				this.R5r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeVisionSkillByTab,
				this.A5r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharUseSkill,
				this.U5r,
			));
	}
	B5r(e) {
		0 === this.f5r &&
			(this.f5r =
				ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId);
		let t = 0;
		switch (e) {
			case 0:
				(t = 1001), (this.m5r = this.d5r);
				break;
			case 1:
				(t = 1003), (this.C5r = this.g5r);
		}
		this.b5r(t) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Character",
					32,
					"[CharacterExploreComponent] TryChangeSkill",
					[
						"oldSkill",
						ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
					],
					["newSkill", t],
					["id", this.Entity.Id],
				),
			RouletteController_1.RouletteController.ExploreSkillSetRequest(t));
	}
	L5r(e) {
		if (this.n5r || this.r5r)
			this.n5r && (this.B5r(0), (this.s5r.NeedChangeTargetState = !0));
		else if (0 !== this.f5r && !CharacterExploreComponent_1.T5r)
			if (((CharacterExploreComponent_1.T5r = !0), this.q5r())) {
				switch (((this.v5r = e), (this.M5r = !0), (this.S5r = this.f5r), e)) {
					case 0:
						this.p5r = HOOK_SKILL_IDS;
						break;
					case 1:
						this.p5r = MANIPULATE_SKILL_IDS;
				}
				EventSystem_1.EventSystem.HasWithTarget(
					this.Entity,
					EventDefine_1.EEventName.OnSkillEnd,
					this.ene,
				) ||
					EventSystem_1.EventSystem.AddWithTarget(
						this.Entity,
						EventDefine_1.EEventName.OnSkillEnd,
						this.ene,
					);
			} else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Character",
						32,
						"[CharacterExploreComponent] CheckExit",
						[
							"oldSkill",
							ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
						],
						["newSkill", this.f5r],
						["id", this.Entity.Id],
					),
					RouletteController_1.RouletteController.ExploreSkillSetRequest(
						this.f5r,
					),
					(this.s5r.NeedChangeTargetState = !0);
	}
	b5r(e) {
		return ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
			e,
		);
	}
	IsNeedResetSkill() {
		return (
			0 !== this.f5r &&
			this.f5r !==
				ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId
		);
	}
	q5r() {
		var e;
		return !(
			!this.cBe.CurrentSkill ||
			((e = this.cBe.CurrentSkill.SkillId),
			!MANIPULATE_SKILL_IDS.includes(e) && !HOOK_SKILL_IDS.includes(e))
		);
	}
	y5r() {
		return (
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id ===
			this.Entity.Id
		);
	}
	GetHighlightExploreSkill() {
		return (
			this.c5r ||
				((this.c5r =
					new HighlightExploreSkillLogic_1.HighlightExploreSkillLogic()),
				this.c5r.Init(this.Entity.GetComponent(185))),
			this.c5r
		);
	}
});
(CharacterExploreComponent.T5r = !1),
	(CharacterExploreComponent = CharacterExploreComponent_1 =
		__decorate(
			[(0, RegisterComponent_1.RegisterComponent)(45)],
			CharacterExploreComponent,
		)),
	(exports.CharacterExploreComponent = CharacterExploreComponent);
