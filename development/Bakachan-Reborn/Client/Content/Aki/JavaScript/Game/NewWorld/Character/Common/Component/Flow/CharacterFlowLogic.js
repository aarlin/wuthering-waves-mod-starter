"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterFlowLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	Global_1 = require("../../../../../Global"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	LogReportController_1 = require("../../../../../Module/LogReport/LogReportController"),
	LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine"),
	SimpleNpcFlowConditionChecker_1 = require("../../../SimpleNpc/Logics/SimpleNpcFlowConditionChecker"),
	DynamicFlowController_1 = require("./DynamicFlowController"),
	DEFAULT_WAIT_TIME = 3,
	DEFAULT_LOOP_TIME = 10;
class CharacterFlowLogic {
	constructor(t, e) {
		(this.K$o = 0),
			(this.ActorComp = void 0),
			(this.HeadInfoComp = void 0),
			(this.FlowInfoList = new Array()),
			(this.TempFlowInfoList = new Array()),
			(this.CurrentFlowInfo = void 0),
			(this.EntityList = new Array()),
			(this.CurrentTalkItems = void 0),
			(this.CurrentTalkId = 0),
			(this.DynamicFlowData = void 0),
			(this.IsPause = !0),
			(this.EnableUpdate = !1),
			(this.IsExecuteFlowEnd = !0),
			(this.WaitSecondsRemain = 0),
			(this.ActorComp = t),
			(this.HeadInfoComp = t.Entity.GetComponent(70)),
			(this.TempFlowInfoList = new Array()),
			(this.K$o = this.ActorComp.CreatureData.GetPbDataId()),
			e && ((this.EntityList = e.NpcIds), (this.FlowInfoList = e.Flows));
	}
	Tick(t) {
		this.EnableUpdate &&
			((this.WaitSecondsRemain -= t), this.WaitSecondsRemain <= 0) &&
			(this.IsExecuteFlowEnd
				? this.IsPause
					? (this.EnableUpdate = !1)
					: this.StartFlow()
				: this.PlayTalk(this.CurrentTalkId + 1));
	}
	get IsPlaying() {
		return !this.IsExecuteFlowEnd;
	}
	StartFlow() {
		this.FindRandomFlow(), this.PlayFlow();
	}
	StopFlow() {
		this.IsExecuteFlowEnd = !0;
		let t = void (this.WaitSecondsRemain = 0);
		if (
			(t = this.DynamicFlowData
				? this.DynamicFlowData.EntityIds
				: this.EntityList) &&
			2 < t.length
		)
			for (let o = 0, i = t.length; o < i; o++) {
				var e = this.GetEntity(t[o]);
				e && e.GetComponent(28).RemoveFlowActions();
			}
		else this.ActorComp.Entity.GetComponent(28).RemoveFlowActions();
	}
	PlayFlow() {
		if (this.CurrentFlowInfo || this.DynamicFlowData) {
			if (!this.DynamicFlowData || this.IsDynamicFlowActorsReady()) {
				let e,
					o = 0;
				var t;
				this.DynamicFlowData
					? ((e = this.DynamicFlowData.Flow),
						(o = this.DynamicFlowData.Flow?.StateId
							? this.DynamicFlowData.Flow.StateId
							: 0))
					: (t = this.CurrentFlowInfo.Flow) &&
						((e = t.FlowIndex),
						(o = t.FlowIndex?.StateId ? t.FlowIndex.StateId : 0)),
					e &&
					(t = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
						e.FlowListName,
						e.FlowId,
						this.ActorComp.Owner.ActorLabel,
						o,
					))
						? ((this.CurrentTalkItems = t.TalkItems),
							(this.IsExecuteFlowEnd = !1),
							this.PlayTalk(0),
							this.hDi(e))
						: this.HandleFlowEnd();
			}
		} else this.HandleFlowEnd();
	}
	PlayTalk(t) {
		if (((this.CurrentTalkId = t), t >= (i = this.CurrentTalkItems).length))
			this.HandleFlowEnd(),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Level",
						51,
						"[CharacterFlowLogic] 冒泡演出结束",
						["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
						["WaitTime", this.WaitSecondsRemain],
					);
		else {
			var e = this.DynamicFlowData
					? this.DynamicFlowData.Flow
					: this.CurrentFlowInfo?.Flow.FlowIndex,
				o = this.DynamicFlowData
					? this.DynamicFlowData.EntityIds
					: this.EntityList,
				i = i[t];
			let l = this.ActorComp.Entity;
			if (o && 2 <= o?.length) {
				var a =
					SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.GetFlowActorIndex(
						i.WhoId,
					);
				if (-1 === a)
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Level",
								51,
								"请配置演出目标",
								["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
								["FlowName", e?.FlowListName],
								["FlowId", e?.FlowId],
								["StateId", e?.StateId],
								["TalkId", t],
							),
						void this.PlayTalk(t + 1)
					);
				if (a >= o.length)
					return (
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Level",
								51,
								"演出目标索引越界",
								["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
								["FlowName", e?.FlowListName],
								["FlowId", e?.FlowId],
								["StateId", e?.StateId],
								["Index", a],
							),
						void this.PlayTalk(t + 1)
					);
				(e = o[a]), (l = this.GetEntity(e));
			}
			this.HandleTalkAction(l, i)
				? ((this.IsExecuteFlowEnd = !1),
					this.WaitSecondsRemain <= 0 &&
						(this.WaitSecondsRemain = this.GetWaitSeconds(i)),
					(o = this.ActorComp.CreatureData.GetPbDataId()),
					(a = this.GetFlowText(i.TidTalk)),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Level",
							51,
							"[CharacterFlowLogic] 播放对话框文本",
							["PbDataId", o],
							["DialogText", a],
							["WaitTime", this.WaitSecondsRemain],
						))
				: this.PlayTalk(t + 1);
		}
	}
	HandleTalkAction(t, e) {
		if (!t) return !1;
		let o = !1;
		return (
			(t = this.GetFlowText(e.TidTalk)) &&
				((o = !0),
				(e = this.GetWaitSeconds(e, 0.05)),
				this.HeadInfoComp.SetDialogueText(t, e)),
			o
		);
	}
	HandleFlowEnd() {
		if (((this.IsExecuteFlowEnd = !0), this.DynamicFlowData)) {
			this.WaitSecondsRemain = 10;
			var t = this.ActorComp.CreatureData.GetPbDataId();
			(t =
				DynamicFlowController_1.DynamicFlowController.GetDynamicFlowByMasterActor(
					t,
				).Callback) && t();
		} else if (this.CurrentFlowInfo) {
			let e = 10;
			(t = this.CurrentFlowInfo.Flow).WaitTime && (e = t.WaitTime),
				(this.WaitSecondsRemain = e);
		}
		this.ResetFlowState();
	}
	ResetFlowState() {
		(this.CurrentTalkItems = void 0),
			(this.CurrentTalkId = 0),
			(this.CurrentFlowInfo = void 0),
			(this.DynamicFlowData = void 0);
	}
	FindRandomFlow() {
		if (!this.FindDynamicFlow()) {
			(this.TempFlowInfoList.length = 0), (this.CurrentFlowInfo = void 0);
			for (const t of this.FlowInfoList)
				ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
					t.Condition,
					this.ActorComp.Owner,
				) && this.TempFlowInfoList.push(t);
			this.CurrentFlowInfo = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(
				this.TempFlowInfoList,
			);
		}
	}
	ResetWaitTime() {
		this.WaitSecondsRemain = 0;
	}
	HasValidFlow() {
		return !!this.FlowInfoList.length;
	}
	GetUiRootItemState() {
		return this.HeadInfoComp.GetRootItemState();
	}
	GetEntity(t) {
		return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)
			?.Entity;
	}
	GetWaitSeconds(t, e = 0) {
		let o = t.WaitTime;
		return (o && 0 !== o) || (o = 3), o + e;
	}
	GetFlowText(t) {
		if (t && !StringUtils_1.StringUtils.IsEmpty(t))
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
	}
	hDi(t) {
		var e = new LogReportDefine_1.PlayFlowLogData(),
			o =
				((e.i_bubble_type = this.DynamicFlowData ? 2 : 1),
				(e.s_flow_file = t.FlowListName),
				(e.i_flow_id = t.FlowId),
				(e.i_flow_status_id = t.StateId ?? 0),
				(e.i_config_id = this.K$o),
				(e.i_area_id =
					ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
				(e.i_father_area_id =
					ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.ActorLocationProxy);
		(e.f_pos_x = o.X),
			(e.f_pos_y = o.Y),
			(e.f_pos_z = o.Z),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Plot",
					43,
					"播放冒泡埋点",
					["EntityConfigId", this.K$o],
					["FlowListName", t.FlowListName],
					["FlowId", t.FlowId],
					["StateId", t.StateId],
					["IsDynamicMultiFlow", void 0 !== this.DynamicFlowData],
				),
			LogReportController_1.LogReportController.LogReport(e);
	}
	HasDynamicFlow() {
		return void 0 !== this.DynamicFlowData;
	}
	FindDynamicFlow() {
		var t = this.ActorComp.CreatureData.GetPbDataId();
		t =
			DynamicFlowController_1.DynamicFlowController.GetDynamicFlowByMasterActor(
				t,
			);
		return (this.DynamicFlowData = t?.BubbleData), !!t;
	}
	IsDynamicFlowActorsReady() {
		var t = this.DynamicFlowData?.EntityIds;
		if (!t) return !1;
		for (const e of t)
			if (
				!ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e)
					?.IsInit
			)
				return !1;
		return !0;
	}
}
exports.CharacterFlowLogic = CharacterFlowLogic;
