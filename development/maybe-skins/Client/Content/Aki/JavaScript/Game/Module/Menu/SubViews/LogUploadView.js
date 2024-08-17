"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogUploadView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LogController_1 = require("../../../World/Controller/LogController"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	LogUpload_1 = require("../../LogUpload/LogUpload"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class LogUploadView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.cwi = !1),
			(this.mwi = 0),
			(this.dwi = 0),
			(this.Cwi = void 0),
			(this.gwi = void 0),
			(this.fwi = void 0),
			(this.$Ut = void 0),
			(this.UploadDelegate = void 0),
			(this.pwi = void 0),
			(this.vwi = 1),
			(this.Mwi = (e) => {
				this.cwi = 1 === e;
			}),
			(this.Swi = () => {
				2 === this.vwi &&
					LogController_1.LogController.RequestOutputDebugInfo(),
					ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
						this.vwi,
					);
			}),
			(this.dIt = () => {
				switch (this.Ewi) {
					case 0:
						if (!this.cwi)
							return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"LogUploadConfirmTip",
							);
						if (!this.ywi())
							return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"LogUploadLimited",
							);
						(this.Ewi = 1), this.Iwi();
						break;
					case 1:
						this.Twi() && (this.Ewi = 0);
						break;
					case 2:
						this.mIt();
						break;
					case 3:
						(this.Ewi = 1), this.Iwi();
				}
			}),
			(this.mIt = () => {
				(1 === this.Ewi && !this.Twi()) || this.CloseMe();
			}),
			(this.UploadEventCallBack = (e, t) => {
				var i;
				1 === this.Ewi &&
					((this.pwi = e),
					5 === this.pwi || 4 === this.pwi
						? this.Lwi()
						: this.dwi === t ||
							(1 !== this.pwi && 2 !== this.pwi) ||
							((e =
								Math.round(
									t * MathCommon_1.MathCommon.ProgressTotalValue,
								).toString() + "%"),
							(i =
								1 === this.pwi
									? "Text_LogCompressing_Text"
									: "Text_LogUploading_Text"),
							LguiUtil_1.LguiUtil.SetLocalTextNew(this.Cwi, i, e),
							this.gwi.SetFillAmount(t),
							(this.dwi = t)));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UISprite],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UISprite],
			[6, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[6, this.Mwi]]);
	}
	OnStart() {
		this.OpenParam && (this.vwi = this.OpenParam),
			(this.Cwi = this.GetText(0)),
			(this.gwi = this.GetSprite(2)),
			(this.fwi = new ButtonItem_1.ButtonItem(this.GetItem(3))),
			this.fwi.SetFunction(this.Swi),
			this.fwi.SetShowText("Text_LogUploadService_Text"),
			this.fwi.SetActive(!1),
			this.fwi.BindRedDot("CustomerService"),
			(this.$Ut = new ButtonItem_1.ButtonItem(this.GetItem(4))),
			this.$Ut.SetFunction(this.dIt),
			(this.Ewi = 0),
			this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
				this.mIt();
			});
	}
	OnBeforeDestroy() {
		this.Dwi(),
			(this.Cwi = void 0),
			(this.gwi = void 0),
			this.fwi?.UnBindRedDot(),
			this.fwi?.Destroy();
	}
	Rwi(e) {
		e &&
		ControllerHolder_1.ControllerHolder.KuroSdkController.NeedShowCustomerService()
			? this.fwi.SetActive(!0)
			: this.fwi.SetActive(!1);
	}
	Dwi() {
		UE.KuroTencentCOSLibrary.ClearAllProgressCallback(),
			this.UploadDelegate &&
				((0, puerts_1.releaseManualReleaseDelegate)(this.UploadEventCallBack),
				(this.UploadDelegate = void 0));
	}
	set Ewi(e) {
		this.mwi = e;
		var t = this.GetExtendToggle(6),
			i = this.GetItem(1),
			o = this.GetSprite(5);
		switch (this.mwi) {
			case 0:
				this.Rwi(!0),
					this.$Ut.SetShowText("Text_LogUpload_Text"),
					this.Cwi.ShowTextNew("Text_LogUploadConfirm_Text"),
					this.Cwi.SetUIActive(!0);
				var r =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_UploadState1",
					);
				this.SetSpriteByPath(r, o, !1),
					t.RootUIComp.SetUIActive(!0),
					i.SetUIActive(!1);
				break;
			case 1:
				this.Rwi(!1),
					this.$Ut.SetShowText("Text_LogUploadCancel_Text"),
					this.Cwi.SetText(""),
					(r =
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							"SP_UploadState2",
						)),
					this.SetSpriteByPath(r, o, !1),
					t.RootUIComp.SetUIActive(!1),
					i.SetUIActive(!0);
				break;
			case 2:
				this.Rwi(!0),
					this.$Ut.SetShowText("Text_LogUploadYes_Text"),
					this.Cwi.ShowTextNew("Text_LogUploadSuccess_Text"),
					(r =
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
							"SP_UploadState3",
						)),
					this.SetSpriteByPath(r, o, !1),
					t.RootUIComp.SetUIActive(!1),
					i.SetUIActive(!1);
				break;
			case 3:
				this.Rwi(!0), this.$Ut.SetShowText("Text_LogUploadRetry_Text");
				var a =
					(r = UE.KuroTencentCOSLibrary.GetAllFileNumNeedToSend()) -
					UE.KuroTencentCOSLibrary.GetSendedFileNum();
				a =
					(LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.Cwi,
						"Text_LogUploadFail_Text",
						a,
						r,
					),
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_UploadState1",
					));
				this.SetSpriteByPath(a, o, !1),
					t.RootUIComp.SetUIActive(!1),
					i.SetUIActive(!1);
		}
	}
	get Ewi() {
		return this.mwi;
	}
	ywi() {
		var e = CommonParamById_1.configCommonParamById.GetIntConfig(
				"LogUploadTimeInterval",
			),
			t = TimeUtil_1.TimeUtil.GetServerTime(),
			i = LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.LastTimeUploadStamp,
			);
		return void 0 === i || e < t - i;
	}
	Iwi() {
		(this.dwi = 0),
			this.gwi.SetFillAmount(0),
			this.Dwi(),
			this.UploadDelegate ||
				(this.UploadDelegate = (0, puerts_1.toManualReleaseDelegate)(
					this.UploadEventCallBack,
				)),
			2 === this.vwi && LogController_1.LogController.RequestOutputDebugInfo(),
			LogUpload_1.LogUpload.SendLog(this.UploadDelegate);
	}
	Twi() {
		return 1 === this.pwi
			? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"LogUploadCompressingTip",
				),
				!1)
			: !!UE.KuroTencentCOSLibrary.IsSending() &&
					(UE.KuroTencentCOSLibrary.InterruptSending(),
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"LogUploadCancelTip",
					),
					!0);
	}
	Lwi() {
		this.Dwi();
		var e = 5 === this.pwi;
		(this.Ewi = e ? 2 : 3),
			e &&
				((e = TimeUtil_1.TimeUtil.GetServerTime()),
				LocalStorage_1.LocalStorage.SetGlobal(
					LocalStorageDefine_1.ELocalStorageGlobalKey.LastTimeUploadStamp,
					e,
				));
	}
}
exports.LogUploadView = LogUploadView;
