"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginDebugView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Json_1 = require("../../../../Core/Common/Json"),
	Log_1 = require("../../../../Core/Common/Log"),
	GmAccountAll_1 = require("../../../../Core/Define/ConfigQuery/GmAccountAll"),
	Http_1 = require("../../../../Core/Http/Http"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
	PakKeyUpdate_1 = require("../../../../Launcher/Update/PakKeyUpdate"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LoginDefine_1 = require("../../Login/Data/LoginDefine"),
	LoginController_1 = require("../../Login/LoginController"),
	ReconnectDefine_1 = require("../../ReConnect/ReconnectDefine"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager");
class LoginDebugView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.IRe = void 0),
			(this.lFt = -1),
			(this._Ft = void 0),
			(this.uFt = void 0),
			(this.cFt = void 0),
			(this.mFt = () => {
				ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
					ReconnectDefine_1.ELogoutReason.LoginViewQuit,
				);
			}),
			(this.dFt = () => {
				ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
					LoginDefine_1.ELoginStatus.Init,
				)
					? "" === this.GetInputText(2).Text
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"LoginFailEmptyAccount",
							)
						: (this.CFt(),
							"Windows" !== UE.GameplayStatics.GetPlatformName() &&
								UE.KismetSystemLibrary.ExecuteConsoleCommand(
									GlobalData_1.GlobalData.World,
									"r.DepthOfFieldQuality 1",
								),
							this.CloseMe((e) => {
								e &&
									UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
										"LevelSequence_LoginAccount",
										() => {
											UiManager_1.UiManager.OpenView("LoginView");
										},
									);
							}))
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！");
			}),
			(this.gFt = () => {
				ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
					LoginDefine_1.ELoginStatus.Init,
				)
					? "" === this.GetInputText(2).Text
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"LoginFailEmptyAccount",
							)
						: (this.CFt(),
							ModelManager_1.ModelManager.LoginModel.SetPlayerName(
								"一键登录账号",
							),
							this.fFt())
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！");
			}),
			(this.pFt = () => {
				var e;
				ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
					LoginDefine_1.ELoginStatus.Init,
				)
					? (this.CFt(),
						(e = this.vFt()),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 9, "生成账号", ["ip", e]),
						this.GetInputText(2).SetText(e),
						ModelManager_1.ModelManager.LoginModel.SetAccount(e),
						ModelManager_1.ModelManager.LoginModel.SetPlayerName(
							"一键登录账号",
						),
						this.fFt())
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！");
			}),
			(this.MFt = (e) => {
				this.GetSprite(8).SetUIActive(1 === e);
			}),
			(this.SFt = (e) => {
				this.GetSprite(10).SetUIActive(1 === e);
			}),
			(this.EFt = (e) => {
				var o;
				-1 !== e &&
					(ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
						LoginDefine_1.ELoginStatus.Init,
					)
						? ((o =
								ModelManager_1.ModelManager.LoginModel.GetRecentlyAccountList()),
							this.GetInputText(2).SetText(o[e]),
							"" === this.GetInputText(2).Text
								? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
										"LoginFailEmptyAccount",
									)
								: (this.CFt(), this.fFt()))
						: Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！"));
			}),
			(this.yFt = (e) => {
				-1 !== (this.lFt = e) &&
					(ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
						LoginDefine_1.ELoginStatus.Init,
					) ||
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！")),
					UiManager_1.UiManager.OpenView("LoginDebugPlayerNameView", this.IFt));
			}),
			(this.IFt = () => {
				var e,
					o,
					t,
					n,
					i = this.lFt;
				i < 0 ||
					((e = ModelManager_1.ModelManager.LoginModel.GetPlayerName()),
					(t = (o = GmAccountAll_1.configGmAccountAll.GetConfigList())[i]
						.FirstName),
					(n = this.vFt()),
					this.GetInputText(2).SetText("" + e + t + "-" + n),
					(ModelManager_1.ModelManager.SundryModel.AccountGmId =
						o[i].GmOrderListId),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Login",
							9,
							"创建新的GM账号",
							["index", "" + i],
							["配置id", "" + o[i].Id],
						),
					"" === this.GetInputText(2).Text
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"LoginFailEmptyAccount",
							)
						: (this.CFt(), this.fFt()));
			}),
			(this.TFt = () => {
				var e = this.GetInputText(11).GetText(),
					o = this.GetDropdown(4);
				if (StringUtils_1.StringUtils.IsEmpty(e)) o.SetOptions(this._Ft);
				else {
					this.uFt.Empty();
					for (let o = 0; o < this._Ft.Num(); o++) {
						var t = this._Ft.Get(o);
						t.TextOrConfigTableName.includes(e) && this.uFt.Add(t);
					}
					0 !== this.uFt.Num() && (o.Options.Empty(), o.SetOptions(this.uFt));
				}
			}),
			(this.LFt = (e, o, t) => {
				var n;
				if (0 === t)
					return (n =
						BaseConfigController_1.BaseConfigController.GetPrivateServers())
						? ((n = n.serverUrl),
							Http_1.Http.Get(n, void 0, this.DFt),
							void (this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
								(this.IRe = void 0), this.DFt(!1, void 0, void 0, !0);
							}, 5 * TimeUtil_1.TimeUtil.InverseMillisecond)))
						: void 0;
				3 === t
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(
							`私服列表域名解析失败[${e}], 可能是本地开了VPN, 请关闭后重试`,
						)
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(
							`私服列表获取失败[${e}], EIcmpResponseStatus:` + t,
						);
			}),
			(this.DFt = (e = 0, o, t = void 0, n = !0) => {
				var i;
				void 0 !== this.IRe &&
					(TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0)),
					ModelManager_1.ModelManager.LoginModel.AddExtraServer(),
					t &&
						((i = Json_1.Json.Parse(t))
							? ModelManager_1.ModelManager.LoginModel.AddServerInfos(i)
							: Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Login", 42, "序列化ServerInfo失败", [
									"JsonData",
									t,
								])),
					n && ModelManager_1.ModelManager.LoginModel.AddDataTableServers(),
					this.RFt();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UITextInputComponent],
			[3, UE.UIDropdownComponent],
			[4, UE.UIDropdownComponent],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIExtendToggle],
			[8, UE.UISprite],
			[9, UE.UIExtendToggle],
			[10, UE.UISprite],
			[11, UE.UITextInputComponent],
			[12, UE.UITextInputComponent],
			[13, UE.UIDropdownComponent],
			[14, UE.UIDropdownComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.mFt],
				[1, this.dFt],
				[5, this.pFt],
				[6, this.gFt],
				[7, this.MFt],
				[9, this.SFt],
			]);
	}
	OnStart() {
		(this.cFt = (0, puerts_1.toManualReleaseDelegate)(this.LFt)),
			ModelManager_1.ModelManager.LoginModel.InitConfig(),
			ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo(),
			(this._Ft = UE.NewArray(UE.UIDropdownOptionData)),
			(this.uFt = UE.NewArray(UE.UIDropdownOptionData)),
			this.GetInputText(11).OnTextChange.Bind(this.TFt),
			this.GetInputText(2).SetText(
				ModelManager_1.ModelManager.LoginModel.GetAccount(),
			),
			this.UFt();
	}
	RFt() {
		this.AFt(),
			this.PFt(),
			this.xFt(),
			this.wFt(),
			GlobalData_1.GlobalData.IsPlayInEditor &&
				!UiManager_1.UiManager.IsViewShow("LoginStatusView") &&
				UiManager_1.UiManager.OpenView("LoginStatusView"),
			this.BFt(),
			this.bFt(),
			(ModelManager_1.ModelManager.LoginModel.SmokeTestReady = !0);
	}
	AFt() {
		var e = this.GetDropdown(3);
		if (e) {
			var o,
				t = e.GetOption(0).Sprite,
				n =
					(e.Options.Empty(),
					ModelManager_1.ModelManager.LoginModel.GetServerInfoList()),
				i = ModelManager_1.ModelManager.LoginModel.GetServerIp();
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					9,
					"debug 登录信息",
					["serverIp", i],
					["serverInfoList", n],
				);
			let a = !1;
			if (n)
				for (let o = 0; o < n.length; ++o) {
					var r = n[o];
					e.Options.Add(new UE.UIDropdownOptionData(r.Name, t, 0, "")),
						r.Ip === i &&
							((e.Value = o), e.CaptionText.UIText.SetText(r.Name), (a = !0));
				}
			a ||
				(n &&
					0 < n.length &&
					((o = n[(e.Value = 0)]), e.CaptionText.UIText.SetText(o.Name)));
		}
	}
	PFt() {
		var e = this.GetDropdown(4);
		if (e) {
			var o,
				t = e.GetOption(0).Sprite,
				n =
					(e.Options.Empty(),
					ModelManager_1.ModelManager.LoginModel.GetSingleMapList()),
				i = ModelManager_1.ModelManager.LoginModel.GetSingleMapId(),
				r = ConfigManager_1.ConfigManager.LoginConfig.GetDefaultSingleMapId();
			let d,
				s = !1;
			if (n)
				for (let o = 0; o < n.length; ++o) {
					var a = n[o],
						l = a.MapId + "-" + a.MapName,
						g = new UE.UIDropdownOptionData(l, t, 0, "");
					this._Ft.Add(g),
						e.Options.Add(g),
						a.MapId === i &&
							((e.Value = o), e.CaptionText.UIText.SetText(l), (s = !0)),
						a.MapId === r && (d = o);
				}
			s ||
				((o = d || 0),
				n &&
					n.length > o &&
					((o = (o = n[(e.Value = o)]).MapId + "-" + o.MapName),
					e.CaptionText.UIText.SetText(o)));
		}
	}
	xFt() {
		var e;
		this.GetExtendToggle(7) &&
			((e = LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.LoginSex,
				!0,
			)
				? 1
				: 0),
			this.GetExtendToggle(7).SetToggleState(e),
			this.MFt(e));
	}
	wFt() {
		var e,
			o = this.GetExtendToggle(9);
		o &&
			((e = LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.SkipPlot,
				!1,
			)
				? 1
				: 0),
			o.SetToggleState(e),
			this.SFt(e),
			o.GetRootComponent().SetUIActive(!1));
	}
	OnBeforeDestroy() {
		this.cFt &&
			((0, puerts_1.releaseManualReleaseDelegate)(this.LFt),
			(this.cFt = void 0)),
			this.GetDropdown(13).OnSelectChange.Unbind(),
			ModelManager_1.ModelManager.LoginModel.SaveRecentlyAccountList(),
			ModelManager_1.ModelManager.LoginModel.CleanConfig();
	}
	bFt() {
		var e = this.GetDropdown(14);
		if (e) {
			e.CaptionText.UIText.text = "选择最近登录账号";
			var o = e.GetOption(0).Sprite,
				t =
					(e.Options.Empty(),
					ModelManager_1.ModelManager.LoginModel.GetRecentlyAccountList());
			if (t)
				for (const n of t)
					e.Options.Add(new UE.UIDropdownOptionData(n, o, 0, ""));
			e.OnSelectChange.Bind(this.EFt);
		}
	}
	BFt() {
		var e = this.GetDropdown(13);
		if (e) {
			var o = e.GetOption(0).Sprite,
				t =
					(e.Options.Empty(),
					GmAccountAll_1.configGmAccountAll.GetConfigList());
			for (const n of t)
				e.Options.Add(new UE.UIDropdownOptionData(n.GmName, o, 0, ""));
			e.CaptionText.UIText.SetText("创建指定GM账号"),
				e.OnSelectChange.Bind(this.yFt);
		}
	}
	fFt() {
		PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
			() => {
				UE.KuroPakKeyLibrary.HasPendingEncryptedPaks()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 22, "存在未成功挂载的Pak包！"),
						LoginController_1.LoginController.GetAndShowStopServerNotice())
					: LoginController_1.LoginController.GetHttp(!0);
			},
			void 0,
		).catch((e) => {});
	}
	vFt() {
		return `${PublicUtil_1.PublicUtil.GetLocalHost()}[${TimeUtil_1.TimeUtil.DateFormat(new Date())}]`;
	}
	UBn(e) {
		if (
			(e =
				/(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(?<port>\d{1,5}))?/.exec(
					e,
				)) &&
			e.groups
		)
			return { Ip: e.groups.ip, Port: e.groups.port };
	}
	CFt() {
		var e = this.GetDropdown(4);
		let o = e?.Value;
		-1 === o && (o = 0);
		var t = e.GetOption(o);
		let n = -1;
		for (let e = 0; e < this._Ft.Num(); e++)
			if (this._Ft.Get(e).TextOrConfigTableName === t.TextOrConfigTableName) {
				n = e;
				break;
			}
		-1 === n &&
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Login",
					11,
					"当前选择的地图 在初始地图数据集合里 不存在",
					["地图名称", t.TextOrConfigTableName],
				),
			(n = 0)),
			void 0 !== n &&
				0 <= n &&
				(e = ModelManager_1.ModelManager.LoginModel.GetSingleMapIp(n)) &&
				ModelManager_1.ModelManager.LoginModel.SetSingleMapId(e);
		(e = this.GetDropdown(3))
			? ((e = e.Value),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Login", 11, "获取服务器下拉列表当前设置值", [
						"serverValue",
						e,
					]),
				void 0 !== e &&
					0 <= e &&
					((e = ModelManager_1.ModelManager.LoginModel.GetServerInfo(e))
						? (ModelManager_1.ModelManager.LoginModel.SetServerName(e.Name),
							ModelManager_1.ModelManager.LoginModel.SetServerIp(e.Ip, 1))
						: ((e = ModelManager_1.ModelManager.LoginModel.GetServerInfoList()),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Login", 11, "获取服务器数据为空", [
									"serverInfoList",
									e,
								]))))
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 11, "服务器下拉列表节点获取不到"),
			(e = this.GetInputText(12).GetText()),
			StringUtils_1.StringUtils.IsEmpty(e) ||
				((e = this.UBn(e)) &&
					(ModelManager_1.ModelManager.LoginModel.SetServerName(
						"手动输入IP地址服务器",
					),
					ModelManager_1.ModelManager.LoginModel.SetServerIp(e.Ip, 2),
					ModelManager_1.ModelManager.LoginModel.TrySetCustomServerPort(
						e.Port,
						2,
					))),
			(e =
				1 === this.GetExtendToggle(7).ToggleState
					? LoginDefine_1.ELoginSex.Girl
					: LoginDefine_1.ELoginSex.Boy);
		var i =
			(LocalStorage_1.LocalStorage.SetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.LoginSex,
				e === LoginDefine_1.ELoginSex.Girl,
			),
			ModelManager_1.ModelManager.LoginModel.SetPlayerSex(e),
			ModelManager_1.ModelManager.LoginModel.SetAccount(
				this.GetInputText(2).Text,
			),
			1 === this.GetExtendToggle(9).ToggleState);
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.SkipPlot,
			i,
		),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					9,
					"已保存登录数据",
					["ServerIp", ModelManager_1.ModelManager.LoginModel.GetServerIp()],
					[
						"CustomServerPort",
						ModelManager_1.ModelManager.LoginModel.GetCustomServerPort(),
					],
					["SingleId", ModelManager_1.ModelManager.LoginModel.GetSingleMapId()],
					[
						"MultiMapId",
						ModelManager_1.ModelManager.LoginModel.GetMultiMapId(),
					],
					["Account", ModelManager_1.ModelManager.LoginModel.GetAccount()],
					["LoginSex", LoginDefine_1.ELoginSex[e]],
				);
	}
	UFt() {
		var e, o;
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ||
			((e = BaseConfigController_1.BaseConfigController.GetPrivateServers()) &&
				(ModelManager_1.ModelManager.LoginModel.AddServerInfoByCdn(),
				e.enable
					? 0 <= (o = e.serverUrl.match(/:\/\/.*?\//g)).length
						? ((o = o[0]),
							UE.KuroStaticLibrary.IcmpPing(
								o.substring(3, o.length - 1),
								5,
								this.cFt,
							))
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(
								`私服域名截取失败[${e.serverUrl}]`,
							)
					: this.DFt(!1, void 0, void 0, !1)));
	}
}
exports.LoginDebugView = LoginDebugView;
