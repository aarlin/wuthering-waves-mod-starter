"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityBeginnerTargetItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
	RoleController_1 = require("../../../RoleUi/RoleController"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	WeaponTrialData_1 = require("../../../Weapon/Data/WeaponTrialData"),
	WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
	ActivityController_1 = require("../../ActivityController");
class ActivityBeginnerTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.aNe = [-1, ""]),
			(this.hNe = !1),
			(this.lNe = -1),
			(this.DataId = -1),
			(this._Ne = void 0),
			(this.uNe = () => {
				var e;
				if (this.hNe)
					switch (this.aNe[0] - 1) {
						case 0:
							UiManager_1.UiManager.OpenView("QuestView", this.aNe[1]);
							break;
						case 1:
							var t = ConfigManager_1.ConfigManager.MapConfig?.GetConfigMark(
								Number(this.aNe[1]),
							);
							t
								? ((t = {
										MarkType: t.ObjectType,
										MarkId: t.MarkId,
										OpenAreaId: 0,
									}),
									WorldMapController_1.WorldMapController.OpenView(1, !1, t))
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Activity",
										5,
										"配置了错误的鸣域新程",
										["Type: ", this.aNe[0]],
										["Parma: ", this.aNe[1]],
									);
							break;
						case 2:
							"RoleRootView" === this.aNe[1]
								? RoleController_1.RoleController.OpenRoleMainView(0)
								: UiManager_1.UiManager.OpenView(this.aNe[1]);
							break;
						case 3:
							(t = this.aNe[1]),
								RoleController_1.RoleController.OpenRoleMainView(0, 0, [], t);
							break;
						case 4:
							(t = { TabViewName: this.aNe[1], Param: void 0 }),
								UiManager_1.UiManager.OpenView("CalabashRootView", t);
							break;
						case 5:
							(t = this.aNe[1].split("-")),
								ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
									Number(t[0]),
									Number(t[1]),
								);
							break;
						case 6:
							ActivityController_1.ActivityController.OpenActivityById(
								Number(this.aNe[1]),
							);
							break;
						case 7:
							ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
								this.aNe[1],
							);
							break;
						default:
							Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Activity",
									5,
									"配置了错误的鸣域新程",
									["Type: ", this.aNe[0]],
									["type: ", this.aNe[1]],
								);
					}
				else
					(e =
						ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
							this.lNe,
						).HintText),
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [[4, this.uNe]]);
	}
	OnStart() {
		(this._Ne = new SmallItemGrid_1.SmallItemGrid()),
			this._Ne.Initialize(this.GetItem(2).GetOwner());
	}
	Refresh(e, t, r) {
		if (
			((this.DataId = e),
			(e =
				ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(
					e,
				)),
			this.cNe(e),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.SourceTitle),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.SourceDesc),
			(this.lNe = e.ConditionId),
			!(e.JumpTo.size <= 0))
		)
			for (var [i, o] of e.JumpTo) (this.aNe[0] = i), (this.aNe[1] = o);
	}
	cNe(e) {
		switch (e.SourceType) {
			case 1:
				var t = {
					Data: void 0,
					Type: 4,
					ItemConfigId:
						ConfigManager_1.ConfigManager.WeaponConfig?.GetTrialWeaponConfig(
							e.SourceId,
						)?.WeaponId,
				};
				this._Ne?.Apply(t),
					this._Ne?.BindOnExtendToggleClicked(() => {
						var t =
							((t = new WeaponTrialData_1.WeaponTrialData()).SetTrialId(
								e.SourceId,
							),
							{ WeaponDataList: [t], SelectedIndex: 0 });
						UiManager_1.UiManager.OpenView("WeaponPreviewView", t);
					});
				break;
			case 3:
				(t = { Data: void 0, Type: 4, ItemConfigId: e.SourceId }),
					this._Ne?.Apply(t),
					this._Ne?.BindOnExtendToggleClicked(() => {
						ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
							e.SourceId,
						);
					});
				break;
			case 0:
				(t = { Data: void 0, Type: 2, ItemConfigId: e.SourceId }),
					this._Ne?.Apply(t),
					this._Ne?.BindOnExtendToggleClicked(() => {
						var t = [e.SourceId];
						RoleController_1.RoleController.OpenRoleMainView(1, 0, t);
					});
				break;
			case 2:
				(t = { Data: void 0, Type: 3, ItemConfigId: e.SourceId }),
					this._Ne?.Apply(t),
					this._Ne?.BindOnExtendToggleClicked(() => {
						ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
							e.SourceId,
						);
					});
		}
	}
	SetEnableJump(e) {
		this.hNe = e;
	}
	SetFinish(e) {
		this.GetItem(0)?.SetUIActive(!e),
			this.GetItem(1)?.SetUIActive(e),
			this.GetItem(3)?.SetUIActive(e),
			this.GetButton(4)?.RootUIComp.SetUIActive(!e);
	}
}
exports.ActivityBeginnerTargetItem = ActivityBeginnerTargetItem;
