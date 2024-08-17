"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotographSetupView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PhotographController_1 = require("../PhotographController"),
	PhotographExpressionItem_1 = require("./PhotographExpressionItem"),
	PhotographOptionSetup_1 = require("./PhotographOptionSetup"),
	PhotographValueSetup_1 = require("./PhotographValueSetup"),
	ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
class PhotographSetupView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.NWi = new Set()),
			(this.OWi = new Map()),
			(this.PhotoSetupMode = void 0),
			(this.kWi = void 0),
			(this.FWi = void 0),
			(this.VWi = new Map()),
			(this.HWi = new Map()),
			(this.ACt = () => {
				this.CloseMe();
			}),
			(this.H9e = () => {
				this.jWi(0);
			}),
			(this.WWi = () => {
				this.jWi(1);
			}),
			(this.KWi = () => {
				this.jWi(2);
			}),
			(this.QWi = () => {
				var t = this.OWi.get(0);
				t &&
					(this.FWi?.SetSelected(!1), (this.FWi = t), this.FWi.SetSelected(!0));
			}),
			(this.XWi = (t, e) => {
				e ? this.$Wi(t) : this.YWi(t);
			}),
			(this.DWi = (t) => this.FWi !== t),
			(this.JWi = (t, e) => {
				e ? this.zWi(t) : this.ZWi(t);
			}),
			(this.eKi = (t) => {
				this.tKi(), this.iKi();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIExtendToggle],
			[2, UE.UIExtendToggle],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[0, this.WWi],
				[1, this.H9e],
				[2, this.KWi],
				[7, this.ACt],
			]);
	}
	async OnBeforeStartAsync() {
		this.oKi(), await this.rKi(), await this.nKi(), await this.sKi();
	}
	OnStart() {
		this.aKi(this.OpenParam ?? 1, !0, !0), this.iKi();
	}
	OnBeforeDestroy() {
		this.hKi(), this.lKi(), this._Ki(), this.HWi.clear(), (this.HWi = void 0);
	}
	OnAfterShow() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged,
			!0,
		);
	}
	OnBeforeHide() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged,
			!1,
		);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnResetPhotographCamera,
			this.QWi,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnResetPhotographCamera,
			this.QWi,
		);
	}
	oKi() {
		var t = this.GetExtendToggle(0),
			e = this.GetExtendToggle(1),
			i = this.GetExtendToggle(2);
		e?.RootUIComp.SetUIActive(!1),
			i?.RootUIComp.SetUIActive(!1),
			this.HWi.set(1, t),
			this.HWi.set(0, e),
			this.HWi.set(2, i);
	}
	jWi(t) {
		this.HWi.forEach((e, i) => {
			i !== t && e.SetToggleStateForce(0, !1);
		}),
			this.uKi(t);
	}
	aKi(t, e, i = !1) {
		(e = e ? 1 : 0), (t = this.HWi.get(t)) && t.SetToggleStateForce(e, i);
	}
	uKi(t) {
		(this.PhotoSetupMode = t),
			this.cKi(1 === t),
			this.mKi(0 === t),
			this.dKi(2 === t);
	}
	async rKi() {
		var t =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
				0,
			).GetRoleId();
		if (
			(t = ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfigListByRoleId(
					t,
				),
			))
		) {
			t.sort((t, e) => t.Sort - e.Sort);
			var e = this.GetItem(4);
			e.SetUIActive(!0);
			for await (const e of t) 1 === e.MotionType && (await this.CKi(e.Id));
			e.SetUIActive(!1),
				0 !== this.NWi.size && this.HWi.get(0)?.RootUIComp.SetUIActive(!0);
		}
	}
	async CKi(t) {
		var e = this.GetItem(3),
			i = this.GetItem(4);
		(i = LguiUtil_1.LguiUtil.DuplicateActor(i.GetOwner(), e)),
			(e = new PhotographExpressionItem_1.PhotographExpressionItem());
		await e.CreateByActorAsync(i),
			e.Refresh(t),
			e.BindOnSelected(this.XWi),
			this.NWi.add(e);
	}
	lKi() {
		for (const t of this.NWi) t.Destroy();
		this.NWi.clear(), (this.kWi = void 0);
	}
	mKi(t) {
		for (const e of this.NWi) e.SetActive(t);
	}
	$Wi(t) {
		this.kWi && this.kWi.SetSelected(!1);
		var e = t.GetPhotoMontageId(),
			i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		PhotographController_1.PhotographController.PlayPhotoMontage(i, e),
			(this.kWi = t),
			this.kWi.SetSelected(!0);
	}
	YWi(t) {
		this.kWi === t &&
			(PhotographController_1.PhotographController.ResetPhotoMontage(),
			(this.kWi = void 0));
	}
	iKi() {
		var t = ModelManager_1.ModelManager.PhotographModel.MontageId;
		t = this.OWi.get(t);
		this.FWi !== t &&
			(this.FWi && this.FWi.SetSelected(!1),
			(this.FWi = t),
			this.FWi?.SetSelected(!0));
	}
	async sKi() {
		var t =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
				0,
			).GetRoleId();
		if (
			(t =
				(await this.gKi(),
				ConfigCommon_1.ConfigCommon.ToList(
					ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfigListByRoleId(
						t,
					),
				)))
		) {
			t.sort((t, e) => t.Sort - e.Sort);
			var e = this.GetItem(4);
			e.SetUIActive(!0);
			for await (const e of t) 0 === e.MotionType && (await this.fKi(e.Id));
			e.SetUIActive(!1),
				0 !== this.OWi.size && this.HWi.get(2)?.RootUIComp.SetUIActive(!0);
		}
	}
	async gKi() {
		var t = new PhotographExpressionItem_1.PhotographExpressionItem();
		await t.CreateByActorAsync(this.GetItem(8).GetOwner()),
			t.Refresh(0),
			t.BindOnSelected(this.JWi),
			t.BindOnCanExecuteChange(this.DWi),
			t.SetUiActive(!1),
			this.OWi.set(0, t);
	}
	async fKi(t) {
		var e = this.GetItem(3),
			i = this.GetItem(4);
		(i = LguiUtil_1.LguiUtil.DuplicateActor(i.GetOwner(), e)),
			(e = new PhotographExpressionItem_1.PhotographExpressionItem());
		await e.CreateByActorAsync(i),
			e.Refresh(t),
			e.BindOnSelected(this.JWi),
			e.BindOnCanExecuteChange(this.DWi),
			this.OWi.set(t, e);
	}
	dKi(t) {
		for (const e of this.OWi.values()) e.SetActive(t);
	}
	hKi() {
		for (const t of this.OWi.values()) t.Destroy();
		this.OWi.clear(), (this.FWi = void 0);
	}
	zWi(t) {
		this.FWi && this.FWi.SetSelected(!1);
		var e,
			i = t.GetPhotoMontageId();
		0 === i
			? PhotographController_1.PhotographController.ResetPhotoMontage()
			: ((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
				PhotographController_1.PhotographController.PlayPhotoMontage(e, i)),
			(this.FWi = t),
			this.FWi.SetSelected(!0);
	}
	ZWi(t) {
		this.FWi === t &&
			(PhotographController_1.PhotographController.ResetPhotoMontage(),
			(this.FWi = void 0));
	}
	async nKi() {
		var t =
				ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig(),
			e = this.GetItem(5),
			i = this.GetItem(6);
		e.SetUIActive(!0), i.SetUIActive(!0);
		for await (const e of t) await this.pKi(e.ValueType, e.Type);
		e.SetUIActive(!1), i.SetUIActive(!1);
	}
	async pKi(t, e) {
		var i = this.GetItem(3);
		let o;
		switch (e) {
			case 0:
				var n = this.GetItem(5);
				n = LguiUtil_1.LguiUtil.DuplicateActor(n.GetOwner(), i);
				await (o =
					new PhotographOptionSetup_1.PhotographOptionSetup()).CreateThenShowByActorAsync(
					n,
				),
					o.Initialize(t),
					o.BindOnIndexChanged(this.eKi);
				break;
			case 1:
				(n = this.GetItem(6)),
					(n = LguiUtil_1.LguiUtil.DuplicateActor(n.GetOwner(), i)),
					await (o =
						new PhotographValueSetup_1.PhotographValueSetup()).CreateThenShowByActorAsync(
						n,
					),
					o.Initialize(t);
		}
		this.VWi.set(t, o);
	}
	vKi(t) {
		return this.VWi.get(t);
	}
	_Ki() {
		for (const t of this.VWi.values()) t.Destroy();
		this.VWi.clear();
	}
	cKi(t) {
		for (const e of this.VWi.values()) e.SetActive(t);
		t && this.tKi();
	}
	tKi() {
		for (const t of this.VWi.values()) t.SetEnable(!0);
		var t,
			e,
			i = ModelManager_1.ModelManager.PhotographModel.GetAllPhotographOption(),
			o = ConfigManager_1.ConfigManager.PhotographConfig;
		for ([t, e] of i) {
			var n = o.GetPhotoSetupConfig(t);
			if (0 === n.Type && (n = n.SubOptions.get(e)))
				for (const t of n.ArrayInt) this.vKi(t).SetEnable(!1);
		}
	}
}
exports.PhotographSetupView = PhotographSetupView;
