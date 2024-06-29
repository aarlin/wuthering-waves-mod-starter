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
	ANIM_TIME = 1e3,
	MOBLIE_FONT_SIZE_SCALE = 1.5,
	CRITICAL_OFFSET_SCALE = 3;
class DamageView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.cOt = Vector_1.Vector.Create()),
			(this.mOt = 0),
			(this.dOt = 0),
			(this.COt = void 0),
			(this.gOt = void 0),
			(this.uOt = void 0),
			(this.fOt = void 0),
			(this.pOt = void 0),
			(this.vOt = -0),
			(this.MOt = 0);
	}
	Init() {
		var i = BattleUiControl_1.BattleUiControl.Pool.GetDamageView();
		this.CreateByActor(i);
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
		];
	}
	OnStart() {
		(this.COt = this.GetText(0)),
			(this.gOt = this.GetText(2)),
			(this.MOt = this.COt.GetSize()),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
				this.RefreshFontSize();
	}
	RefreshFontSize() {
		var i;
		ModelManager_1.ModelManager.PlatformModel.IsMobile()
			? ((i = Math.floor(this.MOt * MOBLIE_FONT_SIZE_SCALE)),
				this.COt.SetFontSize(i),
				this.gOt.SetFontSize(i))
			: (this.COt.SetFontSize(this.MOt), this.gOt.SetFontSize(this.MOt));
	}
	DestroyOverride() {
		return (
			BattleUiControl_1.BattleUiControl.Pool.RecycleDamageView(this.RootActor),
			!0
		);
	}
	InitializeData(t, a, s, r, h = !1, _ = !1, o = !1, n = "") {
		if (r) {
			(this.fOt = r), this.cOt.DeepCopy(a), (this.pOt = s);
			let i = r.GetRandomOffsetX(),
				e = r.GetRandomOffsetY();
			h && ((i *= CRITICAL_OFFSET_SCALE), (e *= CRITICAL_OFFSET_SCALE));
			(a = CameraController_1.CameraController.CameraLocation),
				(s = Vector_1.Vector.DistSquared(a, this.cOt)),
				(r = MathUtils_1.MathUtils.RangeClamp(
					s,
					DamageUiManager_1.DamageUiManager.MinDamageOffsetDistance,
					DamageUiManager_1.DamageUiManager.MaxDamageOffsetDistance,
					DamageUiManager_1.DamageUiManager.MaxDamageOffsetScale,
					DamageUiManager_1.DamageUiManager.MinDamageOffsetScale,
				)),
				(a =
					((this.mOt = i * r),
					(this.dOt = e * r),
					!StringUtils_1.StringUtils.IsEmpty(n))),
				(s = a ? n : _ ? "+" + t : t.toString());
			this.SOt(this.pOt),
				this.yOt(o, h, a),
				this.IOt(h),
				this.TOt(s, h, a),
				this.LOt(),
				this.SetActive(!0);
		}
	}
	ClearData() {
		(this.fOt = void 0), this.SetActive(!1), this.SetCriticalNiagaraVisible(!1);
	}
	yOt(i, e, t) {
		this.vOt = Time_1.Time.Now + ANIM_TIME;
		(i = this.fOt.GetSequencePath(i, e, t)), (e = DamageView.DOt.get(i));
		if (void 0 === e)
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Battle", 18, "缺少伤害数字动画", ["sequencePath", i]);
		else {
			var a = this.GetItem(e)
					.GetOwner()
					.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
				s = a.Num();
			for (let i = 0; i < s; i++) a.Get(i).Play();
		}
	}
	Tick(i) {
		var e;
		this.RootItem &&
			(Time_1.Time.Now > this.vOt
				? DamageUiManager_1.DamageUiManager.RemoveDamageView(this)
				: ((e =
						DamageUiManager_1.DamageUiManager.ProjectWorldLocationToScreenPosition(
							this.cOt.ToUeVector(),
						)),
					this.SOt(e)));
	}
	SOt(i) {
		i = this.ROt(i);
		i && this.UOt(i);
	}
	LOt() {
		var i = DamageUiManager_1.DamageUiManager.TotalDamageViewNum - 1;
		this.RootItem.SetHierarchyIndex(i);
	}
	AOt(i) {
		if (this.uOt !== i) {
			const e = this.GetUiNiagara(3);
			StringUtils_1.StringUtils.IsEmpty(i)
				? ((this.uOt = void 0),
					e.DeactivateSystem(),
					e.SetNiagaraSystem(void 0))
				: ((this.uOt = i),
					ResourceSystem_1.ResourceSystem.LoadAsync(
						i,
						UE.NiagaraSystem,
						(i) => {
							i?.IsValid() &&
								e &&
								(e.SetNiagaraSystem(i), e.ActivateSystem(!0));
						},
					));
		}
	}
	xOt(i) {
		var e = this.GetItem(4);
		e.IsUIActiveSelf() !== i && e.SetUIActive(i);
	}
	SetCriticalNiagaraVisible(i) {
		var e = this.GetUiNiagara(3);
		e.IsUIActiveSelf() !== i && e.SetUIActive(i);
	}
	TOt(i, e, t) {
		t
			? (this.POt(this.COt, e),
				this.gOt.GetText() !== i &&
					LguiUtil_1.LguiUtil.SetLocalText(this.gOt, i),
				this.COt.IsUIActiveSelf() && this.COt.SetUIActive(!1),
				this.gOt.IsUIActiveSelf() || this.gOt.SetUIActive(!0))
			: (this.POt(this.COt, e),
				this.COt.GetText() !== i && this.COt.SetText(i),
				this.COt.IsUIActiveSelf() || this.COt.SetUIActive(!0),
				this.gOt.IsUIActiveSelf() && this.gOt.SetUIActive(!1));
	}
	IOt(i) {
		i
			? (this.xOt(!0), this.AOt(this.fOt.GetCriticalNiagaraPath()))
			: this.xOt(!1);
	}
	POt(i, e) {
		var t = i.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
		let a = this.fOt.GetTextColor(),
			s = this.fOt.GetStrokeColor();
		e &&
			((a = this.fOt.GetCriticalTextColor()),
			(s = this.fOt.GetCriticalStrokeColor())),
			i.GetColor().op_Equality(a) || i.SetColor(a),
			t.GetOutlineColor().op_Equality(s) || t.SetOutlineColor(s);
	}
	UOt(i) {
		this.RootItem.SetAnchorOffset(i);
	}
	ROt(i) {
		i = DamageUiManager_1.DamageUiManager.ScreenPositionToLguiPosition(i);
		if (i) return (i.X = i.X + this.mOt), (i.Y = i.Y + this.dOt), i;
	}
}
((exports.DamageView = DamageView).DOt = new Map([
	["Ani_OwnDamageSequence", 5],
	["Ani_OwnCriticalDamageSequence", 6],
	["Ani_MonsterDamageSequence", 7],
	["Ani_MonsterCriticalDamageSequence", 8],
	["Ani_BuffSequence", 9],
])),
	(DamageView.EOt = void 0);
//# sourceMappingURL=DamageView.js.map