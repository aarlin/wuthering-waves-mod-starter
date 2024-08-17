"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CheckCombatStateBehaviorNode = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	TickBehaviorNode_1 = require("./TickBehaviorNode");
class CheckCombatStateBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
	constructor() {
		super(...arguments),
			(this.RQt = !1),
			(this.UQt = 0),
			(this.AQt = 0),
			(this.PQt = []),
			(this.B9s = !0),
			(this.OnAfterSubmit = (t) => {
				this.RQt = !1;
			});
	}
	get CorrelativeEntities() {
		return this.PQt;
	}
	OnCreate(t) {
		return !(
			!super.OnCreate(t) ||
			"DetectCombatState" !== (t = t.Condition).Type ||
			((this.RQt = !1),
			(this.AQt = t.EntityId),
			(this.PQt = [t.EntityId]),
			this.AQt
				? ((this.UQt = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
						t.State,
					)),
					this.UQt
						? ((this.B9s = "Ne" !== t.Compare), 0)
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"GeneralLogicTree",
									19,
									"行为树检测的GameplayTag不存在",
									["tag", t.State],
								),
							1))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"行为树检测实体的GameplayTag时，实体不存在",
						),
					1))
		);
	}
	OnTick() {
		if (!this.RQt && this.UQt) {
			var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				this.AQt,
			);
			if (t?.IsInit) {
				let e = t.Entity.GetComponent(185);
				(e = e || t.Entity.GetComponent(177)) &&
					(e.HasTag(this.UQt)
						? this.B9s && this.SubmitNode()
						: this.B9s || this.SubmitNode());
			}
		}
	}
	OnBeforeSubmit() {
		this.RQt = !0;
	}
}
exports.CheckCombatStateBehaviorNode = CheckCombatStateBehaviorNode;
