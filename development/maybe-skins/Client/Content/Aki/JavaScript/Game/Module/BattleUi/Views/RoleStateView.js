"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleStateView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const LOW_HP_PERCENT = 0.2;
class RoleStateView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.wnt = void 0),
			(this.E0 = void 0),
			(this.$te = void 0),
			(this.Yht = void 0),
			(this.ect = void 0),
			(this.Xot = -1),
			(this.xlt = 0),
			(this.wlt = 0),
			(this.Blt = -1),
			(this.qot = 0),
			(this.tct = void 0),
			(this.ict = new UE.Margin()),
			(this.oct = 0),
			(this.rct = void 0),
			(this.nct = !1),
			(this.ZQe = (t) => {
				t === this.E0 && this.RefreshHpAndShield(!0);
			}),
			(this.YKe = (t) => {
				t === this.E0 &&
					(this.RefreshHpAndShield(!0), this.SetNiagaraActive(!0));
			}),
			(this.m2 = (t) => {
				t === this.E0 && this.sct();
			}),
			(this.act = () => {
				this.sct(), this.RefreshHpAndShield();
			}),
			(this.sct = () => {
				if (this.IsValid()) {
					var t = this.GetText(2);
					if (2 === this.wnt.RoleConfig?.RoleType) t.SetText("");
					else {
						var e = this.wnt.CreatureRoleId;
						e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
						if (e?.IsTrialRole()) {
							const i = e.GetLevelData().GetLevel();
							LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", i);
						} else if ((e = this.$te)) {
							const i = e.GetCurrentValue(EAttributeId.Proto_Lv);
							LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", i);
						} else t.SetText("");
					}
				}
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UINiagara],
			[7, UE.UIText],
			[8, UE.UIItem],
		];
	}
	Initialize(t) {
		super.Initialize(t),
			(this.qot = CommonParamById_1.configCommonParamById.GetIntConfig(
				"PlayerHPAttenuateBufferSpeed",
			)),
			(this.tct = this.GetItem(8)
				.GetOwner()
				.GetComponentByClass(UE.LGUICanvas.StaticClass())),
			(this.oct = this.GetText(1).GetWidth()),
			(this.rct = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetSprite(5),
			)),
			this.Ore();
	}
	OnBeforeDestroy() {
		this.Refresh(void 0);
	}
	Reset() {
		this.kre(), super.Reset();
	}
	Refresh(t) {
		t
			? ((this.wnt = t),
				(this.E0 = t?.EntityHandle?.Id),
				(this.$te = t.AttributeComponent),
				(this.Yht = t?.EntityHandle?.Entity?.GetComponent(64)),
				this.RefreshRoleState())
			: ((this.wnt = void 0),
				(this.E0 = void 0),
				(this.$te = void 0),
				(this.Yht = void 0),
				this.hct());
	}
	IsValid() {
		return void 0 !== this.wnt?.EntityHandle;
	}
	GetEntityId() {
		return this.E0;
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattleUiHealthChanged,
			this.YKe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiShieldChanged,
				this.ZQe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleUiLevelChanged,
				this.m2,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TextLanguageChange,
				this.act,
			);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiHealthChanged,
			this.YKe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiShieldChanged,
				this.ZQe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleUiLevelChanged,
				this.m2,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TextLanguageChange,
				this.act,
			);
	}
	Tick(t) {
		this.Qut(t);
	}
	hct() {
		TimerSystem_1.TimerSystem.Has(this.ect) &&
			TimerSystem_1.TimerSystem.Remove(this.ect),
			this.Hrt(),
			(this.ect = void 0),
			this.IsShowOrShowing && this.Hide();
	}
	Qut(t) {
		var e;
		-1 === this.Blt ||
			(this.Blt >= this.qot && this.Hrt(), this.xlt >= this.wlt) ||
			((e = this.Blt / this.qot),
			(e = MathUtils_1.MathUtils.Lerp(this.wlt, this.xlt, e)),
			this.Xrt(e),
			(this.Blt = this.Blt + t));
	}
	SetNiagaraActive(t) {
		var e = this.GetUiNiagara(6);
		e.SetUIActive(t),
			t
				? (e.SetNiagaraVarFloat("Dissolve", this.Xot), e.ActivateSystem(!0))
				: e.DeactivateSystem();
	}
	RefreshRoleState() {
		this.IsValid() &&
			(this.Hrt(),
			this.RefreshHpAndShield(),
			this.sct(),
			this.IsShowOrShowing || this.Show());
	}
	RefreshHpAndShield(t = !1) {
		var e, i, s, h;
		this.IsValid() &&
			(e = this.$te) &&
			((h = e.GetCurrentValue(EAttributeId.Proto_Life)),
			(e = e.GetCurrentValue(EAttributeId.Tkn)),
			(s = this.Yht.ShieldTotal),
			(i = h / e),
			(s = Math.min(s / e, 1)),
			(h = Math.ceil(h) + "/" + Math.ceil(e)),
			(this.ict.Right = -(1 - i) * this.oct),
			this.tct.SetRectClipOffset(this.ict),
			this.GetText(1).SetText(h),
			this.GetText(7).SetText(h),
			this.int(i),
			this.ont(s),
			t ? this.rnt() : this.Hrt(),
			(this.Xot = i));
	}
	rnt() {
		var t,
			e = this.$te;
		e &&
			((e =
				e.GetCurrentValue(EAttributeId.Proto_Life) /
				e.GetCurrentValue(EAttributeId.Tkn)),
			(t = this.Xot) <= e || ((this.xlt = e), (this.wlt = t), (this.Blt = 0)));
	}
	Xrt(t) {
		var e = this.GetSprite(4);
		e.SetFillAmount(t), e.SetUIActive(!0);
	}
	Hrt() {
		this.GetSprite(4).SetUIActive(!1),
			(this.xlt = 0),
			(this.wlt = 0),
			(this.Blt = -1);
	}
	int(t) {
		this.lct(t);
		var e = this.GetSprite(3),
			i = this.GetSprite(0);
		e.bIsUIActive && e.SetFillAmount(t), i.bIsUIActive && i.SetFillAmount(t);
	}
	lct(t) {
		var e = this.GetSprite(3),
			i = this.GetSprite(0);
		t <= 0.2
			? (e.SetUIActive(!0), i.SetUIActive(!1))
			: (e.SetUIActive(!1), i.SetUIActive(!0));
	}
	ont(t) {
		var e = this.GetSprite(5),
			i = 0 < t;
		e.SetUIActive(i),
			this.nct !== i &&
				(this.nct = i) &&
				this.rct.PlayLevelSequenceByName("Start"),
			i && e.SetFillAmount(t);
	}
}
exports.RoleStateView = RoleStateView;
