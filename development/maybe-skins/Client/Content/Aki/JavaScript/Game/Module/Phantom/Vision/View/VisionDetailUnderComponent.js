"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionDetailUnderComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class VisionDetailUnderComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.S8i = void 0),
			(this.E8i = void 0),
			(this.y8i = void 0),
			(this.iNe = void 0),
			(this.tNe = void 0),
			(this.I8i = () => {
				this.iNe?.();
			}),
			(this.T8i = () => {
				this.tNe?.();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		(this.E8i = new ButtonItem_1.ButtonItem(this.GetItem(0))),
			this.E8i.SetFunction(this.I8i),
			(this.y8i = new ButtonItem_1.ButtonItem(this.GetItem(1))),
			this.y8i.SetFunction(this.T8i),
			(this.S8i = new EquipRoleAttribute(this.GetItem(2)));
	}
	RefreshRightButtonText(e) {
		this.E8i.SetLocalText(e);
	}
	RefreshLeftButtonText(e) {
		this.y8i.SetLocalText(e);
	}
	SetRightButtonClick(e) {
		this.iNe = e;
	}
	SetLeftButtonClick(e) {
		this.tNe = e;
	}
	RefreshViewByCompareState(e) {
		this.y8i.SetActive(!e), this.E8i.SetActive(!e);
	}
	Update(e) {
		this.S8i.SetActive(
			ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
				e.GetUniqueId(),
			),
		),
			this.S8i.Update(e);
	}
}
exports.VisionDetailUnderComponent = VisionDetailUnderComponent;
class EquipRoleAttribute extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
		];
	}
	Update(e) {
		if (
			ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(
				e.GetUniqueId(),
			)
		) {
			var t =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
						e.GetUniqueId(),
					),
				i =
					((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)),
					ConfigManager_1.ConfigManager.ComponentConfig.GetRoleConfigParam(
						"RoleIcon1",
					));
			this.SetTextureByPath(e[i], this.GetTexture(0));
			let r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
			var o = ConfigManager_1.ConfigManager.RoleConfig.GetAllMainRoleConfig();
			let a = !1;
			var n = o.length;
			for (let e = 0; e < n; e++)
				if (o[e].Id === t) {
					a = !0;
					break;
				}
			a && (r = ModelManager_1.ModelManager.FunctionModel.GetPlayerName()),
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "VisionEquipping", r);
		}
	}
}
