"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharBodyEffect = void 0);
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharBodyEffect extends CharRenderBase_1.CharRenderBase {
	constructor() {
		super(...arguments),
			(this.Entity = void 0),
			(this.Visible = !1),
			(this.Opacity = 0),
			(this.EffectHandles = []),
			(this.NeedUpdate = !1),
			(this.OnSetActorVisible = (e, t) => {
				(this.Entity && e !== this.Entity.Id) || this.ear(t);
			}),
			(this.ypi = () => {
				for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
					if (e.IsControl() && e.EntityHandle?.Entity === this.Entity)
						return void this.ear(!0);
				this.ear(!1);
			}),
			(this.xie = (e, t) => {
				e.Entity === this.Entity && this.ear(!0);
			}),
			(this.C4s = () => {
				this.ear(!1);
			});
	}
	GetStatName() {
		return "CharBodyEffect";
	}
	GetComponentId() {
		return RenderConfig_1.RenderConfig.IdBodyEffect;
	}
	Awake(e) {
		super.Awake(e);
	}
	RegisterEffect(e) {
		this.EffectHandles.push(e),
			(1 === this.Opacity && this.Visible) ||
				e.GetEffectSpec()?.UpdateBodyEffect(this.Opacity, this.Visible),
			e.AddFinishCallback((e) => {
				var t = this.EffectHandles.findIndex((t) => t.Id === e);
				0 < t && this.EffectHandles.splice(t, 1);
			});
	}
	Start() {
		this.Opacity = 1;
		var e = this.GetRenderingComponent().GetOwner();
		e instanceof TsBaseCharacter_1.default &&
			e.CharacterActorComponent?.Entity &&
			((this.Entity = e.CharacterActorComponent.Entity),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSetActorHidden,
				this.OnSetActorVisible,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.ypi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnRoleGoDownFinish,
				this.C4s,
			)),
			this.OnInitSuccess();
	}
	Update() {
		if (this.NeedUpdate) {
			for (const e of this.EffectHandles)
				e.GetEffectSpec()?.UpdateBodyEffect(this.Opacity, this.Visible);
			this.NeedUpdate = !1;
		}
	}
	LateUpdate() {}
	Destroy() {
		this.Entity &&
			(EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSetActorHidden,
				this.OnSetActorVisible,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.ypi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				this.xie,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnRoleGoDownFinish,
				this.C4s,
			));
	}
	SetOpacity(e) {
		MathUtils_1.MathUtils.IsNearlyEqual(this.Opacity, e) ||
			((this.Opacity = e), (this.NeedUpdate = !0));
	}
	ear(e) {
		this.Visible !== e && ((this.Visible = e), (this.NeedUpdate = !0));
	}
}
exports.CharBodyEffect = CharBodyEffect;
