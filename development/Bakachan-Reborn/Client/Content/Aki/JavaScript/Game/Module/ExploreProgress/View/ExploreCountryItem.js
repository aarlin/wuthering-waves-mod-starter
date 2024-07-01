"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreCountryItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreCountryItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.EVe = void 0),
			(this.yAt = void 0),
			(this.OnExtendToggleStateChanged = (e) => {
				this.EVe && this.EVe(this, this.Pe, e);
			}),
			(this.DTt = () => !this.yAt || this.yAt());
	}
	Initialize(e) {
		this.CreateByActorAsync(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UISprite],
			[2, UE.UIItem],
			[3, UE.UIExtendToggle],
			[4, UE.UISprite],
		]),
			(this.BtnBindInfo = [[3, this.OnExtendToggleStateChanged]]);
	}
	OnStart() {
		this.GetExtendToggle(3).CanExecuteChange.Bind(this.DTt);
	}
	OnBeforeDestroy() {
		(this.EVe = void 0),
			(this.yAt = void 0),
			this.GetExtendToggle(3).CanExecuteChange.Unbind();
	}
	Refresh(e) {
		this.Pe = e;
		var t =
				ModelManager_1.ModelManager.AreaModel.GetAreaCountryId() ===
				e.CountryId,
			i = ModelManager_1.ModelManager.ExploreProgressModel.SelectedCountryId;
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.NameId),
			this.GetSprite(1).SetUIActive(e.IsLock),
			this.GetItem(2).SetUIActive(!1),
			this.GetSprite(4).SetUIActive(t),
			this.SetSelected(i === e.CountryId);
	}
	SetSelected(e) {
		e
			? this.GetExtendToggle(3).SetToggleState(1, !1)
			: this.GetExtendToggle(3).SetToggleState(0, !1);
	}
	BindCanExecuteChange(e) {
		this.GetExtendToggle(3).CanExecuteChange.Bind(e);
	}
	BindOnSelected(e) {
		this.EVe = e;
	}
}
exports.ExploreCountryItem = ExploreCountryItem;
