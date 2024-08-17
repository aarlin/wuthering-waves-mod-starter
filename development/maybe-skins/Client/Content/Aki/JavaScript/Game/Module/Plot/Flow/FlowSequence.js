"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowSequence =
		exports.INVALID_INDEX =
		exports.FINISH_INDEX =
			void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	TeleportController_1 = require("../../Teleport/TeleportController"),
	PlotController_1 = require("../PlotController"),
	SequenceController_1 = require("../Sequence/SequenceController");
(exports.FINISH_INDEX = -1), (exports.INVALID_INDEX = -2);
class FlowSequence {
	constructor() {
		(this.vXi = !1),
			(this.MXi = !1),
			(this.SXi = void 0),
			(this.EXi = new Map()),
			(this.yXi = exports.INVALID_INDEX),
			(this.IXi = void 0),
			(this.nx = void 0),
			(this.TXi = !1),
			(this.LXi = !1),
			(this.DXi = !1),
			(this.RXi = 0),
			(this.UXi = void 0),
			(this.AXi = []),
			(this.i5s = new Map()),
			(this.r5s = new Map()),
			(this.PXi = -1),
			(this.xXi = !1),
			(this.ZPt = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 27, "[FlowSequence] Seq开始播放允许跳过"),
					ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0);
			}),
			(this.wXi = () => {
				(this.nx.CurTalkId = -1),
					(this.nx.CurOptionId = -1),
					(this.nx.CurSubActionId = 0),
					(this.nx.CurShowTalk = void 0),
					(this.nx.CurShowTalkActionId = 0),
					ModelManager_1.ModelManager.PlotModel.GrayOptionMap.clear(),
					(ModelManager_1.ModelManager.PlotModel.CurShowTalk = void 0),
					(ModelManager_1.ModelManager.PlotModel.OptionEnable = !1),
					ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.PlotSequencePlay,
						this.ZPt,
					),
					this.Clear(),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 27, "[FlowSequence] 停止"),
					ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
			}),
			(this.BXi = () => {
				var e;
				this.DXi &&
					(this.bXi()
						? this.OnSelectOption(
								ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
									this.IXi,
								),
							)
						: this.RXi >= this.SXi.TalkItems.length
							? this.OnSequenceStop()
							: ((e = this.SXi.TalkItems[this.RXi].Id),
								this.OnSubtitleStart(e),
								this.OnSubtitleEnd(e)));
			}),
			(this.qXi = () => {
				var e;
				this.DXi &&
					(this.RXi >= this.SXi.TalkItems.length
						? this.OnSequenceStop()
						: ((e = this.SXi.TalkItems[this.RXi].Id),
							this.OnSubtitleStart(e),
							this.OnSubtitleEnd(e)));
			}),
			(this.OnSequenceStop = () => {
				this.GXi(),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 27, "[FlowSequence] Seq播放完毕"),
					(this.MXi = !1),
					this.Stop();
			});
	}
	get IsInit() {
		return this.vXi;
	}
	get IsPlaying() {
		return this.MXi;
	}
	Clear() {
		(this.vXi = !1),
			(this.MXi = !1),
			(this.SXi = void 0),
			this.EXi.clear(),
			(this.yXi = exports.INVALID_INDEX),
			(this.IXi = void 0),
			(this.nx = void 0),
			(this.TXi = !1),
			(this.LXi = !1),
			(this.DXi = !1),
			(this.RXi = void 0),
			(this.UXi = void 0),
			(this.AXi.length = 0),
			this.i5s.clear(),
			this.r5s.clear(),
			(this.PXi = -1),
			(this.xXi = !1),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 39, "清理引用数据-FlowSequence");
	}
	Init(e, t) {
		this.Clear(),
			(this.SXi = e),
			!this.SXi || StringUtils_1.StringUtils.IsEmpty(this.SXi.SequenceDataAsset)
				? ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"[FlowSequence] 配置错误",
					)
				: (this.SXi.TalkSequence?.forEach((e, t) => {
						e.forEach((e) => {
							this.EXi.has(e)
								? ControllerHolder_1.ControllerHolder.FlowController.LogError(
										"[FlowSequence] 初始化分段时Id重复",
									)
								: this.EXi.set(e, t);
						});
					}),
					(this.nx = t),
					(this.nx.CurTalkId = -1),
					(this.nx.CurOptionId = -1),
					(this.nx.CurSubActionId = 0),
					(this.yXi = 0),
					(this.RXi = 0),
					(this.vXi = !0),
					EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.PlotSequencePlay,
						this.ZPt,
					));
	}
	Start() {
		if (this.IsInit && !this.IsPlaying) {
			(this.MXi = !0),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 27, "[FlowSequence] 开始"),
				"LevelA" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
					? (ModelManager_1.ModelManager.SequenceModel.Type = 0)
					: "LevelB" ===
							ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
						(ModelManager_1.ModelManager.SequenceModel.Type = 1),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.PlotStartShowTalk,
					this.SXi,
				),
				(ModelManager_1.ModelManager.PlotModel.CurShowTalk = this.SXi);
			const e = new Array(),
				t =
					(this.SXi.TalkFrameEvents?.forEach((t) => {
						var i;
						e.push(t.FrameEvent),
							ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.has(
								t.Position?.TalkItemId,
							)
								? (i =
										ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.get(
											t.Position.TalkItemId,
										)) &&
									(i.push(t.FrameEvent.EventKey),
									ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.set(
										t.Position.TalkItemId,
										i,
									))
								: ((i = new Array()).push(t.FrameEvent.EventKey),
									ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.set(
										t.Position.TalkItemId,
										i,
									));
					}),
					[]);
			"LevelB" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
				this.SXi.TalkItems?.forEach((e) => {
					e.TidTalk && e.PlayVoice && t.push(e.TidTalk);
				}),
				SequenceController_1.SequenceController.Play(
					{
						Path: this.SXi.SequenceDataAsset,
						ResetCamera: this.SXi.ResetCamera,
						FrameEvents: e,
					},
					t,
					this.OnSequenceStop,
					!0,
					!0,
					this.nx.IsWaitRenderData,
					1,
				);
		}
	}
	Stop(e = 0) {
		this.IsInit &&
			(this.IsPlaying &&
				((this.MXi = !1),
				SequenceController_1.SequenceController.ManualFinish()),
			this.NXi().finally(this.wXi));
	}
	async NXi() {
		var e;
		await PlotController_1.PlotController.CheckFormation(),
			this.DXi &&
				(0 <= (e = this.IXi ? this.EXi.get(this.IXi.Id) : 0) &&
					e < this.AXi.length &&
					this.AXi[e] &&
					(ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
				this.UXi) &&
				((e = e < this.UXi.length ? this.UXi[e] : void 0)
					? await TeleportController_1.TeleportController.TeleportToPositionNoLoading(
							e.GetLocation().ToUeVector(),
							e.GetRotation().Rotator().ToUeRotator(),
							"FlowSequence.Stop",
						)
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							27,
							"剧情SeqDA的FinalPos未配置，跳过时最终位置将不准确，联系策划修改",
						));
	}
	Skip() {
		var e;
		this.IsInit &&
			this.IsPlaying &&
			!this.DXi &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "[FlowSequence] 执行跳过"),
			(this.DXi = !0),
			0 !== ModelManager_1.ModelManager.SequenceModel.CurFinalPos?.length &&
				(this.UXi = Object.assign(
					[],
					ModelManager_1.ModelManager.SequenceModel.CurFinalPos,
				)),
			ModelManager_1.ModelManager.SequenceModel.IsFadeEnd.forEach((e) => {
				this.AXi.push(e);
			}),
			ModelManager_1.ModelManager.SequenceModel.FrameEvents.forEach((e, t) => {
				this.r5s.set(t, e);
			}),
			ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.forEach(
				(e, t) => {
					this.i5s.set(t, e);
				},
			),
			SequenceController_1.SequenceController.ManualFinish(),
			(this.MXi = !1),
			this.TXi
				? this.OnSubtitleEnd(this.IXi.Id)
				: this.bXi() && !this.LXi
					? this.OnSelectOption(
							ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
								this.IXi,
							),
						)
					: this.RXi >= this.SXi.TalkItems.length
						? this.OnSequenceStop()
						: ((e = this.SXi.TalkItems[this.RXi].Id),
							this.OnSubtitleStart(e),
							this.OnSubtitleEnd(e)));
	}
	bXi() {
		return !!this.IXi?.Options && 0 < this.IXi?.Options?.length;
	}
	GXi() {
		this.xXi &&
			!this.LXi &&
			ControllerHolder_1.ControllerHolder.FlowController.LogError("遗漏选项", [
				"Miss TalkItem Id",
				this.PXi,
			]),
			(this.PXi = this.IXi?.Id ?? -1),
			(this.xXi = this.bXi());
	}
	OnJumpTalk(e) {
		this.IsInit &&
			((this.yXi = this.EXi.get(e) ?? exports.FINISH_INDEX),
			SequenceController_1.SequenceController.SetNextSequenceIndex(this.yXi),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "[FlowSequence] JumpTalk设置下个分支Seq", [
					"NextIndex",
					this.yXi,
				]),
			(this.RXi = this.SXi.TalkItems.findIndex((t) => t.Id === e)),
			this.DXi) &&
			(this.OnSubtitleStart(e), this.OnSubtitleEnd(e));
	}
	OnFinishTalk() {
		this.IsInit &&
			((this.yXi = exports.FINISH_INDEX),
			SequenceController_1.SequenceController.SetNextSequenceIndex(this.yXi),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "[FlowSequence] FinishTalk设置结束"),
			this.DXi) &&
			this.OnSequenceStop();
	}
	OnSubtitleStart(e) {
		var t;
		this.IsInit &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Plot", 27, "[FlowSequence][Subtitle] 字幕显示", [
					"talkId",
					e,
				]),
			(t = this.SXi.TalkItems.find((t) => t.Id === e)),
			this.SXi.TalkItems[this.RXi].Id !== e &&
				(ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"[FlowSequence][Subtitle] Seq字幕顺序与编辑器对不上",
					["talkId", e],
					["SeqIndex", ModelManager_1.ModelManager.SequenceModel.SubSeqIndex],
					["index in seq", this.RXi],
				),
				(this.RXi = this.SXi.TalkItems.indexOf(t))),
			this.RXi++,
			t ||
				ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"[FlowSequence][Subtitle] 依赖编辑器的Seq找不到字幕",
					["talkItem.ID", e],
				),
			(this.TXi = !0),
			(this.nx.CurTalkId = e),
			(this.nx.CurOptionId = -1),
			(this.IXi = t),
			this.GXi(),
			(this.LXi = !1),
			this.DXi) &&
			this.RunSequenceFrameEventsWhenSkip(e);
	}
	OnSubtitleEnd(e) {
		this.IsInit &&
			this.TXi &&
			this.IXi.Id === e &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "[FlowSequence][Subtitle] 字幕关闭"),
			(this.TXi = !1),
			this.OXi(this.IXi.Actions, this.BXi));
	}
	OnSelectOption(e) {
		this.IsInit &&
			-1 === this.nx.CurOptionId &&
			!this.LXi &&
			(this.OnSubtitleEnd(this.IXi.Id),
			(this.LXi = !0),
			(this.nx.CurOptionId = e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Plot", 27, "[FlowSequence] 选择选项", ["index", e]),
			!this.IXi.Options || e >= this.IXi.Options.length
				? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"[FlowSequence] 选项超出下标",
					),
					this.qXi())
				: (ControllerHolder_1.ControllerHolder.FlowController.SelectOption(
						this.IXi.Id,
						e,
					),
					(e = this.IXi.Options[e]),
					this.OXi(e.Actions, this.qXi)));
	}
	OXi(e, t) {
		const i = Time_1.Time.Frame;
		ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
			e,
			() => {
				i !== Time_1.Time.Frame &&
					Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Plot",
						27,
						"[FlowSequence] 高级别ShowTalk中不应配非即时事件",
					),
					t && t();
			},
		);
	}
	CreateSubtitleFromTalkItem(e) {
		var t;
		if (this.IsInit)
			return (
				(t = this.SXi.TalkItems.find((t) => t.Id === e)) ||
					ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"[FlowSequence] 剧情Seq找不到字幕",
						["talkId", e],
					),
				t
			);
	}
	GetNextTalkItem() {
		return void 0 !== this.RXi &&
			void 0 !== this.SXi &&
			0 < this.SXi.TalkItems.length &&
			this.SXi.TalkItems.length > this.RXi
			? this.SXi.TalkItems[this.RXi]
			: void 0;
	}
	RunSequenceFrameEventsWhenSkip(e) {
		let t;
		(t = this.i5s.has(e) ? this.i5s.get(e) : t) &&
			t.forEach((t) => {
				var i = this.r5s.get(t);
				i &&
					0 !== i.length &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Plot",
							46,
							"RunSequenceFrameEventsWhenSkip",
							["id", e],
							["key", t],
						),
					ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
						i,
						() => {},
					));
			});
	}
}
exports.FlowSequence = FlowSequence;
