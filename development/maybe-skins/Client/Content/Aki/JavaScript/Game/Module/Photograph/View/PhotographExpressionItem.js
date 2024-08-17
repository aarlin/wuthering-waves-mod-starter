"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotographExpressionItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LOCK_ALPHA = 0.3,
	UNLOCK_ALPHA = 1;
class PhotographExpressionItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.LWi = 0),
			(this.fAi = void 0),
			(this.DWi = void 0),
			(this.RWi = void 0),
			(this.DTt = () => {
				var e = this.UWi();
				return e && this.DWi ? this.DWi(this) : e;
			}),
			(this.x$e = (e) => {
				this.UWi() && this.fAi && this.fAi(this, 1 === e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.x$e]]);
	}
	OnStart() {
		this.GetExtendToggle(0).CanExecuteChange.Bind(this.DTt);
	}
	OnBeforeDestroy() {
		this.GetExtendToggle(0).CanExecuteChange.Unbind();
	}
	Refresh(e) {
		var t, i;
		0 !== (this.LWi = e) &&
			((this.RWi =
				ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfig(
					e,
				)),
			this.RWi) &&
			((e = this.RWi.Name),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e),
			(e = this.UWi()),
			(t = this.GetExtendToggle(0)),
			e
				? (t.RootUIComp.SetAlpha(1),
					(i = this.RWi.IconType),
					(i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_PhotoMotionIcon" + i,
					)),
					this.SetSpriteByPath(i, this.GetSprite(1), !1))
				: (t.RootUIComp.SetAlpha(0.3),
					(i = this.RWi.ConditionTipsId),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i)),
			this.GetText(3).SetUIActive(!e),
			this.GetSprite(1).SetUIActive(e),
			this.GetItem(4).SetUIActive(!e));
	}
	UWi() {
		var e;
		return (
			0 === this.LWi ||
			0 === (e = this.RWi.UnLockConditionGroup) ||
			ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
				e.toString(),
				void 0,
				!0,
			)
		);
	}
	BindOnSelected(e) {
		this.fAi = e;
	}
	BindOnCanExecuteChange(e) {
		this.DWi = e;
	}
	SetSelected(e, t = !1) {
		var i = this.GetExtendToggle(0);
		e ? i.SetToggleStateForce(1, t) : i.SetToggleStateForce(0, t);
	}
	GetPhotoMontageId() {
		return this.LWi;
	}
	GetPhotoMontageConfig() {
		return this.RWi;
	}
}
exports.PhotographExpressionItem = PhotographExpressionItem;
