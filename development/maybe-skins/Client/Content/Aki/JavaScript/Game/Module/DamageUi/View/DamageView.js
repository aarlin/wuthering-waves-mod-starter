"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	Time_1 = require("../../../../Core/Common/Time"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	BattleUiControl_1 = require("../../BattleUi/BattleUiControl"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	DamageUiManager_1 = require("../DamageUiManager"),
	ANIM_TIME = 1200,
	MOBLIE_FONT_SIZE_SCALE = 1.5,
	CRITICAL_OFFSET_SCALE = 3;
class DamageView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this._2t = Vector_1.Vector.Create()),
			(this.u2t = 0),
			(this.c2t = 0),
			(this.m2t = void 0),
			(this.d2t = void 0),
			(this.l2t = void 0),
			(this.BDn = void 0),
			(this.C2t = void 0),
			(this.g2t = void 0),
			(this.f2t = -0),
			(this.X4s = void 0),
			(this.p2t = 0);
	}
	Init() {
		var t = BattleUiControl_1.BattleUiControl.Pool.GetDamageView();
		this.CreateByActor(t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UINiagara],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
		];
	}
	OnStart() {
		(this.m2t = this.GetText(0)),
			(this.d2t = this.GetText(2)),
			(this.p2t = this.m2t.GetSize()),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
				this.RefreshFontSize();
	}
	RefreshFontSize() {
		var t;
		ModelManager_1.ModelManager.PlatformModel.IsMobile()
			? ((t = Math.floor(1.5 * this.p2t)),
				this.m2t.SetFontSize(t),
				this.d2t.SetFontSize(t))
			: (this.m2t.SetFontSize(this.p2t), this.d2t.SetFontSize(this.p2t));
	}
	DestroyOverride() {
		return (
			BattleUiControl_1.BattleUiControl.Pool.RecycleDamageView(this.RootActor),
			!0
		);
	}
	InitializeData(t, e, i, a, s = !1, r = !1, o = !1, n = "") {
		if (a) {
			(this.C2t = a), this._2t.DeepCopy(e), (this.g2t = i);
			let l = a.GetRandomOffsetX(),
				h = a.GetRandomOffsetY();
			s && ((l *= 3), (h *= 3)),
				(e = CameraController_1.CameraController.CameraLocation),
				(i = Vector_1.Vector.DistSquared(e, this._2t)),
				(a = MathUtils_1.MathUtils.RangeClamp(
					i,
					DamageUiManager_1.DamageUiManager.MinDamageOffsetDistance,
					DamageUiManager_1.DamageUiManager.MaxDamageOffsetDistance,
					DamageUiManager_1.DamageUiManager.MaxDamageOffsetScale,
					DamageUiManager_1.DamageUiManager.MinDamageOffsetScale,
				)),
				(this.u2t = l * a),
				(this.c2t = h * a),
				(i = (e = !StringUtils_1.StringUtils.IsEmpty(n))
					? n
					: r
						? "+" + t
						: t.toString()),
				this.M2t(this.g2t),
				this.S2t(o, s, e),
				this.E2t(s),
				this.y2t(i, s, e),
				this.I2t(),
				this.SetActive(!0),
				this.m2t.SetAlpha(0);
		}
	}
	ClearData() {
		(this.C2t = void 0),
			this.Y4s(),
			this.SetActive(!1),
			this.SetCriticalNiagaraVisible(!1);
	}
	S2t(t, e, i) {
		if (
			((this.f2t = Time_1.Time.Now + 1200),
			(t = this.C2t.GetSequencePath(t, e, i)),
			void 0 === (e = DamageView.T2t.get(t)))
		)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Battle", 18, "缺少伤害数字动画", ["sequencePath", t]);
		else {
			this.X4s = this.GetItem(e)
				.GetOwner()
				.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
			var a = this.X4s.Num();
			for (let t = 0; t < a; t++) this.X4s.Get(t).Play();
		}
	}
	Y4s() {
		if (this.X4s) {
			var t = this.X4s.Num();
			for (let e = 0; e < t; e++) this.X4s.Get(e).Stop();
			this.X4s = void 0;
		}
	}
	Tick(t) {
		var e;
		this.RootItem &&
			(this.BDn &&
				((e = this.GetUiNiagara(3)).SetNiagaraSystem(this.BDn),
				e.ActivateSystem(!0),
				(this.BDn = void 0)),
			Time_1.Time.Now > this.f2t
				? DamageUiManager_1.DamageUiManager.RemoveDamageView(this)
				: ((e =
						DamageUiManager_1.DamageUiManager.ProjectWorldLocationToScreenPosition(
							this._2t.ToUeVector(),
						)),
					this.M2t(e)));
	}
	M2t(t) {
		(t = this.L2t(t)) && this.D2t(t);
	}
	I2t() {
		var t = DamageUiManager_1.DamageUiManager.TotalDamageViewNum - 1;
		this.RootItem.SetHierarchyIndex(t);
	}
	R2t(t) {
		if (this.l2t !== t) {
			const e = this.GetUiNiagara(3);
			StringUtils_1.StringUtils.IsEmpty(t)
				? ((this.l2t = void 0),
					e.DeactivateSystem(),
					e.SetNiagaraSystem(void 0))
				: ((this.l2t = t),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						t,
						UE.NiagaraSystem,
						(t) => {
							t?.IsValid() && e && (this.BDn = t);
						},
					));
		}
	}
	U2t(t) {
		var e = this.GetItem(4);
		e.IsUIActiveSelf() !== t && e.SetUIActive(t);
	}
	SetCriticalNiagaraVisible(t) {
		var e = this.GetUiNiagara(3);
		e.IsUIActiveSelf() !== t && e.SetUIActive(t);
	}
	y2t(t, e, i) {
		i
			? (this.A2t(this.m2t, e),
				this.d2t.GetText() !== t &&
					LguiUtil_1.LguiUtil.SetLocalText(this.d2t, t),
				this.m2t.IsUIActiveSelf() && this.m2t.SetUIActive(!1),
				this.d2t.IsUIActiveSelf() || this.d2t.SetUIActive(!0))
			: (this.A2t(this.m2t, e),
				this.m2t.GetText() !== t && this.m2t.SetText(t),
				this.m2t.IsUIActiveSelf() || this.m2t.SetUIActive(!0),
				this.d2t.IsUIActiveSelf() && this.d2t.SetUIActive(!1));
	}
	E2t(t) {
		t
			? (this.U2t(!0), this.R2t(this.C2t.GetCriticalNiagaraPath()))
			: this.U2t(!1);
	}
	A2t(t, e) {
		var i = t.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
		let a = this.C2t.GetTextColor(),
			s = this.C2t.GetStrokeColor();
		e &&
			((a = this.C2t.GetCriticalTextColor()),
			(s = this.C2t.GetCriticalStrokeColor())),
			t.GetColor().op_Equality(a) || t.SetColor(a),
			i.GetOutlineColor().op_Equality(s) || i.SetOutlineColor(s);
	}
	D2t(t) {
		this.RootItem.SetAnchorOffset(t);
	}
	L2t(t) {
		if ((t = DamageUiManager_1.DamageUiManager.ScreenPositionToLguiPosition(t)))
			return (t.X = t.X + this.u2t), (t.Y = t.Y + this.c2t), t;
	}
}
((exports.DamageView = DamageView).T2t = new Map([
	["Ani_OwnDamageSequence", 5],
	["Ani_OwnCriticalDamageSequence", 6],
	["Ani_MonsterDamageSequence", 7],
	["Ani_MonsterCriticalDamageSequence", 8],
	["Ani_BuffSequence", 9],
	["Ani_SpecialDamage", 10],
	["Ani_SpecialCriticalDamage", 11],
])),
	(DamageView.v2t = void 0);
