"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RemoveBuff = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class RemoveBuff extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.UQo = void 0),
			(this.AQo = () => {
				this.OwnerBuffComponent.HasBuffAuthority() &&
					this.OwnerBuffComponent.RemoveBuffByHandle(
						this.ActiveHandleId,
						-1,
						"buff施加者死亡导致移除",
					);
			}),
			(this.PQo = (e, t) => {
				t === this.InstigatorEntity &&
					this.OwnerBuffComponent.HasBuffAuthority() &&
					this.OwnerBuffComponent.RemoveBuffByHandle(
						this.ActiveHandleId,
						-1,
						"buff施加者被移除导致移除",
					);
			});
	}
	InitParameters(e) {
		(e = e.ExtraEffectParameters),
			(this.UQo = (e[0] ?? "0").split("#").map((e) => Number(e)));
	}
	OnCreated() {
		for (const e of this.UQo)
			switch (e) {
				case 0:
					EventSystem_1.EventSystem.AddWithTarget(
						this.InstigatorEntity.Entity,
						EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
						this.AQo,
					);
					break;
				case 1:
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.RemoveEntity,
						this.PQo,
					);
			}
	}
	OnRemoved(e) {
		for (const e of this.UQo)
			switch (e) {
				case 0:
					if (!this.InstigatorEntity?.Valid) return;
					EventSystem_1.EventSystem.RemoveWithTarget(
						this.InstigatorEntity.Entity,
						EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
						this.AQo,
					);
					break;
				case 1:
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.RemoveEntity,
						this.PQo,
					);
			}
	}
	OnExecute() {}
}
exports.RemoveBuff = RemoveBuff;
