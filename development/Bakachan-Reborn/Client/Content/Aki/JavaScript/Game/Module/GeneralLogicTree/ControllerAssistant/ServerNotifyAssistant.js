"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ServerNotifyAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../Core/Net/Net"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ActionTask_1 = require("../../../World/Task/ActionTask"),
	DelayTask_1 = require("../../../World/Task/DelayTask"),
	TaskSystem_1 = require("../../../World/Task/TaskSystem"),
	LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
	GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
	ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class ServerNotifyAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.XXt = (e) => {
				var t = MathUtils_1.MathUtils.LongToBigInt(e.L5n),
					o =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							t,
						);
				o
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Quest",
								19,
								"行为树节点状态更新",
								["树Id", o.TreeConfigId],
								["节点Id", e.Jkn],
								[
									"节点状态",
									GeneralLogicTreeDefine_1.btNodeStatusLogString[e.n3n],
								],
							),
						o.UpdateNodeState(0, e.Jkn, e.n3n))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"收到节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
							["treeId", t],
						);
			}),
			(this.$Xt = (e) => {
				var t = MathUtils_1.MathUtils.LongToBigInt(e.L5n),
					o =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							t,
						);
				o
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Quest",
								19,
								"行为树节点进度更新",
								["树Id", o.TreeConfigId],
								["节点Id", e.Jkn],
							),
						o.UpdateNodeProgress(e.Jkn, e.Gms))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"收到节点进度更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
							["treeId", t],
						);
			}),
			(this.YXt = (e) => {
				var t = MathUtils_1.MathUtils.LongToBigInt(e.L5n);
				(t =
					ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t))
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Quest",
								19,
								"行为树ChildQuest节点状态更新",
								["树Id", t.TreeConfigId],
								["节点Id", e.Jkn],
								[
									"ChildQuest子节点状态",
									GeneralLogicTreeDefine_1.btChildQuestNodeStatusLogString[
										e.n3n
									],
								],
							),
						t.UpdateChildQuestNodeState(e.Jkn, e.n3n, 0))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"收到子任务节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
							["treeId", e.L5n],
						);
			}),
			(this.JXt = (e) => {
				var t = MathUtils_1.MathUtils.LongToBigInt(e.L5n);
				(t =
					ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t))
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GeneralLogicTree",
								19,
								"服务器通知客户端做回退准备",
								["treeConfigId", t.TreeConfigId],
							),
						t.PrepareRollback(e.gvs))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器通知回退准备时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
							["treeId", e.L5n],
						);
			}),
			(this.zXt = (e) => {
				(e.fvs || e.vvs) &&
					((e = new DelayTask_1.DelayTask(
						"OnBtRollbackStartNotify",
						void 0,
						() => (
							LevelLoadingController_1.LevelLoadingController.OpenLoading(3, 3),
							!0
						),
					)),
					TaskSystem_1.TaskSystem.AddTask(e),
					TaskSystem_1.TaskSystem.Run());
			}),
			(this.ZXt = (e) => {
				var t,
					o,
					r = MathUtils_1.MathUtils.LongToBigInt(e.L5n),
					a =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							r,
						);
				a
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GeneralLogicTree", 19, "服务器通知行为树回退", [
								"treeConfigId",
								a.TreeConfigId,
							]),
						(o = ModelManager_1.ModelManager.GeneralLogicTreeModel),
						(t = a.IsTracking()),
						o.RemoveBehaviorTree(r),
						(o = o.CreateBehaviorTree(e.pvs)),
						t &&
							(a.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay
								? ModelManager_1.ModelManager.LevelPlayModel.SetTrackLevelPlayId(
										0,
									)
								: o.SetTrack(!0)),
						(e = new ActionTask_1.ActionTask(
							"OnRollbackInfoNotify",
							() => (
								LevelLoadingController_1.LevelLoadingController.CloseLoading(3),
								!0
							),
						)),
						TaskSystem_1.TaskSystem.AddTask(e),
						TaskSystem_1.TaskSystem.Run())
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"GeneralLogicTree",
								19,
								"收到服务器回退通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
								["treeId", r],
							),
						LevelLoadingController_1.LevelLoadingController.CloseLoading(3));
			}),
			(this.e$t = (e) => {
				var t = MathUtils_1.MathUtils.LongToBigInt(e.L5n),
					o =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							t,
						);
				o
					? o.UpdateOccupations(e)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"收到服务器挂起通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
							["treeId", t],
						);
			}),
			(this.i$t = (e) => {
				var t = MathUtils_1.MathUtils.LongToBigInt(e.L5n),
					o =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							t,
						);
				o
					? o.UpdateTimer(e.Mvs)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器通知更新定时器时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
							["treeId", t],
						);
			}),
			(this.o$t = (e) => {
				var t = MathUtils_1.MathUtils.LongToBigInt(e.L5n),
					o =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							t,
						);
				o ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							32,
							"服务器通知更新变量时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
							["treeId", t],
						)),
					o.UpdateTreeVars(e);
			}),
			(this.r$t = (e) => {
				if ((e = e.Vfs) && 0 !== e.length)
					for (const t of e)
						ModelManager_1.ModelManager.GeneralLogicTreeModel.CreateBehaviorTree(
							t,
						);
			}),
			(this.n$t = (e) => {
				if ((e = e.$fs) && 0 !== e.length)
					for (const o of e) {
						var t = MathUtils_1.MathUtils.LongToBigInt(o);
						ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(
							t,
						);
					}
			}),
			(this.s$t = (e) => {
				(ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip = e.$Us),
					ModelManager_1.ModelManager.AutoRunModel.SetAutoRunMode(
						e.$Us ? "ServerControlledSkip" : "Disabled",
					),
					ModelManager_1.ModelManager.AutoRunModel.SetAutoRunState(
						e.$Us ? "Running" : "Stopped",
					);
			});
	}
	OnDestroy() {}
	OnRegisterNetEvent() {
		Net_1.Net.Register(24771, this.XXt),
			Net_1.Net.Register(23037, this.$Xt),
			Net_1.Net.Register(28799, this.YXt),
			Net_1.Net.Register(22847, this.JXt),
			Net_1.Net.Register(24775, this.zXt),
			Net_1.Net.Register(24972, this.ZXt),
			Net_1.Net.Register(19395, this.e$t),
			Net_1.Net.Register(12992, this.i$t),
			Net_1.Net.Register(21356, this.o$t),
			Net_1.Net.Register(21616, this.r$t),
			Net_1.Net.Register(12452, this.n$t),
			Net_1.Net.Register(23608, this.s$t);
	}
	OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(24771),
			Net_1.Net.UnRegister(23037),
			Net_1.Net.UnRegister(28799),
			Net_1.Net.UnRegister(22847),
			Net_1.Net.UnRegister(24972),
			Net_1.Net.UnRegister(19395),
			Net_1.Net.UnRegister(12992),
			Net_1.Net.UnRegister(21356),
			Net_1.Net.UnRegister(21616),
			Net_1.Net.UnRegister(12452),
			Net_1.Net.UnRegister(23608);
	}
}
exports.ServerNotifyAssistant = ServerNotifyAssistant;
