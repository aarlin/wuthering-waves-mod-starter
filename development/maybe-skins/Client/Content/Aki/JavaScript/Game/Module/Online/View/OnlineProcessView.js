"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineProcessView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ChatController_1 = require("../../Chat/ChatController"),
	PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
	PersonalOptionItem_1 = require("../../Personal/View/PersonalOptionItem"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class OnlineProcessView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.H6t = void 0),
			(this.j6t = void 0),
			(this.W6t = void 0),
			(this.K6t = void 0),
			(this.Q6t = void 0),
			(this.X6t = void 0),
			(this.$6t = void 0),
			(this.Y6t = void 0),
			(this.g6t = void 0),
			(this.J6t = (e, t, a) => (
				(t = new PersonalOptionItem_1.PersonalOptionItem(t)).Refresh(e, !1, a),
				1 === e
					? (this.j6t = t)
					: 2 === e
						? (this.W6t = t)
						: 3 === e
							? (this.K6t = t)
							: 4 === e
								? (this.Q6t = t)
								: 5 === e
									? (this.X6t = t)
									: 12 === e
										? (this.$6t = t)
										: 13 === e && (this.Y6t = t),
				{ Key: a, Value: t }
			)),
			(this.yEt = (e) => {
				this.j6t.GetRootItem().SetUIActive(!1),
					this.W6t.GetRootItem().SetUIActive(!1);
				var t = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
				e === t?.PlayerId &&
					ModelManager_1.ModelManager.ChatModel.IsInMute(t.PlayerId),
					this.RefreshMute();
			}),
			(this.Z6t = () => {
				UiManager_1.UiManager.CloseView("OnlineProcessView"),
					ChatController_1.ChatController.OpenFriendChat(
						ModelManager_1.ModelManager.OnlineModel.CachePlayerData.PlayerId,
					);
			}),
			(this.e8t = () => {
				ModelManager_1.ModelManager.OnlineModel.CachePlayerData
					? this.t8t()
					: this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIGridLayout],
			[11, UE.UIText],
		]),
			(this.BtnBindInfo = [[6, this.Z6t]]);
	}
	OnStart() {
		(this.g6t = new PlayerHeadItem_1.PlayerHeadItem(
			this.GetItem(0).GetOwner(),
		)),
			this.GetText(4).SetText(""),
			this.i8t(),
			this.t8t();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateFriendViewShow,
			this.e8t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddMutePlayer,
				this.yEt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				this.yEt,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateFriendViewShow,
			this.e8t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddMutePlayer,
				this.yEt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				this.yEt,
			);
	}
	i8t() {
		this.H6t && this.H6t.ClearChildren(),
			(this.H6t = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetGridLayout(9),
				this.J6t,
			)),
			this.H6t.RebuildLayoutByDataNew(this.o8t());
	}
	o8t() {
		var e = [];
		for (const t of ConfigManager_1.ConfigManager.FriendConfig.GetProcessViewFunctionList())
			(12 === t && !ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)) ||
				e.push(t);
		return e;
	}
	t8t() {
		var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
		(ModelManager_1.ModelManager.FriendModel.SelectedPlayerId = e.PlayerId),
			this.w6t(),
			this.g6t.RefreshByHeadPhotoId(e.HeadId),
			this.GetText(5).SetText(e.Level.toString()),
			this.yEt(e.PlayerId);
	}
	RefreshMute() {
		var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
		e = ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId);
		this.GetItem(8).SetUIActive(e);
	}
	C4e() {
		var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData,
			t = ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId),
			a = this.GetText(2);
		t &&
		void 0 !==
			(t = ModelManager_1.ModelManager.FriendModel.GetFriendById(
				e.PlayerId,
			)?.FriendRemark) &&
		"" !== t
			? (a.SetText(`(${t})`), (a.useChangeColor = !0))
			: (a.SetText(e?.Name), (a.useChangeColor = !1));
	}
	r8t() {
		var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData?.Signature,
			t = this.GetText(11);
		e && "" !== e ? t.SetText(e) : t.SetText("");
	}
	w6t() {
		var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
		this.C4e(),
			this.r8t(),
			(e = ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId));
		this.Y6t.GetRootItem().SetUIActive(e),
			this.W6t.GetRootItem().SetUIActive(!1),
			this.X6t.GetRootItem().SetUIActive(!0),
			this.K6t.GetRootItem().SetUIActive(!1),
			this.Q6t.GetRootItem().SetUIActive(e),
			this.GetButton(6).RootUIComp.SetUIActive(e),
			this.$6t?.SetActive(!0);
	}
	OnBeforeDestroy() {
		this.H6t && (this.H6t.ClearChildren(), (this.H6t = void 0));
	}
}
exports.OnlineProcessView = OnlineProcessView;
