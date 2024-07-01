"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentMemoryMainViewOpenData =
		exports.FragmentMemoryTopicData =
		exports.FragmentMemoryCollectData =
			void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	LevelGeneralCommons_1 = require("../../LevelGamePlay/LevelGeneralCommons"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class FragmentMemoryCollectData {
	constructor() {
		(this.xe = 0), (this.ige = 0), (this.IUn = void 0), (this._be = 0);
	}
	GetId() {
		return this.xe;
	}
	GetFlag() {
		return this.ige;
	}
	GetIfCanGetReward() {
		return this.GetIfUnlock() && !this.GetIfGetReward();
	}
	GetIfUnlock() {
		return 1 == (1 & this.ige);
	}
	GetTopicData() {
		return this.IUn;
	}
	GetIfGetReward() {
		return 1 == ((this.ige >> 1) & 1);
	}
	GetTraceEntityId() {
		return this.GetConfig().TraceEntityId;
	}
	GetTraceMarkId() {
		return this.GetConfig().TraceMarkId;
	}
	GetFinishTime() {
		return this._be;
	}
	PhraseFromConfig(e) {
		this.xe = e.Id;
	}
	GetRank() {
		return this.GetConfig().Rank;
	}
	Phrase(e) {
		(this.xe = e.Ekn),
			(this.ige = e.Mkn),
			(this._be = Number(MathUtils_1.MathUtils.LongToBigInt(e.dUs)) / 1e3),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.FragmentRewardRedDot,
				this.xe,
			);
	}
	GetTimeText() {
		return 0 === this._be ? "" : TimeUtil_1.TimeUtil.DateFormatString(this._be);
	}
	BindSourceTopic(e) {
		this.IUn = e;
	}
	GetClueEntrance() {
		return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueEntrance(
			this.GetClueId(),
		);
	}
	GetClueContent() {
		return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueContent(
			this.GetClueEntrance().ContentGroupId,
		);
	}
	GetClueId() {
		return this.GetConfig().ClueId;
	}
	GetConfig() {
		return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectById(
			this.xe,
		);
	}
	GetTitle() {
		return this.GetConfig().Title;
	}
	GetTipsDesc() {
		return this.GetConfig().TipsDesc;
	}
	GetDesc() {
		return this.GetConfig().Desc;
	}
	GetDropId() {
		return this.GetConfig().DropId;
	}
	GetPreviewReward() {
		var e,
			t,
			n = [];
		for ([e, t] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
			this.GetDropId(),
		).DropPreview) {
			var r = [{ IncId: 0, ItemId: e }, t];
			n.push(r);
		}
		return n;
	}
	GetThemeBg() {
		return this.GetBgResource();
	}
	GetBgResource() {
		var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
		return 1 === e ? this.TUn() : 0 === e ? this.LUn() : "";
	}
	TUn() {
		return this.GetConfig().BgResourceM;
	}
	LUn() {
		return this.GetConfig().BgResourceF;
	}
}
exports.FragmentMemoryCollectData = FragmentMemoryCollectData;
class FragmentMemoryTopicData {
	constructor() {
		(this.xe = 0), (this.DUn = []), (this.AUn = !0);
	}
	GetId() {
		return this.xe;
	}
	Phrase(e) {
		(this.xe = e.Ekn), (this.DUn = []);
		for (const r of e.mUs) {
			var t = new FragmentMemoryCollectData(),
				n =
					(t.Phrase(r),
					ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectById(
						r.Ekn,
					));
			t.PhraseFromConfig(n), t.BindSourceTopic(this), this.DUn.push(t);
		}
		var r;
		for (const e of ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectConfigListByTopicId(
			this.xe,
		))
			this.DUn.find((t) => t.GetId() === e.Id) ||
				((r = new FragmentMemoryCollectData()).PhraseFromConfig(e),
				r.BindSourceTopic(this),
				this.DUn.push(r));
		this.DUn.sort((e, t) => e.GetRank() - t.GetRank()),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.FragmentRewardTopicRedDot,
				this.xe,
			);
	}
	GetRedDotState() {
		for (const e of this.DUn) if (e.GetIfCanGetReward()) return !0;
		return !1;
	}
	GetClueEntrance() {
		var e =
			ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
				this.xe,
			);
		return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueEntrance(
			e.ClueId,
		);
	}
	GetClueContent() {
		return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetClueContent(
			this.GetClueEntrance().ContentGroupId,
		);
	}
	GetCollectDataList() {
		return this.DUn;
	}
	GetMemoryCollectNum() {
		return this.DUn.length;
	}
	GetFinishCollectNum() {
		let e = 0;
		for (const t of this.DUn) t.GetIfUnlock() && e++;
		return e;
	}
	GetAllCollectState() {
		for (const e of this.DUn) if (!e.GetIfUnlock()) return !1;
		return !0;
	}
	GetUnlockState() {
		return this.AUn;
	}
	GetConfig() {
		return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
			this.xe,
		);
	}
	GetConditionDesc() {
		var e = this.GetConfig().ConditionGroupId;
		return (
			LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e) ??
			""
		);
	}
}
exports.FragmentMemoryTopicData = FragmentMemoryTopicData;
class FragmentMemoryMainViewOpenData {
	constructor() {
		(this.FragmentMemoryTopicData = void 0), (this.CurrentSelectId = 0);
	}
}
exports.FragmentMemoryMainViewOpenData = FragmentMemoryMainViewOpenData;
