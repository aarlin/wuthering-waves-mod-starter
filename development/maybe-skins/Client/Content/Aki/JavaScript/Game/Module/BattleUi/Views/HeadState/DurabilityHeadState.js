"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DurabilityHeadState = void 0);
const UE = require("ue"),
	HeadStateViewBase_1 = require("./HeadStateViewBase");
class DurabilityHeadState extends HeadStateViewBase_1.HeadStateViewBase {
	constructor() {
		super(...arguments),
			(this.srt = -0),
			(this.Bht = (t) => {
				this.bht(!0);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
		];
	}
	GetResourceId() {
		return "UiItem_DestructionState_Prefab";
	}
	ActiveBattleHeadState(t) {
		super.ActiveBattleHeadState(t),
			t.OriginalHp && (this.CurrentBarPercent = t.OriginalHp / this.GetMaxHp()),
			this.bht(!0);
	}
	OnStart() {
		this.srt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
	}
	BindCallback() {
		super.BindCallback(),
			this.HeadStateData.BindOnSceneItemDurabilityChange(this.Bht);
	}
	bht(t = !1) {
		var e = this.GetHp(),
			i = e / this.GetMaxHp();
		this.int(i),
			t ? this.PlayBarAnimation(i) : this.StopBarLerpAnimation(),
			this.HeadStateData?.SetOriginalHp(e);
	}
	int(t) {
		this.GetSprite(0).SetFillAmount(t);
	}
	OnBeginBarAnimation(t) {
		this.Xrt(t);
	}
	StopBarLerpAnimation() {
		super.StopBarLerpAnimation(), this.GetSprite(1).SetUIActive(!1);
	}
	OnLerpBarBufferPercent(t) {
		this.Xrt(t);
	}
	Xrt(t) {
		var e;
		(e =
			((e = this.GetSprite(1)).SetFillAmount(t),
			e.IsUIActiveSelf() || e.SetUIActive(!0),
			this.GetSprite(2))).SetStretchLeft(this.srt * this.CurrentBarPercent - 2),
			e.SetStretchRight(this.srt * (1 - t) - 2);
	}
	GetMaxHp() {
		return this.HeadStateData.GetMaxDurable();
	}
	GetHp() {
		return this.HeadStateData.GetDurable();
	}
}
exports.DurabilityHeadState = DurabilityHeadState;
