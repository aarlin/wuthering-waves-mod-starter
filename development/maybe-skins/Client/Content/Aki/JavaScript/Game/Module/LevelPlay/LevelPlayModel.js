"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelPlayModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
	IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	GeneralLogicTreeConfigUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeConfigUtil"),
	LevelPlay_1 = require("./LevelPlay"),
	LevelPlayDefine_1 = require("./LevelPlayDefine");
class LevelPlayModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Qfi = void 0),
			(this.Xfi = void 0),
			(this.$fi = 0),
			(this.Yfi = void 0),
			(this.Jfi = void 0),
			(this.IsInReceiveReward = !1),
			(this.zfi = (e) => {
				for (const i of JSON.parse(e).LevelPlays)
					this.Yfi.set(i.Id, i),
						i.Tree &&
							GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitBehaviorNodeConfig(
								this.Jfi,
								i.Id,
								i.Tree,
							);
			});
	}
	OnInit() {
		return (
			(this.Qfi = new Map()),
			(this.Xfi = new Map()),
			(this.Yfi = new Map()),
			(this.Jfi = new Map()),
			(this.$fi = LevelPlayDefine_1.INVALID_LEVELPLAYID),
			this.InitLevelPlayConfig(),
			PublicUtil_1.PublicUtil.RegisterEditorLocalConfig(),
			!0
		);
	}
	OnClear() {
		return (
			(this.Qfi = void 0),
			(this.Xfi = void 0),
			this.Yfi.clear(),
			(this.Yfi = void 0),
			this.Jfi.clear(),
			!(this.Jfi = void 0)
		);
	}
	OnLeaveLevel() {
		return !0;
	}
	InitLevelPlayConfig() {
		var e;
		PublicUtil_1.PublicUtil.UseDbConfig() ||
			(this.Yfi.clear(),
			this.Jfi.clear(),
			(e = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfig.LevelPlayListDir,
			)),
			GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitConfig(
				e,
				this.zfi,
			));
	}
	GetLevelPlayConfig(e) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) return this.Yfi.get(e);
		let i = this.Yfi.get(e);
		var t;
		return (
			i ||
				((t =
					ConfigManager_1.ConfigManager.LevelPlayConfig.GetLevelPlayConfig(e)),
				(i = JSON.parse(t.Data)),
				this.Yfi.set(e, i)),
			i
		);
	}
	GetLevelPlayNodeConfig(e, i) {
		if (!PublicUtil_1.PublicUtil.UseDbConfig()) return this.Jfi.get(e)?.get(i);
		let t = this.Jfi.get(e),
			l = (t = t || new Map()).get(i);
		return (
			l ||
				((e =
					ConfigManager_1.ConfigManager.LevelPlayConfig.GetLevelPlayNodeConfig(
						e,
						i,
					)),
				(l = JSON.parse(e.Data)),
				t.set(i, l)),
			l
		);
	}
	CreateLevelPlayInfo(e) {
		var i = new LevelPlay_1.LevelPlayInfo(e);
		return i.InitConfig(), this.Qfi.set(e, i), i;
	}
	EnterLevelPlayRange(e) {
		var i = this.SafeCreateLevelPlayInfo(e);
		return this.Xfi.set(e, i), i;
	}
	LeaveLevelPlayRange(e) {
		var i = this.GetProcessingLevelPlayInfo(e);
		i &&
			(i.RemoveBehaviorTree(),
			this.Xfi.delete(e),
			i.NeedShowInMap || this.Qfi.delete(e));
	}
	LevelPlayFinish(e) {
		var i = this.GetProcessingLevelPlayInfo(e);
		i &&
			(i.RemoveBehaviorTree(),
			i.UpdateState(3),
			this.Xfi.delete(e),
			this.$fi === e) &&
			(i.SetTrack(!1), (this.$fi = LevelPlayDefine_1.INVALID_LEVELPLAYID));
	}
	LevelPlayClose(e) {
		e && (e.UpdateState(0), e.RemoveBehaviorTree(), this.Xfi.delete(e.Id));
	}
	SetTrackLevelPlayId(e) {
		this.$fi !== e &&
			(this.GetProcessingLevelPlayInfo(this.$fi)?.SetTrack(!1),
			(this.$fi = e),
			this.GetProcessingLevelPlayInfo(this.$fi)?.SetTrack(!0));
	}
	ChangeLevelPlayTrackRange(e, i) {
		(e = this.GetProcessingLevelPlayInfo(e)) && e.ChangeLevelPlayTrackRange(i);
	}
	CheckLevelPlayState(e, i, t) {
		let l = !1;
		var a = this.GetLevelPlayInfo(e)?.PlayState;
		switch (i) {
			case ICondition_1.ELevelPlayState.Close:
				l = void 0 === a || 0 === a || 1 === a;
				break;
			case ICondition_1.ELevelPlayState.Running:
				l = 2 === a;
				break;
			case ICondition_1.ELevelPlayState.Complete:
				l = 3 === a;
		}
		return "Eq" === t ? l : !l;
	}
	SafeCreateLevelPlayInfo(e) {
		let i = this.GetLevelPlayInfo(e);
		return i || this.CreateLevelPlayInfo(e);
	}
	GetLevelPlayInfo(e) {
		return this.Qfi.get(e);
	}
	GetProcessingLevelPlayInfo(e) {
		return this.Xfi.get(e);
	}
	GetProcessingLevelPlayInfos() {
		return this.Xfi;
	}
	GetTrackLevelPlayInfo() {
		if (this.$fi !== LevelPlayDefine_1.INVALID_LEVELPLAYID)
			return this.GetProcessingLevelPlayInfo(this.$fi);
	}
	GetTrackLevelPlayId() {
		return this.$fi;
	}
	GetLevelPlayInfoByRewardEntityId(e) {
		for (var [, i] of this.Qfi) if (i.RewardEntityId === e) return i;
	}
}
exports.LevelPlayModel = LevelPlayModel;
