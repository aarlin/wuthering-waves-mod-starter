"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillTreeSkillItemBase = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoleSkillIconItem_1 = require("./RoleSkillIconItem");
class RoleSkillTreeSkillItemBase extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Smo = void 0),
			(this.ac = void 0),
			(this.I6e = () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSkillTreeNodeToggleClick,
					this,
				);
			});
	}
	OnStart() {
		(this.Smo = new RoleSkillIconItem_1.RoleSkillIconItem(
			this.GetSkillIconItem(),
			this.IsIconTexture(),
		)),
			this.SetToggleCallBack(this.I6e);
	}
	Update(e, t) {
		this.Smo.SetId(e, t), this.Refresh();
	}
	GetRoleId() {
		return this.Smo.GetRoleId();
	}
	GetSkillNodeId() {
		return this.Smo.GetSkillNodeId();
	}
	GetSkillIconItem() {}
	GetLevelText() {}
	GetNameText() {}
	GetLockItem() {}
	GetStrongArrowUpItem() {}
	Refresh() {
		this.Smo.Refresh(),
			this.RefreshName(),
			this.RefreshLevel(),
			this.RefreshState();
	}
	RefreshName() {
		var e,
			t = this.GetNameText();
		t &&
			((e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
				this.GetSkillNodeId(),
			)),
			(e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(
				e.SkillId,
			)),
			(e =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
					e.SkillType,
				))) &&
			t.SetText(e);
	}
	RefreshLevel() {
		var e = this.GetRoleId(),
			t = this.GetSkillNodeId(),
			l =
				((e = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
					e,
					t,
				)),
				this.GetLevelText());
		l &&
			((t =
				ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillMaxLevelBySkillNodeId(
					t,
				)),
			LguiUtil_1.LguiUtil.SetLocalText(l, "LevelRichText", e, t));
	}
	SetToggleCallBack(e) {
		this.Smo.SetToggleCallBack(e);
	}
	SetToggleState(e) {
		this.Smo.SetToggleState(e);
	}
	RefreshState() {
		var e,
			t = this.GetLockItem(),
			l = this.GetStrongArrowUpItem();
		(this.ac = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeState(
			this.GetRoleId(),
			this.GetSkillNodeId(),
		)),
			1 === this.ac
				? (t?.SetUIActive(!0), l?.SetUIActive(!1))
				: 3 === this.ac
					? (t?.SetUIActive(!1), l?.SetUIActive(!1))
					: 2 === this.ac &&
						((e =
							ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeConsumeSatisfied(
								this.GetRoleId(),
								this.GetSkillNodeId(),
							)),
						t?.SetUIActive(!1),
						l?.SetUIActive(e));
	}
	OnOtherNodeLevelChange() {
		3 !== this.ac && (this.Smo.RefreshState(), this.RefreshState());
	}
	OnSelfNodeLevelChange() {
		this.Smo.RefreshState(), this.RefreshLevel(), this.RefreshState();
	}
	OnNodeLevelChange(e) {
		e === this.GetSkillNodeId()
			? this.OnSelfNodeLevelChange()
			: this.OnOtherNodeLevelChange();
	}
	GetType() {}
	IsIconTexture() {
		return !1;
	}
	GetState() {
		return this.ac;
	}
}
exports.RoleSkillTreeSkillItemBase = RoleSkillTreeSkillItemBase;
