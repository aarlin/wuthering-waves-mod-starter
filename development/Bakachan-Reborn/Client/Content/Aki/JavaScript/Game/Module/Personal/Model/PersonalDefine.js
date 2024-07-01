"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalInfoData =
		exports.RoleShowEntry =
		exports.CardShowEntry =
		exports.MAX_NAME_LENGTH =
		exports.MAX_SIGN_LENGTH =
			void 0),
	(exports.MAX_SIGN_LENGTH = 40),
	(exports.MAX_NAME_LENGTH = 12);
class CardShowEntry {
	constructor(t, s) {
		(this.CardId = t), (this.IsRead = s);
	}
}
exports.CardShowEntry = CardShowEntry;
class RoleShowEntry {
	constructor(t, s) {
		(this.l3n = t), (this.r3n = s);
	}
}
exports.RoleShowEntry = RoleShowEntry;
class PersonalInfoData {
	constructor() {
		(this.RoleShowList = []),
			(this.CardShowList = []),
			(this.CurCardId = void 0),
			(this.Birthday = 0),
			(this.IsBirthdayDisplay = !1),
			(this.CardUnlockList = []),
			(this.Signature = ""),
			(this.HeadPhotoId = void 0),
			(this.IsOtherData = !1),
			(this.Level = 0),
			(this.WorldLevel = 0),
			(this.Name = ""),
			(this.PlayerId = 0);
	}
}
exports.PersonalInfoData = PersonalInfoData;
