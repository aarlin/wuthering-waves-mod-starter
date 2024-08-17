"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputMultiKeyItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData"),
	InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	InputKeyDefine_1 = require("./InputKeyDefine"),
	InputKeyItem_1 = require("./InputKeyItem");
class InputMultiKeyItem extends UiPanelBase_1.UiPanelBase {
	constructor(e = !0, t = !0, s) {
		super(),
			(this.sUt = void 0),
			(this.aUt = void 0),
			(this.hUt = void 0),
			(this.lUt = void 0),
			(this.vq = !1),
			(this._Ut = !0),
			(this.uUt = !0),
			(this.RIt = void 0),
			(this.dKe = (e, t, s, i) => {
				e !== i && this.lUt && this.cUt(this.lUt);
			}),
			(this.c_t = (e) => {
				this.lUt && this.lUt.ActionOrAxisName === e && this.cUt(this.lUt);
			}),
			(this.m_t = (e) => {
				this.lUt && this.lUt.ActionOrAxisName === e && this.cUt(this.lUt);
			}),
			(this._Ut = e),
			(this.uUt = t),
			(this.RIt = s);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.sUt = new InputKeyItem_1.InputKeyItem(
			void 0 !== this.RIt ? this.RIt + "_1" : void 0,
		)),
			(this.aUt = new InputKeyItem_1.InputKeyItem(
				void 0 !== this.RIt ? this.RIt + "_2" : void 0,
			)),
			await Promise.all([
				this.sUt.CreateByActorAsync(this.GetItem(1).GetOwner(), !0),
				this.aUt.CreateByActorAsync(this.GetItem(2).GetOwner(), !0),
			]);
	}
	OnStart() {
		this.hUt = new InputKeyDisplayData_1.InputKeyDisplayData();
	}
	OnBeforeDestroy() {
		this.hUt?.Reset(), (this.sUt = void 0), (this.aUt = void 0);
	}
	OnBeforeShow() {
		this._Ut &&
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			this.uUt &&
				(EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnActionKeyChanged,
					this.c_t,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnAxisKeyChanged,
					this.m_t,
				)),
			this.lUt && this.cUt(this.lUt);
	}
	OnAfterHide() {
		this._Ut &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			this.uUt &&
				(EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnActionKeyChanged,
					this.c_t,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnAxisKeyChanged,
					this.m_t,
				));
	}
	RefreshByKeyList(e, t) {
		this.mUt(e, t), (this.lUt = void 0);
	}
	mUt(e, t, s) {
		e && (this.sUt?.Refresh(e), this.sUt?.SetActive(!0)),
			(e = this.GetText(0)),
			t
				? (this.aUt?.Refresh(t),
					this.aUt?.SetActive(!0),
					e.SetText(s ?? "+"),
					e.SetUIActive(!0))
				: (e.SetUIActive(!1), this.aUt?.SetActive(!1));
	}
	RefreshByKey(e) {
		this.dUt(e), (this.lUt = void 0);
	}
	dUt(e) {
		this.sUt?.Refresh(e),
			this.GetText(0)?.SetUIActive(!1),
			this.aUt?.SetActive(!1);
	}
	RefreshByActionOrAxis(e) {
		(this.lUt = e), this.cUt(e);
	}
	cUt(e) {
		if (this.hUt) {
			var t,
				s = e.ActionOrAxisName;
			this.hUt.Reset();
			let i =
				InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
					this.hUt,
					s,
				);
			(i =
				i ||
				InputSettingsManager_1.InputSettingsManager.GetAxisKeyDisplayData(
					this.hUt,
					s,
				)) &&
				((s = e.Index ?? 0),
				!(s = this.hUt.GetDisplayKeyNameList(s)) ||
					s.length <= 0 ||
					(1 === s.length &&
						((t = {
							KeyName: s[0],
							IsLongPressDisable: e.IsLongPressDisable,
							LongPressTime: e.LongPressTime,
							DelayPressTime: e.DelayPressTime,
							IsLongPressProcessVisible: e.IsLongPressProcessVisible,
							IsShowLongPressWhenPress: e.IsShowLongPressWhenPress,
							IsShowLongPressWhenRelease: e.IsShowLongPressWhenRelease,
							IsTextArrowVisible: e.IsTextArrowVisible,
							IsShowTextArrowWhenPress: e.IsShowTextArrowWhenPress,
							IsShowTextArrowWhenRelease: e.IsShowTextArrowWhenRelease,
							DescriptionId: e.DescriptionId,
						}),
						this.mUt(t)),
					2 === s.length &&
						((t = { KeyName: s[0] }),
						(s = {
							KeyName: s[1],
							LongPressTime: e.LongPressTime,
							IsLongPressProcessVisible: e.IsLongPressProcessVisible,
							IsShowLongPressWhenPress: e.IsShowLongPressWhenPress,
							IsShowLongPressWhenRelease: e.IsShowLongPressWhenRelease,
							IsTextArrowVisible: e.IsTextArrowVisible,
							IsShowTextArrowWhenPress: e.IsShowTextArrowWhenPress,
							IsShowTextArrowWhenRelease: e.IsShowTextArrowWhenRelease,
							DescriptionId: e.DescriptionId,
						}),
						this.mUt(t, s, e.LinkString))));
		}
	}
	SetEnable(e, t = !1) {
		(this.vq === e && !t) ||
			(e
				? this.RootItem.SetAlpha(1)
				: this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA),
			(this.vq = e));
	}
	SetLongPressDisable(e) {
		this.lUt && (this.lUt.IsLongPressDisable = e),
			this.sUt?.SetLongPressDisable(e),
			this.aUt?.SetLongPressDisable(e);
	}
	SetLongPressTime(e) {
		this.sUt?.SetLongPressTime(e),
			this.aUt?.SetLongPressTime(e),
			this.lUt && (this.lUt.LongPressTime = e);
	}
	Reset() {
		this.sUt?.DeactivateLongPress(), this.aUt?.DeactivateLongPress();
	}
}
exports.InputMultiKeyItem = InputMultiKeyItem;
