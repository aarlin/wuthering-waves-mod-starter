"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookRoleView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
	FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance"),
	RoleRobotData_1 = require("../RoleUi/RoleData/RoleRobotData"),
	RoleDefine_1 = require("../RoleUi/RoleDefine"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
	HandBookRoleMediumItemGird_1 = require("./HandBookRoleMediumItemGird");
class HandBookRoleView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.RoleScrollView = void 0),
			(this.lqe = void 0),
			(this.w5i = void 0),
			(this.ami = void 0),
			(this.s5i = void 0),
			(this.ggo = []),
			(this.pgo = (e) => {
				(this.ggo = e), this.vgo(e);
			}),
			(this.z9e = () => {
				var e = new HandBookRoleMediumItemGird_1.HandBookRoleMediumItemGird();
				return (
					e.BindOnExtendToggleStateChanged(this.U4e),
					e.BindOnCanExecuteChange(this.OBt),
					e
				);
			}),
			(this.U4e = (e) => {
				var o = e.State;
				e = e.Data;
				1 === o &&
					(this.RoleScrollView.DeselectCurrentGridProxy(), this.Mgo(e));
			}),
			(this.OBt = (e, o, t) =>
				!(
					(UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation() &&
						void 0 !== this.s5i &&
						0 === t) ||
					(1 === t && this.s5i === e.GetDataId())
				)),
			(this.Zho = () => {
				var e = [
					ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(this.s5i)
						?.TrialRole,
				];
				ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(
					1,
					0,
					e,
					void 0,
					() => {},
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UILoopScrollViewComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [[5, this.Zho]]);
	}
	OnBeforeCreate() {
		this.w5i = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
	}
	OnStart() {
		(this.RoleScrollView = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(2),
			this.GetItem(3).GetOwner(),
			this.z9e,
		)),
			(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.lqe.SetCloseCallBack(() => {
				this.CloseMe();
			}),
			this.lqe.SetTitleLocalText("HandBookRoleTitle"),
			(this.ami = new FilterSortEntrance_1.FilterSortEntrance(
				this.GetItem(4),
				this.pgo,
			));
		var e = [];
		for (const t of (
			ConfigManager_1.ConfigManager.RoleConfig?.GetRoleList()
		).filter(
			(e) =>
				1 === e.RoleType &&
				!ModelManager_1.ModelManager.RoleModel.IsMainRole(e.Id),
		)) {
			var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.Id);
			e.push(o || new RoleRobotData_1.RoleRobotData(t.TrialRole));
		}
		e.push(
			ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance(),
		),
			this.ami.UpdateData(21, e),
			this.InitRole();
	}
	OnHandleLoadScene() {
		this.InitRole();
	}
	InitRole() {
		UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
			.Model?.CheckGetComponent(1)
			?.SetTransformByTag("RoleCase");
	}
	vgo(e) {
		this.RoleScrollView.DeselectCurrentGridProxy(),
			this.RoleScrollView.RefreshByData(e, !1, () => {
				let o = 0;
				for (const t of e) {
					if (t.GetDataId() === this.s5i)
						return (
							this.RoleScrollView.ScrollToGridIndex(o),
							void this.RoleScrollView.SelectGridProxy(o)
						);
					o++;
				}
				this.Mgo(this.ggo[0], !0);
			});
	}
	Mgo(e, o = !1) {
		var t = this.ggo.indexOf(e);
		0 <= t &&
			(o && this.RoleScrollView.ScrollToGridIndex(t),
			this.RoleScrollView.SelectGridProxy(t),
			this.Sgo(e));
	}
	Sgo(e) {
		var o,
			t,
			i = e.GetDataId(),
			r = this.s5i ?? 0;
		this.s5i !== i &&
			((this.s5i = i),
			this.CNt(e.GetName()),
			(o = this.GetText(6)),
			(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"HandBookRoleGetDate",
			)),
			i < RoleDefine_1.ROBOT_DATA_MIN_ID
				? (o.SetUIActive(!0),
					o.SetText(
						t +
							TimeUtil_1.TimeUtil.DateFormat4(
								new Date(
									e.GetRoleCreateTime() *
										TimeUtil_1.TimeUtil.InverseMillisecond,
								),
							),
					))
				: o.SetUIActive(!1),
			ControllerHolder_1.ControllerHolder.RoleController.OnSelectedRoleChange(
				this.s5i,
			),
			ControllerHolder_1.ControllerHolder.RoleController.PlayRoleMontage(
				3,
				!1,
				0 < r,
			));
	}
	CNt(e) {
		this.GetText(1).SetText(e);
	}
	OnBeforeDestroy() {
		UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.w5i),
			(this.RoleScrollView = void 0);
	}
}
exports.HandBookRoleView = HandBookRoleView;
