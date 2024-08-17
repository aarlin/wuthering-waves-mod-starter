"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EnvironmentItem = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class EnvironmentItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Art = void 0),
			(this.S0 = 0),
			(this.knt = void 0),
			(this.Snt = 0),
			(this.Fnt = -1),
			(this.dce = !1),
			(this.Vnt = void 0),
			(this.Hnt = void 0),
			(this.jnt = 0),
			(this.Wnt = -1),
			(this.Knt = 0.8);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
		];
	}
	OnStart() {
		this.GetSprite(2)?.SetUIActive(!1),
			this.hnt(6),
			this.hnt(7),
			this.hnt(8),
			this.hnt(9),
			this.hnt(10);
	}
	UpdatePropertyId(t) {
		if (t !== this.S0) {
			(this.S0 = t),
				(this.knt =
					ModelManager_1.ModelManager.BattleUiModel.FormationData.GetUiEnvironmentProperty(
						t,
					)),
				(this.Knt = this.knt.WarningPercent);
			t = this.knt.IconFrame.AssetPathName?.toString();
			var e = this.knt.Icon.AssetPathName?.toString(),
				s = this.knt.IconFull.AssetPathName?.toString(),
				i = this.knt.SceneEffect.ToAssetPathName(),
				n = this.GetSprite(1);
			const h = this.GetSprite(4),
				r = this.GetSprite(5);
			this.SetSpriteByPath(t, n, !1),
				h?.SetAlpha(0),
				this.SetSpriteByPath(e, h, !1, void 0, () => {
					h?.SetAlpha(1);
				}),
				r?.SetAlpha(0),
				this.SetSpriteByPath(s, r, !1, void 0, () => {
					r?.SetAlpha(1);
				}),
				this.Hnt !== i && (this.Qnt(), (this.Hnt = i), this.Xnt());
		}
	}
	SetPercent(t, e) {
		if (t <= 0 || e <= 0) (this.Snt = 0), this.$nt(!1);
		else if (
			this.knt &&
			((t = Math.min(1, Math.max(0, t / e))), this.Snt !== t)
		) {
			(this.Snt = t), this.$nt(!0);
			let s = 0,
				i = -1;
			t < this.Knt ? (s = 0) : (i = t < 1 ? ((s = 1), 7) : ((s = 2), 8)),
				(e = this.GetSprite(3)).SetFillAmount(t),
				this.Fnt !== s &&
					((this.Fnt = s),
					(t = this.knt.BgColors).Num() > s &&
						this.GetSprite(0).SetColor(t.Get(s)),
					(t = this.knt.BarColors).Num() > s && e.SetColor(t.Get(s)),
					(e = this.GetSprite(4)),
					(t = this.GetSprite(5)),
					2 === s
						? (e.SetUIActive(!1), t.SetUIActive(!0))
						: (e.SetUIActive(!0), t.SetUIActive(!1))),
				this.Wnt !== i &&
					(0 <= this.Wnt && this.Irt(this.Wnt),
					0 <= (this.Wnt = i)
						? (this.Ert(this.Wnt),
							this.GetSprite(2)?.SetAlpha(0),
							this.GetSprite(2)?.SetUIActive(!0))
						: this.GetSprite(2)?.SetUIActive(!1),
					2 === s) &&
					this.Ert(9),
				this.Ynt();
		}
	}
	$nt(t) {
		t !== this.dce &&
			((this.dce = t), this.Vnt) &&
			(this.dce
				? (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
						this.Vnt,
					),
					this.Irt(10),
					this.Ert(6))
				: (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
						this.Vnt,
					),
					this.Irt(6),
					0 <= this.Wnt &&
						(this.Irt(this.Wnt),
						this.GetSprite(2)?.SetUIActive(!1),
						(this.Wnt = -1)),
					this.Ert(10)));
	}
	Xnt() {
		if (this.Hnt && !(this.Hnt.length <= 0)) {
			let t = !0;
			(this.jnt = ResourceSystem_1.ResourceSystem.LoadAsync(
				this.Hnt,
				UE.EffectScreenPlayData_C,
				(e) => {
					(this.jnt = 0),
						(t = !1),
						(this.Vnt = e),
						this.dce &&
							(ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
								this.Vnt,
							),
							this.Ynt());
				},
				102,
			)),
				t || (this.jnt = 0);
		}
	}
	Ynt() {
		this.Vnt &&
			ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().UpdateSEEnvironmentFactor(
				this.Vnt,
				this.Snt,
			);
	}
	Qnt() {
		0 < this.jnt &&
			(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.jnt),
			(this.jnt = 0)),
			this.Vnt &&
				(ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
					this.Vnt,
				),
				(this.Vnt = void 0)),
			(this.Hnt = void 0);
	}
	OnBeforeDestroy() {
		super.OnBeforeDestroy(), this.Qnt();
	}
	hnt(t) {
		var e = [],
			s = this.GetItem(t)
				.GetOwner()
				.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
			i = s.Num();
		for (let t = 0; t < i; t++) e.push(s.Get(t));
		this.Art || (this.Art = new Map()), this.Art.set(t, e);
	}
	Ert(t) {
		if (((t = this.Art?.get(t)), t)) for (const e of t) e.Play();
	}
	Irt(t) {
		if (((t = this.Art?.get(t)), t)) for (const e of t) e.Stop();
	}
}
exports.EnvironmentItem = EnvironmentItem;
