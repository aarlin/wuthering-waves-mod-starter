"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventPlayRegisteredMontage = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayRegisteredMontage extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.rRe = void 0),
			(this.nRe = void 0),
			(this.E0 = 0),
			(this.gLe = void 0),
			(this.j3 = void 0),
			(this.sRe = (e) => {
				ObjectUtils_1.ObjectUtils.IsValid(e) &&
				ObjectUtils_1.ObjectUtils.IsValid(this.rRe) &&
				EntitySystem_1.EntitySystem.Get(this.E0)?.IsInit &&
				(1 === (e = (this.nRe = e).CompositeSections.Num())
					? this.aRe()
					: 3 === e && this.hRe(),
				!this.IsAsync)
					? (this.rRe.OnMontageEnded.Add(this.nse),
						EventSystem_1.EventSystem.Add(
							EventDefine_1.EEventName.RemoveEntity,
							this.zpe,
						))
					: this.FinishExecute(!0);
			}),
			(this.nse = (e, t) => {
				e === this.nRe &&
					(this.rRe.OnMontageEnded.Remove(this.nse),
					EventSystem_1.EventSystem.Has(
						EventDefine_1.EEventName.RemoveEntity,
						this.zpe,
					) &&
						EventSystem_1.EventSystem.Remove(
							EventDefine_1.EEventName.RemoveEntity,
							this.zpe,
						),
					this.FinishExecute(!0));
			}),
			(this.zpe = (e, t) => {
				this.E0 === t.Id &&
					(this.j3 && (this.j3.Remove(), (this.j3 = void 0)),
					this.rRe.OnMontageEnded.Remove(this.nse),
					this.FinishExecute(!0),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.RemoveEntity,
						this.zpe,
					));
			});
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, t) {
		(this.gLe = e), this.CreateWaitEntityTask(e.EntityId);
	}
	ExecuteWhenEntitiesReady() {
		var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
			this.gLe.EntityId,
		);
		if (e)
			if (((this.E0 = e.Id), e.Entity.GetComponent(38)?.IsAiDriver))
				(t = e.Entity.GetComponent(1)),
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelEvent",
							7,
							"当前实体正在由行为树AI驱动，请检查需求设计是否合理（播放蒙太奇动画）",
							["PbDataId", this.E0],
							["Name", t.Owner.GetName()],
						),
					this.FinishExecute(!0);
			else if (
				((this.rRe = e.Entity.GetComponent(160)?.MainAnimInstance),
				ObjectUtils_1.ObjectUtils.IsValid(this.rRe))
			) {
				let e;
				var t = (e = this.gLe.IsAbpMontage
					? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(
							this.gLe.MontageId,
						)
					: ModelManager_1.ModelManager.PlotModel.GetMontageConfig(
							this.gLe.MontageId,
						))?.ActionMontage;
				StringUtils_1.StringUtils.IsEmpty(t)
					? this.FinishExecute(!0)
					: ResourceSystem_1.ResourceSystem.LoadAsync(
							t,
							UE.AnimMontage,
							this.sRe,
						);
			} else this.FinishExecute(!0);
		else this.FinishExecute(!0);
	}
	aRe() {
		var e = this.gLe.RepeatTimes ?? 1;
		if ((this.rRe.Montage_Play(this.nRe), 1 === e))
			this.rRe.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION,
				this.nRe,
			);
		else if (-1 === e)
			this.rRe.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				this.nRe,
			);
		else if (1 < e) {
			this.rRe.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				this.nRe,
			),
				(e =
					(e - 0.5) *
					this.nRe.SequenceLength *
					TimeUtil_1.TimeUtil.InverseMillisecond);
			const t = this.rRe,
				i = this.nRe,
				s = this.IsAsync,
				n = this.E0;
			e < TimerSystem_1.MIN_TIME || e > TimerSystem_1.MAX_TIME
				? this.FinishExecute(!0)
				: (this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
						ObjectUtils_1.ObjectUtils.IsValid(t) &&
						EntitySystem_1.EntitySystem.Get(n)?.IsInit
							? t.Montage_SetNextSection(
									CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
									CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION,
									i,
								)
							: s || this.FinishExecute(!0);
					}, e));
		}
	}
	hRe() {
		var e = this.gLe.LoopDuration ?? 0;
		if ((this.rRe.Montage_Play(this.nRe), 0 === e))
			this.rRe.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
				this.nRe,
			);
		else if (-1 === e)
			this.rRe.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				this.nRe,
			);
		else if (0 < e) {
			this.rRe.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				this.nRe,
			),
				(e *= TimeUtil_1.TimeUtil.InverseMillisecond);
			const t = this.rRe,
				i = this.nRe,
				s = this.IsAsync,
				n = this.E0;
			e < TimerSystem_1.MIN_TIME || e > TimerSystem_1.MAX_TIME
				? this.FinishExecute(!0)
				: TimerSystem_1.TimerSystem.Delay(() => {
						ObjectUtils_1.ObjectUtils.IsValid(t) &&
						EntitySystem_1.EntitySystem.Get(n)?.IsInit
							? t.Montage_SetNextSection(
									CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
									CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
									i,
								)
							: s || this.FinishExecute(!0);
					}, e);
		}
	}
}
exports.LevelEventPlayRegisteredMontage = LevelEventPlayRegisteredMontage;
