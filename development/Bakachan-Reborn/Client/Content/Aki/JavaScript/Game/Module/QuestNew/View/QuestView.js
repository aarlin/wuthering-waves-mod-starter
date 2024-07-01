"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle"),
	CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
	CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController"),
	HelpController_1 = require("../../Help/HelpController"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	QuestController_1 = require("../Controller/QuestController"),
	QuestDefine_1 = require("../QuestDefine"),
	QuestTypeItem_1 = require("./QuestTypeItem"),
	QuestViewStep_1 = require("./QuestViewStep"),
	ALL_QUEST_TYPE = 0,
	LEVEL_HELP = 49;
class QuestView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.Vro = !1),
			(this.Hro = !1),
			(this.jro = 0),
			(this.Wro = !1),
			(this.Kro = []),
			(this.Qro = []),
			(this.Xro = void 0),
			(this.sOe = void 0),
			(this.$ro = void 0),
			(this.cpt = void 0),
			(this.Yro = 0),
			(this.Kwn = !1),
			(this.QuestDescChangeLang = () => {
				var e;
				this.jro &&
					((e = ModelManager_1.ModelManager.QuestNewModel.GetQuestDetails(
						this.jro,
					)),
					this.GetText(9).SetText(e));
			}),
			(this.OZt = (e) => {
				this.Qro.forEach((t) => {
					t.OnSelect(e);
				});
			}),
			(this.Jro = (e) => {
				var t,
					o =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							e,
						);
				if (o) {
					if (this.Qro) for (const e of this.Qro) e.UpdateItem(o.TreeConfigId);
					this.jro &&
						(t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(
							this.jro,
						)) &&
						t.TreeId === e &&
						this.zro(this.jro, !1);
				}
			}),
			(this.Zro = (e) => {
				this.eno(e);
			}),
			(this.Fwn = (e) => {
				if (this.Qro) {
					for (const e of this.Qro) e.UpdateList();
					this.ino(0);
				}
			}),
			(this.tno = () => {
				this.GetItem(1).SetUIActive(!0);
			}),
			(this.OnStartSequenceEvent = () => {
				if (this.Yro) this.eno(this.Yro);
				else {
					var e =
						ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
					if (e) this.jro = e.Id;
					else
						for (const e of this.Qro) {
							var t = e.GetDefaultItem();
							if (t) {
								this.jro = t.QuestId;
								break;
							}
						}
					this.eno(this.jro);
				}
				this.Vro = !0;
			}),
			(this.jmi = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.ino = (e) => {
				let t,
					o = !0;
				var i = this.Kro[e].MainId;
				for (const e of this.Qro) {
					var n = 0 === i,
						r = e.IsQuestEmpty();
					n
						? (e.SetActive(!r), r || ((o = !1), (t = t || e)))
						: e.QuestType !== i
							? e.SetActive(!1)
							: (e.SetActive(!r), (o = r), (t = e));
				}
				this.GetItem(15).SetUIActive(!o),
					this.GetItem(13).SetUIActive(o),
					this.GetItem(13).SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
					(this.Hro = !o),
					this.Hro
						? this.Vro && this.OZt(t.GetDefaultItem()?.QuestId)
						: ((this.Hro = !1),
							this.UiViewSequence.StopSequenceByKey("Sle"),
							this.GetItem(1).SetUIActive(!1));
			}),
			(this.yqe = (e) => {
				e = this.Kro[e];
				var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTabIcon(
					e.MainId,
				);
				e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
					e.MainId,
				);
				return new CommonTabData_1.CommonTabData(
					t,
					new CommonTabTitleData_1.CommonTabTitleData(e?.MainTypeName ?? ""),
				);
			}),
			(this.X3e = () => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.$_t = () => {
				if (this.Wro)
					QuestController_1.QuestNewController.RequestTrackQuest(
						this.jro,
						!1,
						1,
					),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Quest", 50, "取消任务追踪", ["任务Id", this.jro]),
						this.ono(),
						this.rno();
				else {
					const t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
						this.jro,
					);
					if (t) {
						const o = () => {
							this.Wro ||
								(ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
									ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
										.Id !== t.Tree.DungeonId &&
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"QuestTargetNotInCurScene",
									)),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("Quest", 50, "发送追踪请求至后端", [
										"任务Id",
										this.jro,
									]),
								QuestController_1.QuestNewController.RequestTrackQuest(
									this.jro,
									!0,
									1,
								);
							var e = t.GetCurrentActiveChildQuestNode(),
								o =
									GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowNodeTrackDistance(
										t.TreeId,
										e.NodeId,
									);
							e = t.GetTrackDistance(e.NodeId);
							if (o && e) {
								o = t.GetCurrentActiveChildQuestNode()?.NodeId ?? 0;
								const e = {
									MarkType: 12,
									MarkId: t.GetDefaultMark(o),
									IsNotFocusTween: !0,
									OpenAreaId: 0,
								};
								UiManager_1.UiManager.GetViewByName("WorldMapView")
									? UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(
											() => {
												UiManager_1.UiManager.OpenView(
													"WorldMapView",
													e,
													() => {
														UiManager_1.UiManager.CloseView("QuestView");
													},
												);
											},
										)
									: UiManager_1.UiManager.OpenView("WorldMapView", e, () => {
											UiManager_1.UiManager.CloseView("QuestView");
										});
							} else
								this.ono(),
									this.rno(),
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"FollowQuestStepGuide",
									),
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Quest",
											50,
											"追踪失败，不满足任务追踪的前置条件",
											["任务Id", this.jro],
										);
						};
						var e;
						t.IsSuspend()
							? (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Quest",
										50,
										"bSuspend === true 弹出二次确认弹窗 ：",
										["任务Id", this.jro],
									),
								(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
									162,
								)).FunctionMap.set(2, () => {
									GeneralLogicTreeController_1.GeneralLogicTreeController.RequestForcedOccupation(
										t.TreeId,
										o,
									);
								}),
								ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									e,
								))
							: (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Quest",
										50,
										"bSuspend === false 执行track()",
										["任务Id", this.jro],
									),
								o());
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Quest", 19, "点击追踪按钮时:找不到任务", [
								"任务Id",
								this.jro,
							]);
				}
			}),
			(this.nno = () => {
				if (this.jro) {
					var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.jro);
					if (e)
						if (e.IsSuspend()) {
							var t = e.GetOccupations();
							UiManager_1.UiManager.OpenView("QuestLockPreview", t);
						} else if (e.IsQuestCanPreShow())
							HelpController_1.HelpController.OpenHelpById(49);
						else if (
							e.IsQuestHasRecommendPreQuest() &&
							(t = e.GetRecommendPreQuest()) &&
							0 !== t.length
						)
							for (const e of t) {
								var o =
									ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
								if (0 === o) {
									ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"QuestRecommendAccept",
									);
									break;
								}
								if (3 !== o) {
									this.eno(e);
									break;
								}
							}
				}
			}),
			(this.zro = (e, t) => {
				QuestController_1.QuestNewController.RedDotRequest(e, 0),
					(this.jro = e),
					this.Vro &&
						t &&
						this.Hro &&
						this.UiViewSequence.PlaySequencePurely("Sle"),
					(t = ModelManager_1.ModelManager.QuestNewModel),
					this.GetText(7).SetText(t.GetQuestName(e)),
					this.GetText(9).SetText(t.GetQuestDetails(e)),
					this.sno(e),
					this.ano(e),
					this.hno(e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIText],
			[13, UE.UIItem],
			[14, UE.UIText],
			[15, UE.UIItem],
			[16, UE.UIButtonComponent],
			[17, UE.UIItem],
			[18, UE.UIScrollViewWithScrollbarComponent],
			[19, UE.UIItem],
			[20, UE.UISprite],
			[21, UE.UIItem],
			[22, UE.UISprite],
			[23, UE.UISprite],
		]),
			(this.BtnBindInfo = [
				[0, this.X3e],
				[2, this.$_t],
				[16, this.nno],
			]);
	}
	async OnBeforeStartAsync() {
		this.GetItem(4).SetUIActive(!1),
			this.GetItem(11).SetUIActive(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetText(14).SetUIActive(!0),
			this.GetItem(1).SetUIActive(!1),
			this.GetItem(17).SetUIActive(!1),
			this.UiViewSequence.AddSequenceStartEvent("Sle", this.tno),
			this.UiViewSequence.AddSequenceStartEvent(
				"Start",
				this.OnStartSequenceEvent,
			),
			this.UiViewSequence.AddSequenceStartEvent(
				"ShowView",
				this.OnStartSequenceEvent,
			),
			(this.$ro = []),
			(this.sOe = []),
			(this.Yro = this.OpenParam),
			this.lno(),
			await this._no();
	}
	OnBeforeDestroy() {
		if (this.cpt) {
			var e;
			for ([, e] of this.cpt?.GetTabItemMap()) e.Clear();
			this.cpt.Destroy(), (this.cpt = void 0);
		}
		if (((this.Kro = void 0), this.Qro)) {
			for (const e of this.Qro) e.Destroy();
			this.Qro = void 0;
		}
		if (this.sOe) {
			for (const e of this.sOe) e.Destroy();
			this.sOe = void 0;
		}
		this.Xro?.Dispose(), (this.Xro = void 0);
	}
	OnTick(e) {
		if (this.Qro) for (const t of this.Qro) t.OnTick(e);
	}
	lno() {
		const e =
			ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.MapConfigId;
		var t =
				ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfigs()?.filter(
					(t) =>
						!!t.IsShowInQuestPanel ||
						(!!e && void 0 !== t.MapId.find((t) => t === e)),
				),
			o =
				(t.sort(
					(e, t) => (
						(e =
							ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
								e.MainId,
							)),
						(t =
							ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
								t.MainId,
							)),
						e && t ? e.SortValue - t.SortValue : 0
					),
				),
				(this.Kro.length = 0),
				new Map());
		for (const e of t) {
			var i,
				n,
				r = e.MainId;
			o.get(r) ||
				(o.set(r, !0),
				(i = this.GetItem(10)),
				(i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(17), i)),
				(n = new QuestTypeItem_1.QuestTypeItem()).Init(i, r, this.OZt),
				this.Qro.push(n),
				7 === r && n.IsQuestEmpty()) ||
				this.Kro.push(e);
		}
	}
	eno(e) {
		if (e) {
			const t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
			if (t) {
				if (
					((this.jro = t.Id),
					(e = this.Qro.find((e) => e.QuestType === t.MainTypeId)))
				) {
					const o = e.GetQuestItem(t.Id);
					o &&
						((this.Kwn = !0),
						TimerSystem_1.TimerSystem.Delay(() => {
							this.Kwn &&
								(this.GetScrollViewWithScrollbar(18).ScrollTo(o.GetRootItem()),
								this.OZt(this.jro)),
								(this.Kwn = !1);
						}, 200));
				}
			} else this.jro = QuestDefine_1.INVALID_QUEST_ID;
		}
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateQuestDetails,
			this.zro,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeSuspend,
				this.Jro,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
				this.Jro,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnNavigationQuest,
				this.Zro,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActivityQuestCountdownEnd,
				this.Fwn,
			),
			this.GetText(9).OnSelfLanguageChange.Bind(this.QuestDescChangeLang);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateQuestDetails,
			this.zro,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeSuspend,
				this.Jro,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
				this.Jro,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnNavigationQuest,
				this.Zro,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActivityQuestCountdownEnd,
				this.Fwn,
			),
			this.GetText(9).OnSelfLanguageChange.Unbind();
	}
	async _no() {
		const e = new CommonTabComponentData_1.CommonTabComponentData(
			this.jmi,
			this.ino,
			this.yqe,
		);
		this.cpt = new TabComponentWithTitle_1.TabComponentWithTitle(
			this.GetItem(8),
			e,
		);
		var t = new Array();
		for (let e = 0; e < this.Kro.length; e++) {
			const o = new CommonTabItemBase_1.CommonTabItemData();
			(o.Index = e),
				(o.Data = this.cpt.GetTabComponentData(e)),
				(o.RedDotName = "QuestTab"),
				(o.RedDotUid = this.Kro[e].MainId),
				t.push(o);
		}
		await this.cpt.RefreshTabItemByDataAsync(t),
			this.cpt.SelectToggleByIndex(0);
	}
	ono() {
		(this.Wro =
			this.jro ===
			ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(3),
				this.Wro
					? "InstanceDungeonEntranceCancelTrack"
					: "InstanceDungeonEntranceTrack",
			);
	}
	rno() {
		for (const e of this.Qro) e.UpdateListTrackState();
	}
	sno(e) {
		var t = ModelManager_1.ModelManager.QuestNewModel,
			o = t.GetQuest(e);
		if (o) {
			var i = this.GetText(14),
				n = this.GetItem(21),
				r = this.GetButton(2).GetRootComponent(),
				s = this.GetSprite(20),
				a = this.GetButton(16),
				l = this.GetSprite(22),
				m = o.IsQuestCanPreShow(),
				h = o.IsSuspend() ?? !1,
				u = o.IsQuestHasRecommendPreQuest(),
				c = o.HasRefOccupiedEntity();
			let g;
			if ((this.ono(), h)) {
				i.SetText(o.GetSuspendText() ?? ""), (g = t.GetQuestLockIconPath(e));
				h = h && 1 === o.GetSuspendType();
				var I =
					(a.GetRootComponent().SetUIActive(h),
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_ComIconQuestion",
					));
				I =
					(this.uno(I),
					CommonParamById_1.configCommonParamById.GetStringConfig(
						"TaskUnableStripColor",
					) ?? "");
				l.SetColor(UE.Color.FromHex(I)), r.SetUIActive(h), n.SetUIActive(!0);
			} else if (c)
				i.SetText(o.GetRefOccupiedEntityText() ?? ""),
					(g = t.GetQuestLockIconPath(e)),
					a.GetRootComponent().SetUIActive(!1),
					(I =
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							"SP_ComIconQuestion",
						)),
					this.uno(I),
					(h =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"TaskUnableStripColor",
						) ?? ""),
					l.SetColor(UE.Color.FromHex(h)),
					r.SetUIActive(!1),
					n.SetUIActive(!0);
			else if (m) {
				let o;
				i.SetText(t.GetShowQuestConditionDescribe(e) ?? ""),
					(g = t.GetQuestLockIconPath(e)),
					(I =
						void 0 !==
						(o = (c = t.GetUnlockConditions(e))
							? c.find((e) => "ExploreLevel" === e.Type)
							: o)),
					a.GetRootComponent().SetUIActive(I),
					(h =
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							"SP_ComIconQuestion",
						)),
					this.uno(h),
					(m =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"TaskUnableStripColor",
						) ?? ""),
					l.SetColor(UE.Color.FromHex(m)),
					r.SetUIActive(!1),
					n.SetUIActive(!0);
			} else if (u) {
				c = o.GetRecommendPreQuest();
				let s = "";
				c?.length && (s = t.GetQuest(c[0])?.Name ?? ""),
					LguiUtil_1.LguiUtil.SetLocalText(i, "QuestRecommendTip", s),
					(g = t.GetQuestLockIconPath(e)),
					(a =
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							"SP_IconArrive",
						)),
					this.uno(a),
					(I =
						CommonParamById_1.configCommonParamById.GetStringConfig(
							"TaskRemindStripColor",
						) ?? ""),
					l.SetColor(UE.Color.FromHex(I)),
					r.SetUIActive(!0),
					n.SetUIActive(!0);
			} else n.SetUIActive(!1), r.SetUIActive(!0);
			g && this.SetSpriteByPath(g, s, !0);
		}
	}
	uno(e) {
		var t = this.GetSprite(23);
		if (t) {
			const o = t
				.GetOwner()
				.GetComponentByClass(UE.UISpriteTransition.StaticClass());
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.LGUISpriteData_BaseObject,
				(e, t) => {
					e && e.IsValid()
						? o.SetAllTransitionSprite(e)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Quest", 19, "设置Sprite失败，图片加载失败", [
								"图片路径",
								t,
							]);
				},
				102,
			);
		}
	}
	ano(e) {
		var t = this.GetItem(6);
		(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e)) &&
		e.HasBehaviorTree()
			? (t.SetUIActive(!0),
				this.Xro ||
					((this.Xro = new QuestViewStep_1.QuestViewStep()), this.Xro.Init(t)),
				(e = e.Tree?.CreateShowBridge()),
				this.Xro.Update(e?.TreeIncId ?? BigInt(0), e?.TrackTextConfig),
				this.Xro.SetActive(!0))
			: t.SetUIActive(!1);
	}
	hno(e) {
		this.$ro.splice(0, this.$ro.length);
		e = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardInfo(e);
		var t = this.GetItem(19);
		if (e && 0 !== e.length) {
			t.SetUIActive(!0), e && (this.$ro = e);
			const o = this.GetItem(4);
			for (const e of this.sOe) e.SetActive(!1);
			this.$ro.forEach((e, t) => {
				let i;
				var n;
				t > this.sOe.length - 1
					? ((n = LguiUtil_1.LguiUtil.CopyItem(o, o.GetParentAsUIItem())),
						(i =
							new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
							n.GetOwner(),
						),
						this.sOe.push(i))
					: (i = this.sOe[t]),
					i.RefreshByConfigId(e.ItemId, e.ItemCount),
					i.SetActive(!0);
			});
		} else t.SetUIActive(!1);
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (!(1 < e.length || isNaN(Number(e[0])))) {
			var t = Number(e[0]);
			const n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
			if (n) {
				var o = this.Qro.find((e) => e.QuestType === n.Type);
				if (o) {
					var i = o.GetQuestItem(t);
					if (i)
						return (
							this.jro !== QuestDefine_1.INVALID_QUEST_ID && this.jro
								? o.GetQuestItem(this.jro)?.SetSelected(!1)
								: o.GetDefaultItem().SetSelected(!1),
							o.GetQuestItem(t).SetSelected(!0),
							this.GetScrollViewWithScrollbar(18).ScrollTo(o.GetRootItem()),
							(this.Kwn = !1),
							[(t = i.GetTaskToggleItem()), t]
						);
				}
			}
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 54, "聚焦引导configParams项配置有误", [
				"configParams",
				e,
			]);
	}
	GetGuideScrollViewToLock() {
		return this.GetScrollViewWithScrollbar(18);
	}
}
exports.QuestView = QuestView;
