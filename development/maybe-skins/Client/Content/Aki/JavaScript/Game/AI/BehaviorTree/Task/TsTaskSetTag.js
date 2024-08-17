"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
	TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSetTag extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.GameplayTag = void 0),
			(this.ActorTag = ""),
			(this.TargetKey = ""),
			(this.IsCommonTag = !1),
			(this.IsAdd = !0),
			(this.SetToPlayer = !1),
			(this.IsInitTsVariables = !1),
			(this.TsGameplayTag = void 0),
			(this.TsActorTag = void 0),
			(this.TsTargetKey = ""),
			(this.TsIsCommonTag = !1),
			(this.TsIsAdd = !1),
			(this.TsSetToPlayer = !1);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsGameplayTag = this.GameplayTag),
			(this.TsActorTag = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActorTag)),
			(this.TsTargetKey = this.TargetKey),
			(this.TsIsCommonTag = this.IsCommonTag),
			(this.TsIsAdd = this.IsAdd),
			(this.TsSetToPlayer = this.SetToPlayer));
	}
	ReceiveTickAI(t, e, s) {
		if ((i = t.AiController))
			if ((this.InitTsVariables(), this.TsGameplayTag || this.TsActorTag)) {
				var a,
					i = i.CharActorComp;
				if (i?.Valid) {
					let t = i.Entity;
					if (this.TsSetToPlayer)
						t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
					else if (this.TsTargetKey) {
						let e =
							BlackboardController_1.BlackboardController.GetIntValueByWorld(
								this.TsTargetKey,
							);
						(e =
							e ||
							BlackboardController_1.BlackboardController.GetEntityIdByEntity(
								i.Entity.Id,
								this.TsTargetKey,
							)),
							(t = e ? EntitySystem_1.EntitySystem.Get(e) : void 0);
					}
					t
						? (this.TsGameplayTag
								? this.SetGameplayTag(t)
								: (i = t?.GetComponent(1)) &&
									((a = (i = i.Owner.Tags).FindIndex(this.TsActorTag)),
									this.TsIsAdd && a < 0
										? i.Add(this.TsActorTag)
										: -1 < a && i.RemoveAt(a)),
							this.FinishExecute(!0))
						: this.FinishExecute(!1);
				} else this.FinishExecute(!1);
			} else this.FinishExecute(!1);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
					"Type",
					t.GetClass().GetName(),
				]),
				this.FinishExecute(!1);
	}
	SetGameplayTag(t) {
		this.TsIsCommonTag &&
			(e = t.GetComponent(177)) &&
			((s = this.TsGameplayTag.TagId),
			(a = e.HasTag(s)),
			this.TsIsAdd && !a ? e.AddTag(s) : !this.TsIsAdd && a && e.RemoveTag(s));
		var e,
			s,
			a = t.GetComponent(185);
		a &&
			((e = this.TsGameplayTag.TagId),
			(s = a.HasTag(e)),
			this.TsIsAdd && !s ? a.AddTag(e) : !this.TsIsAdd && s && a.RemoveTag(e));
	}
}
exports.default = TsTaskSetTag;
