"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReputationDetailsView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	InfluenceReputationController_1 = require("../Controller/InfluenceReputationController"),
	InfluenceRewardItem_1 = require("./Item/InfluenceRewardItem");
class ReputationDetailsView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.bni = void 0),
			(this.Lo = void 0),
			(this.gpt = () => {
				this.CloseMe();
			}),
			(this.qni = () => {
				var e = this.Lo.ReputationItem;
				UiManager_1.UiManager.OpenView("ReputationTips", e);
			}),
			(this.Gni = () => {
				InfluenceReputationController_1.InfluenceReputationController.RequestInfluenceReward(
					this.Pe.InfluenceId,
				);
			}),
			(this.Nni = () => {
				UiManager_1.UiManager.OpenView(
					"ReputationRewardsView",
					this.Pe.InfluenceId,
				);
			}),
			(this.Oni = () => {
				this.RefreshView();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIInteractionGroup],
			[4, UE.UIButtonComponent],
			[5, UE.UITexture],
			[7, UE.UIText],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIItem],
			[6, UE.UISprite],
		]),
			(this.BtnBindInfo = [
				[0, this.gpt],
				[1, this.qni],
				[2, this.Gni],
				[4, this.Nni],
			]);
	}
	OnBeforeCreate() {
		this.Pe = this.OpenParam;
	}
	OnStart() {
		this.bni = new InfluenceRewardItem_1.InfluenceRewardItem(this.GetItem(10));
	}
	OnAfterShow() {
		(this.Lo = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
			this.Pe.InfluenceId,
		)),
			this.InitView(),
			this.RefreshView();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ReceiveReputationReward,
			this.Oni,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ReceiveReputationReward,
			this.Oni,
		);
	}
	OnBeforeDestroy() {
		this.bni.Destroy(), (this.bni = void 0);
	}
	RefreshView() {
		var e =
				ModelManager_1.ModelManager.InfluenceReputationModel.GetCanReceiveReward(
					this.Pe.InfluenceId,
				),
			t =
				ModelManager_1.ModelManager.InfluenceReputationModel.GetReputationProgress(
					this.Pe.InfluenceId,
				);
		this.RefreshProgress(t.Current, t.Max),
			this.sqe(e.Reward, e.IsAllReceived),
			this.GetButton(2).RootUIComp.SetUIActive(!e.IsAllReceived),
			e.IsAllReceived ||
				this.GetInteractionGroup(3).SetInteractable(
					t.Current >= e.Reward.Item1,
				);
	}
	RefreshProgress(e, t) {
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(9),
			"ReputationNormalValue",
			e,
			t,
		),
			this.GetSprite(6).SetFillAmount(e / t);
	}
	InitView() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), this.Lo.Title),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), this.Lo.ExtraDesc),
			this.SetTextureByPath(this.Lo.Logo, this.GetTexture(5));
	}
	sqe(e, t) {
		this.bni.UpdateItem(e, t), t && this.bni.SetAllReceivedTitle();
	}
}
exports.ReputationDetailsView = ReputationDetailsView;
