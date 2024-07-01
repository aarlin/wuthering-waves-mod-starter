"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewSoundAreaView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown"),
	OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem"),
	OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	AdventureDefine_1 = require("../AdventureDefine"),
	AdventureGuideController_1 = require("../AdventureGuideController"),
	NewSoundDetectItem_1 = require("./NewSoundDetectItem"),
	NewSoundTypeItem_1 = require("./NewSoundTypeItem");
class NewSoundAreaView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.jVe = void 0),
			(this.WVe = void 0),
			(this.KVe = []),
			(this.QVe = AdventureDefine_1.EDungeonType.Mat),
			(this.UVe = void 0),
			(this.XVe = void 0),
			(this.$Ve = void 0),
			(this.YVe = void 0),
			(this.JVe = 0),
			(this.O3e = 0),
			(this.V5s = 1),
			(this.zVe = (e) => new OneTextTitleItem_1.OneTextTitleItem(e)),
			(this.ZVe = (e) => new OneTextDropDownItem_1.OneTextDropDownItem(e)),
			(this.e6e = (e) => {
				(this.V5s = e),
					(ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel =
						e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.NewSoundAreaRefreshReward,
						e,
					),
					this.YVe?.GetCurrentSequence()
						? this.YVe?.ReplaySequenceByKey("Switch")
						: this.YVe?.PlayLevelSequenceByName("Switch");
			}),
			(this.t6e = (e, t) => {
				this.e6e(t);
			}),
			(this.i6e = (e) => {
				var t =
					e === ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel
						? "Text_WorldCurrentLevelTag_Text"
						: "Text_WorldLevelTag_Text";
				return new LguiUtil_1.TableTextArgNew(t, e);
			}),
			(this.o6e = () => {
				UiManager_1.UiManager.OpenView("LordGymChallengeRecordView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UILoopScrollViewComponent],
			[2, UE.UIItem],
			[3, UE.UILoopScrollViewComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIText],
			[14, UE.UIItem],
			[15, UE.UIButtonComponent],
			[16, UE.UIItem],
			[17, UE.UIItem],
			[18, UE.UIItem],
			[19, UE.UIText],
			[20, UE.UIItem],
			[21, UE.UIItem],
		]),
			(this.BtnBindInfo = [[15, this.o6e]]);
	}
	OnBeforeDestroy() {
		this.jVe?.ClearGridProxies(),
			this.WVe?.ClearGridProxies(),
			this.$Ve?.Clear(),
			(this.$Ve = void 0),
			this.YVe?.Clear(),
			(this.YVe = void 0);
	}
	async OnBeforeStartAsync() {
		(this.XVe = new CommonDropDown_1.CommonDropDown(
			this.GetItem(17),
			this.ZVe,
			this.zVe,
		)),
			await this.XVe.Init();
	}
	OnStart() {
		const e = (e, t) => {
				this.QVe = e;
				var i =
					ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
						e,
					);
				(e =
					(0 <=
						(t =
							(this.GetItem(21)?.SetUIActive(i?.ShowDropDown ?? !1),
							this.UVe?.SetToggleState(0, !1),
							(this.UVe = t),
							this.KVe.indexOf(e))) && this.jVe.SelectGridProxy(t, !1),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.AdventureHelpBtn,
						i.HelpGroupId,
					),
					(this.O3e = i.HelpGroupId),
					this.RefreshDungeonType(),
					this.r6e(),
					this.e6e(this.V5s),
					this.YVe?.GetCurrentSequence()
						? this.YVe?.ReplaySequenceByKey("Switch")
						: this.YVe?.PlayLevelSequenceByName("Switch"),
					ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(
						this.QVe,
					)))
					? (this.GetItem(18).SetUIActive(!0),
						(t = e.GetNumTxtAndParam()),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(19),
							t[0],
							t[1],
							t[2],
						))
					: this.GetItem(18).SetUIActive(!1);
			},
			t = (e) => this.QVe !== e;
		(this.jVe = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(1),
			this.GetItem(4).GetOwner(),
			() => {
				var i = new NewSoundTypeItem_1.NewSoundTypeItem();
				return i.BindOnToggleFunc(e), i.BindCanToggleExecuteChange(t), i;
			},
		)),
			(this.WVe = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(3),
				this.GetItem(2).GetOwner(),
				() => new NewSoundDetectItem_1.NewSoundDetectItem(),
			));
		var i = [];
		for (
			let e = AdventureDefine_1.WORLD_LEVEL_MIN;
			e <= AdventureDefine_1.WORLD_LEVEL_MAX;
			e++
		)
			i.push(e);
		(this.JVe = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel - 1),
			(this.V5s = this.JVe),
			this.XVe.SetOnSelectCall(this.t6e),
			this.XVe.SetShowType(0),
			this.XVe.InitScroll(i, this.i6e, this.JVe);
		var n =
			ModelManager_1.ModelManager.AdventureGuideModel.GetAllCanShowDungeonTypeList();
		(this.KVe = n),
			(this.$Ve = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.YVe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	r6e() {
		var e =
			ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(
				this.QVe,
			);
		e?.length &&
			((this.QVe !== AdventureDefine_1.EDungeonType.Tutorial &&
				this.QVe !== AdventureDefine_1.EDungeonType.SkillTeach) ||
				e.sort(
					(e, t) => (
						(e = e.Conf.SubDungeonId),
						(t = t.Conf.SubDungeonId),
						(ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(e)
							? 1
							: 0) -
							(ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
								t,
							)
								? 1
								: 0)
					),
				),
			this.WVe.RefreshByData(e));
	}
	OnBeforeShow() {
		var e =
			"NewSoundAreaView" === (e = this.ExtraParams)[0] ||
			"DisposableChallengeView" === e[0]
				? e[1]
				: void 0;
		let t = 0;
		void 0 !== e && 0 <= (e = this.KVe.indexOf(Number(e))) && (t = e),
			this.jVe.RefreshByData(this.KVe, void 0, () => {
				this.jVe.SelectGridProxy(t, !0),
					this.jVe.UnsafeGetGridProxy(t)?.SetSelectToggle();
			}),
			this.$Ve?.PlayLevelSequenceByName("Start"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AdventureHelpBtn,
				this.O3e,
			);
	}
	RefreshDungeonType() {
		switch (
			(this.GetItem(5).SetUIActive(!1),
			this.GetItem(8).SetUIActive(!1),
			this.GetItem(12).SetUIActive(!1),
			this.GetItem(14).SetUIActive(!1),
			this.GetItem(16).SetUIActive(!1),
			this.GetItem(11).SetUIActive(!1),
			this.GetItem(20).SetUIActive(!1),
			this.QVe)
		) {
			case AdventureDefine_1.EDungeonType.Rouge:
				this.n6e();
				break;
			case AdventureDefine_1.EDungeonType.Tower:
				this.s6e(), this.a6e();
				break;
			case AdventureDefine_1.EDungeonType.Weekly:
				this.s6e();
				break;
			case AdventureDefine_1.EDungeonType.LordGym:
				this.h6e();
				break;
			case AdventureDefine_1.EDungeonType.SkillTeach:
				this.l6e();
				break;
			case AdventureDefine_1.EDungeonType.Tutorial:
				this._6e();
			case AdventureDefine_1.EDungeonType.NoSoundArea:
			case AdventureDefine_1.EDungeonType.Boss:
			case AdventureDefine_1.EDungeonType.Mat:
		}
	}
	n6e() {
		this.GetItem(5).SetUIActive(!0);
		var e =
				ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(
					RoguelikeDefine_1.OUTSIDE_CURRENCY_ID,
				) ?? 0,
			t =
				ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(6),
			"Roguelike_ActivityMain_Score",
			e,
			t,
		);
	}
	a6e() {
		this.GetItem(11).SetUIActive(!0), this.GetItem(12).SetUIActive(!0);
		var e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
		e =
			ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
				e,
			);
		this.GetText(13)?.SetText(e);
	}
	h6e() {
		this.GetItem(11).SetUIActive(!0), this.GetItem(14).SetUIActive(!0);
	}
	l6e() {
		this.GetItem(11).SetUIActive(!0), this.GetItem(20).SetUIActive(!0);
	}
	_6e() {
		this.GetItem(11).SetUIActive(!0), this.GetItem(16).SetUIActive(!0);
	}
	s6e() {
		var e = this.GetItem(8),
			t = (e?.SetUIActive(!0), this.GetText(10)),
			i = this.GetText(9);
		if (this.QVe === AdventureDefine_1.EDungeonType.Weekly) {
			i.SetUIActive(!1);
			var n =
				ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(
					this.QVe,
				);
			let r = 0;
			if (1 === n[0].Type) {
				if (!(o = n[0].Conf.MarkId)) return void e.SetUIActive(!1);
				r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o)?.Reward;
			} else {
				if (!n[0].Conf.DungeonId) return void e.SetUIActive(!1);
				r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					n[0].Conf.SubDungeonId,
				)?.RewardId;
			}
			t.SetUIActive(!0);
			var o =
				ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
					r,
				)?.SharedId;
			o
				? ((n =
						ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(
							o,
						)),
					(o =
						ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
							o,
						)),
					(o = (n = n.MaxCount) - o),
					LguiUtil_1.LguiUtil.SetLocalText(
						t,
						AdventureGuideController_1.RECEIVED_COUNT,
						o + "/" + n,
					))
				: e.SetUIActive(!1);
		} else
			this.QVe === AdventureDefine_1.EDungeonType.Tower &&
				(t?.SetUIActive(!1),
				i.SetUIActive(!0),
				(o =
					ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData()
						.CountDownText),
				i.SetText(o));
	}
	OnBeforeHide() {
		UiManager_1.UiManager.IsViewShow("PowerView") &&
			UiManager_1.UiManager.CloseView("PowerView");
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (1 !== e.length || isNaN(Number(e[0])))
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
					"configParams",
					e,
				]);
		else {
			if (0 === (e = Number(e[0])))
				return (t = this.WVe.GetGridByDisplayIndex(0)) ? [t, t] : void 0;
			var t = this.KVe.indexOf(e);
			if (
				0 <= t &&
				((e = this.jVe?.UnsafeGetGridProxy(t)), e && (t = e.GetButtonItem()))
			)
				return [t, t];
		}
	}
}
exports.NewSoundAreaView = NewSoundAreaView;
