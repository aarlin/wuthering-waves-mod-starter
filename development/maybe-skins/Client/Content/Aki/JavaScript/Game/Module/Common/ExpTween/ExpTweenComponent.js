"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExpTweenComponent = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	GlobalData_1 = require("../../../GlobalData"),
	UiLayer_1 = require("../../../Ui/UiLayer");
class ExpTweenComponent {
	constructor(e, t, i, r, l = void 0) {
		(this.TweenFinishFunction = l),
			(this.ExpTweener = void 0),
			(this.TweenTime = 1),
			(this.StartCount = 1),
			(this.FinalFillAmount = 0),
			(this.PreviewExpTweener = void 0),
			(this.PreviewTweenTime = 0.5),
			(this.PreviewFinalFillAmount = 0),
			(this.CurrentLevel = 0),
			(this.ArrivedLevel = 0),
			(this.TargetLevel = 0),
			(this.InCurrent = !1),
			(this.qTt = void 0),
			(this.GTt = void 0),
			(this.PlayFillAmount = (e) => {
				this.SetCurrentFillAmount(e);
			}),
			(this.PlayPreviewFillAmount = (e) => {
				this.InCurrent
					? this.SetAddFillAmount(e)
					: (this.SetNextFillAmount(e),
						1 !== this.AddSprite.GetFillAmount() && this.SetAddFillAmount(1));
			}),
			(this.AddSprite = t),
			(this.CurrentSprite = e),
			(this.NextSprite = i),
			(this.Delegate = (0, puerts_1.toManualReleaseDelegate)(
				this.PlayFillAmount,
			)),
			(this.PreviewDelegate = (0, puerts_1.toManualReleaseDelegate)(
				this.PlayPreviewFillAmount,
			));
	}
	PlayTween(e, t, i) {
		var r = 1 === e ? this.CurrentSprite.GetFillAmount() : 0,
			l = e === t ? this.FinalFillAmount : 1;
		e === t && this.AddSprite.SetFillAmount(l),
			UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", !0),
			(this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
				GlobalData_1.GlobalData.World,
				this.Delegate,
				r,
				l,
				i,
			)),
			this.ExpTweener.OnCompleteCallBack.Bind(() => {
				this.TweenCompleteCallBack(e, t, i);
			});
	}
	TweenCompleteCallBack(e, t, i) {
		this.KillExpTweener(),
			this.GTt && this.GTt(e === t),
			e < t
				? this.PlayTween(e + 1, t, i)
				: (UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", !1),
					this.TweenFinishFunction && this.TweenFinishFunction());
	}
	KillExpTweener() {
		this.ExpTweener && (this.ExpTweener.Kill(), (this.ExpTweener = void 0));
	}
	PlayPreviewTween(e, t, i, r) {
		(this.PreviewExpTweener = UE.LTweenBPLibrary.FloatTo(
			GlobalData_1.GlobalData.World,
			this.PreviewDelegate,
			e,
			t,
			i,
		)),
			this.PreviewExpTweener.OnCompleteCallBack.Bind(() => {
				this.PreviewTweenCompleteCallBack(i, r);
			});
	}
	PreviewTweenCompleteCallBack(e, t) {
		this.KillPreviewExpTweener(),
			t ? this.PreviewTweenPlayAgainState(e) : this.PreviewTweenStopState();
	}
	PreviewTweenStopState() {
		1 === this.PreviewFinalFillAmount
			? (this.SetCurrentSpriteActive(!1),
				this.SetNextSpriteActive(!0),
				this.SetNextFillAmount(this.PreviewFinalFillAmount))
			: this.TargetLevel === this.CurrentLevel &&
				(this.SetCurrentSpriteActive(!0),
				this.SetAddFillAmount(this.PreviewFinalFillAmount),
				this.SetNextSpriteActive(!1));
	}
	PreviewTweenPlayAgainState(e) {
		this.ArrivedLevel > this.TargetLevel
			? ((this.InCurrent = this.TargetLevel === this.CurrentLevel),
				this.InCurrent &&
					(this.SetCurrentSpriteActive(!0), this.SetNextSpriteActive(!1)),
				this.PlayPreviewTween(1, this.PreviewFinalFillAmount, e, !1))
			: this.ArrivedLevel < this.TargetLevel &&
				((this.InCurrent = !1),
				this.SetCurrentSpriteActive(!1),
				this.SetNextSpriteActive(!0),
				this.PlayPreviewTween(0, this.PreviewFinalFillAmount, e, !1));
	}
	KillPreviewExpTweener(e = !1) {
		this.PreviewExpTweener?.Kill(),
			(this.PreviewExpTweener = void 0),
			e && this.PreviewTweenStopState();
	}
	BindPlayCompleteCallBack(e) {
		this.GTt = e;
	}
	BindPlayCurrentFillAmountCallback(e) {
		this.qTt = e;
	}
	SetCurrentFillAmount(e) {
		this.CurrentSprite.SetFillAmount(e), this.qTt && this.qTt(e);
	}
	SetNextFillAmount(e) {
		this.NextSprite.SetFillAmount(e);
	}
	SetAddFillAmount(e) {
		this.AddSprite.SetFillAmount(e);
	}
	SetCurrentSpriteActive(e) {
		this.CurrentSprite.SetUIActive(e);
	}
	SetNextSpriteActive(e) {
		this.NextSprite.SetUIActive(e);
	}
	PlayExpTween(e, t) {
		this.SetCurrentSpriteActive(!0),
			this.SetNextSpriteActive(!1),
			this.AddSprite.SetFillAmount(0),
			(this.FinalFillAmount = t),
			(t = this.TweenTime / e),
			this.PlayTween(this.StartCount, e, t);
	}
	PlayPreviewExpTween(e, t, i, r, l) {
		this.KillPreviewExpTweener(!0), (this.PreviewFinalFillAmount = l);
		var n = (t !== e ? this.NextSprite : this.AddSprite).GetFillAmount();
		let s;
		(s = i < t && t !== r ? 0 : t < i || i === r ? 1 : l),
			(this.InCurrent = t === e),
			(this.CurrentLevel = e),
			(this.ArrivedLevel = t),
			(this.TargetLevel = i),
			(e = (l =
				this.ArrivedLevel !== this.TargetLevel &&
				this.ArrivedLevel !== r &&
				this.TargetLevel !== r)
				? this.PreviewTweenTime / 2
				: this.PreviewTweenTime),
			this.PlayPreviewTween(n, s, e, l);
	}
	Destroy() {
		UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", !1),
			(0, puerts_1.releaseManualReleaseDelegate)(this.PlayFillAmount),
			(0, puerts_1.releaseManualReleaseDelegate)(this.PlayPreviewFillAmount),
			(this.Delegate = void 0),
			(this.PreviewDelegate = void 0),
			this.KillExpTweener(),
			this.KillPreviewExpTweener(),
			(this.CurrentSprite = void 0),
			(this.AddSprite = void 0),
			(this.NextSprite = void 0);
	}
}
exports.ExpTweenComponent = ExpTweenComponent;
