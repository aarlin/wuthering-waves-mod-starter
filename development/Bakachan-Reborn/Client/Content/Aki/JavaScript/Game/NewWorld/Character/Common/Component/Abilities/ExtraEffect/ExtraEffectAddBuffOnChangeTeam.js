"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AddBuffOnChangeTeam = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class AddBuffOnChangeTeam extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.QKo = void 0),
			(this.XKo = void 0),
			(this.ypi = () => {
				const e = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
				var t;
				e?.IsValid() &&
					((t =
						ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()).forEach(
						(t) => {
							if (!this.XKo.includes(t.Id)) {
								var n = t.Entity.GetComponent(157);
								for (const t of this.QKo)
									n?.AddIterativeBuff(
										t,
										e,
										void 0,
										!1,
										`新入队角色加Buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
									);
							}
						},
					),
					(this.XKo = t.map((e) => e.Id)));
			});
	}
	InitParameters(e) {
		(e = e.ExtraEffectParameters),
			(this.QKo = e[0].split("#").map((e) => BigInt(e))),
			(this.XKo =
				ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities().map(
					(e) => e.Id,
				));
	}
	OnCreated() {
		this.OwnerBuffComponent.HasBuffAuthority() &&
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.ypi,
			);
	}
	OnRemoved() {
		this.OwnerBuffComponent?.HasBuffAuthority() &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.ypi,
			);
	}
	OnExecute() {}
}
exports.AddBuffOnChangeTeam = AddBuffOnChangeTeam;
