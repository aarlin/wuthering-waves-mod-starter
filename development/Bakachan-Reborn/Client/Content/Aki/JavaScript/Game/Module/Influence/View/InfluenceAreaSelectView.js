"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfluenceAreaSelectView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
class InfluenceAreaSelectView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Yri = void 0),
			(this.Jri = void 0),
			(this.zri = 0),
			(this.gpt = () => {
				this.CloseMe();
			}),
			(this.xUt = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RefreshInfluencePanel,
					this.zri,
				),
					this.CloseMe();
			}),
			(this.sGe = (e, t) => (
				(t = new AreaButtonItem(t)).UpdateItem(e.Id),
				t.SetToggleFunction(this.U4e),
				t.SetCanExecuteChange(this.T7e),
				{ Key: e.Id, Value: t }
			)),
			(this.U4e = (e) => {
				this.zri && this.Zri(this.zri).SetToggleState(0, !1), (this.zri = e);
				var t = this.GetText(3),
					i = this.GetText(4),
					n =
						ModelManager_1.ModelManager.InfluenceReputationModel.IsCountryUnLock(
							e,
						),
					r = this.GetInteractionGroup(6);
				n
					? ((n =
							ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
								e,
							)),
						LguiUtil_1.LguiUtil.SetLocalTextNew(t, n.Title),
						LguiUtil_1.LguiUtil.SetLocalTextNew(i, n.Desc),
						r.SetInteractable(!0))
					: (LguiUtil_1.LguiUtil.SetLocalText(t, "AreaLockTitle"),
						LguiUtil_1.LguiUtil.SetLocalText(i, "AreaLockContent"),
						r.SetInteractable(!1));
			}),
			(this.T7e = (e) => this.zri !== e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIGridLayout],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
			[6, UE.UIInteractionGroup],
		]),
			(this.BtnBindInfo = [
				[0, this.gpt],
				[5, this.xUt],
			]);
	}
	OnStart() {
		this.Yri = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetGridLayout(1),
			this.sGe,
		);
		var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList();
		this.Yri.RebuildLayoutByDataNew(e),
			(this.Jri = new AreaButtonItem(this.GetItem(2))),
			this.Jri.UpdateItem(InfluenceReputationDefine_1.NO_COUNTRY_ID),
			this.Jri.SetToggleFunction(this.U4e),
			this.Jri.SetCanExecuteChange(this.T7e);
	}
	Zri(e) {
		return (e = this.Yri.GetLayoutItemByKey(e)) || this.Jri;
	}
	OnAfterShow() {
		var e = this.OpenParam;
		this.Zri(e).SetToggleState(1, !0);
	}
	OnBeforeDestroy() {
		this.Yri.ClearChildren(),
			(this.Yri = void 0),
			this.Jri.Destroy(),
			(this.Jri = void 0);
	}
}
exports.InfluenceAreaSelectView = InfluenceAreaSelectView;
class AreaButtonItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.U4e = void 0),
			(this.OBt = void 0),
			(this.z4t = 0),
			(this.x4e = (e) => {
				1 === e && this.U4e(this.z4t);
			}),
			(this.T7e = () => !this.OBt || this.OBt(this.z4t)),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIExtendToggle],
			[2, UE.UIItem],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.x4e]]);
	}
	OnStart() {
		this.GetExtendToggle(1).CanExecuteChange.Bind(this.T7e);
	}
	OnBeforeDestroy() {
		this.GetExtendToggle(1).CanExecuteChange.Unbind();
	}
	eni(e) {
		var t =
			ModelManager_1.ModelManager.InfluenceReputationModel.HasRedDotInCurrentCountry(
				this.z4t,
			);
		this.GetItem(3).SetUIActive(t && e);
	}
	UpdateItem(e) {
		this.z4t = e;
		var t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e),
			i =
				((e =
					ModelManager_1.ModelManager.InfluenceReputationModel.IsCountryUnLock(
						e,
					)),
				this.GetTexture(0)),
			n = this.GetItem(2);
		i.SetUIActive(e),
			n.SetUIActive(!e),
			e && this.SetTextureByPath(t.Logo, i),
			this.eni(e);
	}
	SetToggleFunction(e) {
		this.U4e = e;
	}
	SetCanExecuteChange(e) {
		this.OBt = e;
	}
	SetToggleState(e, t) {
		this.GetExtendToggle(1).SetToggleStateForce(e, t);
	}
}
