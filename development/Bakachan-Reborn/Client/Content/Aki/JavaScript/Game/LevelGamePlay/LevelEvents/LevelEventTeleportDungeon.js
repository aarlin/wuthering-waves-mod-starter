"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventTeleportDungeon = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
	EditBattleTeamController_1 = require("../../Module/EditBattleTeam/EditBattleTeamController"),
	ScrollingTipsController_1 = require("../../Module/ScrollingTips/ScrollingTipsController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTeleportDungeon extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.SDe = () => {
				this.FinishExecute(!0);
			});
	}
	ExecuteInGm(e, n, o) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, n) {
		if (ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon())
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
				"TeleportDungeon被GM屏蔽，跳过执行",
			),
				this.FinishExecute(!0);
		else {
			const n = e;
			n
				? n.DungeonId
					? ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()
						? this.FinishExecute(!0)
						: ((e =
								ModelManager_1.ModelManager.InstanceDungeonEntranceModel
									.InstanceId),
							(e =
								ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
									e,
								)) && e.InstType
								? n.IsNeedSecondaryConfirmation
									? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
											164,
										)).FunctionMap.set(2, () => {
											var e = n.DungeonId,
												o =
													((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
														e),
													this.XRe(n.TransitionOption));
											this.TeleportDungeonRequest(e, n.LocationEntityId, o);
										}),
										e.FunctionMap.set(1, () => {
											ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
												this.SDe();
										}),
										ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
											e,
										))
									: this.$Re(n)
								: this.FinishExecute(!1))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"InstanceDungeon",
								5,
								"跳转副本行为错误，副本Id配置错误",
							),
						this.FinishExecute(!1))
				: this.FinishExecute(!1);
		}
	}
	$Re(e) {
		var n = e.DungeonId,
			o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
			t =
				((o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o)),
				this.XRe(e.TransitionOption));
		t =
			(t =
				((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.TransitionOption =
					t),
				(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
					n),
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(n)))
				.InstType === Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance;
		o.InstType,
			Protocol_1.Aki.Protocol.sOs.Proto_BigWorldInstance,
			t ? this.SDe() : this.YRe(e.IsRegroup, n, e.LocationEntityId);
	}
	YRe(e, n, o) {
		e
			? (EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.EnterInstanceDungeon,
					this.SDe,
				),
				EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
					n,
					!1,
					!1,
				))
			: this.SDe();
	}
	OnReset() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.EnterInstanceDungeon,
			this.SDe,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.EnterInstanceDungeon,
				this.SDe,
			);
	}
	async TeleportDungeonRequest(e, n = 0, o) {
		var t = Protocol_1.Aki.Protocol.Eus.create();
		return (e =
			((t.Rkn = e),
			(t.xkn =
				ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList),
			(t.Pkn = n),
			(t.Bkn = o),
			await Net_1.Net.CallAsync(23883, t))).lkn !==
			Protocol_1.Aki.Protocol.lkn.Sys
			? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					9513,
				),
				!1)
			: (EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.EnterInstanceDungeon,
				),
				!0);
	}
	XRe(e) {
		let n;
		switch (e?.Type) {
			case IAction_1.ETeleportTransitionType.CenterText:
				var o = e,
					t = Protocol_1.Aki.Protocol.nOs.create(),
					r =
						((t.wkn = Protocol_1.Aki.Protocol.wkn.Proto_CenterText),
						Protocol_1.Aki.Protocol.IOs.create());
				(r.bkn = o.CenterTextFlow.FlowListName),
					(r.qkn = o.CenterTextFlow.FlowId),
					(r.Gkn = o.CenterTextFlow.StateId),
					(t.Okn = r),
					(n = t);
				break;
			case IAction_1.ETeleportTransitionType.PlayEffect:
				(o = e),
					((r = Protocol_1.Aki.Protocol.nOs.create()).wkn =
						Protocol_1.Aki.Protocol.wkn.Proto_PlayEffect),
					(r.Nkn = o.EffectDaPath),
					(n = r);
				break;
			case IAction_1.ETeleportTransitionType.PlayMp4:
				(t = e),
					((o = Protocol_1.Aki.Protocol.nOs.create()).wkn =
						Protocol_1.Aki.Protocol.wkn.Proto_PlayMp4),
					(o.Nkn = t.Mp4Path),
					(n = o);
		}
		return n;
	}
}
exports.LevelEventTeleportDungeon = LevelEventTeleportDungeon;
