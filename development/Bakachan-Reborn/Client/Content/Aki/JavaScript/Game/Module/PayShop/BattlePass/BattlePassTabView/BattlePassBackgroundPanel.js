"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassBackgroundPanel = exports.BattlePassBackgroundPanelParam =
		void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	BattlePassController_1 = require("../BattlePassController");
class BattlePassBackgroundPanelParam {
	constructor(e = !1, t = void 0) {
		(this.IsRewardPanel = e), (this.WeaponObservers = t);
	}
}
exports.BattlePassBackgroundPanelParam = BattlePassBackgroundPanelParam;
class BattlePassBackgroundPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.iki = void 0),
			(this.oki = !1),
			(this.rki = void 0),
			(this.nki = void 0),
			(this.aki = () => {
				UiManager_1.UiManager.OpenView("BattlePassBuyLevelView");
			}),
			(this.hki = () => {
				var e = this.OpenParam;
				(ModelManager_1.ModelManager.BattlePassModel.PayButtonRedDotState = !1),
					UiManager_1.UiManager.OpenView(
						"BattlePassPayView",
						e.WeaponObservers,
					);
			}),
			(this.lki = () => {
				this.oki
					? BattlePassController_1.BattlePassController.RequestTakeAllRewardResponse()
					: BattlePassController_1.BattlePassController.TryRequestTaskList(
							ModelManager_1.ModelManager.BattlePassModel.GetAllFinishedTask(),
						);
			}),
			(this.ZGe = () => {
				this.oki
					? this.GetButton(7).RootUIComp.SetUIActive(
							ModelManager_1.ModelManager.BattlePassModel.CheckHasRewardWaitTake(),
						)
					: this.GetButton(7).RootUIComp.SetUIActive(
							ModelManager_1.ModelManager.BattlePassModel.CheckHasTaskWaitTake(),
						);
			}),
			(this.u4e = () => {
				var e = ModelManager_1.ModelManager.BattlePassModel.BattlePassLevel,
					t = ModelManager_1.ModelManager.BattlePassModel.GetMaxLevel(),
					a =
						((a =
							(this.GetText(1).SetText(e.toString()),
							this.GetSprite(3).SetSprite(t === e ? this.rki : this.nki),
							this.iki.SetEnableClick(e < t),
							this.iki.SetLocalTextNew(
								e < t
									? "Text_BattlePassLevelBuy_Text"
									: "Text_BattlePassLevelBuyMax_Text",
							),
							this.GetItem(t === e ? 11 : 10))).SetUIActive(!1),
						a.SetUIActive(!0),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(5),
							"Text_BattlePassWeekExp_Text",
							ModelManager_1.ModelManager.BattlePassModel.WeekExp,
							ModelManager_1.ModelManager.BattlePassModel.GetMaxWeekExp(),
						),
						this.GetText(5).SetUIActive(e < t),
						ModelManager_1.ModelManager.BattlePassModel.GetMaxLevelExp());
				e = e !== t ? ModelManager_1.ModelManager.BattlePassModel.LevelExp : a;
				this.GetText(4).SetText(e.toString() + "/" + a.toString()),
					this.GetSlider(2).SetValue(e / a),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(9),
						ModelManager_1.ModelManager.BattlePassModel.GetPassPayBtnKey(),
					),
					this.ZGe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UISliderComponent],
			[3, UE.UISprite],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIText],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[7, this.lki],
				[8, this.hki],
			]);
	}
	async OnCreateAsync() {
		await Promise.all([this._ki(), this.uki()]);
	}
	async _ki() {
		const e = new CustomPromise_1.CustomPromise();
		ResourceSystem_1.ResourceSystem.LoadAsync(
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_BattlePassPointRed",
			),
			UE.LGUISpriteData_BaseObject,
			(t) => {
				t.IsValid() && (this.rki = t), e.SetResult(!0);
			},
		),
			await e.Promise;
	}
	async uki() {
		const e = new CustomPromise_1.CustomPromise();
		ResourceSystem_1.ResourceSystem.LoadAsync(
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_BattlePassPointGreen",
			),
			UE.LGUISpriteData_BaseObject,
			(t) => {
				t.IsValid() && (this.nki = t), e.SetResult(!0);
			},
		),
			await e.Promise;
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GetBattlePassRewardEvent,
			this.ZGe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
				this.ZGe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
				this.u4e,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GetBattlePassRewardEvent,
			this.ZGe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
				this.ZGe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
				this.u4e,
			);
	}
	OnStart() {
		(this.iki = new ButtonItem_1.ButtonItem(this.GetItem(6))),
			this.iki.SetFunction(this.aki);
		var e = this.OpenParam;
		(this.oki = e.IsRewardPanel), this.u4e(), this.AddEventListener();
	}
	OnBeforeShow() {
		this.GetItem(10).SetUIActive(!1),
			this.GetItem(11).SetUIActive(!1),
			RedDotController_1.RedDotController.BindRedDot(
				"BattlePassPayButton",
				this.GetItem(12),
			);
	}
	OnBeforeHide() {
		RedDotController_1.RedDotController.UnBindRedDot("BattlePassPayButton");
	}
	OnAfterShow() {
		this.AddChild(this.iki);
	}
	OnBeforeDestroy() {
		(this.iki = void 0),
			this.RemoveEventListener(),
			(this.rki = void 0),
			(this.nki = void 0);
	}
}
exports.BattlePassBackgroundPanel = BattlePassBackgroundPanel;
