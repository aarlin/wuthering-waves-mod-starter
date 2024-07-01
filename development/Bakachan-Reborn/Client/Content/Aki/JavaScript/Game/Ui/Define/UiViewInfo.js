"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewInfo = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager");
class UiViewInfo {
	constructor(
		e,
		i,
		o,
		t,
		n,
		a,
		s,
		r,
		h,
		l,
		w,
		c,
		V,
		R,
		g,
		p,
		u,
		P,
		M,
		S,
		d,
		f,
		C,
		I = "",
	) {
		(this.Name = e),
			(this.Type = i),
			(this.Ctor = o),
			(this.Path = t),
			(this.PcPath = n),
			(this.BeObstructView = a),
			(this.AudioEvent = s),
			(this.OpenAudioEvent = r),
			(this.CloseAudioEvent = h),
			(this.TimeDilation = l),
			(this.ShowCursorType = w),
			(this.CanOpenViewByShortcutKey = c),
			(this.IsShortKeysExitView = V),
			(this.SourceType = R),
			(this.LoadAsync = g),
			(this.NeedGc = p),
			(this.IsFullScreen = u),
			(this.SortIndex = P),
			(this.CommonPopBg = M),
			(this.CommonPopBgKey = S),
			(this.ScenePathInternal = d),
			(this.IsPermanent = f),
			(this.SkipAnimActions = C),
			(this.ScenePointTag = I);
	}
	get UiPath() {
		return !ModelManager_1.ModelManager.PlatformModel?.IsMobile() && this.PcPath
			? this.PcPath
			: this.Path;
	}
	get ScenePath() {
		var e = UiViewInfo.icr.get(this.Name);
		return e
			? ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e).ScenePath
			: this.ScenePathInternal;
	}
}
(exports.UiViewInfo = UiViewInfo).icr = new Map([
	["RoleBreachView", "RoleRootView"],
	["RoleSkillView", "RoleRootView"],
	["RoleBreachSuccessView", "RoleRootView"],
	["RoleElementView", "RoleRootView"],
	["RoleAttributeDetailView", "RoleRootView"],
	["RoleLevelUpView", "RoleRootView"],
	["RoleFavorInfoView", "RoleRootView"],
	["RoleSelectionView", "RoleRootView"],
	["PhantomBattleFettersView", "RoleRootView"],
	["WeaponReplaceView", "WeaponRootView"],
	["WeaponBreachSuccessView", "WeaponRootView"],
	["WeaponResonanceSuccessView", "WeaponRootView"],
	["VisionRecoveryResultView", "CalabashRootView"],
	["GachaScanView", "DrawMainView"],
]);
