"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuickRoleSelectView = exports.QuickRoleSelectViewData = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance"),
	EditFormationDefine_1 = require("../EditFormation/EditFormationDefine"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
	TeamRoleGrid_1 = require("./TeamRoleGrid");
class QuickRoleSelectViewData {
	constructor(e, t, i) {
		(this.UseWay = void 0),
			(this.SelectedRoleList = void 0),
			(this.RoleList = void 0),
			(this.CanConfirm = void 0),
			(this.OnConfirm = void 0),
			(this.OnBack = void 0),
			(this.OnHideFinish = void 0),
			(this.UseWay = e),
			(this.SelectedRoleList = t),
			(this.RoleList = i);
	}
}
exports.QuickRoleSelectViewData = QuickRoleSelectViewData;
class QuickRoleSelectView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.ami = void 0),
			(this.jho = void 0),
			(this.Kho = void 0),
			(this.xUt = () => {
				var e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
					t = new Array();
				for (
					let o = 1;
					o <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
					o++
				) {
					var i = e.get(o);
					i && t.push(i.GetDataId());
				}
				var o = this.Pe?.CanConfirm;
				(o && !o(t)) ||
					(this.Pe?.OnConfirm?.(t),
					UiManager_1.UiManager.CloseView(this.Info.Name));
			}),
			(this.W9t = () => {
				this.Pe?.OnBack?.(), UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.z9e = () => {
				var e = new TeamRoleGrid_1.TeamRoleGrid();
				return (
					e.BindOnExtendToggleStateChanged(this.ToggleFunction),
					e.BindOnCanExecuteChange(this.CanExecuteChange),
					e
				);
			}),
			(this.ToggleFunction = (e) => {
				var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
					i = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet,
					o = e.Data;
				if (0 === e.State) {
					for (const e of t)
						if (e[1] === o) {
							t.delete(e[0]), i.delete(o.GetDataId());
							break;
						}
				} else if (1 === e.State)
					for (
						let e = 1;
						e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
						e++
					)
						if (!t.has(e)) {
							t.set(e, o), i.add(o.GetDataId());
							break;
						}
				(e = this.Kho.indexOf(o)), this.jho.RefreshGridProxy(e);
			}),
			(this.CanExecuteChange = (e, t, i) =>
				0 !== i ||
				((i =
					ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >=
					EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) &&
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"EditBattleTeamRoleFull",
					),
				!i)),
			(this.Qho = (e, t) => {
				var i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
					o = new Array();
				for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++)
					i.has(e) && o.push(i.get(e));
				for (const t of e) o.includes(t) || o.push(t);
				if (
					((e = 0 < o.length),
					this.GetItem(11).SetUIActive(!e),
					this.GetButton(3).RootUIComp.SetUIActive(e),
					this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(e),
					e)
				) {
					this.jho.RefreshByData(o);
					for (const e of i.values()) {
						var r = this.Kho.indexOf(e),
							a = o.indexOf(e);
						0 <= this.jho.IZt &&
							r !== a &&
							(ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(
								e.GetDataId(),
							),
							this.jho.UnsafeGetGridProxy(r)?.OnDeselected(!1));
					}
					for (const e of i.values()) {
						var l = o.indexOf(e);
						ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(
							e.GetDataId(),
						),
							this.jho.UnsafeGetGridProxy(l)?.OnForceSelected();
					}
					this.Kho = o;
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIInteractionGroup],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[1, UE.UILoopScrollViewComponent],
			[2, UE.UIText],
			[5, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIText],
			[10, UE.UIItem],
			[11, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[3, this.xUt],
				[4, this.W9t],
			]);
	}
	OnStart() {
		(this.Pe = this.OpenParam),
			(this.jho = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(1),
				this.GetItem(10).GetOwner(),
				this.z9e,
			));
	}
	OnBeforeDestroy() {
		this.Pe?.OnHideFinish?.(),
			(this.Pe = void 0),
			this.ami?.Destroy(),
			(this.ami = void 0),
			this.jho?.ClearGridProxies(),
			(this.jho = void 0),
			this.Kho?.splice(0, this.Kho.length),
			(this.Kho = void 0);
	}
	OnBeforeShow() {
		this.Kho = this.Pe?.RoleList;
		var e = this.Pe?.SelectedRoleList,
			t =
				(ModelManager_1.ModelManager.RoleSelectModel.ClearData(),
				ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap);
		if (e)
			for (
				let o = 1;
				o <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(o > e.length);
				o++
			) {
				var i = e[o - 1];
				for (const e of this.Kho)
					if (e.GetDataId() === i) {
						t.set(o, e);
						break;
					}
			}
		var o = this.GetItem(8);
		(this.ami = new FilterSortEntrance_1.FilterSortEntrance(o, this.Qho)),
			this.Kho.sort(
				(e, t) => t.GetRoleConfig().Priority - e.GetRoleConfig().Priority,
			),
			this.ami.UpdateData(this.Pe.UseWay, this.Kho),
			this.GetItem(5).SetUIActive(!1),
			this.GetText(9).SetUIActive(!1),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "ConfirmText");
	}
}
exports.QuickRoleSelectView = QuickRoleSelectView;
