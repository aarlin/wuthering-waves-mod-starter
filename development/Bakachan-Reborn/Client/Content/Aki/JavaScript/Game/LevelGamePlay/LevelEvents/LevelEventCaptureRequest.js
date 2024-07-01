"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCaptureRequest = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	BattleNetController_1 = require("../../World/Controller/BattleNetController"),
	LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventCaptureRequest extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.NLe = ""), (this.E0 = 0);
	}
	Execute(e, t) {
		t instanceof TsBaseCharacter_1.default
			? ((this.NLe = e.get("Success")),
				(this.E0 = t.CharacterActorComponent.Entity.Id),
				BattleNetController_1.BattleNetController.RequestCaptureEntity(
					this.E0,
				).then((e) => {
					e ? (this.OLe(), this.FinishExecute(!0)) : this.FinishExecute(!1);
				}))
			: this.FinishExecute(!1);
	}
	ExecuteNew(e, t) {
		1 === t.Type && EntitySystem_1.EntitySystem.Get(t.EntityId)?.Valid
			? ((this.E0 = t.EntityId),
				BattleNetController_1.BattleNetController.RequestCaptureEntity(
					this.E0,
				).then((t) => {
					t
						? (this.kLe(e), this.OLe(), this.FinishExecute(!0))
						: this.FinishExecute(!1);
				}))
			: this.FinishExecute(!1);
	}
	kLe(e) {
		var t = new LevelGameplayActionsDefine_1.CommonActionInfo();
		(e = ((t.Params = e.SuccessEvent), new Array())).push(t),
			ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
				e,
				LevelGeneralContextDefine_1.EntityContext.Create(this.E0),
			);
	}
	OLe() {
		var e = EntitySystem_1.EntitySystem.Get(this.E0);
		e && (e = e.GetComponent(130)) && e.ExecuteCapture(this.NLe);
	}
	OnReset() {
		(this.NLe = void 0), (this.E0 = 0);
	}
}
exports.LevelEventCaptureRequest = LevelEventCaptureRequest;
