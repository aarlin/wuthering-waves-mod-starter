"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.JoinTeamView = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	MiniElementItem_1 = require("../../Common/MiniElementItem"),
	JoinTeamController_1 = require("../JoinTeamController"),
	RoleController_1 = require("../../RoleUi/RoleController");
class JoinTeamView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.V0i = void 0),
			(this.H0i = !1),
			(this.j0i = () => {
				var e = ModelManager_1.ModelManager.RoleModel,
					t = ModelManager_1.ModelManager.JoinTeamModel.GetRoleDescriptionId();
				(t = ConfigManager_1.ConfigManager.JoinTeamConfig.GetRoleConfigId(t)),
					(e = e.GetRoleDataById(t));
				JoinTeamController_1.JoinTeamController.CloseJoinTeamView(),
					e &&
						RoleController_1.RoleController.OpenRoleMainView(0, e.GetRoleId());
			}),
			(this.ACt = () => {
				JoinTeamController_1.JoinTeamController.CloseJoinTeamView();
			}),
			(this.W0i = () => {
				this.K0i();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UINiagara],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[4, this.j0i],
				[6, this.ACt],
			]);
	}
	OnStart(e = !1) {
		(this.H0i = e),
			this.GetTexture(1)?.SetUIActive(!1),
			this.GetButton(4)?.RootUIComp.SetUIActive(!e),
			this.K0i(),
			this.Ore();
	}
	OnBeforeDestroy() {
		this.kre(), this.V0i && (this.V0i.Destroy(), (this.V0i = void 0));
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshJoinTeamRole,
			this.W0i,
		);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshJoinTeamRole,
			this.W0i,
		);
	}
	K0i() {
		var e,
			t,
			i,
			o,
			n = ModelManager_1.ModelManager.JoinTeamModel.GetRoleDescriptionId();
		n &&
			((e = (o = ConfigManager_1.ConfigManager.JoinTeamConfig).GetRoleNameId(
				n,
			)),
			(t = o.GetRoleTexturePath(n)),
			(i = o.GetRoleElementId(n)),
			(o = o.GetRoleDescriptionId(n)),
			this.Q0i(i),
			this.X0i(t),
			this.$0i(e),
			this.Y0i(o),
			this.GetUiNiagara(2).ActivateSystem(!0),
			this.J0i());
	}
	Q0i(e) {
		var t = this.GetItem(5).GetOwner();
		this.V0i = new MiniElementItem_1.MiniElementItem(e, void 0, t);
	}
	$0i(e) {
		this.GetText(0).ShowTextNew(e);
	}
	X0i(e) {
		ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e) => {
			this.GetTexture(1)?.SetTexture(e), this.GetTexture(1)?.SetUIActive(!0);
		});
	}
	Y0i(e) {
		this.GetText(3).ShowTextNew(e);
	}
	J0i() {
		this.GetItem(7)?.SetUIActive(this.H0i);
	}
}
exports.JoinTeamView = JoinTeamView;
