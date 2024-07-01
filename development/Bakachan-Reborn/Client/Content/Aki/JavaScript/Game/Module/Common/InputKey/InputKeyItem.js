"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputKeyItem = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	InputSettings_1 = require("../../../InputSettings/InputSettings"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	PcAndGamepadProgressBar_1 = require("../../UiNavigation/KeyComponent/PcAndGamepadProgressBar"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	InputKeyDefine_1 = require("./InputKeyDefine");
class InputKeyItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.HSe = void 0),
			(this.jRt = void 0),
			(this.g_t = void 0),
			(this.WRt = void 0),
			(this.KRt = !1),
			(this.QRt = !1),
			(this.XRt = !1),
			(this.$Rt = !1),
			(this.YRt = void 0),
			(this.ott = void 0),
			(this.JRt = 0),
			(this.vq = !1),
			(this.zRt = void 0),
			(this.ZRt = !1),
			(this.UniqueId = void 0),
			(this.eUt = (t, e) => {
				this.ZRt ||
					!this.g_t ||
					this.g_t <= 0 ||
					(this.HSe &&
						((e = e.KeyName.toString()), this.HSe === e) &&
						(t
							? this.WRt && 0 < this.WRt
								? (this.zRt = TimerSystem_1.TimerSystem.Delay(() => {
										this.tUt();
									}, this.WRt))
								: this.tUt()
							: this.iUt()));
			}),
			(this.oUt = () => {
				var t;
				!this.g_t ||
					this.g_t <= 0 ||
					((t = this.JRt / this.g_t),
					this.SetLongPressPercent(t),
					(this.JRt += TimerSystem_1.MIN_TIME));
			}),
			(this.UniqueId = t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UITexture],
		];
	}
	async OnBeforeStartAsync() {
		(this.YRt = new PcAndGamepadProgressBar_1.PcAndGamepadProgressBar()),
			await this.YRt.Init(this.GetItem(3), this.GetItem(2));
	}
	OnBeforeShow() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.OnInputAnyKey,
			this.eUt,
		) ||
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnInputAnyKey,
				this.eUt,
			);
	}
	OnAfterHide() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.OnInputAnyKey,
			this.eUt,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnInputAnyKey,
				this.eUt,
			);
	}
	OnBeforeDestroy() {
		(this.YRt = void 0), this.DeactivateLongPress();
	}
	tUt() {
		this.KRt && this.rUt(),
			this.SetLongPressProgressVisible(this.KRt),
			this.SetTextArrowVisible(this.XRt);
	}
	iUt() {
		this.DeactivateLongPress(),
			this.SetLongPressProgressVisible(this.QRt),
			this.SetTextArrowVisible(this.$Rt);
	}
	nUt() {
		this.zRt &&
			TimerSystem_1.TimerSystem.Has(this.zRt) &&
			TimerSystem_1.TimerSystem.Remove(this.zRt);
	}
	Refresh(t) {
		(this.HSe = t.KeyName),
			(this.ZRt = !0 === t.IsLongPressDisable),
			(this.g_t = t.LongPressTime),
			(this.WRt = t.DelayPressTime),
			(this.KRt = !0 === t.IsShowLongPressWhenPress),
			(this.QRt = !0 === t.IsShowLongPressWhenRelease),
			(this.XRt = !0 === t.IsShowTextArrowWhenPress),
			(this.$Rt = !0 === t.IsShowTextArrowWhenRelease);
		var e = !0 === t.IsLongPressProcessVisible,
			s = !0 === t.IsTextArrowVisible;
		t = t.DescriptionId;
		this.SetKeyTexture(this.HSe),
			this.SetTextArrowVisible(s),
			this.SetDescription(t),
			this.DeactivateLongPress(),
			e ? this.SetLongPressPercent(0) : this.SetLongPressProgressVisible(e);
	}
	SetLongPressDisable(t) {
		this.ZRt = t;
	}
	SetKeyTexture(t) {
		if (this.jRt !== t) {
			(this.jRt = t), (t = InputSettings_1.InputSettings.GetKeyIconPath(t));
			const e = this.GetTexture(0);
			t
				? this.SetTextureByPath(t, e, void 0, () => {
						e.SetSizeFromTexture(), e.SetUIActive(!0);
					})
				: e?.SetUIActive(!1);
		}
	}
	SetLongPressTime(t) {
		this.g_t = t;
	}
	SetLongPressPercent(t) {
		this.YRt?.SetProgressPercent(t);
	}
	SetLongPressProgressVisible(t) {
		this.YRt?.SetProgressVisible(t);
	}
	SetTextArrowVisible(t) {
		this.GetTexture(5)?.SetUIActive(t);
	}
	SetDescription(t) {
		var e = this.GetText(4);
		t
			? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, t), e?.SetUIActive(!0))
			: e?.SetUIActive(!1);
	}
	rUt() {
		(this.JRt = 0),
			(this.ott = TimerSystem_1.TimerSystem.Forever(
				this.oUt,
				TimerSystem_1.MIN_TIME,
			));
	}
	DeactivateLongPress() {
		this.ott &&
			TimerSystem_1.TimerSystem.Has(this.ott) &&
			(TimerSystem_1.TimerSystem.Remove(this.ott), (this.ott = void 0)),
			(this.JRt = 0),
			this.nUt();
	}
	SetEnable(t, e = !1) {
		(this.vq === t && !e) ||
			(t
				? this.RootItem.SetAlpha(1)
				: this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA),
			(this.vq = t));
	}
}
exports.InputKeyItem = InputKeyItem;
