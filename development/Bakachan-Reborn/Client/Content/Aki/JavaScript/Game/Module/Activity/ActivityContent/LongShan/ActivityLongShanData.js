"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityLongShanData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	LongShanStageAll_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageAll"),
	LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityData_1 = require("../../ActivityData"),
	LongShanStageInfo_1 = require("./LongShanStageInfo");
class ActivityLongShanData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments), (this.StageIds = void 0), (this.ROe = void 0);
	}
	PhraseEx(e) {
		this.ROe?.clear(), (this.ROe = this.ROe ?? new Map()), (this.StageIds = []);
		for (const n of LongShanStageAll_1.configLongShanStageAll.GetConfigList(
			this.Id,
		)) {
			this.StageIds.push(n.Id);
			var t = e.y0s?.W0s?.find((e) => e.Ekn === n.Id);
			t
				? ((t = new LongShanStageInfo_1.LongShanStageInfo(t)),
					this.ROe.set(n.Id, t))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Activity", 44, "龙山活动服务器数据与配表不符", [
						"id",
						n.Id,
					]);
		}
	}
	UpdateStage(e) {
		for (const o of e) {
			var t = o.Ekn,
				n = this.ROe.get(t),
				a = new LongShanStageInfo_1.LongShanStageInfo(o);
			this.ROe.set(o.Ekn, a), n && this.OnStageInfoChange(t, n, a);
		}
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LongShanUpdate),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.Id,
			);
	}
	OnStageInfoChange(e, t, n) {
		for (var [a, o] of t.TaskInfoMap) {
			var i = n.TaskInfoMap.get(a);
			i && this.OnStageTaskInfoChange(a, o, i);
		}
	}
	OnStageTaskInfoChange(e, t, n) {
		!t.$0s &&
			n.$0s &&
			0 < (t = LongShanTaskById_1.configLongShanTaskById.GetConfig(e).JumpId) &&
			8 ===
				(n =
					ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
						t,
					)).SkipName &&
			((e = Number(n.Val1)),
			ModelManager_1.ModelManager.MapModel?.RemoveMapMarksByConfigId(7, e));
	}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	GetStageIndex(e) {
		return this.StageIds.indexOf(e);
	}
	GetStageInfoById(e) {
		return this.ROe?.get(e)?.ProtoStageInfo;
	}
	GetProgress(e) {
		var t;
		return (e = this.GetStageInfoById(e))
			? ((t = e.V0s.filter((e) => e.H0s).length),
				Math.ceil((t / e.V0s.length) * 100))
			: 0;
	}
	CheckStageRed(e) {
		return (
			!!(e = this.GetStageInfoById(e)) &&
			0 <= e.V0s.findIndex((e) => e.$0s && !e.H0s)
		);
	}
	CheckAnyStageRed() {
		if (this.StageIds)
			for (const e of this.StageIds) if (this.CheckStageRed(e)) return !0;
		return !1;
	}
	GetExDataRedPointShowState() {
		return this.CheckAnyStageRed();
	}
}
exports.ActivityLongShanData = ActivityLongShanData;
