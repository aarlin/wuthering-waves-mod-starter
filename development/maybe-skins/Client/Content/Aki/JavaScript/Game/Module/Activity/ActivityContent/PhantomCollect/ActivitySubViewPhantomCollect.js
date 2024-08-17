"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewPhantomCollectTaskItem =
		exports.ActivitySubViewPhantomCollectMonsterItem =
		exports.ActivitySubViewPhantomCollect =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	CalabashController_1 = require("../../../Calabash/CalabashController"),
	CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
	ItemController_1 = require("../../../Item/ItemController"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
	ActivityPhantomCollectController_1 = require("./ActivityPhantomCollectController");
class ActivitySubViewPhantomCollect extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.TaskGenericLayout = void 0),
			(this.ActivityDataBase = void 0),
			(this.TitleComponent = void 0),
			(this.MonsterItemList = []),
			(this.Ike = (t) => {
				this.RefreshTaskLayout();
			}),
			(this.Tke = () => new ActivitySubViewPhantomCollectTaskItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIVerticalLayout],
		];
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPhantomCollectUpdate,
			this.Ike,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPhantomCollectUpdate,
			this.Ike,
		);
	}
	OnSetData() {}
	async OnBeforeStartAsync() {
		this.TaskGenericLayout = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(6),
			this.Tke,
		);
		var t = this.GetItem(0),
			e =
				((this.TitleComponent = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
				await this.TitleComponent.CreateThenShowByActorAsync(t.GetOwner()),
				[]);
		for (let t = 0; t < 5; t++) {
			var o = this.GetItem(1 + t),
				i = new ActivitySubViewPhantomCollectMonsterItem();
			e.push(i.CreateThenShowByActorAsync(o.GetOwner())),
				this.MonsterItemList.push(i);
		}
		await Promise.all(e);
	}
	OnStart() {
		(this.ActivityDataBase =
			ActivityPhantomCollectController_1.ActivityPhantomCollectController.GetCurrentActivityDataById()),
			this.TitleComponent.SetTitleByText(this.ActivityBaseData.GetTitle());
	}
	OnRefreshView() {
		this.RefreshTimerText(), this.RefreshTaskLayout(), this.RefreshMonster();
	}
	RefreshTimerText() {
		var [t, e] = this.GetTimeVisibleAndRemainTime();
		this.TitleComponent.SetTimeTextVisible(t),
			t && this.TitleComponent.SetTimeTextByText(e);
	}
	RefreshTaskLayout() {
		var t =
			ActivityPhantomCollectController_1.ActivityPhantomCollectController.GetCurrentActivityDataById();
		this.TaskGenericLayout.RefreshByDataAsync(t.PhantomCollectRewardList ?? []);
	}
	RefreshMonster() {
		var t = this.ActivityDataBase.GetCollectPhantomList();
		for (let e = 0; e < 5; e++) this.MonsterItemList[e].Refresh(t[e]);
	}
}
exports.ActivitySubViewPhantomCollect = ActivitySubViewPhantomCollect;
class ActivitySubViewPhantomCollectMonsterItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.MonsterId = 0),
			(this.Lke = () => {
				0 !== this.MonsterId &&
					CalabashController_1.CalabashController.JumpToCalabashCollectTabView(
						this.MonsterId,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.Lke]]);
	}
	Refresh(t) {
		this.MonsterId = t;
		var e = (
				ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(
					ActivityPhantomCollectController_1.ActivityPhantomCollectController
						.ActivityId,
				)
			).PhantomActivityImage.get(t),
			o = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomIsUnlock(t);
		e && o && this.SetTextureByPath(e, this.GetTexture(1)),
			this.GetItem(2).SetUIActive(
				o &&
					!ModelManager_1.ModelManager.CalabashModel.CheckMonsterIdInRecord(t),
			);
	}
}
exports.ActivitySubViewPhantomCollectMonsterItem =
	ActivitySubViewPhantomCollectMonsterItem;
class ActivitySubViewPhantomCollectTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.RewardItem = void 0),
			(this.Data = void 0),
			(this.ItemId = void 0),
			(this.OnBtnGo = () => {
				if (
					this.Data?.Ikn === Protocol_1.Aki.Protocol.MBs.Proto_PhantomSideQuest
				) {
					var t =
						ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(
							ActivityPhantomCollectController_1
								.ActivityPhantomCollectController.ActivityId,
						);
					for (let o = 0; o < t.phantomsidequestLength(); o++) {
						var e = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(
							t.PhantomSideQuest[o],
						);
						if (2 === e || 1 === e)
							return void UiManager_1.UiManager.OpenView(
								"QuestView",
								t.PhantomSideQuest[o],
							);
						if (0 === e)
							return void (0 === o
								? UiManager_1.UiManager.OpenView(
										"QuestView",
										t.PhantomSideQuest[o],
									)
								: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"ConditionGroup_12980013_HintText",
									));
					}
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"PhantomSideQuestNoTask",
					);
				} else
					this.Data?.Ikn === Protocol_1.Aki.Protocol.MBs.Proto_DataDock &&
						UiManager_1.UiManager.OpenView("CalabashRootView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UISprite],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[4, this.OnBtnGo]]);
	}
	OnStart() {
		(this.RewardItem = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			this.RewardItem.Initialize(this.GetItem(1).GetOwner()),
			this.RewardItem.BindOnExtendTogglePress((t) => {
				switch (this.Data.ckn) {
					case Protocol_1.Aki.Protocol.D0s.qms:
					case Protocol_1.Aki.Protocol.D0s.h3n:
						this.ItemId &&
							(ItemController_1.ItemController.OpenItemTipsByItemId(
								this.ItemId,
							),
							this.RewardItem.SetLockVisible(!0));
						break;
					case Protocol_1.Aki.Protocol.D0s.j0s:
						ActivityPhantomCollectController_1.ActivityPhantomCollectController.PhantomCollectRewardReceiveRequest(
							this.Data.Ikn,
						).then((t) => {
							t
								? ((this.Data = t), this.Refresh(this.Data, !1, this.GridIndex))
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error("Activity", 35, "声骸收集活动领取奖励失败", [
										"Type",
										this.Data.Ikn,
									]);
						});
				}
			});
	}
	Refresh(t, e, o) {
		this.Data = t;
		var i =
			ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(
				ActivityPhantomCollectController_1.ActivityPhantomCollectController
					.ActivityId,
			);
		if (void 0 === i)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Activity", 35, "声骸收集活动数据未查询到", [
					"ActivityId",
					ActivityPhantomCollectController_1.ActivityPhantomCollectController
						.ActivityId,
				]);
		else {
			let e = 0;
			t.Ikn === Protocol_1.Aki.Protocol.MBs.Proto_PhantomsCollect
				? (e = i.PhantomReward)
				: t.Ikn === Protocol_1.Aki.Protocol.MBs.Proto_DataDock
					? (e = i.DataDockReward)
					: t.Ikn === Protocol_1.Aki.Protocol.MBs.Proto_PhantomSideQuest &&
						(e = i.PhantomSideQuestReward),
				0 !== e &&
					((n =
						ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackagePreview(
							e,
						)),
					(r = [{ IncId: 0, ItemId: (n = Array.from(n))[0][0] }, n[0][1]]),
					(this.ItemId = n[0][0]),
					this.RewardItem.Refresh(r),
					this.RewardItem.SetReceivedVisible(
						t.ckn === Protocol_1.Aki.Protocol.D0s.qms,
					),
					this.RewardItem.SetLockVisible(
						t.ckn === Protocol_1.Aki.Protocol.D0s.h3n,
					),
					this.RewardItem.SetReceivableVisible(
						t.ckn === Protocol_1.Aki.Protocol.D0s.j0s,
					)),
				t.ckn === Protocol_1.Aki.Protocol.D0s.qms
					? ((n = UE.Color.FromHex("394449FF")),
						this.GetSprite(5).SetColor(n),
						this.GetText(2)?.SetColor(n),
						this.GetButton(0)?.SetSelfInteractive(!1),
						this.GetItem(6).SetUIActive(!0))
					: t.ckn === Protocol_1.Aki.Protocol.D0s.h3n
						? ((r = UE.Color.FromHex("394449FF")),
							this.GetSprite(5).SetColor(r),
							this.GetText(2)?.SetColor(r),
							this.GetButton(0)?.SetSelfInteractive(!0),
							this.GetItem(6).SetUIActive(!1))
						: t.ckn === Protocol_1.Aki.Protocol.D0s.j0s &&
							((n = UE.Color.FromHex("A28129FF")),
							this.GetSprite(5).SetColor(n),
							this.GetText(2)?.SetColor(n),
							this.GetButton(0)?.SetSelfInteractive(!0),
							this.GetItem(6).SetUIActive(!1));
			var r =
					ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig.GetPhantomCollectTaskDesc(
						t.Ikn,
					),
				n =
					ActivityPhantomCollectController_1.ActivityPhantomCollectController.GetCurrentActivityDataById();
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(2),
				r.Title,
				n.GetCollectPhantomCount(),
				n.GetCollectPhantomList().length,
			),
				t.Ikn === Protocol_1.Aki.Protocol.MBs.Proto_PhantomsCollect
					? ((n = Math.floor(Math.random() * i.phantomsLength())),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(3),
							i.PhantomDesc.get(i.Phantoms[n]),
						))
					: LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.Desc),
				this.GetButton(4)
					.GetRootComponent()
					.SetUIActive(
						t.Ikn !== Protocol_1.Aki.Protocol.MBs.Proto_PhantomsCollect &&
							t.ckn !== Protocol_1.Aki.Protocol.D0s.qms,
					);
		}
	}
}
exports.ActivitySubViewPhantomCollectTaskItem =
	ActivitySubViewPhantomCollectTaskItem;
