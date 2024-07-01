"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaSelectionItem = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	RoleController_1 = require("../../RoleUi/RoleController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
class GachaSelectionItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.$be = void 0),
			(this.Pe = void 0),
			(this.TDe = void 0),
			(this.QHt = void 0),
			(this.XHt = !1),
			(this.ToggleCallBack = void 0),
			(this.CanToggleChange = void 0),
			(this.I6e = () => {
				this.ToggleCallBack?.(this.GridIndex);
			}),
			(this.IHt = () => {
				var e,
					t = this.QHt.ShowIdList[0];
				t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(t);
				this.XHt
					? ((e = [t.TrialId]),
						RoleController_1.RoleController.OpenRoleMainView(1, 0, e))
					: ((e = new WeaponTrialData_1.WeaponTrialData()).SetTrialId(
							t.TrialId,
						),
						(t = { WeaponDataList: [e], SelectedIndex: 0 }),
						UiManager_1.UiManager.OpenView("WeaponPreviewView", t));
			}),
			(this.RefreshLeftTime = () => {
				this.TDe &&
					(TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe),
					(this.TDe = void 0));
				var e = this.GetText(6),
					t = this.Pe.GachaInfo,
					i = this.Pe.PoolInfo.Id;
				0 === (t = t.GetPoolEndTimeByPoolId(i)) ||
				(i = t - TimeUtil_1.TimeUtil.GetServerTime()) <= 0
					? e.SetUIActive(!1)
					: (e.SetUIActive(!0),
						(t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(i)),
						e.SetText(t.CountDownText),
						0 < (i = t.RemainingTime) &&
							((e = i),
							(this.TDe = TimerSystem_1.RealTimeTimerSystem.Delay(
								this.RefreshLeftTime,
								1e3 * e,
							))));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UITexture],
			[4, UE.UIHorizontalLayout],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[8, this.IHt],
				[0, this.I6e],
			]);
	}
	OnStart() {
		(this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
			this.GetHorizontalLayout(4),
		)),
			this.GetExtendToggle(0)?.CanExecuteChange.Bind(
				() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex),
			);
	}
	Refresh(e, t, i) {
		var a = (this.Pe = e).GachaInfo;
		(e = e.PoolInfo.Id),
			this.GetItem(9)?.SetUIActive(a.UsePoolId === e),
			(a = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e)),
			(e = (this.QHt = a).Type),
			(this.XHt = ModelManager_1.ModelManager.GachaModel.IsRolePool(e)),
			(e = a.ShowIdList[0]),
			(e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e));
		this.SetTextureByPath(e.GachaResultViewTexture, this.GetTexture(1)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), a.SummaryTitle),
			this.RefreshLeftTime(),
			this.XHt ? this.$Ht() : this.YHt(),
			t
				? this.GetExtendToggle(0)?.SetToggleState(1)
				: this.GetExtendToggle(0)?.SetToggleState(0);
	}
	OnSelected(e) {
		this.GetExtendToggle(0)?.SetToggleState(1);
	}
	OnDeselected(e) {
		this.GetExtendToggle(0)?.SetToggleState(0);
	}
	$Ht() {
		var e = this.QHt.ShowIdList[0],
			t =
				((e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Name),
				this.GetItem(2)?.SetUIActive(!0),
				ConfigManager_1.ConfigManager.GachaConfig.GetGachaElementTexturePath(
					e.ElementId,
				));
		this.SetElementIcon(t, this.GetTexture(3), e.ElementId), (t = e.QualityId);
		this.$be?.RebuildLayout(t);
	}
	YHt() {
		var e = this.QHt;
		this.GetItem(2)?.SetUIActive(!1), (e = e.ShowIdList[0]);
		(e =
			ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(e)) &&
			(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.WeaponName),
			(e = e.QualityId),
			this.$be?.RebuildLayout(e));
	}
	OnBeforeDestroy() {
		this.TDe &&
			(TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
	}
}
exports.GachaSelectionItem = GachaSelectionItem;
