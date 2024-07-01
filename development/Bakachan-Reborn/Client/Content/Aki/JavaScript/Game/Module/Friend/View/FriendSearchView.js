"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FriendSearchView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	FriendController_1 = require("../FriendController"),
	FriendItem_1 = require("./FriendItem");
class FriendSearchView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.n8t = void 0),
			(this.s8t = []),
			(this.a8t = void 0),
			(this.fGe = () => new FriendItem_1.FriendItem(this.Info.Name)),
			(this.h8t = () => {
				"" === this.GetInputText(0).GetText()
					? (this.a8t.RefreshSprite("SP_Paste"),
						this.a8t.BindCallback(this.HUt))
					: (this.a8t.RefreshSprite("SP_Clear"),
						this.a8t.BindCallback(this.VUt));
			}),
			(this.VUt = () => {
				this.GetInputText(0).SetText(""), this.h8t();
			}),
			(this.HUt = () => {
				var e = this.GetInputText(0),
					t = (0, puerts_1.$ref)("");
				UE.LGUIBPLibrary.ClipBoardPaste(t),
					(t = (0, puerts_1.$unref)(t)),
					e.SetText(t),
					this.h8t();
			}),
			(this.l8t = () => {
				var e;
				0 <
					(e =
						((e =
							ModelManager_1.ModelManager.FriendModel).ClearApplyFriendList(),
						e.ClearApproveFriendList(),
						e.ClearRefuseFriendList(),
						this.GetInputText(0).GetText())).length &&
					FriendController_1.FriendController.RequestSearchPlayerBasicInfo(
						Number(e),
					);
			}),
			(this._8t = (e) => {
				(this.s8t = FriendController_1.FriendController.CreateFriendItemSt(
					[e],
					0,
				)),
					this.u6t();
			}),
			(this.u8t = (e) => {
				(this.s8t = FriendController_1.FriendController.CreateFriendItemSt(
					[e],
					1,
				)),
					this.u6t();
			}),
			(this.c8t = (e, t) => {
				(this.s8t = FriendController_1.FriendController.CreateFriendItemSt(
					t,
					e,
				)),
					this.u6t();
			}),
			(this.m8t = (e) => {
				for (let t = 0; t < this.s8t.length; t++)
					if (this.s8t[t].Id === e)
						return void this.n8t.UnsafeGetGridProxy(t)?.RefreshMute();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITextInputComponent],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UILoopScrollViewComponent],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.l8t]]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.SearchPlayerInfo,
			this._8t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ApplicationSent,
				this.u8t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ApplicationHandled,
				this.c8t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAddMutePlayer,
				this.m8t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				this.m8t,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.SearchPlayerInfo,
			this._8t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ApplicationSent,
				this.u8t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ApplicationHandled,
				this.c8t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAddMutePlayer,
				this.m8t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveMutePlayer,
				this.m8t,
			);
	}
	OnStart() {
		this.a8t = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(1));
		var e = this.GetItem(3);
		(e =
			((this.n8t = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(4),
				e.GetOwner(),
				this.fGe,
			)),
			this.GetInputText(0).OnTextChange.Bind(this.h8t),
			ModelManager_1.ModelManager.FriendModel)).ClearFriendSearchResults(),
			(this.s8t = FriendController_1.FriendController.CreateFriendItemSt(
				e.GetFriendSearchResultListIds(),
				0,
			)),
			this.u6t();
	}
	OnAfterHide() {
		var e = ModelManager_1.ModelManager.FriendModel;
		e.ClearApplyFriendList(),
			e.ClearApproveFriendList(),
			e.ClearRefuseFriendList();
	}
	OnBeforeDestroy() {
		this.GetInputText(0).OnTextChange.Unbind(),
			ModelManager_1.ModelManager.FriendModel.ResetShowingView();
	}
	u6t() {
		0 < this.s8t.length && this.n8t.ReloadData(this.s8t), this.d8t();
	}
	d8t() {
		this.GetInputText(0).SetText(""),
			this.h8t(),
			this.GetItem(5).SetUIActive(this.s8t.length <= 0);
	}
}
exports.FriendSearchView = FriendSearchView;
