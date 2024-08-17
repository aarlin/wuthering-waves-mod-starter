"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonHeadState = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	BattleUiDefine_1 = require("../../BattleUiDefine"),
	BuffItem_1 = require("../BuffItem"),
	HeadStateViewBase_1 = require("./HeadStateViewBase");
class CommonHeadState extends HeadStateViewBase_1.HeadStateViewBase {
	constructor() {
		super(...arguments),
			(this.Jot = new Map()),
			(this.zot = []),
			(this.Zot = []),
			(this.srt = 0),
			(this.OnAddOrRemoveBuff = (t, e, i, s) => {
				this.HeadStateData.GetEntityId() === t &&
					e.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
					(i ? this.Yrt(e, s, !0) : this.Jrt(s, !0));
			}),
			(this.OnShieldChanged = (t) => {
				this.RefreshHpAndShield(!1);
			}),
			(this.OnChangeTeam = () => {
				this.Lht();
			}),
			(this.OnLevelChanged = (t, e, i) => {
				this.Lht();
			}),
			(this.OnRoleLevelChange = (t, e, i) => {
				this.Lht();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UISprite],
		];
	}
	ActiveBattleHeadState(t) {
		super.ActiveBattleHeadState(t),
			this.RefreshHpAndShield(),
			this.Lht(),
			this.Dht(),
			this.Rht(),
			this.Uht(),
			this.Vrt(),
			this.Aht();
	}
	OnStart() {
		this.srt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
	}
	ResetBattleHeadState() {
		this.Wrt(), super.ResetBattleHeadState();
	}
	GetResourceId() {
		return "UiItem_LittleMonsterState_Prefab";
	}
	OnRefresh(t, e, i) {
		super.OnRefresh(t, e, i), this.Dht(), this.Rht(), this.Uht(), this.Pht(i);
	}
	Yrt(t, e, i = !1) {
		if (!this.Jot.has(e)) {
			let s = this.zrt();
			(s = s || this.Zrt()), this.ent(s, t, e, i);
		}
	}
	Zrt() {
		var t = this.GetItem(5);
		return new BuffItem_1.BuffItem(t);
	}
	ent(t, e, i, s = !1) {
		var h = this.Jot.size,
			r = this.HeadStateData.GetBuff(i);
		t.Activate(e, r, s),
			t.GetRootItem().SetHierarchyIndex(h),
			this.Jot.set(i, t);
	}
	Jrt(t, e = !1) {
		var i = this.tnt(t);
		i &&
			(this.Jot.delete(t),
			(e
				? (i.DeactivateWithCloseAnim(), this.zot)
				: (i.Deactivate(), this.Zot)
			).push(i));
	}
	zrt() {
		var t;
		if (!(this.Zot.length < 1))
			return (t = this.Zot[0]), this.Zot.splice(0, 1), t;
	}
	tnt(t) {
		return this.Jot.get(t);
	}
	Wrt() {
		for (const t of this.Jot.values()) t.Destroy();
		this.Jot.clear();
		for (const t of this.zot) t.Deactivate(), t.Destroy();
		this.zot.length = 0;
		for (const t of this.Zot) t.Destroy();
		this.Zot.length = 0;
	}
	Vrt() {
		if ((this.Wrt(), this.HeadStateData))
			for (const e of this.HeadStateData.GetAllCurrentCueRef()) {
				var t = e.CueConfig;
				t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
					this.Yrt(t, e.ActiveHandleId);
			}
	}
	Aht() {
		var t = this.GetHpColor();
		t && ((t = UE.Color.FromHex(t)), this.GetSprite(0).SetColor(t));
	}
	Dht() {
		var t = this.IsDetailVisible();
		this.GetItem(4).SetUIActive(t);
	}
	Rht() {
		var t = this.IsLevelTextVisible();
		this.GetText(3).SetUIActive(t);
	}
	Uht() {
		var t = this.IsBuffVisible();
		this.GetItem(5).SetUIActive(t);
	}
	Pht(t) {
		if (this.IsBuffVisible()) {
			for (const e of this.Jot.values()) e.Tick(t);
			for (let i = this.zot.length - 1; 0 <= i; i--) {
				var e = this.zot[i];
				e.TickHiding(t) || (this.zot.splice(i, 1), this.Zot.push(e));
			}
		}
	}
	RefreshHpAndShield(t = !1) {
		var [e, i] = this.GetHpAndShieldPercent();
		this.int(e),
			this.ont(i),
			t ? this.PlayBarAnimation(e) : this.StopBarLerpAnimation();
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
	int(t) {
		this.GetSprite(0).SetFillAmount(t);
	}
	Xrt(t) {
		var e;
		(e =
			((e = this.GetSprite(1)).SetFillAmount(t),
			e.IsUIActiveSelf() || e.SetUIActive(!0),
			this.GetSprite(2))).SetStretchLeft(this.srt * this.CurrentBarPercent - 2),
			e.SetStretchRight(this.srt * (1 - t) - 2);
	}
	ont(t) {
		var e = this.GetSprite(6);
		0 < t ? (e.SetFillAmount(t), e.SetUIActive(!0)) : e.SetUIActive(!1);
	}
	OnHealthChanged(t) {
		this.HeadStateData.GetEntityId() === t && this.RefreshHpAndShield(!0);
	}
	Lht() {
		var t, e, i;
		this.HeadStateData &&
			((t = this.GetLevel()),
			(e = this.GetText(3)),
			(i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(
				t,
				this.HeadStateData.Camp,
			)),
			e.SetColor(UE.Color.FromHex(i)),
			LguiUtil_1.LguiUtil.SetLocalText(e, "LevelShow", t));
	}
}
exports.CommonHeadState = CommonHeadState;
