"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeActivityView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ActivityRogueController_1 = require("../../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
	PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeActivityView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.CaptionItem = void 0),
			(this.Wao = void 0),
			(this.TDe = void 0),
			(this.OnBtnShop = () => {
				var e, t;
				2 === this.Wao.GetRogueActivityState()
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"Rogue_Function_End_Tip",
						)
					: void 0 !==
							(t = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData) &&
						((t =
							ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
								t.F8n,
							)),
						((e = new PayShopViewData_1.PayShopViewData()).ShowShopIdList = [
							t.ShopId,
						]),
						(e.PayShopId = t.ShopId),
						LocalStorage_1.LocalStorage.SetPlayer(
							LocalStorageDefine_1.ELocalStoragePlayerKey.RoguelikeShopRecord,
							!0,
						),
						(t = TimeUtil_1.TimeUtil.GetNextDayTimeStamp()),
						LocalStorage_1.LocalStorage.SetPlayer(
							LocalStorageDefine_1.ELocalStoragePlayerKey
								.RoguelikeShopNextTimeStamp,
							t,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RoguelikeDataUpdate,
						),
						ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
							e,
						));
			}),
			(this.OnBtnSkillTreeClick = () => {
				var e;
				2 === this.Wao.GetRogueActivityState()
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"Rogue_Function_End_Tip",
						)
					: (e = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData) &&
						RoguelikeController_1.RoguelikeController.OpenRoguelikeSkillView(
							e.F8n,
						);
			}),
			(this.OnBtnDoorClick = () => {
				2 === this.Wao.GetRogueActivityState()
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"Rogue_Function_End_Tip",
						)
					: UiManager_1.UiManager.OpenView("RoguelikeAchievementView");
			}),
			(this.OnBtnConfirmClick = () => {
				ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial() &&
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"TrialRoleDungeonsLimit",
					),
					2 === this.Wao.GetRogueActivityState()
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"Rogue_Function_End_Tip",
							)
						: RoguelikeController_1.RoguelikeController.EnterCurrentRogueEntrance();
			}),
			(this.RefreshUi = () => {
				var e,
					t,
					o = ModelManager_1.ModelManager.RoguelikeModel.CurrSeasonData;
				o &&
					((e =
						ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId()
							?.WeekTokenMaxCount ?? 1),
					(t = o.Jws / e),
					this.GetSprite(8)?.SetFillAmount(t),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(7),
						"Roguelike_ActivityMain_Score",
						o.Jws,
						e,
					),
					this.GetItem(16).SetUIActive(1 === o.F8n),
					this.GetItem(17).SetUIActive(2 === o.F8n)),
					this.RefreshRemainTime();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UITexture],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
			[9, UE.UIText],
			[8, UE.UISprite],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIText],
			[14, UE.UIText],
			[15, UE.UIItem],
			[16, UE.UIItem],
			[17, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[2, this.OnBtnSkillTreeClick],
				[3, this.OnBtnDoorClick],
				[4, this.OnBtnConfirmClick],
				[6, this.OnBtnShop],
			]);
	}
	async OnBeforeStartAsync() {
		var e;
		(this.Wao =
			ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()),
			void 0 === this.Wao
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Activity", 59, "RoguelikeActivityView没有活动数据")
				: ((e =
						await RoguelikeController_1.RoguelikeController.RoguelikeSeasonDataRequest()),
					await RoguelikeController_1.RoguelikeController.RoguelikeTalentInfoRequest(
						e.F8n,
					),
					1 === this.Wao.GetRogueActivityState() &&
						(await RoguelikeController_1.RoguelikeController.RoguelikeLastInfoRequestAsync()));
	}
	OnStart() {
		(this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
			this.GetItem(0),
		)),
			this.CaptionItem.SetCloseCallBack(() => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			});
		var e = this.Wao.LocalConfig;
		e &&
			(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), e.DescTheme),
			this.RefreshUi(),
			(this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
				this.RefreshRemainTime();
			}, TimeUtil_1.TimeUtil.InverseMillisecond)));
	}
	OnBeforeShow() {
		RedDotController_1.RedDotController.BindRedDot(
			"RogueSkillUnlock",
			this.GetItem(10),
		),
			RedDotController_1.RedDotController.BindRedDot(
				"RoguelikeAchievement",
				this.GetItem(11),
			),
			RedDotController_1.RedDotController.BindRedDot(
				"RoguelikeShop",
				this.GetItem(12),
				(e) => {
					this.GetItem(12)?.SetUIActive(e);
				},
			);
	}
	OnBeforeHide() {
		RedDotController_1.RedDotController.UnBindRedDot("RogueSkillUnlock"),
			RedDotController_1.RedDotController.UnBindRedDot("RoguelikeAchievement"),
			RedDotController_1.RedDotController.UnBindRedDot("RoguelikeShop");
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
			this.RefreshUi,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
			this.RefreshUi,
		);
	}
	OnBeforeDestroy() {
		this.TDe && TimerSystem_1.TimerSystem.Remove(this.TDe);
	}
	RefreshRemainTime() {
		var e,
			t = this.GetButton(4),
			o = this.GetItem(15),
			i = this.GetText(9),
			r = this.GetText(14),
			n = this.Wao.GetRogueActivityState();
		0 === n
			? (t.RootUIComp.SetUIActive(!0),
				o.SetUIActive(!1),
				i.SetUIActive(!1),
				(e = this.Wao.EndOpenTime - TimeUtil_1.TimeUtil.GetServerTime()),
				(e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e)),
				r.SetText(e.CountDownText))
			: (1 === n
					? (t.RootUIComp.SetUIActive(!1),
						o.SetUIActive(!0),
						i.SetUIActive(!0),
						(e =
							this.Wao.ReceiveEndOpenTime -
							TimeUtil_1.TimeUtil.GetServerTime()),
						(n = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e)),
						i.SetText(n.CountDownText))
					: (t.RootUIComp.SetUIActive(!1),
						o.SetUIActive(!0),
						i.SetUIActive(!0),
						LguiUtil_1.LguiUtil.SetLocalText(i, "Rogue_Function_End_Tip")),
				LguiUtil_1.LguiUtil.SetLocalText(r, "Rogue_Function_End_Tip"));
	}
}
exports.RoguelikeActivityView = RoguelikeActivityView;
