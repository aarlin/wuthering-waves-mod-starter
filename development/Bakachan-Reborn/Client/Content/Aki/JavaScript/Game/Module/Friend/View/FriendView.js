"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FriendView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
	CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	FriendController_1 = require("../FriendController"),
	FriendItem_1 = require("./FriendItem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FriendView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.C8t = void 0),
			(this.g8t = void 0),
			(this.f8t = void 0),
			(this.p8t = void 0),
			(this.v8t = void 0),
			(this.M8t = void 0),
			(this.S8t = void 0),
			(this.C6t = void 0),
			(this.E8t = []),
			(this.cpt = void 0),
			(this.y8t = void 0),
			(this.I8t = () => new FriendItem_1.FriendItem(this.Info.Name)),
			(this.CloseClick = () => {
				this.CloseMe();
			}),
			(this.dVe = (e, t) => new CommonTabItem_1.CommonTabItem()),
			(this.pqe = (e) => {
				(e = this.E8t[e]),
					(ModelManager_1.ModelManager.FriendModel.FilterState = e.Id),
					this.u6t();
			}),
			(this.yqe = (e) => {
				let t;
				return (
					1 === (e = this.E8t[e]).Id
						? (t =
								ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
									"FriendFriend",
								))
						: 2 === e.Id
							? (t =
									ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
										"FriendApplicationList",
									))
							: 3 === e.Id &&
								(t =
									ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
										"FriendRecentMultiplayerGame",
									)),
					new CommonTabData_1.CommonTabData(
						e.IconPath,
						new CommonTabTitleData_1.CommonTabTitleData(t),
					)
				);
			}),
			(this.T8t = () => {
				var e = ModelManager_1.ModelManager.FriendModel.FilterState,
					t = new UiPopViewData_1.UiPopViewData();
				1 === e && UiManager_1.UiManager.OpenView("FriendSearchView", t);
			}),
			(this.L8t = () => {
				this.p8t.GetRootItem().SetRaycastTarget(!1),
					this.M8t &&
						TimerSystem_1.TimerSystem.Has(this.M8t) &&
						TimerSystem_1.TimerSystem.Remove(this.M8t),
					(this.M8t = TimerSystem_1.TimerSystem.Delay(() => {
						this.p8t.GetRootItem().SetRaycastTarget(!0);
					}, TimerSystem_1.MIN_TIME)),
					(this.C6t = []);
				for (const t of this.f8t) {
					var e =
						ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
							t.Id,
						);
					e && !e?.Debug && this.C6t.push(t.Id);
				}
				FriendController_1.FriendController.RequestFriendApplyHandle(
					this.C6t,
					Protocol_1.Aki.Protocol.xks.Proto_Approve,
				);
			}),
			(this.D8t = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(59);
				this.v8t.GetRootItem().SetRaycastTarget(!1),
					this.S8t &&
						TimerSystem_1.TimerSystem.Has(this.S8t) &&
						TimerSystem_1.TimerSystem.Remove(this.S8t),
					(this.S8t = TimerSystem_1.TimerSystem.Delay(() => {
						this.v8t.GetRootItem().SetRaycastTarget(!0);
					}, TimerSystem_1.MIN_TIME)),
					(this.C6t = []),
					e.FunctionMap.set(2, () => {
						for (const e of this.f8t)
							ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
								e.Id,
							)?.Debug || this.C6t.push(e.Id);
						FriendController_1.FriendController.RequestFriendApplyHandle(
							this.C6t,
							Protocol_1.Aki.Protocol.xks.Proto_Reject,
						);
					}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}),
			(this.R8t = () => {
				var e = ModelManager_1.ModelManager.FriendModel.FilterState,
					t = new UiPopViewData_1.UiPopViewData();
				1 === e && UiManager_1.UiManager.OpenView("FriendBlackListView", t);
			}),
			(this.U8t = () => {
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"CopiedMyUid",
				),
					UE.LGUIBPLibrary.ClipBoardCopy(
						ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(),
					);
			}),
			(this.e8t = () => {
				this.u6t();
			}),
			(this.A8t = () => {
				2 === ModelManager_1.ModelManager.FriendModel.FilterState && this.u6t();
			}),
			(this.m8t = (e) => {
				for (let t = 0; t < this.C8t.length; t++)
					if (this.C8t[t].Id === e)
						return void this.g8t.UnsafeGetGridProxy(t)?.RefreshMute();
			}),
			(this.P8t = () => {
				(this.C8t = FriendController_1.FriendController.CreateFriendItemSt(
					ModelManager_1.ModelManager.FriendModel.GetRecentlyTeamIds(),
					0,
				)),
					this.bqe(this.C8t),
					this.x8t();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UILoopScrollViewComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[8, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[9, UE.UIButtonComponent],
			[5, UE.UIText],
		]),
			(this.BtnBindInfo = [[9, this.U8t]]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateFriendViewShow,
			this.e8t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.FriendApplicationListUpdate,
				this.A8t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddMutePlayer,
				this.m8t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				this.m8t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdateRecentlyTeamDataEvent,
				this.P8t,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateFriendViewShow,
			this.e8t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.FriendApplicationListUpdate,
				this.A8t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddMutePlayer,
				this.m8t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				this.m8t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdateRecentlyTeamDataEvent,
				this.P8t,
			);
	}
	async OnBeforeStartAsync() {
		(this.y8t = this.GetLoopScrollViewComponent(2).RootUIComp),
			(this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(6))),
			(this.v8t = new ButtonItem_1.ButtonItem(this.GetItem(7)));
		var e = this.GetItem(3);
		(this.g8t = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(2),
			e.GetOwner(),
			this.I8t,
		)),
			await this.TLt();
	}
	OnBeforeShow() {
		this.u6t();
	}
	OnBeforeDestroy() {
		this.cpt && (this.cpt.Destroy(), (this.cpt = void 0)),
			(this.E8t = []),
			this.g8t && (this.g8t = void 0),
			ModelManager_1.ModelManager.FriendModel.Clear(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
			),
			ModelManager_1.ModelManager.FriendModel.ClearTestFriendData();
	}
	async TLt() {
		(this.E8t =
			ConfigManager_1.ConfigManager.FriendConfig.GetAllFilterConfigDuplicate()),
			this.E8t.sort((e, t) => e.Id - t.Id);
		var e = new CommonTabComponentData_1.CommonTabComponentData(
				this.dVe,
				this.pqe,
				this.yqe,
			),
			t =
				((this.cpt =
					new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
						this.GetItem(0),
						e,
						this.CloseClick,
					)),
				this.E8t.length),
			i = this.cpt.CreateTabItemDataByLength(t);
		for (let e = 0; e < t; e++)
			2 === this.E8t[e].Id && (i[e].RedDotName = "FriendNewApplication");
		await this.cpt.RefreshTabItemAsync(i), this.cpt.SelectToggleByIndex(0);
	}
	u6t() {
		var e = ModelManager_1.ModelManager.FriendModel;
		switch ((this.w8t(), e.FilterState)) {
			case 1:
				(this.C8t = FriendController_1.FriendController.CreateFriendItemSt(
					e.GetFriendSortedListIds(),
					0,
				)),
					this.bqe(this.C8t),
					this.p8t.SetEnableClick(!0),
					this.v8t.SetEnableClick(!0),
					this.x8t();
				break;
			case 2:
				(this.C8t = FriendController_1.FriendController.CreateFriendItemSt(
					e.GetFriendApplyListIds(),
					0,
				)),
					(this.f8t = this.C8t),
					this.bqe(this.C8t),
					this.p8t.SetEnableClick(0 < this.C8t.length),
					this.v8t.SetEnableClick(0 < this.C8t.length),
					ModelManager_1.ModelManager.FriendModel.MarkDirtyNewApplications(),
					this.x8t();
				break;
			case 3:
				this.y8t?.SetUIActive(!1),
					FriendController_1.FriendController.RequestFriendRecentlyTeam();
		}
		LguiUtil_1.LguiUtil.SetLocalText(
			this.GetText(8),
			"FriendMyUid",
			ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(),
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
			);
	}
	B8t() {
		let e = !1;
		switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
			case 1:
				(e = !0),
					this.p8t.SetLocalText("FriendAddFriend"),
					this.p8t.SetFunction(this.T8t),
					this.v8t.SetLocalText("FriendBlackList"),
					this.v8t.SetFunction(this.R8t);
				break;
			case 2:
				(e = !0),
					this.p8t.SetLocalText("FriendAllAccept"),
					this.p8t.SetFunction(this.L8t),
					this.v8t.SetLocalText("FriendAllIgnore"),
					this.v8t.SetFunction(this.D8t);
		}
		this.p8t.SetActive(e), this.v8t.SetActive(e);
	}
	w8t() {
		let e = "FriendNotAvailableFriend";
		switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
			case 1:
				break;
			case 2:
				e = "FriendNotAvailableFriendApplication";
				break;
			case 3:
				e = "FriendNotAvailableRecentTeammate";
		}
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), e), this.B8t();
	}
	x8t() {
		var e = ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(
				ModelManager_1.ModelManager.FriendModel.FilterState,
			),
			t = this.GetText(1),
			i = this.C8t.length;
		let n = "FriendCount";
		switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
			case 1:
				break;
			case 2:
				n = "FriendApplicationCount";
				break;
			case 3:
				n = "FriendMultiplayerCount";
		}
		LguiUtil_1.LguiUtil.SetLocalText(t, n, i, e),
			this.GetItem(4).SetUIActive(i <= 0);
	}
	bqe(e) {
		this.g8t && 0 < e.length
			? (this.y8t?.SetUIActive(!0), this.g8t.ReloadData(e))
			: this.y8t?.SetUIActive(!1);
	}
}
exports.FriendView = FriendView;
