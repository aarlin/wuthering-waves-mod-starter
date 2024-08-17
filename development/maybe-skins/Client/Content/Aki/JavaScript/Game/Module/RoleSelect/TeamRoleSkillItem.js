"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeamRoleSkillItem = exports.TeamRoleSkillData = void 0);
const UE = require("ue"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class TeamRoleSkillData {
	constructor() {
		(this.SkillIcon = ""),
			(this.SkillType = 0),
			(this.SkillName = ""),
			(this.SkillTagList = void 0),
			(this.SkillResume = ""),
			(this.SkillResumeNum = []),
			(this.MultiSkillDesc = ""),
			(this.MultiSkillDescNum = []);
	}
}
exports.TeamRoleSkillData = TeamRoleSkillData;
class TeamRoleSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments), (this.Pe = void 0), (this.Callback = void 0);
	}
	OnStart() {
		this.GetExtendToggle(1).OnStateChange.Add((e) => {
			this.Pe && this.Callback?.(e, this.Pe);
		});
	}
	OnBeforeDestroy() {
		this.GetExtendToggle(1).OnStateChange.Clear();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIExtendToggle],
		];
	}
	OnSelected(e) {
		this.GetExtendToggle(1).SetToggleStateForce(1, !1);
	}
	OnDeselected(e) {
		this.GetExtendToggle(1).SetToggleState(0, !1);
	}
	Refresh(e, t, l) {
		(this.Pe = e), this.SetSpriteByPath(e.SkillIcon, this.GetSprite(0), !1);
	}
	BindOnSkillStateChange(e) {
		this.Callback = e;
	}
}
exports.TeamRoleSkillItem = TeamRoleSkillItem;
