"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SequenceModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Queue_1 = require("../../../../Core/Container/Queue"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	Transform_1 = require("../../../../Core/Utils/Math/Transform"),
	FlowSequence_1 = require("../Flow/FlowSequence"),
	SequenceDefine_1 = require("./SequenceDefine");
class SequenceModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.State = 0),
			(this.IsPaused = !1),
			(this.Config = void 0),
			(this.SequenceData = void 0),
			(this.MainSeqCharacterMesh = void 0),
			(this.TalkNpcList = void 0),
			(this.BindingActorMap = new Map()),
			(this.BindingEntityMap = new Map()),
			(this.ControlEntityMap = new Map()),
			(this.FrameEvents = new Map()),
			(this.ActionQueue = new Queue_1.Queue()),
			(this.FrameEventsMap = new Map()),
			(this.IsViewTargetControl = !1),
			(this.IsSubtitleUiUse = !1),
			(this.IsWaitRenderData = !1),
			(this.PreviousMotionBlur = 0),
			(this.SubSeqLen = 0),
			(this.SubSeqIndex = FlowSequence_1.INVALID_INDEX),
			(this.PlayRate = 1),
			(this.SeqMainCharacter = void 0),
			(this.BlendInCharacter = void 0),
			(this.BlendOutCharacter = void 0),
			(this.NeedsQueueLatentAction = !1),
			(this.LatentActions = []),
			(this.LastIndex = FlowSequence_1.INVALID_INDEX),
			(this.NextIndex = FlowSequence_1.INVALID_INDEX),
			(this.HidePlayer = !1),
			(this.FinishCallback = void 0),
			(this.Type = void 0),
			(this.RelativeTransform = void 0),
			(this.CurFinalPos = []),
			(this.IsFadeEnd = []),
			(this.CurLevelSeqActor = void 0),
			(this.CurSubtitleStartFrames = []),
			(this.CurSubtitleEndFrames = []),
			(this.CurShotStartFrames = []),
			(this.CurShotEndFrames = []),
			(this.CurStartFrame = 0),
			(this.CurEndFrame = 0),
			(this.CurFrameRate = 0),
			(this.SelectedOption = 0),
			(this.CurSubtitle = new SequenceDefine_1.PlotSubtitleConfig()),
			(this.SeqMainCharacterModelConfig = void 0),
			(this.IsSubtitleConfigInit = !1),
			(this.DefaultGuardTime = 0),
			(this.DefaultAudioDelay = 0),
			(this.DefaultAudioTransitionDuration = 0),
			(this.EndLeastTime = void 0),
			(this.UseRuntimeData = !0),
			(this.DisableMotionBlurFrame = 0),
			(this.BeginSwitchFrame = 0),
			(this.BeginBlendFrame = 0),
			(this.TwiceAnimFlag = !1);
	}
	Reset() {
		(this.IsPaused = void 0),
			(this.SequenceData = void 0),
			this.BindingActorMap.clear(),
			this.BindingEntityMap.clear(),
			this.ControlEntityMap.clear(),
			this.FrameEvents.clear(),
			this.ActionQueue.Clear(),
			this.FrameEventsMap.clear(),
			(this.IsViewTargetControl = void 0),
			(this.IsSubtitleUiUse = void 0),
			(this.PreviousMotionBlur = void 0),
			(this.SubSeqLen = void 0),
			(this.SubSeqIndex = FlowSequence_1.INVALID_INDEX),
			(this.PlayRate = 1),
			(this.SeqMainCharacter = void 0),
			(this.NeedsQueueLatentAction = void 0),
			(this.CurLevelSeqActor = void 0),
			(this.LatentActions.length = 0),
			(this.LastIndex = FlowSequence_1.INVALID_INDEX),
			(this.NextIndex = FlowSequence_1.INVALID_INDEX),
			(this.HidePlayer = !1),
			(this.CurSubtitleStartFrames.length = 0),
			(this.CurSubtitleEndFrames.length = 0),
			(this.CurShotStartFrames.length = 0),
			(this.CurShotEndFrames.length = 0),
			(this.CurFinalPos.length = 0),
			(this.IsFadeEnd.length = 0),
			(this.CurStartFrame = void 0),
			(this.CurEndFrame = void 0),
			(this.CurFrameRate = void 0),
			(this.SelectedOption = void 0),
			this.CurSubtitle.Clear(),
			(this.Type = void 0),
			(this.RelativeTransform = void 0),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 39, "清理引用数据-SequenceModel");
	}
	GetCurrentSequence() {
		return this.SubSeqIndex < this.SubSeqLen
			? this.SequenceData?.剧情资源.Get(this.SubSeqIndex)
			: void 0;
	}
	GetCurrentKeyFramesInfo() {
		return this.SequenceData?.GeneratedData?.KeyFrames.IsValidIndex(
			this.SubSeqIndex,
		)
			? this.SequenceData.GeneratedData.KeyFrames.Get(this.SubSeqIndex)
			: void 0;
	}
	IsFinish() {
		return this.SubSeqIndex === FlowSequence_1.FINISH_INDEX;
	}
	WillFinish() {
		return this.NextIndex === FlowSequence_1.FINISH_INDEX;
	}
	QueueLatentAction(e) {
		this.LatentActions.push(e);
	}
	RunLatentActions() {
		for (const e of this.LatentActions) e();
		this.LatentActions.length = 0;
	}
	GetLastFadeEnd() {
		return (
			0 <= this.LastIndex &&
			this.IsFadeEnd.length > this.LastIndex &&
			this.IsFadeEnd[this.LastIndex]
		);
	}
	GetLastTransform() {
		return 0 <= this.LastIndex && this.CurFinalPos.length > this.LastIndex
			? this.CurFinalPos[this.LastIndex]
			: void 0;
	}
	GetFrameEvents(e) {
		return this.FrameEvents.get(e);
	}
	GetType() {
		return (
			this.Type || this.UseRuntimeData || (this.Type = this.SequenceData.类型),
			this.Type
		);
	}
	HasSubtitle() {
		return (
			0 !== this.CurSubtitleStartFrames.length &&
			0 !== this.CurSubtitleEndFrames.length
		);
	}
	get IsEnding() {
		return 5 === this.State;
	}
	get IsPlaying() {
		return 0 !== this.State;
	}
	AddFinalPos(e) {
		var t;
		e || this.CurFinalPos.push(e),
			this.RelativeTransform
				? ((t = Transform_1.Transform.Create()),
					e.ComposeTransforms(this.RelativeTransform, t),
					this.CurFinalPos.push(t))
				: this.CurFinalPos.push(e);
	}
}
exports.SequenceModel = SequenceModel;
