"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSendAiEvent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSendAiEvent extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		e || (Log_1.Log.CheckError() && Log_1.Log.Error("Event", 30, "参数不合法"));
		var o = t;
		switch (
			(o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 30, "上下文不合法")),
			e.EventType)
		) {
			case IAction_1.EAiEventType.CatAndDogPlayFlow:
			case IAction_1.EAiEventType.AnimalRandomAction:
				this.gRe(o.EntityId);
				break;
			case IAction_1.EAiEventType.AnimalStandUp:
				this.fRe(o.EntityId);
				break;
			case IAction_1.EAiEventType.AnimalSitDown:
				this.pRe(o.EntityId);
		}
	}
	fRe(e) {
		var t, o;
		e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
		e?.Valid
			? e.Entity.GetComponent(38)
				? ((t = (e = e.Entity.GetComponent(185))?.HasTag(393622611)),
					(o = e?.HasTag(276015887)),
					this.vRe(e),
					e?.AddTag(!t && o ? 379545977 : 1900394806),
					e?.AddTag(351576188))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 30, "Entity不合法，缺少CharacterAiComponent")
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Event", 30, "对象Entity不合法");
	}
	pRe(e) {
		e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
		e?.Valid
			? e.Entity.GetComponent(38)
				? ((e = e.Entity.GetComponent(185)),
					this.vRe(e),
					Math.random() < 0.5 ? e?.AddTag(393622611) : e?.AddTag(276015887),
					e?.AddTag(351576188))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 30, "Entity不合法，缺少CharacterAiComponent")
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Event", 30, "对象Entity不合法");
	}
	gRe(e) {
		e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
		e?.Valid
			? e.Entity.GetComponent(38)
				? ((e = e.Entity.GetComponent(185)),
					this.vRe(e),
					e?.AddTag(502364103),
					e?.AddTag(351576188))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Event", 30, "Entity不合法，缺少CharacterAiComponent")
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Event", 30, "对象Entity不合法");
	}
	vRe(e) {
		e?.Valid &&
			(e.RemoveTag(502364103),
			e.RemoveTag(393622611),
			e.RemoveTag(276015887),
			e.RemoveTag(1900394806),
			e.RemoveTag(379545977));
	}
}
exports.LevelEventSendAiEvent = LevelEventSendAiEvent;
