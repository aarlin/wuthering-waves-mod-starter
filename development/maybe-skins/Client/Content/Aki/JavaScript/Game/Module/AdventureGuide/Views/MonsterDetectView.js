"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterDetectView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Time_1 = require("../../../../Core/Common/Time"),
	ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TextById_1 = require("../../../../Core/Define/ConfigQuery/TextById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	HelpController_1 = require("../../Help/HelpController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	AdventureDefine_1 = require("../AdventureDefine"),
	AdventureGuideController_1 = require("../AdventureGuideController"),
	MonsterDetectItem_1 = require("./MonsterDetectItem"),
	MONSTER_HELP = 17,
	LEFT_TIME_HELP = 72;
class MonsterDetectView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.TVe = void 0),
			(this.LVe = void 0),
			(this.DFe = void 0),
			(this.DVe = 0),
			(this.RVe = void 0),
			(this.UVe = void 0),
			(this.AVe = void 0),
			(this.PVe = -1),
			(this.xVe = void 0),
			(this.wVe = void 0),
			(this.BVe = !0),
			(this.cVe = 0),
			(this.bVe = void 0),
			(this.EPe = void 0),
			(this.q5e = () =>
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			(this.qVe = () => {
				this.GVe();
			}),
			(this.RefreshByDetectingId = (e, t) => {
				this.UVe && this.UVe !== t && this.UVe.SetToggleState(0),
					this.EPe?.StopCurrentSequence(!1, !0),
					this.EPe?.PlayLevelSequenceByName("Switch"),
					(ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId =
						e),
					(this.UVe = t),
					(this.DVe = e);
				t =
					ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
						e,
					);
				var o =
						ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
							t.Conf.MonsterInfoId,
						).Name,
					r = {
						Data: [{ IncId: 0, ItemId: t.Conf.MonsterInfoId }, 1],
						Type: 3,
						BottomText: "",
						IsNotFoundVisible: t.IsLock,
						IsSelectedFlag: !1,
						MonsterId: t.Conf.MonsterInfoId,
						IsQualityHidden: !0,
						IconHidden: t.IsLock,
					};
				this.bVe?.Apply(r),
					this.bVe?.SetToggleInteractive(!1),
					(r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						TextById_1.configTextById.GetConfig(
							AdventureGuideController_1.DETECT,
						).Text,
					)),
					this.AVe.SetText(r),
					t.IsLock
						? (LguiUtil_1.LguiUtil.SetLocalText(
								this.GetText(4),
								AdventureGuideController_1.UNKNOWNTEXT,
							),
							LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(5),
								t.Conf.AttributesDescriptionLock,
							))
						: (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), o),
							LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(5),
								t.Conf.AttributesDescriptionUnlock,
							),
							this.GVe()),
					(r =
						ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
							t.Conf.DangerType,
						));
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(11),
					ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
						t.Conf.DangerType,
					),
				),
					this.SetSpriteByPath(r.Icon, this.GetSprite(6), !1),
					t.Conf.ShowReward
						? (this.GetItem(9).SetUIActive(!0), this.NVe(t.Conf.ShowReward, !1))
						: this.GetItem(9).SetUIActive(!1),
					ControllerHolder_1.ControllerHolder.AdventureGuideController.NormalMonsterManualInfoRequest(
						e,
					);
			}),
			(this.OVe = (e) => {
				var t = new Array();
				for (const o of e) t.push(o);
				this.kVe(t);
			}),
			(this.FVe = () => {
				if (
					!(
						Time_1.Time.Now - this.cVe <=
						TimeUtil_1.TimeUtil.InverseMillisecond
					)
				)
					if (
						((this.cVe = Time_1.Time.Now),
						ModelManager_1.ModelManager.CreatureModel.GetInstanceId() !==
							AdventureDefine_1.BigWorldID)
					)
						ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"DungeonDetection",
						);
					else {
						var e =
							ModelManager_1.ModelManager.AdventureGuideModel.GetAllDetectMonsters().get(
								this.DVe,
							);
						let t =
							ControllerHolder_1.ControllerHolder.AdventureGuideController.GetValidMonsterEntityIdsOfDetectConf(
								e.Conf,
							);
						if (!t.length) {
							if (!(e = e.Conf.EntityConfigId))
								return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
									"NoMonster",
								);
							t = [e];
						}
						(e = this.GetCurrentId()),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("AdventureGuide", 5, "手动探测怪物", [
									"探测Id",
									e,
								]),
							ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
								!0,
							),
							ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
								Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster,
								t,
								this.DVe,
							);
					}
			}),
			(this.VVe = () => {
				HelpController_1.HelpController.OpenHelpById(72);
			});
	}
	GetCurrentId() {
		return this.DVe;
	}
	GetCurrentToggle() {
		return this.UVe;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UISprite],
			[7, UE.UILoopScrollViewComponent],
			[8, UE.UIScrollViewWithScrollbarComponent],
			[9, UE.UIItem],
			[10, UE.UIText],
			[11, UE.UIText],
			[12, UE.UIText],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIText],
			[16, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[1, this.FVe],
				[16, this.VVe],
			]);
	}
	OnStart() {
		(this.TVe = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(7),
			this.GetItem(2).GetOwner(),
			() => {
				var e = new MonsterDetectItem_1.MonsterDetectItem();
				return e.BindCallback(this.RefreshByDetectingId), e;
			},
		)),
			(this.bVe = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			this.bVe.Initialize(this.GetItem(14).GetOwner()),
			(this.LVe = new Array()),
			(this.DFe = new GenericScrollViewNew_1.GenericScrollViewNew(
				this.GetScrollViewWithScrollbar(8),
				this.q5e,
			)),
			(this.RVe = new FilterSortEntrance_1.FilterSortEntrance(
				this.GetItem(0),
				this.OVe,
			)),
			(this.AVe = this.GetText(10)),
			this.AVe.OnSelfLanguageChange.Bind(this.qVe),
			(this.wVe = this.GetButton(1)),
			(this.DVe =
				ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId()),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
		var e =
			ConfigManager_1.ConfigManager.CalabashConfig.GetIntensifyCaptureGuarantee() -
			ModelManager_1.ModelManager.CalabashModel.GetIdentifyGuaranteeCount();
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(15),
			"UpAbsorptionTimeWithTagText",
			e,
		);
	}
	OnBeforeShow() {
		var e;
		let t;
		void 0 !==
			(e = "MonsterDetectView" === (e = this.ExtraParams)[0] ? e[1] : void 0) &&
			(0 < e ? (t = Number(e)) : (this.xVe = -Number(e))),
			(this.PVe = t),
			(ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("AdventureGuide", 28, "当前拾音辑录默认选择怪物", [
					"id",
					t,
				]),
			this.RVe.UpdateData(
				16,
				Array.from(
					ModelManager_1.ModelManager.AdventureGuideModel.GetAllDetectMonsters().values(),
				),
			),
			this.EPe?.StopCurrentSequence(),
			this.EPe?.PlayLevelSequenceByName("Start"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AdventureHelpBtn,
				17,
			);
	}
	OnBeforeDestroy() {
		(this.DFe = void 0),
			this.TVe && (this.TVe.ClearGridProxies(), (this.TVe = void 0)),
			this.AVe.OnSelfLanguageChange.Unbind(),
			this.EPe?.Clear(),
			(this.EPe = void 0);
	}
	kVe(e) {
		this.LVe.length = 0;
		for (const t of e)
			this.LVe.push(t),
				-1 !== this.PVe && this.PVe === t.Conf.Id && (this.PVe = -1);
		ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId ||
			((e = this.HVe()),
			(ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId = e)),
			this.TVe.RefreshByData(
				this.LVe,
				!1,
				() => {
					this.JumpToTarget(
						ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId,
					);
				},
				!0,
			);
	}
	HVe() {
		var e = this.xVe,
			t = ((this.xVe = void 0), this.LVe[0].Conf.Id);
		if (void 0 !== e)
			for (const t of this.LVe)
				if (!t.IsLock && t.Conf.DangerType === e) return t.Conf.Id;
		return t;
	}
	GVe() {
		var e,
			t,
			o = this.GetCurrentId();
		o &&
			(o =
				ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
					o,
				)) &&
			(this.GetItem(13).SetUIActive(o.IsLock),
			(e = this.GetText(12)),
			o.IsLock
				? (t = o.Conf.LockCon) &&
					((t = ConditionGroupById_1.configConditionGroupById.GetConfig(t)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.HintText))
				: (this.wVe.RootUIComp.SetUIActive(!0),
					o.IsLock ||
						this.BVe ||
						(this.wVe.SetSelfInteractive(!0), (this.BVe = !0))));
	}
	Tick(e) {
		this.GVe();
	}
	NVe(e, t) {
		var o =
				ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e),
			r = new Array();
		for (const e of o.keys()) {
			var i = [{ IncId: 0, ItemId: e }, o.get(e)];
			r.push(i);
		}
		this.DFe.RefreshByData(r);
	}
	JumpToTarget(e) {
		let t = 0,
			o = !1;
		for (const r of this.LVe) {
			if (e === r.Conf.Id) {
				this.TVe.DeselectCurrentGridProxy(),
					this.TVe.ScrollToGridIndex(t, !0),
					this.TVe.SelectGridProxy(t),
					(o = !0);
				break;
			}
			t++;
		}
		o ||
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("AdventureGuide", 28, "找不到拾音辑录跳转Target", [
					"target",
					e,
				]));
	}
}
exports.MonsterDetectView = MonsterDetectView;
