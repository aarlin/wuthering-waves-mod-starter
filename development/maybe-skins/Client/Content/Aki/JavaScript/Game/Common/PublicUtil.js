"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PublicUtil = exports.getConfigPath = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Json_1 = require("../../Core/Common/Json"),
	Log_1 = require("../../Core/Common/Log"),
	MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang"),
	DataTableUtil_1 = require("../../Core/Utils/DataTableUtil"),
	Rotator_1 = require("../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	StringBuilder_1 = require("../../Core/Utils/StringBuilder"),
	BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
	IGlobal_1 = require("../../UniverseEditor/Interface/IGlobal"),
	GlobalData_1 = require("../GlobalData"),
	CdnServerDebugConfig_1 = require("../Module/Debug/CdnServerDebugConfig"),
	MultiTextCsvModule_1 = require("./MultiText/MultiTextCsvModule"),
	MultiTextDefine_1 = require("./MultiText/MultiTextDefine"),
	PACKAGENAME = "com.kurogame.aki.internal",
	LOGIN_NOTICE = "LoginNotice.json",
	SCROLLTEXT_NOTICE = "ScrollTextNotice.json";
function getConfigPath(t) {
	return "" + UE.KismetSystemLibrary.GetProjectDirectory() + t;
}
exports.getConfigPath = getConfigPath;
class PublicUtil {
	static IsInIpWhiteList(t) {
		if (void 0 === t) return !0;
		if (0 !== t.length) {
			var e = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinString)),
				r =
					(UE.KuroStaticLibrary.GetLocalHostAddresses(e),
					(0, puerts_1.$unref)(e)),
				i = new Array();
			for (let t = 0; t < r.Num(); t++) {
				var o = r.Get(t);
				i.push(o);
			}
			for (const e of t) for (const t of i) if (t === e) return !0;
		}
		return !1;
	}
	static GetIfGlobalSdk() {
		return (
			"CN" !==
			BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
		);
	}
	static GetGameId() {
		return PublicUtil.GetIfGlobalSdk() ? "G153" : "G152";
	}
	static GetLoginNoticeUrl2(t, e, r) {
		var i = PublicUtil.GetNoticeBaseUrl();
		if (i) return i + `/gm/loginNotice/${t}/${r}/${e}.json`;
	}
	static GetMarqueeUrl2(t, e) {
		var r = PublicUtil.GetNoticeBaseUrl();
		if (r) return r + `/gm/scrollTextNotice/${t}/${e}/notice.json`;
	}
	static GetLoginNoticeUrl() {
		var t = PublicUtil.GetNoticeBaseUrl();
		if (t)
			return (
				`${t}/${PACKAGENAME}/${UE.KuroLauncherLibrary.GetAppVersion()}/` +
				LOGIN_NOTICE
			);
	}
	static GetMarqueeUrl() {
		var t = PublicUtil.GetNoticeBaseUrl();
		if (t)
			return (
				`${t}/${PACKAGENAME}/${UE.KuroLauncherLibrary.GetAppVersion()}/` +
				SCROLLTEXT_NOTICE
			);
	}
	static GetNoticeBaseUrl() {
		var t = BaseConfigController_1.BaseConfigController.GetNoticeUrl();
		if (t)
			return CdnServerDebugConfig_1.CdnServerDebugConfig.Singleton.TryGetNoticeServerPrefixAddress(
				t,
			);
		GlobalData_1.GlobalData.IsPlayInEditor ||
			((t = UE.KuroLauncherLibrary.GetAppReleaseType()),
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("PublicUtil", 9, "找不到cdn", ["Apptype", t]));
	}
	static GetGARUrl(t, e, r, i, o) {
		var a = BaseConfigController_1.BaseConfigController.GetGARUrl();
		if (a)
			return (
				a +
				`/UserRegion/GetUserInfo?loginType=${t}&userId=${e}&token=${i}&area=${o}&userName=` +
				r
			);
	}
	static GetLocalHost() {
		var t = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinString)),
			e =
				(UE.KuroStaticLibrary.GetLocalHostAddresses(t),
				(0, puerts_1.$unref)(t));
		let r = "127.0.0.1";
		0 < e.Num() && (r = e.Get(0));
		for (let t = 0; t < e.Num(); t++) {
			var i = e.Get(t);
			i.startsWith("10.0.") && (r = i);
		}
		return r;
	}
	static GetConfigTextByKey(t) {
		return PublicUtil.UseDbConfig()
			? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t
			: this.xde.GetLocalText(t) ?? t;
	}
	static GetConfigTextByTable(t, e) {
		return (
			(t = this.GetConfigIdByTable(t, e)),
			PublicUtil.UseDbConfig()
				? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)
				: this.xde.GetLocalText(t)
		);
	}
	static GetConfigIdByTable(t, e) {
		return (
			(t = MultiTextDefine_1.tableTextMap[t]),
			new StringBuilder_1.StringBuilder(t[0], e, t[1]).ToString()
		);
	}
	static GetFlowConfigLocalText(t) {
		return PublicUtil.UseDbConfig()
			? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)
			: this.xde.GetLocalText(t);
	}
	static RegisterEditorLocalConfig() {
		PublicUtil.UseDbConfig() ||
			this.xde.RegisterTextLocalConfig(
				getConfigPath(IGlobal_1.globalConfig.TidTextTempPath),
			);
	}
	static RegisterFlowTextLocalConfig(t) {
		var e, r;
		PublicUtil.UseDbConfig() ||
			((e =
				"" +
				UE.KismetSystemLibrary.GetProjectDirectory() +
				MultiTextDefine_1.MULTI_TEXT_LANG_PLOT_PATH),
			(t = `文本库_${t}.csv`),
			0 === (r = UE.KuroStaticLibrary.GetFilesRecursive(e, t, !0, !1)).Num()
				? Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"MultiTextCsvModule",
						11,
						"无法找到对应文本库表格",
						["文本库表格名字", t],
						["目录路径", e],
					)
				: this.xde.RegisterTextLocalConfig(r.Get(0), !0));
	}
	static GetFlowListInfo(t) {
		if (!PublicUtil.UseDbConfig()) {
			var e,
				r = getConfigPath(IGlobal_1.globalConfig.FlowListDir);
			if (
				0 !==
				(r = UE.KuroStaticLibrary.GetFilesRecursive(
					r,
					t + ".json",
					!0,
					!1,
				)).Num()
			)
				return (
					(r = r.Get(0)),
					(e = (0, puerts_1.$ref)(void 0)),
					UE.KuroStaticLibrary.LoadFileToString(e, r),
					(r = (0, puerts_1.$unref)(e)),
					(e = JSON.parse(r)),
					Object.assign({}, e)
				);
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Level",
					19,
					"[PlotController.StartPlotNetwork] 无法找到对应剧情资源",
					["flowListName", t],
				);
		}
	}
	static GetParkourConfig(t) {
		return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(11, t);
	}
	static IsUseTempData() {
		return (
			!(
				!GlobalData_1.GlobalData.IsPlayInEditor &&
				!GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
			) && (void 0 === this.wde && this.Bde(), this.wde ?? !1)
		);
	}
	static IsStartEditorDebugServer() {
		return (
			!(
				!GlobalData_1.GlobalData.IsPlayInEditor &&
				!GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
			) && (void 0 === this.bde && this.Bde(), this.bde)
		);
	}
	static GetGameDebugPort() {
		if (
			GlobalData_1.GlobalData.IsPlayInEditor ||
			GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
		)
			return void 0 === this.qde && this.Bde(), this.qde;
	}
	static GetEditorDebugPort() {
		if (
			GlobalData_1.GlobalData.IsPlayInEditor ||
			GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
		)
			return void 0 === this.Gde && this.Bde(), this.Gde;
	}
	static Bde() {
		var t,
			e,
			r =
				UE.BlueprintPathsLibrary.ProjectDir() +
				"../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json";
		UE.BlueprintPathsLibrary.FileExists(r) &&
		((t = ((e = ""), puerts_1.$ref)("")),
		UE.KuroStaticLibrary.LoadFileToString(t, r)) &&
		((e = (0, puerts_1.$unref)(t)), void 0 !== (r = Json_1.Json.Parse(e)))
			? ((this.wde = r.UseTemp),
				(this.bde = r.IsOpenDebugService),
				(this.qde = r.GameClientGmPort),
				(this.Gde = r.EditorPort))
			: (this.wde = !1);
	}
	static TestLoadEditorConfigData() {
		var t =
			UE.BlueprintPathsLibrary.ProjectConfigDir() +
			"../Saved/Editor/JsonConfig/EditorConfig.json";
		if (UE.BlueprintPathsLibrary.FileExists(t)) {
			var e = (0, puerts_1.$ref)("");
			if (UE.KuroStaticLibrary.LoadFileToString(e, t)) {
				if (
					((e = (0, puerts_1.$unref)(e)), void 0 !== (e = Json_1.Json.Parse(e)))
				)
					return e;
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Temp", 43, "读取本地文件配置失败, 反序列化失败");
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Temp", 43, "读取本地文件配置失败", ["path", t]);
		}
	}
	static TestSaveEditorConfigData(t = void 0) {
		var e,
			r = void 0;
		if (t)
			return (
				(r = t),
				void 0 === (t = Json_1.Json.Stringify(r))
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error("Temp", 43, "IEditorConfig反序列化失败")
					: ((e =
							UE.BlueprintPathsLibrary.ProjectConfigDir() +
							"../Saved/Editor/JsonConfig/EditorConfig.json"),
						UE.KuroStaticLibrary.SaveStringToFile(t, e)),
				r
			);
	}
	static MapToObj(t) {
		var e,
			r,
			i = {};
		for ([e, r] of t) i[e] = r;
		return i;
	}
	static MapToObjEx(t) {
		var e,
			r,
			i = {};
		for ([e, r] of t) i[e] = this.MapToObj(r);
		return i;
	}
	static ObjToMap(t) {
		var e = new Map();
		for (const i in t) {
			var r = Number(i);
			isNaN(r) ? e.set(i, t[i]) : e.set(r, t[i]);
		}
		return e;
	}
	static ObjToMapEx(t) {
		var e = new Map();
		for (const r in t) e.set(r, this.ObjToMap(t[r]));
		return e;
	}
	static UseDbConfig() {
		return !PublicUtil.IsUseTempData();
	}
	static SetIsSilentLogin(t) {
		this.Nde = t;
	}
	static GetIsSilentLogin() {
		return this.Nde;
	}
	static CreateTransformFromConfig(t, e, r) {
		var i = Transform_1.Transform.Create();
		(t = Vector_1.Vector.Create(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0)),
			(e = Rotator_1.Rotator.Create(e?.Y ?? 0, e?.Z ?? 0, e?.X ?? 0)),
			(r = Vector_1.Vector.Create(r?.X ?? 0, r?.Y ?? 0, r?.Z ?? 0));
		return i.SetLocation(t), i.SetRotation(e.Quaternion()), i.SetScale3D(r), i;
	}
}
((exports.PublicUtil = PublicUtil).wde = void 0),
	(PublicUtil.bde = void 0),
	(PublicUtil.Gde = void 0),
	(PublicUtil.qde = void 0),
	(PublicUtil.xde = new MultiTextCsvModule_1.MultiTextCsvModule()),
	(PublicUtil.Nde = !1);
