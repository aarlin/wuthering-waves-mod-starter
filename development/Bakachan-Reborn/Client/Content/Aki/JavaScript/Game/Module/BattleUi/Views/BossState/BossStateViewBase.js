"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossStateViewBase = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	BattleUiControl_1 = require("../../BattleUiControl"),
	BattleEntityChildView_1 = require("../BattleChildView/BattleEntityChildView");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const PERCENT_RATE = 100;
class BossStateViewBase extends BattleEntityChildView_1.BattleEntityChildView {
	constructor() {
		super(...arguments),
			(this.qot = void 0),
			(this.Got = void 0),
			(this.HardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
			(this.MaxHardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
			(this.BossStateViewConfig = void 0),
			(this.HasHiddenTag = !1),
			(this.HasFallDownTag = !1),
			(this.HasFightTag = !1),
			(this.OnlyShowInBattleState = !1),
			(this.OnBossHeathChanged = (t, e, i) => {}),
			(this.ZQe = (t) => {
				this.IsValid() && this.OnBossShieldChanged(t);
			}),
			(this.OnTimeScale = (t, e) => {
				this.IsValid() && this.OnBossTimeScaleChange(t);
			}),
			(this.OnLanguageChange = () => {
				this.IsValid() && this.OnBossLanguageChange();
			}),
			(this.Not = (t, e) => {
				this.OnBossHardnessActivated(e);
			}),
			(this.Oot = (t, e) => {
				(this.HasHiddenTag = e), this.RefreshHidden();
			}),
			(this.kot = (t, e) => {
				(this.HasFallDownTag = e), this.OnFallDownVisibleChanged(e);
			}),
			(this.Fot = (t, e) => {
				this.OnHardnessAttributeChanged();
			}),
			(this.Vot = (t, e) => {
				this.OnHardnessAttributeChanged();
			}),
			(this.$Ke = (t, e) => {
				(this.HasFightTag = e), this.RefreshHidden();
			}),
			(this.Hot = (t, e, i) => {
				this.OnBossHardnessChanged(e);
			}),
			(this.OnBossMaxHealthChanged = (t, e, i) => {}),
			(this.OnVulnerabilityActivated = (t, e) => {}),
			(this.OnLevelChanged = (t, e, i) => {});
	}
	Initialize(t) {
		super.Initialize(t),
			(t = ConfigManager_1.ConfigManager.BattleUiConfig),
			(this.qot = t.GetBufferAnimationSpeed()),
			(this.Got = t.GetHardnessPercentList()),
			this.RefreshHiddenTagState(),
			this.RefreshHidden();
	}
	OnActivate() {
		(this.BossStateViewConfig = this.GetMonsterConfig()),
			(this.OnlyShowInBattleState =
				this.BossStateViewConfig?.OnlyShowInBattleState ?? !1),
			this.RefreshHiddenTagState(),
			this.RefreshHidden(),
			this.RefreshHardnessAttributeId();
	}
	OnDeactivate() {
		(this.BossStateViewConfig = void 0),
			(this.qot = void 0),
			(this.Got = void 0);
	}
	DestroyOverride() {
		return (
			super.DestroyOverride(),
			BattleUiControl_1.BattleUiControl.Pool.RecycleHeadStateView(
				this.GetResourceId(),
				this.RootActor,
				!0,
			),
			(this.RootActor = void 0),
			!(this.RootItem = void 0)
		);
	}
	AddEntityEvents(t) {
		EventSystem_1.EventSystem.AddWithTarget(
			t,
			EventDefine_1.EEventName.CharShieldChange,
			this.ZQe,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				t,
				EventDefine_1.EEventName.CharBeHitTimeScale,
				this.OnTimeScale,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TextLanguageChange,
				this.OnLanguageChange,
			),
			this.ListenForTagSignificantChanged(
				t,
				242005298,
				this.OnVulnerabilityActivated,
			),
			this.ListenForTagSignificantChanged(t, 1261361093, this.Not),
			this.ListenForTagSignificantChanged(t, -13489149, this.Oot),
			this.ListenForTagSignificantChanged(t, 1922078392, this.kot),
			this.ListenForTagSignificantChanged(t, -1109506297, this.Fot),
			this.ListenForTagSignificantChanged(t, -1838149281, this.Vot),
			this.OnlyShowInBattleState &&
				this.ListenForTagSignificantChanged(t, 1996802261, this.$Ke),
			this.ListenForAttributeChanged(t, EAttributeId.Proto_Hardness, this.Hot),
			this.ListenForAttributeChanged(t, EAttributeId.Proto_Rage, this.Hot),
			this.ListenForAttributeChanged(t, EAttributeId.Proto_RageMax, this.Hot),
			this.ListenForAttributeChanged(
				t,
				EAttributeId.Proto_Lv,
				this.OnLevelChanged,
			),
			this.ListenForAttributeChanged(
				t,
				EAttributeId.Proto_Life,
				this.OnBossHeathChanged,
			),
			this.ListenForAttributeChanged(
				t,
				EAttributeId.Tkn,
				this.OnBossMaxHealthChanged,
			);
	}
	RemoveEntityEvents(t) {
		super.RemoveEntityEvents(t),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TextLanguageChange,
				this.OnLanguageChange,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				t,
				EventDefine_1.EEventName.CharShieldChange,
				this.ZQe,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				t,
				EventDefine_1.EEventName.CharBeHitTimeScale,
				this.OnTimeScale,
			);
	}
	Reset() {
		super.Reset();
	}
	Tick(t) {}
	ChangeBuff(t, e, i) {}
	OnHardnessAttributeChanged() {
		this.RefreshHardnessAttributeId();
	}
	RefreshHardnessAttributeId() {
		this.GetEntity().GetComponent(185).HasTag(-1838149281)
			? ((this.HardnessAttributeId = EAttributeId.Proto_Rage),
				(this.MaxHardnessAttributeId = EAttributeId.Proto_RageMax))
			: ((this.HardnessAttributeId = EAttributeId.Proto_Hardness),
				(this.MaxHardnessAttributeId = EAttributeId.Proto_HardnessMax)),
			this.OnBossStateChange();
	}
	OnBossStateChange() {}
	OnBossShieldChanged(t) {}
	OnFallDownVisibleChanged(t) {}
	OnBossTimeScaleChange(t) {}
	OnBossHardnessActivated(t) {}
	OnBossHardnessChanged(t) {}
	OnBossLanguageChange() {}
	RefreshHiddenTagState() {
		var t = this.GetEntity()?.GetComponent(185);
		(this.HasHiddenTag = t?.HasTag(-13489149)),
			(this.HasFallDownTag = t?.HasTag(1922078392)),
			(this.HasFightTag = t?.HasTag(1996802261) ?? !1);
	}
	RefreshHidden() {
		!this.IsValid() ||
		this.HasHiddenTag ||
		(this.OnlyShowInBattleState && !this.HasFightTag)
			? this.Hide()
			: this.Show();
	}
	GetBossStateViewState() {
		if (this.IsValid()) {
			var t = this.GetEntity().GetComponent(0);
			if (t)
				return t.GetMonsterComponent()?.BossViewConfig?.BossStateViewType ?? 0;
		}
	}
	GetHardnessStrength(t) {
		var e = 100 * t;
		for (const t of this.Got) if (t[0] <= e) return t[1];
		return 0;
	}
	GetHpAndShieldPercent() {
		if (!this.IsValid()) return [0, 0];
		var t = this.GetCurrentAttributeValueById(EAttributeId.Proto_Life),
			e = this.GetCurrentAttributeValueById(EAttributeId.Tkn),
			i = this.GetBossShield();
		return [t / e, i <= e ? i / e : 1];
	}
	GetAttributeComponent() {
		return this.GetEntity().CheckGetComponent(156);
	}
	GetCurrentAttributeValueById(t) {
		return this.GetAttributeComponent().GetCurrentValue(t);
	}
	GetBossShield() {
		return this.IsValid()
			? this.GetEntity().CheckGetComponent(64).ShieldTotal
			: 0;
	}
	GetMonsterConfig() {
		if (this.IsValid()) {
			var t = this.GetEntity().GetComponent(0);
			if (t) return t.GetMonsterComponent()?.BossViewConfig;
		}
	}
	GetBaseInfo() {
		if (this.IsValid()) {
			var t = this.GetEntity().GetComponent(0);
			if (t) return t.GetBaseInfo();
		}
	}
	GetAttributeInfo() {
		if (this.IsValid()) {
			var t = this.GetEntity().GetComponent(0);
			if (t) return t.GetAttributeComponent();
		}
	}
	get BarBufferAnimLength() {
		return this.qot;
	}
	GetResourceId() {
		return "UiItem_BossState_Prefab";
	}
	HideWithAnim() {
		this.Hide();
	}
}
exports.BossStateViewBase = BossStateViewBase;
