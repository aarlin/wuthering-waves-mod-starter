"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class TsBoxRangeItem extends UE.KuroEffectActor {
	constructor() {
		super(...arguments), (this.RangeId = ""), (this.BoxComp = void 0);
	}
	EditorInit() {
		super.EditorInit(), (this.RangeId = this.ActorGuid?.ToString());
	}
	ReceiveBeginPlay() {
		ModelManager_1.ModelManager.RangeItemModel && this.RangeId
			? (ModelManager_1.ModelManager.RangeItemModel.AddBoxRange(
					this.RangeId,
					this,
				),
				this.SetActorTickEnabled(!1))
			: this.SetActorTickEnabled(!0);
	}
	ReceiveTick(e) {
		ModelManager_1.ModelManager.RangeItemModel &&
			this.RangeId &&
			(ModelManager_1.ModelManager.RangeItemModel.AddBoxRange(
				this.RangeId,
				this,
			),
			this.SetActorTickEnabled(!1));
	}
	ReceiveEndPlay() {
		this.RangeId &&
			ModelManager_1.ModelManager.RangeItemModel.RemoveBoxRange(this.RangeId);
	}
}
exports.default = TsBoxRangeItem;
