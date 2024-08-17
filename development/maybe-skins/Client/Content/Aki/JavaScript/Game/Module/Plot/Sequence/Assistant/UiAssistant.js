"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiAssistant = exports.ESequenceEventName = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Queue_1 = require("../../../../../Core/Container/Queue"),
	Event_1 = require("../../../../../Core/Event/Event"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	GlobalData_1 = require("../../../../GlobalData"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	SequenceController_1 = require("../SequenceController"),
	SequenceDefine_1 = require("../SequenceDefine"),
	SeqBaseAssistant_1 = require("./SeqBaseAssistant");
var ESequenceEventName;
!(function (e) {
	(e[(e.UpdateSeqSubtitle = 0)] = "UpdateSeqSubtitle"),
		(e[(e.HandlePlotOptionSelected = 1)] = "HandlePlotOptionSelected"),
		(e[(e.HandleSeqSubtitleEnd = 2)] = "HandleSeqSubtitleEnd"),
		(e[(e.HandleSubSequenceStop = 3)] = "HandleSubSequenceStop"),
		(e[(e.HandleIndependentSeqAudio = 4)] = "HandleIndependentSeqAudio");
})(
	(ESequenceEventName =
		exports.ESequenceEventName || (exports.ESequenceEventName = {})),
);
class CacheDialogueData {
	constructor(e, t, o, l, i) {
		(this.Show = e),
			(this.DialogueId = t),
			(this.GuardTime = o),
			(this.AudioDelay = l),
			(this.AudioTransitionDuration = i);
	}
}
class UiAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
	constructor() {
		super(...arguments),
			(this.Event = new Event_1.Event(ESequenceEventName)),
			(this.kto = new Queue_1.Queue()),
			(this.Fto = !1),
			(this.yze = (e) => {
				this.Promise?.SetResult(e), (this.Promise = void 0);
			}),
			(this.OnShowDialogue = (e, t, o, l, i) => {
				3 === this.Model.State &&
					((o /= SequenceDefine_1.FRAME_PER_MILLISECOND),
					this.kto.Push(new CacheDialogueData(e, t, o, l, i)));
			});
	}
	async LoadPromise() {
		return (
			(this.Promise = new CustomPromise_1.CustomPromise()),
			ControllerHolder_1.ControllerHolder.PlotController.WaitViewCallback(
				this.yze,
			),
			this.Promise
				? this.Promise.Promise
				: UiManager_1.UiManager.IsViewShow("PlotSubtitleView")
		);
	}
	PreAllPlay() {
		this.Model.IsSubtitleUiUse && this.Vto(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PlotDoingTextShow,
				this.Model.SequenceData.标识为演出制作中,
			);
	}
	EachStop() {
		this.Event.Emit(ESequenceEventName.HandleSubSequenceStop);
	}
	AllStop() {
		this.Model.GetLastFadeEnd() &&
			((ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
			ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
				0,
				3,
				void 0,
				0,
				ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.ColorSearch(),
			));
	}
	End() {
		this.Model.IsSubtitleUiUse && this.Hto(),
			ControllerHolder_1.ControllerHolder.PlotController.RemoveViewCallback(
				this.yze,
			),
			this.Promise && (this.Promise.SetResult(!1), (this.Promise = void 0));
	}
	Vto() {
		var e;
		!this.Fto &&
			((this.Fto = !0),
			(e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
				GlobalData_1.GlobalData.World,
				UE.MovieSceneDialogueSubsystem.StaticClass(),
			))) &&
			e.OnShowDialogue.Add(this.OnShowDialogue);
	}
	Hto() {
		var e;
		this.Fto &&
			((this.Fto = !1),
			(e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
				GlobalData_1.GlobalData.World,
				UE.MovieSceneDialogueSubsystem.StaticClass(),
			))) &&
			e.OnShowDialogue.Remove(this.OnShowDialogue);
	}
	TriggerAllSubtitle() {
		for (; 0 < this.kto.Size; ) {
			var e = this.kto.Pop();
			e &&
				this.jto(
					e?.Show,
					e?.DialogueId,
					e?.GuardTime,
					e?.AudioDelay,
					e?.AudioTransitionDuration,
				);
		}
	}
	jto(e, t, o, l, i) {
		e ? this.Wto(t, o, l, i) : this.Kto(t);
	}
	Wto(e, t, o, l) {
		"None" !== e &&
			((e = parseInt(e)),
			(e =
				ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.CreateSubtitleFromTalkItem(
					e,
				))) &&
			(ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnUpdateSubtitle(
				e,
			),
			this.HandlePlotSubtitle(e, t, o, l));
	}
	Kto(e) {
		"None" !== e &&
			((e = parseInt(e)),
			ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSubtitleEnd(
				e,
			),
			ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnSubmitSubtitle(),
			this.HandlePlotSubtitleEnd(e));
	}
	Qto() {
		(this.Model.DefaultGuardTime =
			ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.GuardTime),
			(this.Model.DefaultAudioDelay =
				ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioDelay),
			(this.Model.DefaultAudioTransitionDuration =
				ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioTransitionDuration),
			(this.Model.IsSubtitleConfigInit = !0);
	}
	HandlePlotSubtitle(e, t, o, l) {
		this.Model.IsSubtitleConfigInit || this.Qto(),
			(this.Model.CurSubtitle.Subtitles = e),
			(this.Model.CurSubtitle.GuardTime =
				t < 0
					? 0
					: 0 === t
						? this.Model.DefaultGuardTime *
							TimeUtil_1.TimeUtil.InverseMillisecond
						: t),
			(this.Model.CurSubtitle.AudioDelay =
				o < 0
					? 0
					: 0 === o
						? this.Model.DefaultAudioDelay *
							TimeUtil_1.TimeUtil.InverseMillisecond
						: o),
			(this.Model.CurSubtitle.AudioTransitionDuration =
				l < 0
					? 0
					: 0 === l
						? this.Model.DefaultAudioTransitionDuration *
							TimeUtil_1.TimeUtil.InverseMillisecond
						: l),
			(e = this.Model.CurSubtitle) &&
				(this.Event.Emit(ESequenceEventName.UpdateSeqSubtitle, e),
				e.Subtitles?.PlayVoice) &&
				"InnerVoice" !== e.Subtitles.Style?.Type &&
				SequenceController_1.SequenceController.TryApplyMouthAnim(
					e.Subtitles.PlotLineKey,
					e.Subtitles.WhoId,
				);
	}
	HandlePlotSubtitleEnd(e) {
		this.Event.Emit(ESequenceEventName.HandleSeqSubtitleEnd, e);
	}
	HandleSelectedOption(e) {
		ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSelectOption(
			e,
		),
			this.Event.Emit(ESequenceEventName.HandlePlotOptionSelected, e);
	}
}
exports.UiAssistant = UiAssistant;
