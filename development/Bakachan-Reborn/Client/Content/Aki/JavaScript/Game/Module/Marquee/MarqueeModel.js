"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarqueeModel =
		exports.MarqueeStorageData =
		exports.MarqueeDatas =
		exports.MarqueeData =
		exports.MarqueeContent =
		exports.MarqueeDataEx =
			void 0);
const Json_1 = require("../../../Core/Common/Json"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	MARQUEEPLATFORMPC = 1,
	MARQUEEPLATFORMIOS = 2,
	MARQUEEPLATFORMANDROID = 3;
class MarqueeDataEx extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.id = 0),
			(this.contents = void 0),
			(this.timeInterval = 0),
			(this.times = 0),
			(this.startTimeMs = -0),
			(this.endTimeMs = -0),
			(this.whiteList = void 0),
			(this.platform = void 0),
			(this.channel = void 0);
	}
}
exports.MarqueeDataEx = MarqueeDataEx;
class MarqueeContent {
	constructor() {
		(this.language = ""), (this.content = "");
	}
}
exports.MarqueeContent = MarqueeContent;
class MarqueeData {
	constructor() {
		(this.Id = ""),
			(this.WhiteLists = void 0),
			(this.ModifyTime = -0),
			(this.Content = ""),
			(this.Contents = void 0),
			(this.BeginTime = -0),
			(this.EndTime = -0),
			(this.ScrollInterval = 0),
			(this.ScrollTimes = 0),
			(this.ShowInFight = 0),
			(this.ShowInPhotograph = 0),
			(this.Platform = void 0),
			(this.Channel = void 0);
	}
	RefreshContent() {
		if (this.Contents) {
			let e;
			for (const t of this.Contents.values())
				if (t.language === LanguageSystem_1.LanguageSystem.PackageLanguage) {
					e = t;
					break;
				}
			e && (this.Content = e.content),
				this.Content ||
					(this.Contents && 0 < this.Contents.length
						? (this.Content = this.Contents[0].content)
						: (this.Content = ""));
		}
	}
	Phrase(e) {
		(this.Id = e.id.toString()),
			(this.EndTime = e.endTimeMs / 1e3),
			(this.BeginTime = e.startTimeMs / 1e3),
			(this.WhiteLists = e.whiteList),
			(this.ScrollInterval = e.timeInterval),
			(this.ScrollTimes = e.times),
			(this.Contents = e.contents),
			this.RefreshContent(),
			(this.Platform = e.platform),
			(this.Channel = e.channel);
	}
	CheckPlatformAndChannelIfShow() {
		let e = "";
		if (
			(ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				(e =
					ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId()),
			this.Channel && 0 < this.Channel.length && !this.Channel.includes(e))
		)
			return !1;
		let t = 1;
		return (
			2 === ModelManager_1.ModelManager.PlatformModel.PlatformType
				? (t = 2)
				: 1 === ModelManager_1.ModelManager.PlatformModel.PlatformType &&
					(t = 3),
			!(this.Platform && 0 < this.Platform.length && !this.Platform.includes(t))
		);
	}
}
exports.MarqueeData = MarqueeData;
class MarqueeDatas {
	constructor() {
		this.MarqueeDataArray = void 0;
	}
}
exports.MarqueeDatas = MarqueeDatas;
class MarqueeStorageData {
	constructor(e) {
		(this.ScrollingTime = 0), (this.EndTime = 0), (this.EndTime = e);
	}
}
exports.MarqueeStorageData = MarqueeStorageData;
class MarqueeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.$Ui = void 0),
			(this.YUi = new Array()),
			(this.JUi = new Map());
	}
	static get TimerId() {
		return MarqueeModel.zUi;
	}
	static set TimerId(e) {
		MarqueeModel.zUi = e;
	}
	get CurMarquee() {
		return this.$Ui;
	}
	set CurMarquee(e) {
		this.$Ui = e;
	}
	get MarqueeQueue() {
		return this.YUi;
	}
	OnClear() {
		return (
			this.RemoveAllMarqueeData(),
			this.JUi.clear(),
			void 0 !== MarqueeModel.TimerId &&
				(TimerSystem_1.TimerSystem.Remove(MarqueeModel.TimerId),
				(MarqueeModel.TimerId = void 0)),
			!0
		);
	}
	InitMarqueeStorageDataMap() {
		this.JUi =
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.MarqueeScrollingMap,
			) ?? new Map();
	}
	AddOrUpdateMarqueeDate(e) {
		if (e.CheckPlatformAndChannelIfShow()) {
			var t = TimeUtil_1.TimeUtil.GetServerTime();
			if (!(e.EndTime <= t))
				if (!(this.GetScrollingTime(e) >= e.ScrollTimes)) {
					let r = -1;
					for (let t = 0; t < this.YUi.length; t++)
						this.YUi[t].Id === e.Id && (r = t);
					0 <= r
						? ((this.YUi[r] = e), 0 === r && (this.$Ui = e))
						: this.YUi.push(e),
						this.ZUi(e),
						this.CleanMarqueeStorageDataMap(t),
						this.eAi();
				}
		}
	}
	CleanMarqueeStorageDataMap(e) {
		var t,
			r,
			a = new Array();
		for ([t, r] of this.JUi) r.EndTime <= e && a.push(t);
		for (const e of a) this.JUi.delete(e);
	}
	UpdateMarqueeStorageDataByDate(e) {
		let t = this.GetMarqueeStorageData(e);
		(t = t || this.ZUi(e)).ScrollingTime++, this.eAi();
	}
	GetScrollingTime(e) {
		return this.GetMarqueeStorageData(e)?.ScrollingTime ?? 0;
	}
	GetMarqueeStorageData(e) {
		return this.JUi.get(e.Id);
	}
	ZUi(e) {
		let t = this.GetMarqueeStorageData(e);
		return (
			t
				? (t.EndTime = e.EndTime)
				: ((t = new MarqueeStorageData(e.EndTime)), this.JUi.set(e.Id, t)),
			t
		);
	}
	eAi() {
		LocalStorage_1.LocalStorage.SetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.MarqueeScrollingMap,
			this.JUi,
		);
	}
	PeekMarqueeData() {
		if (this.YUi && !(this.YUi.length <= 0)) return this.YUi[0];
	}
	GetNextMarquee() {
		if (this.YUi && !(this.YUi.length <= 1)) return this.YUi[1];
	}
	RemoveMarqueeData(e) {
		for (let r = 0; r < this.YUi.length; r++) {
			var t = this.YUi[r];
			if (t.Id === e) return this.YUi.splice(r, 1), t;
		}
	}
	RemoveAllMarqueeData() {
		(this.$Ui = void 0), (this.YUi = new Array());
	}
	SortMarqueeQueue() {
		this.YUi?.sort((e, t) => e.BeginTime - t.BeginTime);
	}
	GetMarqueeDataLeftTime(e) {
		let t = Number(e.EndTime) - TimeUtil_1.TimeUtil.GetServerTime();
		return t <= 0 ? 1 : t;
	}
}
(exports.MarqueeModel = MarqueeModel).zUi = void 0;
