"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChannelModel = void 0);
const UE = require("ue"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	CommunityAll_1 = require("../../../Core/Define/ConfigQuery/CommunityAll"),
	CommunityById_1 = require("../../../Core/Define/ConfigQuery/CommunityById"),
	CustomerServiceAll_1 = require("../../../Core/Define/ConfigQuery/CustomerServiceAll"),
	SetAccountAll_1 = require("../../../Core/Define/ConfigQuery/SetAccountAll"),
	SetAccountById_1 = require("../../../Core/Define/ConfigQuery/SetAccountById"),
	SharePlatformAll_1 = require("../../../Core/Define/ConfigQuery/SharePlatformAll"),
	ShareRewardById_1 = require("../../../Core/Define/ConfigQuery/ShareRewardById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
	LAGUANGE_ALL = "all",
	CHANNEL_ALL = 0;
class ChannelModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.rMt = void 0),
			(this.nMt = void 0),
			(this.sMt = void 0),
			(this.aMt = void 0),
			(this.eyn = !1),
			(this.SharingActionId = 1),
			(this.hMt = () => {
				if (
					((this.rMt = []),
					(this.nMt = []),
					(this.sMt = []),
					(this.eyn = !1),
					ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk())
				) {
					var e =
							ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
						t = LanguageSystem_1.LanguageSystem.PackageLanguage,
						o = Number(
							ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId(),
						),
						r =
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"KuroSdk",
									54,
									"当前包体信息",
									["是否海外", e],
									["当前语言码", t],
									["当前渠道", o],
								),
							FeatureRestrictionTemplate_1.FeatureRestrictionTemplate
								.TemplateForPioneerClient);
					if (
						2 === ModelManager_1.ModelManager.PlatformModel.PlatformType ||
						1 === ModelManager_1.ModelManager.PlatformModel.PlatformType
					)
						for (const n of SharePlatformAll_1.configSharePlatformAll.GetConfigList(
							e ? 0 : 1,
						))
							this.lMt(t, n.Language) &&
								this._Mt(o, n.Channel) &&
								!r.Check() &&
								(this.rMt.push(n.Id), Log_1.Log.CheckInfo()) &&
								Log_1.Log.Info("KuroSdk", 54, "开启分享渠道id ", [
									"config.Id",
									n.Id,
								]);
					for (const n of CommunityAll_1.configCommunityAll.GetConfigList(
						e ? 0 : 1,
					))
						this.lMt(t, n.Language) &&
							this._Mt(o, n.Channel) &&
							!r.Check() &&
							(this.nMt.push(n.Id), Log_1.Log.CheckInfo()) &&
							Log_1.Log.Info("KuroSdk", 54, "开启库街区id ", [
								"config.Id",
								n.Id,
							]);
					for (const r of SetAccountAll_1.configSetAccountAll.GetConfigList(
						e ? 0 : 1,
					))
						this.lMt(t, r.Language) &&
							this._Mt(o, r.Channel) &&
							(this.sMt.push(r.Id), Log_1.Log.CheckInfo()) &&
							Log_1.Log.Info("KuroSdk", 54, "开启账号中心id ", [
								"config.Id",
								r.Id,
							]);
					for (const r of CustomerServiceAll_1.configCustomerServiceAll.GetConfigList(
						e ? 0 : 1,
					))
						this.lMt(t, r.Language) &&
							this._Mt(o, r.Channel) &&
							((this.eyn = !0), Log_1.Log.CheckInfo()) &&
							Log_1.Log.Info("KuroSdk", 11, "客服开启", ["config", r]);
					EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChannelReset);
				} else
					Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 54, "不可使用SDK");
			});
	}
	OnInit() {
		return (
			(this.rMt = []),
			(this.nMt = []),
			(this.sMt = []),
			(this.aMt = []),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SdkInitDone,
				this.hMt,
			),
			!0
		);
	}
	OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SdkInitDone,
				this.hMt,
			),
			!0
		);
	}
	lMt(e, t) {
		return t.includes("all") || t.includes(e);
	}
	_Mt(e, t) {
		return t.includes(0) || t.includes(e);
	}
	CheckShareChannelOpen(e) {
		return this.uMt(), this.rMt.includes(e);
	}
	CheckKuroStreetOpen() {
		return this.uMt(), 0 < this.nMt.length;
	}
	CheckAccountSettingOpen(e) {
		return this.uMt(), this.sMt.includes(e);
	}
	CheckCustomerServiceOpen() {
		return (
			this.uMt(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("KuroSdk", 11, "客服是否开启", [
					"IsCustomerServiceOpen",
					this.eyn,
				]),
			this.eyn
		);
	}
	OpenKuroStreet() {
		2 === ModelManager_1.ModelManager.PlatformModel.SourcePlatformType
			? UE.KuroStaticAndroidLibrary.OpenAppWithUrl(
					"kjq://kuro/home?gameId=3",
					"https://www.kurobbs.com/download.html",
				)
			: 1 === ModelManager_1.ModelManager.PlatformModel.SourcePlatformType
				? UE.KuroStaticiOSLibrary.OpenAppWithUrl(
						"kjq://kuro/home?gameId=3",
						"itms-apps://itunes.apple.com/app/id/1659339393",
					)
				: this.nMt.length &&
					this.cMt(
						CommunityById_1.configCommunityById.GetConfig(this.nMt[0])?.Adress,
					);
	}
	uMt() {
		0 === this.sMt.length && this.hMt();
	}
	ProcessAccountSetting(e) {
		1 === e || 9 === e
			? ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
					13,
				)
			: 8 === e
				? (ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
						15,
					),
					ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
						12,
					))
				: ((2 !== e && 3 !== e && 4 !== e && 6 !== e && 7 !== e) ||
						KuroSdkReport_1.KuroSdkReport.Report(
							new KuroSdkReport_1.SdkReportOpenPrivacy(void 0),
						),
					this.cMt(SetAccountById_1.configSetAccountById.GetConfig(e)?.Adress));
	}
	GetOpenedShareIds() {
		return this.uMt(), this.rMt;
	}
	CouldGetShareReward(e) {
		return (
			(e = ShareRewardById_1.configShareRewardById.GetConfig(e).ShareType),
			0 < this.rMt.length && !this.aMt.includes(e)
		);
	}
	MarkActionShared(e) {
		(e = ShareRewardById_1.configShareRewardById.GetConfig(e).ShareType),
			this.aMt.push(e);
	}
	cMt(e) {
		e &&
			((e = e.replace("{0}", LanguageSystem_1.LanguageSystem.PackageLanguage)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 54, "根据渠道打开链接 ", ["formatUrl", e]),
			UE.KismetSystemLibrary.LaunchURL(e));
	}
	GmOpenShareId(e) {
		0 === this.sMt.length && this.sMt.push(5), this.rMt?.push(e);
	}
}
exports.ChannelModel = ChannelModel;
