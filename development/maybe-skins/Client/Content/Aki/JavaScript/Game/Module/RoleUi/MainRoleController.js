"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MainRoleController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController"),
	EditFormationController_1 = require("../EditFormation/EditFormationController"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class MainRoleController extends UiControllerBase_1.UiControllerBase {
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"RoleGenderChangeView",
			MainRoleController.V4e,
			"MainRoleController.CanOpenView",
		);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"RoleGenderChangeView",
			MainRoleController.V4e,
		);
	}
	static IsCanChangeRole(e) {
		var o = ModelManager_1.ModelManager.RoleModel.GetCanChangeRoleIdList(),
			r = o.length;
		for (let n = 0; n < r; n++) if (o[n] === e) return !0;
		return !1;
	}
	static IsMainRole(e) {
		return !!ModelManager_1.ModelManager.RoleModel.IsMainRole(e);
	}
	static SendRoleSexChangeRequest(e) {
		var o = Protocol_1.Aki.Protocol.Ths.create();
		(o.x6n = e),
			Net_1.Net.Call(16423, o, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ((ModelManager_1.ModelManager.WorldLevelModel.Sex = e.x6n),
							this.wlo(),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnRoleChangeEnd,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								5627,
							));
			});
	}
	static SendRoleElementChangeRequest(e) {
		var o = Protocol_1.Aki.Protocol.Rhs.create();
		(o.K8n = e),
			Net_1.Net.Call(27889, o, (e) => {
				e &&
					(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								15230,
							)
						: (EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnRoleChangeEnd,
							),
							this.wlo()));
			});
	}
	static wlo() {
		EditFormationController_1.EditFormationController.RefreshMainRoleInfo(),
			EditBattleTeamController_1.EditBattleTeamController.RefreshMainRoleInfo();
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(29747, (e) => {
			var o = e.QDs;
			e = e.j5n;
			ModelManager_1.ModelManager.PhantomBattleModel.DeleteBattleData(o),
				ModelManager_1.ModelManager.RoleModel.RoleChange(o, e),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Role",
						44,
						"角色转换成功: ",
						["sourceRoleId", o],
						["roleInfo!.Proto_RoleId", e.l3n],
					);
		}),
			Net_1.Net.Register(2480, (e) => {
				e &&
					ModelManager_1.ModelManager.RoleModel.UpdateCanChangeRoleIdList(
						e.XDs,
					);
			});
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(29747), Net_1.Net.UnRegister(2480);
	}
}
(exports.MainRoleController = MainRoleController).V4e = (e) => {
	var o =
			Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
				185,
			)?.HasTag(1996802261),
		r = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
	return o
		? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
				ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"CanNotTransferInFight",
				),
			),
			!1)
		: !r ||
				(ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"CanNotTransferInInstance",
					),
				),
				!1);
};
