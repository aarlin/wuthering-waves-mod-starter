"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FullScreenEffectHandle = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class FullScreenEffectHandle {
	constructor(e, t) {
		(this.xpe = new Map()), (this.UniqueId = e), (this.NiagaraPath = t);
	}
	SetFloatParameter(e, t) {
		this.xpe.set(e, t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter,
				this.UniqueId,
				e,
				t,
			);
	}
	GetFloatParameterMap() {
		return this.xpe;
	}
}
exports.FullScreenEffectHandle = FullScreenEffectHandle;
