"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillTreeView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	RoleController_1 = require("../RoleController"),
	RoleSkillDefine_1 = require("./RoleSkillDefine"),
	RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1 = require("./RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem"),
	RoleSkillInnerSkillAndOuterAttributeItem_1 = require("./RoleSkillInnerSkillAndOuterAttributeItem"),
	RoleSkillOuterPassiveSkillItem_1 = require("./RoleSkillOuterPassiveSkillItem");
class RoleSkillTreeView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.plo = void 0),
			(this.zke = 0),
			(this.Emo = void 0),
			(this.ymo = void 0),
			(this.Imo = void 0),
			(this.Tmo = void 0),
			(this.Lmo = () => {
				UiManager_1.UiManager.OpenView("RoleSkillInputView", this.zke);
			}),
			(this.Dmo = (e) => {
				e === this.Tmo
					? this.Tmo.SetToggleState(1)
					: (this.Tmo?.SetToggleState(0),
						(this.Tmo = e),
						this.Tmo.SetToggleState(1),
						this.Rmo());
			}),
			(this.Umo = (e) => {
				this.Amo(e), 1 === this.plo.RoleViewState && this.Pmo();
			}),
			(this.xmo = (e) => {
				var t =
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e);
				this.Amo(e),
					1 === this.plo.RoleViewState &&
						RoleController_1.RoleController.SendRoleSkillViewRequest(
							this.zke,
							t.SkillId,
							this.Pmo,
						);
			}),
			(this.Juo = () => {
				this.UiViewSequence.StopSequenceByKey("MoveLeft"),
					this.UiViewSequence.PlaySequence("MoveLeft"),
					this.Zuo(),
					this.wmo(!0);
			}),
			(this.Bmo = () => {
				this.UiViewSequence.StopSequenceByKey("MoveLeft"),
					this.UiViewSequence.PlaySequence("MoveLeft"),
					this.Zuo(),
					this.wmo(!0);
			}),
			(this.Pmo = () => {
				var e;
				this.Tmo &&
					0 !== this.plo.RoleViewState &&
					((e = this.Tmo.GetSkillNodeId()),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdateSkillTreeInfoView,
						this.zke,
						e,
					));
			}),
			(this.bmo = () => {
				var e, t;
				this.Tmo &&
					1 !== this.plo.RoleViewState &&
					((e = this.Tmo.GetSkillNodeId()),
					((t = new RoleSkillDefine_1.RoleSkillTreeInfoViewData()).RoleId =
						this.zke),
					(t.SkillNodeId = e),
					UiManager_1.UiManager.OpenView("RoleSkillTreeInfoView", t),
					this.wmo(!1),
					this.UiViewSequence.StopSequenceByKey("MoveRight"),
					this.UiViewSequence.PlaySequence("MoveRight"),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnRoleInternalViewEnter,
					));
			}),
			(this.Yuo = (e) => {
				this.UiViewSequence.StopSequenceByKey("ChangeRole"),
					this.UiViewSequence.PlaySequence("ChangeRole"),
					this.qmo(e);
			}),
			(this.qmo = (e) => {
				(this.zke = e), this.Refresh();
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
		]),
			(this.BtnBindInfo = [[6, this.Lmo]]);
	}
	OnStart() {
		(this.plo = this.ExtraParams),
			void 0 === this.plo
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleSkillTreeView",
					])
				: ((this.Emo =
						new RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem_1.RoleSkillInnerPassiveSkillAndOuterPassiveSkillItem()),
					this.Emo.CreateThenShowByActor(this.GetItem(0).GetOwner()),
					(this.Imo =
						new RoleSkillOuterPassiveSkillItem_1.RoleSkillOuterPassiveSkillItem()),
					this.Imo.CreateThenShowByActor(this.GetItem(5).GetOwner()),
					this.Gmo());
	}
	Gmo() {
		var e = [1, 2, 3, 4];
		this.ymo = new Array(e.length);
		for (let o = 0; o < e.length; o++) {
			var t = e[o],
				i =
					new RoleSkillInnerSkillAndOuterAttributeItem_1.RoleSkillInnerSkillAndOuterAttributeItem();
			i.CreateThenShowByActor(this.GetItem(t).GetOwner()), (this.ymo[o] = i);
		}
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.Yuo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSkillTreeNodeToggleClick,
				this.Dmo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRoleInternalViewQuit,
				this.Juo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SelectRoleTabOutside,
				this.Bmo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SkillTreeNodeActive,
				this.Umo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SkillTreeNodeLevelUp,
				this.xmo,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.Yuo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSkillTreeNodeToggleClick,
				this.Dmo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRoleInternalViewQuit,
				this.Juo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SelectRoleTabOutside,
				this.Bmo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SkillTreeNodeActive,
				this.Umo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SkillTreeNodeLevelUp,
				this.xmo,
			);
	}
	OnBeforeShow() {
		RoleController_1.RoleController.PlayRoleMontage(3);
		var e = this.plo.GetCurSelectRoleId();
		this.qmo(e),
			UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
				.Model?.CheckGetComponent(3)
				?.SetLoadingOpen(!1);
	}
	OnBeforeHide() {
		UiSceneManager_1.UiSceneManager.HasRoleSystemRoleActor() &&
			UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
				.Model?.CheckGetComponent(3)
				?.SetLoadingOpen(!0);
	}
	Zuo() {
		this.Tmo?.SetToggleState(0), (this.Tmo = void 0);
	}
	Amo(e) {
		this.Emo.OnNodeLevelChange(e);
		for (const t of this.ymo) t.OnNodeLevelChange(e);
		this.Imo.OnNodeLevelChange(e);
	}
	wmo(e) {
		var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.zke),
			i = this.GetButton(6).GetRootComponent();
		t.IsTrialRole() ? i.SetUIActive(!1) : i.SetUIActive(e);
	}
	Rmo() {
		if (this.Tmo) {
			var e = this.Tmo.GetRoleId(),
				t = this.Tmo.GetSkillNodeId();
			let o;
			o = 1 === this.plo.RoleViewState ? this.Pmo : this.bmo;
			var i = this.Tmo.GetType();
			4 === i || 3 === i
				? o()
				: ((i =
						ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(t)),
					RoleController_1.RoleController.SendRoleSkillViewRequest(
						e,
						i.SkillId,
						o,
					));
		}
	}
	Refresh() {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.zke);
		this.wmo(!e.IsTrialRole()), this.RefreshRole(e.GetRoleSkillTreeConfig());
	}
	RefreshRole(e) {
		for (const t of e)
			switch (t.NodeType) {
				case 1:
					this.Emo.Update(this.zke, t.Id);
					break;
				case 2:
					t.Coordinate <= this.ymo.length &&
						this.ymo[t.Coordinate - 1]?.Update(this.zke, t.Id);
					break;
				case 4:
					break;
				case 3:
					(void 0 !== t.ParentNodes && 0 !== t.ParentNodes.length) ||
						this.Imo?.Update(this.zke, t.Id);
			}
	}
}
exports.RoleSkillTreeView = RoleSkillTreeView;
