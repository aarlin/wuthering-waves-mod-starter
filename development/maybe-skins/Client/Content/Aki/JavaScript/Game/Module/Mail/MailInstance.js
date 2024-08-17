"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailData = void 0);
const UE = require("ue"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ScrollViewDataBase_1 = require("../Util/ScrollView/ScrollViewDataBase");
class MailData extends ScrollViewDataBase_1.ScrollViewDataBase {
	constructor() {
		super(...arguments),
			(this.Id = "0"),
			(this.ConfigId = 0),
			(this.Time = 0),
			(this.FinishTime = 0),
			(this.Level = 1),
			(this.Title = ""),
			(this.Content = ""),
			(this.Sender = ""),
			(this.ValidTime = 0),
			(this.FinishValidTime = 0),
			(this.AttachmentInfos = []),
			(this.OriginalDeadlineTimeStamp = 0),
			(this.FinishedDeadlineTimeStamp = 0),
			(this.pEi = 0),
			(this.vEi = 0),
			(this.MEi = ""),
			(this.SEi = ""),
			(this.EEi = 0),
			(this.yEi = ""),
			(this.IEi = 0),
			(this.TEi = ""),
			(this.LEi = ""),
			(this.DEi = ""),
			(this.REi = !1),
			(this.UEi = !1),
			(this.AEi = !1),
			(this.PEi = "");
	}
	UpdateValidTimeWhenReadMail() {
		0 !== this.FinishTime
			? (this.FinishedDeadlineTimeStamp =
					this.FinishValidTime + this.FinishTime)
			: (this.FinishedDeadlineTimeStamp =
					Date.parse(new Date().toString()) / 1e3 + this.FinishValidTime),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Mail", 28, "邮件详情：邮件完成", ["this.Id", this.Id]);
	}
	GetAttachmentStatus() {
		return this.pEi;
	}
	SetAttachmentStatus(e) {
		(this.pEi = e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Mail",
					28,
					"邮件详情：设置附件领取状态",
					["MailId", this.Id],
					["attachmentStatus", e],
				);
	}
	GetWasScanned() {
		return 1 === this.vEi;
	}
	SetWasScanned(e) {
		(this.vEi = 1 === e ? e : 0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Mail",
					28,
					"邮件详情：设置阅读状态",
					["MailId", this.Id],
					["scanned", e],
				);
	}
	GetReceiveTime() {
		return this.Time;
	}
	GetMailLevel() {
		return this.Level;
	}
	GetTitle() {
		return this.Title;
	}
	SetText(e) {
		(e = (this.Content = e).split("@&&")),
			(this.MEi = e[0]),
			1 < e.length && this.xEi(e[1]);
	}
	xEi(e) {
		(this.yEi = "FFFFFFFF"),
			(this.EEi = 0),
			(this.IEi = 0),
			(this.DEi = ""),
			(this.REi = !1),
			(this.TEi = ""),
			(this.SEi = "");
		var i = e.split(",");
		for (let e = 0; e < i.length; e++)
			i[e].includes("iconId=")
				? (this.EEi = Number(i[e].replace("iconId=", "")))
				: i[e].includes("color=#")
					? (this.yEi = i[e].replace("color=#", ""))
					: i[e].includes("jumpId=")
						? (this.IEi = Number(i[e].replace("jumpId=", "")))
						: i[e].includes("url=")
							? (this.DEi = i[e].replace("url=", ""))
							: i[e].includes("showNewMail")
								? (this.UEi = !0)
								: i[e].includes("useDefaultBrowser")
									? (this.AEi = !0)
									: i[e].includes("isWenjuanxing=")
										? (this.REi =
												1 === Number(i[e].replace("isWenjuanxing=", "")))
										: i[e].includes("wenjuanId=")
											? (this.TEi = i[e].replace("wenjuanId=", ""))
											: i[e].includes("wenjuanTitle=")
												? (this.LEi = i[e].replace("wenjuanTitle=", ""))
												: i[e].includes("subTitle=")
													? (this.LEi = i[e].replace("subTitle=", ""))
													: i[e].includes("wenjuanPass=")
														? (this.PEi = i[e].replace("wenjuanPass=", ""))
														: (this.SEi = this.SEi.concat(i[e]));
	}
	GetUseDefaultBrowser() {
		return this.AEi;
	}
	GetIfShowNewMail() {
		return this.UEi;
	}
	GetText() {
		return this.MEi;
	}
	GetSubText() {
		return this.SEi;
	}
	GetQuestionPass() {
		return this.PEi;
	}
	GetSubTextIconId() {
		return this.EEi;
	}
	GetSubTextColor() {
		return this.yEi;
	}
	IsQuestionMail() {
		return this.REi;
	}
	GetQuestionUrl() {
		var e = ModelManager_1.ModelManager.LoginModel,
			i =
				CommonParamById_1.configCommonParamById.GetStringConfig(
					"mail_question_key",
				),
			t =
				((i =
					this.TEi +
					ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() +
					";" +
					e.GetServerId()?.toString() +
					i),
				(i = UE.KuroStaticLibrary.HashStringWithSHA1(i)),
				ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineByLanguageCode(
					LanguageSystem_1.LanguageSystem.PackageLanguage,
				).QuestionnaireId);
		return (
			`${this.DEi}?sojumpparm=${ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString()};${e.GetServerId()?.toString()}&parmsign=${i}&langv=` +
			t
		);
	}
	GetSubUrl() {
		return this.DEi;
	}
	GetSubTitle() {
		return this.LEi;
	}
	GetSubContentJumpId() {
		return this.IEi;
	}
	GetSender() {
		return this.Sender;
	}
	GetAttachmentInfo() {
		return this.AttachmentInfos;
	}
	GetOriginalDeadlineTimeStamp() {
		return this.OriginalDeadlineTimeStamp;
	}
	GetFinishedDeadlineTimeStamp() {
		return this.FinishedDeadlineTimeStamp;
	}
}
exports.MailData = MailData;
