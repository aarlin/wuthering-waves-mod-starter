"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookQuestPlotView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById"),
	SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
	UiNavigationNewController_1 = require("../UiNavigation/New/UiNavigationNewController"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
	HandBookDefine_1 = require("./HandBookDefine"),
	HandBookQuestPlotItem_1 = require("./HandBookQuestPlotItem"),
	HandBookQuestPlotList_1 = require("./HandBookQuestPlotList"),
	HandBootPlotDynamicItem_1 = require("./HandBootPlotDynamicItem"),
	HandBootQuestDynamicItem_1 = require("./HandBootQuestDynamicItem");
class HandBookQuestPlotView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.NodeScrollView = void 0),
			(this.PlotListScrollView = void 0),
			(this.nVt = void 0),
			(this.ZAn = void 0),
			(this.eUn = void 0),
			(this.tUn = []),
			(this.iUn = new Map()),
			(this.aPn = void 0),
			(this.q8i = 0),
			(this.NeedScrollIndex = 0),
			(this.nUn = 0),
			(this.hPn = !1),
			(this.MOn = ""),
			(this.m6s = !1),
			(this._Pn = ""),
			(this.sUn = new Map()),
			(this.uPn = []),
			(this.aUn = (t, e, i) => {
				var o = new HandBookQuestPlotItem_1.HandBookQuestPlotItem();
				return (
					o.BindClickCallback(this.cPn), o.BindIsSelectFunction(this.mPn), o
				);
			}),
			(this.lUn = (t, e, i) => {
				var o = new HandBookQuestPlotList_1.HandBookQuestPlotList();
				return (
					o.BindClickOptionToggleBack(this.Zu), o.BindOnRefreshNode(this.dPn), o
				);
			}),
			(this.i2e = () => {
				this.CloseMe(),
					HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
			}),
			(this.cPn = (t, e) => {
				if (!this.hPn) {
					this.hPn = !0;
					let e = 0;
					var i = this.tUn.length;
					for (let o = 0; o < i; o++) this.tUn[o].NodeText === t && (e = o);
					this.PlotListScrollView?.ScrollToItemIndex(e).finally(() => {
						(this.hPn = !1), this.dPn(t);
					});
				}
			}),
			(this.hUn = (t = !0, e) => {
				(this.tUn = []),
					this._Un(),
					this.PlotListScrollView?.RefreshByData(this.tUn, t),
					(this.m6s = !0),
					this.PlotListScrollView?.BindLateUpdate(() => {
						this.PlotListScrollView?.UnBindLateUpdate(),
							(this.m6s = !1),
							e && this.dPn(e),
							this.nHe();
					});
			}),
			(this.D4s = []),
			(this.Zu = (t, e, i, o) => {
				let n = this.iUn.get(t);
				(n = n || new Map()).set(e, i),
					this.iUn.set(t, n),
					this.D4s.push(t, e, i),
					(this.NeedScrollIndex =
						this.PlotListScrollView?.GetDisplayGridStartIndex() ?? 0),
					this.hUn(),
					HandBookQuestPlotList_1.HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio();
			}),
			(this.wwe = () => {
				this.q8i--, this.iUn.clear(), this.Og();
			}),
			(this.Pwe = () => {
				this.q8i++, this.iUn.clear(), this.Og();
			}),
			(this.dPn = (t) => {
				if (this.MOn !== t && !this.m6s) {
					this.MOn = t;
					let i = !1;
					for (const e of this.NodeScrollView.GetScrollItemItems())
						e?.GetTidText() === t
							? (e.SetToggleState(1),
								UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForViewSameGroup(
									e.GetToggleItem()?.GetRootComponent(),
								),
								(i = !0))
							: e.SetToggleState(0);
					if (!i) {
						let i = 0;
						for (var [e] of this.sUn) {
							if (e === t) break;
							i++;
						}
						this.NodeScrollView?.ScrollToItemIndex(i).finally(() => {
							this.NodeScrollView?.GetScrollItemFromIndex(0)?.SetToggleState(1);
						});
					}
				}
			}),
			(this.mPn = (t) => this.MOn === t);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIDynScrollViewComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
			[8, UE.UIDynScrollViewComponent],
		]),
			(this.BtnBindInfo = [
				[5, this.wwe],
				[6, this.Pwe],
			]);
	}
	async OnBeforeStartAsync() {
		(this.eUn = new HandBootPlotDynamicItem_1.HandBootPlotDynamicItem()),
			(this.PlotListScrollView = new DynScrollView_1.DynamicScrollView(
				this.GetUIDynScrollViewComponent(8),
				this.GetItem(4),
				this.eUn,
				this.lUn,
			)),
			await this.PlotListScrollView.Init(),
			(this.ZAn = new HandBootQuestDynamicItem_1.HandBootQuestDynamicItem()),
			(this.NodeScrollView = new DynScrollView_1.DynamicScrollView(
				this.GetUIDynScrollViewComponent(1),
				this.GetItem(2),
				this.ZAn,
				this.aUn,
			)),
			await this.NodeScrollView.Init();
	}
	OnStart() {
		(this._Pn =
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ColonTag") ?? ""),
			(this._Pn = this._Pn + " "),
			(this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.nVt.SetCloseCallBack(this.i2e),
			this.nVt.SetHelpBtnActive(!1);
		var t = this.OpenParam;
		(this.aPn = t.ConfigIdList), (this.q8i = t.Index), this.Og();
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnPhotoSelect,
			this.aPn[this.q8i],
		);
	}
	Og() {
		var t = this.aPn?.length ?? 0;
		if (this.q8i >= t || this.q8i < 0)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("HandBook", 5, "HandBookPlot_剧情图鉴选择任务出错", [
					"index:",
					this.q8i,
				]);
		else {
			this.GetButton(5)?.RootUIComp.SetUIActive(0 < this.q8i),
				this.GetButton(6)?.RootUIComp.SetUIActive(this.q8i + 1 < t);
			t = this.aPn[this.q8i];
			var e =
				ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfig(t);
			if (e) {
				if (
					!ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(e.Type, t)
						?.IsRead
				) {
					var i = e.Type;
					const o =
						ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(
							i,
						)?.Type;
					ControllerHolder_1.ControllerHolder.HandBookController.SendIllustratedReadRequest(
						o,
						t,
					);
				}
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Descrtption);
				var o = ModelManager_1.ModelManager.QuestNewModel?.GetQuestConfig(
					e.QuestId,
				);
				i = o?.TidName
					? PublicUtil_1.PublicUtil.GetConfigTextByKey(o.TidName)
					: "";
				this.nVt.SetTitle(i);
				const h =
					ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(
						e.Type,
					);
				if (
					((t = ConfigManager_1.ConfigManager.HandBookConfig?.GetQuestTab(
						h.Type,
					)),
					this.nVt.SetTitleIcon(t.Icon),
					(i = ConfigManager_1.ConfigManager.HandBookConfig.GetQuestPlotConfig(
						e.QuestId,
					)))
				) {
					(t = JSON.parse(i.Data)), this.sUn.clear(), (this.uPn = []);
					let e = "";
					for (const i of t) {
						const t = i.IsHideUi ? "" : i.TidTip;
						if ("" === t) {
							if ("" === e) {
								var n = o?.TidName ?? "",
									s = this.sUn.get(n);
								if (!s) {
									(s = []).push(i), (e = n), this.sUn.set(n, s);
									continue;
								}
							}
							this.sUn.get(e).push(i);
						} else if (
							"" !== e &&
							"" !== t &&
							PublicUtil_1.PublicUtil.GetConfigTextByKey(e) ===
								PublicUtil_1.PublicUtil.GetConfigTextByKey(t)
						)
							this.sUn.get(e).push(i);
						else {
							let o = this.sUn.get(t);
							o ? o.push(i) : ((o = []).push(i), (e = t), this.sUn.set(t, o));
						}
					}
					var a,
						l = [];
					for ([a] of this.sUn) {
						var r = new HandBookDefine_1.HandBookQuestDynamicData();
						(r.TidText = a), l.push(r), this.uPn.push(a);
					}
					this.NodeScrollView.RefreshByData(l);
					const h = l[0].TidText;
					this.hUn(!1, h);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"HandBook",
							5,
							"HandBookPlot_剧情图鉴获取任务对应剧情配置出错",
							["questId:", e.QuestId],
						);
			}
		}
	}
	_Un() {
		let t = 0;
		for (var [e, i] of this.sUn) {
			var o,
				n = new HandBookDefine_1.HandBookPlotDynamicData();
			(n.NodeText = e), (n.BelongToNode = e), this.tUn.push(n);
			for (const n of i)
				n.Flow.FlowListName &&
					"" !== n.Flow.FlowListName &&
					(o = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
						n.Flow.FlowListName,
						n.Flow.FlowId,
						n.Flow.StateId,
					)) &&
					this.uUn(o, t++, e);
		}
	}
	uUn(t, e, i) {
		this.nUn = 0;
		for (const s of t)
			if ("PlayMovie" === s.Name)
				Log_1.Log.CheckDebug() && Log_1.Log.Debug("HandBook", 5, "播片剧情");
			else if ("ShowTalk" === s.Name)
				for (const t of s.Params.TalkItems)
					if (!(this.nUn && t.Id < this.nUn)) {
						if (
							((this.nUn = 0), (t.WhoId ?? t.TidTalk) && "Option" !== t.Type)
						) {
							var o = new HandBookDefine_1.HandBookPlotDynamicData();
							let s = "";
							" " !==
								(s = (n =
									((o.BelongToNode = i),
									t.WhoId
										? SpeakerById_1.configSpeakerById.GetConfig(t.WhoId)
										: void 0))
									? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, n.Id) ?? ""
									: s) &&
								"" !== s &&
								(s += this._Pn),
								(o.TalkOwnerName = s),
								t.PlayVoice &&
									((n = PlotAudioById_1.configPlotAudioById.GetConfig(
										t.TidTalk,
									)),
									(o.PlotAudio = n));
							var n = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalk);
							(o.TalkText = n),
								(o.PlotId = e),
								(o.TalkItemId = t.Id),
								this.tUn.push(o);
						}
						t.Options &&
							0 < t.Options.length &&
							((n = this.iUn.get(e)?.get(t.Id) ?? 0),
							(o = t.Options[n]),
							this.cUn(o.Actions, t.Id),
							this.mFs(t.Options, n, i, e, t.Id)),
							t.Actions && this.cUn(t.Actions, t.Id);
					}
	}
	cUn(t, e) {
		if (t)
			for (const o of t) {
				if ("FinishTalk" === o.Name || "FinishState" === o.Name) return;
				var i;
				"JumpTalk" !== o.Name || (i = o.Params.TalkId) <= e || (this.nUn = i);
			}
	}
	mFs(t, e, i, o, n) {
		const s = new HandBookDefine_1.HandBookPlotDynamicData();
		(s.BelongToNode = i), (s.OptionTalker = !0), this.tUn.push(s);
		for (let s = 0; s < t.length; s++) {
			var a = t[s];
			const l = new HandBookDefine_1.HandBookPlotDynamicData();
			(l.BelongToNode = i),
				(l.OptionIndex = s),
				(l.TalkOption = a),
				(l.IsChoseOption = e === s),
				(l.PlotId = o),
				(l.TalkItemId = n),
				this.tUn.push(l);
		}
	}
	nHe() {
		if (0 < this.D4s.length) {
			for (const t of this.PlotListScrollView?.GetScrollItemItems())
				if (
					t.OptionData?.TalkOption &&
					t.OptionData?.PlotId === this.D4s[0] &&
					t.OptionData?.TalkItemId === this.D4s[1] &&
					t.OptionData?.OptionIndex === this.D4s[2]
				) {
					UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
						t.GetOptionToggle().GetRootComponent(),
					);
					break;
				}
			this.D4s = [];
		}
	}
}
exports.HandBookQuestPlotView = HandBookQuestPlotView;
