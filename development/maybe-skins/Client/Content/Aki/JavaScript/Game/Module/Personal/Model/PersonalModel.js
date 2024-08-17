"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PersonalDefine_1 = require("./PersonalDefine");
class PersonalModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.UiCachePersonalData = void 0),
			(this.v4i = void 0);
	}
	OnInit() {
		return this.v4i || (this.v4i = new PersonalDefine_1.PersonalInfoData()), !0;
	}
	OnClear() {
		return !(this.v4i = void 0);
	}
	GetPersonalInfoData() {
		return this.v4i;
	}
	SetRoleShowList(e) {
		this.v4i.RoleShowList = [];
		var t = e.length;
		for (let n = 0; n < t; n++) {
			var i = e[n];
			this.v4i.RoleShowList.push(
				new PersonalDefine_1.RoleShowEntry(i.l3n, i.r3n),
			);
		}
	}
	UpdateRoleShowList(e) {
		this.v4i.RoleShowList = [];
		var t = e.length;
		for (let r = 0; r < t; r++) {
			var i = e[r],
				n =
					ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
						i,
					).GetLevelData();
			this.v4i.RoleShowList.push(
				new PersonalDefine_1.RoleShowEntry(i, n.GetLevel()),
			);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnRoleShowListChange,
		);
	}
	GetRoleShowList() {
		return this.v4i.RoleShowList;
	}
	SetCardShowList(e) {
		this.v4i.CardShowList = e;
	}
	GetCardShowList() {
		return this.v4i.CardShowList;
	}
	SetCurCardId(e) {
		(this.v4i.CurCardId = e),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCardChange);
	}
	GetCurCardId() {
		return this.v4i.CurCardId && 0 < this.v4i.CurCardId
			? this.v4i.CurCardId
			: ConfigManager_1.ConfigManager.FriendConfig.GetDefaultBackgroundCardId();
	}
	SetBirthday(e) {
		(this.v4i.Birthday = e),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBirthChange);
	}
	SetBirthdayDisplay(e) {
		(this.v4i.IsBirthdayDisplay = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnBirthDisplayChange,
			);
	}
	SetName(e) {
		this.v4i.Name = e;
	}
	SetPlayerId(e) {
		this.v4i.PlayerId = e;
	}
	GetBirthday() {
		return this.v4i.Birthday;
	}
	GetBirthdayDisplay() {
		return this.v4i.IsBirthdayDisplay;
	}
	SetSignature(e) {
		(this.v4i.Signature = e),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignChange);
	}
	GetSignature() {
		return this.v4i.Signature;
	}
	SetHeadPhotoId(e) {
		(this.v4i.HeadPhotoId = e),
			ModelManager_1.ModelManager.PlayerInfoModel.ChangeNumberProp(4, e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnHeadIconChange,
				e,
			);
	}
	GetHeadPhotoId() {
		var e;
		return (
			this.v4i.HeadPhotoId ||
				((e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4)),
				(this.v4i.HeadPhotoId = e)),
			this.v4i.HeadPhotoId
		);
	}
	SetCardUnlockList(e) {
		this.v4i.CardUnlockList = [];
		var t = e.length;
		for (let n = 0; n < t; n++) {
			var i = e[n];
			this.v4i.CardUnlockList.push(
				new PersonalDefine_1.CardShowEntry(i.l8n, i.cfs ?? !1),
			);
		}
	}
	UpdateCardUnlockList(e, t) {
		var i = this.v4i.CardUnlockList.length;
		for (let r = 0; r < i; r++) {
			var n = this.v4i.CardUnlockList[r];
			if (n.CardId === e) {
				(n.IsRead = t),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnPersonalCardRead,
						e,
					);
				break;
			}
		}
	}
	AddCardUnlockList(e, t) {
		this.v4i.CardUnlockList.push(new PersonalDefine_1.CardShowEntry(e, t));
	}
	GetCardUnlockList() {
		return this.v4i.CardUnlockList;
	}
	GetCardUnlockData(e) {
		for (const t of this.v4i.CardUnlockList) if (t.CardId === e) return t;
	}
	SetLevel(e) {
		this.v4i.Level = e;
	}
	SetWorldLevel(e) {
		this.v4i.WorldLevel = e;
	}
}
exports.PersonalModel = PersonalModel;
