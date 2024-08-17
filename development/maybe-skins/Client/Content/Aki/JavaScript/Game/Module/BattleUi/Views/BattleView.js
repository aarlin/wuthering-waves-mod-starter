"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleView = void 0);
const UE = require("ue"),
	AudioController_1 = require("../../../../Core/Audio/AudioController"),
	AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	OnlineInstanceDungeonDeathPanel_1 = require("../../Online/View/OnlineInstanceDungeonDeathPanel"),
	BottomPanel_1 = require("./BattleChildViewPanel/BottomPanel"),
	CenterPanel_1 = require("./BattleChildViewPanel/CenterPanel"),
	ChatPanel_1 = require("./BattleChildViewPanel/ChatPanel"),
	FormationPanel_1 = require("./BattleChildViewPanel/FormationPanel"),
	GamepadSkillButtonPanel_1 = require("./BattleChildViewPanel/GamepadSkillButtonPanel"),
	MissionPanel_1 = require("./BattleChildViewPanel/MissionPanel"),
	PositionPanel_1 = require("./BattleChildViewPanel/PositionPanel"),
	SkillButtonPanel_1 = require("./BattleChildViewPanel/SkillButtonPanel"),
	TopPanel_1 = require("./BattleChildViewPanel/TopPanel"),
	BossStatePanel_1 = require("./BossState/BossStatePanel"),
	FullScreenPanel_1 = require("./FullScreenPanel"),
	BattleHeadStatePanel_1 = require("./HeadState/BattleHeadStatePanel"),
	PartStatePanel_1 = require("./PartStatePanel"),
	CHECK_DESTROY_TIME = 5e3,
	battleUiChildren = [0, 14, 15, 16, 17, 18, 19, 20];
class BattleView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.Lit = void 0),
			(this.Dit = void 0),
			(this.Rit = void 0),
			(this.Uit = void 0),
			(this.Ait = !1),
			(this.Pit = new Map()),
			(this.xit = []),
			(this.wit = new UE.Vector()),
			(this.Bit = void 0),
			(this.bit = 0),
			(this.qit = !1),
			(this.Git = void 0),
			(this.Nit = () => {
				this.Lit.RefreshCurrentRole();
			}),
			(this.Oit = () => {
				var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
				e?.RoleConfig && this.kit(2 === e.RoleConfig.RoleType);
			}),
			(this.o7e = () => {
				this.Lit.RefreshCurrentRole();
			}),
			(this.Fit = () => {
				this.IsShow && this.SetActive(!0);
			}),
			(this.Jpe = (e, t, i) => {
				t?.Valid &&
					(this.Lit.OnCreateEntity(t.Entity),
					this.Dit.OnCreateEntity(t.Entity));
			}),
			(this.zpe = (e, t) => {
				t?.Valid &&
					(this.Lit.OnRemoveEntity(t.Entity),
					this.Dit.DestroyPartStateFromRole(t.Entity));
			}),
			(this.UYe = (e) => {
				var t = this.Vit(6).GetRootItem(),
					i = this.Vit(7).GetRootItem(),
					n = t.GetHierarchyIndex();
				i = i.GetHierarchyIndex();
				(e && i <= n) ||
					(void 0 !== (n = e ? i : this.bit) && t.SetHierarchyIndex(n),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"BattleUiSet",
							38,
							"轮盘界面显隐，调整摇杆面板层级",
							["bVisible", e],
							["panelUiIndex", n],
						));
			}),
			(this.jit = (e) => {
				var t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
				t && "" !== t.Path
					? AudioController_1.AudioController.PostEventByUi(
							t.Path,
							this.PlayEventResult,
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Audio", 18, "获取Audio配表信息错误", ["id", e]);
			}),
			(this.Wit = () => {
				this.Bit
					? this.Bit.SetActive(!0)
					: (this.Bit =
							new OnlineInstanceDungeonDeathPanel_1.OnlineInstanceDungeonDeathPanel(
								this.GetItem(10),
							));
			}),
			(this.Kit = () => {
				this.Bit && this.Bit.SetActive(!1);
			}),
			(this.dKe = (e, t, i) => {
				!this.Ait &&
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					this.Qit().then(() => {
						this.IsDestroyOrDestroying ||
							(this.Rit.ShowBattleChildViewPanel(),
							this.Rit.RefreshOnDelayShow(),
							this.Uit.ShowBattleChildViewPanel());
					});
			}),
			(this.NZe = (e) => {
				for (var [t, i] of this.Pit)
					5 !== t &&
						(e
							? i.GetVisible() && i.GetRootItem().SetUIActive(!0)
							: i.GetRootItem().SetUIActive(!1));
			}),
			(this.PYe = (e) => {
				for (var [t, i] of this.Pit)
					6 !== t &&
						(e
							? i.GetVisible() && i.GetRootItem().SetUIActive(!0)
							: i.GetRootItem().SetUIActive(!1));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
		]),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				(this.ComponentRegisterInfos.push([11, UE.UIItem]),
				this.ComponentRegisterInfos.push([12, UE.UIItem]));
	}
	async OnBeforeStartAsync() {
		await Promise.all([
			this.Xit(2, FormationPanel_1.FormationPanel, !0, 7),
			this.Xit(3, SkillButtonPanel_1.SkillButtonPanel, !0, 9),
			this.Qit(),
			this.Xit(0, BossStatePanel_1.BossStatePanel, !0, 13),
			this.Xit(5, TopPanel_1.TopPanel, !0, 24),
			this.Xit(4, BottomPanel_1.BottomPanel, !0, 11),
			this.Xit(1, MissionPanel_1.MissionPanel, !0, 5),
			this.Xit(6, CenterPanel_1.CenterPanel, !0, 24),
			this.Xit(7, ChatPanel_1.ChatPanel, !1, 6),
			this.Xit(8, FullScreenPanel_1.FullScreenPanel, !0, 23),
			this.Xit(9, PositionPanel_1.PositionPanel, !0),
		]),
			this.$it(),
			this.Yit(),
			this.Ore(),
			this.UiViewSequence.AddSequenceStartEvent("ShowView", this.Fit),
			ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize(),
			this.Jit();
	}
	async Qit() {
		!ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
			this.Ait ||
			(ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RefreshButtonData(),
			(this.Ait = !0),
			(this.Rit = await this.Xit(11, FormationPanel_1.FormationPanel, !0, 8)),
			this.Rit.SetIsGamepad(),
			(this.Uit = await this.Xit(
				12,
				GamepadSkillButtonPanel_1.GamepadSkillButtonPanel,
				!0,
				10,
			)));
	}
	OnTick(e) {
		for (const t of this.xit) t.GetVisible() && t.OnTickBattleChildViewPanel(e);
		this.Lit.Tick(e), this.Dit.Tick(e);
	}
	OnAfterTick(e) {
		for (const t of this.xit)
			t.GetVisible() && t.OnAfterTickBattleChildViewPanel(e);
	}
	OnBeforeShow() {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "[battleView]OnBeforeShow"),
			this.IsDestroyOrDestroying)
		)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					18,
					"[battleView]OnBeforeShow Cancel Because Destroy",
				);
		else {
			this.zit();
			for (const e of this.Pit.values()) e.ShowBattleChildViewPanel();
		}
	}
	OnAfterShow() {
		var e;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "[battleView]OnAfterShow"),
			this.IsDestroyOrDestroying
				? Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Battle",
						18,
						"[battleView]OnAfterShow Cancel Because Destroy",
					)
				: (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
						0,
						battleUiChildren,
						!0,
					),
					(!ModelManager_1.ModelManager.PlotModel.IsInPlot ||
						(ModelManager_1.ModelManager.PlotModel.IsInPlot &&
							"LevelD" ===
								ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel)) &&
						AudioController_1.AudioController.SetState(
							AudioDefine_1.STATEGROUP,
							AudioDefine_1.STATENORMAL,
						),
					(e =
						ModelManager_1.ModelManager
							.BattleUiModel).TryBroadcastCacheRoleLevelUpData(),
					e.TryBroadcastCacheRevive(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.BattleViewActiveSequenceFinish,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ActiveBattleView,
					),
					EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotStart));
	}
	OnBeforeHide() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "[battleView]OnBeforeHide"),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
				0,
				battleUiChildren,
				!1,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.DisActiveBattleView,
			);
	}
	OnAfterHide() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "[battleView]OnAfterHide");
		for (const e of this.Pit.values()) e.HideBattleChildViewPanel();
		ModelManager_1.ModelManager.PlotModel.IsInPlot ||
			AudioController_1.AudioController.SetState(
				AudioDefine_1.STATEGROUP,
				AudioDefine_1.STATEBACKGROUND,
			);
	}
	OnBeforeDestroy() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "[battleView]OnBeforeDestroy"),
			this.kre(),
			this.Zit(),
			this.eot(),
			this.tot(),
			this.iot(),
			(this.wit = void 0),
			Info_1.Info.IsBuildDevelopmentOrDebug &&
				(this.Git = TimerSystem_1.TimerSystem.Forever(() => {
					ModelManager_1.ModelManager.GameModeModel.WorldDone &&
						(TimerSystem_1.TimerSystem.Remove(this.Git),
						(this.Git = void 0),
						Log_1.Log.CheckError()) &&
						Log_1.Log.Error(
							"Battle",
							18,
							"[battleView]主界面销毁超时，请将本次日志提交给测试",
						);
				}, 5e3));
	}
	OnAfterDestroy() {
		this.Git &&
			(TimerSystem_1.TimerSystem.Remove(this.Git), (this.Git = void 0)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "[battleView]OnAfterDestroy");
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChangeRole,
			this.o7e,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.Nit,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
				this.Oit,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.AddEntity,
				this.Jpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OpenOnlineInstanceDeath,
				this.Wit,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlayerRevive,
				this.Kit,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GmOnlyShowMiniMap,
				this.NZe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GmOnlyShowJoyStick,
				this.PYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
				this.UYe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiPlayAudio,
				this.jit,
			),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.dKe,
				);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChangeRole,
			this.o7e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.Nit,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
				this.Oit,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.AddEntity,
				this.Jpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OpenOnlineInstanceDeath,
				this.Wit,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlayerRevive,
				this.Kit,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GmOnlyShowMiniMap,
				this.NZe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GmOnlyShowJoyStick,
				this.PYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
				this.UYe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiPlayAudio,
				this.jit,
			),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.dKe,
				);
	}
	kit(e) {
		this.qit !== e &&
			((this.qit = e), this.IsShow) &&
			this.UiViewSequence?.PlaySequencePurely("Switch");
	}
	$it() {
		this.Lit = new BattleHeadStatePanel_1.BattleHeadStatePanel();
	}
	eot() {
		this.Lit && (this.Lit.ResetAllHeadStates(), (this.Lit = void 0));
	}
	Yit() {
		(this.Dit = new PartStatePanel_1.PartStatePanel()),
			this.Dit.InitializePartStatePanel();
	}
	tot() {
		this.Dit && (this.Dit.ResetPartStatePanel(), (this.Dit = void 0));
	}
	iot() {
		this.Bit && (this.Bit.ResetData(), (this.Bit = void 0));
	}
	async Xit(e, t, i = !1, n = 0) {
		var o = this.GetItem(e);
		t = new t();
		return (
			await t.CreateThenShowByActorAsync(o.GetOwner(), n),
			this.Pit.set(e, t),
			i && this.xit.push(t),
			t
		);
	}
	Vit(e) {
		return this.Pit.get(e);
	}
	Jit() {
		var e = this.Vit(6).GetRootItem();
		this.bit = e.GetHierarchyIndex();
	}
	Zit() {
		for (const e of this.Pit.values()) void 0 !== e && e.Reset();
		this.Pit.clear(), (this.xit.length = 0);
	}
	zit() {
		if (ModelManager_1.ModelManager.PlatformModel.IsMobile()) {
			var e = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap();
			if (e)
				for (var [t, i] of e) {
					var n,
						o,
						a,
						s,
						i,
						l = this.Vit(t);
					if (l)
						if ((i = i.GetPanelItemDataMap()))
							for (var [r, h] of i)
								if (h.IsInitialized()) {
									let e = l.GetItem(r);
									(e = -1 === r ? l.GetRootItem() : e)
										? ((n = h.Size),
											(o = h.Alpha),
											(a = h.OffsetX),
											(s = h.OffsetY),
											(h = h.HierarchyIndex),
											(this.wit.X = n),
											(this.wit.Y = n),
											(this.wit.Z = n),
											e.SetUIItemScale(this.wit),
											e.SetAnchorOffsetX(a),
											e.SetAnchorOffsetY(s),
											e.SetUIItemAlpha(o),
											e.SetHierarchyIndex(h))
										: Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"BattleUiSet",
												8,
												"刷新移动端主界面设置时，找不到对应按钮",
												["panelIndex", t],
												["panelItemIndex", r],
											);
								}
				}
		}
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if ("Execution" === e[0])
			return (t = this.Pit.get(6)) && (t = t.GetExecutionItem())
				? [t, t]
				: void 0;
		if ("Skill" === e[0])
			return (t = this.Pit.get(3))
				? t.GetBattleSkillItemByButtonType(Number(e[1]))?.GetGuideItem()
				: void 0;
		var t = this.Pit.get(Number(e[0]))
			?.GetUiActorForGuide()
			?.GetComponentByClass(UE.GuideHookRegistry.StaticClass());
		if (t) {
			var i = e[2],
				n =
					((n = t.GuideHookComponents.Get(i)) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Guide",
								17,
								"战斗界面挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件",
							)),
					n.GetUIItem());
			let o = e[1];
			return (
				StringUtils_1.StringUtils.IsEmpty(o) && (o = i),
				(e = t.GuideHookComponents.Get(o)) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Guide",
							17,
							"战斗界面挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件",
						)),
				[n, (i = e.GetUIItem())]
			);
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Guide", 17, "战斗界面挂接组件(GuideHookRegistry)缺失");
	}
}
(exports.BattleView = BattleView).aYe = void 0;
