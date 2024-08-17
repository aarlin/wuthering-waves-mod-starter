"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StrengthHandle = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../Abilities/FormationAttributeController"),
	StrengthUnit_1 = require("../HudUnit/StrengthUnit"),
	HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
	RECOVERY_STRENGTH_BUFF_ID = 91004001;
class StrengthHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
	constructor() {
		super(...arguments),
			(this.vri = void 0),
			(this.Mri = 0),
			(this.Sri = 0),
			(this.Eri = 0),
			(this.yri = 0),
			(this.Iri = void 0),
			(this.Tri = void 0),
			(this.Lri = void 0),
			(this.Dri = void 0),
			(this.Rri = 0),
			(this.Uri = 0),
			(this.B8e = void 0),
			(this.xie = () => {
				var i = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
				this.tXe(this.B8e),
					this.eXe(i),
					this.vri &&
						(this.vri.RefreshEntity(i),
						this.vri.RefreshBuffState(),
						this.vri.RefreshEnableState(),
						this.Ari());
			}),
			(this.zpe = (i, t) => {
				this.tXe(t);
			}),
			(this.pKe = (i, t, e, r) => {
				91004001 === r &&
					i === this.Rri &&
					this.vri &&
					this.vri.PlayPickUpAnim();
			}),
			(this.Pri = (i, t, e) => {
				this.vri && (this.xri(), this.wri(), this.Bri());
			}),
			(this.bri = (i, t, e) => {
				this.xri(), this.qri();
			}),
			(this.Gri = (i, t) => {
				t ? this.vri.SetBuff(1) : this.vri.SetBuff(0);
			}),
			(this.Nri = (i, t) => {
				t ? this.vri.SetBuff(2) : this.vri.SetBuff(0);
			}),
			(this.Ori = (i, t) => {
				this.vri.SetEnable(!t);
			}),
			(this.kri = (i, t) => {
				this.vri.PlayPickUpAnim();
			});
	}
	OnInitialize() {
		super.OnInitialize(),
			(this.yri =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"LowEndurancePercent",
				) / CommonDefine_1.RATE_10000),
			this.NewHudUnit(StrengthUnit_1.StrengthUnit, "UiItem_Endurance").then(
				(i) => {
					(this.vri = i),
						(i = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()) &&
							(this.eXe(i),
							this.vri.RefreshEntity(i),
							this.vri.RefreshBuffState(),
							this.vri.RefreshEnableState(),
							this.xri(),
							this.wri(),
							this.Ari(),
							this.qri()),
						this.vri.SetVisible(!1);
				},
				() => {},
			);
	}
	OnDestroyed() {
		super.OnDestroyed(),
			(this.vri = void 0),
			(this.Mri = void 0),
			(this.Sri = void 0),
			(this.Eri = void 0);
	}
	OnShowHud() {}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
			this.xie,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnBuffAddUITexture,
				this.pKe,
			),
			FormationAttributeController_1.FormationAttributeController.AddValueListener(
				1,
				this.Pri,
			),
			FormationAttributeController_1.FormationAttributeController.AddMaxListener(
				1,
				this.bri,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
			this.xie,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnBuffAddUITexture,
				this.pKe,
			),
			FormationAttributeController_1.FormationAttributeController.RemoveValueListener(
				1,
				this.Pri,
			),
			FormationAttributeController_1.FormationAttributeController.RemoveMaxListener(
				1,
				this.bri,
			);
	}
	eXe(i) {
		var t;
		i &&
			((t = i.EntityHandle.Id), this.Rri !== t) &&
			((this.Rri = t),
			(this.B8e = i.EntityHandle),
			(t = i.GameplayTagComponent),
			(this.Tri = t.ListenForTagAddOrRemove(
				334800376,
				this.Gri,
				StrengthHandle._$e,
			)),
			(this.Iri = t.ListenForTagAddOrRemove(
				-951946659,
				this.Nri,
				StrengthHandle._$e,
			)),
			(this.Lri = t.ListenForTagAddOrRemove(
				64400505,
				this.Ori,
				StrengthHandle._$e,
			)),
			(this.Dri = t.ListenForTagAddOrRemove(
				778582368,
				this.kri,
				StrengthHandle._$e,
			)));
	}
	tXe(i) {
		i?.Valid &&
			this.Rri === i.Id &&
			(this.Tri.EndTask(),
			this.Iri.EndTask(),
			this.Lri.EndTask(),
			this.Dri.EndTask(),
			(this.Iri = void 0),
			(this.Iri = void 0),
			(this.Lri = void 0),
			(this.Dri = void 0),
			(this.Rri = void 0),
			(this.B8e = void 0),
			this.vri) &&
			this.vri.RefreshEntity(void 0);
	}
	xri() {
		(this.Mri =
			FormationAttributeController_1.FormationAttributeController.GetValue(1)),
			(this.Sri =
				FormationAttributeController_1.FormationAttributeController.GetBaseMax(
					1,
				)),
			(this.Eri =
				FormationAttributeController_1.FormationAttributeController.GetMax(1)),
			this.vri.SetStrengthPercent(this.Mri, this.Sri);
	}
	wri() {
		var i, t;
		this.Fri() &&
			((i = this.Mri - this.Sri),
			(t = this.Eri - this.Sri),
			this.vri.SetTemporaryStrengthPercent(i, t));
	}
	Ari() {
		var i = this.Fri();
		this.vri.PlayTemporaryAnim(i);
	}
	Fri() {
		var i = this.Sri;
		return !(this.Vri() <= 0 && this.Eri <= i);
	}
	Vri() {
		return this.Mri - this.Sri;
	}
	qri() {
		var i = this.Eri - this.Sri;
		this.vri.RefreshSingleStrengthItemRotation(this.Sri),
			this.vri.RefreshSingleTemporaryStrengthItemRotation(i),
			this.vri.RefreshSingleTemporaryStrengthItemVisible(i);
	}
	Bri() {
		var i = this.Mri,
			t = this.Eri;
		return (
			this.Fri()
				? 0 < this.Vri()
					? (this.vri.SetTemporaryVisible(!0), this.vri.PlayTemporaryAnim(!0))
					: this.vri.PlayTemporaryAnim(!1)
				: this.vri.SetTemporaryVisible(!1),
			t <= i
				? 0 === this.Uri
					? void 0
					: ((this.Uri = 0),
						this.vri.SetNone(!1),
						this.vri.StopNoneAnim(),
						this.vri.SetNormal(!0),
						void this.vri.PlayFullAnim())
				: i <= 0
					? 3 === this.Uri
						? void 0
						: ((this.Uri = 3),
							this.vri.SetNone(!0),
							void this.vri.PlayNoneAnim())
					: ((i = i / t > this.yri),
						void (
							this.Uri !== (t = i ? 1 : 2) &&
							((this.Uri = t),
							this.vri.SetNone(!1),
							this.vri.StopNoneAnim(),
							this.vri.SetNormal(i),
							this.vri.SetVisible(!0),
							this.vri.PlayStartAnim())
						))
		);
	}
}
((exports.StrengthHandle = StrengthHandle).RKe = void 0),
	(StrengthHandle._$e = void 0);
