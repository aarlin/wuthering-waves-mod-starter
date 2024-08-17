"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuardianHeadState = void 0);
const UE = require("ue"),
	HeadStateViewBase_1 = require("./HeadStateViewBase");
class GuardianHeadState extends HeadStateViewBase_1.HeadStateViewBase {
	constructor() {
		super(...arguments), (this.srt = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
		];
	}
	ActiveBattleHeadState(t) {
		super.ActiveBattleHeadState(t), this.RefreshHp(), this.Aht();
	}
	OnStart() {
		this.srt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
	}
	GetResourceId() {
		return "UiItem_GuardianState_Prefab";
	}
	OnHealthChanged(t) {
		this.RefreshHp(!0);
	}
	RefreshHp(t = !1) {
		var [e, r] = this.GetHpAndMaxHp(),
			e = e / r;
		this.int(e), t ? this.PlayBarAnimation(e) : this.StopBarLerpAnimation();
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
	Aht() {
		var t = this.GetHpColor();
		t && ((t = UE.Color.FromHex(t)), this.GetSprite(0).SetColor(t));
	}
}
exports.GuardianHeadState = GuardianHeadState;
