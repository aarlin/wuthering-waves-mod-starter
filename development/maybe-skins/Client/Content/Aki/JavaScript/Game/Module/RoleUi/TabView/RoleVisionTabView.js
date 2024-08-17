"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleVisionTabView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	RoleController_1 = require("../RoleController"),
	RoleVisionDragHeadItem_1 = require("./VisionSubView/RoleVisionDragHeadItem"),
	RoleVisionInfoPanel_1 = require("./VisionSubView/RoleVisionInfoPanel"),
	VisionCommonDragItem_1 = require("./VisionSubView/VisionCommonDragItem"),
	INVALIDINDEX = 999;
class RoleVisionTabView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.L8i = void 0),
			(this.udo = !1),
			(this.cdo = !1),
			(this.mdo = !1),
			(this.P8i = -1),
			(this.x8i = -1),
			(this.ddo = 0),
			(this.Uqe = 0),
			(this.F8i = 999),
			(this.Cdo = void 0),
			(this.plo = void 0),
			(this.w8i = new Array()),
			(this.$8i = new Array()),
			(this.q8i = 0),
			(this.gdo = !1),
			(this.fdo = () => {
				this.pdo = !1;
			}),
			(this.vdo = () => {
				this.$8t();
			}),
			(this.pdo = !1),
			(this.OnChangeRole = (e) => {
				this.Og(),
					(this.pdo = !0),
					this.PlayMontageStart(!0),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
						e,
					);
			}),
			(this.RefreshPhantom = () => {
				var e = this.plo?.GetCurSelectRoleData(),
					t =
						ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
							e,
						),
					i = this.w8i.length;
				for (let n = 0; n < i; n++) {
					var o = t.length > n ? t[n] : void 0;
					this.w8i[n].UpdateItem(o), this.$8i[n].Refresh(o, e.IsTrialRole());
				}
				this.Tqt();
			}),
			(this.OnEquipError = () => {
				this.T9i();
			}),
			(this.OnClickFailVision = (e) => {
				this.Mdo() && this.T9i();
			}),
			(this.OnClickVision = (e) => {
				var t;
				this.Mdo() &&
					(this.T9i(),
					(t = this.plo.GetCurSelectRoleData()).IsTrialRole()
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"RolePhantomTrialTips",
							)
						: ((this.q8i = e),
							(ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex =
								e),
							(e =
								ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
									t.GetRoleId(),
									e,
								)),
							(ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId =
								e),
							this.Sdo(!0),
							this.c7i(),
							this.T9i(),
							AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_click"),
							UiManager_1.UiManager.OpenView(
								"VisionEquipmentView",
								t.GetRoleId(),
							),
							this.UiViewSequence.PlaySequencePurely("HideView")));
			}),
			(this.OnPointerDownCallBack = (e) => {
				if (this.Mdo()) {
					this.GetItem(7).SetRaycastTarget(!0);
					var t = this.$8i.length;
					for (let e = 0; e < t; e++) this.$8i[e].StartClickCheckTimer();
					this.F8i = 999;
				}
			}),
			(this.OnBeginDrag = (e) => {
				if (((this.F8i = e), !this.plo.GetCurSelectRoleData().IsTrialRole())) {
					this.$8i.forEach((e) => {
						e.StartDragState();
					});
					var t = this.$8i.length;
					for (let e = 0; e < t; e++)
						ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
							this.$8i[e].GetCurrentIndex(),
						) && this.$8i[e].SetDragItemHierarchyMax();
					this.$8i[e].SetItemToPointerPosition(),
						AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
				}
			}),
			(this.OnDragEndCallBack = (e, t) => {
				var i, o;
				1 <= t.length
					? ((i = e.GetCurrentIndex()),
						(e = VisionCommonDragItem_1.VisionCommonDragItem.GetOverlapIndex(
							e,
							t,
						)),
						(t = this.plo.GetCurSelectRoleData()),
						(o =
							ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
								t.GetRoleId(),
							).GetIncrIdList()),
						this.$9i(i, !0),
						this.$9i(e, !0),
						this.Y9i(i, !0),
						this.Y9i(e, !0),
						ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
							o[i],
							t.GetRoleId(),
							e,
							i,
							!0,
						))
					: (this.T9i(),
						AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop"));
			}),
			(this.J9i = (e, t, i) => {
				i
					? (UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !0),
						(this.udo = !1),
						(this.Uqe = 0),
						(i = this.$8i[t].GetAnimationTargetPos()),
						this.$8i[e].SetDragComponentToTargetPositionParam(i),
						(i = this.$8i[e].GetAnimationTargetPos()),
						this.$8i[t].SetDragComponentToTargetPositionParam(i),
						(this.P8i = e),
						(this.x8i = t),
						this.$9i(this.P8i, !0),
						this.$9i(this.x8i, !0),
						this.Y9i(this.P8i, !0),
						this.Y9i(this.x8i, !0),
						(this.udo = !0),
						AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"))
					: this.RefreshPhantom();
			}),
			(this.Sdo = (e) => {
				e &&
					(UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor(),
					(this.gdo = !0));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIText],
		]),
			(this.BtnBindInfo = [[6, this.vdo]]);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.OnChangeRole,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
				this.J9i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PhantomPersonalSkillActive,
				this.RefreshPhantom,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PhantomEquipError,
				this.OnEquipError,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ResetRoleFlag,
				this.fdo,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.OnChangeRole,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
				this.J9i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PhantomPersonalSkillActive,
				this.RefreshPhantom,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PhantomEquipError,
				this.OnEquipError,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ResetRoleFlag,
				this.fdo,
			);
	}
	async $8t() {
		await ControllerHolder_1.ControllerHolder.PhantomBattleController.OpenPhantomBattleFetterView(),
			this.Sdo(!0);
	}
	async OnBeforeStartAsync() {
		(this.plo = this.ExtraParams),
			void 0 === this.plo
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleVisionTabView",
					])
				: ((this.Cdo = new RoleVisionInfoPanel_1.RoleVisionInfoPanel(
						this.GetItem(5),
					)),
					await this.Cdo.Init(),
					await this.Edo());
	}
	OnStart() {
		this.GetItem(7).SetUIActive(!0),
			this.GetItem(7).SetRaycastTarget(!1),
			this.Cdo.SetActive(!0),
			this.Cdo.SetConfirmButtonCall(() => {
				this.OnClickVision(this.q8i);
			}),
			this.GetButton(6).RootUIComp.SetUIActive(!0),
			(this.ddo =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurveTime());
	}
	async Edo() {
		for (let t = 0; t <= 4; t++) {
			var e = this.plo.GetCurSelectRoleId();
			this.w8i.push(
				new RoleVisionDragHeadItem_1.RoleVisionDragHeadItem(
					this.GetItem(t),
					0 + t,
					e,
					!0,
				),
			);
		}
		await Promise.all([...this.w8i.map(async (e) => e.Init())]),
			this.w8i.forEach((e) => {
				var t = new VisionCommonDragItem_1.VisionCommonDragItem(
					e.GetRootItem(),
					e.GetDragComponent(),
					this.GetItem(7),
					e.GetCurrentIndex(),
				);
				this.$8i.push(t),
					t.SetOnDragAnimationStartFunction(e.OnDragItemDragBegin),
					t.SetOnDragAnimationEndFunction(e.OnDragItemDragEnd),
					t.SetOnOverlayCallBack(e.OnOverlay),
					t.SetOnUnOverlayCallBack(e.OnUnOverlay);
			}),
			this.$8i.forEach((e) => {
				e.SetOnClickCallBack(this.OnClickVision),
					e.SetOnClickFailCallBack(this.OnClickFailVision),
					e.SetDragCheckItem(this.$8i),
					e.SetDragSuccessCallBack(this.OnDragEndCallBack),
					e.SetPointerDownCallBack(this.OnPointerDownCallBack),
					e.SetOnBeginDragCall(this.OnBeginDrag);
			});
	}
	PlayMontageStart(e = !1) {
		RoleController_1.RoleController.PlayRoleMontage(8, e);
	}
	OnBeforeShow() {
		ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex(),
			this.pdo
				? (UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor(),
					this.PlayMontageStart(!0),
					(this.pdo = !1))
				: this.gdo
					? (UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor(),
						this.PlayMontageStart(!0),
						(this.gdo = !1))
					: this.PlayMontageStart(),
			(this.q8i = 0),
			this.Og(),
			this.ydo(),
			this.c7i(),
			(this.F8i = 999),
			this.T9i();
		var e = this.plo.GetCurSelectRoleId();
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
			e,
		);
	}
	Og() {
		this.RefreshPhantom();
		var e = this.plo.GetCurSelectRoleData(),
			t = e.IsTrialRole();
		ControllerHolder_1.ControllerHolder.PhantomBattleController.ChangeRoleEvent(
			e.GetDataId(),
		),
			this.Cdo.RefreshView(this.plo),
			this.GetButton(6).RootUIComp.SetUIActive(!t),
			this.Tqt();
	}
	Tqt() {
		var e = this.plo.GetCurSelectRoleData();
		let t = 0,
			i = 0;
		(i = e?.IsTrialRole()
			? ((t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(
						e.GetDataId(),
					)),
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionReachableCostMax())
			: ((t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(
						e.GetRoleId(),
					)),
				this.d7i())),
			this.GetText(8).SetText(
				StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), i.toString()),
			),
			(e = e.GetRoleId()),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
				e,
			);
	}
	d7i() {
		return ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
	}
	OnBeforeHide() {
		UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", !1),
			UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
	}
	ydo() {
		var e = this.w8i.length;
		for (let t = 0; t < e; t++) this.w8i[t].SetToggleState(2);
	}
	c7i() {
		var e = this.w8i.length;
		for (let t = 0; t < e; t++) this.w8i[t].SetToggleState(0);
	}
	$9i(e, t) {
		0 <= e && this.$8i[e].SetMovingState(t);
	}
	Y9i(e, t) {
		0 <= e && this.w8i[e].SetAnimationState(t);
	}
	OnTickUiTabViewBase(e) {
		this.Ido(e), this.Tdo(e);
	}
	Tdo(e) {
		if (this.udo) {
			this.Uqe += e;
			let t = this.Uqe / this.ddo;
			1 <= t && (t = 1),
				this.$8i[this.P8i].TickDoCeaseAnimation(t),
				this.$8i[this.x8i].TickDoCeaseAnimation(t),
				1 <= t && (this.t7i(), (this.udo = !1));
		}
	}
	Ido(e) {
		if (this.cdo) {
			this.Uqe += e;
			let t = this.Uqe / this.ddo;
			1 <= t && (t = 1),
				this.$8i[this.F8i].TickDoCeaseAnimation(t),
				1 <= t && (this.W9i(this.F8i), (this.cdo = !1));
		}
	}
	Mdo() {
		return !(this.udo || this.cdo || this.mdo);
	}
	async t7i() {
		(this.mdo = !0),
			this.$9i(this.P8i, !1),
			this.$9i(this.x8i, !1),
			await this.I7i(this.P8i),
			this.Y9i(this.P8i, !1),
			this.Y9i(this.x8i, !1),
			await this.T9i(!1),
			this.RefreshPhantom(),
			(this.mdo = !1),
			UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1),
			(this.F8i = 999);
	}
	async W9i(e) {
		(this.x8i = e),
			(this.mdo = !0),
			this.$9i(this.P8i, !1),
			this.$9i(this.x8i, !1),
			await this.I7i(e),
			this.Y9i(this.P8i, !1),
			this.Y9i(this.x8i, !1),
			this.T9i(!1),
			(this.mdo = !1),
			this.L8i.SetResult(!0),
			(this.F8i = 999);
	}
	async I7i(e) {
		this.$8i[e].SetToTargetParentAndSetStretch(
			this.w8i[this.x8i].GetRootItem(),
		),
			this.$8i[this.x8i].SetToTargetParentAndSetStretch(
				this.w8i[e].GetRootItem(),
			),
			this.$8i[e].DoCeaseSequence(),
			this.x8i !== e &&
				this.$8i[this.x8i].GetCurrentData() &&
				this.$8i[this.x8i].DoCeaseSequence(),
			await this.$8i[e].GetCeaseAnimationPromise()?.Promise;
	}
	async T9i(e = !0) {
		var t = this.plo.GetCurSelectRoleData().IsTrialRole();
		e &&
			!t &&
			999 !== this.F8i &&
			(UiLayer_1.UiLayer.SetShowMaskLayer(
				"playBackToStartPositionAnimation",
				!0,
			),
			(this.cdo = !0),
			(this.Uqe = 0),
			(this.L8i = new CustomPromise_1.CustomPromise()),
			(e = this.$8i[this.F8i].GetAnimationTargetPos()),
			this.$8i[this.F8i].SetDragComponentToTargetPositionParam(e),
			this.$9i(this.F8i, !0),
			await this.L8i.Promise,
			UiLayer_1.UiLayer.SetShowMaskLayer(
				"playBackToStartPositionAnimation",
				!1,
			)),
			this.GetItem(7).SetRaycastTarget(!1),
			this.$8i.forEach((e) => {
				e.ResetPosition();
			}),
			this.w8i.forEach((e) => {
				e.ResetPosition();
			}),
			(this.P8i = -1),
			(this.x8i = -1);
	}
	Ldo(e) {
		if (
			this.Mdo() &&
			0 <= e &&
			((e = this.w8i[e]?.GetDragComponent()?.RootUIComp), e)
		)
			return [e, e];
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (1 === e.length) {
			if ("Equipped" === e[0])
				return (
					(t = this.plo.GetCurSelectRoleData()),
					(t =
						ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
							t,
						).findIndex((e) => e)),
					this.Ldo(t)
				);
			if ("First" === e[0]) return this.Ldo(0);
			var t = this.Cdo?.GetTxtItemByIndex(Number(e[0]));
			if (t) return [t, t];
		}
	}
	OnBeforeDestroy() {
		this.udo = !1;
	}
}
exports.RoleVisionTabView = RoleVisionTabView;
