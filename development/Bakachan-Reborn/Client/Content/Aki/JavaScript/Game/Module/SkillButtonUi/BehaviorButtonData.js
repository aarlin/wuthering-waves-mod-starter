"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BehaviorButtonData = void 0);
const InputEnums_1 = require("../../Input/InputEnums"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	visibleTagMap = new Map([[101, 852227396]]),
	hiddenTagMap = new Map([
		[101, [-1987419794, 855966206, 504239013]],
		[102, [729920684]],
	]);
class BehaviorButtonData {
	constructor() {
		(this.ButtonType = 0),
			(this.ActionName = ""),
			(this.InputAction = InputEnums_1.EInputAction.None),
			(this.IsEnable = !1),
			(this.IsVisible = !1),
			(this.State = 0),
			(this.SkillIconPathList = void 0),
			(this.VisibleTagId = 0),
			(this.HiddenTagIds = []);
	}
	static Init() {}
	Refresh(i, t, s, e) {
		(this.ButtonType = i),
			(this.ActionName = InputEnums_1.EInputAction[t]),
			(this.InputAction = t),
			(this.IsEnable = !0),
			(this.IsVisible = !0),
			(this.State = 0),
			(this.HiddenTagIds = hiddenTagMap.get(i)),
			(this.VisibleTagId = visibleTagMap.get(i) ?? 0),
			(this.SkillIconPathList =
				ModelManager_1.ModelManager.SkillButtonUiModel.BehaviorIconPathMap.get(
					i,
				)),
			s && this.RefreshIsVisible(s, e);
	}
	RefreshIsVisible(i, t) {
		if (0 < this.VisibleTagId && this.gSo(i, this.VisibleTagId))
			this.IsVisible = !0;
		else if (101 !== this.ButtonType || t?.IsAim) {
			for (const t of this.HiddenTagIds)
				if (this.gSo(i, t)) return void (this.IsVisible = !1);
			this.IsVisible = !0;
		} else this.IsVisible = !1;
	}
	gSo(i, t) {
		return !!i && i.HasTag(t);
	}
}
exports.BehaviorButtonData = BehaviorButtonData;
