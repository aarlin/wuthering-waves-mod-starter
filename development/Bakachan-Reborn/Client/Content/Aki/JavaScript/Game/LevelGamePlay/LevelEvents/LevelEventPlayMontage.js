"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPlayMontage = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	DEFAULT_FINISHED_TIME = 6e4;
class LevelEventPlayMontage extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.Cfe = -0),
			(this.oRe = void 0),
			(this.E0 = 0),
			(this.sDe = void 0),
			(this.gLe = void 0),
			(this.Kue = (e, t) => {
				this.Cfe = Time_1.Time.WorldTime;
			});
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, t) {
		if (e)
			if (
				"Normal" !== e.ActionMontage.MontageType ||
				StringUtils_1.StringUtils.IsEmpty(e.ActionMontage.Path)
			)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						51,
						"[LevelEventPlayMontage]蒙太奇类型错误或路径为空",
						["MontageType", e.ActionMontage.MontageType],
						["Path", e.ActionMontage.Path],
					),
					this.FinishExecute(!1);
			else {
				if (((this.E0 = e.EntityId), (this.gLe = e), 1 === t.Type)) {
					if (
						((e = EntitySystem_1.EntitySystem.Get(t.EntityId ?? 0)
							?.GetComponent(1)
							?.CreatureData.GetPbDataId()),
						!e)
					)
						return (
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"LevelEvent",
									51,
									"[LevelEventPlayMontage] 无法从行为上下文中获取PbDataId",
									["EntityId", t.EntityId],
								),
							void this.FinishExecute(!1)
						);
					this.E0 = e;
				}
				this.CreateWaitEntityTask(this.E0);
			}
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					51,
					"[LevelEventPlayMontage]关卡事件参数为空",
				),
				this.FinishExecute(!1);
	}
	ExecuteWhenEntitiesReady() {
		var e;
		(this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
			this.gLe.EntityId,
		)),
			this.sDe?.Valid
				? this.sDe.Entity.GetComponent(38)?.IsAiDriver
					? ((e = this.sDe.Entity.GetComponent(1)),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								7,
								"当前实体正在由行为树AI驱动，请检查需求设计是否合理（播放蒙太奇动画）",
								["PbDataId", this.E0],
								["Name", e.Owner.GetName()],
							),
						this.FinishExecute(!0))
					: ((this.oRe = this.sDe.Entity.GetComponent(35)),
						ObjectUtils_1.ObjectUtils.IsValid(this.oRe?.MainAnimInstance)
							? ((this.Cfe =
									(this.gLe.Duration ?? 6e4) + Time_1.Time.WorldTime),
								ResourceSystem_1.ResourceSystem.LoadAsync(
									this.gLe.ActionMontage.Path,
									UE.AnimMontage,
									(e) => {
										this.sDe?.Valid
											? (this.IsAsync ||
													this.gLe.Duration ||
													this.oRe.AddOnMontageEnded(this.Kue),
												this.oRe.PlayOnce(e))
											: (this.IsAsync || this.FinishExecute(!0),
												Log_1.Log.CheckError() &&
													Log_1.Log.Error(
														"LevelEvent",
														27,
														"播放蒙太奇加载完资源后EntityHandle失效",
														["PbDataId", this.E0],
														["AssetPath", this.gLe.ActionMontage.Path],
													));
									},
								),
								this.IsAsync && this.FinishExecute(!0))
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"LevelEvent",
										27,
										"播放蒙太奇时找不到动画蓝图",
										["PbDataId", this.E0],
									),
								this.FinishExecute(!1)))
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelEvent",
							51,
							"播放蒙太奇的Entity还未创建，请检查是否使用当前实体驱动其他实体播放蒙太奇",
							["InteractEntity", this.E0],
							["PlayMontageEntity", this.gLe.EntityId],
						),
					this.FinishExecute(!1));
	}
	OnTick(e) {
		this.Cfe < Time_1.Time.WorldTime &&
			(this.oRe && this.oRe.RemoveOnMontageEnded(this.Kue),
			this.FinishExecute(!0));
	}
	OnReset() {
		this.Cfe = 0;
	}
}
exports.LevelEventPlayMontage = LevelEventPlayMontage;
