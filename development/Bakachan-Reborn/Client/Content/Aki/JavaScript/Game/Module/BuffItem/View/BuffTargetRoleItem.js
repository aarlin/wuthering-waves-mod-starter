"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuffTargetRoleItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
	ANIMATION_LENGTH = 200,
	LOW_HP_PERCENT = 0.2;
class BuffTargetRoleItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.kgt = void 0),
			(this.Fgt = -1),
			(this.Vgt = 0),
			(this.Hgt = -0),
			(this.jgt = !1),
			(this.Wgt = void 0),
			(this.Kgt = 0),
			(this.Qgt = void 0),
			(this.Xgt = void 0),
			(this.EPe = void 0),
			(this.$gt = void 0),
			(this.Ygt = !1),
			(this.Jgt = !1),
			(this.zgt = () => {
				this.Wgt && this.Wgt(this);
			}),
			(this.Zgt = (t, e, i) => {
				var s;
				e !== i &&
					this.kgt &&
					((s = this.kgt.Entity.GetComponent(156).GetCurrentValue(
						EAttributeId.Tkn,
					)),
					this.kgt.SetCurrentAttribute(e),
					this.e0t(i, e, s));
			});
	}
	Initialize(t) {
		this.CreateThenShowByActor(t);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UIItem],
			[8, UE.UIItem],
			[7, UE.UIButtonComponent],
			[9, UE.UINiagara],
		]),
			(this.BtnBindInfo = [[7, this.zgt]]);
	}
	OnStart() {
		(this.Xgt = new MediumItemGrid_1.MediumItemGrid()),
			this.Xgt.Initialize(this.GetItem(0).GetOwner()),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.$gt = this.GetUiNiagara(9)),
			this.$gt.SetUIActive(!1);
	}
	OnBeforeDestroy() {
		(this.Xgt = void 0),
			(this.Xgt = void 0),
			this.EPe?.Clear(),
			this.ResetBuffTargetRoleItem(),
			this.t0t(),
			(this.$gt = void 0);
	}
	ResetBuffTargetRoleItem() {
		(this.kgt = void 0), (this.Ygt = !1), this.tXe();
	}
	Tick(t) {
		this.jgt && (this.Hgt > 200 ? this.i0t() : (this.o0t(), (this.Hgt += t)));
	}
	RefreshBuffTargetRoleItem(t) {
		var e = (this.kgt = t).RoleConfigId,
			i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
			s = t.RoleLevel,
			r = Math.floor(t.CurrentAttribute);
		(t = Math.floor(t.MaxAttribute)),
			(e = {
				Type: 2,
				ItemConfigId: e,
				BottomTextId: "Text_LevelShow_Text",
				BottomTextParameter: [s],
				ElementId: i.ElementId,
			});
		this.Xgt.Apply(e),
			this.SetCurrentValueBarPercent(r / t),
			this.r0t(r, t),
			this.SetPreviewValueBarVisible(!1),
			this.SetAnimationValueBarVisible(!1),
			this.n0t(!1),
			this.SetSelected(!1),
			this.SetNoneRole(!1),
			this.eXe();
	}
	RemoveRole() {
		this.SetNoneRole(!0), this.tXe(), (this.kgt = void 0);
	}
	eXe() {
		this.kgt &&
			this.kgt.Entity.GetComponent(156).AddListener(
				EAttributeId.Proto_Life,
				this.Zgt,
				"Life.BuffTargetRoleItem",
			);
	}
	tXe() {
		this.kgt &&
			this.kgt.Entity.GetComponent(156).RemoveListener(
				EAttributeId.Proto_Life,
				this.Zgt,
			);
	}
	RefreshPreviewUseItem(t, e, i) {
		var s = Math.min(t + i, e),
			r = Math.min(i, e - t);
		this.SetCurrentValueBarPercent(t / e),
			this.SetPreviewValueBarPercent(s / e),
			this.SetPreviewValueBarVisible(0 < i),
			this.SetAddValueText(Math.floor(r)),
			this.n0t(0 < i),
			this.SetPreviewValueText(Math.floor(s), Math.floor(e));
	}
	ResetPreviewUseItem() {
		var t = this.kgt.CurrentAttribute,
			e = this.kgt.MaxAttribute;
		this.SetPreviewValueBarVisible(!1), this.n0t(!1), this.r0t(t, e);
	}
	SetCurrentValueBarPercent(t) {
		var e = this.GetSprite(4);
		e.SetChangeColor(t <= 0.2, e.changeColor), e.SetFillAmount(t);
	}
	SetPreviewValueBarPercent(t) {
		this.GetSprite(5).SetFillAmount(t);
	}
	SetPreviewValueBarVisible(t) {
		this.GetSprite(5).SetUIActive(t);
	}
	SetAnimationValueBarPercent(t) {
		this.GetSprite(3).SetFillAmount(t);
	}
	s0t(t) {
		var e = this.GetSprite(3);
		e.SetChangeColor(t <= 0.2, e.changeColor);
	}
	SetAnimationValueBarVisible(t) {
		this.GetSprite(3).SetUIActive(t);
	}
	SetAddValueText(t) {
		this.GetText(1).SetText("+" + t);
	}
	n0t(t) {
		this.GetText(1).SetUIActive(t);
	}
	r0t(t, e) {
		var i = this.GetText(2);
		t <= 0
			? i.SetText(`<color=#ff0000ff>${Math.ceil(t)}</color>/` + Math.ceil(e))
			: i.SetText(Math.ceil(t) + "/" + Math.ceil(e));
	}
	SetPreviewValueText(t, e) {
		this.GetText(2).SetText(`<color=#00ff00ff>${t}</color>/` + e);
	}
	SetSelected(t) {
		t
			? (this.Xgt.SetSelected(!0), this.EPe.PlayLevelSequenceByName("Selected"))
			: (this.ResetPreviewUseItem(),
				this.SetAnimationValueBarVisible(!1),
				this.Xgt.SetSelected(!1)),
			(this.Jgt = t);
	}
	IsSelected() {
		return this.Jgt;
	}
	SetNoneRole(t) {
		var e = this.GetItem(8),
			i = this.GetItem(6);
		e.SetUIActive(t), i.SetUIActive(!t);
	}
	GetUseBuffItemRoleData() {
		return this.kgt;
	}
	BindOnClickedBuffTargetRoleItem(t) {
		this.Wgt = t;
	}
	a0t() {
		const t = () => {
			this.$gt.SetUIActive(!0), this.$gt.ActivateSystem(!0);
		};
		var e;
		this.Ygt
			? t()
			: ((e =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"Niagara_BuffTreat",
					)),
				this.SetNiagaraSystemByPath(e, this.$gt, () => {
					(this.Ygt = !0), t();
				}));
	}
	t0t() {
		this.$gt.DeactivateSystem(), this.$gt.SetUIActive(!1);
	}
	e0t(t, e, i) {
		t !== e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Test",
					8,
					`播放属性进度条动画，currentAttribute：${t},targetAttribute:${e},maxAttribute:` +
						i,
				),
			this.jgt || (this.Fgt = t),
			this.a0t(),
			(this.Vgt = e),
			(this.Kgt = i),
			(this.Hgt = 0),
			(this.jgt = !0),
			this.SetAnimationValueBarVisible(!0),
			this.s0t(this.Fgt / this.Kgt),
			this.ResetPreviewUseItem(),
			this.EPe.PlayLevelSequenceByName("Reply"));
	}
	i0t() {
		(this.jgt = !1), (this.Hgt = -1);
		var t = this.kgt.CurrentAttribute,
			e = this.kgt.MaxAttribute,
			i = this.kgt.GetAddAttribute();
		this.s0t(t / e),
			this.RefreshPreviewUseItem(t, e, i),
			this.SetAnimationValueBarVisible(!1),
			this.Qgt && this.Qgt();
	}
	BindOnUseItemAnimationFinished(t) {
		this.Qgt = t;
	}
	o0t() {
		var t = Math.min(this.Hgt / 200, 1);
		(this.Fgt = MathUtils_1.MathUtils.Lerp(this.Fgt, this.Vgt, t)),
			this.SetAnimationValueBarPercent(this.Fgt / this.Kgt);
	}
}
exports.BuffTargetRoleItem = BuffTargetRoleItem;
