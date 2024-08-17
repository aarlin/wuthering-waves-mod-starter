"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceMotionSelectData =
		exports.AdviceSelectItemData =
		exports.AdviceEntityData =
		exports.AdviceContentData =
		exports.LogAdviceData =
		exports.AdviceData =
			void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager");
class AdviceData {
	constructor() {
		(this.u8e = void 0),
			(this.c8e = 0),
			(this.m8e = 0),
			(this.d8e = new Array()),
			(this.C8e = 0),
			(this.g8e = 0),
			(this.f8e = ""),
			(this.p8e = "");
	}
	Phrase(e) {
		(this.u8e = MathUtils_1.MathUtils.LongToBigInt(e.Ekn)),
			(this.c8e = e.wFn),
			this.PhraseUpDownData(e.Tgs),
			(this.d8e = new Array()),
			e.E3n.forEach((e) => {
				var t = new AdviceContentData();
				t.Phrase(e), this.d8e.push(t);
			}),
			this.PhraseContentInfo(this.d8e);
	}
	PhraseData(e) {
		(this.d8e = new Array()),
			e.forEach((e) => {
				var t = new AdviceContentData();
				t.PhraseData(e), this.d8e.push(t);
			}),
			this.PhraseContentInfo(this.d8e);
	}
	PhraseUpDownData(e) {
		this.m8e = e;
	}
	PhraseContentInfo(e) {
		this.p8e = LanguageSystem_1.LanguageSystem.PackageLanguage;
		const t = new StringBuilder_1.StringBuilder();
		e.forEach((e) => {
			switch (e.GetType()) {
				case Protocol_1.Aki.Protocol.FBs.Proto_Sentence:
					{
						var i =
							ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
								e.GetId(),
							).split("{}");
						let n = 0;
						i.forEach((i) => {
							t.Append(i),
								0 === n &&
									((i =
										ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(
											e.GetWord(),
										)),
									t.Append(i)),
								n++;
						});
					}
					break;
				case Protocol_1.Aki.Protocol.FBs.Proto_Conjunction:
					(i =
						ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
							e.GetId(),
						)),
						t.Append(i);
					break;
				case Protocol_1.Aki.Protocol.FBs.Proto_Expression:
					this.C8e = e.GetId();
					break;
				case Protocol_1.Aki.Protocol.FBs.y3n:
					this.g8e = e.GetId();
			}
		}),
			(this.f8e = t.ToString());
	}
	PhraseShowText(e, t = 0) {
		this.p8e = LanguageSystem_1.LanguageSystem.PackageLanguage;
		var i = new StringBuilder_1.StringBuilder(),
			n = e.length;
		for (let d = 0; d < n; d++) {
			var a = e[d],
				o = a.GetType();
			if (o === Protocol_1.Aki.Protocol.FBs.Proto_Sentence) {
				var r,
					s = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
						a.GetId(),
					).split("{}"),
					c = s.length;
				for (let e = 0; e < c; e++)
					if ((i.Append(s[e]), 0 === e)) {
						let e = "";
						0 < a.GetWord()
							? ((r =
									ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceTemplateText()),
								(e =
									ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(
										a.GetWord(),
									)),
								(r = r.replace("{0}", e)),
								i.Append(r))
							: ((e =
									0 === t
										? ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCreateText(
												0,
											)
										: ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCreateText(
												2,
											)),
								i.Append(e));
					}
			} else if (o === Protocol_1.Aki.Protocol.FBs.Proto_Conjunction) {
				let e = "";
				0 < a.GetId()
					? ((o =
							ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceTemplateText()),
						(e =
							ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
								a.GetId(),
							)),
						(o = o.replace("{0}", e)),
						i.Append(o))
					: ((e =
							ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCreateText(
								1,
							)),
						i.Append(e));
			}
		}
		this.f8e = i.ToString();
	}
	GetAdviceShowText() {
		return (
			this.p8e !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
				this.PhraseContentInfo(this.d8e),
			this.f8e
		);
	}
	GetAdviceId() {
		return MathUtils_1.MathUtils.BigIntToLong(this.u8e);
	}
	GetAdviceBigId() {
		return this.u8e;
	}
	GetAreaId() {
		return this.c8e;
	}
	GetVote() {
		let e = this.m8e;
		var t;
		return (
			e <= 0
				? (e = 0)
				: e >=
						(t =
							ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceLikeShowMax()) &&
					(e = t),
			e
		);
	}
	GetAdviceContentData() {
		return this.d8e;
	}
	GetAdviceExpressionId() {
		return this.C8e;
	}
	GetAdviceMotionId() {
		return this.g8e;
	}
}
exports.AdviceData = AdviceData;
class LogAdviceData {
	constructor() {
		(this.id = 0), (this.word = 0), (this.type = 0);
	}
	Phrase(e) {
		(this.id = e.GetId()), (this.word = e.GetWord()), (this.type = e.GetType());
	}
}
exports.LogAdviceData = LogAdviceData;
class AdviceContentData {
	constructor() {
		(this.xe = 0), (this.v8e = 0), (this.S9 = void 0);
	}
	Phrase(e) {
		(this.xe = e.Ekn), (this.v8e = e.I3n), (this.S9 = e.Ikn);
	}
	PhraseData(e) {
		e instanceof AdviceContentData
			? ((this.xe = e.xe), (this.v8e = e.v8e), (this.S9 = e.S9))
			: e instanceof Protocol_1.Aki.Protocol.NBs &&
				((this.xe = e.Ekn), (this.v8e = e.I3n), (this.S9 = e.Ikn));
	}
	SetData(e, t, i) {
		(this.xe = e), (this.v8e = t), (this.S9 = i);
	}
	GetId() {
		return this.xe;
	}
	GetWord() {
		return this.v8e;
	}
	GetType() {
		return this.S9;
	}
	ConvertToPb() {
		var e = new Protocol_1.Aki.Protocol.NBs();
		return (e.Ekn = this.xe), (e.Ikn = this.S9), (e.I3n = this.v8e), e;
	}
}
exports.AdviceContentData = AdviceContentData;
class AdviceEntityData {
	constructor() {
		(this.j8 = 0), (this.M8e = ""), (this.S8e = void 0);
	}
	Phrase(e) {
		(this.S8e = new AdviceData()),
			(this.j8 = e.aFn),
			(this.M8e = e.Rgs),
			this.S8e.Phrase(e.Lgs);
	}
	PhraseVote(e) {
		this.S8e.PhraseUpDownData(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAdviceEntityNotify,
			);
	}
	PhraseContent(e) {
		this.S8e.PhraseData(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAdviceEntityNotify,
			);
	}
	GetPlayerId() {
		return this.j8;
	}
	GetPlayerName() {
		return this.M8e;
	}
	GetAdviceData() {
		return this.S8e;
	}
}
exports.AdviceEntityData = AdviceEntityData;
class AdviceSelectItemData {
	constructor(e) {
		this.Xy = e;
	}
	GetIndex() {
		return this.Xy;
	}
}
exports.AdviceSelectItemData = AdviceSelectItemData;
class AdviceMotionSelectData {
	constructor(e) {
		this.Xy = e;
	}
	GetIndex() {
		return this.Xy;
	}
}
exports.AdviceMotionSelectData = AdviceMotionSelectData;
