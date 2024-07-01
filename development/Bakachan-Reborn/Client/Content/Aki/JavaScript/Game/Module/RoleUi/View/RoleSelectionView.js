"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSelectionView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance"),
	UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	RoleController_1 = require("../RoleController"),
	RoleSelectionMediumItemGrid_1 = require("./RoleSelectionMediumItemGrid");
class RoleSelectionView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.ami = void 0),
			(this.jho = void 0),
			(this.plo = void 0),
			(this.ggo = []),
			(this.fgo = void 0),
			(this.s5i = void 0),
			(this.BackFunction = () => {
				this.fgo !== this.s5i &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RoleSystemChangeRole,
						this.fgo,
					),
					this.CloseMe();
			}),
			(this.z9e = () => {
				var e = new RoleSelectionMediumItemGrid_1.RoleSelectionMediumItemGrid();
				return (
					e.BindOnExtendToggleStateChanged(this.U4e),
					e.BindOnCanExecuteChange(this.OBt),
					e
				);
			}),
			(this.pgo = (e) => {
				(this.ggo = e), this.vgo(e);
			}),
			(this.U4e = (e) => {
				var t = e.State;
				e = e.Data;
				1 === t && (this.jho.DeselectCurrentGridProxy(), this.Mgo(e));
			}),
			(this.OBt = (e, t, i) =>
				!(
					(UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() &&
						void 0 !== this.s5i &&
						0 === i) ||
					(1 === i && this.s5i === e.GetRoleId())
				));
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UILoopScrollViewComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.BackFunction]]);
	}
	OnStart() {
		(this.jho = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(3),
			this.GetItem(4).GetOwner(),
			this.z9e,
		)),
			(this.ami = new FilterSortEntrance_1.FilterSortEntrance(
				this.GetItem(5),
				this.pgo,
			)),
			(this.plo = this.OpenParam);
		var e = [];
		for (const t of this.plo.GetRoleIdList())
			e.push(ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t));
		this.ami.UpdateData(1, e);
	}
	OnBeforeDestroy() {
		ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
			LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RoleSelectionListUpdate,
			),
			this.ami.Destroy(),
			(this.ami = void 0),
			this.jho.ClearGridProxies(),
			(this.jho = void 0),
			(this.ggo = []);
	}
	OnBeforeShow() {
		var e = this.plo.GetCurSelectRoleData();
		this.Mgo(e, !0);
	}
	vgo(e) {
		if (
			(this.jho.DeselectCurrentGridProxy(),
			this.jho.ReloadData(e),
			void 0 !== this.s5i)
		) {
			let t = 0;
			for (const i of e) {
				if (i.GetRoleId() === this.s5i)
					return (
						this.jho.ScrollToGridIndex(t), void this.jho.SelectGridProxy(t)
					);
				t++;
			}
			this.Mgo(this.ggo[0], !0);
		}
	}
	CNt(e) {
		this.GetText(2).SetText(e);
	}
	Sgo(e) {
		var t = e.GetDataId(),
			i = this.s5i ?? 0;
		this.s5i !== t &&
			((this.s5i = t),
			this.CNt(e.GetName()),
			this.plo.SetCurSelectRoleId(this.s5i),
			RoleController_1.RoleController.OnSelectedRoleChange(this.s5i),
			RoleController_1.RoleController.PlayRoleMontage(3, !1, 0 < i));
	}
	Mgo(e, t = !1) {
		var i = this.ggo.indexOf(e);
		0 <= i &&
			(t && this.jho.ScrollToGridIndex(i),
			this.jho.SelectGridProxy(i),
			this.Sgo(e));
	}
}
exports.RoleSelectionView = RoleSelectionView;
