"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponReplaceView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance"),
	SelectablePropDataUtil_1 = require("../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	WeaponController_1 = require("../WeaponController"),
	WeaponDefine_1 = require("../WeaponDefine"),
	WeaponDetailTipsComponent_1 = require("../WeaponDetailTipsComponent"),
	WeaponReplaceMediumItemGrid_1 = require("./WeaponReplaceMediumItemGrid");
class WeaponReplaceView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.SelectedIncId = 0),
			(this.RoleDataId = 0),
			(this.hOo = void 0),
			(this.lOo = void 0),
			(this._Oo = !1),
			(this.SortComponent = void 0),
			(this.LoopScrollView = void 0),
			(this.ItemDataList = void 0),
			(this.pco = void 0),
			(this.W9t = () => {
				var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.RoleDataId,
				).GetRoleId();
				e =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e);
				this.pco.Model?.CheckGetComponent(14)?.SetWeaponByWeaponData(e),
					this.CloseMe();
			}),
			(this.uOo = () => {
				this.SetContrast();
			}),
			(this.cOo = (e) => (
				(e = this.ItemDataList[e]),
				SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(e)
			)),
			(this.mOo = () => {
				var e = new WeaponReplaceMediumItemGrid_1.WeaponReplaceMediumItemGrid();
				return (
					e.BindOnExtendToggleStateChanged(this.U4e),
					e.BindOnCanExecuteChange(this.T7e),
					e
				);
			}),
			(this.U4e = (e) => {
				(e = e.Data.IncId), this.SelectedWeaponHandle(e);
			}),
			(this.T7e = (e, t) => this.SelectedIncId !== e.IncId),
			(this.UpdateList = (e) => {
				this.LoopScrollView.ReloadProxyData(this.cOo, e.length, !1),
					0 < this.SelectedIncId &&
						((e = this.GetWeaponItemIndex(this.SelectedIncId)),
						this.LoopScrollView.ScrollToGridIndex(e),
						this.LoopScrollView.SelectGridProxy(e, !0));
			}),
			(this.dOo = (e) => {
				(e = { WeaponIncId: e, IsFromRoleRootView: !0 }),
					UiManager_1.UiManager.OpenView("WeaponRootView", e),
					WeaponController_1.WeaponController.RoleFadeIn(
						UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor(),
					);
			}),
			(this.COo = (e) => {
				var t,
					o = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
						this.RoleDataId,
					),
					a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
				const n = o.GetRoleId();
				a.HasRole()
					? ((o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponName(
							a.GetWeaponConfig().WeaponName,
						)),
						(a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
							a.GetRoleId(),
						).GetName()),
						(t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(22)).SetTextArgs(
							o,
							a,
						),
						t.FunctionMap.set(2, () => {
							WeaponController_1.WeaponController.SendPbEquipTakeOnRequest(
								n,
								WeaponDefine_1.WEAPON_EQUIPTYPE,
								e,
							);
						}),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							t,
						))
					: WeaponController_1.WeaponController.SendPbEquipTakeOnRequest(
							n,
							WeaponDefine_1.WEAPON_EQUIPTYPE,
							e,
						);
			}),
			(this.gOo = () => {
				this.UpdateCurrentTips(),
					this.UpdateSelectedTips(this.SelectedIncId),
					this.RefreshPropItem();
			}),
			(this.fOo = (e, t) => {
				this.lOo.GetWeaponIncId() === e && this.lOo.UpdateWeaponLock(t),
					this.hOo.GetWeaponIncId() === e && this.hOo.UpdateWeaponLock(t),
					this.RefreshPropItem();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.W9t],
				[4, this.uOo],
			]);
	}
	async OnBeforeStartAsync() {
		(this.hOo = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
			await this.hOo.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
			(this.lOo = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent()),
			await this.lOo.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
	}
	OnStart() {
		(this.SelectedIncId = this.OpenParam),
			(this.pco = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor());
		var e = this.GetItem(6).GetOwner();
		(this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(0),
			e,
			this.mOo,
		)),
			this.hOo.SetReplaceFunction(this.COo),
			this.hOo.SetCultureFunction(this.dOo),
			this.hOo.SetCanShowEquip(!0),
			this.lOo.SetCanShowEquip(!0),
			this.lOo.SetCanShowLock(!1),
			(this.SortComponent = new SortEntrance_1.SortEntrance(
				this.GetItem(5),
				this.UpdateList,
			));
	}
	SetContrast() {
		var e;
		(this._Oo = !this._Oo),
			this.lOo &&
				((e = this._Oo), this.SetWeaponTipsRootItemState(e), e) &&
				this.UpdateCurrentTips();
	}
	OnBeforeShow() {
		ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(4);
		var e,
			t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.SelectedIncId,
			);
		void 0 !== t &&
			(t.HasRole() && (this.RoleDataId = t.GetRoleId()),
			(e = t.GetWeaponConfig()),
			(this.ItemDataList =
				ModelManager_1.ModelManager.WeaponModel.GetWeaponListFromReplace(
					e.WeaponType,
				)),
			this.SortComponent.UpdateData(3, this.ItemDataList),
			(this.SelectedIncId = 0),
			this.SelectedWeaponHandle(t.GetIncId(), !0));
	}
	OnAfterHide() {
		this._Oo && this.SetContrast();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.EquipWeapon,
			this.gOo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnItemLock,
				this.fOo,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.EquipWeapon,
			this.gOo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnItemLock,
				this.fOo,
			);
	}
	OnBeforeDestroy() {
		this.hOo.Destroy(), this.lOo.Destroy(), this.SortComponent.Destroy();
	}
	RefreshPropItem() {
		this.LoopScrollView.RefreshAllGridProxies();
	}
	SetWeaponTipsRootItemState(e) {
		this.UiViewSequence.StopSequenceByKey("TipStart"),
			this.UiViewSequence.StopSequenceByKey("TipClose"),
			this.UiViewSequence.PlaySequence(e ? "TipStart" : "TipClose");
	}
	SelectedWeaponHandle(e, t = !1) {
		var o;
		this.SelectedIncId === e ||
			(this.UpdateSelectedTips(e), (o = this.GetWeaponItemIndex(e)) < 0) ||
			(this.LoopScrollView.SelectGridProxy(o, t),
			(this.SelectedIncId = e),
			(o = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)),
			this.pco.Model?.CheckGetComponent(14)?.SetWeaponByWeaponData(o));
	}
	UpdateSelectedTips(e) {
		(e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)),
			this.hOo.UpdateComponent(e),
			(e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.RoleDataId,
			)),
			this.hOo.UpdateEquip(e.GetRoleId());
	}
	UpdateCurrentTips() {
		var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
			this.RoleDataId,
		);
		this.lOo.UpdateComponent(e),
			(e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.RoleDataId,
			));
		this.lOo.UpdateEquip(e.GetRoleId());
	}
	GetWeaponItemIndex(e) {
		for (let t = 0; t < this.ItemDataList.length; t++)
			if (this.ItemDataList[t].GetUniqueId() === e) return t;
		return -1;
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (1 !== e.length || isNaN(Number(e[0])))
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Guide",
					17,
					"武器替换界面聚焦引导ExtraParam参数配置错误",
					["configParams", e],
				);
		else {
			var t = Number(e[0]);
			let a;
			for (let e = 0; e < this.ItemDataList.length; e++) {
				var o =
					SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
						this.ItemDataList[e],
					);
				if (o.ItemId === t && ((a = e), o.RoleId !== this.RoleDataId)) break;
			}
			if (
				(-1 !== this.LoopScrollView.IZt &&
					this.LoopScrollView.ScrollToGridIndex(a),
				(e = this.LoopScrollView.GetGrid(a)) && void 0 !== a)
			)
				return [e, e];
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Guide",
					17,
					"武器替换界面聚焦引导ExtraParam参数配置错误, 找不到道具",
					["itemId", t],
				);
		}
	}
}
exports.WeaponReplaceView = WeaponReplaceView;
