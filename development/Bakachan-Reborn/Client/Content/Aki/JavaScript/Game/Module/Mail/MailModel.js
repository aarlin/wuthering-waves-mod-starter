"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailModel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	MailInstance_1 = require("./MailInstance"),
	MailAttachmentData_1 = require("./Views/MailAttachmentData"),
	ID_SHOW_LENGTH = 3;
class MailModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.kQ = new Map()),
			(this.wEi = []),
			(this.BEi = ""),
			(this.bEi = new Set()),
			(this.qEi = new Map()),
			(this.LastTimeShowNewMailTipsTime = 0),
			(this.GEi = []),
			(this.NEi = void 0),
			(this.MailSort = (e, t) =>
				e.GetWasScanned() !== t.GetWasScanned()
					? e.GetWasScanned()
						? 1
						: -1
					: e.GetAttachmentStatus() !== t.GetAttachmentStatus()
						? e.GetAttachmentStatus() < t.GetAttachmentStatus()
							? 1
							: -1
						: e.GetMailLevel() !== t.GetMailLevel()
							? e.GetMailLevel() < t.GetMailLevel()
								? 1
								: -1
							: e.GetReceiveTime() === t.GetReceiveTime() ||
									e.GetReceiveTime() < t.GetReceiveTime()
								? 1
								: -1);
	}
	OEi(e) {
		if (e.GetWasScanned() && 2 !== e.GetAttachmentStatus()) {
			if (!this.bEi.has(e.Id))
				return void EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SwitchUnfinishedFlag,
				);
			this.bEi.delete(e.Id);
		} else {
			if (this.bEi.has(e.Id))
				return void EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SwitchUnfinishedFlag,
				);
			this.bEi.add(e.Id);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.SwitchUnfinishedFlag,
		);
	}
	GetRedDotCouldLightOn() {
		return (
			0 < this.bEi.size &&
			ModelManager_1.ModelManager.MailModel.CheckOpenCondition()
		);
	}
	UnScannedRedPoint() {
		if (!ModelManager_1.ModelManager.MailModel.CheckOpenCondition()) return !1;
		let e = !1;
		if (0 < this.kQ.size)
			for (const t of this.kQ.values())
				if (!t.GetWasScanned()) {
					e = !0;
					break;
				}
		return e;
	}
	GetRedDotImportant() {
		if (!ModelManager_1.ModelManager.MailModel.CheckOpenCondition()) return !1;
		let e = !1;
		if (0 < this.bEi.size)
			for (const t of this.bEi.values())
				if (2 === this.GetMailInstanceById(t).GetMailLevel()) {
					e = !0;
					break;
				}
		return e;
	}
	GetLastPickedAttachments() {
		var e = [];
		for (const i of this.GEi) {
			var t = [{ IncId: 0, ItemId: i.GetItemId() }, i.GetCount()];
			e.push(t);
		}
		return e;
	}
	SetLastPickedAttachments(e, t) {
		this.ClearLastPickedAttachments();
		const i = new Map();
		for (const t of Object.keys(e)) {
			var a = this.GetMailInstanceById(t);
			a.GetAttachmentInfo().forEach((e) => {
				var t = i.get(e.Ekn);
				t = e.I5n + (t ?? 0);
				i.set(e.Ekn, t);
			}),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Mail", 28, "邮件数据：领取邮件奖励", ["key", t]),
				this.SetMailStatusByStatusCode(e[t], a);
		}
		i.forEach((e, t) => {
			this.GEi.push(new MailAttachmentData_1.MailAttachmentData(t, e, !0));
		}),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PickingAttachment,
				t,
			);
	}
	ClearLastPickedAttachments() {
		this.GEi = [];
	}
	GetCurrentSelectMailId() {
		return this.BEi;
	}
	SetCurrentSelectMailId(e) {
		this.BEi = e;
	}
	OpenWebBrowser(e) {
		e && "" !== e && UE.KismetSystemLibrary.LaunchURL(e);
	}
	ReloadMailList() {
		(this.wEi.length = 0),
			this.kQ.forEach((e) => {
				this.wEi.push(e);
			}),
			this.wEi.sort(this.MailSort);
	}
	GetMailList() {
		return this.wEi;
	}
	kEi(e) {
		this.kQ.set(e.Id, e);
	}
	DeleteMail(e) {
		this.GetMailInstanceById(e) &&
			(this.bEi.has(e) &&
				(this.bEi.delete(e),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.SwitchUnfinishedFlag,
				)),
			this.kQ.delete(e),
			this.ReloadMailList());
	}
	GetMailListLength() {
		return this.kQ.size;
	}
	GetMailInstanceById(e) {
		return this.kQ.get(e);
	}
	AddMail(e, t = !0) {
		this.kQ.size >= this.GetMailCapacity() &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error("Mail", 28, "后端新增邮件时超出容量！"),
			this.FEi(e),
			t && this.ReloadMailList();
	}
	OnMailInfoSynced(e) {
		for (const i of e.bAs) {
			ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
				ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("Mail", 28, "[MailError]MailBox is fulfilled");
			var t = new Protocol_1.Aki.Protocol.PNs(i);
			this.AddMail(t, !1);
		}
		this.ReloadMailList();
	}
	GetMailCapacity() {
		var e;
		return (
			this.NEi ||
			((e = ConfigManager_1.ConfigManager.MailConfig.GetMailSize())
				? ((this.NEi = e), this.NEi)
				: 0)
		);
	}
	VEi(e) {
		(e = new Date(e * TimeUtil_1.TimeUtil.InverseMillisecond)),
			(e = TimeUtil_1.TimeUtil.DateFormat4(e));
		let t = 1;
		return (
			this.qEi.has(e) && ((t = this.qEi.get(e)), t++),
			this.qEi.set(e, t),
			" " + e + " " + this.HEi(t, 3)
		);
	}
	HEi(e, t) {
		return (Array(t).join("0") + (e % Math.pow(10, t))).slice(-t);
	}
	FEi(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Mail", 28, "邮件数据：创建邮件 ", [
				"mailInformation.Proto_Id",
				e.Ekn,
			]);
		var t = e.ckn,
			i = new MailInstance_1.MailData(),
			a =
				(ObjectUtils_1.ObjectUtils.CopyValue(e, i),
				(i.Id = e.Ekn),
				(i.ConfigId = e.R5n),
				e.RAs);
		(i.Time = a.low),
			(i.Level = e.r3n),
			(i.Title = e.AAs),
			i.SetText(e.H3n),
			(i.Sender = e.PAs),
			(i.ValidTime = e.UAs),
			(i.FinishValidTime = e.wAs),
			(i.AttachmentInfos = e.xAs),
			(i.OriginalDeadlineTimeStamp = a.low + e.UAs),
			(i.FinishedDeadlineTimeStamp =
				0 < MathUtils_1.MathUtils.LongToNumber(e.RAs) ? e.wAs + a.low : 0),
			this.jEi(i),
			this.kEi(i),
			this.SetMailStatusByStatusCode(t, i),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Mail",
					28,
					"邮件数据：创建邮件成功： ",
					["newMail.Id", i.Id],
					["title", i.Title],
				);
	}
	IfNeedShowNewMail() {
		var e =
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
			) ?? new Map();
		for (const t of this.kQ)
			if (t[1].GetIfShowNewMail() && !e.get(t[0])) return !0;
		return !1;
	}
	SaveShowNewMailMap() {
		var e =
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
			) ?? new Map();
		for (const t of this.kQ) e.set(t[0], !0);
		LocalStorage_1.LocalStorage.SetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
			e,
		);
	}
	RefreshLocalNewMailMap() {
		var e =
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
			) ?? new Map();
		for (const t of e) this.kQ.has(t[0]) || e.delete(t[0]);
		for (const t of this.kQ)
			t[1].GetIfShowNewMail() && !e.get(t[0]) && e.set(t[0], !1);
		LocalStorage_1.LocalStorage.SetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
			e,
		);
	}
	jEi(e) {
		var t;
		(4 !== e.ConfigId && 6 !== e.ConfigId) ||
			((t = this.VEi(e.Time)), (e.Title = e.Title + t));
	}
	SetMailStatusByStatusCode(e, t) {
		var i = 1 & e;
		e &= 2;
		let a = 0;
		0 === t.AttachmentInfos.length
			? (a = 0)
			: 0 < t.AttachmentInfos.length && (a = e ? 1 : 2),
			t.SetWasScanned(i),
			t.SetAttachmentStatus(a),
			1 == i && t.UpdateValidTimeWhenReadMail(),
			this.OEi(t),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Mail",
					28,
					"邮件数据：邮件状态改变",
					["SetMailStatusByStatusCode:", a],
					["id:", t.Id],
					["scanned:", i],
					["taken:", e],
					["this.UnFinishedMailSet.length", this.bEi?.size],
				);
	}
	CheckOpenCondition() {
		return ModelManager_1.ModelManager.FunctionModel.IsOpen(10020);
	}
	GetMailFilterConfigData(e) {
		return ConfigManager_1.ConfigManager.MailConfig.GetMailFilterConfigById(e);
	}
	GetImportantMails(e) {
		return (e ?? this.GetMailList()).filter((e) => 2 === e.GetMailLevel());
	}
	GetUnScanMails(e) {
		return (e ?? this.GetMailList()).filter((e) => !e.GetWasScanned());
	}
}
exports.MailModel = MailModel;
