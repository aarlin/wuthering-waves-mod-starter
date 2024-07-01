"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSkillIconItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillIconItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t = !1) {
		super(),
			(this.yco = t),
			(this.zke = 0),
			(this.Ico = 0),
			(this.pqe = void 0),
			(this.Yke = () => {
				this.pqe && this.pqe();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[3, UE.UIItem],
			[2, UE.UIItem],
			[4, UE.UIItem],
		]),
			this.yco
				? (this.ComponentRegisterInfos.push([1, UE.UITexture]),
					this.ComponentRegisterInfos.push([5, UE.UITexture]),
					this.ComponentRegisterInfos.push([6, UE.UITexture]),
					this.ComponentRegisterInfos.push([
						7,
						UE.UIExtendToggleTextureTransition,
					]))
				: (this.ComponentRegisterInfos.push([1, UE.UISprite]),
					this.ComponentRegisterInfos.push([5, UE.UISprite]),
					this.ComponentRegisterInfos.push([6, UE.UISprite]),
					this.ComponentRegisterInfos.push([
						7,
						UE.UIExtendToggleSpriteTransition,
					])),
			(this.BtnBindInfo = [[0, this.Yke]]);
	}
	Update(e, t) {
		(this.zke = e), (this.Ico = t), this.Refresh();
	}
	SetId(e, t) {
		(this.zke = e), (this.Ico = t);
	}
	Refresh() {
		this.RefreshSkillIcon(), this.RefreshState();
	}
	RefreshState() {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
			this.zke,
			this.Ico,
		);
		this.GetItem(2)?.SetUIActive(0 < e);
		let t = this.yco ? this.GetTexture(1) : this.GetSprite(1);
		t?.SetChangeColor(0 < e, t.changeColor),
			(t = this.yco ? this.GetTexture(5) : this.GetSprite(5))?.SetChangeColor(
				0 < e,
				t.changeColor,
			),
			(t = this.yco ? this.GetTexture(6) : this.GetSprite(6))?.SetChangeColor(
				0 < e,
				t.changeColor,
			);
		var i = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeState(
			this.zke,
			this.Ico,
		);
		this.GetItem(4)?.SetUIActive(1 === i),
			this.GetItem(3)?.SetUIActive(1 !== i && 0 === e);
	}
	RefreshSkillIcon() {
		var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
				this.Ico,
			),
			t = e.SkillId;
		let i;
		(i =
			t && 0 < t
				? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t)
						?.Icon
				: e.PropertyNodeIcon) && this.Tco(i);
	}
	Tco(e) {
		this.yco
			? (this.Lco(1, e), this.Lco(5, e), this.Lco(6, e))
			: (this.Dco(1, e), this.Dco(5, e), this.Dco(6, e));
	}
	Lco(e, t) {
		const i = this.GetTexture(e);
		if (i) {
			const e = this.GetUiExtendToggleTextureTransition(7);
			let o;
			e &&
				(o = () => {
					e?.SetAllTransitionStateTexture(i.GetTexture());
				}),
				this.SetTextureByPath(t, i, void 0, o);
		}
	}
	Dco(e, t) {
		const i = this.GetSprite(e);
		if (i) {
			const e = this.GetUiExtendToggleSpriteTransition(7);
			let o;
			e &&
				(o = () => {
					e?.SetAllStateSprite(i.GetSprite());
				}),
				this.SetSpriteByPath(t, i, !1, void 0, o);
		}
	}
	GetRoleId() {
		return this.zke;
	}
	GetSkillNodeId() {
		return this.Ico;
	}
	SetToggleCallBack(e) {
		this.pqe = e;
	}
	SetToggleState(e) {
		this.GetExtendToggle(0).SetToggleState(e);
	}
}
exports.RoleSkillIconItem = RoleSkillIconItem;
