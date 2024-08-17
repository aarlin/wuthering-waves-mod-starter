"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFetterVisionDesc = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class RoleFetterVisionDesc extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.wdo = void 0), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
		];
	}
	Refresh(e) {
		this.wdo.SetActive(0 < e.length), this.wdo.Update(e);
	}
	OnBeforeDestroy() {
		this.wdo.Destroy();
	}
}
exports.RoleFetterVisionDesc = RoleFetterVisionDesc;
class RoleVisionDescScroller extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.F7e = void 0),
			(this.JVi = (e, t, i) => (
				(t = new RoleVisionFetterDescScrollerItem(t)).Update(e),
				{ Key: i, Value: t }
			)),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.F7e = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(0),
			this.JVi,
		);
	}
	Update(e) {
		this.F7e.RefreshByData(e);
	}
	OnBeforeDestroy() {
		this.F7e.ClearChildren();
	}
}
class RoleVisionFetterDescScrollerItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	Update(e) {
		this.GetText(0).ShowTextNew(e.Name),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(1),
				e.EffectDescription,
				...e.EffectDescriptionParam,
			);
	}
}
