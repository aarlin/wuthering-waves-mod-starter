"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WaitEntityTask = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	WaitEntityTaskController_1 = require("../../Module/WaitEntityTask/WaitEntityTaskController"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	WAIT_TIME = 6e4;
class WaitEntityTask {
	constructor(t) {
		(this.SetAsyncLoadingTimeLimit = t),
			(this.$pr = void 0),
			(this.Ypr = new Set()),
			(this.WaitType = void 0),
			(this.Jpr = void 0),
			(this.BOe = 0),
			(this.zpr = !1),
			(this.kpr = void 0),
			(this.OnAddEntity = (t, e) => {
				"CreatureDataId" === this.WaitType
					? this.Ypr.delete(t)
					: "PbDataId" === this.WaitType && this.Ypr.delete(e),
					0 < this.Ypr.size ||
						(this.SetAsyncLoadingTimeLimit &&
							ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
								GlobalData_1.GlobalData.World,
								"WaitEntityTask",
							),
						this.Neo(!this.zpr));
			}),
			(this.OnRemoveEntity = (t, e) => {
				if ("CreatureDataId" === this.WaitType) {
					if (!this.Ypr.has(t)) return;
					this.Ypr.delete(t);
				} else if ("PbDataId" === this.WaitType) {
					if (!this.Ypr.has(e)) return;
					this.Ypr.delete(e);
				}
				(this.zpr = !0),
					this.Ypr.size ||
						(this.SetAsyncLoadingTimeLimit &&
							ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
								GlobalData_1.GlobalData.World,
								"WaitEntityTask",
							),
						this.Neo(!1));
			});
	}
	AddEntities(t, e, i = 6e4, r = !0, a = !1) {
		if (Array.isArray(t)) for (const e of t) this.Zpr(e), this.Ypr.add(e);
		else this.Zpr(t), this.Ypr.add(t);
		if (
			((this.kpr = e),
			(this.Jpr =
				0 <= i
					? TimerSystem_1.TimerSystem.Delay((e) => {
							this.SetAsyncLoadingTimeLimit &&
								ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
									GlobalData_1.GlobalData.World,
									"WaitEntityTask",
								),
								a
									? Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"Entity",
											3,
											"等待实体超时",
											["Id类型", "CreatureDataId"],
											["实体列表", JSON.stringify(t)],
										)
									: this.Neo(void 0);
						}, i)
					: void 0),
			Array.isArray(t))
		)
			for (const e of t) this.Xpr(e, r);
		else this.Xpr(t, r);
		if (this.$pr) {
			for (const t of this.$pr) this.Xpr(t, r);
			this.$pr = void 0;
		}
		0 < this.Ypr.size
			? this.SetAsyncLoadingTimeLimit &&
				ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
					GlobalData_1.GlobalData.World,
					"WaitEntityTask",
				)
			: this.Neo(!0);
	}
	AddEntitiesWithPbDataId(t, e, i = 6e4, r = !0, a = !1) {
		if (Array.isArray(t)) for (const e of t) this.Ypr.add(e);
		else this.Ypr.add(t);
		if (
			((this.kpr = e),
			(this.Jpr =
				0 <= i
					? TimerSystem_1.TimerSystem.Delay((e) => {
							this.SetAsyncLoadingTimeLimit &&
								ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
									GlobalData_1.GlobalData.World,
									"WaitEntityTask",
								),
								a
									? Log_1.Log.CheckWarn() &&
										Log_1.Log.Warn(
											"Entity",
											3,
											"等待实体超时",
											["Id类型", "PbDataId"],
											["实体列表", JSON.stringify(t)],
										)
									: this.Neo(!1);
						}, i)
					: void 0),
			Array.isArray(t))
		)
			for (const e of t) this.Xpr(e, r);
		else this.Xpr(t, r);
		0 < this.Ypr.size
			? this.SetAsyncLoadingTimeLimit &&
				ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
					GlobalData_1.GlobalData.World,
					"WaitEntityTask",
				)
			: this.Neo(!0);
	}
	Xpr(t, e = !0) {
		let i;
		!(i =
			"PbDataId" === this.WaitType
				? ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)
				: ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) && e
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Entity",
						34,
						"WaitEntityTask期望监听的实体未创建或已死亡",
						["EntityId", t],
					),
				this.Ypr.delete(t))
			: i &&
				(i.IsInit
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Entity",
								34,
								"WaitEntityTask期望监听的实体已创建",
								["EntityId", t],
							),
						this.Ypr.delete(t))
					: (i.Priority < 101 && (i.Priority = 101),
						CharacterController_1.CharacterController.SortItem(i)));
	}
	Neo(t) {
		void 0 !== this.Jpr &&
			(TimerSystem_1.TimerSystem.Remove(this.Jpr), (this.Jpr = void 0)),
			this.Ypr.clear(),
			WaitEntityTaskController_1.WaitEntityTaskController.RemoveTask(this.BOe),
			this.kpr(t);
	}
	static Create(t, e, i = !1, r = 6e4, a = !0, s = !1) {
		return (
			((i = new WaitEntityTask(i)).WaitType = "CreatureDataId"),
			(i.BOe = WaitEntityTaskController_1.WaitEntityTaskController.AddTask(i)),
			i.AddEntities(t, e, r, a, s),
			i
		);
	}
	static CreateWithPbDataId(t, e, i = !1, r = 6e4, a = !0, s = !1) {
		return (
			((i = new WaitEntityTask(i)).WaitType = "PbDataId"),
			(i.BOe = WaitEntityTaskController_1.WaitEntityTaskController.AddTask(i)),
			i.AddEntitiesWithPbDataId(t, e, r, a, s),
			i
		);
	}
	Cancel() {
		void 0 !== this.Jpr &&
			(TimerSystem_1.TimerSystem.Remove(this.Jpr), (this.Jpr = void 0)),
			this.Ypr.clear(),
			WaitEntityTaskController_1.WaitEntityTaskController.RemoveTask(this.BOe);
	}
	Zpr(t) {
		if (
			(t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) &&
			t.Entity.GetComponent(1)?.IsAutonomousProxy &&
			t
		) {
			var e = t.Entity.GetComponent(0)?.CustomServerEntityIds;
			if (e) {
				this.$pr || (this.$pr = new Set());
				for (const t of e) this.$pr.add(t), this.Ypr.add(t);
			}
			(e = t.Entity.GetComponent(0)?.GetSummonerId()),
				e &&
					(this.$pr || (this.$pr = new Set()),
					this.$pr.add(e),
					this.Ypr.add(e));
		}
	}
}
exports.WaitEntityTask = WaitEntityTask;
