"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ResolutionToggle = exports.ResolutionListView = void 0);
const GameQualitySettingsManager_1 = require("../../../GameQualitySettings/GameQualitySettingsManager"),
	MenuController_1 = require("../MenuController"),
	LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class ResolutionListView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
	constructor() {
		super(...arguments),
			(this.DoRefreshScrollView = (e, t) => {
				var i = MenuController_1.MenuController.GetTargetConfig(6) === e;
				(t = this.CreateToggle(t, e, i)) &&
					(i ? (this.SelectedToggle = t) : t.UnSelect(),
					t.SetSelectedCallBack(this.DoSelected),
					this.OnRefreshView(t));
			});
	}
	CreateToggle(e, t, i) {
		var n = new ResolutionToggle();
		return n.Initialize(e, t, i), n;
	}
	OnRefreshView(e) {
		var t =
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionList()[
				e.GetIndex()
			];
		e.SetMainRawText(t.X + "x" + t.Y);
	}
	OnSelected(e, t) {}
	InitScrollViewData() {
		this.ScrollView.RefreshByData(
			MenuController_1.MenuController.GetResolutionList(
				this.MenuDataIns.MenuDataOptionsNameList,
			),
		);
	}
}
exports.ResolutionListView = ResolutionListView;
class ResolutionToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
	OnRegisterComponent() {
		super.OnRegisterComponent();
	}
	SetMainRawText(e) {
		this.MainText.SetText(e);
	}
	OnStart() {
		super.OnStart(), this.GetText(2).SetUIActive(!1);
	}
}
exports.ResolutionToggle = ResolutionToggle;
