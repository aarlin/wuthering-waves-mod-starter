"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	GlobalData_1 = require("../../../../GlobalData"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
	TsAiController_1 = require("../../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskFindNearestInteractiveTarget extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.SearchRange = 0),
			(this.SaveTargetBlackboardKey = ""),
			(this.NowLocation = void 0),
			(this.TmpHandles = void 0),
			(this.IsInitTsVariables = !1),
			(this.TsSearchRange = 0),
			(this.TsSaveTargetBlackboardKey = "");
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsSearchRange = this.SearchRange),
			(this.TsSaveTargetBlackboardKey = this.SaveTargetBlackboardKey));
	}
	ReceiveExecuteAI(e, t) {
		var a;
		this.InitTsVariables(),
			e instanceof TsAiController_1.default &&
			(this.TmpHandles || (this.TmpHandles = []),
			(e = e.AiController.CharActorComp),
			(this.NowLocation = e.ActorLocationProxy),
			(a = e.Entity.Id),
			(e = this.GetNearestInteractiveEntity(e, this.TsSearchRange)))
				? (BlackboardController_1.BlackboardController.SetEntityIdByEntity(
						a,
						this.TsSaveTargetBlackboardKey,
						e,
					),
					this.FinishExecute(!0))
				: this.FinishExecute(!1);
	}
	GetNearestInteractiveEntity(e, t) {
		ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
			this.NowLocation,
			this.TsSearchRange,
			3,
			this.TmpHandles,
		);
		let a,
			r = Number.MAX_VALUE;
		for (const t of this.TmpHandles)
			if (t.Entity?.Active && t.Entity !== e.Entity) {
				var o = t.Entity.GetComponent(1);
				let i = !1;
				switch (o.CreatureData.GetEntityType()) {
					case Protocol_1.Aki.Protocol.wks.Proto_Npc:
					case Protocol_1.Aki.Protocol.wks.Proto_SceneItem:
						i = !0;
						break;
					default:
						i = !1;
				}
				i &&
					o.Entity.GetComponent(91)?.IsInit &&
					(o = Vector_1.Vector.Dist(
						e.ActorLocationProxy,
						o.ActorLocationProxy,
					)) < r &&
					((r = o), (a = t.Id));
			}
		return a;
	}
}
exports.default = TsTaskFindNearestInteractiveTarget;
