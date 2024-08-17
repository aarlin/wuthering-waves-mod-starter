"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager");
class CalabashController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ActiveBattleView,
			CalabashController.D0t,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ActiveBattleView,
			CalabashController.D0t,
		);
	}
	static OpenCalabashUpgradeSuccessView(e) {
		UiManager_1.UiManager.OpenView("CalabashUpgradeSuccessView", e);
	}
	static R0t() {
		UiManager_1.UiManager.IsViewShow("CalabashUnlockItemView") ||
			!UiManager_1.UiManager.IsViewShow("BattleView") ||
			ModelManager_1.ModelManager.SundryModel.IsBlockTips ||
			UiManager_1.UiManager.OpenView(
				"CalabashUnlockItemView",
				ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift(),
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(6154, this.U0t),
			Net_1.Net.Register(3183, this.A0t),
			Net_1.Net.Register(1167, this.P0t),
			Net_1.Net.Register(29865, this.x0t);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(6154),
			Net_1.Net.UnRegister(3183),
			Net_1.Net.UnRegister(1167),
			Net_1.Net.UnRegister(29865);
	}
	static RequestCalabashLevelReward(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Calabash", 11, "请求领取幻象等级奖励");
		var a = Protocol_1.Aki.Protocol.wQn.create();
		(a.r3n = e),
			Net_1.Net.Call(2557, a, (e) => {
				e &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						25026,
					);
			});
	}
	static RequestPhantomRefiningRequest(e) {
		const a = [];
		e.forEach((e) => {
			a.push(e.IncId);
		}),
			((e = Protocol_1.Aki.Protocol.bns.create()).N3n = a),
			Net_1.Net.Call(24690, e, (e) => {
				e &&
					(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								21004,
							)
						: EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnVisionRecoveryResult,
								e,
							));
			});
	}
	static JumpToCalabashCollectTabView(e) {
		(e = { TabViewName: "CalabashCollectTabView", Param: e }),
			UiManager_1.UiManager.OpenView("CalabashRootView", e);
	}
}
(exports.CalabashController = CalabashController),
	((_a = CalabashController).D0t = () => {
		0 !==
			ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.length &&
			CalabashController.R0t();
	}),
	(CalabashController.U0t = (e) => {
		var a;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Calabash", 11, "服务端推送吸收器信息"),
			ModelManager_1.ModelManager.CalabashModel.CalabashInstance &&
				((a = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp()),
				ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel() !==
					e.YSs.r3n) &&
				((a = {
					AddExp: !1,
					PreLevel:
						ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
					PreExp: a,
					CurLevel: e.YSs.r3n,
					CurExp: a,
				}),
				_a.OpenCalabashUpgradeSuccessView(a)),
			ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceBaseInfo(
				e.YSs,
			),
			ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceConfigInfo(
				e.JSs,
			),
			ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
	}),
	(CalabashController.A0t = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Calabash", 11, "服务端推送吸收器经验变化信息");
		var a = e.ZSs,
			o = e.zSs,
			l = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(),
			r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
		l = { AddExp: !0, PreLevel: r, PreExp: l, CurLevel: a, CurExp: o };
		ModelManager_1.ModelManager.CalabashModel.SetCurrentExp(o),
			ModelManager_1.ModelManager.CalabashModel.SetCalabashLevel(a),
			ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceConfigInfo(
				e.JSs,
			),
			ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData(),
			_a.OpenCalabashUpgradeSuccessView(l),
			r < a &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RedDotRefreshCalabash,
				);
	}),
	(CalabashController.P0t = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Calabash", 11, "服务端更新的葫芦经验图谱信息"),
			ModelManager_1.ModelManager.CalabashModel.SetUnlockCalabashDevelopReward(
				e.eEs,
			),
			ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
	}),
	(CalabashController.x0t = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Calabash", 11, "服务端更新的葫芦已获得奖励等级列表数据"),
			ModelManager_1.ModelManager.CalabashModel.SetCalabashLevelsReward(e.tEs);
	});
