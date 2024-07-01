"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeyBaseComponent = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	InputSettings_1 = require("../../../InputSettings/InputSettings"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
	PcAndGamepadProgressBar_1 = require("./PcAndGamepadProgressBar");
class KeyBaseComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.mxo = !1),
			(this.dxo = void 0),
			(this.Cxo = void 0),
			(this.HSe = ""),
			(this.gxo = !1),
			(this.ySo = "");
	}
	async OnBeforeStartAsync() {
		this.gxo &&
			((this.Cxo = new PcAndGamepadProgressBar_1.PcAndGamepadProgressBar()),
			await this.Cxo.Init(this.GetSquareItem(), this.GetCircleItem())),
			this.HSe && (await this.fxo(this.HSe)),
			this.p_t(this.gxo);
	}
	SetKeyName(e) {
		this.HSe = e;
	}
	SetIsNeedLongPress(e) {
		this.gxo = e;
	}
	RefreshKeyIcon(e) {
		this.SetKeyName(e), this.pxo(e);
	}
	RefreshNameText(e) {
		!StringUtils_1.StringUtils.IsEmpty(e) &&
		e !== HotKeyViewDefine_1.SPECIAL_TEXT &&
		(e = ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyText(e))
			? (this.SetNameTextById(e), this.SetNameTextVisible(!0))
			: this.SetNameTextVisible(!1);
	}
	pxo(e) {
		this.fxo(e);
	}
	async fxo(e) {
		const t = this.GetKeyTexture();
		if (
			t &&
			!StringUtils_1.StringUtils.IsEmpty(e) &&
			(e = InputSettings_1.InputSettings.GetKey(e)) &&
			((e = e.GetKeyIconPath()),
			!StringUtils_1.StringUtils.IsEmpty(e) && e !== this.ySo)
		) {
			this.ySo = e;
			const i = new CustomPromise_1.CustomPromise();
			this.vxo(!1),
				this.SetTextureByPath(e, t, void 0, () => {
					t.SetSizeFromTexture(), i.SetResult();
				}),
				await i.Promise,
				this.vxo(!0);
		}
	}
	vxo(e) {
		var t = this.GetKeyTexture();
		t && t.SetUIActive(e);
	}
	SetNameTextById(e) {
		var t;
		this.mxo ||
			((t = this.GetNameText()) && LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
	}
	SetNameText(e) {
		var t = this.GetNameText();
		t && t.SetText(e);
	}
	SetNameTextForce(e) {
		this.mxo = e;
	}
	GetIsForceSetText() {
		return this.mxo;
	}
	SetNameTextVisible(e) {
		var t = this.GetNameText();
		t && t.SetUIActive(e);
	}
	p_t(e) {
		var t = this.GetLongPressItem();
		t && t.bIsUIActive !== e && t.SetUIActive(e);
	}
	SetLongPressState(e) {
		this.v_t(e), this.Mxo(0 === e);
	}
	v_t(e) {
		this.Cxo && this.Cxo.SetProgressPercent(e);
	}
	Mxo(e) {
		var t = this.GetLongPressTipTexture();
		t && t.SetUIActive(e);
	}
	SetHotKeyType(e) {
		this.dxo = e;
	}
	SetActive(e) {
		super.SetActive(e), this.dxo?.KeyItemNotifySetActive(e);
	}
}
exports.KeyBaseComponent = KeyBaseComponent;
