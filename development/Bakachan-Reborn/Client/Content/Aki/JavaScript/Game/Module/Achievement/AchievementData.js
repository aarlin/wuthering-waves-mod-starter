"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementSearchGroupData =
		exports.AchievementSearchData =
		exports.AchievementGroupData =
		exports.AchievementCategoryData =
		exports.AchievementData =
			void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class AchievementData {
	constructor(e) {
		(this._be = void 0),
			(this.ube = -1),
			(this.cbe = new Array()),
			(this.mbe = !1),
			(this.dbe = void 0),
			(this.Cbe = void 0),
			(this.xe = e),
			(this.gbe =
				ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementNextLink(
					this.xe,
				));
	}
	SetLastLink(e) {
		this.ube = e;
	}
	Phrase(e) {
		(this._be = e.Bms),
			(this.mbe = e.qms),
			(this.dbe = e.Gms.xms),
			(this.Cbe = e.Gms.bms);
	}
	GetId() {
		return this.xe;
	}
	RedPoint() {
		return !(!this.GetShowState() || 1 !== this.GetFinishState());
	}
	GetIconPath() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementIcon(
			this.xe,
		);
	}
	IfSingleAchievement() {
		return -1 === this.gbe;
	}
	GetShowState() {
		return (
			!(
				(this.GetHiddenState() && 0 === this.GetFinishState()) ||
				void 0 === this.Cbe
			) &&
			(-1 === this.ube ||
				2 ===
					ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
						this.ube,
					).GetFinishState()) &&
			(2 !== this.GetFinishState() || !(0 < this.gbe))
		);
	}
	GetHiddenState() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementHiddenState(
			this.xe,
		);
	}
	GetReplaceDesc(e) {
		let t = this.GetDesc();
		var i = new StringBuilder_1.StringBuilder(),
			n = CommonParamById_1.configCommonParamById.GetStringConfig(
				"TutorialSearchColor",
			);
		i.Append("<color="),
			i.Append(n?.toLowerCase() + ">"),
			i.Append(e),
			i.Append("</color>"),
			(n = "" + e);
		return t.replace(n, i.ToString());
	}
	GetReplaceTitle(e) {
		let t = this.GetTitle();
		var i = new StringBuilder_1.StringBuilder(),
			n = CommonParamById_1.configCommonParamById.GetStringConfig(
				"TutorialSearchColor",
			);
		i.Append("<color="),
			i.Append(n?.toLowerCase() + ">"),
			i.Append(e),
			i.Append("</color>"),
			(n = "" + e);
		return t.replace(n, i.ToString());
	}
	GetDesc() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementDesc(
			this.xe,
		);
	}
	GetTitle() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementTitle(
			this.xe,
		);
	}
	GetMaxStar() {
		if (this.IfSingleAchievement()) {
			return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
				this.xe,
			);
		}
		let e = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
			this.xe,
		);
		for (; e?.gbe; )
			e = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
				e?.gbe,
			);
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
			e.GetId(),
		);
	}
	GetFinishedStar() {
		var e, t;
		return this.GetShowState()
			? ((e =
					ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
						this.xe,
					)),
				this.IfSingleAchievement()
					? 2 === this.GetFinishState() || 1 === this.GetFinishState()
						? e
						: 0
					: ((t = this.fbe()),
						2 === this.GetFinishState() || 1 === this.GetFinishState()
							? e + t
							: 0 === this.GetFinishState()
								? t
								: (0 <= e - 1 ? e - 1 : 0) + t))
			: 0;
	}
	fbe() {
		let e = 0,
			t = this.ube;
		for (; -1 !== t; ) {
			var i =
				ModelManager_1.ModelManager.AchievementModel.GetAchievementData(t);
			(e +=
				ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(t)),
				(t = i.ube);
		}
		return e;
	}
	GetAchievementShowStar() {
		var e;
		return this.GetShowState()
			? ((e =
					ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
						this.xe,
					)),
				this.IfSingleAchievement() ||
				2 === this.GetFinishState() ||
				1 === this.GetFinishState()
					? e
					: 0 <= e - 1
						? e - 1
						: 0)
			: 0;
	}
	GetAchievementConfigStar() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
			this.GetId(),
		);
	}
	GetCurrentProgress() {
		return this.dbe;
	}
	GetMaxProgress() {
		return this.Cbe;
	}
	GetRewards() {
		if (0 === this.cbe.length) {
			this.cbe = new Array();
			var e =
				ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementReward(
					this.xe,
				);
			if (e)
				for (var [t, i] of e)
					(t = [{ IncId: 0, ItemId: t }, i]), this.cbe.push(t);
		}
		return this.cbe;
	}
	GetAllFinishState() {
		return (0 === this.gbe || -1 === this.gbe) && 1 === this.GetFinishState();
	}
	GetNextLink() {
		return this.gbe;
	}
	GetIfLastAchievement() {
		return !!this.IfSingleAchievement() || 0 === this.gbe;
	}
	CanShowStarState() {
		return 2 === this.GetFinishState() || 1 === this.GetFinishState();
	}
	GetFinishState() {
		return this.mbe ? 2 : 0 < this._be ? 1 : 0;
	}
	GetFinishSort() {
		return 2 === this.GetFinishState()
			? 0
			: 1 === this.GetFinishState()
				? 2
				: 1;
	}
	GetFinishTime() {
		return this._be;
	}
	GetGroupId() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroup(
			this.xe,
		);
	}
}
exports.AchievementData = AchievementData;
class AchievementCategoryData {
	constructor(e) {
		this.xe = e;
	}
	GetId() {
		return this.xe;
	}
	GetFunctionType() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
			this.xe,
		);
	}
	GetOrignalTitle() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryOriginalTitle(
			this.xe,
		);
	}
	GetTitle() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryTitle(
			this.xe,
		);
	}
	GetTexture() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryTexture(
			this.xe,
		);
	}
	GetSprite() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetCategorySprite(
			this.xe,
		);
	}
	GetAchievementCategoryProgress() {
		let e = 0,
			t = 0;
		for (const n of ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(
			this.xe,
		))
			for (const r of ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
				n.GetId(),
				!1,
			)) {
				var i = r.GetFinishState();
				(r.GetHiddenState() && 0 === i) ||
					void 0 === r.GetMaxProgress() ||
					(e++, 0 !== i && t++);
			}
		return Math.round((100 * t) / e) + "%";
	}
}
exports.AchievementCategoryData = AchievementCategoryData;
class AchievementGroupData {
	constructor(e) {
		(this.mbe = !1),
			(this._be = 0),
			(this.cbe = new Array()),
			(this.pbe = !1),
			(this.vbe = !1),
			(this.xe = e);
	}
	Phrase(e) {
		(this.mbe = e.qms), (this._be = e.Bms), (this.vbe = !0);
	}
	GetId() {
		return this.xe;
	}
	GetSort() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupSort(
			this.xe,
		);
	}
	GetTitle() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupTitle(
			this.xe,
		);
	}
	GetTexture() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupIcon(
			this.xe,
		);
	}
	GetSmallIcon() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupSmallIcon(
			this.xe,
		);
	}
	GetBackgroundIcon() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupBackgroundIcon(
			this.xe,
		);
	}
	GetCategory() {
		return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupCategory(
			this.xe,
		);
	}
	GetFinishTime() {
		return this._be;
	}
	GetShowState() {
		return !(
			!ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupEnable(
				this.xe,
			) || !this.vbe
		);
	}
	GetRewards() {
		if (0 === this.cbe.length && !this.pbe) {
			this.cbe = new Array();
			var e =
				ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupReward(
					this.xe,
				);
			if (e)
				for (var [t, i] of e)
					(t = [{ IncId: 0, ItemId: t }, i]), this.cbe.push(t);
			this.pbe = !0;
		}
		return this.cbe;
	}
	SmallItemRedPoint() {
		if (this.GetShowState()) {
			if (this.RedPoint()) return !0;
			var e = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
				this.GetId(),
			);
			for (let t = 0; t < e.length; t++) if (e[t].RedPoint()) return !0;
		}
		return !1;
	}
	RedPoint() {
		return (
			!!this.GetShowState() &&
			0 < this.GetRewards().length &&
			1 === this.GetFinishState()
		);
	}
	GetCurrentProgress() {
		var e = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
			this.xe,
		);
		let t = 0;
		return (
			e.forEach((e) => {
				0 !== e.GetFinishState() && t++;
			}),
			t
		);
	}
	GetMaxProgress() {
		var e = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
			this.xe,
		);
		let t = 0;
		return (
			e.forEach((e) => {
				e.GetShowState() && t++;
			}),
			t
		);
	}
	GetFinishState() {
		return this.mbe ? 2 : 0 < this._be ? 1 : 0;
	}
	GetAchievementGroupProgress() {
		let e = 0,
			t = 0;
		for (const n of ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
			this.xe,
			!1,
		)) {
			var i = n.GetFinishState();
			(n.GetHiddenState() && 0 === i) ||
				void 0 === n.GetMaxProgress() ||
				(e++, 0 !== i && t++);
		}
		return Math.round((100 * t) / e) + "%";
	}
}
exports.AchievementGroupData = AchievementGroupData;
class AchievementSearchData {
	constructor() {
		(this.AchievementCategoryData = void 0),
			(this.AchievementSearchGroupData = void 0),
			(this.AchievementData = void 0);
	}
}
exports.AchievementSearchData = AchievementSearchData;
class AchievementSearchGroupData {
	constructor() {
		(this.AchievementGroupData = void 0), (this.AchievementDataLength = 0);
	}
}
exports.AchievementSearchGroupData = AchievementSearchGroupData;
