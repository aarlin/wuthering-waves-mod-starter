"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeon = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt"),
	DicIntString_1 = require("./SubType/DicIntString"),
	DungeonEntrance_1 = require("./SubType/DungeonEntrance"),
	InstOnlineType_1 = require("./SubType/InstOnlineType");
class InstanceDungeon {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MapConfigId() {
		return this.mapconfigid();
	}
	get MapName() {
		return this.mapname();
	}
	get InstType() {
		return this.insttype();
	}
	get InstSubType() {
		return this.instsubtype();
	}
	get OnlineType() {
		return this.onlinetype();
	}
	get CustomTypes() {
		return GameUtils_1.GameUtils.ConvertToArray(this.customtypesLength(), (t) =>
			this.customtypes(t),
		);
	}
	get MiniMapId() {
		return this.minimapid();
	}
	get SubLevels() {
		return GameUtils_1.GameUtils.ConvertToArray(this.sublevelsLength(), (t) =>
			this.sublevels(t),
		);
	}
	get FightFormationId() {
		return this.fightformationid();
	}
	get TrialRoleInfo() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.trialroleinfoLength(),
			(t) => this.trialroleinfo(t),
		);
	}
	get TrialRoleFormation() {
		return this.trialroleformation();
	}
	get ReviveId() {
		return this.reviveid();
	}
	get BornPosition() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.bornpositionLength(),
			(t) => this.bornposition(t),
		);
	}
	get BornRotation() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.bornrotationLength(),
			(t) => this.bornrotation(t),
		);
	}
	get RecoverWorldLocation() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.recoverworldlocationLength(),
			(t) => this.recoverworldlocation(t),
		);
	}
	get EntranceEntities() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.entranceentitiesLength(),
			(t) => this.entranceentities(t),
		);
	}
	get ExitEntities() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.exitentitiesLength(),
			(t) => this.exitentities(t),
		);
	}
	get DungeonDesc() {
		return this.dungeondesc();
	}
	get Title() {
		return this.title();
	}
	get BannerPath() {
		return this.bannerpath();
	}
	get MonsterPreview() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.monsterpreviewLength(),
			(t) => this.monsterpreview(t),
		);
	}
	get MonsterTips() {
		return this.monstertips();
	}
	get FirstRewardId() {
		return this.firstrewardid();
	}
	get RewardId() {
		return this.rewardid();
	}
	get RepeatRewardId() {
		return this.repeatrewardid();
	}
	get EnterControlId() {
		return this.entercontrolid();
	}
	get EnterCondition() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.enterconditionLength(),
			(t) => this.entercondition(t),
		);
	}
	get EnterConditionText() {
		return this.enterconditiontext();
	}
	get DifficultyIcon() {
		return this.difficultyicon();
	}
	get EntityLevel() {
		return this.entitylevel();
	}
	get RecommendLevel() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.recommendlevelLength(),
			(t) => this.recommendlevel(t)?.key(),
			(t) => this.recommendlevel(t)?.value(),
		);
	}
	get RecommendRole() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.recommendroleLength(),
			(t) => this.recommendrole(t),
		);
	}
	get RecommendElement() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.recommendelementLength(),
			(t) => this.recommendelement(t),
		);
	}
	get ShareAttri() {
		return this.shareattri();
	}
	get LimitViewName() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.limitviewnameLength(),
			(t) => this.limitviewname(t),
		);
	}
	get CanUseItem() {
		return this.canuseitem();
	}
	get GuideType() {
		return this.guidetype();
	}
	get GuideValue() {
		return this.guidevalue();
	}
	get SettleButtonType() {
		return this.settlebuttontype();
	}
	get SubTitle() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.subtitleLength(),
			(t) => this.subtitle(t)?.key(),
			(t) => this.subtitle(t)?.value(),
		);
	}
	get SubInstanceTitle() {
		return this.subinstancetitle();
	}
	get AutoLeaveTime() {
		return this.autoleavetime();
	}
	get LimitTime() {
		return this.limittime();
	}
	get LeaveWaitTime() {
		return this.leavewaittime();
	}
	get FailTips() {
		return this.failtips();
	}
	get VerifyCreatureGen() {
		return this.verifycreaturegen();
	}
	get DifficultyLevel() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.difficultylevelLength(),
			(t) => this.difficultylevel(t),
		);
	}
	get DifficultyDesc() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.difficultydescLength(),
			(t) => this.difficultydesc(t),
		);
	}
	get Drop() {
		return GameUtils_1.GameUtils.ConvertToArray(this.dropLength(), (t) =>
			this.drop(t),
		);
	}
	get EnterCount() {
		return this.entercount();
	}
	get EnterConditionGroup() {
		return this.enterconditiongroup();
	}
	get IconTagPath() {
		return this.icontagpath();
	}
	get RenderSettings() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.rendersettingsLength(),
			(t) => this.rendersettings(t)?.key(),
			(t) => this.rendersettings(t)?.value(),
		);
	}
	get DropVisionLimit() {
		return this.dropvisionlimit();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsInstanceDungeon(t, i) {
		return (i || new InstanceDungeon()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapconfigid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapname(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	insttype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	instsubtype() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	onlinetype() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? this.J7.readInt8(this.z7 + t)
			: InstOnlineType_1.InstOnlineType.Single;
	}
	GetCustomtypesAt(t) {
		return this.customtypes(t);
	}
	customtypes(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	customtypesLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	customtypesArray() {
		var t = this.J7.__offset(this.z7, 16);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	minimapid() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	GetSublevelsAt(t) {
		return this.sublevels(t);
	}
	sublevels(t, i) {
		var s = this.J7.__offset(this.z7, 20);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	sublevelsLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	fightformationid() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	GetTrialroleinfoAt(t) {
		return this.trialroleinfo(t);
	}
	trialroleinfo(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	trialroleinfoLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	trialroleinfoArray() {
		var t = this.J7.__offset(this.z7, 24);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	trialroleformation() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reviveid() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBornpositionAt(t) {
		return this.bornposition(t);
	}
	bornposition(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	bornpositionLength() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	bornpositionArray() {
		var t = this.J7.__offset(this.z7, 30);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetBornrotationAt(t) {
		return this.bornrotation(t);
	}
	bornrotation(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	bornrotationLength() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	bornrotationArray() {
		var t = this.J7.__offset(this.z7, 32);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetRecoverworldlocationAt(t) {
		return this.recoverworldlocation(t);
	}
	recoverworldlocation(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	recoverworldlocationLength() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	recoverworldlocationArray() {
		var t = this.J7.__offset(this.z7, 34);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetEntranceentitiesAt(t, i) {
		return this.entranceentities(t);
	}
	entranceentities(t, i) {
		var s = this.J7.__offset(this.z7, 36);
		return s
			? (i || new DungeonEntrance_1.DungeonEntrance()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	entranceentitiesLength() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetExitentitiesAt(t) {
		return this.exitentities(t);
	}
	exitentities(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	exitentitiesLength() {
		var t = this.J7.__offset(this.z7, 38);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	exitentitiesArray() {
		var t = this.J7.__offset(this.z7, 38);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	dungeondesc(t) {
		var i = this.J7.__offset(this.z7, 40);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	title() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.readInt32(this.z7 + t) : 999;
	}
	bannerpath(t) {
		var i = this.J7.__offset(this.z7, 44);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetMonsterpreviewAt(t) {
		return this.monsterpreview(t);
	}
	monsterpreview(t) {
		var i = this.J7.__offset(this.z7, 46);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	monsterpreviewLength() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	monsterpreviewArray() {
		var t = this.J7.__offset(this.z7, 46);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	monstertips(t) {
		var i = this.J7.__offset(this.z7, 48);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	firstrewardid() {
		var t = this.J7.__offset(this.z7, 50);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rewardid() {
		var t = this.J7.__offset(this.z7, 52);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	repeatrewardid() {
		var t = this.J7.__offset(this.z7, 54);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entercontrolid() {
		var t = this.J7.__offset(this.z7, 56);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetEnterconditionAt(t) {
		return this.entercondition(t);
	}
	entercondition(t) {
		var i = this.J7.__offset(this.z7, 58);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	enterconditionLength() {
		var t = this.J7.__offset(this.z7, 58);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	enterconditionArray() {
		var t = this.J7.__offset(this.z7, 58);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	enterconditiontext(t) {
		var i = this.J7.__offset(this.z7, 60);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	difficultyicon(t) {
		var i = this.J7.__offset(this.z7, 62);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	entitylevel() {
		var t = this.J7.__offset(this.z7, 64);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRecommendlevelAt(t, i) {
		return this.recommendlevel(t);
	}
	recommendlevel(t, i) {
		var s = this.J7.__offset(this.z7, 66);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	recommendlevelLength() {
		var t = this.J7.__offset(this.z7, 66);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetRecommendroleAt(t) {
		return this.recommendrole(t);
	}
	recommendrole(t) {
		var i = this.J7.__offset(this.z7, 68);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	recommendroleLength() {
		var t = this.J7.__offset(this.z7, 68);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	recommendroleArray() {
		var t = this.J7.__offset(this.z7, 68);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetRecommendelementAt(t) {
		return this.recommendelement(t);
	}
	recommendelement(t) {
		var i = this.J7.__offset(this.z7, 70);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	recommendelementLength() {
		var t = this.J7.__offset(this.z7, 70);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	recommendelementArray() {
		var t = this.J7.__offset(this.z7, 70);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	shareattri() {
		var t = this.J7.__offset(this.z7, 72);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	GetLimitviewnameAt(t) {
		return this.limitviewname(t);
	}
	limitviewname(t, i) {
		var s = this.J7.__offset(this.z7, 74);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	limitviewnameLength() {
		var t = this.J7.__offset(this.z7, 74);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	canuseitem() {
		var t = this.J7.__offset(this.z7, 76);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	guidetype() {
		var t = this.J7.__offset(this.z7, 78);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	guidevalue() {
		var t = this.J7.__offset(this.z7, 80);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	settlebuttontype() {
		var t = this.J7.__offset(this.z7, 82);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	GetSubtitleAt(t, i) {
		return this.subtitle(t);
	}
	subtitle(t, i) {
		var s = this.J7.__offset(this.z7, 84);
		return s
			? (i || new DicIntString_1.DicIntString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	subtitleLength() {
		var t = this.J7.__offset(this.z7, 84);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	subinstancetitle(t) {
		var i = this.J7.__offset(this.z7, 86);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	autoleavetime() {
		var t = this.J7.__offset(this.z7, 88);
		return t ? this.J7.readInt32(this.z7 + t) : 300;
	}
	limittime() {
		var t = this.J7.__offset(this.z7, 90);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	leavewaittime() {
		var t = this.J7.__offset(this.z7, 92);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	failtips(t) {
		var i = this.J7.__offset(this.z7, 94);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	verifycreaturegen() {
		var t = this.J7.__offset(this.z7, 96);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	GetDifficultylevelAt(t) {
		return this.difficultylevel(t);
	}
	difficultylevel(t) {
		var i = this.J7.__offset(this.z7, 98);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	difficultylevelLength() {
		var t = this.J7.__offset(this.z7, 98);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	difficultylevelArray() {
		var t = this.J7.__offset(this.z7, 98);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetDifficultydescAt(t) {
		return this.difficultydesc(t);
	}
	difficultydesc(t, i) {
		var s = this.J7.__offset(this.z7, 100);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	difficultydescLength() {
		var t = this.J7.__offset(this.z7, 100);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetDropAt(t) {
		return this.drop(t);
	}
	drop(t) {
		var i = this.J7.__offset(this.z7, 102);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	dropLength() {
		var t = this.J7.__offset(this.z7, 102);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	dropArray() {
		var t = this.J7.__offset(this.z7, 102);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	entercount() {
		var t = this.J7.__offset(this.z7, 104);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	enterconditiongroup() {
		var t = this.J7.__offset(this.z7, 106);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icontagpath(t) {
		var i = this.J7.__offset(this.z7, 108);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetRendersettingsAt(t, i) {
		return this.rendersettings(t);
	}
	rendersettings(t, i) {
		var s = this.J7.__offset(this.z7, 110);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	rendersettingsLength() {
		var t = this.J7.__offset(this.z7, 110);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	dropvisionlimit() {
		var t = this.J7.__offset(this.z7, 112);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.InstanceDungeon = InstanceDungeon;
//# sourceMappingURL=InstanceDungeon.js.map
