"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelExperienceComponent = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	ExpTweenComponent_1 = require("./ExpTween/ExpTweenComponent"),
	LevelSequencePlayer_1 = require("./LevelSequencePlayer");
class LevelExperienceComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i = !1) {
		super(),
			(this.ParentTemp = t),
			(this.IsAddUp = i),
			(this.ArrivedLevel = 0),
			(this.ArrivedFillAmount = 0),
			(this.ArrivedExp = 0),
			(this.MaxExpCacheMap = new Map()),
			(this.GetMaxExpFunction = void 0),
			(this.NextItem = void 0),
			(this.NextLevelText = void 0),
			(this.CurrentLevelText = void 0),
			(this.AddExp = void 0),
			(this.ExpText = void 0),
			(this.MaxItem = void 0),
			(this.CurrentMaxItem = void 0),
			(this.NextLevelArrow = void 0),
			(this.ExpTweenComponent = void 0),
			(this.ExpTweenFinishFunction = void 0),
			(this.CurrentLevel = 0),
			(this.CurrentExp = 0),
			(this.CurrentMaxExp = 0),
			(this.CurrentMaxLevel = 0),
			(this.LimitLevel = 0),
			(this.FrontExp = 0),
			(this.NeedPreviewTween = !0),
			(this.EPe = void 0),
			(this.UTt = () => {
				(this.FrontExp = 0),
					this.ExpTweenFinishFunction && this.ExpTweenFinishFunction(),
					this.PlayEndLevelUpSequence();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UISprite],
			[7, UE.UIText],
			[8, UE.UIText],
			[3, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
		];
	}
	OnStart() {
		(this.ExpTweenComponent = new ExpTweenComponent_1.ExpTweenComponent(
			this.GetSprite(4),
			this.GetSprite(5),
			this.GetSprite(6),
			this.ParentTemp,
			this.UTt,
		)),
			(this.NextItem = this.GetItem(2)),
			(this.CurrentLevelText = this.GetText(0)),
			(this.NextLevelText = this.GetText(1)),
			(this.AddExp = this.GetText(7)),
			(this.ExpText = this.GetText(8)),
			(this.MaxItem = this.GetItem(3)),
			(this.CurrentMaxItem = this.GetItem(9)),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.NextLevelArrow = this.GetItem(10));
	}
	UpdateCurrentExpState(e) {
		this.ExpTweenComponent.SetCurrentSpriteActive(!0),
			this.ExpTweenComponent.SetAddFillAmount(e),
			this.ExpTweenComponent.SetNextSpriteActive(!1);
	}
	UpdateNextExp(e, t) {
		if (t >= this.CurrentMaxLevel) this.UpdateNextState(e, e, t);
		else {
			let i = this.MaxExpCacheMap.get(t);
			i || ((i = this.GetMaxExpFunction(t)), this.MaxExpCacheMap.set(t, i)),
				e >= i
					? this.UpdateNextExp(e - i, t + 1)
					: this.UpdateNextState(e, i, t);
		}
	}
	PlayStartLevelUpSequence(e) {
		this.ArrivedLevel !== e && this.EPe.PlayLevelSequenceByName("Sle");
	}
	PlayEndLevelUpSequence() {
		this.EPe.PlayLevelSequenceByName("Sle02");
	}
	PlayPreviewExp(e, t) {
		this.ExpTweenComponent.PlayPreviewExpTween(
			this.CurrentLevel,
			this.ArrivedLevel,
			e,
			this.CurrentMaxLevel,
			t,
		);
	}
	UpdateNextState(e, t, i) {
		this.PlayStartLevelUpSequence(i),
			this.SetNextLevel(i),
			(t = e / t),
			this.SetMaxItemActive(i === this.CurrentMaxLevel),
			this.NeedPreviewTween
				? this.PlayPreviewExp(i, t)
				: this.UpdateNextExpState(t),
			(this.ArrivedExp = e),
			(this.ArrivedFillAmount = t),
			(this.ArrivedLevel = i);
	}
	UpdateCurrentExp(e) {
		this.SetNextLevelActive(!1);
		var t = (e = this.CurrentExp + e) / this.CurrentMaxExp;
		this.NeedPreviewTween
			? this.PlayPreviewExp(this.CurrentLevel, t)
			: this.UpdateCurrentExpState(t),
			(this.ArrivedLevel = this.CurrentLevel),
			(this.ArrivedFillAmount = t),
			(this.ArrivedExp = e);
	}
	UpdateNextExpState(e) {
		this.ExpTweenComponent.SetCurrentSpriteActive(!1),
			this.ExpTweenComponent.SetAddFillAmount(1),
			this.ExpTweenComponent.SetNextSpriteActive(!0),
			this.ExpTweenComponent.SetNextFillAmount(e);
	}
	SetNextLevelActive(e) {
		this.NextItem.SetUIActive(e),
			this.NextLevelArrow && this.NextLevelArrow.SetUIActive(e);
	}
	SetNextLevel(e) {
		this.SetNextLevelActive(!0), this.NextLevelText.SetText(e.toString());
	}
	SetMaxItemActive(e) {
		this.MaxItem.SetUIActive(e);
	}
	SetCurrentMaxItemActive(e) {
		this.CurrentMaxItem.SetUIActive(e);
	}
	StageMaxExp(e) {
		if (!this.GetMaxExpFunction)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelExperienceComponent",
						11,
						"Unregistered SetMaxExpFunction CallBack",
					),
				0
			);
		let t = this.MaxExpCacheMap.get(e);
		return t || this.GetMaxExpFunction(e);
	}
	AddUpMaxExp(e) {
		let t = 0;
		for (let i = 1; i <= e; i++) t += this.StageMaxExp(i);
		return t;
	}
	GetMaxExp(e) {
		return this.IsAddUp ? this.AddUpMaxExp(e) : this.StageMaxExp(e);
	}
	UpdateViewState() {
		var e, t;
		this.CurrentLevelText.SetText(this.CurrentLevel.toString()),
			this.ExpTweenComponent.SetCurrentSpriteActive(!0),
			this.ExpTweenComponent.SetNextSpriteActive(!1),
			this.SetNextLevelActive(!1),
			this.AddExp.SetUIActive(!1),
			this.SetMaxItemActive(!1),
			this.SetCurrentMaxItemActive(this.CurrentLevel === this.LimitLevel),
			this.CurrentLevel === this.CurrentMaxLevel
				? (this.ExpTweenComponent.SetCurrentFillAmount(1),
					this.ExpTweenComponent.SetAddFillAmount(1),
					(this.CurrentMaxExp = this.StageMaxExp(this.CurrentLevel - 1)),
					(e = this.GetMaxExp(this.CurrentLevel - 1)),
					LguiUtil_1.LguiUtil.SetLocalText(this.ExpText, "ExpShow", e, e))
				: ((this.CurrentMaxExp = this.StageMaxExp(this.CurrentLevel)),
					(e = this.CurrentExp / this.CurrentMaxExp),
					this.ExpTweenComponent.SetCurrentFillAmount(e),
					this.ExpTweenComponent.SetAddFillAmount(e),
					(e = this.GetMaxExp(this.CurrentLevel)),
					(t = this.IsAddUp
						? this.AddUpMaxExp(this.CurrentLevel - 1) + this.CurrentExp
						: this.CurrentExp),
					LguiUtil_1.LguiUtil.SetLocalText(this.ExpText, "ExpShow", t, e));
	}
	UpdateComponent(e, t, i, r = void 0) {
		(this.ArrivedLevel = e),
			(this.CurrentLevel = e),
			(this.CurrentMaxLevel = t),
			(this.CurrentExp = i),
			(this.LimitLevel = r),
			this.UpdateViewState();
	}
	UpdateExp(e, t = !0) {
		return !((this.IsInMax() && e > this.FrontExp) || (this.FPt(e, t), 0));
	}
	FPt(e, t = !0) {
		(this.NeedPreviewTween = t),
			(this.FrontExp = e),
			LguiUtil_1.LguiUtil.SetLocalText(this.AddExp, "AddExp", Math.floor(e)),
			this.AddExp.SetUIActive(0 < e),
			this.CurrentExp + e >= this.CurrentMaxExp
				? ((t = this.CurrentExp + e - this.CurrentMaxExp),
					this.UpdateNextExp(t, this.CurrentLevel + 1))
				: this.UpdateCurrentExp(e);
	}
	PlayExpTween() {
		let e = 1;
		var t = this.CurrentExp / this.CurrentMaxExp;
		this.ArrivedLevel > this.CurrentLevel &&
			(1 !== this.ArrivedFillAmount || 0 != t) &&
			e++,
			this.ExpTweenComponent.PlayExpTween(e, this.ArrivedFillAmount);
	}
	IsInMax() {
		return this.ArrivedLevel === this.CurrentMaxLevel;
	}
	GetArrivedExp() {
		return this.ArrivedExp;
	}
	GetArrivedLevel() {
		return this.ArrivedLevel;
	}
	GetCurrentLevel() {
		return this.CurrentLevel;
	}
	GetCurrentMaxLevel() {
		return this.CurrentMaxLevel;
	}
	SetTweenFinishFunction(e) {
		this.ExpTweenFinishFunction = e;
	}
	SetMaxExpFunction(e) {
		this.GetMaxExpFunction = e;
	}
	ClearMaxExpCache() {
		this.MaxExpCacheMap.clear();
	}
	OnBeforeDestroy() {
		this.MaxExpCacheMap.clear(),
			this.ExpTweenComponent && this.ExpTweenComponent.Destroy(),
			(this.NextItem = void 0),
			(this.NextLevelText = void 0),
			(this.CurrentLevelText = void 0),
			(this.AddExp = void 0),
			(this.ExpText = void 0),
			(this.MaxItem = void 0),
			(this.EPe = void 0);
	}
}
exports.LevelExperienceComponent = LevelExperienceComponent;
