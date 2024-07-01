"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	GlobalData_1 = require("../../../../GlobalData"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	TsAiController_1 = require("../../../Controller/TsAiController"),
	TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
	DEFAULT_WAIT_TIME = 3,
	STOP_MONTAGE_BLEND_OUT_TIME = 0.1;
class TsTaskNpcPlayFlow extends TsTaskAbortImmediatelyBase_1.default {
	constructor() {
		super(...arguments),
			(this.FlowListName = ""),
			(this.FlowSubTitle = ""),
			(this.IsInitTsVariables = !1),
			(this.TsFlowListName = ""),
			(this.TsFlowSubTitle = ""),
			(this.TempTalkItems = void 0),
			(this.TempFlowIndex = 0),
			(this.TimeRemain = 0),
			(this.FlowEnd = !0),
			(this.HeadInfoComp = void 0),
			(this.AnimInstance = void 0);
	}
	InitTsVariables() {
		(this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.IsInitTsVariables = !0),
			(this.TsFlowListName = this.FlowListName),
			(this.TsFlowSubTitle = this.FlowSubTitle));
	}
	ReceiveExecuteAI(e, t) {
		this.InitTsVariables(),
			e instanceof TsAiController_1.default &&
			this.TsFlowListName &&
			this.TsFlowSubTitle &&
			(e = e.AiController.CharActorComp)
				? (this.Reset(),
					(this.HeadInfoComp = e.Entity.GetComponent(70)),
					(e = e.Entity.GetComponent(160)) &&
						(this.AnimInstance = e.MainAnimInstance),
					this.HandlePlayFlow() ? this.HandleFlowAction(0) : this.Finish(!1))
				: this.FinishExecute(!1);
	}
	ReceiveTickAI(e, t, i) {
		this.FlowEnd
			? this.Finish(!0)
			: 0 < this.TimeRemain &&
				((this.TimeRemain -= i), this.TimeRemain < 0) &&
				this.HandleFlowAction(this.TempFlowIndex + 1);
	}
	HandlePlayFlow() {
		var e = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
			this.TsFlowListName,
			Number(this.TsFlowSubTitle),
			this.ActorOwner.ActorLabel,
		);
		return !!e && ((this.TempTalkItems = e.TalkItems), !0);
	}
	HandleFlowAction(e) {
		this.TempFlowIndex = e;
		var t = this.TempTalkItems;
		t.length > e
			? ((t = t[e]),
				this.ExecuteNpcFlow(t)
					? ((this.FlowEnd = !1),
						(this.TimeRemain = t.WaitTime && 0 < t.WaitTime ? t.WaitTime : 3))
					: this.HandleFlowAction(e + 1))
			: (this.FlowEnd = !0);
	}
	ExecuteNpcFlow(e) {
		let t = !1;
		var i = this.GetFlowText(e.TidTalk);
		return (
			i &&
				((t = !0), this.HeadInfoComp) &&
				this.HeadInfoComp.SetDialogueText(i),
			this.AnimInstance &&
				(e.Montage
					? ((t = !0),
						(i = e.Montage.ActionMontage.Path),
						ResourceSystem_1.ResourceSystem.LoadAsync(
							i,
							UE.AnimMontage,
							(e) => {
								e?.IsValid() &&
									this.AnimInstance &&
									this.AnimInstance.Montage_Play(e);
							},
						))
					: this.AnimInstance.IsAnyMontagePlaying() &&
						this.AnimInstance.Montage_Stop(0.1)),
			t
		);
	}
	GetFlowText(e) {
		if (e && !StringUtils_1.StringUtils.IsEmpty(e))
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	Reset() {
		(this.TempTalkItems = void 0),
			(this.TempFlowIndex = 0),
			(this.TimeRemain = 0),
			(this.FlowEnd = !0);
	}
	OnClear() {
		this.Reset(),
			this.HeadInfoComp &&
				(this.HeadInfoComp.HideDialogueText(), (this.HeadInfoComp = void 0)),
			this.AnimInstance?.IsAnyMontagePlaying() &&
				(this.AnimInstance.Montage_Stop(0.1), (this.AnimInstance = void 0));
	}
}
exports.default = TsTaskNpcPlayFlow;
