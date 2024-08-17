"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QualityInfo = void 0);
class QualityInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get TextColor() {
		return this.textcolor();
	}
	get DropColor() {
		return this.dropcolor();
	}
	get FrameIconColor() {
		return this.frameiconcolor();
	}
	get BackgroundColor() {
		return this.backgroundcolor();
	}
	get PhantomColor() {
		return this.phantomcolor();
	}
	get GachaQualityNiagara() {
		return this.gachaqualityniagara();
	}
	get TipQualityTexture() {
		return this.tipqualitytexture();
	}
	get GachaQualityTexture() {
		return this.gachaqualitytexture();
	}
	get GachaBgTexture() {
		return this.gachabgtexture();
	}
	get BackgroundSprite() {
		return this.backgroundsprite();
	}
	get VerticalGradientSprite() {
		return this.verticalgradientsprite();
	}
	get TipsSprite() {
		return this.tipssprite();
	}
	get SpecialEffects() {
		return this.specialeffects();
	}
	get DissipateEffects() {
		return this.dissipateeffects();
	}
	get NewItemGetEffects() {
		return this.newitemgeteffects();
	}
	get ConsumeFilterText() {
		return this.consumefiltertext();
	}
	get PayShopTexture() {
		return this.payshoptexture();
	}
	get NewPayShopTexture() {
		return this.newpayshoptexture();
	}
	get PayShopQualitySprite() {
		return this.payshopqualitysprite();
	}
	get PhantomSprite() {
		return this.phantomsprite();
	}
	get DropItemQualityNiagaraPath() {
		return this.dropitemqualityniagarapath();
	}
	get MediumItemGridQualitySpritePath() {
		return this.mediumitemgridqualityspritepath();
	}
	get QualityColor() {
		return this.qualitycolor();
	}
	get RouletteTipsQualityTexPath() {
		return this.roulettetipsqualitytexpath();
	}
	get AcquireQualityTexPath() {
		return this.acquirequalitytexpath();
	}
	get AcquireNewItemQualityTexPath() {
		return this.acquirenewitemqualitytexpath();
	}
	get AcquireQualitySpritePath() {
		return this.acquirequalityspritepath();
	}
	get FilterIconPath() {
		return this.filtericonpath();
	}
	get CalabashLevelUpViewShowText() {
		return this.calabashlevelupviewshowtext();
	}
	get UnlockVisionQuality() {
		return this.unlockvisionquality();
	}
	get UnlockVisionQualityColor() {
		return this.unlockvisionqualitycolor();
	}
	get TrainingWeight() {
		return this.trainingweight();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsQualityInfo(t, i) {
		return (i || new QualityInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	textcolor(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	dropcolor(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	frameiconcolor(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	backgroundcolor(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	phantomcolor(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	gachaqualityniagara(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tipqualitytexture(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	gachaqualitytexture(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	gachabgtexture(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	backgroundsprite(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	verticalgradientsprite(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tipssprite(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	specialeffects(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	dissipateeffects(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	newitemgeteffects(t) {
		var i = this.J7.__offset(this.z7, 36);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	consumefiltertext(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	payshoptexture(t) {
		var i = this.J7.__offset(this.z7, 40);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	newpayshoptexture(t) {
		var i = this.J7.__offset(this.z7, 42);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	payshopqualitysprite(t) {
		var i = this.J7.__offset(this.z7, 44);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	phantomsprite(t) {
		var i = this.J7.__offset(this.z7, 46);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	dropitemqualityniagarapath(t) {
		var i = this.J7.__offset(this.z7, 48);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	mediumitemgridqualityspritepath(t) {
		var i = this.J7.__offset(this.z7, 50);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	qualitycolor(t) {
		var i = this.J7.__offset(this.z7, 52);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	roulettetipsqualitytexpath(t) {
		var i = this.J7.__offset(this.z7, 54);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	acquirequalitytexpath(t) {
		var i = this.J7.__offset(this.z7, 56);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	acquirenewitemqualitytexpath(t) {
		var i = this.J7.__offset(this.z7, 58);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	acquirequalityspritepath(t) {
		var i = this.J7.__offset(this.z7, 60);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	filtericonpath(t) {
		var i = this.J7.__offset(this.z7, 62);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	calabashlevelupviewshowtext(t) {
		var i = this.J7.__offset(this.z7, 64);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	unlockvisionquality(t) {
		var i = this.J7.__offset(this.z7, 66);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	unlockvisionqualitycolor(t) {
		var i = this.J7.__offset(this.z7, 68);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	trainingweight() {
		var t = this.J7.__offset(this.z7, 70);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
}
exports.QualityInfo = QualityInfo;
//# sourceMappingURL=QualityInfo.js.map
