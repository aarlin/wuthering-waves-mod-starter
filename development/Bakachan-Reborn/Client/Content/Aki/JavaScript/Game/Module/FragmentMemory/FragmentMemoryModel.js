"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentMemoryModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	FragmentMemoryData_1 = require("./FragmentMemoryData");
class FragmentMemoryModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.ActivitySubViewTryPlayAnimation = ""),
			(this.MemoryFragmentMainViewTryPlayAnimation = ""),
			(this.UUn = new Map()),
			(this.CurrentTrackMapMarkId = 0),
			(this.CurrentTrackFragmentId = 0),
			(this.RUn = new Map()),
			(this.CurrentUnlockCollectId = 0);
	}
	OnPhotoMemoryResponse(e) {
		this.xUn(e.CUs);
	}
	OnPhotoMemoryUpdate(e) {
		this.xUn(e.CUs),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnFragmentMemoryDataUpdate,
			);
	}
	TryRemoveCurrentTrackEntity() {
		0 !== this.CurrentTrackMapMarkId &&
			(ModelManager_1.ModelManager.MapModel.RemoveMapMark(
				7,
				this.CurrentTrackMapMarkId,
			),
			(this.CurrentTrackMapMarkId = 0));
	}
	xUn(e) {
		this.RUn.clear(), this.UUn.clear();
		for (const r of e) {
			var t = this.PUn(r);
			t = (this.RUn.set(r.Ekn, t), t.GetCollectDataList());
			for (const e of t) this.UUn.set(e.GetId(), e);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.FragmentRewardEntranceRedDot,
		);
	}
	GetCollectedIds() {
		var e,
			t = [];
		for ([, e] of this.RUn)
			for (const r of e.GetCollectDataList())
				r.GetIfUnlock() && t.push(r.GetId());
		return t;
	}
	GetAllFragmentTopic() {
		return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetAllPhotoMemoryTopic();
	}
	GetTopicUnlockState(e) {
		return void 0 !== this.GetTopicDataById(e);
	}
	GetUnlockConditionText(e) {
		return (
			(e =
				ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
					e,
				).ConditionGroupId),
			LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e) ??
				""
		);
	}
	OnPhotoMemoryCollectUpdate(e) {
		var t = e.gUs.Ekn;
		let r = this.UUn.get(t);
		r ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("FragmentMemory", 28, "记忆历程数据刷新时找不到数据", [
					"id",
					t,
				]),
			(r = new FragmentMemoryData_1.FragmentMemoryCollectData())),
			r.Phrase(e.gUs),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate,
			);
	}
	PUn(e) {
		var t = new FragmentMemoryData_1.FragmentMemoryTopicData();
		return t.Phrase(e), t;
	}
	GetCollectDataById(e) {
		if ((e = this.UUn.get(e))) return e;
	}
	GetTopicDataById(e) {
		if ((e = this.RUn.get(e))) return e;
	}
	GetRedDotState() {
		for (var [, e] of this.RUn) if (e.GetRedDotState()) return !0;
		return !1;
	}
}
exports.FragmentMemoryModel = FragmentMemoryModel;
