"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SilentAreaView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	WorldMapController_1 = require("../../WorldMap/WorldMapController"),
	AdventureDefine_1 = require("../AdventureDefine"),
	AdventureGuideController_1 = require("../AdventureGuideController"),
	SilentAreaItem_1 = require("./SilentAreaItem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	SILENT_HELP = 18;
class SilentAreaView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.DFe = void 0),
			(this.B6e = void 0),
			(this.b6e = 0),
			(this.q6e = void 0),
			(this.IRe = void 0),
			(this.G6e = void 0),
			(this.TVe = void 0),
			(this.LVe = void 0),
			(this.q5e = (e, t, o) => {
				var r = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
				return (
					r.Initialize(t.GetOwner()),
					r.RefreshByConfigId(e.Id, e.Num, e),
					r.SetReceivedVisible(e.Received),
					{ Key: o, Value: r }
				);
			}),
			(this.N6e = (e, t) => {
				this.G6e && this.G6e !== t && this.G6e.SetToggleState(0),
					(this.G6e = t),
					(ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId = e);
				(t =
					ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
						e,
					)),
					(this.b6e = e),
					(e = this.GetText(2));
				var o = this.GetText(1),
					r = t.Conf.Name;
				if (
					((l = this.GetText(17)).SetUIActive(t.IsLock),
					this.GetButton(0).RootUIComp.SetUIActive(!t.IsLock),
					t.IsLock)
				) {
					LguiUtil_1.LguiUtil.SetLocalText(
						o,
						AdventureGuideController_1.UNKNOWNTEXT,
					);
					var i = t.Conf.LockCon;
					i &&
						((i = ConditionGroupById_1.configConditionGroupById.GetConfig(i)),
						LguiUtil_1.LguiUtil.SetLocalTextNew(l, i.HintText));
				} else {
					LguiUtil_1.LguiUtil.SetLocalTextNew(o, r);
					let e = 0;
					for (const o of t.Conf.LevelPlayList) {
						var n =
							ModelManager_1.ModelManager.AdventureGuideModel.GetLevelOfLevelPlay(
								o,
							);
						n > e && (e = n);
					}
				}
				var l,
					a =
						("" ===
						(l =
							ControllerHolder_1.ControllerHolder.AdventureGuideController.GetMarkAreaText(
								t.Conf.MarkId,
							))
							? e.SetUIActive(!1)
							: (e.SetUIActive(!0), e.SetText(l)),
						this.GetItem(7)),
					d =
						(LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(14),
							ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
								AdventureGuideController_1.HIGHLEVELTEXTID,
							),
						),
						this.GetItem(6)),
					s =
						(LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(15),
							ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
								AdventureGuideController_1.MIDLEVELTEXTID,
							),
						),
						this.GetItem(5));
				switch (
					(LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(16),
						ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataTextById(
							AdventureGuideController_1.LOWLEVELTEXTID,
						),
					),
					t.Conf.DangerType)
				) {
					case AdventureDefine_1.EDangerType.Low:
						a.SetUIActive(!0), d.SetUIActive(!1), s.SetUIActive(!1);
						break;
					case AdventureDefine_1.EDangerType.Middle:
						a.SetUIActive(!1), d.SetUIActive(!0), s.SetUIActive(!1);
						break;
					case AdventureDefine_1.EDangerType.High:
						a.SetUIActive(!1), d.SetUIActive(!1), s.SetUIActive(!0);
				}
				(i = this.GetTexture(4)),
					(o = this.GetItem(12)),
					(r = this.GetText(13));
				let u = "0";
				t.IsLock
					? ((u = t.Conf.AttributesDescriptionLock),
						i.SetUIActive(!1),
						o.SetUIActive(!0),
						this.q6e.SetInteractable(!1),
						LguiUtil_1.LguiUtil.SetLocalText(
							r,
							AdventureGuideController_1.UNDISCOVERED,
						))
					: ((u = t.Conf.AttributesDescriptionUnlock),
						o.SetUIActive(!1),
						i.SetUIActive(!0),
						this.q6e.SetInteractable(!0),
						LguiUtil_1.LguiUtil.SetLocalText(
							r,
							AdventureGuideController_1.DETECT,
						),
						this.SetTextureByPath(t.Conf.TemporaryIconUnLock, i)),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), u),
					(e = this.GetText(8)).SetUIActive(!t.IsLock),
					t.IsLock ||
						e.SetText(
							ModelManager_1.ModelManager.AdventureGuideModel.GetCostOfLevelPlay(
								t.Conf.LevelPlayList[0],
							).toString(),
						),
					(l = this.GetText(9)).SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalText(
						l,
						AdventureGuideController_1.RECEIVED_COUNT,
						"",
					),
					this.BuildRewardList(t.Conf.ShowReward);
			}),
			(this.O6e = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ResetToBattleView,
				);
				var e = {
					MarkId: CommonParamById_1.configCommonParamById.GetIntConfig(
						"BoPianExchangeMarkId",
					),
					MarkType: 8,
					OpenAreaId: 0,
				};
				WorldMapController_1.WorldMapController.OpenView(2, !1, e);
			}),
			(this.FVe = () => {
				var e;
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"AdventureGuide",
						5,
						"点击无音区探测按钮 SilentAreaView",
					),
					ModelManager_1.ModelManager.CreatureModel.GetInstanceId() !==
					AdventureDefine_1.BigWorldID
						? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"DungeonDetection",
							)
						: ((e =
								ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
									this.b6e,
								)),
							ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
								!0,
							),
							ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
								Protocol_1.Aki.Protocol.d3n.Proto_SilentArea,
								e.Conf.LevelPlayList,
								this.b6e,
							));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UILoopScrollViewComponent],
			[11, UE.UIScrollViewWithScrollbarComponent],
			[12, UE.UIItem],
			[13, UE.UIText],
			[14, UE.UIText],
			[15, UE.UIText],
			[16, UE.UIText],
			[17, UE.UIText],
			[18, UE.UIButtonComponent],
			[19, UE.UIItem],
			[20, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.FVe],
				[18, this.O6e],
			]);
	}
	OnBeforeShow() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.AdventureHelpBtn,
			18,
		);
	}
	async OnBeforeStartAsync() {
		(this.B6e = new CommonCurrencyItem_1.CommonCurrencyItem()),
			await this.B6e.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
	}
	OnStart() {
		(this.TVe = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(10),
			this.GetItem(20).GetOwner(),
			() => {
				var e = new SilentAreaItem_1.SilentAreaItem();
				return e.BindCallback(this.N6e), e;
			},
		)),
			(this.DFe = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(11),
				this.q5e,
			)),
			void 0 === this.q6e &&
				(this.q6e = this.GetButton(0)
					.GetOwner()
					.GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
			this.B6e.RefreshTemp(
				CommonParamById_1.configCommonParamById.GetIntConfig("BoPianId"),
			),
			this.B6e.SetButtonActive(!1);
		var e = this.ExtraParams;
		let t = "DisposableChallengeView" === e[0] ? e[1] : void 0,
			o = void (
				ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaConfVaild(
					t,
				) || (t = void 0)
			);
		(o = t
			? (ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingSilentAreaConfId(
					t,
				),
				ControllerHolder_1.ControllerHolder.AdventureGuideController.GetShowSilentAreasList(
					void 0,
					t,
				))
			: ControllerHolder_1.ControllerHolder.AdventureGuideController.GetShowSilentAreasList(
					0,
				)).sort(
			(e, t) =>
				e.SilentAreaDetectionData.Conf.Id - t.SilentAreaDetectionData.Conf.Id,
		),
			(ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId =
				t ?? o[0].SilentAreaDetectionData.Conf.Id),
			(this.LVe = o),
			this.TVe.ReloadData(o),
			this.JumpToTarget(
				ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId,
			);
	}
	OnBeforeDestroy() {
		this.IRe &&
			(TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0)),
			this.DFe && (this.DFe.ClearChildren(), (this.DFe = void 0)),
			this.TVe && (this.TVe.ClearGridProxies(), (this.TVe = void 0)),
			this.B6e && (this.B6e.Destroy(), (this.B6e = void 0));
	}
	BuildRewardList(e) {
		var t =
				ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(e),
			o = new Array();
		for (const e of t.keys()) {
			var r = { Id: e, Num: t.get(e), Received: !1 };
			o.push(r);
		}
		this.DFe.RefreshByData(o);
	}
	JumpToTarget(e) {
		let t = 0;
		for (const o of this.LVe) {
			if (e === o.SilentAreaDetectionData.Conf.Id)
				return (
					this.TVe.DeselectCurrentGridProxy(),
					this.TVe.ScrollToGridIndex(t, !0),
					void this.TVe.SelectGridProxy(t)
				);
			t++;
		}
	}
}
exports.SilentAreaView = SilentAreaView;
