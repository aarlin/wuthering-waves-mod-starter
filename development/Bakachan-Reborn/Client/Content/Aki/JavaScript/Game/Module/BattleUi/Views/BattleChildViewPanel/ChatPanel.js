"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatPanel = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ChatDefine_1 = require("../../../Chat/ChatDefine"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ChatRowItem_1 = require("../ChatRowItem"),
	CommonKeyItem_1 = require("../KeyItem/CommonKeyItem"),
	BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class ChatPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
	constructor() {
		super(...arguments),
			(this.WYe = new Map()),
			(this.H6s = []),
			(this.KYe = void 0),
			(this.QYe = 0),
			(this.XYe = void 0),
			(this.$Ye = !1),
			(this.YYe = void 0),
			(this.EPe = void 0),
			(this.jwn = (e) => {
				2 === this.GetOperationType() &&
					this.rJe().then(
						() => {
							this.WYe.size <= 0
								? this.vJe(!1)
								: (this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY),
									(e &&
										!ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()) ||
										this.ZYe());
						},
						() => {},
					);
			}),
			(this.dKe = () => {
				this.iJe();
			}),
			(this.lJe = () => {
				ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
					(this._Je(), this.uJe());
			}),
			(this.cJe = () => {
				UiManager_1.UiManager.IsViewShow("ChatView") ||
					UiManager_1.UiManager.OpenView("ChatView");
			}),
			(this.bMe = (e, t) => {
				if (e === InputMappingsDefine_1.actionMappings.环境特性) {
					if (0 === t)
						switch (
							ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurEnvironmentalKey() ??
							0
						) {
							case 1:
								this.mJe();
								break;
							case 2:
								this.dJe();
								break;
							case 3:
								this.CJe();
						}
				} else
					e === InputMappingsDefine_1.actionMappings.组合主键 && this.gJe(t);
			}),
			(this.fJe = () => {
				this.nJe();
			}),
			(this.pJe = () => {
				this.EPe.StopCurrentSequence(), this.EPe.PlaySequencePurely("Close");
			});
	}
	InitializeTemp() {
		this.QYe =
			CommonParamById_1.configCommonParamById.GetIntConfig("ChatViewTimeDown");
		var e = this.GetOperationType();
		2 === e &&
			(this.rJe().then(
				() => {
					this.WYe.size <= 0 ||
					!ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()
						? this.vJe(!1)
						: (this.ZYe(), this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY));
				},
				() => {},
			),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetItem(3),
			))),
			1 === e &&
				(RedDotController_1.RedDotController.BindRedDot(
					"ChatView",
					this.GetItem(1),
				),
				(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
					this.GetItem(2),
				))),
			this.EPe.BindSequenceCloseEvent((e) => {
				"Close" === e && this.vJe(!1);
			});
	}
	Reset() {
		super.Reset(),
			this.MJe(),
			this.SJe(),
			1 === this.GetOperationType() &&
				RedDotController_1.RedDotController.UnBindRedDot("ChatView");
	}
	OnRegisterComponent() {
		var e = this.GetOperationType();
		2 === e
			? ((this.ComponentRegisterInfos = [
					[0, UE.UIButtonComponent],
					[1, UE.UIScrollViewWithScrollbarComponent],
					[2, UE.UIItem],
					[3, UE.UIItem],
					[4, UE.UIItem],
					[5, UE.UIItem],
					[7, UE.UIItem],
					[8, UE.UIItem],
					[9, UE.UIText],
				]),
				(this.BtnBindInfo = [[0, this.cJe]]))
			: 1 === e &&
				((this.ComponentRegisterInfos = [
					[0, UE.UIButtonComponent],
					[1, UE.UIItem],
					[2, UE.UIItem],
				]),
				(this.BtnBindInfo = [[0, this.cJe]]));
	}
	async InitializeAsync() {
		var e;
		await super.InitializeAsync(),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				((e = this.GetItem(8)),
				(this.YYe = new CommonKeyItem_1.CommonKeyItem()),
				await this.YYe.CreateThenShowByActorAsync(e.GetOwner()));
	}
	OnShowBattleChildViewPanel() {
		var e = ModelManager_1.ModelManager.PlatformModel.OperationType;
		if (2 === e) {
			var t = ModelManager_1.ModelManager.FriendModel,
				i = [];
			for (const e of this.WYe.values()) {
				var n,
					a,
					s = e.GetChatRowData();
				s &&
					((n = s.UniqueId),
					(a = s.TargetPlayerId) && t.HasBlockedPlayer(a) && i.push(n),
					s.IsVisible || i.push(n));
			}
			for (const e of i) this.tJe(e);
			this.WYe.size <= 0
				? (this.SJe(), this.vJe(!1))
				: this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY),
				(e =
					ModelManager_1.ModelManager.BattleUiModel
						.EnvironmentKeyData).SetEnvironmentKeyVisible(2, this.EJe()),
				e.SetEnvironmentKeyVisible(3, this.yJe()),
				this.YYe?.RefreshAction(InputMappingsDefine_1.actionMappings.功能菜单),
				this.uJe(),
				this.iJe(),
				this.EPe.StopCurrentSequence(),
				this.EPe.PlaySequencePurely("Start");
		}
	}
	iJe() {
		var e = ModelManager_1.ModelManager.PlatformModel.IsGamepad();
		this.GetItem(4)?.SetUIActive(!e),
			this.GetItem(5)?.SetUIActive(e),
			this._Je();
	}
	_Je() {
		var e = ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
			t =
				ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurEnvironmentalKey() ??
				0;
		this.GetItem(7)?.SetUIActive(0 !== t && this.$Ye && e);
	}
	uJe() {
		var e =
			ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurKeyText();
		e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e);
	}
	AddEvents() {
		2 === this.GetOperationType() &&
			(EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshChatRowData,
				this.jwn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
				this.lJe,
			),
			InputDistributeController_1.InputDistributeController.BindActions(
				[
					InputMappingsDefine_1.actionMappings.环境特性,
					InputMappingsDefine_1.actionMappings.组合主键,
				],
				this.bMe,
			));
	}
	RemoveEvents() {
		2 === this.GetOperationType() &&
			(EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnRefreshChatRowData,
				this.jwn,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnRefreshChatRowData,
					this.jwn,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.dKe,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
				this.lJe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
					this.lJe,
				),
			InputDistributeController_1.InputDistributeController.UnBindActions(
				[
					InputMappingsDefine_1.actionMappings.环境特性,
					InputMappingsDefine_1.actionMappings.组合主键,
				],
				this.bMe,
			));
	}
	gJe(e) {
		(this.$Ye = 0 === e), this._Je();
	}
	dJe() {
		!this.EJe() ||
			UiManager_1.UiManager.IsViewShow("TowerGuideView") ||
			UiManager_1.UiManager.OpenView("TowerGuideView");
	}
	EJe() {
		return ModelManager_1.ModelManager.TowerModel.CheckInTower();
	}
	CJe() {
		!this.yJe() ||
			UiManager_1.UiManager.IsViewShow("RogueInfoView") ||
			RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
	}
	yJe() {
		return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike();
	}
	mJe() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView,
		);
	}
	async rJe() {
		this.IJe();
		var e,
			t = [];
		for (const i of ModelManager_1.ModelManager.ChatModel.GetChatRowDataList())
			i.IsVisible && ((e = this.zYe(i)), t.push(e));
		await Promise.all(t);
	}
	async zYe(e) {
		var t = e.UniqueId;
		if (1 === e.ContentChatRoomType) {
			var i = e.TargetPlayerId;
			if (!i) return;
			var n = ModelManager_1.ModelManager.FriendModel;
			if (!n.GetFriendById(i)) return;
			if (n.HasBlockedPlayer(i)) return;
		}
		(n = this.GetItem(2)),
			(i = await this.NewDynamicChildViewByResourceId(
				n,
				"UiItem_ChatRowItem_Prefab",
				ChatRowItem_1.ChatRowItem,
				!0,
				e,
			)),
			this.WYe.set(t, i),
			this.H6s.push(t);
	}
	DelayScroll(e) {
		this.MJe(),
			2 === this.GetOperationType() &&
				(this.XYe = TimerSystem_1.TimerSystem.Delay(this.fJe, e));
	}
	MJe() {
		TimerSystem_1.TimerSystem.Has(this.XYe) &&
			TimerSystem_1.TimerSystem.Remove(this.XYe),
			(this.XYe = void 0);
	}
	SJe() {
		TimerSystem_1.TimerSystem.Has(this.KYe) &&
			TimerSystem_1.TimerSystem.Remove(this.KYe),
			(this.KYe = void 0);
	}
	nJe() {
		var e = this.j6s();
		e && this.GetScrollViewWithScrollbar(1)?.ScrollTo(e.GetRootItem());
	}
	tJe(e) {
		var t = this.WYe.get(e);
		0 <=
			(t =
				(t?.GetRootActor()?.IsValid() && t.Destroy(),
				this.WYe.delete(e),
				this.H6s.indexOf(e))) && this.H6s.splice(t, 1);
	}
	IJe() {
		for (const e of this.WYe.values())
			e?.GetRootActor()?.IsValid() && e.Destroy();
		this.WYe.clear(), (this.H6s.length = 0);
	}
	j6s() {
		var e = this.H6s.length;
		if (!(e <= 0) && (e = this.H6s[e - 1])) return this.WYe.get(e);
	}
	ZYe() {
		this.SJe(),
			this.GetItem(3)?.bIsUIActive ||
				(this.EPe.StopCurrentSequence(), this.EPe.PlaySequencePurely("Start")),
			this.vJe(!0),
			(this.KYe = TimerSystem_1.TimerSystem.Delay(this.pJe, this.QYe));
	}
	vJe(e) {
		this.GetItem(3)?.SetUIActive(e);
	}
}
exports.ChatPanel = ChatPanel;
