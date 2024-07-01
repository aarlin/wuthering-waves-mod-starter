"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExpComponent = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ExpTweenComponent_1 = require("./ExpTweenComponent");
class ExpComponent extends UiPanelBase_1.UiPanelBase {
	constructor(t, e = !1) {
		super(),
			(this.IsAddUp = e),
			(this.ExpTweenComponent = void 0),
			(this.RTt = ""),
			(this.wqe = void 0),
			(this.UTt = () => {}),
			(this.ATt = 0),
			(this.wqe = t);
	}
	Init() {
		this.CreateThenShowByActor(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UISprite],
			[6, UE.UISprite],
			[7, UE.UISprite],
			[8, UE.UIItem],
			[9, UE.UIItem],
		];
	}
	OnStart() {
		this.GetSprite(6).SetFillAmount(0),
			this.GetSprite(5).SetFillAmount(0),
			this.GetSprite(7).SetFillAmount(0),
			(this.ExpTweenComponent = new ExpTweenComponent_1.ExpTweenComponent(
				this.GetSprite(6),
				this.GetSprite(5),
				this.GetSprite(7),
				void 0,
				this.UTt,
			));
	}
	SetLevelFormatText(t) {
		this.RTt = t;
	}
	PlayExpTween(t) {
		let e = 1;
		for (
			var i = t.GetArrivedFillAmount(), n = t.GetCurrentLevel();
			n + e < t.GetArrivedLevel();
		)
			e++;
		2 < e && (e = 2),
			1 <= i && (e = 1),
			this.ExpTweenComponent.PlayExpTween(e, i);
	}
	UpdateInitState(t) {
		var e, i;
		StringUtils_1.StringUtils.IsEmpty(this.RTt)
			? this.GetText(0).SetText(t.GetCurrentLevel().toString())
			: LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(0),
					this.RTt,
					t.GetCurrentLevel().toString(),
				),
			this.ExpTweenComponent.SetCurrentSpriteActive(!0),
			this.ExpTweenComponent.SetNextSpriteActive(!1),
			this.PTt(!1),
			this.GetText(2).SetUIActive(!1),
			this.SetMaxItemActive(t.GetArrivedLevel() === t.GetCurrentMaxLevel()),
			t.GetCurrentLevel() === t.GetCurrentMaxLevel()
				? (this.ExpTweenComponent.SetCurrentFillAmount(1),
					this.ExpTweenComponent.SetAddFillAmount(1),
					(e = t.GetMaxExp(t.GetCurrentLevel() - 1)),
					LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ExpShow", e, e))
				: ((e = t.StageMaxExp(t.GetCurrentLevel())),
					(e = t.GetCurrentExp() / e),
					this.ExpTweenComponent.SetCurrentFillAmount(e),
					this.ExpTweenComponent.SetAddFillAmount(e),
					(e = t.GetMaxExp(t.GetCurrentLevel())),
					(i = t.GetIsAddUp()
						? t.AddUpMaxExp(t.GetCurrentLevel() - 1) + t.GetCurrentExp()
						: t.GetCurrentExp()),
					LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ExpShow", i, e)),
			(this.ATt = t.GetArrivedLevel());
	}
	Update(t, e = !0) {
		this.GetText(2).SetText("+" + Math.floor(t.GetCurrentAddExp()).toString()),
			this.GetText(2).SetUIActive(0 < t.GetCurrentAddExp()),
			t.GetIfNext() ? this.xTt(t, e) : this.wTt(t, e);
	}
	xTt(t, e = !0) {
		this.BTt(t.GetArrivedLevel()),
			this.SetMaxItemActive(t.GetArrivedLevel() === t.GetCurrentMaxLevel()),
			e ? this.bTt(t) : this.UpdateNextExpState(t.GetArrivedFillAmount());
	}
	wTt(t, e = !0) {
		this.PTt(!1),
			this.SetMaxItemActive(t.GetArrivedLevel() === t.GetCurrentMaxLevel()),
			e ? this.bTt(t) : this.UpdateCurrentExpState(t.GetArrivedFillAmount());
	}
	UpdateNextExpState(t) {
		this.ExpTweenComponent.SetCurrentSpriteActive(!1),
			this.ExpTweenComponent.SetAddFillAmount(1),
			this.ExpTweenComponent.SetNextSpriteActive(!0),
			this.ExpTweenComponent.SetNextFillAmount(t);
	}
	SetMaxItemActive(t) {
		this.GetItem(8).SetUIActive(t);
	}
	bTt(t) {
		this.ExpTweenComponent.PlayPreviewExpTween(
			t.GetCurrentLevel(),
			this.ATt,
			t.GetArrivedLevel(),
			t.GetCurrentMaxLevel(),
			t.GetArrivedFillAmount(),
		),
			(this.ATt = t.GetArrivedLevel());
	}
	BindPlayCompleteCallBack(t) {
		this.ExpTweenComponent.BindPlayCompleteCallBack(t);
	}
	UpdateCurrentExpState(t) {
		this.ExpTweenComponent.SetCurrentSpriteActive(!0),
			this.ExpTweenComponent.SetAddFillAmount(t),
			this.ExpTweenComponent.SetNextSpriteActive(!1);
	}
	PTt(t) {
		t || this.GetText(1).SetText(""), this.GetItem(4).SetUIActive(t);
	}
	BTt(t) {
		this.PTt(!0),
			StringUtils_1.StringUtils.IsEmpty(this.RTt)
				? this.GetText(1).SetText(t.toString())
				: LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(1),
						this.RTt,
						t.toString(),
					);
	}
	SetLevelItemShowState(t) {
		this.SetArrowShowState(t), this.SetAfterTextShowState(t);
	}
	SetArrowShowState(t) {
		this.GetItem(4).SetUIActive(t);
	}
	SetAfterTextShowState(t) {
		this.GetText(1).SetUIActive(t);
	}
	RefreshSingleText(t) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), t);
	}
	OnBeforeDestroy() {
		this.ExpTweenComponent.Destroy();
	}
}
exports.ExpComponent = ExpComponent;
