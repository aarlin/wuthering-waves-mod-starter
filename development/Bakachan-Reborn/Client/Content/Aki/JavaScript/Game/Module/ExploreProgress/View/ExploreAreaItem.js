"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreAreaItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ExploreProgressDefine_1 = require("../ExploreProgressDefine");
class ExploreAreaItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.EVe = void 0),
			(this.yAt = void 0),
			(this.OnExtendToggleStateChanged = (e) => {
				this.EVe && this.EVe(this, this.Pe, 1 === e);
			}),
			(this.DTt = () => !this.yAt || this.yAt());
	}
	Initialize(e) {
		this.CreateByActorAsync(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[4, this.OnExtendToggleStateChanged]]);
	}
	OnStart() {
		this.GetExtendToggle(4).CanExecuteChange.Bind(this.DTt);
	}
	OnBeforeDestroy() {
		(this.EVe = void 0),
			(this.yAt = void 0),
			this.GetExtendToggle(4).CanExecuteChange.Unbind();
	}
	Refresh(e) {
		var t = (this.Pe = e).AreaId,
			i =
				ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
					ExploreProgressDefine_1.AREA_LEVEL,
				) === t,
			r = ModelManager_1.ModelManager.ExploreProgressModel.SelectedAreaId;
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.NameId),
			this.GetText(2).SetText(Math.floor(e.Progress).toString() + "%"),
			this.GetItem(3).SetUIActive(!1),
			this.GetSprite(0).SetUIActive(i),
			this.SetSelected(r === t, !0);
	}
	BindCanExecuteChange(e) {
		this.yAt = e;
	}
	SetSelected(e, t) {
		e
			? this.GetExtendToggle(4).SetToggleState(1, t)
			: this.GetExtendToggle(4).SetToggleState(0, t);
	}
	BindOnSelected(e) {
		this.EVe = e;
	}
}
exports.ExploreAreaItem = ExploreAreaItem;
