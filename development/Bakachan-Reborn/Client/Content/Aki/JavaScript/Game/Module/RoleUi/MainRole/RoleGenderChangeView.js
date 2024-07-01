"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleGenderChangeView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LoginDefine_1 = require("../../Login/Data/LoginDefine"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	MainRoleController_1 = require("../MainRoleController");
class RoleGenderChangeView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.EPe = void 0),
			(this.elo = () => {
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"GenderTransferSuccess",
				),
					this.Plo(!1),
					this.CloseMe();
			}),
			(this.OnClickCancel = () => {
				this.CloseMe();
			}),
			(this.OnClickConfirm = () => {
				var e;
				Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
					185,
				)?.HasTag(1996802261)
					? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
							ConfigManager_1.ConfigManager.TextConfig.GetTextById(
								"CanNotTransferInFight",
							),
						),
						this.CloseMe())
					: (this.Plo(!0),
						(e =
							ConfigManager_1.ConfigManager.RoleConfig.GetRoleGenderSwitchDelayTime()),
						LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(4),
							"GenderTransfering",
						),
						this.PlayArrowSequence(),
						TimerSystem_1.TimerSystem.Delay(() => {
							this.xlo();
						}, e));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UITexture],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[2, this.OnClickCancel],
				[3, this.OnClickConfirm],
			]);
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
		if (e) {
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
				this.StopArrowSequence();
			var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
				o = ModelManager_1.ModelManager.WorldLevelModel.Sex,
				i = n.ElementId,
				t =
					((o =
						o === LoginDefine_1.ELoginSex.Boy
							? LoginDefine_1.ELoginSex.Girl
							: LoginDefine_1.ELoginSex.Boy),
					ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(o)),
				r = t.length;
			let s, g;
			for (let e = 0; e < r; e++) {
				var l = t[e],
					a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(l.Id);
				if (i === a.ElementId) {
					(g = l.Id), (s = a);
					break;
				}
			}
			s &&
				(this.SetRoleIcon(n.RoleHeadIconBig, this.GetTexture(0), e),
				this.SetRoleIcon(s.RoleHeadIconBig, this.GetTexture(1), g),
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "GenderTransfer"),
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "Cancel"),
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "Confirm"));
		}
	}
	OnAfterShow() {}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRoleChangeEnd,
			this.elo,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRoleChangeEnd,
			this.elo,
		);
	}
	OnBeforeDestroy() {}
	PlayArrowSequence() {
		this.EPe && this.EPe.PlayLevelSequenceByName("Arrow");
	}
	StopArrowSequence() {
		this.EPe && this.EPe.StopSequenceByKey("Arrow");
	}
	xlo() {
		var e =
			ModelManager_1.ModelManager.WorldLevelModel.Sex ===
			LoginDefine_1.ELoginSex.Boy
				? LoginDefine_1.ELoginSex.Girl
				: LoginDefine_1.ELoginSex.Boy;
		MainRoleController_1.MainRoleController.SendRoleSexChangeRequest(e),
			this.StopArrowSequence();
	}
	Plo(e) {
		this.GetButton(2).SetSelfInteractive(!e),
			this.GetButton(3).SetSelfInteractive(!e),
			this.ChildPopView?.SetCloseBtnInteractive(!e);
	}
}
exports.RoleGenderChangeView = RoleGenderChangeView;
