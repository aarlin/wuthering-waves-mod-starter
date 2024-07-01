"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowShowTalk = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
	PlotController_1 = require("../PlotController");
class FlowShowTalk {
	constructor() {
		(this.CurShowTalk = void 0),
			(this.CurTalkItemIndex = 0),
			(this.Context = void 0),
			(this.B8 = void 0),
			(this.IXi = void 0),
			(this.PXi = -1),
			(this.xXi = !1),
			(this.FXi = !1),
			(this.TPn = !1),
			(this.W4s = !1),
			(this.K4s = !1),
			(this.HXi = () => {
				var t,
					e = this.CurShowTalk.TalkItems[this.CurTalkItemIndex];
				e.Options && 0 < e.Options.length
					? ((this.Context.CurOptionId = -1),
						(this.K4s = !0),
						this.Context.IsBackground
							? ((e = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
								(t =
									ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
										e,
									)),
								this.HandleShowTalkItemOption(t, e.Options[t].Actions))
							: EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.ShowPlotSubtitleOptions,
								))
					: this.jXi();
			}),
			(this.OnOptionActionCompleted = () => {
				this.jXi();
			}),
			(this.SubmitSubtitle = (t) => {
				this.Context && !this.Context.IsBackground && this.LPn(t);
			});
	}
	FinishShowTalk() {
		this.WXi(),
			(this.xXi = !1),
			ModelManager_1.ModelManager.PlotModel.CenterTextTransition(!1),
			ModelManager_1.ModelManager.PlotModel?.GrayOptionMap.clear(),
			(ModelManager_1.ModelManager.PlotModel.CurShowTalk = void 0),
			(ModelManager_1.ModelManager.PlotModel.OptionEnable = !1),
			(this.Context.CurTalkId = -1),
			(this.W4s = !1),
			(this.K4s = !1),
			(this.Context.CurOptionId = -1),
			(this.Context.CurSubActionId = 0),
			(this.Context.CurShowTalk = void 0),
			(this.Context.CurShowTalkActionId = 0),
			(this.CurTalkItemIndex = -1),
			(this.CurShowTalk = void 0),
			(this.Context = void 0),
			(this.B8 = void 0),
			(this.TPn = !1),
			PlotController_1.PlotController.ClearUi(),
			ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
			ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
	}
	Start(t, e) {
		(this.CurShowTalk = t),
			(this.Context = e),
			(this.CurTalkItemIndex = -1),
			(this.B8 = ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel),
			"LevelC" === this.B8 &&
				LevelLoadingController_1.LevelLoadingController.CloseLoading(
					0,
					void 0,
					0,
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PlotStartShowTalk,
				this.CurShowTalk,
			),
			(ModelManager_1.ModelManager.PlotModel.CurShowTalk = t),
			"Prompt" === this.B8 || this.Context.IsBackground
				? this.jXi()
				: ControllerHolder_1.ControllerHolder.PlotController.WaitViewCallback(
						(t) => {
							t && this.jXi();
						},
					);
	}
	jXi() {
		var t;
		this.CurShowTalk
			? (this.CurTalkItemIndex++,
				!this.CurShowTalk.TalkItems ||
				this.CurTalkItemIndex >= this.CurShowTalk.TalkItems.length
					? this.FinishShowTalk()
					: ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
						this.KXi(t)))
			: ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"当前不在ShowTalk节点",
				);
	}
	SwitchTalkItem(t) {
		var e = this.CurShowTalk.TalkItems.length;
		for (let l = 0; l < e; l++) {
			var o = this.CurShowTalk.TalkItems[l];
			if (o.Id === t) return (this.CurTalkItemIndex = l), void this.KXi(o);
		}
		this.FinishShowTalk();
	}
	async KXi(t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Plot", 27, "[FlowShowTalk][Subtitle] 字幕显示", [
				"id",
				t.Id,
			]),
			(this.Context.CurTalkId = t.Id),
			(this.Context.CurOptionId = -1),
			(this.W4s = !1),
			(this.IXi = t),
			this.WXi(),
			(this.FXi = !1),
			(this.TPn = !1),
			await this.DPn(),
			await this.APn(t),
			await this.UPn(),
			(this.TPn = !0),
			this.Fc(),
			this.RPn(),
			this.Context.IsBackground && this.LPn();
	}
	LPn(t) {
		this.CurShowTalk &&
			!this.W4s &&
			((t = t ?? this.IXi),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "[FlowShowTalk][Subtitle] 字幕完成", [
					"id",
					t.Id,
				]),
			(this.W4s = !0),
			(this.IXi = void 0),
			ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnSubmitSubtitle(),
			ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
				t.Actions,
				this.HXi,
			));
	}
	HandleShowTalkItemOption(t, e) {
		this.Context?.CurShowTalk &&
			-1 === this.Context.CurOptionId &&
			this.K4s &&
			((this.FXi = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Plot", 27, "[FlowShowTalk][Subtitle] 选择选项", [
					"index",
					t,
				]),
			(this.Context.CurOptionId = t),
			(this.K4s = !1),
			ControllerHolder_1.ControllerHolder.FlowController.SelectOption(
				this.Context.CurTalkId,
				t,
			),
			ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
				e,
				this.OnOptionActionCompleted,
			));
	}
	Skip() {
		var t, e;
		-1 === this.CurTalkItemIndex
			? this.jXi()
			: this.CurTalkItemIndex < this.CurShowTalk.TalkItems.length
				? this.K4s
					? ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
						(e =
							ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
								t,
							)),
						this.HandleShowTalkItemOption(e, t.Options[e].Actions))
					: !this.W4s &&
						this.TPn &&
						this.LPn(this.CurShowTalk.TalkItems[this.CurTalkItemIndex])
				: this.FinishShowTalk();
	}
	WXi() {
		this.xXi &&
			!this.FXi &&
			ControllerHolder_1.ControllerHolder.FlowController.LogError(
				"遗漏选项C级",
				["Miss TalkItem Id", this.PXi],
			),
			!this.CurShowTalk?.TalkItems ||
				this.CurTalkItemIndex >= this.CurShowTalk.TalkItems.length ||
				((this.xXi =
					!!this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Options &&
					0 < this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Options.length),
				(this.PXi = this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Id));
	}
	Fc() {
		this.Context?.IsBackground ||
			ModelManager_1.ModelManager.PlotModel.HandlePlayMontage(this.IXi.Montage);
	}
	async DPn() {
		var t = this.IXi?.BackgroundConfig;
		if (t && "LevelC" === this.B8 && !this.Context.IsBackground) {
			const l = new CustomPromise_1.CustomPromise();
			var e = () => {
				l.SetResult();
			};
			switch (t.Type) {
				case "Clean":
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.PlotViewBgFadePhoto,
						!1,
						!0,
						void 0,
						e,
					);
					break;
				case "Image":
					var o = t;
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.PlotViewBgFadePhoto,
						!0,
						!0,
						o?.ImageAsset,
						e,
					);
					break;
				case "Icon":
					(o = t),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.PlotViewBgFadePhoto,
							!0,
							!1,
							o?.ImageAsset,
							e,
						);
					break;
				default:
					e();
			}
			await l.Promise;
		}
	}
	async APn(t) {
		"LevelC" === this.B8 &&
			(await ModelManager_1.ModelManager.PlotModel.PlotTemplate.HandleTemplateShowTalk(
				t,
			));
	}
	async UPn() {
		if ("LevelC" === this.B8 && !this.Context.IsBackground) {
			const t = new CustomPromise_1.CustomPromise(),
				e = "CenterText" === this.IXi.Type;
			ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
				ModelManager_1.ModelManager.PlotModel.CenterTextTransition(e, () => {
					e ||
						ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0),
						t.SetResult();
				}),
				await t.Promise;
		}
	}
	RPn() {
		this.Context.IsBackground ||
			("Prompt" === this.B8 &&
				ControllerHolder_1.ControllerHolder.PlotController.ShowTipsView(
					this.IXi,
					this.Context.UiParam,
				)) ||
			("LevelC" === this.B8 && "CenterText" === this.IXi?.Type
				? ModelManager_1.ModelManager.PlotModel.ShowTalkCenterText(
						this.IXi,
						this.SubmitSubtitle,
					)
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdatePlotSubtitle,
						this.IXi,
					));
	}
	SelectOption(t, e) {
		this.Context &&
			!this.Context.IsBackground &&
			this.HandleShowTalkItemOption(t, e);
	}
}
exports.FlowShowTalk = FlowShowTalk;
