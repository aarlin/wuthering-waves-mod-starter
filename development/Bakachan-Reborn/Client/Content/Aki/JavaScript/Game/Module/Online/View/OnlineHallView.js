"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineHallView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	InstanceDungeonMatchingCountDown_1 = require("../../InstanceDungeon/InstanceDungeonMatchingCountDown"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	OnlineController_1 = require("../OnlineController"),
	OnlineHallItem_1 = require("./OnlineHallItem"),
	OnlineTeamItem_1 = require("./OnlineTeamItem");
class OnlineHallView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.bGi = void 0),
			(this.qGi = void 0),
			(this.ohi = void 0),
			(this.GGi = () => new OnlineHallItem_1.OnlineHallItem(this.Info.Name)),
			(this.NGi = () => new OnlineTeamItem_1.OnlineTeamItem()),
			(this.OGi = (e) => {
				1 === e &&
					(ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!0),
					this.kGi(
						ModelManager_1.ModelManager.OnlineModel.ShowCanJoin
							? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormFriend()
							: ModelManager_1.ModelManager.OnlineModel.FriendWorld,
					)),
					0 === e &&
						(ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!1),
						this.kGi(
							ModelManager_1.ModelManager.OnlineModel.ShowCanJoin
								? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormStranger()
								: ModelManager_1.ModelManager.OnlineModel.StrangerWorld,
						));
			}),
			(this.FGi = (e) => {
				1 === e &&
					(ModelManager_1.ModelManager.OnlineModel.SetHallShowCanJoin(!0),
					this.kGi(
						ModelManager_1.ModelManager.OnlineModel.ShowFriend
							? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormFriend()
							: ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormStranger(),
					)),
					0 === e &&
						(ModelManager_1.ModelManager.OnlineModel.SetHallShowCanJoin(!1),
						this.kGi(
							ModelManager_1.ModelManager.OnlineModel.ShowFriend
								? ModelManager_1.ModelManager.OnlineModel.FriendWorld
								: ModelManager_1.ModelManager.OnlineModel.StrangerWorld,
						));
			}),
			(this.Opt = () => {
				this.CloseMe();
			}),
			(this.VGi = () => {
				UiManager_1.UiManager.OpenView("OnlineSettingView");
			}),
			(this.HGi = () => {
				UiManager_1.UiManager.OpenView(
					"OnlineWorldSearchView",
					void 0,
					(e, n) => {
						this.AddChildViewById(n);
					},
				);
			}),
			(this.jGi = () => {
				var e = this.GetText(8),
					n =
						"PermissionsSetting_" +
						ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting;
				LguiUtil_1.LguiUtil.SetLocalText(e, n);
			}),
			(this.WGi = () => {
				this.kGi(ModelManager_1.ModelManager.OnlineModel.StrangerWorld);
			}),
			(this.KGi = () => {
				this.QGi(ModelManager_1.ModelManager.OnlineModel.GetTeamList()),
					this.XGi();
			}),
			(this.G$e = () => {
				0 ===
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
					? this.ohi?.GetActive() && this.ohi?.PlayAnimation("Close")
					: 2 ===
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
						this.ohi?.GetActive() &&
						this.ohi?.PlayAnimation("Finish");
			}),
			(this.N$e = () => {
				this.ohi?.PlayAnimation("Start"),
					this.ohi.SetMatchingTime(0),
					this.ohi.StartTimer();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIExtendToggle],
			[3, UE.UIExtendToggle],
			[4, UE.UIButtonComponent],
			[5, UE.UILoopScrollViewComponent],
			[6, UE.UIItem],
			[8, UE.UIText],
			[7, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIText],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.Opt],
				[1, this.VGi],
				[4, this.HGi],
			]);
	}
	async OnBeforeStartAsync() {
		(this.ohi =
			new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown()),
			await this.ohi.CreateByActorAsync(this.GetItem(12).GetOwner()),
			this.ohi.SetUiActive(!1);
	}
	OnStart() {
		this.XGi(),
			this.$Gi(),
			ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
				? this.QGi(ModelManager_1.ModelManager.OnlineModel.GetTeamList())
				: OnlineController_1.OnlineController.RefreshWorldList() ||
					this.kGi(ModelManager_1.ModelManager.OnlineModel.StrangerWorld),
			ModelManager_1.ModelManager.OnlineModel.SetHallShowCanJoin(!1),
			ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!1),
			this.jGi(),
			(ModelManager_1.ModelManager.FriendModel.ShowingView = this.Info.Name);
	}
	OnAfterShow() {
		this.ohi.BindOnStopTimer(
			() =>
				1 !==
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState(),
		),
			this.ohi.BindOnClickBtnCancelMatching(() => {
				this.ohi?.PlayAnimation("Close"),
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
			}),
			1 ===
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
				(this.ohi?.PlayAnimation("Start"), this.ohi.StartTimer());
	}
	OnBeforeDestroy() {
		this.GetExtendToggle(2).OnStateChange.Remove(this.OGi),
			this.GetExtendToggle(3).OnStateChange.Remove(this.OGi),
			this.bGi && this.bGi.ClearGridProxies(),
			(this.bGi = void 0),
			this.qGi && this.qGi.ClearGridProxies(),
			(this.qGi = void 0),
			(this.ohi = void 0);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshPermissionsSetting,
			this.jGi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshWorldList,
				this.WGi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshOnlineTeamList,
				this.KGi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnMatchingChange,
				this.G$e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnMatchingBegin,
				this.N$e,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshPermissionsSetting,
			this.jGi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshWorldList,
				this.WGi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshOnlineTeamList,
				this.KGi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnMatchingChange,
				this.G$e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnMatchingBegin,
				this.N$e,
			);
	}
	XGi() {
		var e, n, t;
		ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
			? ((e = this.GetItem(9)),
				(n = this.GetItem(10)),
				(t = this.GetText(11)),
				e.SetUIActive(!1),
				n.SetUIActive(!0),
				t.SetText(
					ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() +
						"/" +
						ModelManager_1.ModelManager.OnlineModel.TeamMaxSize,
				))
			: (this.GetExtendToggle(2).OnStateChange.Add(this.OGi),
				this.GetExtendToggle(3).OnStateChange.Add(this.FGi));
	}
	$Gi() {
		var e,
			n = this.GetLoopScrollViewComponent(5);
		ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
			? ((e = this.GetItem(6).GetOwner()),
				(this.qGi = new LoopScrollView_1.LoopScrollView(n, e, this.NGi)))
			: ((e = this.GetItem(6).GetOwner()),
				(this.bGi = new LoopScrollView_1.LoopScrollView(n, e, this.GGi)));
	}
	kGi(e) {
		var n = this.GetItem(7),
			t = this.GetLoopScrollViewComponent(5).RootUIComp;
		!e || e.length <= 0
			? (n.SetUIActive(!0), t.SetUIActive(!1))
			: (t.SetUIActive(!0),
				n.SetUIActive(!1),
				this.bGi && this.bGi.ReloadData(e));
	}
	QGi(e) {
		var n = this.GetItem(7);
		e.length <= 0
			? (n.SetUIActive(!0), this.qGi.ReloadData(e))
			: (n.SetUIActive(!1), this.qGi && this.qGi.ReloadData(e));
	}
}
exports.OnlineHallView = OnlineHallView;
