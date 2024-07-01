"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginOfficialView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
	HotPatchLogReport_1 = require("../../../../Launcher/HotPatchLogReport"),
	PakKeyUpdate_1 = require("../../../../Launcher/Update/PakKeyUpdate"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	GlobalData_1 = require("../../../GlobalData"),
	KuroSdkReport_1 = require("../../../KuroSdk/KuroSdkReport"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ThirdPartySdkManager_1 = require("../../../Manager/ThirdPartySdkManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoginDefine_1 = require("../Data/LoginDefine"),
	LoginController_1 = require("../LoginController"),
	LoginServerController_1 = require("../LoginServerController"),
	LoginAgeTipView_1 = require("./LoginAgeTipView");
class LoginOfficialView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.VMi = !1),
			(this.HMi = () => {
				this.VMi
					? ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
						!ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn()
						? LoginController_1.LoginController.ReOpenSdkLoginView()
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Login", 17, "LoginProcedure-获取完整Pak包"),
							PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
								() => {
									UE.KuroPakKeyLibrary.HasPendingEncryptedPaks()
										? (Log_1.Log.CheckWarn() &&
												Log_1.Log.Warn("Login", 22, "存在未成功挂载的Pak包！"),
											LoginController_1.LoginController.GetAndShowStopServerNotice())
										: (KuroSdkReport_1.KuroSdkReport.Report(
												new KuroSdkReport_1.SdkReportClickEnterGame(void 0),
											),
											HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
												HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
												"enter_game_start",
											),
											LoginController_1.LoginController.GetHttp(!1, !1));
								},
								() => {
									var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33),
										o =
											ConfigManager_1.ConfigManager.TextConfig.GetTextById(
												"NoNetwork",
											);
									e.SetTextArgs(o),
										ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
											e,
										);
								},
							).catch((e) => {}))
					: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"AgreementTips",
						);
			}),
			(this.jMi = () => {
				var e;
				ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
					LoginDefine_1.ELoginStatus.Init,
				)
					? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(44)).FunctionMap.set(
							2,
							this.WMi,
						),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							e,
						),
						KuroSdkReport_1.KuroSdkReport.Report(
							new KuroSdkReport_1.SdkReportChangeAccount(void 0),
						))
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Login", 9, "正在登录中, 无法退出！");
			}),
			(this.KMi = () => {
				UiManager_1.UiManager.OpenView("ToolWindowView");
			}),
			(this.QMi = () => {
				let e = !1;
				if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
					var o =
						ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
					for (let n = 0; n < o.length; n++)
						if (o[n].link.includes("agreement_public")) {
							var r =
								ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
									"UserTitle",
								);
							r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
							ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
								r,
								o[n].link,
								!0,
								!1,
							),
								(e = !0);
							break;
						}
				}
				e ||
					(Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 11, "打开用户协议"),
					UiManager_1.UiManager.OpenView(
						"LoginAgeTipView",
						LoginAgeTipView_1.ELoginShowType.UserAgreement,
					),
					UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
			}),
			(this.XMi = () => {
				let e = !1;
				if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
					var o =
						ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
					for (let n = 0; n < o.length; n++)
						if (o[n].link.includes("personal_privacy")) {
							var r =
								ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
									"PrivacyTitle",
								);
							r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
							ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
								r,
								o[n].link,
								!0,
								!1,
							),
								(e = !0);
							break;
						}
				}
				e ||
					(Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 11, "打开隐私政策"),
					UiManager_1.UiManager.OpenView(
						"LoginAgeTipView",
						LoginAgeTipView_1.ELoginShowType.PrivacyAgreement,
					),
					UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
			}),
			(this.$Mi = () => {
				let e = !1;
				if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
					var o =
						ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
					for (let n = 0; n < o.length; n++)
						if (o[n].link.includes("child_privacy")) {
							var r =
								ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
									"ChildPrivacyTitle",
								);
							r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
							ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
								r,
								o[n].link,
								!0,
								!1,
							),
								(e = !0);
							break;
						}
				}
				e ||
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Login", 11, "打开儿童隐私政策"),
					UiManager_1.UiManager.OpenView(
						"LoginAgeTipView",
						LoginAgeTipView_1.ELoginShowType.ChildPrivacyAgreement,
					),
					UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
			}),
			(this.YMi = () => {
				ControllerHolder_1.ControllerHolder.KuroSdkController.OpenNotice();
			}),
			(this.JMi = () => {
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowExitGameConfirmBox();
			}),
			(this.zMi = () => {
				UiManager_1.UiManager.OpenView("LoginServerView");
			}),
			(this.ZMi = () => {
				this.eSi();
			}),
			(this.dOt = (e) => {
				var o;
				e &&
					(this.CloseMe(),
					void 0 === (e = ModelManager_1.ModelManager.LoginModel.GetPlayerSex())
						? Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Login",
								11,
								"性别获取为空,账号走的直接登录,性别设置异常",
							)
						: (ModelManager_1.ModelManager.LoginModel.CreateLoginPromise(),
							(o =
								ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()),
							UiLoginSceneManager_1.UiLoginSceneManager.PlayRoleMontage(
								o[e],
								18,
							),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Login", 11, "登录请求创角成功"),
							UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
								this.GetLoginSequenceName(e),
								() => {
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info("Login", 11, "登录请求创角成功,进入游戏"),
										ModelManager_1.ModelManager.LoginModel.FinishLoginPromise();
								},
							)));
			}),
			(this.tSi = () => {
				ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn()
					? (this.iSi(!0),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 17, "LoginProcedure-SdkLogin-登录成功"),
						this.SetUiActive(!1),
						"Windows" !== UE.GameplayStatics.GetPlatformName() &&
							UE.KismetSystemLibrary.ExecuteConsoleCommand(
								GlobalData_1.GlobalData.World,
								"r.DepthOfFieldQuality 1",
							),
						UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
							"LevelSequence_LoginAccount",
							() => {
								this.UiViewSequence.PlaySequence("Show"), this.oSi();
							},
						),
						this.rSi(),
						this.GetButton(14).RootUIComp.SetUIActive(!1))
					: (this.iSi(!1),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Login",
								17,
								"LoginProcedure-SdkLogin-登录失败, 重新打开SDK登录界面",
							));
			}),
			(this.nSi = () => {
				this.sSi();
			}),
			(this.aSi = () => {}),
			(this.WMi = () => {
				this.SetUiActive(!1),
					UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
						"LevelSequence_LoginAccount",
						() => {
							ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
								? (UiLoginSceneManager_1.UiLoginSceneManager.PlayLoginLoopSequence(),
									this.iSi(!1),
									this.UiViewSequence.PlaySequence("Show"),
									this.SetUiActive(!0),
									UiLayer_1.UiLayer.SetShowNormalMaskLayer(!1),
									ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
										6,
									))
								: UiManager_1.UiManager.CloseView("LoginView", (e) => {
										e && UiManager_1.UiManager.OpenView("LoginDebugView");
									});
						},
						!0,
					),
					ThirdPartySdkManager_1.ThirdPartySdkManager.Logout();
			}),
			(this.hSi = (e) => {
				(this.VMi = 1 === e),
					LocalStorage_1.LocalStorage.SetGlobal(
						LocalStorageDefine_1.ELocalStorageGlobalKey.AgreeAgreement,
						this.VMi,
					);
			}),
			(this.lSi = () => {
				UiManager_1.UiManager.OpenView(
					"LoginAgeTipView",
					LoginAgeTipView_1.ELoginShowType.AgeTip,
				),
					UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIExtendToggle],
			[6, UE.UIButtonComponent],
			[7, UE.UIButtonComponent],
			[8, UE.UIButtonComponent],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIButtonComponent],
			[12, UE.UIButtonComponent],
			[13, UE.UIItem],
			[14, UE.UIButtonComponent],
			[15, UE.UIText],
			[16, UE.UIItem],
			[17, UE.UITexture],
			[18, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.HMi],
				[1, this.jMi],
				[2, this.KMi],
				[3, this.HMi],
				[4, this.lSi],
				[5, this.hSi],
				[6, this.QMi],
				[7, this.XMi],
				[8, this.$Mi],
				[11, this.YMi],
				[12, this.JMi],
				[14, this.zMi],
			]);
	}
	OnStart() {
		(ModelManager_1.ModelManager.LoginModel.LoginTraceId =
			UE.KismetGuidLibrary.NewGuid().ToString()),
			LoginController_1.LoginController.LogLoginProcessLink(
				LoginDefine_1.ELoginStatus.LoginViewOpen,
			),
			ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo(),
			this.GetButton(14).RootUIComp.SetUIActive(!1),
			this.iSi(!1),
			this._Si(),
			this.uSi(),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CheckIfSdkLogin() &&
				ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
					6,
				);
		var e = ModelManager_1.ModelManager.PlatformModel.IsPc();
		this.GetButton(12).RootUIComp.SetUIActive(e),
			this.GetItem(13).SetUIActive(!1),
			this.eSi(),
			this.cSi(),
			this.mSi(),
			this.dSi(),
			this.CSi(),
			this.gSi();
	}
	_Si() {
		(this.VMi = !0),
			this.GetExtendToggle(5).SetToggleState(this.VMi ? 1 : 0, !1);
	}
	uSi() {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "ClickEnterGame");
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.LoginRequestResult,
			this.dOt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
				this.ZMi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SdkLoginResult,
				this.tSi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnGetLoginPlayerInfo,
				this.aSi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnConfirmServerItem,
				this.nSi,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.LoginRequestResult,
			this.dOt,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
				this.ZMi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SdkLoginResult,
				this.tSi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnGetLoginPlayerInfo,
				this.aSi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnConfirmServerItem,
				this.nSi,
			);
	}
	OnAfterShow() {
		LoginServerController_1.LoginServerController.PingAllRegion(),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				(UE.KuroLauncherLibrary.IsFirstIntoLauncher()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 17, "LoginProcedure-SdkLogin-首次登录"),
						LoginController_1.LoginController.OpenSdkLoginView())
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 17, "LoginProcedure-SdkLogin-非首次登录"),
						LoginController_1.LoginController.ReOpenSdkLoginView()));
	}
	oSi() {
		this.SetUiActive(!0),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
				(ModelManager_1.ModelManager.LoginServerModel.InitSuggestData(
					ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "",
					(e) => {
						ModelManager_1.ModelManager.LoginModel.SetServerName(e.name),
							ModelManager_1.ModelManager.LoginModel.SetServerId(e.id);
					},
				),
				this.fSi() && UiManager_1.UiManager.OpenView("LoginServerView"),
				this.GetButton(14).RootUIComp.SetUIActive(!0),
				this.sSi());
	}
	fSi() {
		var e = ModelManager_1.ModelManager.LoginServerModel,
			o = ModelManager_1.ModelManager.LoginModel;
		return !(
			!ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ||
			!e.IsFirstLogin(o.GetSdkLoginConfig()?.Uid ?? "")
		);
	}
	rSi() {
		var e = ModelManager_1.ModelManager.LoginServerModel,
			o = ModelManager_1.ModelManager.LoginModel;
		ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
			LoginServerController_1.LoginServerController.GetLoginPlayerInfo(
				1,
				o.GetSdkLoginConfig()?.Uid ?? "",
				o.GetSdkLoginConfig()?.UserName ?? "",
				o.GetSdkLoginConfig()?.Token ?? "",
				e.GetCurrentArea(),
			);
	}
	GetLoginSequenceName(e) {
		return e === LoginDefine_1.ELoginSex.Boy
			? "LevelSequence_LoginMale"
			: "LevelSequence_LoginFemale";
	}
	mSi() {
		this.GetButton(8).RootUIComp.SetUIActive(
			!ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
		);
	}
	cSi() {
		this.GetButton(4).RootUIComp.SetUIActive(
			!ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
		);
	}
	dSi() {
		this.GetItem(16).SetUIActive(
			!ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
		);
	}
	CSi() {
		this.GetText(9).SetText(
			BaseConfigController_1.BaseConfigController.GetVersionString(),
		);
	}
	gSi() {
		var e =
			ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage(
				"LoginLogo",
			);
		this.SetTextureByPath(e, this.GetTexture(17));
	}
	sSi() {
		var e =
			ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData.name;
		this.GetText(15).SetText(e);
	}
	eSi() {}
	pSi() {
		this.GetButton(11).RootUIComp.SetUIActive(
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn(),
		);
	}
	iSi(e) {
		var o = this.GetButton(1),
			r = this.GetButton(2),
			n = this.GetButton(3);
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
			? (o.RootUIComp.SetUIActive(e),
				r.RootUIComp.SetUIActive(e),
				n.RootUIComp.SetUIActive(!e),
				this.GetItem(18).SetUIActive(e))
			: (o.RootUIComp.SetUIActive(!0),
				r.RootUIComp.SetUIActive(!0),
				n.RootUIComp.SetUIActive(!1)),
			!e &&
				ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
				this.GetButton(14).RootUIComp.SetUIActive(!1),
			this.pSi();
	}
}
exports.LoginOfficialView = LoginOfficialView;
